import React, { useState } from 'react';
import {
  Droplets,
  Sprout,
  Activity,
  Sun,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import { SUSTAINABILITY_METRICS } from '../data';

interface SustainabilityProps {
  onOurImpact: () => void;
}

export const Sustainability: React.FC<SustainabilityProps> = ({ onOurImpact }) => {
  const [selectedMetric, setSelectedMetric] = useState(SUSTAINABILITY_METRICS[0]);

  return (
    <section id="sustainability" className="py-20 lg:py-28 bg-[#f6f5ef] text-[#12281c] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading & Mission */}
          <div className="lg:col-span-4 space-y-6">
            <h2
              id="sustainability-heading"
              className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0a2316] leading-tight font-serif"
            >
              Sustainability
              <br />
              in Action
            </h2>

            <p className="text-base sm:text-lg text-[#3b4e42] leading-relaxed">
              We farm with the future in mind — reducing our environmental footprint while
              increasing biological productivity, water resilience and food nutrition.
            </p>

            {/* Active Highlight Detail Pill */}
            <div className="p-4 rounded-2xl bg-white border border-[#22c55e]/25 shadow-md space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0a2316] uppercase tracking-wider">
                  {selectedMetric.title}
                </span>
                <span className="text-xl font-bold text-[#15803d]">
                  {selectedMetric.value}%
                </span>
              </div>
              <p className="text-xs text-[#4b5563] leading-relaxed">
                {selectedMetric.description}
              </p>
            </div>

            <div>
              <button
                id="sustainability-our-impact-btn"
                onClick={onOurImpact}
                className="px-6 py-3 rounded-full bg-[#0d281a] hover:bg-[#133827] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 group"
              >
                <span>Our Impact</span>
                <ArrowRight className="w-4 h-4 text-[#c39953] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Center Column: Interactive Circular Radial Dial Infographic */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
              {/* SVG Multi-Ring Dial */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 240 240">
                {/* Background Track Rings */}
                <circle cx="120" cy="120" r="100" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                <circle cx="120" cy="120" r="82" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                <circle cx="120" cy="120" r="64" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                <circle cx="120" cy="120" r="46" fill="none" stroke="#e2e8f0" strokeWidth="8" />

                {/* Progress Gauges */}
                {/* Ring 1: Water (78%) */}
                <circle
                  cx="120"
                  cy="120"
                  r="100"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 100}`}
                  strokeDashoffset={`${2 * Math.PI * 100 * (1 - 0.78)}`}
                  className="transition-all duration-1000"
                />

                {/* Ring 2: Soil (64%) */}
                <circle
                  cx="120"
                  cy="120"
                  r="82"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 82}`}
                  strokeDashoffset={`${2 * Math.PI * 82 * (1 - 0.64)}`}
                  className="transition-all duration-1000"
                />

                {/* Ring 3: Regenerative (52%) */}
                <circle
                  cx="120"
                  cy="120"
                  r="64"
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 64}`}
                  strokeDashoffset={`${2 * Math.PI * 64 * (1 - 0.52)}`}
                  className="transition-all duration-1000"
                />

                {/* Ring 4: Energy / Bio (42%) */}
                <circle
                  cx="120"
                  cy="120"
                  r="46"
                  fill="none"
                  stroke="#eab308"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 46}`}
                  strokeDashoffset={`${2 * Math.PI * 46 * (1 - 0.42)}`}
                  className="transition-all duration-1000"
                />
              </svg>

              {/* Center Leaf Icon / Button */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <div className="w-16 h-16 rounded-full bg-[#103a27] text-[#34d399] flex items-center justify-center shadow-xl border-2 border-[#22c55e]/40">
                  <Sprout className="w-8 h-8 text-[#34d399]" />
                </div>
                <span className="text-[11px] font-bold text-[#0a2316] uppercase tracking-wider mt-2">
                  AgriFuture
                </span>
              </div>
            </div>

            {/* Metric Labels around the Dial (As shown in mockup) */}
            <div className="grid grid-cols-2 gap-3 mt-6 w-full max-w-md">
              {SUSTAINABILITY_METRICS.map((metric) => (
                <button
                  key={metric.id}
                  id={`sustainability-metric-${metric.id}`}
                  onClick={() => setSelectedMetric(metric)}
                  className={`p-3 rounded-xl border text-left transition-all duration-200 ${
                    selectedMetric.id === metric.id
                      ? 'bg-white border-[#22c55e] shadow-md ring-1 ring-[#22c55e]'
                      : 'bg-white/60 border-gray-200 hover:bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#0a2316] truncate">
                      {metric.title}
                    </span>
                    <span
                      className="text-sm font-bold font-mono ml-1"
                      style={{ color: metric.color }}
                    >
                      {metric.value}%
                    </span>
                  </div>
                  <span className="text-[10px] text-[#6b7280] block truncate">
                    {metric.highlight}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Landscape Visual Card */}
          <div className="lg:col-span-3">
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-white border border-[#22c55e]/20 aspect-[3/4] group">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"
                alt="Sunlit green terraced sustainable landscape"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#34d399] block">
                  ZERO RUN-OFF PROMISE
                </span>
                <h4 className="text-sm font-bold font-serif">Living Terraces & Corridors</h4>
                <p className="text-[11px] text-gray-300 mt-1">
                  100% of rainwater collected and recycled back into micro-irrigation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
