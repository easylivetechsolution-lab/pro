import React, { useState } from 'react';
import { 
  Cpu, Scan, Camera, Eye, Zap, Shield, CheckCircle2, 
  ArrowRight, Activity, Layers, Compass, ChevronRight 
} from 'lucide-react';
import { TECH_DATA, CLINIC_INFO } from '../data/dentalData';

interface TechnologyPageProps {
  onOpenBooking: () => void;
  onNavigate: (page: string) => void;
}

export const TechnologyPage: React.FC<TechnologyPageProps> = ({ onOpenBooking, onNavigate }) => {
  const [activeTechId, setActiveTechId] = useState<string>('itero');

  const detailedTechList = [
    {
      id: 'itero',
      name: 'iTero® Element 5D Plus Digital Imaging',
      tagline: 'Near-Infrared Imaging & Real-Time 3D Color Scanning',
      badge: 'Zero Impressions',
      icon: Scan,
      image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1000&auto=format&fit=crop',
      specs: [
        { label: 'Capture Speed', value: '6,000 frames per second' },
        { label: 'Accuracy', value: 'Within 10 microns' },
        { label: 'Radiation', value: '0% Radiation (Optical)' },
        { label: 'Turnaround', value: 'Instant 3D Simulation' },
      ],
      description: 'The pinnacle of digital dental diagnostics. Our iTero 5D Plus utilizes optical laser sensors and near-infrared imaging (NIRI) to scan internal tooth structure, identifying interproximal caries beneath the surface before they appear on standard x-rays.',
      patientBenefits: [
        'Completely eliminates uncomfortable, gag-inducing silicone impression goop',
        'Simulates your finished post-Invisalign or veneer smile in under 60 seconds',
        'Tracks tooth wear, gum recession, and bite changes over years with 3D time-lapse comparisons',
        'Fast, comfortable wand glide across teeth with zero downtime or chemical taste'
      ]
    },
    {
      id: 'cbct',
      name: 'Planmeca Ultra Low-Dose 3D Cone Beam (CBCT)',
      tagline: 'Hospital-Grade 3D Craniofacial Volumetric Tomography',
      badge: '90% Lower Dose',
      icon: Camera,
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1000&auto=format&fit=crop',
      specs: [
        { label: 'Radiation Mode', value: 'Ultra Low Dose™ protocol' },
        { label: 'Resolution', value: '75 µm voxel precision' },
        { label: 'Rotation', value: '180-degree quick sweep (8 sec)' },
        { label: 'Diagnostics', value: 'Airway, nerves, bone density' },
      ],
      description: 'Standard 2D dental x-rays only show a flat silhouette. Our 3D CBCT provides a millimeter-accurate 360-degree holographic view of bone volume, vital nerve pathways, sinus cavities, and TMJ joints for risk-free surgical planning.',
      patientBenefits: [
        'Allows 100% computer-guided implant surgery with zero manual guesswork',
        'Proprietary Ultra Low Dose protocol uses less radiation than a cross-country flight',
        'Identifies hidden root infections, cysts, and TMJ compression effortlessly',
        'Open-concept, standing or seated machine with zero claustrophobia'
      ]
    },
    {
      id: 'laser',
      name: 'BIOLASE® WaterLase iPlus Hydro-Kinetic Laser',
      tagline: 'Gentle Tissue Reshaping Without Drills or Needles',
      badge: 'Painless & Drill-Free',
      icon: Zap,
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1000&auto=format&fit=crop',
      specs: [
        { label: 'Wavelength', value: '2780 nm Er,Cr:YSGG' },
        { label: 'Tissue Type', value: 'Enamel, dentin, bone & gums' },
        { label: 'Anesthesia', value: 'Often 0% needles required' },
        { label: 'Healing Time', value: '70% faster than scalpels' },
      ],
      description: 'The WaterLase replaces traditional dental drills and scalpels using an energized spray of atomized water droplets energized by laser light. It vaporizes decay and sculpts gum lines without heat, vibration, or painful pressure.',
      patientBenefits: [
        'Most cavity preparations performed with zero shots or numb lips',
        'Instant bloodless gum contouring with immediate recovery and no stitches',
        'Sterilizes deep periodontal pockets, eliminating harmful oral bacteria on contact',
        'Eliminates the high-pitched drilling sound that triggers dental phobia'
      ]
    },
    {
      id: 'cerec',
      name: 'CEREC Primemill CAD/CAM Same-Day Milling Suite',
      tagline: 'Custom Permanent Porcelain Restorations in 90 Minutes',
      badge: 'Same-Day Crowns',
      icon: Cpu,
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000&auto=format&fit=crop',
      specs: [
        { label: 'Milling Speed', value: 'Under 10 minutes per crown' },
        { label: 'Materials', value: 'IPS e.max, Prime Zirconia' },
        { label: 'Fit Tolerance', value: 'Sub-20 micron seal' },
        { label: 'Visits', value: 'Single appointment' },
      ],
      description: 'No temporary crowns that break off, and no waiting two weeks for a commercial lab. Our hospital-grade 5-axis robotic milling machine carves your permanent, custom-shaded ceramic crown right in our Austin studio while you relax.',
      patientBenefits: [
        'Leave the studio with your permanent, rock-solid tooth in a single morning',
        'Zero messy temporary plastic crowns or second shots of Novocain',
        'Polished and glazed in our high-temperature furnace for diamond-like strength',
        'Color-matched under specialized color-calibrated studio lighting'
      ]
    },
    {
      id: 'ai',
      name: 'FDA-Cleared Dental AI Diagnostic Suite',
      tagline: 'Micro-Pathology Detection Powered by Computer Vision',
      badge: 'AI Precision',
      icon: Activity,
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop',
      specs: [
        { label: 'Neural Network', value: 'Trained on 10M+ validated x-rays' },
        { label: 'Detection Margin', value: 'Sub-millimeter enamel breaches' },
        { label: 'Validation', value: 'Dual-doctor + AI consensus' },
        { label: 'Objectivity', value: '100% unbiased diagnosis' },
      ],
      description: 'We augment our doctors with FDA-cleared clinical computer vision algorithms that analyze every digital radiograph pixel-by-pixel, measuring bone loss to within a tenth of a millimeter and spotting decay before it becomes a root canal.',
      patientBenefits: [
        'You see color-coded visual overlays on our chairside 4K monitors',
        'Objective confirmation ensures we never over-treat or under-diagnose',
        'Detects sub-surface enamel lesions early enough to reverse with fluoride without drilling',
        'Provides indisputable visual documentation for faster insurance claim approvals'
      ]
    },
    {
      id: 'gbt',
      name: 'Swiss EMS AirFlow® Guided Biofilm Therapy',
      tagline: 'Warm Water, Air & Micro-Powder Preventative Hygiene',
      badge: 'Spa-Like Clean',
      icon: Layers,
      image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=1000&auto=format&fit=crop',
      specs: [
        { label: 'Powder Base', value: 'Organic Erythritol (14 micron)' },
        { label: 'Water Temp', value: 'Heated to 37°C (Body Temp)' },
        { label: 'Enamel Safety', value: '100% non-abrasive' },
        { label: 'Comfort Rating', value: '99% preferred over hand scaling' },
      ],
      description: 'The revolutionary European gold standard in teeth cleaning. Rather than scraping your enamel with sharp steel instruments, AirFlow utilizes a gentle vortex of temperature-regulated warm water and micro-fine therapeutic powder.',
      patientBenefits: [
        'No metal scraping sensations, screeching noises, or gum soreness',
        'Completely safe on delicate porcelain veneers, ceramic implants, and braces',
        'Gently lifts years of stubborn coffee, wine, and tea stains without harsh bleach',
        'Leaves teeth silky smooth and refreshed in half the standard hygiene time'
      ]
    }
  ];

  const currentTech = detailedTechList.find((t) => t.id === activeTechId) || detailedTechList[0];

  const comparisonRows = [
    {
      feature: 'Impressions & Molds',
      traditional: 'Messy alginate putty that causes gagging and distorts easily',
      pearlView: 'Optical 3D digital laser wand scan in under 3 minutes with instant accuracy'
    },
    {
      feature: 'Crowns & Restorations',
      traditional: '2-3 visits, uncomfortable temporary crowns, 2+ weeks waiting for lab',
      pearlView: 'Single 90-minute visit with in-house robotic CEREC Primemill'
    },
    {
      feature: 'Cavity Detection',
      traditional: 'Subjective visual probe with metal pick and basic 2D x-rays',
      pearlView: 'FDA-cleared AI neural network + near-infrared transillumination (NIRI)'
    },
    {
      feature: 'Gum Shaping & Fillings',
      traditional: 'Needles, scalpels, stitches, and noisy high-speed drills',
      pearlView: 'WaterLase hydro-kinetic laser with little to no anesthesia needed'
    },
    {
      feature: 'Teeth Cleaning',
      traditional: 'Cold water spray and rigorous scraping with sharp steel curettes',
      pearlView: 'Swiss EMS AirFlow guided biofilm therapy with heated 37°C spa-like spray'
    },
    {
      feature: 'X-Ray Radiation',
      traditional: 'Higher radiation standard analog film plates',
      pearlView: 'Ultra-low dose green digital sensors with up to 90% radiation reduction'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-zinc-900 pt-6 pb-24">
      {/* Top Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
          <button 
            onClick={() => onNavigate('home')}
            className="hover:text-[#0E282E] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-[#0E282E] font-semibold">Technology</span>
        </div>
      </div>

      {/* Page Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="rounded-3xl bg-[#0E282E] text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute left-1/4 bottom-0 w-80 h-80 bg-[#16363D]/40 rounded-full blur-2xl pointer-events-none" />

          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#EAD8B7] text-xs font-semibold uppercase tracking-widest mb-6">
              <Cpu className="w-3.5 h-3.5" />
              <span>Digital Dentistry Lab & Surgery</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal text-white tracking-tight mb-6 leading-tight">
              State-of-the-Art Technology for Gentler, Faster Precision
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-light mb-8">
              We eliminated the uncomfortable needles, messy putty impressions, and screeching drills of yesterday. Welcome to Austin’s most advanced digital dental suite.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="px-8 py-4 bg-[#EAD8B7] hover:bg-white text-[#0E282E] font-semibold text-xs sm:text-sm tracking-wider uppercase rounded-full shadow-lg transition-all duration-200 cursor-pointer"
              >
                Experience In Person &bull; Book Visit
              </button>
              <a
                href="#interactive-suite"
                className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm rounded-full transition-colors border border-white/15"
              >
                Explore Technology Systems &darr;
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Technology Deep-Dive Showcase */}
      <div id="interactive-suite" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-[#5B7980] block mb-2">
            Clinical Hardware Showcase
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#0E282E]">
            Our Digital Ecosystem
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 mt-2">
            Select an instrument below to inspect specifications, patient comfort benefits, and technical capabilities.
          </p>
        </div>

        {/* Technology Selector Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto gap-2 pb-4 mb-8">
          {detailedTechList.map((t) => {
            const Icon = t.icon;
            const isSelected = t.id === activeTechId;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTechId(t.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0E282E] text-white shadow-md'
                    : 'bg-white border border-zinc-200 text-zinc-700 hover:border-zinc-300 hover:text-zinc-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-[#D4AF37]' : 'text-zinc-400'}`} />
                <span>{t.name.split(' ')[0]}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${isSelected ? 'bg-white/15 text-[#EAD8B7]' : 'bg-zinc-100 text-zinc-500'}`}>
                  {t.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Technology Featured Card */}
        <div className="bg-white rounded-3xl border border-zinc-200 shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Visual Column (5 cols) */}
          <div className="lg:col-span-5 relative bg-zinc-100 min-h-[350px] lg:min-h-[500px]">
            <img
              src={currentTech.image}
              alt={currentTech.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="px-3 py-1 bg-[#D4AF37] text-[#0E282E] text-[10px] uppercase font-bold tracking-wider rounded-full inline-block mb-2">
                {currentTech.badge}
              </span>
              <h3 className="text-xl font-serif font-bold text-white mb-1">
                {currentTech.name}
              </h3>
              <p className="text-xs text-zinc-200">{currentTech.tagline}</p>
            </div>
          </div>

          {/* Details Column (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#5B7980]">
                  Clinical Architecture
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif text-[#0E282E] mb-3">
                {currentTech.name}
              </h3>

              <p className="text-sm text-zinc-600 leading-relaxed mb-8">
                {currentTech.description}
              </p>

              {/* 4 Specs Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {currentTech.specs.map((spec, i) => (
                  <div key={i} className="p-3 bg-[#FAF9F6] border border-zinc-200 rounded-xl text-left">
                    <span className="text-[10px] text-zinc-400 font-bold uppercase block tracking-wider">
                      {spec.label}
                    </span>
                    <span className="text-xs font-bold text-[#0E282E] mt-1 block">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Patient Comfort Benefits */}
              <div className="space-y-3 mb-8">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                  Direct Patient Comfort Benefits:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentTech.patientBenefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-zinc-700 bg-zinc-50 p-2.5 rounded-xl border border-zinc-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-zinc-500">
                Installed & calibrated in our Austin, TX studio suites.
              </span>
              <button
                onClick={onOpenBooking}
                className="px-6 py-3 bg-[#0E282E] hover:bg-[#153B44] text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-md transition-colors cursor-pointer"
              >
                Experience This Technology &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table: Traditional vs. PearlView Digital */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase font-bold tracking-widest text-[#5B7980] block mb-2">
            The Digital Difference
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#0E282E]">
            Traditional Dental Office vs. PearlView Digital Studio
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 mt-2">
            See how continuous investments in digital workflows save you time, anxiety, and discomfort.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 text-xs font-bold uppercase tracking-wider">
                  <th className="py-4 px-6 bg-[#FAF9F6] text-zinc-600 w-1/4">Clinical Stage</th>
                  <th className="py-4 px-6 bg-red-50/50 text-red-900 w-3/8">Traditional Dental Practice</th>
                  <th className="py-4 px-6 bg-[#0E282E] text-[#EAD8B7] w-3/8">PearlView Digital Studio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-xs sm:text-sm">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-zinc-50/50">
                    <td className="py-4 px-6 font-semibold text-zinc-900 bg-[#FAF9F6]/40">
                      {row.feature}
                    </td>
                    <td className="py-4 px-6 text-zinc-500 bg-red-50/20">
                      <span className="line-through text-zinc-400 mr-1.5">&#x2717;</span>
                      {row.traditional}
                    </td>
                    <td className="py-4 px-6 font-medium text-[#0E282E] bg-emerald-50/30">
                      <span className="text-emerald-600 font-bold mr-1.5">&#x2713;</span>
                      {row.pearlView}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Patient Sensory Suite & Comfort Engineering */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-[#0E282E] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs uppercase font-bold tracking-widest text-[#EAD8B7] block mb-2">
                Designed for Calm
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-white mb-4">
                Beyond Clinical Robotics: The Sensory Comfort Suite
              </h2>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light mb-6">
                Clinical technology is only half the formula. We engineered our entire architectural environment to soothe your nervous system from the moment you step through our doors.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-zinc-200 mb-8">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EAD8B7]" />
                  <span>Bose® Noise-Canceling Bluetooth Headphones</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EAD8B7]" />
                  <span>Ceiling-Mounted 4K Displays with Streaming</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EAD8B7]" />
                  <span>Ergonomic Memory-Foam Heated Dental Chairs</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EAD8B7]" />
                  <span>Aromatherapy & Calming Herbal Tea Lounge</span>
                </div>
              </div>
              <button
                onClick={onOpenBooking}
                className="px-8 py-3.5 bg-[#EAD8B7] hover:bg-white text-[#0E282E] font-semibold text-xs uppercase tracking-wider rounded-full shadow-lg transition-colors cursor-pointer"
              >
                Schedule Your Calm Visit
              </button>
            </div>
            <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1629909615184-74f495363b67?q=80&w=800&auto=format&fit=crop"
                alt="Relaxed dental patient in comfort suite"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
