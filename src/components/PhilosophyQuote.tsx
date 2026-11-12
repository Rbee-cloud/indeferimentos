import React from 'react';

export const PhilosophyQuote: React.FC = () => {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto border-b border-[#46372d]/10">
      {/* Centered vertical hairline divider in warm terracotta tone */}
      <div className="w-[1.5px] h-16 bg-[#b85d38]/40 mx-auto mb-10"></div>

      {/* Large-scale editorial quote with contrasting italic serif in warm umber */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <blockquote className="font-['Clash_Display'] text-2xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] leading-[1.15] text-[#1a1715]">
          "Sanitary compliance is never an assumption; it is the{' '}
          <span className="font-['Newsreader'] italic font-normal text-[#b85d38] tracking-normal px-1">
            verifiable
          </span>{' '}
          precision of statutory chemistry, clinical trials, and manufacturing integrity."
        </blockquote>
        <p className="text-xs font-['Satoshi'] font-semibold uppercase tracking-[0.2em] text-[#8a6240] mt-6">
          ANVISA REGULATORY METHODOLOGY & STATUTORY JURISDICTION
        </p>
      </div>

      {/* 3-Column Informational Grid with Earthy Tones and ample spacing */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-[#46372d]/10">
        {/* Column 1 */}
        <div className="space-y-3 p-5 rounded-sm bg-[#ffffff]/60 border border-[#46372d]/10">
          <div className="text-xs font-['JetBrains_Mono'] font-bold text-[#b85d38]">
            01 / SURVEILLANCE
          </div>
          <h3 className="font-['Clash_Display'] text-xl font-bold tracking-[-0.02em] text-[#1a1715]">
            Official Federal Gazette (DOU)
          </h3>
          <p className="font-['Satoshi'] text-sm text-[#786f66] leading-relaxed">
            Direct querying of the National Press portal (<code className="text-xs text-[#1a1715] bg-[#eae3d8] px-1.5 py-0.5 rounded font-['JetBrains_Mono']">www.in.gov.br</code>) Section 1. Identifies every Resolution RE issued by ANVISA's specialized collegiate boards (GGMED, COIFA, GIMED).
          </p>
        </div>

        {/* Column 2 */}
        <div className="space-y-3 p-5 rounded-sm bg-[#ffffff]/60 border border-[#46372d]/10">
          <div className="text-xs font-['JetBrains_Mono'] font-bold text-[#8a6240]">
            02 / RDC STUDY
          </div>
          <h3 className="font-['Clash_Display'] text-xl font-bold tracking-[-0.02em] text-[#1a1715]">
            Statutory RDC Analysis
          </h3>
          <p className="font-['Satoshi'] text-sm text-[#786f66] leading-relaxed">
            Every rejection ground is matched to its governing Board Resolution (RDC) or Normative Instruction (IN). We dissect the precise articles violated—from HVAC airflow containment (RDC 658) to nitrosamines (RDC 677) and bioequivalence failure (RDC 749).
          </p>
        </div>

        {/* Column 3 */}
        <div className="space-y-3 p-5 rounded-sm bg-[#ffffff]/60 border border-[#46372d]/10">
          <div className="text-xs font-['JetBrains_Mono'] font-bold text-[#4d6652]">
            03 / DISCIPLINE
          </div>
          <h3 className="font-['Clash_Display'] text-xl font-bold tracking-[-0.02em] text-[#1a1715]">
            Strict Qualification Filter
          </h3>
          <p className="font-['Satoshi'] text-sm text-[#786f66] leading-relaxed">
            Eliminates bureaucratic noise. Administrative tenders, human resource appointments, and public procurements are taxatively purged. Only genuine therapeutic, active ingredient, and manufacturing facility rejections enter the dossier.
          </p>
        </div>
      </div>
    </section>
  );
};
