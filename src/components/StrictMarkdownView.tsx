import React, { useState } from 'react';
import { Copy, Check, Download, FileText, Code2, AlertTriangle, BookOpen } from 'lucide-react';

interface StrictMarkdownViewProps {
  markdownContent: string;
  totalFound: number;
}

export const StrictMarkdownView: React.FC<StrictMarkdownViewProps> = ({
  markdownContent,
  totalFound,
}) => {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'preview' | 'raw'>('preview');

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ANVISA_DOU_Indeferimentos_${new Date().toISOString().split('T')[0]}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const isNegativeMatch = markdownContent.trim() === 'No new qualifying ANVISA indeferimento entries found for this date range.';

  return (
    <div className="bg-[#ffffff] border border-[#46372d]/12 rounded-sm overflow-hidden shadow-xs mb-8">
      {/* Action Header with Warm Earthy Background */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 bg-[#f4efe8] border-b border-[#46372d]/10">
        <div className="flex items-center gap-3">
          <BookOpen className="w-4 h-4 text-[#8a6240]" />
          <h3 className="font-['Clash_Display'] text-base font-bold text-[#1a1715]">
            Strict Markdown Output & RDC Studies
          </h3>
          <span className="text-xs font-['JetBrains_Mono'] text-[#786f66]">
            {totalFound} qualifying entries
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Segmented View Mode Toggle */}
          <div className="flex items-center p-0.5 bg-[#eae3d8] rounded-full text-xs font-['Satoshi'] font-semibold">
            <button
              onClick={() => setViewMode('preview')}
              className={`px-3.5 py-1 rounded-full transition-colors flex items-center gap-1.5 ${
                viewMode === 'preview' ? 'bg-[#1a1715] text-[#ffffff]' : 'text-[#786f66] hover:text-[#1a1715]'
              }`}
            >
              <FileText className="w-3 h-3" />
              <span>Rendered Table</span>
            </button>
            <button
              onClick={() => setViewMode('raw')}
              className={`px-3.5 py-1 rounded-full transition-colors flex items-center gap-1.5 ${
                viewMode === 'raw' ? 'bg-[#1a1715] text-[#ffffff]' : 'text-[#786f66] hover:text-[#1a1715]'
              }`}
            >
              <Code2 className="w-3 h-3" />
              <span>Raw Markdown</span>
            </button>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="px-4 py-1.5 text-xs font-['Satoshi'] font-bold text-[#1a1715] hover:text-[#b85d38] bg-[#ffffff] hover:bg-[#faf7f3] rounded-full border border-[#46372d]/20 transition-colors flex items-center gap-1.5 uppercase tracking-wider shadow-2xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#1a1715]" />}
            <span>{copied ? 'Copied' : 'Copy Table'}</span>
          </button>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="px-4 py-1.5 text-xs font-['Satoshi'] font-bold text-[#1a1715] hover:text-[#b85d38] bg-[#ffffff] hover:bg-[#faf7f3] rounded-full border border-[#46372d]/20 transition-colors flex items-center gap-1.5 uppercase tracking-wider shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-[#1a1715]" />
            <span>Download .MD</span>
          </button>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6">
        {isNegativeMatch ? (
          <div className="py-16 text-center">
            <div className="w-12 h-12 rounded-full bg-[#f4efe8] border border-[#46372d]/15 flex items-center justify-center text-[#8a6240] mx-auto mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <p className="font-['JetBrains_Mono'] text-sm text-[#1a1715] font-semibold max-w-md mx-auto">
              "No new qualifying ANVISA indeferimento entries found for this date range."
            </p>
            <p className="font-['Satoshi'] text-xs text-[#786f66] mt-2">
              No product or manufacturing facility rejection notices were published in the Federal Gazette within the selected timeframe.
            </p>
          </div>
        ) : viewMode === 'raw' ? (
          <pre className="p-5 bg-[#fbf9f6] rounded-sm border border-[#46372d]/10 text-xs font-['JetBrains_Mono'] text-[#1a1715] whitespace-pre-wrap overflow-x-auto leading-relaxed select-all">
            {markdownContent}
          </pre>
        ) : (
          <div className="overflow-x-auto">
            <MarkdownTableRenderer markdown={markdownContent} />
          </div>
        )}
      </div>
    </div>
  );
};

function MarkdownTableRenderer({ markdown }: { markdown: string }) {
  const lines = markdown.split('\n');
  const tableLines: string[] = [];
  const afterTableLines: string[] = [];
  let isTable = false;
  let finishedTable = false;

  for (const line of lines) {
    if (line.trim().startsWith('|')) {
      isTable = true;
      tableLines.push(line.trim());
    } else if (isTable) {
      finishedTable = true;
      afterTableLines.push(line);
    } else if (finishedTable) {
      afterTableLines.push(line);
    }
  }

  if (tableLines.length < 2) {
    return (
      <pre className="text-xs font-['JetBrains_Mono'] text-[#1a1715] whitespace-pre-wrap">
        {markdown}
      </pre>
    );
  }

  const headerCells = tableLines[0]
    .split('|')
    .slice(1, -1)
    .map(c => c.trim());

  const rows = tableLines.slice(2).map(r =>
    r
      .split('|')
      .slice(1, -1)
      .map(c => c.trim())
  );

  return (
    <div className="space-y-8">
      {/* Strict Markdown Rendered Table */}
      <div className="border border-[#46372d]/12 rounded-sm overflow-hidden bg-[#ffffff]">
        <table className="w-full text-left text-xs text-[#1a1715] divide-y divide-[#46372d]/10">
          <thead className="bg-[#f4efe8] text-[#1a1715] font-['Satoshi'] font-bold uppercase tracking-wider text-[11px]">
            <tr>
              {headerCells.map((h, i) => (
                <th key={i} className="px-3.5 py-3 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#46372d]/8 font-['Satoshi']">
            {rows.map((row, rIdx) => (
              <tr key={rIdx} className="hover:bg-[#fbf9f6] transition-colors">
                {row.map((cell, cIdx) => {
                  const isLink = cell.includes('[') && cell.includes('](');
                  const isDate = cIdx === 0;
                  const isProcess = cIdx === 3;
                  const isDecision = cIdx === 4;

                  return (
                    <td
                      key={cIdx}
                      className={`px-3.5 py-3 align-top leading-relaxed ${
                        isDate || isProcess || isDecision ? "font-['JetBrains_Mono'] text-[#1a1715]" : ''
                      } ${cIdx === 5 ? 'min-w-[280px] max-w-sm text-[#3a3530]' : ''}`}
                    >
                      {isLink ? (
                        <a
                          href={extractUrl(cell)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#b85d38] font-bold underline underline-offset-2 hover:text-[#8a4224]"
                        >
                          {extractLinkText(cell)}
                        </a>
                      ) : cell.startsWith('MOTIVO DO INDEFERIMENTO:') ? (
                        <div>
                          <span className="font-bold text-[#b85d38]">MOTIVO DO INDEFERIMENTO: </span>
                          <span>{cell.replace('MOTIVO DO INDEFERIMENTO:', '').trim()}</span>
                        </div>
                      ) : (
                        cell
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* After-table Markdown (RDC studies and critical notes) with earthy styling */}
      {afterTableLines.length > 0 && (
        <div className="p-6 bg-[#fbf9f6] border border-[#46372d]/12 rounded-sm font-['Satoshi'] text-xs text-[#3a3530] space-y-3 leading-relaxed">
          {afterTableLines.map((line, idx) => {
            if (line.startsWith('### ')) {
              return (
                <h4 key={idx} className="font-['Clash_Display'] text-lg font-bold text-[#1a1715] pt-3 pb-1 border-b border-[#46372d]/10">
                  {line.replace('### ', '')}
                </h4>
              );
            } else if (line.startsWith('#### ')) {
              return (
                <h5 key={idx} className="font-['Clash_Display'] text-sm font-bold text-[#b85d38] pt-2">
                  {line.replace('#### ', '')}
                </h5>
              );
            } else if (line.startsWith('- **')) {
              return (
                <div key={idx} className="pl-3 border-l-2 border-[#b85d38]/40 text-xs">
                  <span dangerouslySetInnerHTML={{ __html: line.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#1a1715] font-semibold">$1</strong>') }} />
                </div>
              );
            } else if (line.trim().length > 0) {
              return <p key={idx}>{line}</p>;
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
}

function extractUrl(markdownLink: string): string {
  const match = markdownLink.match(/\((.*?)\)/);
  if (!match) return 'https://www.in.gov.br/web/dou/';
  let url = match[1];
  // Ensure canonical www. prefix
  if (url.startsWith('https://in.gov.br/')) {
    url = url.replace('https://in.gov.br/', 'https://www.in.gov.br/');
  }
  return url;
}

function extractLinkText(markdownLink: string): string {
  const match = markdownLink.match(/\[(.*?)\]/);
  return match ? match[1] : 'DOU Notice';
}
