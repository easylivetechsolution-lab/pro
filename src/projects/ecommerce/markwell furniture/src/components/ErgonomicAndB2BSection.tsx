import React, { useState } from 'react';
import { 
  Check, 
  ArrowRight, 
  Globe, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';
import personSittingChairImg from '../assets/images/person_sitting_chair_posture.jpg';
import warehouseImg from '../assets/images/warehouse_logistics_1789336824286.jpg';
import ergoChairImg from '../assets/images/ergo_chair_final.png';

interface ErgonomicAndB2BSectionProps {
  onShopErgonomic: () => void;
  onOpenB2B: () => void;
}

interface ChairFeature {
  id: string;
  label: string;
  dotX: number; // percentage in SVG (0-100)
  dotY: number;
  topPercent: number; // top percentage for the pill
  description: string;
}

const CHAIR_FEATURES: ChairFeature[] = [
  {
    id: 'headrest',
    label: 'Adjustable Headrest',
    dotX: 28,
    dotY: 13,
    topPercent: 12,
    description: 'Multi-angle height and tilt adjustment engineered to alleviate cervical spine tension.',
  },
  {
    id: 'mesh',
    label: 'Breathable Mesh',
    dotX: 29,
    dotY: 28,
    topPercent: 27,
    description: 'High-tensile breathable mesh back promotes active thermal dissipation throughout the day.',
  },
  {
    id: 'lumbar',
    label: 'Lumbar Support',
    dotX: 28,
    dotY: 42,
    topPercent: 42,
    description: 'Biomechanical lumbar curve supports the natural lordotic curve of your lower spine.',
  },
  {
    id: 'armrests',
    label: 'Adjustable Armrests',
    dotX: 37,
    dotY: 53,
    topPercent: 57,
    description: '4D multidirectional armrests adjust in height, depth, and angle to relax shoulder muscles.',
  },
  {
    id: 'swivel',
    label: '360° Swivel',
    dotX: 28,
    dotY: 67,
    topPercent: 72,
    description: 'Heavy-duty pneumatic Class 4 cylinder ensuring fluid 360-degree silent rotation.',
  },
  {
    id: 'wheels',
    label: 'Smooth Rolling Wheels',
    dotX: 38,
    dotY: 86,
    topPercent: 87,
    description: 'Floor-safe dual caster wheels glide quietly on hardwood, tile, and commercial carpets.',
  },
];

export const ErgonomicAndB2BSection: React.FC<ErgonomicAndB2BSectionProps> = ({
  onShopErgonomic,
  onOpenB2B,
}) => {
  // Default active feature matching reference (Breathable Mesh is highlighted)
  const [activeFeatureId, setActiveFeatureId] = useState<string>('mesh');

  const currentIndex = CHAIR_FEATURES.findIndex((f) => f.id === activeFeatureId);

  const handlePrevFeature = () => {
    const prevIdx = (currentIndex - 1 + CHAIR_FEATURES.length) % CHAIR_FEATURES.length;
    setActiveFeatureId(CHAIR_FEATURES[prevIdx].id);
  };

  const handleNextFeature = () => {
    const nextIdx = (currentIndex + 1) % CHAIR_FEATURES.length;
    setActiveFeatureId(CHAIR_FEATURES[nextIdx].id);
  };

  return (
    <section id="ergonomic" className="py-12 sm:py-16 bg-[#faf8f5] relative overflow-hidden border-b border-stone-200/70 select-none text-[#161c24]">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Left Ergonomic (~68% width, 8 cols) + Right B2B (~32% width, 4 cols) */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 lg:gap-6 items-stretch">

          {/* ========================================================
              LEFT CONTAINER: "Ergonomic Designed for You"
              (Woman at desk on left + Text & Checkmarks center + 
               Isolated Chair with 6 Annotated Feature Callouts right)
             ======================================================== */}
          <div className="xl:col-span-8 bg-white rounded-3xl border border-stone-200/90 shadow-xl overflow-hidden relative flex flex-col lg:flex-row items-stretch">
            
            {/* 1. LEFT SUB-PANEL: Person sitting with proper posture on ergonomic chair */}
            <div className="lg:w-[26%] xl:w-[26%] shrink-0 relative overflow-hidden min-h-[260px] lg:min-h-[450px]">
              <img
                src={personSittingChairImg}
                alt="Person sitting with healthy posture on an ergonomic office chair"
                className="w-full h-full object-cover object-center"
              />
              {/* Soft gradient edge toward center */}
              <div className="absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-white to-transparent hidden lg:block pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent lg:hidden pointer-events-none" />
            </div>

            {/* 2. CENTER SUB-PANEL: Title, Description, Checkmarks & Shop Button */}
            <div className="lg:w-[34%] xl:w-[33%] p-6 sm:p-7 flex flex-col justify-between shrink-0 bg-white relative z-10 border-r border-stone-100/80">
              <div>
                {/* Header Title in Serif Display matching reference */}
                <h3 className="font-serif text-2xl sm:text-[27px] font-bold text-stone-900 tracking-tight leading-[1.18]">
                  Ergonomic Designed<br />for You
                </h3>

                {/* Subtitle / Description */}
                <p className="text-xs sm:text-[13px] text-stone-600 mt-2.5 leading-relaxed font-normal">
                  Better posture. Less strain. More productivity. Our ergonomic furniture supports your health and performance — all day, every day.
                </p>

                {/* 3 Checkmark Bullet Points */}
                <div className="space-y-3 mt-6 mb-7">
                  <div className="flex items-center gap-2.5 text-xs sm:text-[13px] font-semibold text-stone-800">
                    <Check className="w-4 h-4 text-stone-900 stroke-[2.5] shrink-0" />
                    <span>Adjustable & Flexible Designs</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs sm:text-[13px] font-semibold text-stone-800">
                    <Check className="w-4 h-4 text-stone-900 stroke-[2.5] shrink-0" />
                    <span>Back & Neck Support</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs sm:text-[13px] font-semibold text-stone-800">
                    <Check className="w-4 h-4 text-stone-900 stroke-[2.5] shrink-0" />
                    <span>Premium Comfort Materials</span>
                  </div>
                </div>
              </div>

              {/* Call to Action Button: "Shop Ergonomic →" */}
              <div>
                <button
                  onClick={onShopErgonomic}
                  className="inline-flex items-center gap-2 bg-[#0c1817] hover:bg-[#182c2a] text-[#a5dfd0] font-semibold text-xs sm:text-[13px] px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer group"
                >
                  <span>Shop Ergonomic</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* 3. RIGHT SUB-PANEL: Isolated Ergonomic Chair with Annotated Callout Badges */}
            <div className="flex-1 relative bg-white p-4 sm:p-5 flex items-center min-h-[460px] lg:min-h-[480px] overflow-hidden">
              
              {/* Subtle Floor Shadow */}
              <div className="absolute bottom-4 left-[8%] sm:left-[10%] w-44 sm:w-52 h-5 bg-stone-400/25 rounded-full blur-md pointer-events-none" />

              {/* Ergonomic Chair Image - prominent, crisp, and tall */}
              <div className="absolute left-1 sm:left-3 top-3 bottom-3 w-[54%] sm:w-[52%] flex items-center justify-center z-10 pointer-events-none">
                <img
                  src={ergoChairImg}
                  alt="High-end ergonomic task chair with breathable mesh and lumbar support"
                  className="h-full w-auto max-h-[440px] max-w-full object-contain select-none"
                />
              </div>

              {/* SVG Leader Pointer Lines Layer */}
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none z-20"
                viewBox="0 0 100 100" 
                preserveAspectRatio="none"
              >
                {CHAIR_FEATURES.map((feature) => {
                  const isActive = activeFeatureId === feature.id;
                  const lineStartY = feature.topPercent;
                  const pillAnchorX = 56;

                  return (
                    <g key={feature.id} className="transition-all duration-300">
                      {/* Connection Line: From chair feature to pill anchor */}
                      <path
                        d={`M ${feature.dotX} ${feature.dotY} L ${pillAnchorX - 7} ${lineStartY} L ${pillAnchorX} ${lineStartY}`}
                        fill="none"
                        stroke={isActive ? '#059669' : '#cbd5e1'}
                        strokeWidth="0.85"
                        strokeDasharray="2 2"
                        opacity={isActive ? 1 : 0.8}
                      />
                    </g>
                  );
                })}
              </svg>

              {/* The 6 Annotated Callout Badges pinned along the right side */}
              <div className="absolute left-[56%] right-2 sm:right-3 top-0 bottom-0 py-4 z-30 pointer-events-auto">
                {CHAIR_FEATURES.map((feature) => {
                  const isActive = activeFeatureId === feature.id;
                  return (
                    <div 
                      key={feature.id}
                      style={{ top: `${feature.topPercent}%` }}
                      className="absolute left-0 -translate-y-1/2"
                    >
                      <button
                        onClick={() => setActiveFeatureId(feature.id)}
                        className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-medium tracking-tight whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-1.5 shadow-xs ${
                          isActive
                            ? 'bg-[#0c1817] text-[#a5dfd0] border border-[#0c1817] shadow-md font-semibold'
                            : 'bg-white/95 text-stone-700 border border-stone-200/90 hover:border-stone-400 hover:text-stone-900'
                        }`}
                      >
                        <span>{feature.label}</span>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Navigation Carousel Chevrons (< and >) */}
              <button
                onClick={handlePrevFeature}
                title="Previous feature"
                className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/95 hover:bg-white border border-stone-200 shadow-xs flex items-center justify-center text-stone-600 hover:text-stone-900 z-30 cursor-pointer transition-transform hover:scale-105"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleNextFeature}
                title="Next feature"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/95 hover:bg-white border border-stone-200 shadow-xs flex items-center justify-center text-stone-600 hover:text-stone-900 z-30 cursor-pointer transition-transform hover:scale-105"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

            </div>

          </div>


          {/* ========================================================
              RIGHT CONTAINER: "B2B & Wholesale"
              (Cohesive dark charcoal/obsidian card with Globe icon,
               Checkmarks, Start Partnership CTA, and Warehouse photo)
             ======================================================== */}
          <div 
            id="b2b-section"
            className="xl:col-span-4 bg-[#12151c] rounded-3xl border border-white/10 shadow-xl overflow-hidden relative flex flex-row items-stretch"
          >
            {/* Left Content Area: Title, Description, Checkmarks & CTA */}
            <div className="w-[58%] p-6 sm:p-7 flex flex-col justify-between relative z-10 shrink-0">
              <div>
                {/* Header Title */}
                <h3 className="font-serif text-2xl sm:text-[28px] font-bold text-white tracking-tight leading-tight">
                  B2B & Wholesale
                </h3>

                {/* Subtitle */}
                <p className="text-xs sm:text-[13px] text-zinc-400 mt-2 leading-relaxed font-normal">
                  Partner with us for exclusive bulk pricing, custom orders and reliable global supply.
                </p>

                {/* 3 Checkmark Bullet Points */}
                <div className="space-y-3 my-6">
                  <div className="flex items-center gap-2.5 text-xs sm:text-[13px] font-semibold text-zinc-100">
                    <Check className="w-4 h-4 text-[#e2b47f] stroke-[2.5] shrink-0" />
                    <span>Competitive Pricing</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs sm:text-[13px] font-semibold text-zinc-100">
                    <Check className="w-4 h-4 text-[#e2b47f] stroke-[2.5] shrink-0" />
                    <span>Reliable Supply Chain</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs sm:text-[13px] font-semibold text-zinc-100">
                    <Check className="w-4 h-4 text-[#e2b47f] stroke-[2.5] shrink-0" />
                    <span>Dedicated Account Managers</span>
                  </div>
                </div>
              </div>

              {/* Start a B2B Partnership Button matching warm tan pill in reference */}
              <div>
                <button
                  onClick={onOpenB2B}
                  className="inline-flex items-center gap-2 bg-[#e2b47f] hover:bg-[#d6a56e] text-[#12161f] font-bold text-xs sm:text-[13px] px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer group whitespace-nowrap"
                >
                  <span>Start a B2B Partnership</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#12161f] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Image Area: Furniture Warehouse & Logistics Shelving */}
            <div className="flex-1 relative overflow-hidden shrink-0">
              <img
                src={warehouseImg}
                alt="Organized furniture warehouse and global logistics supply center"
                className="w-full h-full object-cover object-center"
              />
              {/* Soft gradient blend on left edge */}
              <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#12151c] to-transparent pointer-events-none" />

              {/* Wireframe Globe Icon in top right corner matching reference */}
              <div className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-xs border border-white/20 flex items-center justify-center text-white/90">
                <Globe className="w-4 h-4 text-white" />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
