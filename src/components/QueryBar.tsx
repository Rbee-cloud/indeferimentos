import React from 'react';
import { Calendar, Search, Filter, ShieldCheck, Sparkles } from 'lucide-react';
import { SectorCategory } from '../types/regulatory';

interface QueryBarProps {
  startDate: string;
  setStartDate: (d: string) => void;
  endDate: string;
  setEndDate: (d: string) => void;
  category: SectorCategory;
  setCategory: (c: SectorCategory) => void;
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  onExecuteSearch: () => void;
  isScanning: boolean;
  totalFound: number;
}

export const QueryBar: React.FC<QueryBarProps> = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  category,
  setCategory,
  searchTerm,
  setSearchTerm,
  onExecuteSearch,
  isScanning,
  totalFound,
}) => {
  const [activePreset, setActivePreset] = React.useState<number | null>(30);

  const setPresetRange = (days: number) => {
    const end = new Date('2026-11-13');
    const start = new Date(end);
    start.setDate(start.getDate() - days);
    setStartDate(start.toISOString().split('T')[0]);
    setEndDate(end.toISOString().split('T')[0]);
    setActivePreset(days);
  };

  return (
    <div className="bg-[#ffffff] border border-[#46372d]/12 rounded-sm p-6 sm:p-7 mb-8 shadow-xs">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-5 border-b border-[#46372d]/10">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-['JetBrains_Mono'] uppercase tracking-wider text-[#786f66] mb-1">
            <span className="text-[#8a6240] font-semibold">DOU SECTION 1</span>
            <span>·</span>
            <span>ANVISA DECISIONAL ACTS</span>
            <span>·</span>
            <span className="text-[#4d6652] font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              VERIFIED IN.GOV.BR FEED
            </span>
          </div>
          <h2 className="font-['Clash_Display'] text-2xl font-bold tracking-[-0.03em] text-[#1a1715]">
            Gazette Query &amp; Regulatory Filter
          </h2>
        </div>

        {/* Quick Date Range Presets with Warm Earthy Sand */}
        <div className="flex items-center gap-1.5 p-1 bg-[#eae3d8] rounded-full border border-[#46372d]/15 text-xs font-['Satoshi'] font-semibold">
          {[7, 15, 30].map(days => (
            <button
              key={days}
              onClick={() => setPresetRange(days)}
              className={`px-4 py-1.5 rounded-full transition-colors ${
                activePreset === days
                  ? 'bg-[#1a1715] text-[#ffffff] shadow-xs'
                  : 'text-[#786f66] hover:text-[#1a1715]'
              }`}
            >
              Last {days} Days
            </button>
          ))}
        </div>
      </div>

      {/* Query Filter Grid with ample spacing so labels and inputs never overlap */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pt-6 items-end">
        {/* Date Inputs */}
        <div className="md:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="min-w-0">
            <label className="block text-xs font-['Satoshi'] font-bold uppercase tracking-wider text-[#1a1715] mb-2 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#b85d38]" /> Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={e => {
                setStartDate(e.target.value);
                setActivePreset(null);
              }}
              className="w-full bg-[#fbf9f6] border border-[#46372d]/15 rounded-sm px-3 py-2.5 text-xs text-[#1a1715] font-['JetBrains_Mono'] focus:outline-none focus:border-[#b85d38]"
            />
          </div>
          <div className="min-w-0">
            <label className="block text-xs font-['Satoshi'] font-bold uppercase tracking-wider text-[#1a1715] mb-2 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#b85d38]" /> End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={e => {
                setEndDate(e.target.value);
                setActivePreset(null);
              }}
              className="w-full bg-[#fbf9f6] border border-[#46372d]/15 rounded-sm px-3 py-2.5 text-xs text-[#1a1715] font-['JetBrains_Mono'] focus:outline-none focus:border-[#b85d38]"
            />
          </div>
        </div>

        {/* Regulated Sector Category */}
        <div className="md:col-span-3 min-w-0">
          <label className="block text-xs font-['Satoshi'] font-bold uppercase tracking-wider text-[#1a1715] mb-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-[#8a6240]" /> Regulated Category
          </label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value as SectorCategory)}
            className="w-full bg-[#fbf9f6] border border-[#46372d]/15 rounded-sm px-3 py-2.5 text-xs text-[#1a1715] font-['Satoshi'] font-medium focus:outline-none focus:border-[#b85d38]"
          >
            <option value="pharma">Pharmaceuticals &amp; APIs (CBPF / AFE)</option>
            <option value="api_site">Manufacturing Sites &amp; GMP Inspections</option>
            <option value="medtech">Medical Devices &amp; IVD Diagnostics</option>
            <option value="cosmetics">Cosmetics &amp; Sanitizers</option>
            <option value="all">All Regulated Health Categories</option>
          </select>
        </div>

        {/* Search Keyword with non-overlapping placeholder */}
        <div className="md:col-span-3 min-w-0">
          <label className="block text-xs font-['Satoshi'] font-bold uppercase tracking-wider text-[#1a1715] mb-2 flex items-center gap-1">
            <Search className="w-3.5 h-3.5 text-[#8a6240]" /> Filter Process / Company / RDC
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-[#786f66] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="e.g. 25351..., Sandoz, RDC 497"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-[#fbf9f6] border border-[#46372d]/15 rounded-sm pl-9 pr-3 py-2.5 text-xs text-[#1a1715] placeholder:text-[#9e958b] font-['Satoshi'] focus:outline-none focus:border-[#b85d38]"
            />
          </div>
        </div>

        {/* Execute Button */}
        <div className="md:col-span-2 min-w-0">
          <button
            onClick={onExecuteSearch}
            disabled={isScanning}
            className="w-full bg-[#1a1715] hover:bg-[#b85d38] disabled:opacity-40 text-[#ffffff] font-['Satoshi'] font-bold text-xs py-2.5 px-4 rounded-sm transition-all duration-200 flex items-center justify-center gap-2 uppercase tracking-wider shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isScanning ? 'Querying...' : 'Query DOU'}</span>
          </button>
        </div>
      </div>

      {/* Query Status Citation */}
      <div className="mt-5 pt-4 border-t border-[#46372d]/10 flex flex-wrap items-center justify-between text-xs font-['JetBrains_Mono'] text-[#786f66] gap-2">
        <div className="truncate max-w-2xl">
          <span className="text-[#1a1715] font-bold">DOU Source: </span>
          <span className="text-[#8a6240]">
            www.in.gov.br/consulta/-/buscar/dou · ANVISA (Seção 1) · [{startDate} .. {endDate}]
          </span>
        </div>
        <div>
          <span>Qualifying Rejections: </span>
          <span className="text-[#b85d38] font-bold tabular-nums">{totalFound}</span>
        </div>
      </div>
    </div>
  );
};
