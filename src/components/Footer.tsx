import React from 'react';
import { ExternalLink, Globe, MapPin, Database } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1f1b18] text-[#f5f2ed]/60 border-t border-white/5 font-['Satoshi'] pt-16 pb-12 px-8 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10 text-xs">
        {/* Column 1: Brand & Purpose */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="font-['Clash_Display'] text-lg font-bold text-[#f5f2ed] tracking-tight">
              ANVISA<span className="text-[#b85d38]">·</span>DOU
            </span>
            <span className="text-[10px] font-['JetBrains_Mono'] uppercase tracking-widest text-[#f5f2ed]/40">
              AGENT
            </span>
          </div>
          <p className="leading-relaxed text-[#f5f2ed]/70">
            Autonomous Brazilian regulatory intelligence agent monitoring the Diário Oficial da União (DOU) Section 1 and ANVISA databases for product, petition, and manufacturing site indeferimentos.
          </p>
          <div className="text-[11px] font-['JetBrains_Mono'] text-[#b85d38]/80 font-bold">
            FEDERAL GAZETTE JURISDICTION · BRASÍLIA / DF
          </div>
        </div>

        {/* Column 2: Navigation & Sections */}
        <div className="space-y-3">
          <h4 className="font-['Clash_Display'] text-sm font-bold text-[#f5f2ed] uppercase tracking-wider">
            Surveillance
          </h4>
          <ul className="space-y-2 text-[#f5f2ed]/70">
            <li>
              <a href="#grid" className="hover:text-[#b85d38] transition-colors">
                Intelligence Data Grid
              </a>
            </li>
            <li>
              <a href="#markdown" className="hover:text-[#b85d38] transition-colors">
                Strict Markdown Schema
              </a>
            </li>
            <li>
              <a href="#rdc-studies" className="hover:text-[#b85d38] transition-colors">
                RDC Root-Cause Studies
              </a>
            </li>
            <li>
              <a href="#gmp-inspections" className="hover:text-[#b85d38] transition-colors">
                Sterile Facility Inspections
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: ANVISA Normative Frameworks */}
        <div className="space-y-3">
          <h4 className="font-['Clash_Display'] text-sm font-bold text-[#f5f2ed] uppercase tracking-wider">
            RDC Frameworks
          </h4>
          <ul className="space-y-2 font-['JetBrains_Mono'] text-[11px] text-[#f5f2ed]/70">
            <li>RDC nº 658/2022 (GMP & Cleanrooms)</li>
            <li>RDC nº 359/2020 (CADIFA Active Ingredients)</li>
            <li>RDC nº 749/2022 (Bioequivalence Criteria)</li>
            <li>RDC nº 55/2010 (Biologicals & Viral Safety)</li>
            <li>RDC nº 677/2022 (Nitrosamine Control)</li>
          </ul>
        </div>

        {/* Column 4: Official Portals & Contact */}
        <div className="space-y-3">
          <h4 className="font-['Clash_Display'] text-sm font-bold text-[#f5f2ed] uppercase tracking-wider">
            Official Gateways
          </h4>
          <ul className="space-y-2 text-[#f5f2ed]/70">
            <li>
              <a
                href="https://www.in.gov.br/web/dou/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#b85d38] transition-colors flex items-center gap-1.5"
              >
                <Globe className="w-3.5 h-3.5 text-[#b85d38]" />
                <span>Imprensa Nacional (www.in.gov.br)</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </li>
            <li>
              <a
                href="https://consultas.anvisa.gov.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#b85d38] transition-colors flex items-center gap-1.5"
              >
                <Database className="w-3.5 h-3.5 text-[#8a6240]" />
                <span>ANVISA Consultation Portal</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </li>
            <li>
              <div className="flex items-center gap-1.5 text-[#f5f2ed]/50 pt-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>SIA Trecho 5, Área Especial 57 - Brasília, DF</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#f5f2ed]/40 font-['JetBrains_Mono']">
        <div>
          © 2026 Brazilian Regulatory Intelligence Agent · All rights reserved.
        </div>
        <div>
          Qualification Discipline: Strictly sanitary decisions; excluding procurement & administrative decrees.
        </div>
      </div>
    </footer>
  );
};
