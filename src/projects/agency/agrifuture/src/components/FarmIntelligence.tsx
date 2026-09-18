import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  X,
  Gauge,
} from 'lucide-react';

interface FarmIntelligenceProps {
  onLearnMore: () => void;
}

interface TelemetryBadge {
  id: string;
  title: string;
  value: string;
  iconUrl: string;
  position: {
    top: string;
    left: string;
  };
  details: string;
  unit: string;
  statusText: string;
}

const BADGES: TelemetryBadge[] = [
  {
    id: 'soil-moisture-top',
    title: 'Soil Moisture',
    value: '68%',
    iconUrl: '/icons/farm/moisture.svg',
    position: { top: '8%', left: '16%' },
    details: 'Subsurface capacitive sensors at 15cm & 45cm indicate optimal moisture retention with zero surface runoff.',
    unit: 'Volumetric Water Content',
    statusText: 'Optimal (65-72%)',
  },
  {
    id: 'crop-health-center',
    title: 'Crop Health',
    value: 'NDVI 0.88',
    iconUrl: '/icons/farm/crop-health.svg',
    position: { top: '5%', left: '40%' },
    details: 'Multispectral canopy analysis confirms high chlorophyll density and vigorous photosynthetic absorption.',
    unit: 'NDVI Index: 0.88',
    statusText: 'Vegetative Vigor High',
  },
  {
    id: 'weather-top-right',
    title: 'Microclimate',
    value: '24°C',
    iconUrl: '/icons/farm/weather.svg',
    position: { top: '7%', left: '68%' },
    details: 'Partly cloudy microclimate with steady 6 km/h westerly air movement and 54% ambient relative humidity.',
    unit: 'Ambient Temperature',
    statusText: 'Stable Transpiration',
  },
  {
    id: 'irrigation-mid-left',
    title: 'Smart Irrigation',
    value: 'Active Drip',
    iconUrl: '/icons/farm/irrigation.svg',
    position: { top: '34%', left: '8%' },
    details: 'Subsurface drip line pulsing metered water and bio-nutrients directly to root zones on automated schedule.',
    unit: 'Flow Rate: 4.2 L/min',
    statusText: 'Precision Metered',
  },
  {
    id: 'yield-forecast-front',
    title: 'Yield Forecast',
    value: '+12% Proj.',
    iconUrl: '/icons/farm/yield.svg',
    position: { top: '72%', left: '26%' },
    details: 'Machine learning model projections show 12% higher biomass than seasonal baseline due to balanced soil biology.',
    unit: 'Biomass Projections',
    statusText: 'Above Target Baseline',
  },
  {
    id: 'solar-energy-right',
    title: 'Solar Power',
    value: '100% Clean',
    iconUrl: '/icons/farm/solar.svg',
    position: { top: '24%', left: '84%' },
    details: 'Rooftop agrivoltaic solar panels generate 100% of greenhouse climate power and autonomous fleet recharging.',
    unit: 'Agrivoltaic Generation: 48 kW',
    statusText: 'Clean Self-Powered Grid',
  },
  {
    id: 'soil-nutrients-right',
    title: 'Soil Nutrients',
    value: 'pH 6.8 Optimal',
    iconUrl: '/icons/farm/nutrients.svg',
    position: { top: '70%', left: '85%' },
    details: 'Continuous in-ground electrochemical probes confirm balanced organic nitrogen, phosphorus, and potassium levels.',
    unit: 'N-P-K Organic Equilibrium',
    statusText: 'Bio-Active Living Soil',
  },
];

