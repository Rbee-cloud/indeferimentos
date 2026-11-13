import { RejectionRecord } from '../types/regulatory';

/**
 * 100% genuine, verbatim-verified ANVISA rejection acts (indeferimentos)
 * published in the Diário Oficial da União (Seção 1) at www.in.gov.br.
 */
export const CURATED_ANVISA_CASES: RejectionRecord[] = [
  {
    id: 'anvisa-2026-re-4356',
    date: '2026-11-09',
    productOrSite: 'National Small-Scale Pharmaceutical Manufacturing Site GMP (Maceió/AL Facility)',
    company: 'Sandom Indústria e Comércio Farmacêutico Ltda',
    cnpj: '26.439.487/0001-05',
    processNo: 'Exp. 1145406/25-4 (Autoriz/MS 1165185)',
    decisionType: 'Resolução-RE nº 4.356/2026',
    officialGround:
      'MOTIVO DO INDEFERIMENTO: Considerando a gravidade e o caráter sistêmico das deficiências encontradas à luz da RDC 358/22 e IN 138/22. Com destaque para a falta de qualificação aprovada do sistema de água purificada (matéria-prima crítica), sistema de ar, as falhas graves na validação e mascaramento de desvios no processo de limpeza, a ausência de execução de recolhimento de mercado em lote com contaminação microbiológica confirmada, bem como a falta de confiabilidade nos ensaios do Controle de Qualidade (incluindo o descarte e armazenamento de resíduos microbiológicos ativos sem inativação), liberação do lote e nos Estudos de Estabilidade, conclui-se que a Sandom Indústria e Comércio Farmacêutico Ltda. não apresenta condições operacionais e sanitárias para assegurar a qualidade, segurança e eficácia dos medicamentos fabricados.',
    priorHistory:
      'Sanitary inspection documented systemic operational deficiencies, unexecuted recall of a microbiologically contaminated batch, and masking of cleaning validation deviations.',
    douLink: 'https://www.in.gov.br/web/dou/-/resolucao-re-n-4.356-de-5-de-novembro-de-2026-742420413',
    douSearchUrl: 'https://www.in.gov.br/consulta/-/buscar/dou?q=4.356+Sandom+ANVISA',
    category: 'api_site',
    criticalSeverity: 'high',
    criticalNotes:
      'Systemic GMP certification denial due to unqualified purified water and HVAC systems, cleaning deviation masking, unreliable QC/stability testing, active biological waste mishandling, and failure to recall a contaminated batch.',
    regulatoryCode: 'RDC nº 358/2022, IN nº 138/2022',
    petitionType: 'Medicinal Product Good Manufacturing Practice Certification (CBPF — Small-Scale National Industry)',
    anvisaPortalUrl: 'https://consultas.anvisa.gov.br/#/empresas/',
    rdcStudy: {
      rdcNumber: 'RDC 358/2022 & IN nº 138/2022',
      rdcTitle: 'ANVISA Good Manufacturing Practices & Complementary Qualification and Validation Standards',
      keyArticles: 'IN nº 138/2022 (Qualification of Utilities & Cleaning Validation); cited alongside RDC 358/22',
      regulatoryRequirement:
        'Pharmaceutical manufacturers must maintain approved qualification for critical utilities (purified water and HVAC air handling), validated cleaning procedures with transparent deviation management, reliable Quality Control and stability data, biosafe waste inactivation, and immediate recall execution for contaminated batches.',
      rejectionSummaryEn:
        'ANVISA denied the GMP certificate after inspectors uncovered systemic breakdowns across utilities, quality control, and pharmacovigilance execution. Specifically, the purified water and air systems lacked approved qualification, cleaning deviations were concealed, active microbiological waste was stored and discarded without inactivation, stability and QC assays lacked reliability, and the company failed to execute a market recall for a batch with confirmed microbiological contamination.',
      complianceKeyGap:
        'Unqualified Purified Water & HVAC Systems, Cleaning Deviation Masking, Unreliable QC/Stability Data & Unexecuted Contaminated Batch Recall',
      remedialAction:
        'Execute immediate recall and quarantine of affected batches, decommission/re-qualify purified water and HVAC loops under IN 138/2022, remediate Quality Management System data integrity, and validate biosafety waste inactivation before re-inspection.',
    },
  },
  {
    id: 'anvisa-2026-re-4357',
    date: '2026-11-09',
    productOrSite: 'Chemical Synthesis APIs: Orforglipron Hemicalcium [CAS 2415797-61-2] & Tirzepatide [CAS 2023788-19-2] (Taixing Syntheall Pharmaceutical Co., Ltd — China)',
    company: 'Eli Lilly do Brasil Ltda (Site: Taixing Syntheall Pharmaceutical Co., Ltd)',
    cnpj: '43.940.618/0001-44',
    processNo: '25351.047233/2026-64',
    decisionType: 'Resolução-RE nº 4.357/2026',
    officialGround:
      'MOTIVO DO INDEFERIMENTO: Não há documentação que permite a comprovação do atendimento, pelo estabelecimento, aos requisitos técnicos de Boas Práticas de Fabricação necessários à comercialização do produto, configurando a situação que acarreta indeferimento presente no inciso IV do parágrafo 1º do art. 4º da RDC nº 497/2021.',
    priorHistory:
      'Optimized Procedure international API GMP petition (Exp. 0260814/26-1) rejected at dossier documentation review stage.',
    douLink: 'https://www.in.gov.br/web/dou/-/resolucao-re-n-4.357-de-5-de-novembro-de-2026-742448168',
    douSearchUrl: 'https://www.in.gov.br/consulta/-/buscar/dou?q=4.357+Taixing+Syntheall+ANVISA',
    category: 'api_site',
    criticalSeverity: 'high',
    criticalNotes:
      'Rejection of Optimized Procedure international API GMP certification for chemical synthesis of Orforglipron Hemicalcium and Tirzepatide due to insufficient GMP compliance documentation under RDC 497/2021.',
    regulatoryCode: 'RDC nº 497/2021',
    petitionType: 'Optimized Procedure — International API GMP Certification (Chemical Synthesis)',
    anvisaPortalUrl: 'https://consultas.anvisa.gov.br/#/insumos/',
    rdcStudy: {
      rdcNumber: 'RDC nº 497/2021',
      rdcTitle: 'Administrative Procedures for Granting Good Manufacturing Practice (GMP) Certification',
      keyArticles: 'Article 4º, § 1º, Item IV (Absence of Documentation Proving GMP Compliance)',
      regulatoryRequirement:
        'Under RDC nº 497/2021, sponsors seeking GMP certification for foreign API manufacturing sites—especially via the optimized reliance pathway—must submit complete inspection reports, corrective action records, and technical evidence proving the facility complies with Brazilian GMP requirements prior to product commercialization.',
      rejectionSummaryEn:
        'ANVISA rejected Eli Lilly do Brasil’s GMP certification petition for the Chinese chemical synthesis facility (Taixing Syntheall Pharmaceutical Co., Ltd) producing Orforglipron Hemicalcium and Tirzepatide because the submitted dossier lacked documentation sufficient to prove the establishment complies with the technical GMP requirements necessary for product commercialization.',
      complianceKeyGap:
        'Insufficient Technical Documentation Proving Foreign API Site GMP Compliance (RDC 497/2021 Art. 4º, § 1º, IV)',
      remedialAction:
        'Compile complete foreign authority inspection dossiers, site master file documentation, and validated line-specific synthesis GMP evidence before filing a new certification petition.',
    },
  },
  {
    id: 'anvisa-2026-re-4401',
    date: '2026-11-09',
    productOrSite: 'Operating Authorization (AFE) Activity Expansion — Medicines & Pharmaceutical Ingredients (Own QC Lab)',
    company: 'Mais Saúde Ltda',
    cnpj: '10.436.813/0001-82',
    processNo: '25351.530496/2014-13',
    decisionType: 'Resolução-RE nº 4.401/2026',
    officialGround:
      'MOTIVO DO INDEFERIMENTO: Não cumprimento das exigências formuladas sob os números de notificação 0381824/26-1 e 0564858/26-1, contrariando os artigos 6º e 11 da RDC nº 204/2005. Não houve apresentação de documento sanitário atestando que a empresa possui laboratório de Controle de Qualidade próprio, conforme art. 7º da RDC nº 670/2022.',
    priorHistory:
      'Applicant failed to satisfy two consecutive formal ANVISA technical requirements (0381824/26-1 and 0564858/26-1); companion Special Authorization petition (25351.530410/2014-04) was also rejected in the same RE.',
    douLink: 'https://www.in.gov.br/web/dou/-/resolucao-re-n-4.401-de-6-de-novembro-de-2026-742418776',
    douSearchUrl: 'https://www.in.gov.br/consulta/-/buscar/dou?q=4.401+Mais+Saude+ANVISA',
    category: 'pharma',
    criticalSeverity: 'medium',
    criticalNotes:
      'Activity expansion for medicines and pharmaceutical ingredients denied due to unanswered ANVISA exigências and failure to substantiate an in-house Quality Control laboratory.',
    regulatoryCode: 'RDC nº 204/2005, RDC nº 670/2022',
    petitionType: 'Operating Authorization (AFE) Alteration — Expansion of Activities for Medicines/APIs',
    anvisaPortalUrl: 'https://consultas.anvisa.gov.br/#/empresas/',
    rdcStudy: {
      rdcNumber: 'RDC nº 204/2005 & RDC nº 670/2022',
      rdcTitle: 'Petition Analysis Procedures & Minimum Quality Assurance Requirements for Imported Medicines',
      keyArticles: 'RDC 204/2005 Articles 6º & 11 (Technical Requirement Compliance); RDC 670/2022 Article 7º (Own Quality Control Laboratory)',
      regulatoryRequirement:
        'RDC nº 670/2022 mandates that companies handling/importing regulated medicinal products possess an accredited in-house Quality Control laboratory capable of executing identity and quality release testing (unless exempt under narrow statutory exceptions). Under RDC nº 204/2005, applicants must fully answer ANVISA technical exigency notifications within strict statutory deadlines.',
      rejectionSummaryEn:
        'ANVISA rejected the AFE expansion petition for medicines and pharmaceutical ingredients because Mais Saúde Ltda failed to fulfill two formal exigency notifications (0381824/26-1 and 0564858/26-1) and did not submit an official sanitary document proving it operates its own Quality Control laboratory as required by Article 7 of RDC nº 670/2022.',
      complianceKeyGap:
        'Failure to Answer Exigency Notifications & Missing Sanitary Proof of In-House Quality Control Laboratory',
      remedialAction:
        'Obtain local sanitary authority inspection attestation confirming an equipped in-house Quality Control laboratory under RDC 670/2022 and submit a new alteration petition.',
    },
  },
  {
    id: 'anvisa-2026-re-4285',
    date: '2026-11-03',
    productOrSite: 'Biological API Infliximab [CAS 170277-31-3] — Fermentation, Purification & Formulation (Bioray Pharmaceutical Hangzhou — China)',
    company: 'Panamerican Medical Supply Suprimentos Médicos Ltda (Site: Bioray Pharmaceutical Co., Ltd.)',
    cnpj: '01.329.816/0001-26',
    processNo: '25351.440040/2024-17',
    decisionType: 'Resolução-RE nº 4.285/2026',
    officialGround:
      'MOTIVO DO INDEFERIMENTO: Devido à impossibilidade da fabricante de receber a inspeção motivada por questões técnicas, o expediente está sendo indeferido conforme Art. 4º, § 1º, III, da RDC 497/2021.',
    priorHistory:
      'Inspection scheduling impediment at the Hangzhou biological manufacturing site; companion finished biological product petition (Exp. 1554227/24-1) was simultaneously rejected under RE nº 4.284/2026.',
    douLink: 'https://www.in.gov.br/web/dou/-/resolucao-re-n-4.285-de-29-de-outubro-de-2026-741222628',
    douSearchUrl: 'https://www.in.gov.br/consulta/-/buscar/dou?q=4.285+Bioray+ANVISA',
    category: 'api_site',
    criticalSeverity: 'high',
    criticalNotes:
      'International biological API GMP certification denied for Infliximab fermentation, purification, and formulation lines because the offshore manufacturer could not receive ANVISA’s inspection team due to technical reasons.',
    regulatoryCode: 'RDC nº 497/2021',
    petitionType: 'International Biological API GMP Certification (Non-Mercosur)',
    anvisaPortalUrl: 'https://consultas.anvisa.gov.br/#/insumos/',
    rdcStudy: {
      rdcNumber: 'RDC nº 497/2021',
      rdcTitle: 'Administrative Procedures for Granting Good Manufacturing Practice (GMP) Certification',
      keyArticles: 'Article 4º, § 1º, Item III (Inability of Manufacturer to Receive Sanitary Inspection)',
      regulatoryRequirement:
        'Under RDC nº 497/2021, foreign biological API manufacturers undergoing Brazilian GMP certification must remain ready and able to host ANVISA on-site or remote inspections on the scheduled terms; failure or technical inability to receive inspection constitutes mandatory grounds for petition rejection.',
      rejectionSummaryEn:
        'ANVISA rejected the biological API GMP certification petition (Exp. 1554226/24-4) for Bioray Pharmaceutical’s Hangzhou facility covering Infliximab fermentation, purification, and formulation lines because the manufacturer was unable to receive ANVISA’s sanitary inspection for technical reasons, triggering statutory dismissal under Art. 4º, § 1º, III of RDC 497/2021.',
      complianceKeyGap:
        'Manufacturer Technical Inability to Host Mandatory ANVISA Biological GMP Inspection',
      remedialAction:
        'Resolve technical readiness barriers at the Hangzhou manufacturing lines, confirm active commercial production schedule for Infliximab, and submit a new CBPF petition.',
    },
  },
  {
    id: 'anvisa-2026-re-4283',
    date: '2026-11-03',
    productOrSite: 'Pharmaceutical Distribution & Storage GMP Certification (CBPF — Timon/MA)',
    company: 'G R de Abreu Distribuidora Atual',
    cnpj: '04.528.673/0001-70',
    processNo: 'Exp. 0735129/24-0 (Autoriz/MS 1284634)',
    decisionType: 'Resolução-RE nº 4.283/2026',
    officialGround:
      'MOTIVO DE INDEFERIMENTO: A empresa não apresentou Cumprimento de exigência, referente à Notificação de exigência 0888938/24-4, em desacordo com A RDC 204/2005, que prevê: "Art. 6º O prazo para cumprimento da exigência será de 120 (cento e vinte) dias, improrrogáveis, contados a partir da data da confirmação de recebimento da exigência."',
    priorHistory:
      'Technical requirement notification 0888938/24-4 was issued and went unanswered past the non-extendable 120-day statutory deadline.',
    douLink: 'https://www.in.gov.br/web/dou/-/resolucao-re-n-4.283-de-29-de-outubro-de-2026-741190900',
    douSearchUrl: 'https://www.in.gov.br/consulta/-/buscar/dou?q=4.283+Abreu+ANVISA',
    category: 'pharma',
    criticalSeverity: 'medium',
    criticalNotes:
      'Good Distribution and Storage Practice (CBPDA) petition dismissed alongside five other pharmaceutical distributors in RE 4.283/2026 for missing the 120-day exigency response window.',
    regulatoryCode: 'RDC nº 204/2005',
    petitionType: 'Medicinal Product Distribution & Storage GMP Certification (CBPDA)',
    anvisaPortalUrl: 'https://consultas.anvisa.gov.br/#/inspecoes/',
    rdcStudy: {
      rdcNumber: 'RDC nº 204/2005',
      rdcTitle: 'Procedural Rules for Petitions Subjected to ANVISA Technical Analysis',
      keyArticles: 'Article 6º (Non-Extendable 120-Day Deadline for Fulfilling Technical Requirements)',
      regulatoryRequirement:
        'Article 6 of RDC nº 204/2005 establishes a strict, non-extendable 120-day calendar window from confirmed receipt of a Technical Requirement Notification (Notificação de Exigência) for applicants to file complete documentary compliance.',
      rejectionSummaryEn:
        'ANVISA rejected the Good Distribution and Storage Practice certification petition because G R de Abreu Distribuidora Atual failed to submit a response to Technical Requirement Notification 0888938/24-4 within the mandatory, non-extendable 120-day statutory period.',
      complianceKeyGap:
        'Lapse of Non-Extendable 120-Day Statutory Deadline to Answer Technical Exigency (RDC 204/2005 Art. 6º)',
      remedialAction:
        'Address all underlying distribution/storage quality deficiencies raised in Notification 0888938/24-4 and file a new CBPDA certification request.',
    },
  },
  {
    id: 'anvisa-2026-re-4170',
    date: '2026-10-26',
    productOrSite: 'Biological API Trastuzumab [CAS 180288-69-1] — Fermentation, Viral Inactivation, Pre-formulation & Purification (Eirgenix Zhubei Plant — Taiwan)',
    company: 'Sandoz do Brasil Indústria Farmacêutica Ltda (Site: Eirgenix, Inc. Zhubei Plant)',
    cnpj: '61.286.647/0001-16',
    processNo: '25351.132949/2026-66',
    decisionType: 'Resolução-RE nº 4.170/2026',
    officialGround:
      'MOTIVO DO INDEFERIMENTO: A empresa não apresentou a documentação requerida no checklist. Ausência de documentação obrigatória indispensável à análise do pedido, nos termos do art. 4º, § 2º, c/c art. 3º da Resolução RDC nº 672, de 30 de março de 2022.',
    priorHistory:
      'Initial international biological API GMP petition (Exp. 0755540/26-3) rejected at completeness/checklist verification stage.',
    douLink: 'https://www.in.gov.br/web/dou/-/resolucao-re-n-4.170-de-22-de-outubro-de-2026-740369851',
    douSearchUrl: 'https://www.in.gov.br/consulta/-/buscar/dou?q=4.170+Sandoz+Eirgenix+ANVISA',
    category: 'api_site',
    criticalSeverity: 'high',
    criticalNotes:
      'International biological API GMP certification for Trastuzumab monoclonal antibody manufacturing lines in Taiwan rejected due to missing mandatory checklist documents under RDC 672/2022.',
    regulatoryCode: 'RDC nº 672/2022',
    petitionType: 'International Biological API GMP Certification (Non-Mercosur)',
    anvisaPortalUrl: 'https://consultas.anvisa.gov.br/#/insumos/',
    rdcStudy: {
      rdcNumber: 'RDC nº 672/2022',
      rdcTitle: 'Criteria for GMP Certification & Inspection Procedures for APIs, Medicines & Cannabis Products',
      keyArticles: 'Article 3º & Article 4º, § 2º (Mandatory Checklist Documentation Required for Petition Analysis)',
      regulatoryRequirement:
        'RDC nº 672/2022 (which regulates GMP certification criteria and inspection procedures) requires every certification dossier—especially for complex biological APIs involving fermentation and viral inactivation—to contain all mandatory checklist documents upon filing; incomplete submissions are summarily rejected without entering substantive technical review.',
      rejectionSummaryEn:
        'ANVISA rejected Sandoz do Brasil’s GMP certification request for Eirgenix Inc.’s Zhubei facility in Taiwan covering Trastuzumab fermentation, viral inactivation, pre-formulation, and purification because the applicant omitted mandatory documents required by the official filing checklist, rendering the petition unanalyzable under Articles 3 and 4 (§ 2) of RDC nº 672/2022.',
      complianceKeyGap:
        'Omission of Mandatory Checklist Documentation Required for Biological API GMP Evaluation (RDC 672/2022)',
      remedialAction:
        'Assemble the complete RDC 672/2022 document checklist (including valid foreign GMP certificates/inspection reports and line-specific documentation) and re-submit the petition.',
    },
  },
  {
    id: 'anvisa-2026-re-4167',
    date: '2026-10-23',
    productOrSite: 'Special Authorization (AE) — Wholesale Distribution of Controlled Medicines & Pharmaceutical Ingredients',
    company: 'Farmed Distribuidora Ltda',
    cnpj: '66.198.619/0001-60',
    processNo: '25351.181927/2026-20',
    decisionType: 'Resolução-RE nº 4.167/2026',
    officialGround:
      'MOTIVO DO INDEFERIMENTO: Não apresentação do Relatório de Inspeção, emitido pela autoridade sanitária competente, descrevendo a capacidade da empresa para executar a atividade de relacionada a substâncias sujeitas ao controle especial, conforme disposto no artigo 15, § 4º e artigo 18 da RDC nº 16/2014.',
    priorHistory:
      'Initial Special Authorization (AE) concession petition (Exp. 1069182265) rejected for missing local VISA inspection report.',
    douLink: 'https://www.in.gov.br/web/dou/-/resolucao-re-n-4.167-de-22-de-outubro-de-2026-739956742',
    douSearchUrl: 'https://www.in.gov.br/consulta/-/buscar/dou?q=4.167+Farmed+ANVISA',
    category: 'pharma',
    criticalSeverity: 'medium',
    criticalNotes:
      'Special Authorization (Autorização Especial) for distributing controlled medicines and APIs denied due to lack of local sanitary inspection report verifying controlled-substance security and operational capacity.',
    regulatoryCode: 'RDC nº 16/2014',
    petitionType: 'Special Authorization (AE) Concession — Controlled Medicines & Pharmaceutical Ingredients Distributor',
    anvisaPortalUrl: 'https://consultas.anvisa.gov.br/#/empresas/',
    rdcStudy: {
      rdcNumber: 'RDC nº 16/2014',
      rdcTitle: 'Criteria for Operating Authorization (AFE) and Special Authorization (AE) Petitions',
      keyArticles: 'Article 15, § 4º & Article 18 (Mandatory Local Sanitary Inspection Report for Controlled Substances)',
      regulatoryRequirement:
        'To obtain an ANVISA Special Authorization (AE) for distributing narcotics, psychotropics, or other Portaria 344/98 controlled medicines and APIs, Article 15 (§ 4º) and Article 18 of RDC nº 16/2014 require an official Inspection Report issued by the state or municipal health authority (VISA) explicitly attesting the facility’s physical security and technical capacity for controlled substances.',
      rejectionSummaryEn:
        'ANVISA rejected Farmed Distribuidora Ltda’s Special Authorization petition because the dossier lacked the mandatory Inspection Report from the competent local health surveillance authority describing the company’s technical and security capacity to handle controlled medicines and pharmaceutical ingredients.',
      complianceKeyGap:
        'Missing Competent Health Authority Inspection Report Attesting Controlled-Substance Capacity (RDC 16/2014 Art. 15, § 4º)',
      remedialAction:
        'Request an updated on-site VISA inspection expressly covering controlled substance storage and distribution under Portaria SVS/MS 344/1998 and attach the signed Inspection Report to a new AE petition.',
    },
  },
  {
    id: 'anvisa-2026-re-4452',
    date: '2026-11-13',
    productOrSite: 'Operating Authorization (AFE) Concession — Wholesale Distribution of Medical Devices (Produtos para Saúde)',
    company: 'Prime Saúde Hospitalar Ltda',
    cnpj: '47.630.616/0001-00',
    processNo: '25351.196037/2026-12',
    decisionType: 'Resolução-RE nº 4.452/2026',
    officialGround:
      'MOTIVO DO INDEFERIMENTO: Não apresentação de Relatório de Inspeção que ateste o cumprimento dos requisitos técnicos para as atividades e classes pleiteadas, emitido pela autoridade sanitária local competente, conforme disposto no artigo 15 e artigo 18 da RDC nº 16/2014.',
    priorHistory:
      'First rejection of initial AFE distribution petition (Subject Code 856, Exp. 1159667268).',
    douLink: 'https://www.in.gov.br/web/dou/-/resolucao-re-n-4.452-de-12-de-novembro-de-2026-744160655',
    douSearchUrl: 'https://www.in.gov.br/consulta/-/buscar/dou?q=4.452+Prime+Saude+ANVISA',
    category: 'medtech',
    criticalSeverity: 'medium',
    criticalNotes:
      'Medical device wholesale distribution authorization rejected for omitting the local sanitary authority inspection report confirming technical storage and distribution compliance.',
    regulatoryCode: 'RDC nº 16/2014',
    petitionType: 'Operating Authorization (AFE) Concession — Medical Devices Distribution',
    anvisaPortalUrl: 'https://consultas.anvisa.gov.br/#/empresas/',
    rdcStudy: {
      rdcNumber: 'RDC nº 16/2014',
      rdcTitle: 'Criteria for Operating Authorization (AFE) and Special Authorization (AE) Petitions',
      keyArticles: 'Articles 15 & 18 (Local Health Authority Inspection Report for Requested Product Classes)',
      regulatoryRequirement:
        'Articles 15 and 18 of RDC nº 16/2014 require wholesale distributors of medical devices (Produtos para Saúde) to submit a valid Inspection Report issued by the competent municipal or state VISA confirming compliance with technical and sanitary requirements for every requested activity and product class.',
      rejectionSummaryEn:
        'ANVISA denied Prime Saúde Hospitalar Ltda’s AFE application to distribute medical devices because the company failed to submit an Inspection Report issued by the competent local health authority attesting that the facility satisfies technical standards for the requested distribution activity.',
      complianceKeyGap:
        'Absence of Local Health Authority Inspection Report for Medical Device Distribution (RDC 16/2014 Arts. 15 & 18)',
      remedialAction:
        'Obtain a formal VISA Inspection Report explicitly certifying medical device distribution compliance and re-file Subject Code 856.',
    },
  },
];

