import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  Cpu, 
  Scale, 
  Sliders, 
  Droplets, 
  Layers, 
  RotateCw, 
  PackageCheck, 
  Check, 
  ExternalLink 
} from 'lucide-react';

interface QualityInspectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenB2B?: () => void;
}

export interface InspectionPoint {
  id: number;
  title: string;
  category: string;
  standard: string;
  tolerance: string;
  description: string;
  icon: React.ElementType;
  testMethod: string;
  passCriteria: string;
}

export const INSPECTION_POINTS: InspectionPoint[] = [
  {
    id: 1,
    title: 'Cyclic Dynamic Load Rigidity',
    category: 'Structural Integrity',
    standard: 'ANSI / BIFMA X5.1-2023',
    tolerance: 'Deflection < 1.2mm under 350 lbs',
    description: 'Every chair frame and structural beam undergoes 100,000 cycles of dynamic 350 lb impact testing to ensure lifetime zero-flex stability.',
    icon: Scale,
    testMethod: 'Automated hydraulic ram applies alternating 350 lb loads at 20 cycles/min across 5 impact coordinates.',
    passCriteria: 'Zero structural micro-fractures, weld separation, or joint looseness detected.'
  },
  {
    id: 2,
    title: 'FSC Hardwood Moisture Equilibrium',
    category: 'Material Purity',
    standard: 'FSC-STD-40-004 & EN 13183',
    tolerance: '7.0% - 9.0% Moisture Equilibrium',
    description: '100% sustainably harvested American Black Walnut and European White Oak are kiln-seasoned and verified with digital pin sensors to prevent warping.',
    icon: Droplets,
    testMethod: 'Multi-point electrical resistance probe measured at core and surface across 12 board quadrants.',
    passCriteria: 'Moisture content strictly between 7% and 9% with uniform moisture gradient.'
  },
  {
    id: 3,
    title: 'Mortise & Tenon Laser Joinery',
    category: 'Artisan Precision',
    standard: 'Master Guild Joinery Spec 4.2',
    tolerance: 'Variance < 0.18mm',
    description: 'Interlocking wooden tenons are CNC-cut and hand-trued by master craftsmen for air-tight joint contact that eliminates all creaks and squeaks.',
    icon: Layers,
    testMethod: 'Digital optical caliper and feeler gauge inspection across all load-bearing joinery seams.',
    passCriteria: '100% surface contact with zero gap exceeding 0.18mm before waterproof PVA bonding.'
  },
  {
    id: 4,
    title: 'Reinforced Double-Stitched Seams',
    category: 'Upholstery & Leather',
    standard: 'ISO 13936-2 Seam Slippage',
    tolerance: 'Tension > 85 N/cm',
    description: 'Heavy-gauge bonded nylon thread with dual lock-stitching prevents thread unraveling and seam stress tears even after years of daily posture shifting.',
    icon: Award,
    testMethod: 'Tensile claw pull test applying 85 N/cm lateral force perpendicular to seam orientation.',
    passCriteria: 'Zero seam separation, thread snapping, or leather grain puncture tearing.'
  },
  {
    id: 5,
    title: 'Cold-Cured High-Density Foam',
    category: 'Ergonomic Comfort',
    standard: 'CertiPUR-US & BS 5852',
    tolerance: 'Density 4.2 lb/ft³ (67 kg/m³)',
    description: 'Custom-molded cold-cure polyurethane foam distributes ischial pressure evenly, retaining 98% of its original contour and firmness over 10 years.',
    icon: Cpu,
    testMethod: 'Constant-deflection compression indentation testing (250,000 poundings at 70% deflection).',
    passCriteria: 'Less than 2.1% permanent thickness loss with instantaneous memory rebound.'
  },
  {
    id: 6,
    title: 'Class-4 BIFMA Nitrogen Cylinder',
    category: 'Mechanical Systems',
    standard: 'DIN 4550 Class 4 / BIFMA',
    tolerance: 'Pressure seal rated to 300 Bar',
    description: 'Seamless cold-drawn steel pneumatic piston filled with pure nitrogen gas, engineered for smooth, silent height adjustments without sinking.',
    icon: Sliders,
    testMethod: '120,000 full-stroke vertical cycles under 300 lb combined test weight.',
    passCriteria: 'Zero micro-leakage, zero drift, and whisper-quiet smooth damping resistance.'
  },
  {
    id: 7,
    title: 'Zero-VOC Botanical Oil & Wax',
    category: 'Eco & Health Safety',
    standard: 'GREENGUARD Gold Certified',
    tolerance: '0.00 mg/m³ Total VOC emissions',
    description: 'Hand-rubbed finishes formulated from organic linseed, carnauba wax, and beeswax that let the raw wood breathe without releasing harmful chemicals into your indoor air.',
    icon: Droplets,
    testMethod: 'Gas chromatography chamber emission test conducted 48 hours post-curing.',
    passCriteria: '100% free of formaldehyde, phthalates, heavy metals, and volatile organic compounds.'
  },
  {
    id: 8,
    title: 'Silent Polyurethane Soft Casters',
    category: 'Mobility & Floor Protection',
    standard: 'ANSI / BIFMA X5.1 Section 17',
    tolerance: '100,000 revolutions obstacle track',
    description: '65mm twin-bearing rollerblade wheels encased in soft 85A durometer polyurethane roll silently over hardwood, polished concrete, and dense carpet without scuffing.',
    icon: RotateCw,
    testMethod: 'Continuous obstacle rolling across steel track with 3mm raised ridges under 300 lb load.',
    passCriteria: 'Zero tread debonding, zero ball-bearing play, and under 42 decibels operational noise.'
  },
  {
    id: 9,
    title: 'Multi-Axis Lumbar & Tilt Tension',
    category: 'Ergonomic Calibration',
    standard: 'EN 1335-1 Ergonomic Type A',
    tolerance: '110 lbs – 280 lbs counterweight balance',
    description: 'Dynamically balanced synchronized recline mechanism calibrated to self-adjust to the user’s exact body weight, providing continuous lower-back support.',
    icon: Sliders,
    testMethod: 'Multi-axis angular torque meter testing tilt resistance through 90° to 135° recline range.',
    passCriteria: 'Smooth progressive counter-resistance with zero catch points or abrupt stop shocks.'
  },
  {
    id: 10,
    title: 'ISTA-3A Impact-Proof Packaging',
    category: 'Transit & White Glove Delivery',
    standard: 'ISTA 3A Transit Packaging Standard',
    tolerance: '36-inch free-fall drop on all 6 faces',
    description: 'Heavy-duty 400 lb burst-strength corrugated carton with custom-molded high-density corner armor cushions against rough freight transport.',
    icon: PackageCheck,
    testMethod: 'Free-fall drop sequence from 36 inches on all 6 faces, 3 edges, and 1 corner followed by 60-min vibration table.',
    passCriteria: 'Product emerges with 100% cosmetic and functional perfection, ready for immediate assembly.'
  }
];

