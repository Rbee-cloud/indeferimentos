import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { HeroEcho } from './components/HeroEcho';
import { PhilosophyQuote } from './components/PhilosophyQuote';
import { ShowcaseGrid } from './components/ShowcaseGrid';
import { QueryBar } from './components/QueryBar';
import { RegulatoryTable } from './components/RegulatoryTable';
import { StrictMarkdownView } from './components/StrictMarkdownView';
import { CaseDossierDrawer } from './components/CaseDossierDrawer';
import { QualificationRulesModal } from './components/QualificationRulesModal';
import { Footer } from './components/Footer';
import { CURATED_ANVISA_CASES, generateStrictMarkdownTable } from './data/curatedCases';
import { RejectionRecord, SectorCategory, IntelligenceReportResult } from './types/regulatory';
import { Globe, Shield, ExternalLink } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'table' | 'markdown'>('table');
  const [startDate, setStartDate] = useState('2026-10-12');
  const [endDate, setEndDate] = useState('2026-11-12');
  const [category, setCategory] = useState<SectorCategory>('pharma');
  const [searchTerm, setSearchTerm] = useState('');

  const [records, setRecords] = useState<RejectionRecord[]>(() => {
    return CURATED_ANVISA_CASES.filter(c => c.category === 'pharma' || c.category === 'api_site');
  });
  const [markdownTable, setMarkdownTable] = useState<string>(() => {
    const initialPharma = CURATED_ANVISA_CASES.filter(c => c.category === 'pharma' || c.category === 'api_site');
    return generateStrictMarkdownTable(initialPharma);
  });

  const [selectedCase, setSelectedCase] = useState<RejectionRecord | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [groundingSources, setGroundingSources] = useState<Array<{ uri: string; title: string }>>([]);
  const [searchStatus, setSearchStatus] = useState<string>(
    'Verified ANVISA official repository loaded with authentic Diário Oficial da União gazettes.'
  );

  const workspaceRef = useRef<HTMLDivElement>(null);

  // Client-side filtering when search term or category changes
  useEffect(() => {
    let filtered = CURATED_ANVISA_CASES;

    if (category !== 'all') {
      if (category === 'pharma') {
        filtered = filtered.filter(r => r.category === 'pharma' || r.category === 'api_site');
      } else {
        filtered = filtered.filter(r => r.category === category);
      }
    }

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      filtered = filtered.filter(
        r =>
          r.productOrSite.toLowerCase().includes(q) ||
          r.company.toLowerCase().includes(q) ||
          r.cnpj.includes(q) ||
          r.processNo.toLowerCase().includes(q) ||
          r.decisionType.toLowerCase().includes(q) ||
          r.officialGround.toLowerCase().includes(q) ||
          r.rdcStudy.rdcNumber.toLowerCase().includes(q) ||
          r.rdcStudy.rejectionSummaryEn.toLowerCase().includes(q) ||
          r.rdcStudy.complianceKeyGap.toLowerCase().includes(q)
      );
    }

    if (startDate) {
      filtered = filtered.filter(r => r.date >= startDate);
    }
    if (endDate) {
      filtered = filtered.filter(r => r.date <= endDate);
    }

    setRecords(filtered);
    setMarkdownTable(generateStrictMarkdownTable(filtered));
  }, [category, searchTerm, startDate, endDate]);

  const handleExecuteSearch = async () => {
    setIsScanning(true);
    setSearchStatus('Executing live surveillance on in.gov.br/web/dou/ via Gemini with Google Search Grounding...');

    try {
      const response = await fetch('/api/regulatory/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startDate,
          endDate,
          category,
          searchTerm,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data: IntelligenceReportResult = await response.json();
      setRecords(data.records || []);
      setMarkdownTable(data.markdownTable || generateStrictMarkdownTable(data.records || []));
      setGroundingSources(data.groundingSources || []);

      if (data.isLiveSearch) {
        setSearchStatus(`Live scan complete: ${data.totalFound} qualified rejection acts extracted from in.gov.br with RDC studies.`);
      } else {
        setSearchStatus(`Scan complete: ${data.totalFound} verified rejections retrieved from official repository.`);
      }
    } catch (err: any) {
      console.warn('Backend API endpoint unreachable (static host / GitHub Pages mode). Filtering client-side verified records:', err);
      let localFiltered = CURATED_ANVISA_CASES;
      if (category !== 'all') {
        if (category === 'pharma') {
          localFiltered = localFiltered.filter(r => r.category === 'pharma' || r.category === 'api_site');
        } else {
          localFiltered = localFiltered.filter(r => r.category === category);
        }
      }
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        localFiltered = localFiltered.filter(
          r =>
            r.productOrSite.toLowerCase().includes(q) ||
            r.company.toLowerCase().includes(q) ||
            r.cnpj.includes(q) ||
            r.processNo.toLowerCase().includes(q) ||
            r.decisionType.toLowerCase().includes(q) ||
            r.officialGround.toLowerCase().includes(q) ||
            r.rdcStudy.rdcNumber.toLowerCase().includes(q) ||
            r.rdcStudy.rejectionSummaryEn.toLowerCase().includes(q) ||
            r.rdcStudy.complianceKeyGap.toLowerCase().includes(q)
        );
      }
      if (startDate) localFiltered = localFiltered.filter(r => r.date >= startDate);
      if (endDate) localFiltered = localFiltered.filter(r => r.date <= endDate);

      setRecords(localFiltered);
      setMarkdownTable(generateStrictMarkdownTable(localFiltered));
      setSearchStatus(`Static Mode (GitHub Pages): ${localFiltered.length} verified ANVISA gazettes matching query.`);
    } finally {
      setIsScanning(false);
    }
  };

  const handleExportCsv = () => {
    if (records.length === 0) return;

    const headers = [
      'Date',
      'Product / Manufacturing Site',
      'Company',
      'CNPJ',
      'ANVISA Process No',
      'Decision Type',
      'Official Rejection Ground (PT)',
      'Governing RDC',
      'RDC Regulatory Rejection Summary (EN)',
      'Primary Compliance Gap',
      'Prior History',
      'DOU Link',
    ];

    const rows = records.map(r => [
      `"${r.date}"`,
      `"${r.productOrSite.replace(/"/g, '""')}"`,
      `"${r.company.replace(/"/g, '""')}"`,
      `"${r.cnpj}"`,
      `"${r.processNo}"`,
      `"${r.decisionType}"`,
      `"${r.officialGround.replace(/"/g, '""')}"`,
      `"${r.rdcStudy.rdcNumber}"`,
      `"${r.rdcStudy.rejectionSummaryEn.replace(/"/g, '""')}"`,
      `"${r.rdcStudy.complianceKeyGap.replace(/"/g, '""')}"`,
      `"${r.priorHistory.replace(/"/g, '""')}"`,
      `"${r.douLink}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ANVISA_Indeferimentos_${startDate}_${endDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const scrollToWorkspace = () => {
    workspaceRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f5f2ed] text-[#1a1715] flex flex-col font-['Satoshi'] selection:bg-[#b85d38] selection:text-[#ffffff]">
      {/* 80px Sticky Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenRules={() => setIsRulesModalOpen(true)}
        onExportCsv={handleExportCsv}
        isScanning={isScanning}
        onRefresh={handleExecuteSearch}
      />

      {/* Hero Section with Typographic Echo Stack */}
      <HeroEcho onExploreClick={scrollToWorkspace} totalCases={records.length} />

      {/* Narrative Philosophy Quote & 3-Column Principles */}
      <PhilosophyQuote />

      {/* Asymmetrical Showcase Grid of RDC Focus Areas */}
      <ShowcaseGrid
        onSelectCase={record => setSelectedCase(record)}
        featuredCases={records}
      />

      {/* Main Workspace Area */}
      <main ref={workspaceRef} className="flex-1 max-w-7xl w-full mx-auto px-6 py-12 scroll-mt-24">
        {/* Status Callout Strip with Earthy Styling */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 text-xs font-['Satoshi'] bg-[#ffffff] border border-[#46372d]/12 rounded-sm px-6 py-4 shadow-xs">
          <div className="flex items-center gap-2.5">
            <Shield className="w-4 h-4 text-[#b85d38] shrink-0" />
            <span className="text-[#1a1715] font-medium">{searchStatus}</span>
          </div>

          <div className="flex items-center gap-3 text-[#786f66] font-['JetBrains_Mono'] text-[11px]">
            <span>ANVISA GGMED · COIFA · GIMED</span>
            <span>·</span>
            <span className="text-[#8a6240] font-semibold">DOU SEÇÃO 1</span>
          </div>
        </div>

        {/* Gazette Query and Category Filter Controller */}
        <QueryBar
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          category={category}
          setCategory={setCategory}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onExecuteSearch={handleExecuteSearch}
          isScanning={isScanning}
          totalFound={records.length}
        />

        {/* View Toggle / Active Workspace Content */}
        <div id="grid">
          {activeTab === 'table' ? (
            <div className="space-y-8">
              <RegulatoryTable
                records={records}
                onSelectCase={record => setSelectedCase(record)}
                selectedCaseId={selectedCase?.id}
              />

              {/* Verified Gazette Search Grounding Sources */}
              {groundingSources.length > 0 && (
                <div className="p-6 bg-[#ffffff] border border-[#46372d]/12 rounded-sm">
                  <div className="flex items-center gap-2 text-xs font-['Clash_Display'] font-bold text-[#1a1715] uppercase tracking-wide mb-3">
                    <Globe className="w-4 h-4 text-[#b85d38]" />
                    <span>Official Gazette Sources Consulted (in.gov.br)</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {groundingSources.slice(0, 4).map((source, i) => {
                      const canonicalUri = source.uri.startsWith('https://in.gov.br')
                        ? source.uri.replace('https://in.gov.br', 'https://www.in.gov.br')
                        : source.uri;

                      return (
                        <a
                          key={i}
                          href={canonicalUri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[#1a1715] hover:text-[#b85d38] p-3 rounded-sm bg-[#fbf9f6] border border-[#46372d]/10 flex items-center justify-between font-['JetBrains_Mono'] transition-colors"
                        >
                          <span className="truncate">{source.title || canonicalUri}</span>
                          <ExternalLink className="w-3.5 h-3.5 shrink-0 ml-2 text-[#786f66]" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div id="markdown">
              <StrictMarkdownView
                markdownContent={markdownTable}
                totalFound={records.length}
              />
            </div>
          )}
        </div>
      </main>

      {/* Case Dossier Slide-Over Drawer */}
      <CaseDossierDrawer
        record={selectedCase}
        onClose={() => setSelectedCase(null)}
      />

      {/* Qualification Rules Modal */}
      <QualificationRulesModal
        isOpen={isRulesModalOpen}
        onClose={() => setIsRulesModalOpen(false)}
      />

      {/* Swiss Luxury-Brutalist Deep Earthy Footer */}
      <Footer />
    </div>
  );
}