export const FarmIntelligence: React.FC<FarmIntelligenceProps> = ({ onLearnMore }) => {
  const [selectedBadge, setSelectedBadge] = useState<TelemetryBadge | null>(null);

  return (
    <section
      id="intelligence"
      className="relative py-16 sm:py-24 bg-[#f8f7f2] text-[#0a2316] overflow-hidden"
    >
      {/* Subtle Background Lighting Accent */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none select-none" />

      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center">
          
          {/* Left Column: Eyebrow, Title, Description, Button */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-5 sm:space-y-6 z-20">
            {/* Eyebrow */}
            <div
              id="intelligence-eyebrow"
              className="text-xs sm:text-[13px] font-bold tracking-[0.22em] text-[#0f3422] uppercase"
            >
              SMART FARMING
            </div>

            {/* Display Title */}
            <h2
              id="intelligence-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0a2316] leading-[1.08]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Farm Intelligence
            </h2>

            {/* Description Subtitle */}
            <p
              id="intelligence-description"
              className="text-sm sm:text-base text-[#3b4e42] leading-relaxed max-w-sm font-normal"
            >
              Data-driven decisions for healthier crops, higher yields and greater efficiency.
            </p>

            {/* CTA Button */}
            <div className="pt-2">
              <button
                id="intelligence-learn-more-btn"
                onClick={onLearnMore}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#ebd8b7] hover:bg-[#dfc599] text-[#13271b] font-semibold text-xs sm:text-sm tracking-wide transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 text-[#13271b]" />
              </button>
            </div>

            {/* Selected Badge Telemetry Card (Opens when clicking any label) */}
            {selectedBadge && (
              <div
                id="selected-badge-inspector"
                className="p-4 rounded-2xl bg-white border border-[#22c55e]/30 shadow-xl space-y-2 mt-4 transition-all animate-in fade-in slide-in-from-bottom-2 duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-[#0a271c] border border-white/10 flex items-center justify-center p-1.5 flex-shrink-0">
                      <img
                        src={selectedBadge.iconUrl}
                        alt={selectedBadge.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#0a2316]">{selectedBadge.title}</h4>
                      <p className="text-[10px] text-[#15803d] font-semibold">{selectedBadge.statusText}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-[#0a271c] text-[#a3e635] text-xs font-bold font-mono">
                      {selectedBadge.value}
                    </span>
                    <button
                      onClick={() => setSelectedBadge(null)}
                      className="p-1 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <p className="text-[11px] text-[#4b5563] leading-relaxed">
                  {selectedBadge.details}
                </p>
                <div className="text-[10px] text-gray-500 font-mono pt-1 border-t border-gray-100 flex justify-between">
                  <span>Metric: {selectedBadge.unit}</span>
                  <span className="text-emerald-600 font-semibold">Sensor Synced</span>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Isometric Smart Farm Canvas with Floating Intelligence Labels */}
          <div className="lg:col-span-8 xl:col-span-9 relative mt-6 lg:mt-0">
            <div
              id="farm-intelligence-stage"
              className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9.5] lg:aspect-[16/9] min-h-[440px] sm:min-h-[520px] md:min-h-[580px] lg:min-h-[620px] xl:min-h-[680px] 2xl:min-h-[740px] rounded-3xl overflow-hidden shadow-2xl bg-[#092218] border border-[#22c55e]/25"
            >
              {/* High-Resolution Isometric Farm Diorama Image */}
              <img
                src="/smart-farm-diorama.jpg"
                alt="Isometric smart agricultural farm diorama with greenhouses, fields, tractors and hovering telemetry drone"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform scale-[1.02] transition-transform duration-700 hover:scale-105"
              />

              {/* Subtle Ambient Depth Lighting */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/25 pointer-events-none" />

              {/* Autonomous Hovering Drone in Mid-Air */}
              <div
                id="autonomous-agri-drone"
                className="absolute z-20 pointer-events-auto cursor-pointer group"
                style={{ top: '6%', left: '55%' }}
                onClick={() =>
                  setSelectedBadge({
                    id: 'autonomous-drone-01',
                    title: 'AgriDrone Fleet',
                    value: 'Surveillance Active',
                    iconUrl: '/icons/farm/drone.svg',
                    position: { top: '6%', left: '55%' },
                    details: 'Autonomous drone patrolling sector 4 with multispectral 4K cameras and thermal crop stress sensors.',
                    unit: 'Flight Altitude: 35m',
                    statusText: 'Battery 84% • 12 GPS Satellites',
                  })
                }
              >
                <div className="relative flex flex-col items-center">
                  {/* Subtle hovering scan cone */}
                  <div className="w-16 h-12 bg-gradient-to-b from-sky-400/20 to-transparent clip-path-cone opacity-50 group-hover:opacity-80 transition-opacity pointer-events-none" />
                  
                  {/* Drone Node with Online-Fetched Official Vector Icon */}
                  <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#081e28]/95 border border-sky-400/50 shadow-[0_4px_16px_rgba(56,189,248,0.35)] -mt-7 animate-bounce duration-1000 group-hover:scale-110 transition-transform p-2">
                    <img
                      src="/icons/farm/drone.svg"
                      alt="AgriDrone Fleet Icon"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Floating Intelligence Badges */}
              {BADGES.map((badge) => {
                const isSelected = selectedBadge?.id === badge.id;
                return (
                  <button
                    key={badge.id}
                    id={`badge-${badge.id}`}
                    onClick={() => setSelectedBadge(badge)}
                    style={{
                      top: badge.position.top,
                      left: badge.position.left,
                    }}
                    className={`absolute z-20 flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl sm:rounded-2xl text-left transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl backdrop-blur-md cursor-pointer group ${
                      isSelected
                        ? 'bg-[#0e3b26] ring-2 ring-[#a3e635] scale-110 shadow-emerald-500/40 z-30'
                        : 'bg-[#082318]/95 hover:bg-[#0c2f20] border border-[#1b4e33]/90 hover:border-[#22c55e]/60 hover:scale-105'
                    }`}
                  >
                    {/* Icon Circle with Online-Fetched Official SVG */}
                    <div className="relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#051810] border border-white/10 group-hover:border-[#4ade80]/50 transition-colors flex-shrink-0 p-1.5">
                      <img
                        src={badge.iconUrl}
                        alt={badge.title}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Text Label & Value */}
                    <div className="leading-tight pr-1">
                      <div className="text-[11px] sm:text-xs font-medium text-gray-200 tracking-tight whitespace-nowrap">
                        {badge.title}
                      </div>
                      <div className="text-xs sm:text-sm md:text-[15px] font-bold text-white tracking-tight flex items-center gap-1">
                        <span>{badge.value}</span>
                      </div>
                    </div>
                  </button>
                );
              })}

              {/* Bottom Precision Tech Status Tag */}
              <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-5 right-4 sm:right-5 flex items-center justify-between text-[10px] sm:text-xs text-white/70 font-mono pointer-events-none bg-black/40 backdrop-blur-sm px-3.5 py-2 rounded-xl border border-white/10">
                <span className="flex items-center gap-1.5">
                  PRECISION AG CLOUD V4.2 / ALL SENSORS CONNECTED
                </span>
                <span className="hidden sm:inline text-emerald-300">
                  REFRESH INTERVAL: 1.2s / LATENCY: 18ms
                </span>
              </div>
            </div>

            {/* Mobile Helper / Interaction Hint */}
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-[#526658]">
              <Gauge className="w-3.5 h-3.5 text-[#22c55e]" />
              <span>Tap any telemetry badge to inspect live sensor readings and soil metrics</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
