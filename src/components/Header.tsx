import React from 'react';
import { RefreshCw, Download } from 'lucide-react';

interface HeaderProps {
  activeTab: 'table' | 'markdown';
  setActiveTab: (tab: 'table' | 'markdown') => void;
  onOpenRules: () => void;
  onExportCsv: () => void;
  isScanning: boolean;
  onRefresh: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenRules,
  onExportCsv,
  isScanning,
  onRefresh,
}) => {
  return (
    <header className="sticky top-0 z-40 h-20 bg-[#f5f2ed]/90 backdrop-blur-md border-b border-[#46372d]/10 px-8 flex items-center justify-between transition-all">
      {/* Brand Identity: Clash Display heavy geometric wordmark with terracotta accent */}
      <div className="flex items-center gap-3 shrink-0">
        <a href="#top" className="flex items-baseline gap-2 group">
          <span className="font-['Clash_Display'] text-xl font-bold tracking-[-0.04em] text-[#1a1715]">
            ANVISA<span className="text-[#b85d38]">·</span>DOU
          </span>
          <span className="text-[11px] font-['Satoshi'] uppercase tracking-widest text-[#786f66] hidden sm:inline">
            REGULATORY INTELLIGENCE
          </span>
        </a>
      </div>

      {/* Navigation Links: 14px uppercase Satoshi with 120ms color transition */}
      <nav className="hidden lg:flex items-center gap-8 text-[13px] font-['Satoshi'] font-medium uppercase tracking-wider">
        <button
          onClick={() => setActiveTab('table')}
          className={`transition-colors duration-120 whitespace-nowrap pb-1 border-b-2 ${
            activeTab === 'table'
              ? 'border-[#b85d38] text-[#b85d38] font-bold'
              : 'border-transparent text-[#1a1715] hover:text-[#b85d38]'
          }`}
        >
          Intelligence Grid
        </button>

        <button
          onClick={() => setActiveTab('markdown')}
          className={`transition-colors duration-120 whitespace-nowrap pb-1 border-b-2 ${
            activeTab === 'markdown'
              ? 'border-[#b85d38] text-[#b85d38] font-bold'
              : 'border-transparent text-[#1a1715] hover:text-[#b85d38]'
          }`}
        >
          Strict Markdown Table
        </button>

        <button
          onClick={onOpenRules}
          className="transition-colors duration-120 text-[#1a1715] hover:text-[#b85d38] whitespace-nowrap"
        >
          Qualification Rules
        </button>

        <button
          onClick={onExportCsv}
          className="transition-colors duration-120 text-[#1a1715] hover:text-[#b85d38] whitespace-nowrap flex items-center gap-1.5"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export CSV</span>
        </button>
      </nav>

      {/* Pill-shaped action button with 1px solid border that inverts on hover */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onRefresh}
          disabled={isScanning}
          className="h-10 px-6 rounded-full border border-[#1a1715] bg-transparent text-[#1a1715] hover:bg-[#1a1715] hover:text-[#ffffff] transition-colors duration-150 text-xs font-['Satoshi'] font-bold uppercase tracking-wider flex items-center gap-2 whitespace-nowrap disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
          <span>{isScanning ? 'Querying in.gov.br...' : 'Run Intelligence Scan'}</span>
        </button>
      </div>
    </header>
  );
};
