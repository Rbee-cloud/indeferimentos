import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { CURATED_ANVISA_CASES, generateStrictMarkdownTable } from './src/data/curatedCases.ts';
import { RdcAnalysis, RejectionRecord, SectorCategory } from './src/types/regulatory.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Gemini API client (server-side only)
const geminiApiKey = process.env.GEMINI_API_KEY || '';
let ai: GoogleGenAI | null = null;

if (geminiApiKey) {
  ai = new GoogleGenAI({
    apiKey: geminiApiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

interface DouSearchHit {
  urlTitle: string;
  title: string;
  pubDate: string; // DD/MM/YYYY
  isoDate: string; // YYYY-MM-DD
  hierarchyStr: string;
  contentPreview: string;
}

interface FetchedDouArticle {
  url: string;
  urlTitle: string;
  title: string;
  isoDate: string;
  hierarchyStr: string;
  text: string;
}

const DOU_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8',
};

function toDouDate(isoDate: string): string {
  const m = isoDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return isoDate;
  return `${m[3]}-${m[2]}-${m[1]}`;
}

function douSlashDateToIso(brDate: string): string {
  const m = brDate.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!m) return '';
  return `${m[3]}-${m[2]}-${m[1]}`;
}

function buildDateChunks(startIso: string, endIso: string, chunkDays = 10, maxChunks = 4): Array<{ from: string; to: string }> {
  const start = new Date(`${startIso}T00:00:00Z`);
  const end = new Date(`${endIso}T00:00:00Z`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || start > end) {
    return [{ from: toDouDate(startIso), to: toDouDate(endIso) }];
  }

  const totalDays = Math.ceil((end.getTime() - start.getTime()) / 86400000) + 1;
  if (totalDays <= chunkDays) {
    return [{ from: toDouDate(startIso), to: toDouDate(endIso) }];
  }

  const chunks: Array<{ from: string; to: string }> = [];
  // Walk backwards from endDate so most recent notices are always prioritized
  let cursorEnd = new Date(end);
  while (cursorEnd >= start && chunks.length < maxChunks) {
    const cursorStart = new Date(cursorEnd);
    cursorStart.setUTCDate(cursorStart.getUTCDate() - (chunkDays - 1));
    if (cursorStart < start) {
      cursorStart.setTime(start.getTime());
    }
    chunks.push({
      from: toDouDate(cursorStart.toISOString().slice(0, 10)),
      to: toDouDate(cursorEnd.toISOString().slice(0, 10)),
    });
    cursorEnd = new Date(cursorStart);
    cursorEnd.setUTCDate(cursorEnd.getUTCDate() - 1);
  }
  return chunks;
}

async function queryDouSearch(
  query: string,
  publishFrom: string,
  publishTo: string
): Promise<DouSearchHit[]> {
  const url =
    `https://www.in.gov.br/consulta/-/buscar/dou` +
    `?q=${encodeURIComponent(query)}` +
    `&s=do1&exactDate=personalizado` +
    `&publishFrom=${encodeURIComponent(publishFrom)}` +
    `&publishTo=${encodeURIComponent(publishTo)}` +
    `&delta=50&sortType=0` +
    `&orgPrin=${encodeURIComponent('Ministério da Saúde')}` +
    `&orgSub=${encodeURIComponent('Agência Nacional de Vigilância Sanitária')}`;

  try {
    const res = await fetch(url, {
      headers: DOU_HEADERS,
      signal: AbortSignal.timeout(12000),
    });
    if (!res.ok) return [];
    const html = await res.text();
    const match = html.match(
      /<script id="_br_com_seatecnologia_in_buscadou_BuscaDouPortlet_params"[^>]*>([\s\S]*?)<\/script>/
    );
    if (!match) return [];
    const parsed = JSON.parse(match[1]);
    const arr = Array.isArray(parsed?.jsonArray) ? parsed.jsonArray : [];

    return arr
      .filter((item: any) => (item?.hierarchyStr || '').includes('Agência Nacional de Vigilância Sanitária'))
      .map((item: any) => ({
        urlTitle: String(item.urlTitle || ''),
        title: String(item.title || '').replace(/<[^>]+>/g, '').trim(),
        pubDate: String(item.pubDate || '').trim(),
        isoDate: douSlashDateToIso(String(item.pubDate || '').trim()),
        hierarchyStr: String(item.hierarchyStr || '').trim(),
        contentPreview: String(item.content || '').replace(/<[^>]+>/g, '').trim(),
      }))
      .filter((hit: DouSearchHit) => Boolean(hit.urlTitle));
  } catch (err) {
    console.warn(`DOU search request failed for "${query}" (${publishFrom}..${publishTo}):`, err);
    return [];
  }
}

function cleanDouHtmlToText(html: string): { pubDate: string; text: string } {
  const pubDate = html.match(/class="publicado-dou-data">([^<]+)</)?.[1]?.trim() || '';
  const bodyMatch = html.match(/<div class="texto-dou">([\s\S]*?)<\/div>\s*<\/div>/);
  const raw = bodyMatch ? bodyMatch[1] : html;
  const text = raw
    .replace(/<p[^>]*>/g, '\n')
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n+/g, '\n')
    .trim();
  return { pubDate, text };
}

