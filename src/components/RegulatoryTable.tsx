import React, { useState } from 'react';
import { ExternalLink, Eye, ChevronUp, ChevronDown, Building2, AlertTriangle, BookOpen, Copy, Check } from 'lucide-react';
import { RejectionRecord } from '../types/regulatory';

interface RegulatoryTableProps {
  records: RejectionRecord[];
  onSelectCase: (record: RejectionRecord) => void;
  selectedCaseId?: string;
}

type SortField = 'date' | 'productOrSite' | 'company' | 'processNo' | 'criticalSeverity';
type SortOrder = 'asc' | 'desc';

export const RegulatoryTable: React.FC<RegulatoryTableProps> = ({
  records,
  onSelectCase,
  selectedCaseId,
}) => {
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [copiedUrlId, setCopiedUrlId] = useState<string | null>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const handleCopyLink = (e: React.MouseEvent, record: RejectionRecord) => {
    e.stopPropagation();
    navigator.clipboard.writeText(record.douLink);
    setCopiedUrlId(record.id);
    setTimeout(() => setCopiedUrlId(null), 2000);
  };

  const sortedRecords = [...records].sort((a, b) => {
    let comparison = 0;
    if (sortField === 'date') {
      comparison = a.date.localeCompare(b.date);
    } else if (sortField === 'productOrSite') {
      comparison = a.productOrSite.localeCompare(b.productOrSite);
    } else if (sortField === 'company') {
      comparison = a.company.localeCompare(b.company);
    } else if (sortField === 'processNo') {
      comparison = a.processNo.localeCompare(b.processNo);
    } else if (sortField === 'criticalSeverity') {
      const order = { high: 3, medium: 2, low: 1 };
      comparison = order[a.criticalSeverity] - order[b.criticalSeverity];
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  if (records.length === 0) {
    return (
      <div className="bg-[#ffffff] border border-[#46372d]/12 rounded-sm p-16 text-center shadow-xs">
        <Building2 className="w-10 h-10 text-[#c7beaf] mx-auto mb-3" />
        <h3 className="font-['Clash_Display'] text-xl font-bold text-[#1a1715]">
          No Qualifying Rejections Found
        </h3>
        <p className="font-['JetBrains_Mono'] text-xs text-[#786f66] mt-2 max-w-md mx-auto">
          "No new qualifying ANVISA indeferimento entries found for this date range."
        </p>
        <p className="font-['Satoshi'] text-xs text-[#8a6240] mt-2">
          Try expanding the date range or broadening category filters.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#ffffff] border border-[#46372d]/12 rounded-sm overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs divide-y divide-[#46372d]/10">
          <thead className="bg-[#f4efe8] text-[#1a1715] font-['Satoshi'] font-bold uppercase tracking-wider text-[11px]">
            <tr>
              <th
                onClick={() => handleSort('date')}
                className="px-4 py-3.5 cursor-pointer hover:bg-[#eae3d8] transition-colors whitespace-nowrap"
              >
                <div className="flex items-center gap-1">
                  <span>DOU Date</span>
                  {sortField === 'date' && (
                    sortOrder === 'asc' ? <ChevronUp className="w-3 h-3 text-[#b85d38]" /> : <ChevronDown className="w-3 h-3 text-[#b85d38]" />
                  )}
                </div>
              </th>

              <th
                onClick={() => handleSort('productOrSite')}
                className="px-4 py-3.5 cursor-pointer hover:bg-[#eae3d8] transition-colors min-w-[200px]"
              >
                <div className="flex items-center gap-1">
                  <span>Product / Manufacturing Site</span>
                  {sortField === 'productOrSite' && (
                    sortOrder === 'asc' ? <ChevronUp className="w-3 h-3 text-[#b85d38]" /> : <ChevronDown className="w-3 h-3 text-[#b85d38]" />
                  )}
                </div>
              </th>

              <th
                onClick={() => handleSort('company')}
                className="px-4 py-3.5 cursor-pointer hover:bg-[#eae3d8] transition-colors min-w-[190px]"
              >
                <div className="flex items-center gap-1">
                  <span>Company (CNPJ)</span>
                  {sortField === 'company' && (
                    sortOrder === 'asc' ? <ChevronUp className="w-3 h-3 text-[#b85d38]" /> : <ChevronDown className="w-3 h-3 text-[#b85d38]" />
                  )}
                </div>
              </th>

              <th
                onClick={() => handleSort('processNo')}
                className="px-4 py-3.5 cursor-pointer hover:bg-[#eae3d8] transition-colors whitespace-nowrap"
              >
                <div className="flex items-center gap-1">
                  <span>Process No.</span>
                  {sortField === 'processNo' && (
                    sortOrder === 'asc' ? <ChevronUp className="w-3 h-3 text-[#b85d38]" /> : <ChevronDown className="w-3 h-3 text-[#b85d38]" />
                  )}
                </div>
              </th>

              <th className="px-4 py-3.5 whitespace-nowrap">Decision (RE)</th>
              <th className="px-4 py-3.5 min-w-[260px] max-w-sm">Official Ground (PT)</th>
              <th className="px-4 py-3.5 min-w-[300px] max-w-md bg-[#faf7f3]">
                <div className="flex items-center gap-1 text-[#8a6240]">
                  <BookOpen className="w-3.5 h-3.5 text-[#8a6240]" />
                  <span>RDC Regulatory Study & Root Cause (EN)</span>
                </div>
              </th>
              <th className="px-4 py-3.5 min-w-[160px]">Prior History</th>
              <th className="px-4 py-3.5 text-right whitespace-nowrap">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#46372d]/8 font-['Satoshi']">
            {sortedRecords.map(item => {
              const isSelected = selectedCaseId === item.id;
              const isHigh = item.criticalSeverity === 'high';
              const isCopied = copiedUrlId === item.id;

              return (
                <tr
                  key={item.id}
                  onClick={() => onSelectCase(item)}
                  className={`cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[#f0ebe3] border-l-3 border-[#b85d38]'
                      : 'hover:bg-[#fbf9f6]'
                  }`}
                >
                  {/* DOU Date */}
                  <td className="px-4 py-3.5 whitespace-nowrap align-top font-['JetBrains_Mono'] text-[#1a1715] font-medium">
                    {item.date}
                  </td>

                  {/* Product or Manufacturing Site */}
                  <td className="px-4 py-3.5 align-top">
                    <div className="font-['Clash_Display'] font-bold text-sm text-[#1a1715] leading-snug">
                      {item.productOrSite}
                    </div>
                    <div className="text-[11px] font-['JetBrains_Mono'] text-[#786f66] mt-1.5 flex flex-wrap items-center gap-2">
                      <span className="uppercase text-[#4d6652] bg-[#f2f6f3] px-2 py-0.5 rounded font-bold border border-[#4d6652]/20">
                        {item.category}
                      </span>
                      {isHigh && (
                        <span className="text-[#b85d38] font-bold flex items-center gap-1 bg-[#fcf5f2] px-2 py-0.5 rounded border border-[#b85d38]/30">
                          <AlertTriangle className="w-3 h-3 text-[#b85d38]" />
                          CRITICAL CASE
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Company & CNPJ */}
                  <td className="px-4 py-3.5 align-top text-[#1a1715]">
                    <div className="font-semibold text-[#1a1715]">{item.company}</div>
                    <div className="font-['JetBrains_Mono'] text-[#786f66] text-[11px] mt-1">
                      CNPJ: {item.cnpj}
                    </div>
                  </td>

                  {/* Process No. */}
                  <td className="px-4 py-3.5 align-top whitespace-nowrap font-['JetBrains_Mono'] text-[#1a1715] font-medium">
                    {item.processNo}
                  </td>

                  {/* Decision Type */}
                  <td className="px-4 py-3.5 align-top whitespace-nowrap font-['JetBrains_Mono'] text-[#b85d38] font-bold">
                    {item.decisionType}
                  </td>

                  {/* Official Rejection Ground (Verbatim Portuguese) */}
                  <td className="px-4 py-3.5 align-top text-[11px] leading-relaxed text-[#3a3530]">
                    <p className="line-clamp-3 font-sans" title={item.officialGround}>
                      <span className="font-bold text-[#b85d38]">MOTIVO DO INDEFERIMENTO: </span>
                      <span>{item.officialGround.replace('MOTIVO DO INDEFERIMENTO:', '').trim()}</span>
                    </p>
                  </td>

                  {/* RDC Regulatory Study & Root Cause (English) */}
                  <td className="px-4 py-3.5 align-top bg-[#faf7f3] text-[11px] leading-relaxed text-[#1a1715] border-x border-[#46372d]/8">
                    <div className="font-['JetBrains_Mono'] font-bold text-[#8a6240] mb-1">
                      {item.rdcStudy.rdcNumber}
                    </div>
                    <p className="line-clamp-3 text-[#3a3530] mb-1.5" title={item.rdcStudy.rejectionSummaryEn}>
                      {item.rdcStudy.rejectionSummaryEn}
                    </p>
                    <div className="text-[10px] font-['JetBrains_Mono'] text-[#786f66] truncate">
                      <span className="font-semibold text-[#1a1715]">Gap: </span>
                      {item.rdcStudy.complianceKeyGap}
                    </div>
                  </td>

                  {/* Prior History */}
                  <td className="px-4 py-3.5 align-top text-[11px] text-[#786f66] leading-relaxed">
                    <p className="line-clamp-2">{item.priorHistory}</p>
                  </td>

                  {/* Actions: Reliable DOU link and copy options */}
                  <td className="px-4 py-3.5 align-top text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5" onClick={e => e.stopPropagation()}>
                      {/* Inspect Dossier */}
                      <button
                        onClick={() => onSelectCase(item)}
                        className="p-1.5 text-[#1a1715] hover:text-[#b85d38] hover:bg-[#eae3d8] rounded transition-colors"
                        title="Inspect RDC Dossier & Official Grounds"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      {/* Direct Link to DOU at www.in.gov.br */}
                      <a
                        href={item.douLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-[#b85d38] hover:text-[#8a4224] hover:bg-[#eae3d8] rounded transition-colors"
                        title="Open Official DOU Publication on www.in.gov.br"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      {/* Copy Link fallback for iframe sandbox */}
                      <button
                        onClick={e => handleCopyLink(e, item)}
                        className="p-1.5 text-[#786f66] hover:text-[#1a1715] hover:bg-[#eae3d8] rounded transition-colors"
                        title="Copy Official DOU URL to Clipboard"
                      >
                        {isCopied ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="px-5 py-3.5 bg-[#f4efe8] border-t border-[#46372d]/10 flex flex-wrap items-center justify-between text-xs font-['JetBrains_Mono'] text-[#786f66] gap-3">
        <div>Displaying {sortedRecords.length} qualifying decisions</div>
        <div className="flex items-center gap-4">
          <span className="text-[#b85d38] font-bold">
            Critical Cases: {sortedRecords.filter(r => r.criticalSeverity === 'high').length}
          </span>
          <span>·</span>
          <span className="text-[#8a6240] font-medium">
            Moderate: {sortedRecords.filter(r => r.criticalSeverity === 'medium').length}
          </span>
        </div>
      </div>
    </div>
  );
};
