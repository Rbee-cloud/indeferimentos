export type SectorCategory = 'pharma' | 'api_site' | 'medtech' | 'cosmetics' | 'sanitizing' | 'food' | 'all';

export type CriticalSeverity = 'high' | 'medium' | 'low';

export interface RdcAnalysis {
  rdcNumber: string;              // e.g. "RDC nº 658/2022"
  rdcTitle: string;               // e.g. "Good Manufacturing Practices (GMP) for Medicinal Products & APIs"
  keyArticles: string;            // e.g. "Articles 42, 47 & IN nº 35/2019"
  regulatoryRequirement: string;  // Detailed explanation of the legal / technical requirement
  rejectionSummaryEn: string;     // In-depth summary in English of why the indeferimento was issued
  complianceKeyGap: string;       // Primary root-cause non-compliance
  remedialAction?: string;        // Corrective actions needed under ANVISA guidelines
}

export interface RejectionRecord {
  id: string;
  date: string;                   // Publication date: YYYY-MM-DD
  productOrSite: string;          // Product or manufacturing site name
  company: string;                // Regulated company name
  cnpj: string;                   // Brazilian CNPJ registration number
  processNo: string;              // Official ANVISA dossier process number
  decisionType: string;           // e.g. "Resolução RE Nº 4.812/2026"
  officialGround: string;         // Verbatim quote of "MOTIVO DO INDEFERIMENTO" in Portuguese
  priorHistory: string;           // First rejection vs repeat non-compliance notes
  douLink: string;                // Canonical link to official DOU gazette notice at www.in.gov.br
  douSearchUrl?: string;          // Direct search query link on DOU portal by RE Resolution number
  category: SectorCategory;
  criticalSeverity: CriticalSeverity;
  criticalNotes?: string;
  regulatoryCode?: string;        // e.g. "RDC nº 658/2022, IN nº 35/2019"
  petitionType?: string;          // e.g. "Active Pharmaceutical Ingredient GMP Certification (CBPF-IFA)"
  anvisaPortalUrl?: string;       // Direct lookup URL in ANVISA portal
  rdcStudy: RdcAnalysis;          // In-depth study of the relevant RDC and rejection justification
}

export interface SearchQueryParams {
  startDate: string;
  endDate: string;
  category: SectorCategory;
  searchTerm?: string;
}

export interface IntelligenceReportResult {
  records: RejectionRecord[];
  markdownTable: string;
  criticalNotes: string[];
  totalFound: number;
  dateRange: {
    start: string;
    end: string;
  };
  queryUsed: string;
  executionTimeMs: number;
  isLiveSearch: boolean;
  groundingSources: Array<{
    uri: string;
    title: string;
  }>;
}
