import React, { useState } from 'react';
import {
  Plane,
  Satellite,
  Cpu,
  Gauge,
  QrCode,
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  ChevronRight,
} from 'lucide-react';
import { TECH_FEATURES } from '../data';

interface TechnologySectionProps {
  onExploreTech: () => void;
}

export const TechnologySection: React.FC<TechnologySectionProps> = ({ onExploreTech }) => {
  const [activeTechId, setActiveTechId] = useState(TECH_FEATURES[0].id);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Plane':
        return <Plane className="w-5 h-5 text-[#34d399]" />;
      case 'Satellite':
        return <Satellite className="w-5 h-5 text-sky-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-purple-400" />;
      case 'Gauge':
        return <Gauge className="w-5 h-5 text-amber-400" />;
      case 'QrCode':
        return <QrCode className="w-5 h-5 text-[#d8b06d]" />;
      default:
        return <Zap className="w-5 h-5 text-[#34d399]" />;
    }
  };

  const currentFeature = TECH_FEATURES.find((f) => f.id === activeTechId) || TECH_FEATURES[0];

  return (
    <section id="technology" className="py-20 lg:py-28 bg-[#04120a] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Mission */}
          <div className="lg:col-span-4 space-y-6">
            <h2
              id="technology-heading"
              className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight font-serif"
            >
              Technology for
              <br />
              Better Harvests
            </h2>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              We use advanced technology to monitor, protect and enhance every acre.
              From orbital satellite radars to autonomous drone swarms, precision data drives
              every agronomic choice.
            </p>

            {/* Active Tech Feature Explainer Pill */}
            <div className="p-4 rounded-2xl bg-[#092217] border border-[#22c55e]/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  {currentFeature.title}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#22c55e]/20 text-[#34d399]">
                  {currentFeature.badge}
                </span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                {currentFeature.description}
              </p>
            </div>

            <div>
              <button
                id="explore-tech-btn"
                onClick={onExploreTech}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#d8b06d] to-[#c39953] hover:from-[#e3c185] hover:to-[#cca35c] text-[#041009] text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-lg flex items-center gap-2 group"
              >
                <span>Explore Our Technology</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Center Column: High-tech Drone & Laser Field Visual Card */}
          <div className="lg:col-span-4 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-[#081e13] border border-[#22c55e]/30 aspect-[4/5] group">
              <img
                src="https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80"
                alt="Agricultural drone scanning crops at sunset"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04120a] via-black/30 to-transparent" />

              {/* Laser Line Scanning Effect Overlay */}
              <div className="absolute inset-x-0 top-1/3 h-0.5 bg-[#34d399]/70 shadow-[0_0_8px_#34d399]" />

              {/* Live HUD Badges on the Drone View */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-white bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                <span className="flex items-center gap-1.5">
                  SPECTRAL SCAN
                </span>
                <span>ALT: 42M / VEL: 14 KM/H</span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#071911]/90 backdrop-blur-md border border-[#22c55e]/30 space-y-1">
                <span className="text-[10px] font-mono text-[#d8b06d] block uppercase tracking-widest">
                  LIVE TELEMETRY FEED
                </span>
                <h4 className="text-sm font-bold text-white font-serif">
                  Sub-millimeter NDVI Analysis
                </h4>
                <p className="text-[11px] text-gray-300 leading-tight">
                  Detects microscopic moisture deficits 72 hours before visible canopy wilt.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 5 Interactive Tech Capabilities */}
          <div className="lg:col-span-4 space-y-3">
            {TECH_FEATURES.map((feat) => {
              const isSelected = activeTechId === feat.id;
              return (
                <div
                  key={feat.id}
                  id={`tech-feature-card-${feat.id}`}
                  onClick={() => setActiveTechId(feat.id)}
                  className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-[#0d2a1c] border-[#c39953] shadow-lg ring-1 ring-[#c39953]/50'
                      : 'bg-[#071911] border-[#22c55e]/20 hover:bg-[#0b2317] hover:border-[#34d399]/40'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                        isSelected ? 'bg-[#133d28]' : 'bg-[#061810]'
                      }`}
                    >
                      {getIcon(feat.icon)}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-white truncate font-serif">
                        {feat.title}
                      </h3>
                      <p className="text-xs text-emerald-400 truncate">
                        {feat.subtitle}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                      isSelected
                        ? 'bg-[#c39953] text-[#041009]'
                        : 'text-gray-500 hover:text-white'
                    }`}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
