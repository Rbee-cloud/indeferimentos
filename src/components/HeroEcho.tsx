import React from 'react';
import { ArrowDown, ShieldCheck } from 'lucide-react';

interface HeroEchoProps {
  onExploreClick: () => void;
  totalCases: number;
}

export const HeroEcho: React.FC<HeroEchoProps> = ({ onExploreClick, totalCases }) => {
  return (
    <section className="relative min-h-[65vh] flex flex-col justify-center items-center text-center px-6 pt-12 pb-16 overflow-hidden border-b border-[#46372d]/10 bg-[#f5f2ed]">
      {/* Editorial Meta Bar with Earthy Tones */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs font-['Satoshi'] font-semibold uppercase tracking-[0.2em] text-[#786f66] mb-6">
        <span className="text-[#b85d38] font-bold">BRAZILIAN HEALTH SURVEILLANCE</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#8a6240]"></span>
        <span>DIÁRIO OFICIAL DA UNIÃO · SEÇÃO 1</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#8a6240]"></span>
        <span className="text-[#4d6652] font-bold">RDC STATUTORY REJECTION DISSECTION</span>
      </div>

      {/* The Typographic Echo Stack with proper padding to prevent any text overlap */}
      <div className="relative my-6 sm:my-10 py-4 px-2 w-full flex items-center justify-center select-none overflow-visible">
        <div className="echo-stack relative max-w-full">
          {/* Layer 4: Warm parchment shadow */}
          <span
            aria-hidden="true"
            className="echo-layer echo-layer-4 font-['Clash_Display'] font-bold text-3xl sm:text-5xl md:text-7xl lg:text-[96px] xl:text-[112px] tracking-[-0.04em] leading-[1.0] uppercase whitespace-nowrap block"
          >
            INDEFERIMENTOS
          </span>

          {/* Layer 3 */}
          <span
            aria-hidden="true"
            className="echo-layer echo-layer-3 font-['Clash_Display'] font-bold text-3xl sm:text-5xl md:text-7xl lg:text-[96px] xl:text-[112px] tracking-[-0.04em] leading-[1.0] uppercase whitespace-nowrap block"
          >
            INDEFERIMENTOS
          </span>

          {/* Layer 2 */}
          <span
            aria-hidden="true"
            className="echo-layer echo-layer-2 font-['Clash_Display'] font-bold text-3xl sm:text-5xl md:text-7xl lg:text-[96px] xl:text-[112px] tracking-[-0.04em] leading-[1.0] uppercase whitespace-nowrap block"
          >
            INDEFERIMENTOS
          </span>

          {/* Layer 1 */}
          <span
            aria-hidden="true"
            className="echo-layer echo-layer-1 font-['Clash_Display'] font-bold text-3xl sm:text-5xl md:text-7xl lg:text-[96px] xl:text-[112px] tracking-[-0.04em] leading-[1.0] uppercase whitespace-nowrap block"
          >
            INDEFERIMENTOS
          </span>

          {/* Main Foreground Layer */}
          <h1 className="echo-layer-main font-['Clash_Display'] font-bold text-3xl sm:text-5xl md:text-7xl lg:text-[96px] xl:text-[112px] tracking-[-0.04em] leading-[1.0] uppercase text-[#1a1715] whitespace-nowrap block">
            INDEFERIMENTOS
          </h1>
        </div>
      </div>

      {/* Subtitle with generous spacing so nothing collides */}
      <p className="max-w-2xl text-base sm:text-lg font-['Satoshi'] font-medium text-[#786f66] mt-4 mb-10 leading-relaxed text-balance">
        Autonomous regulatory intelligence agent monitoring Brazilian Federal Gazette notices and ANVISA databases. Extracts qualifying product and manufacturing site rejections with verbatim legal grounds and in-depth RDC compliance analysis.
      </p>

      {/* Action CTA & Earthy Stat Counter */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={onExploreClick}
          className="h-12 px-8 rounded-full bg-[#1a1715] hover:bg-[#b85d38] text-[#ffffff] transition-all duration-200 text-xs font-['Satoshi'] font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm"
        >
          <span>Explore Intelligence Grid</span>
          <ArrowDown className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-4 text-xs font-['JetBrains_Mono'] text-[#1a1715] border border-[#46372d]/15 rounded-full px-5 py-3 bg-[#ffffff]/80 backdrop-blur-xs shadow-xs">
          <span className="font-bold text-[#b85d38] tabular-nums">{totalCases} VERIFIED REJECTIONS</span>
          <span className="text-[#cfc4b6]">|</span>
          <span className="text-[#786f66]">RDC 658 · RDC 359 · RDC 749</span>
        </div>
      </div>
    </section>
  );
};
