import React from 'react';
import { ArrowUpRight, Scale, ShieldAlert, FlaskConical, Factory } from 'lucide-react';
import { RejectionRecord } from '../types/regulatory';

interface ShowcaseGridProps {
  onSelectCase: (record: RejectionRecord) => void;
  featuredCases: RejectionRecord[];
}

export const ShowcaseGrid: React.FC<ShowcaseGridProps> = ({ onSelectCase, featuredCases }) => {
  const case1 = featuredCases[0]; // Sterile API site
  const case2 = featuredCases[2]; // CADIFA Nitrosamine
  const case3 = featuredCases[1]; // Bioequivalence Apixaban

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto border-b border-[#46372d]/10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#46372d]/10">
        <div>
          <div className="text-xs font-['JetBrains_Mono'] uppercase tracking-widest text-[#8a6240] font-semibold mb-1">
            STATUTORY SPOTLIGHT · HIGH PRIORITY JURISDICTION
          </div>
          <h2 className="font-['Clash_Display'] text-3xl font-bold tracking-[-0.03em] text-[#1a1715]">
            Critical Regulatory Focus Areas
          </h2>
        </div>
        <p className="font-['Satoshi'] text-xs text-[#786f66] max-w-md mt-2 md:mt-0 leading-relaxed">
          The three most prominent causes for ANVISA pharmaceutical indeferimentos in recent gazettes: Good Manufacturing Practice cleanrooms, mutagenic nitrosamine evaluation, and pharmacokinetic bioequivalence curves.
        </p>
      </div>

      {/* Asymmetrical 12-Column Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-12">
        {/* Item 1: Large 8-column rectangular card with warm terracotta accent */}
        {case1 && (
          <div
            onClick={() => onSelectCase(case1)}
            className="lg:col-span-8 bg-[#ffffff] border border-[#46372d]/12 p-8 rounded-sm hover:border-[#b85d38] transition-all cursor-pointer group flex flex-col justify-between shadow-xs"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between text-xs font-['JetBrains_Mono'] text-[#786f66] pb-4 mb-4 border-b border-[#46372d]/10 gap-2">
                <span className="font-bold text-[#b85d38] bg-[#fbf5f2] px-2.5 py-1 rounded border border-[#b85d38]/20">
                  RDC 658/2022 & IN 35/2019
                </span>
                <span>{case1.decisionType} · {case1.date}</span>
              </div>
              <h3 className="font-['Clash_Display'] text-2xl font-bold tracking-[-0.03em] text-[#1a1715] group-hover:text-[#b85d38] transition-colors mb-3 leading-snug">
                {case1.productOrSite}
              </h3>
              <p className="font-['Satoshi'] text-sm text-[#786f66] leading-relaxed mb-4">
                <strong className="text-[#1a1715] font-semibold">RDC Root-Cause Study: </strong>
                {case1.rdcStudy.rejectionSummaryEn}
              </p>
              <div className="bg-[#f5f2ed] p-4 rounded text-xs font-['Satoshi'] border-l-3 border-[#b85d38]">
                <span className="font-bold text-[#1a1715]">Compliance Key Gap: </span>
                <span className="text-[#46372d]">{case1.rdcStudy.complianceKeyGap}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 mt-6 border-t border-[#46372d]/10 text-xs font-['Satoshi'] font-bold uppercase tracking-wider text-[#1a1715] group-hover:text-[#b85d38] transition-colors">
              <span>Inspect Full Technical Dossier</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        )}

        {/* Item 2: Vertical 4-column pill-shaped card with warm sage & umber tones */}
        <div className="lg:col-span-4 bg-[#ffffff] border border-[#46372d]/12 rounded-3xl lg:rounded-[9999px] p-8 flex flex-col justify-between items-center text-center hover:border-[#4d6652] transition-all group overflow-hidden shadow-xs min-h-[380px]">
          <div className="w-16 h-16 rounded-full bg-[#4d6652] text-[#ffffff] flex items-center justify-center mt-2 group-hover:rotate-12 transition-transform duration-300 shadow-xs">
            <Factory className="w-7 h-7" />
          </div>

          <div className="my-4 px-3">
            <span className="text-[11px] font-['JetBrains_Mono'] uppercase tracking-widest text-[#4d6652] font-bold block mb-1.5">
              FACILITY INSPECTION
            </span>
            <h4 className="font-['Clash_Display'] text-xl font-bold tracking-tight text-[#1a1715] mb-2 leading-snug">
              Sterile Cleanroom Compliance
            </h4>
            <p className="font-['Satoshi'] text-xs text-[#786f66] leading-relaxed">
              Mandatory ISO 5 laminar air velocity, automated particle counting, and locked GAMP 5 chromatography audit trails.
            </p>
          </div>

          <div className="mb-2">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-['JetBrains_Mono'] bg-[#f4f7f4] border border-[#4d6652]/30 text-[#4d6652] uppercase font-bold">
              ZERO-TOLERANCE
            </span>
          </div>
        </div>
      </div>

      {/* Row 2: Bespoke 3-column service cards with earthy accents */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Nitrosamines (Terracotta) */}
        <div className="bg-[#ffffff] hover:bg-[#faf7f3] border border-[#46372d]/12 p-6 rounded-sm transition-all duration-200 group shadow-xs">
          <div className="w-14 h-14 bg-[#fbf5f2] rounded flex items-center justify-center text-[#b85d38] mb-5 group-hover:rotate-12 group-hover:bg-[#b85d38] group-hover:text-[#ffffff] transition-all duration-300 border border-[#b85d38]/20">
            <FlaskConical className="w-6 h-6" />
          </div>
          <div className="text-xs font-['JetBrains_Mono'] text-[#b85d38] font-semibold mb-1">RDC 359/2020 & 677/2022</div>
          <h4 className="font-['Clash_Display'] text-lg font-bold text-[#1a1715] mb-2">
            CADIFA & Nitrosamines
          </h4>
          <p className="font-['Satoshi'] text-xs text-[#786f66] leading-relaxed mb-4">
            Strict requirements for Active Substance Master Files. Mandates validated Step 2 risk analyses for mutagenic nitrosamine impurities and Zone IVb tropical stability.
          </p>
          <div className="flex items-center gap-1 text-xs font-['Satoshi'] font-bold text-[#b85d38] tracking-wide uppercase">
            <span>Synthesis Controls</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 2: Bioequivalence (Warm Umber) */}
        <div className="bg-[#ffffff] hover:bg-[#faf7f3] border border-[#46372d]/12 p-6 rounded-sm transition-all duration-200 group shadow-xs">
          <div className="w-14 h-14 bg-[#f9f5f0] rounded flex items-center justify-center text-[#8a6240] mb-5 group-hover:rotate-12 group-hover:bg-[#8a6240] group-hover:text-[#ffffff] transition-all duration-300 border border-[#8a6240]/20">
            <Scale className="w-6 h-6" />
          </div>
          <div className="text-xs font-['JetBrains_Mono'] text-[#8a6240] font-semibold mb-1">RDC 749/2022 & 200/2017</div>
          <h4 className="font-['Clash_Display'] text-lg font-bold text-[#1a1715] mb-2">
            In Vivo Bioequivalence
          </h4>
          <p className="font-['Satoshi'] text-xs text-[#786f66] leading-relaxed mb-4">
            Generic registration acceptance criteria: 90% confidence intervals for Cmax and AUC must fall strictly between 80.00% and 125.00% with verified f2 dissolution similarity.
          </p>
          <div className="flex items-center gap-1 text-xs font-['Satoshi'] font-bold text-[#8a6240] tracking-wide uppercase">
            <span>Pharmacokinetics</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 3: Viral Safety & Sterility (Sage) */}
        <div className="bg-[#ffffff] hover:bg-[#faf7f3] border border-[#46372d]/12 p-6 rounded-sm transition-all duration-200 group shadow-xs">
          <div className="w-14 h-14 bg-[#f4f7f4] rounded flex items-center justify-center text-[#4d6652] mb-5 group-hover:rotate-12 group-hover:bg-[#4d6652] group-hover:text-[#ffffff] transition-all duration-300 border border-[#4d6652]/20">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="text-xs font-['JetBrains_Mono'] text-[#4d6652] font-semibold mb-1">RDC 55/2010 & IN 35/2019</div>
          <h4 className="font-['Clash_Display'] text-lg font-bold text-[#1a1715] mb-2">
            Viral Safety & Sterility
          </h4>
          <p className="font-['Satoshi'] text-xs text-[#786f66] leading-relaxed mb-4">
            Orthogonal viral clearance factors (≥4 log reduction) for non-enveloped pathogens in biologicals, and zero tolerance for positive growth during media fill simulations.
          </p>
          <div className="flex items-center gap-1 text-xs font-['Satoshi'] font-bold text-[#4d6652] tracking-wide uppercase">
            <span>Sterility Assurance</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </section>
  );
};
