import React, { useState } from 'react';
import {
  ArrowRight,
  Ship,
  CheckCircle2,
  ShieldCheck,
  Thermometer,
  Clock,
  Plane,
  Globe2,
} from 'lucide-react';
import { EXPORT_REGIONS } from '../data';
import exportExpressImage from '../assets/images/export_global_express_1789619182899.jpg';

interface ExportLogisticsProps {
  onExploreCapabilities: () => void;
}

export const ExportLogistics: React.FC<ExportLogisticsProps> = ({
  onExploreCapabilities,
}) => {
  const [selectedRegion, setSelectedRegion] = useState(EXPORT_REGIONS[0]);

  return (
    <section id="export" className="py-20 lg:py-28 bg-[#f7f6f0] text-[#12281c] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4 max-w-2xl">
            <h2
              id="export-heading"
              className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0a2316] leading-tight font-serif"
            >
              Export & Logistics
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-[#2a3c31] leading-relaxed font-normal">
              Connecting our farms to markets around the world with reliable, sustainable
              intermodal cold-chains and phytosanitary documentation.
            </p>
          </div>

          <div>
            <button
              id="explore-export-btn"
              onClick={onExploreCapabilities}
              className="px-6 py-3 rounded-full bg-[#0d281a] hover:bg-[#133827] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 group whitespace-nowrap shadow-md"
            >
              <span>Explore Export Capabilities</span>
              <ArrowRight className="w-4 h-4 text-[#c39953] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Global Logistics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Styled Picture with Catchy Label & Dispatch Specs */}
          <div className="lg:col-span-5 rounded-3xl overflow-hidden bg-[#071e13] p-5 sm:p-6 shadow-xl border border-[#22c55e]/30 flex flex-col justify-between text-white group">
            {/* Top Styled Picture Container with Catchy Labels */}
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#04140d] border border-white/10 shadow-lg mb-5">
              <img
                src={exportExpressImage}
                alt="Worldwide fresh agricultural export cargo ship and air freight express"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071e13] via-black/20 to-black/35" />

              {/* Catchy Label at top left with white text */}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-xs font-mono font-medium text-white border border-white/20 flex items-center gap-2 shadow-lg">
                <Plane className="w-3.5 h-3.5 text-[#d8b06d]" />
                <span>WORLDWIDE FRESH EXPRESS</span>
              </div>

              {/* Top right speed pill */}
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-mono text-white border border-white/15">
                24H DISPATCH
              </div>

              {/* Bottom image HUD: Active selected destination */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-white bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                <span className="flex items-center gap-1.5 truncate">
                  <Globe2 className="w-3.5 h-3.5 text-[#d8b06d] flex-shrink-0" />
                  <span className="truncate">DESTINATION: {selectedRegion.name.toUpperCase()}</span>
                </span>
                <span className="text-white font-semibold flex-shrink-0 ml-2">{selectedRegion.volume}</span>
              </div>
            </div>

            {/* Content Details */}
            <div className="space-y-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-serif leading-tight">
                  Soil to Global Ports in 24 Hours
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 mt-1.5 leading-relaxed">
                  Direct refrigerated intermodal corridor serving <span className="text-white font-medium">{selectedRegion.routes}</span> with uninterrupted cold-chain integrity.
                </p>
              </div>

              {/* Operational Telemetry Grid */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="flex items-center gap-1.5 text-xs text-gray-300 mb-1">
                    <Thermometer className="w-3.5 h-3.5 text-[#34d399]" />
                    <span>Cold-Chain Temp</span>
                  </div>
                  <div className="text-sm sm:text-base font-bold text-white font-mono">-0.5°C to +3°C</div>
                  <div className="text-[11px] text-gray-300 mt-0.5">Atmosphere Locked</div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="flex items-center gap-1.5 text-xs text-gray-300 mb-1">
                    <Clock className="w-3.5 h-3.5 text-[#d8b06d]" />
                    <span>Annual Allocation</span>
                  </div>
                  <div className="text-sm sm:text-base font-bold text-white font-mono">{selectedRegion.volume}</div>
                  <div className="text-[11px] text-gray-300 mt-0.5">Direct Wholesale</div>
                </div>
              </div>

              {/* Compliance Highlights */}
              <div className="space-y-2 pt-1 text-xs sm:text-sm text-gray-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e] flex-shrink-0" />
                  <span>Pre-cleared phytosanitary export documentation</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#22c55e] flex-shrink-0" />
                  <span>24/7 continuous satellite GPS & ethylene monitoring</span>
                </div>
              </div>
            </div>

            {/* Content Bottom Telemetry Bar */}
            <div className="pt-4 mt-5 border-t border-white/10 flex items-center justify-between text-xs sm:text-sm text-white font-mono">
              <span className="flex items-center gap-1.5 text-gray-300">
                <Ship className="w-4 h-4 text-[#d8b06d]" />
                FLEET: 18 ACTIVE VESSELS
              </span>
              <span className="text-[#d8b06d] font-bold">100% ON-TIME DISPATCH</span>
            </div>
          </div>

          {/* Center Column: Export Capabilities List */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-3">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#0a2316] mb-3.5">
                Select Destination Continent
              </h3>
              <div className="space-y-2.5">
                {EXPORT_REGIONS.map((reg) => (
                  <button
                    key={reg.name}
                    id={`export-region-${reg.name.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => setSelectedRegion(reg)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      selectedRegion.name === reg.name
                        ? 'bg-white border-[#22c55e] shadow-lg ring-2 ring-[#22c55e]/50'
                        : 'bg-white/80 border-gray-200 hover:bg-white hover:border-[#22c55e]/40'
                    }`}
                  >
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-[#0a2316]">{reg.name}</h4>
                      <p className="text-xs sm:text-sm text-[#4b5e52] mt-0.5">{reg.routes}</p>
                    </div>
                    <div className="text-right pl-3 flex-shrink-0">
                      <span className="text-sm sm:text-base font-mono font-bold text-[#166534] block">
                        {reg.volume}
                      </span>
                      <span className="text-xs text-emerald-700 font-semibold block mt-0.5">
                        {reg.status}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#506356] italic pt-1">
              Select any continent to preview dedicated route logistics and port terminals.
            </p>
          </div>

          {/* Right Column: Cargo Container Ship Card */}
          <div className="lg:col-span-3 flex">
            <div className="relative w-full rounded-3xl overflow-hidden shadow-xl bg-white border border-[#22c55e]/20 min-h-[380px] group flex flex-col justify-end">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
                alt="Large modern cargo vessel shipping fresh produce across ocean at sunset"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80';
                }}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

              {/* Top label with white text */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono font-medium text-white border border-white/20">
                MARITIME REEFER FLEET
              </div>

              <div className="relative z-10 p-5 sm:p-6 text-white space-y-1.5">
                <span className="text-xs uppercase font-mono tracking-widest text-[#d8b06d] block font-semibold">
                  INTERMODAL TRANSIT
                </span>
                <h4 className="text-lg sm:text-xl font-bold font-serif leading-tight">
                  Maritime Cold-Chain
                </h4>
                <p className="text-sm text-gray-200 mt-1 leading-relaxed">
                  Controlled-atmosphere reefer containers with live satellite temperature and ethylene logging.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