function isExcludedAdministrativeNotice(title: string, text: string): boolean {
  const t = title.toLowerCase();
  if (
    t.includes('consulta pública') ||
    t.includes('pregão') ||
    t.includes('extrato de contrato') ||
    t.includes('aviso de licitação') ||
    t.includes('portaria') ||
    t.includes('edital')
  ) {
    return true;
  }
  const head = text.slice(0, 600).toLowerCase();
  if (
    head.includes('aposentadoria') ||
    head.includes('pensão civil') ||
    head.includes('exoneração') ||
    head.includes('nomeação de servidor') ||
    head.includes('pregão eletrônico')
  ) {
    return true;
  }
  return false;
}

function isQualifyingRejectionArticle(text: string): boolean {
  const hasIndeferirArt = /Art\.\s*1[º°]\.?\s*Indeferir/i.test(text);
  const hasMotivo = /MOTIVO D[OE] INDEFERIMENTO/i.test(text);
  const hasIndeferido = /\bindeferid[oa]s?\b/i.test(text);
  // Must actually be a rejection act (exclude pure Deferir / Cancelamento a pedido / Revogação)
  if (!hasIndeferirArt && !hasMotivo) {
    return false;
  }
  return hasIndeferirArt || hasMotivo || hasIndeferido;
}

function inferCategoryFromArticle(hierarchyStr: string, text: string): SectorCategory {
  const lower = `${hierarchyStr} ${text}`.toLowerCase();
  if (
    lower.includes('insumo farmacêutico') ||
    lower.includes('insumos farmacêuticos') ||
    lower.includes('cadifa') ||
    lower.includes('boas práticas de fabricação de insumos') ||
    lower.includes('boas práticas de fabricação de medicamentos') ||
    lower.includes('síntese química')
  ) {
    return 'api_site';
  }
  if (
    lower.includes('medicamento') ||
    lower.includes('genérico') ||
    lower.includes('biológico') ||
    lower.includes('farmácias e drogarias') ||
    lower.includes('distribuição e/ou armazenagem de medicamentos') ||
    lower.includes('pesquisa clínica em medicamentos') ||
    lower.includes('gerência-geral de medicamentos')
  ) {
    return 'pharma';
  }
  if (
    lower.includes('produtos para saúde') ||
    lower.includes('tecnologia de produtos para saúde') ||
    lower.includes('correlatos')
  ) {
    return 'medtech';
  }
  if (lower.includes('cosméticos') || lower.includes('saneantes')) {
    return lower.includes('saneantes') && !lower.includes('cosméticos') ? 'sanitizing' : 'cosmetics';
  }
  if (lower.includes('alimentos')) {
    return 'food';
  }
  return 'pharma';
}

function matchesCategoryFilter(article: FetchedDouArticle, category: SectorCategory): boolean {
  if (category === 'all') return true;
  const lower = `${article.hierarchyStr} ${article.text}`.toLowerCase();
  if (category === 'pharma') {
    return (
      lower.includes('medicamento') ||
      lower.includes('insumo farmacêutico') ||
      lower.includes('insumos farmacêuticos') ||
      lower.includes('cadifa') ||
      lower.includes('farmácia') ||
      lower.includes('drogaria') ||
      lower.includes('biológico') ||
      lower.includes('pesquisa clínica')
    );
  }
  if (category === 'api_site') {
    return (
      lower.includes('insumo') ||
      lower.includes('boas práticas de fabricação') ||
      lower.includes('cbpf') ||
      lower.includes('síntese') ||
      lower.includes('indústria')
    );
  }
  if (category === 'medtech') {
    return lower.includes('produtos para saúde') || lower.includes('correlatos') || lower.includes('diagnóstico');
  }
  if (category === 'cosmetics') {
    return lower.includes('cosmético') || lower.includes('saneante') || lower.includes('higiene');
  }
  return inferCategoryFromArticle(article.hierarchyStr, article.text) === category;
}

