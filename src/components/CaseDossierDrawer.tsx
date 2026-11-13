import React, { useState } from 'react';
import { X, ExternalLink, Copy, Check, ShieldAlert, Building, FileSpreadsheet, Scale, Clock, AlertTriangle, BookOpen, Wrench, Search } from 'lucide-react';
import { RejectionRecord } from '../types/regulatory';

interface CaseDossierDrawerProps {
  record: RejectionRecord | null;
  onClose: () => void;
}

export const CaseDossierDrawer: React.FC<CaseDossierDrawerProps> = ({ record, onClose }) => {
  const [copiedProcess, setCopiedProcess] = useState(false);
  const [copiedCitation, setCopiedCitation] = useState(false);
  const [copiedDouUrl, setCopiedDouUrl] = useState(false);

  if (!record) return null;

  const handleCopyProcess = () => {
    navigator.clipboard.writeText(record.processNo);
    setCopiedProcess(true);
    setTimeout(() => setCopiedProcess(false), 2000);
  };

  const handleCopyDouUrl = () => {
    navigator.clipboard.writeText(record.douLink);
    setCopiedDouUrl(true);
    setTimeout(() => setCopiedDouUrl(false), 2000);
  };

  const handleCopyCitation = () => {
    const citation = `| ${record.date} | ${record.productOrSite} | ${record.company} (${record.cnpj}) | ${record.processNo} | ${record.decisionType} | ${record.officialGround} | ${record.priorHistory} | [DOU Notice](${record.douLink}) |`;
    navigator.clipboard.writeText(citation);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  const cleanProcessNumber = record.processNo.replace(/[./-]/g, '');
  const anvisaSearchUrl = `https://consultas.anvisa.gov.br/#/consulta-generica/q/?numeroProcesso=${encodeURIComponent(cleanProcessNumber)}`;
  const douSearchByRe = record.douSearchUrl || `https://www.in.gov.br/consulta/-/buscar/dou?q=${encodeURIComponent(record.decisionType)}`;
  const cnpjSearchUrl = `https://cnpj.biz/${record.cnpj.replace(/\D/g, '')}`;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#1a1715]/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#ffffff] border-l border-[#46372d]/15 h-full flex flex-col shadow-2xl overflow-y-auto font-['Satoshi']">
        {/* Drawer Header with Warm Earthy Background */}
        <div className="px-8 py-5 bg-[#f4efe8] border-b border-[#46372d]/10 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-4 h-4 text-[#b85d38]" />
            <span className="text-xs font-['JetBrains_Mono'] uppercase tracking-wider text-[#786f66]">
              ANVISA CASE DOSSIER
            </span>
            <span className="text-[#c7beaf]">·</span>
            <span className="text-xs font-['JetBrains_Mono'] text-[#b85d38] font-bold">
              {record.decisionType}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#786f66] hover:text-[#1a1715] hover:bg-[#eae3d8] rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Body with Zero Text Collisions */}
        <div className="p-8 space-y-7">
          {/* Main Title Banner */}
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-['JetBrains_Mono'] text-[#786f66] uppercase tracking-wider mb-2">
              <span className="font-semibold text-[#8a6240]">DOU DATE: {record.date}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#4d6652] font-bold bg-[#f2f6f3] px-2 py-0.5 rounded border border-[#4d6652]/20">
                {record.category}
              </span>
            </div>
            <h2 className="font-['Clash_Display'] text-2xl font-bold text-[#1a1715] tracking-[-0.03em] leading-snug">
              {record.productOrSite}
            </h2>
          </div>

          {/* Critical Alert Callout if High Severity */}
          {record.criticalSeverity === 'high' && (
            <div className="p-5 bg-[#fcf6f4] border border-[#b85d38] rounded-sm text-xs text-[#1a1715] flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-[#b85d38] shrink-0 mt-0.5" />
              <div>
                <span className="font-['Clash_Display'] font-bold text-sm text-[#b85d38] block">
                  Critical Regulatory Interdiction
                </span>
                <span className="text-[#46372d] leading-relaxed mt-1 block">
                  {record.criticalNotes ||
                    'Immediate regulatory rejection impacting patient safety assurance, sterility qualification, or facility good manufacturing practice.'}
                </span>
              </div>
            </div>
          )}

          {/* RDC Regulatory Study & Root Cause Analysis */}
          <div className="bg-[#fbf9f6] rounded-sm border border-[#46372d]/12 p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between pb-3 border-b border-[#46372d]/10 gap-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#8a6240]" />
                <span className="font-['Clash_Display'] text-base font-bold text-[#1a1715]">
                  RDC Regulatory Study & Root Cause Analysis
                </span>
              </div>
              <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#b85d38] bg-[#fdf5f2] px-2.5 py-1 rounded border border-[#b85d38]/20">
                {record.rdcStudy.rdcNumber}
              </span>
            </div>

            {/* Regulation Title & Articles */}
            <div>
              <span className="text-[11px] font-['JetBrains_Mono'] font-bold uppercase tracking-wider text-[#786f66] block mb-1">
                Governing ANVISA Regulation & Articles
              </span>
              <div className="text-sm font-semibold text-[#1a1715]">
                {record.rdcStudy.rdcTitle}
              </div>
              <div className="text-xs font-['JetBrains_Mono'] text-[#8a6240] mt-1">
                {record.rdcStudy.keyArticles}
              </div>
            </div>

            {/* Why ANVISA Issued Rejection (Summary in English) */}
            <div className="bg-[#ffffff] p-4 rounded-sm border border-[#46372d]/10 space-y-1.5 shadow-xs">
              <span className="text-xs font-['Clash_Display'] font-bold uppercase tracking-wide text-[#b85d38] block">
                Why ANVISA Issued Rejection (Technical Summary):
              </span>
              <p className="text-xs text-[#3a3530] leading-relaxed">
                {record.rdcStudy.rejectionSummaryEn}
              </p>
            </div>

            {/* Statutory Requirement vs Key Gap */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-[#ffffff] rounded-sm border border-[#46372d]/10">
                <span className="font-['JetBrains_Mono'] font-bold text-[#786f66] uppercase text-[10px] block mb-1">
                  Statutory Mandate
                </span>
                <p className="text-[#3a3530] leading-relaxed">
                  {record.rdcStudy.regulatoryRequirement}
                </p>
              </div>

              <div className="p-3.5 bg-[#ffffff] rounded-sm border border-[#46372d]/10">
                <span className="font-['JetBrains_Mono'] font-bold text-[#b85d38] uppercase text-[10px] block mb-1">
                  Primary Compliance Gap
                </span>
                <p className="text-[#1a1715] font-semibold leading-relaxed">
                  {record.rdcStudy.complianceKeyGap}
                </p>
              </div>
            </div>

            {record.rdcStudy.remedialAction && (
              <div className="pt-2 text-xs flex items-start gap-2 text-[#46372d]">
                <Wrench className="w-3.5 h-3.5 text-[#8a6240] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#1a1715]">Remedial Roadmap: </strong>
                  {record.rdcStudy.remedialAction}
                </span>
              </div>
            )}
          </div>

          {/* Official Portuguese Verbatim Grounds */}
          <div className="bg-[#ffffff] rounded-sm border border-[#46372d]/12 p-5 space-y-2">
            <div className="flex items-center justify-between text-xs text-[#786f66]">
              <span className="font-['Clash_Display'] font-bold tracking-wider text-[#1a1715] uppercase flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-[#8a6240]" />
                Verbatim Rejection Ground (DOU Seção 1)
              </span>
              <span className="text-[11px] font-['JetBrains_Mono'] text-[#786f66]">Portuguese Text</span>
            </div>
            <blockquote className="text-xs text-[#1a1715] leading-relaxed border-l-3 border-[#b85d38] pl-4 py-1 italic bg-[#fbf9f6]">
              {record.officialGround}
            </blockquote>
          </div>

          {/* Regulated Sponsor & ANVISA Process No. */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Company & CNPJ */}
            <div className="p-4 bg-[#fbf9f6] rounded-sm border border-[#46372d]/12 space-y-2">
              <div className="text-xs text-[#786f66] flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-[#8a6240]" />
                <span>Applicant / Sponsor</span>
              </div>
              <div className="text-sm font-semibold text-[#1a1715]">{record.company}</div>
              <div className="text-xs font-['JetBrains_Mono'] text-[#786f66] flex items-center justify-between pt-1">
                <span>CNPJ: {record.cnpj}</span>
                <a
                  href={cnpjSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#b85d38] font-bold hover:underline text-[11px] flex items-center gap-0.5"
                >
                  Verify CNPJ <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>

            {/* ANVISA Process No. */}
            <div className="p-4 bg-[#fbf9f6] rounded-sm border border-[#46372d]/12 space-y-2">
              <div className="text-xs text-[#786f66] flex items-center gap-1.5">
                <FileSpreadsheet className="w-3.5 h-3.5 text-[#8a6240]" />
                <span>ANVISA Process Number</span>
              </div>
              <div className="text-sm font-['JetBrains_Mono'] font-bold text-[#1a1715] flex items-center justify-between">
                <span>{record.processNo}</span>
                <button
                  onClick={handleCopyProcess}
                  className="p-1 text-[#786f66] hover:text-[#1a1715] rounded transition-colors"
                  title="Copy Process Number"
                >
                  {copiedProcess ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <div className="pt-1">
                <a
                  href={record.anvisaPortalUrl || anvisaSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#b85d38] font-bold hover:underline text-[11px] flex items-center gap-1 font-['JetBrains_Mono']"
                >
                  Query ANVISA Portal Dossier <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Prior History */}
          <div className="p-4 bg-[#fbf9f6] rounded-sm border border-[#46372d]/12 space-y-1.5">
            <div className="text-xs text-[#786f66] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#8a6240]" />
              <span>Prior Inspection History & Recurrence</span>
            </div>
            <p className="text-xs text-[#3a3530] leading-relaxed">
              {record.priorHistory}
            </p>
          </div>

          {/* Dedicated DOU Verification Actions - Multi-Path Reliability */}
          <div className="space-y-3 pt-2">
            <div className="text-xs font-['JetBrains_Mono'] uppercase tracking-wider text-[#786f66] font-bold">
              OFFICIAL FEDERAL GAZETTE (DOU) VERIFICATION
            </div>

            {/* Direct Official Link */}
            <a
              href={record.douLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#1a1715] hover:bg-[#b85d38] text-[#ffffff] font-['Satoshi'] font-bold text-xs py-3 px-4 rounded-full transition-colors flex items-center justify-center gap-2 uppercase tracking-wider shadow-sm"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Open Gazette Notice on www.in.gov.br</span>
            </a>

            {/* Direct Search by RE Number on in.gov.br if specific article hash moved */}
            <a
              href={douSearchByRe}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#fbf9f6] hover:bg-[#eae3d8] text-[#1a1715] font-['Satoshi'] font-bold text-xs py-2.5 px-4 rounded-full border border-[#46372d]/20 transition-colors flex items-center justify-center gap-2 uppercase tracking-wider"
            >
              <Search className="w-3.5 h-3.5 text-[#8a6240]" />
              <span>Search {record.decisionType} on DOU Gazette Portal</span>
            </a>

            {/* Copy DOU URL Fallback */}
            <div className="flex gap-2">
              <button
                onClick={handleCopyDouUrl}
                className="flex-1 bg-transparent hover:bg-[#fbf9f6] text-[#786f66] hover:text-[#1a1715] font-['Satoshi'] font-bold text-xs py-2.5 px-3 rounded-full border border-[#46372d]/15 transition-colors flex items-center justify-center gap-2"
              >
                {copiedDouUrl ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>DOU URL Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy DOU Link</span>
                  </>
                )}
              </button>

              <button
                onClick={handleCopyCitation}
                className="flex-1 bg-transparent hover:bg-[#fbf9f6] text-[#786f66] hover:text-[#1a1715] font-['Satoshi'] font-bold text-xs py-2.5 px-3 rounded-full border border-[#46372d]/15 transition-colors flex items-center justify-center gap-2"
              >
                {copiedCitation ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Citation Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Markdown Row</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