export const QualityInspectionModal: React.FC<QualityInspectionModalProps> = ({ 
  isOpen, 
  onClose,
  onOpenB2B 
}) => {
  const [activePointId, setActivePointId] = useState<number>(1);

  if (!isOpen) return null;

  const activePoint = INSPECTION_POINTS.find(p => p.id === activePointId) || INSPECTION_POINTS[0];
  const ActiveIcon = activePoint.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-[#12151c] border border-white/15 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Strip */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-[#171a23]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold tracking-wider uppercase text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded-full border border-purple-500/30">
                  Certified Standard
                </span>
                <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 stroke-[3]" /> 10 of 10 Passed
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                MarkWell 10-Point Quality Inspection Protocol
              </h2>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close Inspection Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Split View (List of 10 points on left, Detailed Inspector Sheet on right) */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 min-h-0">
          
          {/* Left Column: 10 Checkpoints Selector */}
          <div className="md:col-span-5 border-b md:border-b-0 md:border-r border-white/10 p-3 sm:p-4 space-y-1.5 bg-[#0e1015]/60 overflow-y-auto max-h-[300px] md:max-h-[580px]">
            <p className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold px-2 mb-2">
              All Inspection Checkpoints
            </p>
            {INSPECTION_POINTS.map((pt) => {
              const isSelected = pt.id === activePointId;
              const IconComp = pt.icon;
              return (
                <button
                  key={pt.id}
                  onClick={() => setActivePointId(pt.id)}
                  className={`w-full text-left p-3 rounded-2xl transition-all flex items-center gap-3 cursor-pointer ${
                    isSelected 
                      ? 'bg-purple-900/40 border border-purple-500/50 shadow-md text-white' 
                      : 'hover:bg-white/5 border border-transparent text-zinc-300'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    isSelected ? 'bg-purple-500 text-white' : 'bg-white/10 text-zinc-400'
                  }`}>
                    {pt.id < 10 ? `0${pt.id}` : pt.id}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-semibold truncate ${isSelected ? 'text-white' : 'text-zinc-200'}`}>
                      {pt.title}
                    </p>
                    <p className="text-[10px] text-zinc-400 truncate">{pt.category}</p>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Checkpoint Dossier */}
          <div className="md:col-span-7 p-5 sm:p-7 flex flex-col justify-between space-y-5 bg-[#12151c]">
            <div>
              {/* Point Badge & Category */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold text-purple-400 bg-purple-950/70 border border-purple-500/30 px-3 py-1 rounded-full">
                  Checkpoint #{activePoint.id < 10 ? `0${activePoint.id}` : activePoint.id} / {activePoint.category}
                </span>
                <span className="text-xs font-medium text-zinc-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                  {activePoint.standard}
                </span>
              </div>

              {/* Title & Description */}
              <div className="flex items-start gap-3 mt-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0 mt-0.5">
                  <ActiveIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
                    {activePoint.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 mt-2 leading-relaxed">
                    {activePoint.description}
                  </p>
                </div>
              </div>

              {/* Technical Inspection Specifications Box */}
              <div className="mt-6 space-y-3 bg-[#171b24] border border-white/10 rounded-2xl p-4 sm:p-5">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                    Precision Tolerance Limit
                  </span>
                  <p className="text-sm font-semibold text-zinc-100 mt-0.5">
                    {activePoint.tolerance}
                  </p>
                </div>

                <div className="border-t border-white/10 pt-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    Laboratory Testing Protocol
                  </span>
                  <p className="text-xs text-zinc-300 mt-0.5 leading-relaxed">
                    {activePoint.testMethod}
                  </p>
                </div>

                <div className="border-t border-white/10 pt-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Certified Pass Standard
                  </span>
                  <p className="text-xs text-emerald-200/90 mt-0.5">
                    {activePoint.passCriteria}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs text-zinc-300">
                  Every product shipped with stamped inspection certificate
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                {onOpenB2B && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenB2B();
                    }}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors cursor-pointer"
                  >
                    B2B Wholesale Specs
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white transition-colors cursor-pointer shadow-lg shadow-purple-900/30"
                >
                  Understood
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
