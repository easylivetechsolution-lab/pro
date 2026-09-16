import React, { useState } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Check, 
  Layers, 
  CheckCircle2,
  ChevronRight,
  Info
} from 'lucide-react';
import inspectFabricChairImg from '../assets/images/inspect_fabric_chair_1789439929255.jpg';
import inspectJoineryTeamImg from '../assets/images/inspect_joinery_team_1789439943216.jpg';
import { QualityInspectionModal } from './QualityInspectionModal';

interface QualityInspectionSectionProps {
  onExploreProducts?: () => void;
  onOpenB2B?: () => void;
}

export const QualityInspectionSection: React.FC<QualityInspectionSectionProps> = ({
  onExploreProducts,
  onOpenB2B,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="quality-inspection" className="w-full py-10 sm:py-14 bg-[#f8f7f4] relative overflow-hidden select-none border-y border-stone-200/80">
      
      {/* Container matching maximum content width */}
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Panoramic Card inspired by the reference layout */}
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xl overflow-hidden relative grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[320px] lg:min-h-[360px]">
          
          {/* ========================================================
              LEFT COLUMN: Craftsman Hands Fabric & Frame Inspection
             ======================================================== */}
          <div className="lg:col-span-3 relative min-h-[220px] lg:min-h-full overflow-hidden group">
            <img
              src={inspectFabricChairImg}
              alt="Craftsman hands inspecting upholstery fabric and chair frame"
              className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
            />
            {/* Subtle soft edge blend toward center */}
            <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white via-white/80 to-transparent hidden lg:block pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white via-white/80 to-transparent lg:hidden pointer-events-none" />
            
            {/* Stage Pill Tag */}
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-black/60 backdrop-blur-md text-white border border-white/20 shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Stage 04 / Fabric & Tension
              </span>
            </div>
          </div>

          {/* ========================================================
              CENTER COLUMN: Moving Verified Badge & Core Headline
             ======================================================== */}
          <div 
            className="lg:col-span-5 px-6 py-8 sm:px-10 sm:py-10 flex flex-col items-center justify-center text-center relative z-10 bg-white"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            
            {/* Top Row: The Moving Verified Circular Seal */}
            <div className="flex items-center justify-center mb-5 relative">
              <div 
                className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center cursor-pointer group"
                onClick={() => setIsModalOpen(true)}
                title="Click to view all 10 inspection checkpoints"
              >
                {/* 1. Continuously Rotating Circular Text Ring ("our own verified round should be moving") */}
                <svg 
                  className={`w-full h-full transform-gpu transition-transform duration-300 ${
                    isHovered ? 'animate-[spin_8s_linear_infinite]' : 'animate-[spin_18s_linear_infinite]'
                  }`} 
                  viewBox="0 0 140 140"
                >
                  <defs>
                    <path
                      id="inspectionCirclePath"
                      d="M 70, 70 m -50, 0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0"
                    />
                  </defs>
                  <text className="text-[10px] sm:text-[10.5px] font-extrabold tracking-[0.22em] uppercase fill-[#2e0854]">
                    <textPath href="#inspectionCirclePath" startOffset="0%">
                      ★ WORKWELL VERIFIED ★ 10-POINT INSPECTION
                    </textPath>
                  </text>
                </svg>

                {/* 2. Central Verified Shield & Stamped Emblem */}
                <div className="absolute inset-[22%] rounded-full bg-gradient-to-br from-[#4a127a] via-[#350b5e] to-[#240642] flex items-center justify-center shadow-lg border-2 border-[#e6b980] group-hover:scale-108 group-hover:border-white transition-all duration-300">
                  <div className="relative flex flex-col items-center justify-center text-white">
                    <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 text-[#f8d7a4] stroke-[2.5]" />
                    <span className="text-[8px] font-black uppercase tracking-wider text-white mt-0.5">
                      PASS
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Headline with exact styling balance */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#2e0854] tracking-tight leading-[1.08] max-w-md">
              your shortcut to the good stuff
            </h2>

            {/* Subtitle with Interactive 10-Point Trigger */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <p className="text-sm sm:text-base text-zinc-700 font-medium">
                Shop picks that passed our <strong className="text-[#2e0854] font-bold">10-point quality inspection</strong>
              </p>
              
              {/* Arrow Button matching the user's uploaded reference design */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#350b5e] hover:bg-[#4a127a] text-white flex items-center justify-center transition-all duration-200 transform hover:scale-110 shadow-md cursor-pointer shrink-0"
                aria-label="Open 10-Point Quality Inspection details"
                title="Explore 10 Inspection Points"
              >
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            {/* Micro Badge Checklist Ticker */}
            <div className="mt-5 pt-4 border-t border-stone-200/80 w-full flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] font-semibold text-zinc-600">
              <span className="flex items-center gap-1 text-[#2e0854] bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200/70">
                <Check className="w-3.5 h-3.5 stroke-[3] text-emerald-600" /> 350 lb Load Tested
              </span>
              <span className="flex items-center gap-1 text-[#2e0854] bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200/70">
                <Check className="w-3.5 h-3.5 stroke-[3] text-emerald-600" /> BIFMA Class-4
              </span>
              <span className="flex items-center gap-1 text-[#2e0854] bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200/70">
                <Check className="w-3.5 h-3.5 stroke-[3] text-emerald-600" /> 0% VOC Eco-Oil
              </span>
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-xs font-bold text-[#350b5e] hover:underline flex items-center gap-0.5 cursor-pointer ml-1"
              >
                View all 10 <ChevronRight className="w-3 h-3" />
              </button>
            </div>

          </div>

          {/* ========================================================
              RIGHT COLUMN: Quality Inspectors Joinery & Drawer Testing
             ======================================================== */}
          <div className="lg:col-span-4 relative min-h-[220px] lg:min-h-full overflow-hidden group">
            <img
              src={inspectJoineryTeamImg}
              alt="Quality control team examining wood cabinet joinery with checklist"
              className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
            />
            {/* Subtle soft edge blend toward center */}
            <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white via-white/80 to-transparent hidden lg:block pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white via-white/80 to-transparent lg:hidden pointer-events-none" />
            
            {/* Stage Pill Tag */}
            <div className="absolute bottom-4 right-4 z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-black/60 backdrop-blur-md text-white border border-white/20 shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Stage 09 / Joinery & Glide Clearance
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* 10-Point Interactive Modal */}
      <QualityInspectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onOpenB2B={onOpenB2B}
      />

    </section>
  );
};