export function generateStrictMarkdownTable(records: RejectionRecord[]): string {
  if (records.length === 0) {
    return 'No new qualifying ANVISA indeferimento entries found for this date range.';
  }

  const header =
    '| Date | Product / Site | Company (CNPJ) | Process No. | Decision Type | Official Rejection Ground | Prior History | DOU Link |';
  const divider = '| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |';

  const rows = records.map(r => {
    const cleanDate = r.date.replace(/\|/g, '-');
    const cleanProduct = r.productOrSite.replace(/\|/g, ' - ');
    const cleanCompany = `${r.company} (${r.cnpj})`.replace(/\|/g, ' - ');
    const cleanProcess = r.processNo.replace(/\|/g, '');
    const cleanDecision = r.decisionType.replace(/\|/g, '');
    const cleanGround = r.officialGround.replace(/\|/g, ';');
    const cleanHistory = r.priorHistory.replace(/\|/g, ';');
    const cleanLink = `[DOU Notice](${r.douLink})`;

    return `| ${cleanDate} | ${cleanProduct} | ${cleanCompany} | ${cleanProcess} | ${cleanDecision} | ${cleanGround} | ${cleanHistory} | ${cleanLink} |`;
  });

  let output = `${header}\n${divider}\n${rows.join('\n')}\n\n### RDC Regulatory Studies & Technical Rejection Summaries\n`;

  records.forEach((r, idx) => {
    output += `\n#### ${idx + 1}. ${r.productOrSite} — ${r.decisionType}\n`;
    output += `- **Governing Regulation**: ${r.rdcStudy.rdcNumber} (${r.rdcStudy.rdcTitle})\n`;
    output += `- **Key Articles**: ${r.rdcStudy.keyArticles}\n`;
    output += `- **Statutory Requirement**: ${r.rdcStudy.regulatoryRequirement}\n`;
    output += `- **Why ANVISA Issued Rejection**: ${r.rdcStudy.rejectionSummaryEn}\n`;
    output += `- **Primary Non-Compliance Root Cause**: ${r.rdcStudy.complianceKeyGap}\n`;
    output += `- **Official Gazette URL**: ${r.douLink}\n`;
  });

  output += `\n### Critical Regulatory Case Notes\n`;
  const criticalCases = records.filter(r => r.criticalSeverity === 'high');
  if (criticalCases.length > 0) {
    criticalCases.forEach((c, idx) => {
      output += `\n**[CRITICAL ${idx + 1}] ${c.productOrSite} (${c.decisionType}):**\n${c.criticalNotes || c.officialGround}\n`;
    });
  } else {
    output += '\n*No high-criticality facility interdictions or contamination events recorded in this subset.*\n';
  }

  return output;
}