async function fetchLiveAnvisaRejectionArticles(
  startDate: string,
  endDate: string,
  category: SectorCategory,
  searchTerm: string
): Promise<{ articles: FetchedDouArticle[]; searchedUrlCount: number }> {
  const chunks = buildDateChunks(startDate, endDate, 10, 4);
  const baseQueries = searchTerm.trim()
    ? [`${searchTerm.trim()} indeferimento`, 'MOTIVO DO INDEFERIMENTO', 'Indeferir Boas Práticas']
    : ['indeferimento', 'MOTIVO DO INDEFERIMENTO', 'Indeferir Boas Práticas'];

  const hitMap = new Map<string, DouSearchHit>();
  await Promise.all(
    chunks.flatMap(chunk =>
      baseQueries.map(async q => {
        const hits = await queryDouSearch(q, chunk.from, chunk.to);
        for (const h of hits) {
          if (!hitMap.has(h.urlTitle)) {
            hitMap.set(h.urlTitle, h);
          }
        }
      })
    )
  );

  // Pre-filter hits by date bounds and non-administrative title
  const candidates = Array.from(hitMap.values())
    .filter(h => {
      if (h.isoDate && startDate && h.isoDate < startDate) return false;
      if (h.isoDate && endDate && h.isoDate > endDate) return false;
      const t = h.title.toLowerCase();
      if (
        t.includes('consulta pública') ||
        t.includes('pregão') ||
        t.includes('extrato de contrato') ||
        t.includes('portaria') ||
        t.includes('retificação')
      ) {
        return false;
      }
      return true;
    })
    // Prioritize GGFIS, GGMED, GGPBS, and COAFE resolutions first
    .sort((a, b) => {
      const score = (h: DouSearchHit) => {
        const s = `${h.hierarchyStr} ${h.title}`.toLowerCase();
        if (s.includes('inspeção') || s.includes('medicamentos') || s.includes('biológicos')) return 3;
        if (s.includes('autorização de funcionamento')) return 2;
        return 1;
      };
      return score(b) - score(a) || b.isoDate.localeCompare(a.isoDate);
    })
    .slice(0, 28);

  const fetched: FetchedDouArticle[] = [];
  const batchSize = 7;
  for (let i = 0; i < candidates.length; i += batchSize) {
    const batch = candidates.slice(i, i + batchSize);
    const results = await Promise.all(
      batch.map(async hit => {
        const url = `https://www.in.gov.br/web/dou/-/${hit.urlTitle}`;
        try {
          const res = await fetch(url, {
            headers: DOU_HEADERS,
            signal: AbortSignal.timeout(10000),
          });
          if (!res.ok) return null;
          const html = await res.text();
          const { pubDate, text } = cleanDouHtmlToText(html);
          const isoDate = douSlashDateToIso(pubDate) || hit.isoDate;
          if (!text || isExcludedAdministrativeNotice(hit.title, text)) return null;
          if (!isQualifyingRejectionArticle(text)) return null;
          return {
            url,
            urlTitle: hit.urlTitle,
            title: hit.title,
            isoDate,
            hierarchyStr: hit.hierarchyStr,
            text,
          } satisfies FetchedDouArticle;
        } catch {
          return null;
        }
      })
    );
    for (const r of results) {
      if (r) fetched.push(r);
    }
  }

  const filtered = fetched.filter(article => {
    if (startDate && article.isoDate && article.isoDate < startDate) return false;
    if (endDate && article.isoDate && article.isoDate > endDate) return false;
    if (!matchesCategoryFilter(article, category)) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.trim().toLowerCase();
      if (!`${article.title} ${article.text}`.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  return { articles: filtered, searchedUrlCount: candidates.length };
}

function buildDeterministicRdcStudy(text: string): RdcAnalysis {
  const rdcMatch = text.match(/(?:Resolução\s+)?RDC\s*(?:n[º°]\s*)?(\d+(?:\.\d+)?\/\d{2,4})/i);
  const inMatch = text.match(/(?:IN|Instrução Normativa)\s*(?:n[º°]\s*)?(\d+\/\d{2,4})/i);
  const code = rdcMatch
    ? `RDC nº ${rdcMatch[1]}${inMatch ? ` & IN nº ${inMatch[1]}` : ''}`
    : inMatch
    ? `IN nº ${inMatch[1]}`
    : 'ANVISA Sanitary Legislation';

  const normalized = `${rdcMatch?.[1] || ''} ${inMatch?.[1] || ''} ${text}`.toLowerCase();

  if (normalized.includes('497/2021') || normalized.includes('497/21')) {
    return {
      rdcNumber: code,
      rdcTitle: 'Administrative Procedures for Granting Good Manufacturing Practice (GMP) Certification',
      keyArticles: 'RDC nº 497/2021, Art. 4º, § 1º (Grounds for Summary Rejection of GMP Petitions)',
      regulatoryRequirement:
        'RDC nº 497/2021 establishes mandatory documentary proof of GMP compliance and operational readiness for on-site or remote sanitary inspection at the requested manufacturing site.',
      rejectionSummaryEn:
        'ANVISA rejected the GMP certification request under RDC nº 497/2021 because the applicant either failed to provide documentation demonstrating compliance with GMP technical requirements or the manufacturing facility could not receive the scheduled sanitary inspection.',
      complianceKeyGap: 'Insufficient GMP Compliance Documentation or Inspection Readiness Failure under RDC 497/2021',
      remedialAction: 'Compile complete inspection/GMP compliance evidence, confirm manufacturing site readiness, and file a new CBPF petition.',
    };
  }
  if (normalized.includes('672/2022') || normalized.includes('672/22')) {
    return {
      rdcNumber: code,
      rdcTitle: 'Criteria for GMP Certification & Inspection Procedures for APIs and Medicinal Products',
      keyArticles: 'RDC nº 672/2022, Art. 3º & Art. 4º, § 2º (Mandatory Filing Checklist Requirements)',
      regulatoryRequirement:
        'RDC nº 672/2022 mandates submission of all required technical checklist documents upon petitioning so ANVISA can verify the manufacturing line and relied-upon inspection history.',
      rejectionSummaryEn:
        'ANVISA denied the GMP certification petition because mandatory checklist documentation indispensable to evaluating the manufacturing site was omitted from the filing.',
      complianceKeyGap: 'Omission of Mandatory Checklist Documentation Required by RDC 672/2022',
      remedialAction: 'Gather all mandatory checklist documents required under RDC 672/2022 before submitting a new petition.',
    };
  }
  if (normalized.includes('204/2005') || normalized.includes('204/05')) {
    return {
      rdcNumber: code,
      rdcTitle: 'Procedural Rules for Petitions Subjected to ANVISA Technical Analysis',
      keyArticles: 'RDC nº 204/2005, Articles 6º & 11 (Non-Extendable 120-Day Exigency Deadline & Technical Adequacy)',
      regulatoryRequirement:
        'Applicants receiving a Formal Technical Requirement (Notificação de Exigência) must submit complete documentary compliance within a strict, non-extendable 120-day statutory period.',
      rejectionSummaryEn:
        'ANVISA rejected the petition under RDC nº 204/2005 because the applicant failed to answer the issued technical requirement notifications within the mandatory statutory deadline or submitted insufficient technical proof.',
      complianceKeyGap: 'Unfulfilled Technical Requirement Notification (Exigência) or Statutory Deadline Lapse',
      remedialAction: 'Remediate the technical deficiencies cited in the ANVISA exigency notice and submit a brand-new petition.',
    };
  }
  if (normalized.includes('16/2014') || normalized.includes('16/14')) {
    return {
      rdcNumber: code,
      rdcTitle: 'Criteria for Operating Authorization (AFE) and Special Authorization (AE) Petitions',
      keyArticles: 'RDC nº 16/2014, Articles 15 & 18 (Competent Local Sanitary Inspection Report)',
      regulatoryRequirement:
        'Companies seeking Operating Authorization (AFE) or Special Authorization (AE) must provide a valid Inspection Report from the local health authority (VISA) attesting technical capacity for all requested activities and product classes.',
      rejectionSummaryEn:
        'ANVISA denied the AFE/AE petition under RDC nº 16/2014 because the applicant failed to attach an official local health authority Inspection Report proving technical compliance for the requested sanitary activities (or already held an active AFE).',
      complianceKeyGap: 'Missing Competent Local Health Authority Inspection Report or Duplicate Active AFE',
      remedialAction: 'Obtain a compliant VISA Inspection Report covering every requested activity and product class before refiling.',
    };
  }
  if (normalized.includes('275/2019') || normalized.includes('275/19')) {
    return {
      rdcNumber: code,
      rdcTitle: 'Operating Authorization (AFE) and Special Authorization (AE) for Pharmacies and Drugstores',
      keyArticles: 'RDC nº 275/2019, Art. 11 (Mandatory Instruction Documentation)',
      regulatoryRequirement:
        'Pharmacies and compounding drugstores must submit all required municipal/state sanitary instruction documents and signed Annex declarations defined in Article 11 of RDC nº 275/2019.',
      rejectionSummaryEn:
        'ANVISA rejected the pharmacy/drugstore authorization request because mandatory instruction documentation under Article 11 of RDC nº 275/2019 was missing or an active AFE already existed for the establishment.',
      complianceKeyGap: 'Missing Statutory Instruction Documentation Required under RDC 275/2019 Art. 11',
      remedialAction: 'Verify active AFE status and submit complete local sanitary documentation required under Article 11.',
    };
  }
  if (normalized.includes('358/22') || normalized.includes('658/2022') || normalized.includes('138/22')) {
    return {
      rdcNumber: code,
      rdcTitle: 'Good Manufacturing Practices & Qualification/Validation Requirements for Medicinal Products',
      keyArticles: 'Utility Qualification, Cleaning Validation, Quality Control & Recall Execution Standards',
      regulatoryRequirement:
        'Pharmaceutical plants must operate qualified purified water and HVAC utilities, validated cleaning protocols with transparent deviation control, reliable QC/stability testing, and rapid market recall execution for non-conforming batches.',
      rejectionSummaryEn:
        'ANVISA denied GMP certification after identifying systemic non-conformities in utility qualification, cleaning validation, quality control data reliability, and recall execution.',
      complianceKeyGap: 'Systemic GMP Breakdowns in Utilities, Validation, QC Reliability & Recall Compliance',
      remedialAction: 'Execute batch recalls if applicable, re-qualify critical utilities, and overhaul Quality Management System controls.',
    };
  }

  return {
    rdcNumber: code,
    rdcTitle: 'ANVISA Technical & Sanitary Regulation Cited in Official Gazette',
    keyArticles: 'Cited Sanitary Provisions in Official DOU Notice',
    regulatoryRequirement:
      'Petitions submitted to ANVISA must satisfy all technical, sanitary, and documentary mandates established in the applicable Collegiate Board Resolution (RDC).',
    rejectionSummaryEn:
      'ANVISA issued the rejection based directly on the regulatory non-compliance documented in the verbatim Portuguese MOTIVO DO INDEFERIMENTO published in Section 1 of the Diário Oficial da União.',
    complianceKeyGap: 'Non-compliance with Technical or Documentary Requirements Cited in the DOU Resolution',
    remedialAction: 'Review the verbatim Portuguese ground and official ANVISA dossier notice to address all cited statutory items prior to refiling.',
  };
}

function parseSingleArticleDeterministically(article: FetchedDouArticle, fallbackCategory: SectorCategory): RejectionRecord[] {
  const text = article.text;
  const reMatch = text.match(/RESOLUÇÃO[\s-]+RE\s*n[º°]?\s*([\d.]+),?\s*DE\s+\d+\s+DE\s+[A-ZÇÃÕÉÊÍÓÔÚ]+\s+DE\s+(\d{4})/i);
  const decisionType = reMatch ? `Resolução-RE nº ${reMatch[1]}/${reMatch[2]}` : article.title.slice(0, 60);

  const anexoIdx = text.indexOf('ANEXO');
  const body = anexoIdx >= 0 ? text.slice(anexoIdx + 5) : text;

  // Split multi-entry annexes separated by dashed/underscored divider lines, ignoring pure column header chunks
  const rawEntries = body
    .split(/\n?[-_.]{8,}\n?/)
    .map(e => e.trim())
    .filter(e => {
      if (e.length <= 35) return false;
      const hasPunctCnpj = /\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/.test(e);
      const hasRawCnpj = /\b\d{14}\b/.test(e);
      const hasProc = /25351\.\d{6}\/\d{2,4}-\d{2}/.test(e);
      const hasExp = /\b\d{7}\/\d{2}-\d\b/.test(e);
      const hasBodyMotivo = /MOTIVO D[OE] INDEFERIMENTO\s*:/i.test(e);
      return hasPunctCnpj || hasRawCnpj || hasProc || hasExp || hasBodyMotivo;
    });

  const chunksToProcess = rawEntries.length > 0 ? rawEntries.slice(0, 6) : [body.slice(0, 2400)];
  const records: RejectionRecord[] = [];

  for (let i = 0; i < chunksToProcess.length; i++) {
    const chunk = chunksToProcess[i];
    const entryCategory = inferCategoryFromArticle(article.hierarchyStr, chunk);

    // On multi-entry notices (e.g. AFE lists), filter each row against requested category
    if (fallbackCategory !== 'all') {
      const matchesRequested =
        fallbackCategory === 'pharma'
          ? entryCategory === 'pharma' || entryCategory === 'api_site'
          : entryCategory === fallbackCategory;
      if (!matchesRequested) continue;
    }

    const punctCnpj = chunk.match(/\b(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})\b/);
    const rawCnpj = !punctCnpj ? chunk.match(/\b(\d{14})\b/) : null;
    const formattedCnpj = punctCnpj
      ? punctCnpj[1]
      : rawCnpj
      ? rawCnpj[1].replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5')
      : 'See DOU Annex';

    const procMatch = chunk.match(/\b(25351\.\d{6}\/\d{2,4}-\d{2})\b/);
    const expMatch = chunk.match(/(?:EXPEDIENTE(?:\(s\))?\s*:?\s*|(?=\d{7}\/\d{2}-\d))([\d./-]{7,15})/i);

    const motivoMatch = chunk.match(/(MOTIVO D[OE] INDEFERIMENTO\s*:[\s\S]+)/i);
    const officialGround = motivoMatch
      ? motivoMatch[1].replace(/Este conteúdo não substitui[\s\S]*/i, '').trim()
      : `Resolução publicada no DOU: ${chunk.replace(/Este conteúdo não substitui[\s\S]*/i, '').trim().slice(0, 500)}`;

    // Extract company name across DOU annex formats ("Empresa: X", "RAZÃO SOCIAL.../ CNPJ: X", "X / CNPJ", "X CNPJ14")
    let company = 'Regulated Entity (See Official DOU Notice)';
    const cleanedChunk = chunk.replace(/^Versão Detalhada:\s*/i, '');
    const empMatch = cleanedChunk.match(
      /(?:RAZÃO SOCIAL DA EMPRESA SOLICITANTE\s*\/\s*CNPJ|EMPRESA(?:\s+SOLICITANTE)?)\s*:\s*([^\n]+?)(?=\s*(?:DENOMINAÇÃO|\/|\-\s*\d{2}\.|CNPJ|\d{2}\.\d{3}\.\d{3}|$))/i
    );
    if (empMatch) {
      company = empMatch[1].trim();
    } else {
      const sepCompany = cleanedChunk.match(/([A-ZÀ-Ú0-9][^\n/]{3,90}?)\s*(?:\/|\-)\s*\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/);
      if (sepCompany) {
        company = sepCompany[1].trim();
      } else {
        const rawCnpjCompany = cleanedChunk.match(/([A-ZÀ-Ú0-9][^\n]{3,90}?)\s+\d{14}\b/);
        if (rawCnpjCompany) company = rawCnpjCompany[1].trim();
      }
    }

    const subjectMatch = cleanedChunk.match(
      /\b(\d{3,5}\s*-\s*(?:AFE|AE|INSUMOS|MEDICAMENTOS|PRODUTOS|GENÉRICO|SIMILAR|ENSAIOS|PRODUTO DE TERAPIA)[^\n/]{5,140})/i
    );
    const productOrSite = subjectMatch
      ? `${subjectMatch[1].trim()} (${company})`
      : `${decisionType} — ${company}`;

    const hasHighFlag =
      /boas práticas de fabricação|contamin|água purificada|insumos farmacêuticos|biológic|impossibilidade|terapia avançada/i.test(chunk);

    records.push({
      id: `live-dou-${article.urlTitle.slice(-12)}-${i}`,
      date: article.isoDate || new Date().toISOString().slice(0, 10),
      productOrSite,
      company,
      cnpj: formattedCnpj,
      processNo: procMatch ? procMatch[1] : expMatch ? `Exp. ${expMatch[1]}` : 'See DOU Annex',
      decisionType,
      officialGround,
      priorHistory: 'Extracted directly from live Diário Oficial da União (Seção 1) gazette text.',
      douLink: article.url,
      douSearchUrl: `https://www.in.gov.br/consulta/-/buscar/dou?q=${encodeURIComponent(decisionType)}`,
      category: entryCategory || (fallbackCategory === 'all' ? 'pharma' : fallbackCategory),
      criticalSeverity: hasHighFlag ? 'high' : 'medium',
      criticalNotes: hasHighFlag
        ? `Sanitary GMP or critical manufacturing/API authorization rejection published in ${decisionType}.`
        : undefined,
      regulatoryCode: buildDeterministicRdcStudy(chunk).rdcNumber,
      petitionType: subjectMatch ? subjectMatch[1].trim() : 'ANVISA Sanitary Petition Rejection',
      anvisaPortalUrl: 'https://consultas.anvisa.gov.br/',
      rdcStudy: buildDeterministicRdcStudy(chunk),
    });

    if (records.length >= 2) break;
  }

  return records;
}

// Sample endpoint returning verified genuine ANVISA gazette records
app.get('/api/regulatory/sample', (req, res) => {
  res.json({
    records: CURATED_ANVISA_CASES,
    markdownTable: generateStrictMarkdownTable(CURATED_ANVISA_CASES),
    totalFound: CURATED_ANVISA_CASES.length,
    isLiveSearch: false,
  });
});

// Zero-hallucination live intelligence scan endpoint backed directly by www.in.gov.br
app.post('/api/regulatory/search', async (req, res) => {
  const startTime = Date.now();
  const {
    startDate = '2026-10-14',
    endDate = '2026-11-13',
    category = 'pharma',
    searchTerm = '',
  }: {
    startDate?: string;
    endDate?: string;
    category?: SectorCategory;
    searchTerm?: string;
  } = req.body || {};

  const queryUsed = `site:www.in.gov.br/web/dou/ "Agência Nacional de Vigilância Sanitária" ("indeferimento" | "Indeferir") [${startDate}..${endDate}]${searchTerm ? ` "${searchTerm}"` : ''}`;

  try {
    const { articles } = await fetchLiveAnvisaRejectionArticles(startDate, endDate, category, searchTerm);

    const groundingSources = articles.map(a => ({
      uri: a.url,
      title: `${a.isoDate} · ${a.title}`,
    }));

    // Strict zero-hallucination empty state when www.in.gov.br yields no qualifying rejections
    if (articles.length === 0) {
      return res.json({
        records: [],
        markdownTable: 'No new qualifying ANVISA indeferimento entries found for this date range.',
        criticalNotes: [],
        totalFound: 0,
        dateRange: { start: startDate, end: endDate },
        queryUsed,
        executionTimeMs: Date.now() - startTime,
        isLiveSearch: true,
        groundingSources: [],
      });
    }

    const allowedArticlesByUrl = new Map(articles.map(a => [a.url, a]));
    let finalRecords: RejectionRecord[] = [];

    // Use Gemini to structure & author deep English RDC studies strictly from the verbatim fetched DOU HTML texts
    if (ai && geminiApiKey) {
      const articlesForModel = articles.slice(0, 7).map((a, idx) => {
        return `SOURCE_${idx + 1}:
URL: ${a.url}
DATE: ${a.isoDate}
TITLE: ${a.title}
ORG_HIERARCHY: ${a.hierarchyStr}
VERBATIM_DOU_TEXT:
${a.text.slice(0, 5500)}
---END_SOURCE_${idx + 1}---`;
      });

      const prompt = `You are a Brazilian Regulatory Intelligence Analyst.
Below are ${articlesForModel.length} VERBATIM official notices fetched right now from the Diário Oficial da União (www.in.gov.br).

STRICT ANTI-HALLUCINATION RULES (MANDATORY):
1. Extract ONLY real rejection entries ("indeferimentos") that explicitly appear in the VERBATIM_DOU_TEXT blocks below.
2. NEVER invent, guess, or alter any company name, CNPJ, process number, expediente, RE resolution number, publication date, or URL.
3. For every extracted record, set "douLink" to the EXACT "URL:" string from that SOURCE block, and "date" to the EXACT "DATE:" string from that SOURCE block.
4. For "officialGround", quote the verbatim Portuguese "MOTIVO DO INDEFERIMENTO: ..." (or "MOTIVO DE INDEFERIMENTO: ...") directly from the source text. If an annex omits a MOTIVO paragraph, quote the verbatim annex line in Portuguese without inventing text.
5. ALL other fields—including product/site description, prior history summary, and the RDC regulatory study—MUST be written in clear English.
6. Study the specific RDC / IN / Law cited in the source text and explain in English why ANVISA issued the rejection, the statutory mandate, and the primary compliance gap.
7. Focus on regulated products, GMP/CBPF sites, APIs, AFE/AE authorizations, registrations, and clinical trials. Exclude administrative/personnel/procurement acts. If an article contains multiple qualifying entries matching category "${category}", extract up to 2 most significant entries per notice (max 12 records total).

OUTPUT FORMAT:
Return ONLY a valid JSON array wrapped in \`\`\`json ... \`\`\` matching:
interface RejectionRecord {
  id: string;
  date: string; // EXACT DATE from SOURCE
  productOrSite: string; // English description of product, API, manufacturing site, or authorization activity
  company: string; // Exact company name from DOU text
  cnpj: string; // Exact CNPJ from DOU text (or "See DOU Annex" if omitted in DOU)
  processNo: string; // Exact 25351... process number or Expediente from DOU text
  decisionType: string; // e.g. "Resolução-RE nº 4.356/2026"
  officialGround: string; // Verbatim Portuguese quote from DOU text
  priorHistory: string; // English note based strictly on DOU text (e.g. unanswered exigência numbers, prior inspection context)
  douLink: string; // EXACT URL from SOURCE
  category: "pharma" | "api_site" | "medtech" | "cosmetics" | "sanitizing" | "food";
  criticalSeverity: "high" | "medium" | "low";
  criticalNotes?: string;
  regulatoryCode?: string;
  petitionType?: string;
  rdcStudy: {
    rdcNumber: string;
    rdcTitle: string;
    keyArticles: string;
    regulatoryRequirement: string;
    rejectionSummaryEn: string;
    complianceKeyGap: string;
    remedialAction?: string;
  };
}

VERBATIM SOURCES:
${articlesForModel.join('\n\n')}`;

      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
        });
        const rawText = response.text || '';
        const jsonMatch = rawText.match(/```json\s*([\s\S]*?)\s*```/) || rawText.match(/(\[\s*\{[\s\S]*\}\s*\])/);

        if (jsonMatch && jsonMatch[1]) {
          const parsed = JSON.parse(jsonMatch[1]);
          if (Array.isArray(parsed)) {
            finalRecords = parsed
              .filter((item: any) => item && typeof item.douLink === 'string' && allowedArticlesByUrl.has(item.douLink.trim()))
              .map((item: any, idx: number): RejectionRecord | null => {
                const src = allowedArticlesByUrl.get(item.douLink.trim())!;
                // Cross-check CNPJ or company token against verbatim DOU text to prevent hallucinated entities
                const cnpjClean = String(item.cnpj || '').trim();
                const hasValidCnpj = /\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/.test(cnpjClean);
                const cnpjDigits = cnpjClean.replace(/\D/g, '');
                const srcDigits = src.text.replace(/\D/g, '');
                const cnpjVerified = !hasValidCnpj || srcDigits.includes(cnpjDigits);
                if (!cnpjVerified) return null;

                return {
                  id: String(item.id || `live-dou-${idx}-${Date.now()}`),
                  date: src.isoDate || String(item.date || startDate),
                  productOrSite: String(item.productOrSite || src.title),
                  company: String(item.company || 'See Official DOU Notice'),
                  cnpj: cnpjClean || 'See DOU Annex',
                  processNo: String(item.processNo || 'See DOU Annex'),
                  decisionType: String(item.decisionType || src.title),
                  officialGround: String(item.officialGround || 'MOTIVO DO INDEFERIMENTO: Ver texto integral no DOU.'),
                  priorHistory: String(item.priorHistory || 'Extracted directly from Diário Oficial da União Seção 1.'),
                  douLink: src.url,
                  douSearchUrl: `https://www.in.gov.br/consulta/-/buscar/dou?q=${encodeURIComponent(String(item.decisionType || src.title))}`,
                  category: (item.category as SectorCategory) || inferCategoryFromArticle(src.hierarchyStr, src.text),
                  criticalSeverity: item.criticalSeverity === 'high' || item.criticalSeverity === 'low' ? item.criticalSeverity : 'medium',
                  criticalNotes: item.criticalNotes ? String(item.criticalNotes) : undefined,
                  regulatoryCode: item.regulatoryCode ? String(item.regulatoryCode) : undefined,
                  petitionType: item.petitionType ? String(item.petitionType) : undefined,
                  anvisaPortalUrl: 'https://consultas.anvisa.gov.br/',
                  rdcStudy: item.rdcStudy || buildDeterministicRdcStudy(src.text),
                };
              })
              .filter((r): r is RejectionRecord => r !== null);
          }
        }
      } catch (geminiErr) {
        console.warn('Gemini structuring failed on live DOU texts; using deterministic DOU parser:', geminiErr);
      }
    }

    // If Gemini API key is absent or returned no validated items, deterministically parse the genuine fetched DOU articles
    if (finalRecords.length === 0) {
      for (const article of articles.slice(0, 8)) {
        const parsed = parseSingleArticleDeterministically(article, category);
        finalRecords.push(...parsed);
      }
      finalRecords = finalRecords.slice(0, 12);
    }

    const markdownTable = generateStrictMarkdownTable(finalRecords);
    const criticalNotesList = finalRecords
      .filter(r => r.criticalSeverity === 'high')
      .map(r => `${r.productOrSite} (${r.decisionType}): ${r.criticalNotes || r.officialGround}`);

    return res.json({
      records: finalRecords,
      markdownTable,
      criticalNotes: criticalNotesList,
      totalFound: finalRecords.length,
      dateRange: { start: startDate, end: endDate },
      queryUsed,
      executionTimeMs: Date.now() - startTime,
      isLiveSearch: true,
      groundingSources,
    });
  } catch (error: any) {
    console.error('Error querying live www.in.gov.br DOU:', error);
    return res.status(502).json({
      records: [],
      markdownTable: 'No new qualifying ANVISA indeferimento entries found for this date range.',
      criticalNotes: [],
      totalFound: 0,
      dateRange: { start: startDate, end: endDate },
      queryUsed,
      executionTimeMs: Date.now() - startTime,
      isLiveSearch: true,
      groundingSources: [],
      error: error?.message || 'Unable to reach www.in.gov.br.',
    });
  }
});

// Development or production middleware
async function setupServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ANVISA Regulatory Intelligence Agent server running on http://0.0.0.0:${PORT}`);
  });
}

setupServer();
