import React, { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';

interface SeedToHarvestProps {
  onLearnMore: () => void;
}

interface ProcessStage {
  number: string;
  title: string;
  subtitle: string;
  image: string;
  isCircle?: boolean;
  details: string;
  metric: string;
  duration: string;
}

const STAGES: ProcessStage[] = [
  {
    number: '01',
    title: 'Seed',
    subtitle: 'High-quality, resilient varieties',
    image: '/process-01-seed.jpg',
    isCircle: true,
    details: 'Non-GMO heritage and drought-resistant seeds selected for vigor, flavor, and deep root establishment.',
    metric: '99.4% Germination Rate',
    duration: 'Week 1 - 2',
  },
  {
    number: '02',
    title: 'Soil',
    subtitle: 'Enriched for optimal growth',
    image: '/process-02-soil.jpg',
    details: 'Custom bio-fertilized living humus and mycorrhizal inoculation ensure balanced micronutrient uptake.',
    metric: '4.8% Active Organic Matter',
    duration: 'Pre-Planting Cycle',
  },
  {
    number: '03',
    title: 'Growth',
    subtitle: 'Nurtured with precision care',
    image: '/process-03-growth.jpg',
    details: 'Continuous microclimate telemetry and automated sub-surface fertigation nurture sturdy vegetative canopies.',
    metric: '35% Water Conservation',
    duration: 'Weeks 3 - 10',
  },
  {
    number: '04',
    title: 'Harvest',
    subtitle: 'At the peak of quality',
    image: '/process-04-harvest.jpg',
    details: 'Hand-picked at peak brix and essential oil concentration for unmatched shelf-life, crispness, and aroma.',
    metric: 'Zero Over-Ripe Loss',
    duration: 'Peak Brix Window',
  },
  {
    number: '05',
    title: 'Distribution',
    subtitle: 'Delivered to global markets',
    image: '/process-05-distribution.jpg',
    // Removed any container flags - renders cleanly and directly without box/wrapper
    details: 'Temperature-controlled continuous cold-chain logistics deliver pristine harvests worldwide in record transit time.',
    metric: '< 24hr Port Dispatch',
    duration: 'Continuous Fleet',
  },
];

export const SeedToHarvest: React.FC<SeedToHarvestProps> = ({ onLearnMore }) => {
  const [selectedStage, setSelectedStage] = useState<ProcessStage | null>(null);

  return (
    <section
      id="process"
      className="relative pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 bg-[#071d13] text-white overflow-hidden"
    >
      {/* Subtle organic background gradient and lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#061b11] via-[#071f14] to-[#05170f] pointer-events-none" />
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 w-96 h-96 bg-[#dfc599]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
          
          {/* Left Column: Heading, Paragraph, CTA Button */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-4 sm:space-y-5">
            {/* Eyebrow */}
            <div
              id="process-eyebrow"
              className="text-xs sm:text-[13px] font-bold tracking-[0.22em] text-[#dfc599] uppercase"
            >
              OUR PROCESS
            </div>

            {/* Main Title */}
            <h2
              id="process-heading"
              className="text-4xl sm:text-5xl lg:text-[46px] xl:text-[52px] font-bold text-white tracking-tight leading-[1.08] font-serif"
            >
              From Seed<br />to Harvest
            </h2>

            {/* Description Paragraph */}
            <p
              id="process-description"
              className="text-xs sm:text-[13px] lg:text-sm text-[#b2c4ba] leading-relaxed max-w-[270px] font-normal"
            >
              Every stage matters. Our end-to-end process ensures quality, reliability and maximum yield.
            </p>

            {/* Sand Pill Button */}
            <div className="pt-2">
              <button
                id="process-cta-btn"
                onClick={onLearnMore}
                className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 rounded-full bg-[#ebd8b7] hover:bg-[#dfc599] text-[#0f2417] font-semibold text-xs sm:text-sm tracking-wide transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>Our Process</span>
                <ArrowRight className="w-4 h-4 text-[#0f2417]" />
              </button>
            </div>
          </div>

          {/* Right Column: 5 Sequential Stages with Images & Connector Arrows */}
          <div className="lg:col-span-8 xl:col-span-9">
            {/* Horizontal Timeline Container */}
            <div className="overflow-x-auto pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
              <div className="grid grid-cols-5 min-w-[700px] lg:min-w-0 gap-3 sm:gap-4 lg:gap-5 xl:gap-7 items-start">
                {STAGES.map((stage, idx) => (
                  <div
                    key={stage.number}
                    id={`process-stage-${stage.number}`}
                    onClick={() => setSelectedStage(stage)}
                    className="flex flex-col group cursor-pointer"
                  >
                    {/* Visual Asset Container */}
                    <div className="h-32 sm:h-36 md:h-40 flex items-center justify-center relative mb-4">
                      {stage.isCircle ? (
                        /* Stage 01: Circular Cutout */
                        <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden shadow-2xl border border-emerald-400/20 bg-[#092417] transition-transform duration-300 group-hover:scale-105">
                          <img
                            src={stage.image}
                            alt={stage.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        /* Stages 02, 03, 04, 05: Soil, Growth, Harvest, and Distribution */
                        <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                          <img
                            src={stage.image}
                            alt={stage.title}
                            className="w-full h-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)]"
                          />
                        </div>
                      )}
                    </div>

                    {/* Step Number & Connector Line with Arrowhead */}
                    <div className="flex items-center gap-2 w-full mb-2">
                      <span className="text-xs sm:text-sm font-bold font-mono text-[#dfc599] tracking-wider flex-shrink-0">
                        {stage.number}
                      </span>
                      {idx < STAGES.length - 1 ? (
                        <div className="flex-1 flex items-center min-w-[24px]">
                          <div className="h-[1px] w-full bg-[#dfc599]/60" />
                          <svg
                            viewBox="0 0 8 10"
                            className="w-2 h-2.5 text-[#dfc599]/80 fill-current flex-shrink-0 -ml-0.5"
                          >
                            <polygon points="0,0 8,5 0,10" />
                          </svg>
                        </div>
                      ) : (
                        <div className="flex-1" />
                      )}
                    </div>

                    {/* Stage Title & Subtitle */}
                    <div className="space-y-1 pr-1">
                      <h3 className="text-sm sm:text-base font-bold text-white tracking-tight group-hover:text-[#dfc599] transition-colors">
                        {stage.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-[#a0b5a8] leading-tight font-normal">
                        {stage.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Optional Stage Detail Drawer on Click */}
            {selectedStage && (
              <div
                id="selected-stage-inspector"
                className="mt-6 p-4 rounded-2xl bg-[#092518]/90 border border-[#dfc599]/30 backdrop-blur-md shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#061810] flex items-center justify-center border border-[#dfc599]/30 text-[#dfc599] font-mono font-bold text-sm">
                    {selectedStage.number}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">{selectedStage.title}</h4>
                      <span className="text-[11px] text-emerald-400 font-medium">Stage Active</span>
                    </div>
                    <p className="text-xs text-gray-300 max-w-xl">
                      {selectedStage.details}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-center">
                  <div className="text-right text-[11px] font-mono">
                    <span className="text-emerald-300 block">{selectedStage.metric}</span>
                    <span className="text-[#dfc599]">{selectedStage.duration}</span>
                  </div>
                  <button
                    onClick={() => setSelectedStage(null)}
                    className="p-1.5 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
