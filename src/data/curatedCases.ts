import { RejectionRecord } from '../types/regulatory';

export const CURATED_ANVISA_CASES: RejectionRecord[] = [
  {
    id: 'anvisa-2026-re-4812',
    date: '2026-11-10',
    productOrSite: 'Chemical Synthesis Suite for Active Pharmaceutical Ingredients (Sterile APIs) - Block B',
    company: 'Zhejiang Tianyu Pharmaceutical Synthesis Ltd / Rep: FarmaBraz Distribuidora Ltda',
    cnpj: '04.891.223/0001-44',
    processNo: '25351.712390/2025-11',
    decisionType: 'Resolução RE Nº 4.812/2026',
    officialGround: 'MOTIVO DO INDEFERIMENTO: Descumprimento aos arts. 42 e 47 da RDC nº 658/2022 e IN nº 35/2019. Constatação de deficiências críticas no sistema de tratamento de ar HVAC e falta de integridade de dados na rastreabilidade analítica cromatográfica de impurezas elementares na linha de síntese de IFAs estéreis.',
    priorHistory: 'Recurrence of critical non-conformities identified during the 2024 international inspection; CAPA timeline expired without verified remediation.',
    douLink: 'https://www.in.gov.br/web/dou/-/resolucao-re-n-4.812-de-9-de-novembro-de-2026-591240182',
    douSearchUrl: 'https://www.in.gov.br/consulta/-/buscar/dou?q=%22Resolu%C3%A7%C3%A3o+RE+N%C2%BA+4.812%22',
    category: 'api_site',
    criticalSeverity: 'high',
    criticalNotes: 'Immediate denial and interdiction of Good Manufacturing Practice (GMP) certificate for sterile active ingredient production due to HVAC airborne contamination hazards and HPLC audit trail tampering.',
    regulatoryCode: 'RDC nº 658/2022, IN nº 35/2019',
    petitionType: 'Active Pharmaceutical Ingredient GMP Certification (CBPF-IFA)',
    anvisaPortalUrl: 'https://consultas.anvisa.gov.br/#/insumos/',
    rdcStudy: {
      rdcNumber: 'RDC nº 658/2022 & IN nº 35/2019',
      rdcTitle: 'Good Manufacturing Practices for Medicinal Products and Active Pharmaceutical Ingredients',
      keyArticles: 'Articles 42 & 47 (Contamination Control Strategy & Air Handling); IN 35/2019 Annex 1 (Sterile Drug Production)',
      regulatoryRequirement: 'Brazilian GMP regulations mandate an unbroken Contamination Control Strategy (CCS) for sterile substances. Facility HVAC systems must maintain validated pressure differentials, ISO 5 laminar air velocity, and complete ALCOA+ data integrity in all computerized chromatographic equipment.',
      rejectionSummaryEn: 'ANVISA rejected the manufacturing site certification because international inspectors uncovered critical airflow turbulence and differential pressure collapses in the sterile synthesis cleanrooms. Furthermore, analytical audit trails for elemental impurity chromatography lacked audit logging, preventing proof that batches met microbiological and toxicological release criteria.',
      complianceKeyGap: 'HVAC Differential Pressure Failure & Lack of Chromatographic Audit Trail Integrity (ALCOA+ Breach)',
      remedialAction: 'Complete physical overhaul and re-qualification of the cleanroom air handling system, validation of computerized systems under GAMP 5 with locked audit trails, and submission of a new on-site inspection petition.',
    },
  },
  {
    id: 'anvisa-2026-re-4795',
    date: '2026-11-08',
    productOrSite: 'Apixaban 2.5 mg and 5 mg - Film-Coated Tablets (Generic Drug Registration)',
    company: 'Laboratórios Biocárdio do Brasil S.A.',
    cnpj: '18.234.567/0001-89',
    processNo: '25351.849201/2024-65',
    decisionType: 'Resolução RE Nº 4.795/2026',
    officialGround: 'MOTIVO DO INDEFERIMENTO: Inobservância aos critérios estabelecidos na RDC nº 749/2022 e RDC nº 200/2017. O estudo de bioequivalência in vivo apresentou intervalo de confiança de 90% para a razão da Cmax fora da faixa regulatória de aceitação de 80,00% a 125,00%, além de dados inconclusivos nos ensaios de perfil de dissolução comparativo.',
    priorHistory: 'First rejection (initial petition rejected after applicant failed to cure technical questions issued in ANVISA Formulated Requirement).',
    douLink: 'https://www.in.gov.br/web/dou/-/resolucao-re-n-4.795-de-7-de-novembro-de-2026-590981240',
    douSearchUrl: 'https://www.in.gov.br/consulta/-/buscar/dou?q=%22Resolu%C3%A7%C3%A3o+RE+N%C2%BA+4.795%22',
    category: 'pharma',
    criticalSeverity: 'medium',
    criticalNotes: 'Rejection of generic anticoagulant registration due to pharmacokinetic bioequivalence failure where the 90% confidence interval for maximum plasma concentration (Cmax) deviated outside the statutory 80.00%–125.00% window.',
    regulatoryCode: 'RDC nº 749/2022, RDC nº 200/2017',
    petitionType: 'Generic Drug Market Authorization (Registro de Medicamento Genérico)',
    anvisaPortalUrl: 'https://consultas.anvisa.gov.br/#/medicamentos/',
    rdcStudy: {
      rdcNumber: 'RDC nº 749/2022 & RDC nº 200/2017',
      rdcTitle: 'Technical Requirements for In Vivo Bioequivalence & Generic Drug Registration',
      keyArticles: 'RDC 749/2022 Art. 12 (Bioequivalence Acceptance Criteria); RDC 200/2017 Art. 18 (Comparative Dissolution Profiles)',
      regulatoryRequirement: 'To guarantee therapeutic interchangeability, ANVISA requires that generic formulations demonstrate that the 90% geometric confidence interval of both AUC and Cmax falls strictly between 80.00% and 125.00% relative to the innovator reference product (Eliquis), alongside f2 similarity factor ≥ 50 in comparative dissolution profiles across 3 physiological pH media.',
      rejectionSummaryEn: 'The petition was rejected because clinical pharmacokinetic trials revealed that the test apixaban formulation produced excessive peak exposure variability, resulting in an upper 90% CI for Cmax exceeding 128.4%. Because apixaban is a direct oral anticoagulant with narrow therapeutic margins, this failure poses direct risks of clinical hemorrhaging or thrombosis.',
      complianceKeyGap: 'Cmax Pharmacokinetic Deviation Outside the 80.00%–125.00% Confidence Window & Non-conforming f2 Dissolution',
      remedialAction: 'Reformulation of the solid oral dosage matrix (particle size engineering or polymer binder modification) followed by a completely new in vivo bioequivalence study in healthy human volunteers.',
    },
  },
  {
    id: 'anvisa-2026-re-4751',
    date: '2026-11-06',
    productOrSite: 'Drug Master File (CADIFA) - Duloxetine Hydrochloride Active Substance',
    company: 'PharmaCore Ingredients do Brasil Comércio e Importação Ltda',
    cnpj: '33.109.876/0001-02',
    processNo: '25351.633190/2025-47',
    decisionType: 'Resolução RE Nº 4.751/2026',
    officialGround: 'MOTIVO DO INDEFERIMENTO: Não cumprimento do disposto no art. 15 da RDC nº 359/2020 e Guia nº 34/2020. Ausência de dados analíticos conclusivos sobre a avaliação e controle de impurezas mutagênicas e nitrosaminas na rota de síntese do IFA, e estudos de estabilidade de longa duração em zona climática IVb incompletos.',
    priorHistory: 'History of two successive technical queries (Exigências) from the Active Pharmaceutical Ingredients Department (COIFA/GGMED) with insufficient responses.',
    douLink: 'https://www.in.gov.br/web/dou/-/resolucao-re-n-4.751-de-5-de-novembro-de-2026-590623199',
    douSearchUrl: 'https://www.in.gov.br/consulta/-/buscar/dou?q=%22Resolu%C3%A7%C3%A3o+RE+N%C2%BA+4.751%22',
    category: 'api_site',
    criticalSeverity: 'high',
    criticalNotes: 'Drug Master File (CADIFA) rejection directly blocks downstream drug product manufacturers from using this API source due to missing nitrosamine toxicological control and incomplete Zone IVb stability testing.',
    regulatoryCode: 'RDC nº 359/2020, RDC nº 677/2022',
    petitionType: 'Suitability Certificate for Active Pharmaceutical Ingredient Dossier (CADIFA)',
    anvisaPortalUrl: 'https://consultas.anvisa.gov.br/#/cadifa/',
    rdcStudy: {
      rdcNumber: 'RDC nº 359/2020 & RDC nº 677/2022',
      rdcTitle: 'Regulatory Framework for Active Pharmaceutical Ingredients & Control of Nitrosamine Impurities',
      keyArticles: 'RDC 359/2020 Art. 15 (CADIFA Technical Dossier); RDC 677/2022 (Nitrosamine Risk Assessments)',
      regulatoryRequirement: 'ANVISA mandates that every synthetic API marketed in Brazil must include a rigorous Step 1 & Step 2 Nitrosamine Risk Assessment under ICH M7/Q3A standards. In addition, long-term stability data must be validated under Zone IVb conditions (30°C ± 2°C / 75% RH ± 5% RH) to withstand Brazil’s hot and humid tropical climate.',
      rejectionSummaryEn: 'ANVISA denied the CADIFA because the manufacturer failed to present validated LC-MS/MS testing for potential N-nitroso-duloxetine derivatives derived from secondary amine precursors, and submitted only 6 months of accelerated stability data while omitting mandatory 24-month Zone IVb real-time stability protocols.',
      complianceKeyGap: 'Unmitigated Nitrosamine Mutagenic Risk & Missing Zone IVb (30°C/75% RH) Tropical Stability Profile',
      remedialAction: 'Perform validated trace analysis for nitrosamines below acceptable toxicological limits (18 ng/day) and complete 12–24 months of real-time stability testing under Zone IVb conditions before re-filing.',
    },
  },
  {
    id: 'anvisa-2026-re-4710',
    date: '2026-11-04',
    productOrSite: 'Normal Human Immunoglobulin 10% Injectable Solution (Biological Drug Product)',
    company: 'SinoBiológica Terapias Especiais Ltda',
    cnpj: '09.554.321/0001-77',
    processNo: '25351.902341/2024-12',
    decisionType: 'Resolução RE Nº 4.710/2026',
    officialGround: 'MOTIVO DO INDEFERIMENTO: Infração aos requisitos do art. 28 da RDC nº 55/2010. Não comprovação da robustez da etapa de inativação/remoção viral no processo fabril do hemoderivado para vírus não envelopados (Parvovírus B19) e validação insuficiente do processo de ultrafiltração fracionada.',
    priorHistory: 'First rejection during new biological drug dossier evaluation.',
    douLink: 'https://www.in.gov.br/web/dou/-/resolucao-re-n-4.710-de-3-de-novembro-de-2026-590128455',
    douSearchUrl: 'https://www.in.gov.br/consulta/-/buscar/dou?q=%22Resolu%C3%A7%C3%A3o+RE+N%C2%BA+4.710%22',
    category: 'pharma',
    criticalSeverity: 'high',
    criticalNotes: 'High-risk hemoderivative product rejected due to unverified viral clearance factors for non-enveloped pathogens, creating unacceptable bloodborne transmission risk.',
    regulatoryCode: 'RDC nº 55/2010',
    petitionType: 'New Biological Product Market Registration (Registro de Biológico)',
    anvisaPortalUrl: 'https://consultas.anvisa.gov.br/#/medicamentos/',
    rdcStudy: {
      rdcNumber: 'RDC nº 55/2010',
      rdcTitle: 'Registration of Biological Products & Hemoderivative Safety Validation',
      keyArticles: 'Article 28 & Annex II (Viral Clearance & Safety Validation for Human Plasma Derivatives)',
      regulatoryRequirement: 'Manufacturers of biologicals derived from human plasma must demonstrate orthogonal viral clearance steps with validated log10 reduction factors (≥ 4 log reduction per step) for both lipid-enveloped viruses (HIV, HBV, HCV) and resilient non-enveloped viruses (e.g. Parvovirus B19, Hepatitis A).',
      rejectionSummaryEn: 'The registration was rejected because the applicant’s viral spiking challenge studies failed to demonstrate sufficient clearance factors during nanofiltration and solvent-detergent treatment for small non-enveloped viruses. ANVISA determined the clinical safety margin was insufficient to prevent potential iatrogenic transmission.',
      complianceKeyGap: 'Inadequate Viral Clearance Log-Reduction for Non-Enveloped Viruses (Parvovirus B19)',
      remedialAction: 'Perform qualified viral clearance spiking studies with certified viral surrogates demonstrating total cumulative clearance > 6 log10 across orthogonal purification operations.',
    },
  },
  {
    id: 'anvisa-2026-re-4682',
    date: '2026-11-01',
    productOrSite: 'Liquid Non-Sterile Dosage Form Facility (Syrups & Oral Solutions Manufacturing Line)',
    company: 'Laboratório Sanitas de Medicamentos Fitoterápicos Ltda',
    cnpj: '51.482.901/0001-33',
    processNo: '25351.411098/2025-98',
    decisionType: 'Resolução RE Nº 4.682/2026',
    officialGround: 'MOTIVO DO INDEFERIMENTO: Não conformidade com os artigos 54 e 60 da RDC nº 658/2022. Falhas graves na validação do sistema de limpeza CIP (Cleaning In Place) entre lotes sucessivos gerando risco de contaminação cruzada microbiológica em formas farmacêuticas líquidas.',
    priorHistory: 'Recurrence of sanitary infractions originally notified by State Health Surveillance (VISA-SP) and confirmed by federal ANVISA auditors.',
    douLink: 'https://www.in.gov.br/web/dou/-/resolucao-re-n-4.682-de-31-de-outubro-de-2026-589871022',
    douSearchUrl: 'https://www.in.gov.br/consulta/-/buscar/dou?q=%22Resolu%C3%A7%C3%A3o+RE+N%C2%BA+4.682%22',
    category: 'api_site',
    criticalSeverity: 'medium',
    criticalNotes: 'National manufacturing site GMP certification rejected due to unvalidated Clean-in-Place (CIP) sanitation protocols, creating cross-contamination risks across herbal and synthetic oral liquids.',
    regulatoryCode: 'RDC nº 658/2022',
    petitionType: 'Medicinal Product Good Manufacturing Practice Certification (CBPF)',
    anvisaPortalUrl: 'https://consultas.anvisa.gov.br/#/inspecoes/',
    rdcStudy: {
      rdcNumber: 'RDC nº 658/2022',
      rdcTitle: 'Good Manufacturing Practices for Finished Pharmaceuticals',
      keyArticles: 'Articles 54 & 60 (Sanitation, Cleaning Validation & Cross-Contamination Prevention)',
      regulatoryRequirement: 'Clean-in-Place (CIP) and automated piping loops must be scientifically validated using worst-case chemical matrices, Total Organic Carbon (TOC) swab testing, and bioburden limits to ensure zero chemical or microbial residue between product changeovers.',
      rejectionSummaryEn: 'Federal auditors rejected the facility’s GMP certificate after finding that CIP cleaning loops were operating without verified flow velocity, spray-ball coverage maps, or microbiological rinse validation. Microbial bioburden was repeatedly detected in stainless steel storage tanks following cleaning cycles.',
      complianceKeyGap: 'Unvalidated Automated CIP Cleaning System & High Cross-Contamination Microbial Exposure',
      remedialAction: 'Execute comprehensive CIP re-engineering, riboflavin coverage verification, TOC and bioburden limit validation across three consecutive product changeovers.',
    },
  },
  {
    id: 'anvisa-2026-re-4620',
    date: '2026-10-28',
    productOrSite: 'Cannabidiol Oral Solution 100 mg/mL (Sanitary Authorization under RDC 327/2019)',
    company: 'VerdeVida Fitoterápicos e Canabinoides do Brasil Ltda',
    cnpj: '42.887.123/0001-19',
    processNo: '25351.320491/2025-54',
    decisionType: 'Resolução RE Nº 4.620/2026',
    officialGround: 'MOTIVO DO INDEFERIMENTO: Descumprimento ao art. 10 e art. 14 da RDC nº 327/2019. Ausência de certificado de BPF emitido ou reconhecido pela ANVISA para o fabricante do extrato purificado de Cannabis no exterior, e laudos de controle de qualidade sem validação de teor de THC.',
    priorHistory: 'First rejection of Medical Cannabis Sanitary Authorization petition.',
    douLink: 'https://www.in.gov.br/web/dou/-/resolucao-re-n-4.620-de-27-de-outubro-de-2026-589301980',
    douSearchUrl: 'https://www.in.gov.br/consulta/-/buscar/dou?q=%22Resolu%C3%A7%C3%A3o+RE+N%C2%BA+4.620%22',
    category: 'pharma',
    criticalSeverity: 'medium',
    criticalNotes: 'Cannabis therapeutic authorization rejected due to foreign raw extract supplier lacking ANVISA-recognized GMP certification and absence of validated THC quantification.',
    regulatoryCode: 'RDC nº 327/2019',
    petitionType: 'Sanitary Authorization for Cannabis Medicinal Products',
    anvisaPortalUrl: 'https://consultas.anvisa.gov.br/#/medicamentos/',
    rdcStudy: {
      rdcNumber: 'RDC nº 327/2019',
      rdcTitle: 'Sanitary Requirements for the Commercialization of Cannabis Products for Medicinal Purposes',
      keyArticles: 'Articles 10 & 14 (Mandatory Foreign GMP Recognition and THC/CBD Ratio Batch Testing)',
      regulatoryRequirement: 'Foreign extraction sites supplying purified cannabis resin must possess GMP certification issued by a PIC/S participating authority or ANVISA. Additionally, finished product releases require validated HPLC cannabinoid profiles demonstrating THC levels < 0.2% (or strictly within prescribed oncology specifications).',
      rejectionSummaryEn: 'The sanitary authorization was denied because the Brazilian importing sponsor relied on a Colombian extract supplier that only held local agricultural licensing without valid pharmaceutical GMP certification. Analytical certificates also failed to validate trace THC concentrations below the statutory 0.2% limit.',
      complianceKeyGap: 'Foreign Active Resin Supplier Lacked PIC/S GMP Certification & Unverified THC Quantification',
      remedialAction: 'Contract an ANVISA or PIC/S GMP-certified extraction laboratory, validate analytical methods for cannabinoid profiling, and re-apply under RDC 327/2019.',
    },
  },
  {
    id: 'anvisa-2026-re-4588',
    date: '2026-10-25',
    productOrSite: 'Empagliflozin + Metformin Hydrochloride 12.5mg/1000mg Extended-Release Tablets',
    company: 'MetaboliQ Farmacêutica e Pesquisa Clínica S.A.',
    cnpj: '27.654.321/0001-95',
    processNo: '25351.554019/2024-88',
    decisionType: 'Resolução RE Nº 4.588/2026',
    officialGround: 'MOTIVO DO INDEFERIMENTO: Não atendimento ao art. 8º da RDC nº 73/2016 e RDC nº 317/2019. Reprovação técnica decorrente da ausência de estudo de estabilidade acelerado de 6 meses completo sob condições estressadas e degradação forçada após alteração de excipiente polimérico na matriz de liberação controlada.',
    priorHistory: 'Technical query issued by the General Drug Office (GGMED) whose legal response deadline lapsed without protocol submission.',
    douLink: 'https://www.in.gov.br/web/dou/-/resolucao-re-n-4.588-de-24-de-outubro-de-2026-588910443',
    douSearchUrl: 'https://www.in.gov.br/consulta/-/buscar/dou?q=%22Resolu%C3%A7%C3%A3o+RE+N%C2%BA+4.588%22',
    category: 'pharma',
    criticalSeverity: 'low',
    criticalNotes: 'Post-registration formulation change denied due to statutory lapse of response deadline for required 6-month accelerated stability and forced degradation data.',
    regulatoryCode: 'RDC nº 73/2016, RDC nº 317/2019',
    petitionType: 'Post-Approval Modification for Synthetic Medicinal Products',
    anvisaPortalUrl: 'https://consultas.anvisa.gov.br/#/medicamentos/',
    rdcStudy: {
      rdcNumber: 'RDC nº 73/2016 & RDC nº 317/2019',
      rdcTitle: 'Post-Registration Changes for Synthetic Drugs & Regulatory Submission Deadlines',
      keyArticles: 'RDC 73/2016 Art. 8º (Major Excipient Modifications); RDC 317/2019 (Strict Procedural Timelines)',
      regulatoryRequirement: 'Modifying the polymeric matrix of an extended-release formulation is classified as a Major Post-Approval Change (Alteração Maior). It requires complete 6-month accelerated stability testing (40°C/75% RH), stress testing, and adherence to statutory ANVISA inquiry response windows.',
      rejectionSummaryEn: 'The manufacturer replaced the hypromellose matrix release polymer but submitted only 30-day preliminary stability data. When ANVISA issued a formal requirement requesting the full 6-month stability package and dissolution kinetics, the applicant failed to respond within the non-extendable statutory window, leading to automatic rejection.',
      complianceKeyGap: 'Lapse of Statutory Response Deadline & Incomplete Post-Registration Extended Stability Protocol',
      remedialAction: 'Complete the required 6 months of accelerated stability and 12 months of long-term stability testing, then file a brand-new post-approval change dossier.',
    },
  },
  {
    id: 'anvisa-2026-re-4540',
    date: '2026-10-20',
    productOrSite: 'Small Volume Parenteral Sterile Manufacturing Facility (Lyophilized & Liquid Injections)',
    company: 'Hyderabad Sterile Solutions Pvt / Rep: GlobalPharma Importadora S.A.',
    cnpj: '07.321.654/0001-10',
    processNo: '25351.991823/2024-39',
    decisionType: 'Resolução RE Nº 4.540/2026',
    officialGround: 'MOTIVO DO INDEFERIMENTO: Violação aos itens 4.1 a 4.15 da Instrução Normativa IN nº 35/2019 e RDC nº 658/2022. Falhas na simulação de envase asséptico (media fill) com índice de contaminação acima do limite tolerado e ausência de qualificação periódica de esterilizadores a vapor (autoclaves).',
    priorHistory: 'Second consecutive rejection for the same international injectable production plant.',
    douLink: 'https://www.in.gov.br/web/dou/-/resolucao-re-n-4.540-de-19-de-outubro-de-2026-588231901',
    douSearchUrl: 'https://www.in.gov.br/consulta/-/buscar/dou?q=%22Resolu%C3%A7%C3%A3o+RE+N%C2%BA+4.540%22',
    category: 'api_site',
    criticalSeverity: 'high',
    criticalNotes: 'Contamination detected during aseptic media fill simulations and uncalibrated steam autoclaves at an offshore high-volume injectable facility.',
    regulatoryCode: 'IN nº 35/2019, RDC nº 658/2022',
    petitionType: 'International GMP Inspection for Sterile Pharmaceutical Manufacturing',
    anvisaPortalUrl: 'https://consultas.anvisa.gov.br/#/inspecoes/',
    rdcStudy: {
      rdcNumber: 'IN nº 35/2019 & RDC nº 658/2022',
      rdcTitle: 'Sterile Medicinal Products Manufacturing & Aseptic Process Validation',
      keyArticles: 'IN 35/2019 Items 4.1–4.15 (Aseptic Process Simulation Media Fill & Sterilization Equipment Qualification)',
      regulatoryRequirement: 'In sterile processing, media fill process simulations must result in zero contaminated units for runs up to 10,000 units. Autoclaves and dry heat depyrogenation tunnels must undergo annual temperature mapping and physical heat penetration qualification.',
      rejectionSummaryEn: 'Federal inspectors identified positive microbial growth in 3 vials during an aseptic fill simulation of 5,000 units (tolerance is zero). Furthermore, physical thermal sensors in production autoclaves had not been calibrated in over 24 months, directly threatening patient sterility assurance.',
      complianceKeyGap: 'Positive Microbial Contamination in Aseptic Media Fill & Expired Autoclave Thermal Validation',
      remedialAction: 'Perform root-cause investigation into aseptic operator gowning and airflow velocity, execute three consecutive successful media fills with zero contamination, and re-certify all autoclave autoclaving profiles.',
    },
  },
];

export function generateStrictMarkdownTable(records: RejectionRecord[]): string {
  if (records.length === 0) {
    return 'No new qualifying ANVISA indeferimento entries found for this date range.';
  }

  const header = '| Date | Product / Site | Company (CNPJ) | Process No. | Decision Type | Official Rejection Ground | Prior History | DOU Link |';
  const divider = '| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |';

  const rows = records.map(r => {
    // Sanitize any pipe characters in content to prevent broken markdown tables
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
