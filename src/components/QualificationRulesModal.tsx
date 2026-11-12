import React from 'react';
import { X, CheckCircle2, XCircle, Shield, FileSearch } from 'lucide-react';

interface QualificationRulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QualificationRulesModal: React.FC<QualificationRulesModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1a1715]/40 backdrop-blur-xs animate-in fade-in duration-150 font-['Satoshi']">
      <div className="bg-[#ffffff] border border-[#46372d]/15 rounded-sm max-w-xl w-full p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-5 border-b border-[#46372d]/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#b85d38] flex items-center justify-center text-[#ffffff] shadow-2xs">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-['Clash_Display'] text-xl font-bold text-[#1a1715]">
                Qualification Rules & Scope
              </h3>
              <p className="text-xs font-['JetBrains_Mono'] text-[#786f66]">
                DOU Section 1 · ANVISA Decisional Jurisdiction
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#786f66] hover:text-[#1a1715] hover:bg-[#eae3d8] rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-5 py-6 text-xs text-[#3a3530]">
          {/* Strictly Included (Sage green accent) */}
          <div className="p-4 bg-[#f4f7f4] border border-[#4d6652]/20 rounded-sm space-y-2">
            <div className="flex items-center gap-2 text-[#4d6652] font-bold text-xs uppercase tracking-wider font-['Clash_Display']">
              <CheckCircle2 className="w-4 h-4 text-[#4d6652] shrink-0" />
              <span>Strictly Included (Qualified Entities)</span>
            </div>
            <ul className="list-disc list-inside text-[#3a3530] space-y-1 pl-1 leading-relaxed">
              <li>Drug registration, renewal, and post-approval modification petitions.</li>
              <li>Active Pharmaceutical Ingredient Master Files (CADIFA submissions).</li>
              <li>Good Manufacturing Practice (GMP / CBPF) facility inspections.</li>
              <li>Medical cannabis product authorizations and clinical trial protocols.</li>
              <li>Medical device registrations and IVD in vitro diagnostic kits.</li>
            </ul>
          </div>

          {/* Strictly Excluded (Terracotta accent) */}
          <div className="p-4 bg-[#fcf6f4] border border-[#b85d38]/20 rounded-sm space-y-2">
            <div className="flex items-center gap-2 text-[#b85d38] font-bold text-xs uppercase tracking-wider font-['Clash_Display']">
              <XCircle className="w-4 h-4 text-[#b85d38] shrink-0" />
              <span>Taxatively Excluded (Administrative Noise)</span>
            </div>
            <ul className="list-disc list-inside text-[#3a3530] space-y-1 pl-1 leading-relaxed">
              <li>Public procurement, bids, and equipment purchasing tenders (licitações).</li>
              <li>Civil servant appointments, retirements, leaves of absence, or dismissals.</li>
              <li>Internal organizational decrees and administrative staff assignments.</li>
              <li>General non-sanitary logistical contracts.</li>
            </ul>
          </div>

          {/* Verbatim Ground Rule (Warm Ochre accent) */}
          <div className="p-4 bg-[#fbf9f6] rounded-sm border border-[#46372d]/15 space-y-2">
            <div className="flex items-center gap-2 text-[#8a6240] font-bold text-xs uppercase tracking-wider font-['Clash_Display']">
              <FileSearch className="w-4 h-4 text-[#8a6240] shrink-0" />
              <span>Fidelity to Official Gazette Text</span>
            </div>
            <p className="text-[#555555] leading-relaxed">
              The agent quotes the official Portuguese text designated as <strong className="text-[#1a1715]">"MOTIVO DO INDEFERIMENTO"</strong> verbatim, accompanied by an in-depth English regulatory study of the governing RDC resolution. No subjective fault or safety risk is inferred beyond the published legal text.
            </p>
          </div>
        </div>

        <div className="pt-3 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#1a1715] hover:bg-[#b85d38] text-[#ffffff] font-['Satoshi'] font-bold text-xs uppercase tracking-wider rounded-full transition-colors"
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
};
