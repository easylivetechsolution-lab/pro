import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, 
  MapPin, 
  Eye, 
  Layers, 
  CheckCircle2,
  Maximize2
} from 'lucide-react';

interface BuildItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  location: string;
  image: string;
  woodSpecies: string;
  finish: string;
  hardware: string;
  dimensions: string;
  year: string;
  highlight: string;
}

const BUILD_PROJECTS: BuildItem[] = [
  {
    id: 'build-1',
    title: 'The Geneva Executive Penthouse',
    subtitle: 'Full Suite in Live-Edge French Black Walnut',
    category: 'Executive Suite',
    location: 'Geneva, Switzerland',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
    woodSpecies: 'Single-Slab French Walnut (80-yr aged)',
    finish: 'Organic Hand-Rubbed Beeswax',
    hardware: 'Custom Brushed Living Brass Joinery',
    dimensions: '3200mm × 1100mm × 760mm',
    year: '2026 Bespoke',
    highlight: 'Concealed biometric cabling conduit & wireless induction vein'
  },
  {
    id: 'build-2',
    title: 'Kyoto Pavilion Atelier Studio',
    subtitle: 'Organic Minimalist Desk & Floating Credenza',
    category: 'Creative Studio',
    location: 'Kyoto, Japan',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
    woodSpecies: 'Alpine Spessart White Oak & Hinoki Cedar',
    finish: 'Ultra-Matte Zero-VOC Protective Oil',
    hardware: 'Concealed Japanese Mortise (Kigumi)',
    dimensions: '2400mm × 950mm × 740mm',
    year: '2025 Architectural',
    highlight: 'Interlocking wood joinery without a single metal screw'
  },
  {
    id: 'build-3',
    title: 'Mayfair Financial Partners Boardroom',
    subtitle: '16-Seat Nero Marquina & Teak Conference Monolith',
    category: 'Corporate Boardroom',
    location: 'London, United Kingdom',
    image: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1200&q=80',
    woodSpecies: 'Reclaimed Teak & Honed Nero Marquina',
    finish: 'Silica Hard-Wax Micro-Finish',
    hardware: 'Gunmetal Titanium Retractor Ribs',
    dimensions: '4800mm × 1400mm × 750mm',
    year: '2026 Commission',
    highlight: 'Integrated perimeter acoustic dampening & motorized microphones'
  },
  {
    id: 'build-4',
    title: 'Copenhagen Biophilic Co-Working Loft',
    subtitle: 'Integrated Flora Wells & Solid Ash Standing Benches',
    category: 'Biophilic Space',
    location: 'Copenhagen, Denmark',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80',
    woodSpecies: 'Nordic White Ash & Smoked Bog Oak',
    finish: 'Organic Linseed Oil & Soap Treatment',
    hardware: 'Recycled Architectural Matte Aluminum',
    dimensions: '3600mm × 1200mm × 1050mm',
    year: '2026 Enterprise',
    highlight: 'Self-watering modular moss planter core with circadian illumination'
  },
];

type LayoutStyle = 'bento' | 'trifold' | 'masonry';

export const DynamicBuildGrid: React.FC = () => {
  const [layoutStyle, setLayoutStyle] = useState<LayoutStyle>('bento');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [activeProject, setActiveProject] = useState<BuildItem>(BUILD_PROJECTS[0]);
  const [inspectModalOpen, setInspectModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const styleOrder: LayoutStyle[] = ['bento', 'trifold', 'masonry'];

  // Auto-switch layouts every 5.5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;

    const intervalTime = 50; // update progress bar every 50ms
    const totalDuration = 5500;
    const step = (intervalTime / totalDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setLayoutStyle((curr) => {
            const nextIdx = (styleOrder.indexOf(curr) + 1) % styleOrder.length;
            return styleOrder[nextIdx];
          });
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isAutoPlaying, layoutStyle]);

  const handleSelectStyle = (style: LayoutStyle) => {
    setLayoutStyle(style);
    setProgress(0);
  };

  return (
    <section id="build-showcase" className="py-16 sm:py-20 lg:py-24 bg-[#faf8f5] border-b border-stone-200/80 relative overflow-hidden select-none">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Live Dynamic Morphing */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-bold tracking-[0.24em] text-[#b86d1f] uppercase font-sans">
                ARCHITECTURAL BUILD GALLERY
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal text-stone-900 tracking-tight leading-tight">
              Spaces Engineered for High Performance
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-2 leading-relaxed">
              Witness our masterworks in situ. This showcase dynamically morphs between 3 architectural grid styles in real time.
            </p>
          </div>
        </div>

        {/* Dynamic Rearranging Container with Motion Layout */}
        <AnimatePresence mode="wait">
          {layoutStyle === 'bento' && (
            <motion.div
              key="bento"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch min-h-[560px]"
            >
              {/* Massive Hero Build Card (Left 7 Cols) */}
              <div 
                onClick={() => { setActiveProject(BUILD_PROJECTS[0]); setInspectModalOpen(true); }}
                className="lg:col-span-7 rounded-3xl overflow-hidden relative group cursor-pointer border border-stone-200/90 shadow-lg min-h-[420px] lg:min-h-[560px] flex flex-col justify-end p-7 sm:p-9 bg-stone-900"
              >
                <img
                  src={BUILD_PROJECTS[0].image}
                  alt={BUILD_PROJECTS[0].title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-semibold border border-white/20">
                      {BUILD_PROJECTS[0].category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-stone-300">
                      <MapPin className="w-3 h-3 text-[#f0ba78]" />
                      {BUILD_PROJECTS[0].location}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-white font-normal leading-snug drop-shadow-xs">
                    {BUILD_PROJECTS[0].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-lg leading-relaxed">
                    {BUILD_PROJECTS[0].subtitle} • {BUILD_PROJECTS[0].highlight}
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#b86d1f] hover:bg-[#cf802b] text-white text-xs font-semibold transition-colors shadow-sm">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Materials &amp; Joinery</span>
                    </span>
                    <span className="text-[11px] text-stone-300/80 font-mono">{BUILD_PROJECTS[0].dimensions}</span>
                  </div>
                </div>
              </div>

              {/* Stacked Right Columns (5 Cols) */}
              <div className="lg:col-span-5 flex flex-col gap-5">
                {BUILD_PROJECTS.slice(1, 3).map((proj) => (
                  <div
                    key={proj.id}
                    onClick={() => { setActiveProject(proj); setInspectModalOpen(true); }}
                    className="flex-1 rounded-3xl overflow-hidden relative group cursor-pointer border border-stone-200/90 shadow-md min-h-[240px] flex flex-col justify-end p-6 bg-stone-900"
                  >
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                    <div className="relative z-10">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-xs text-white text-[10px] font-semibold border border-white/20 mb-2 inline-block">
                        {proj.category}
                      </span>
                      <h4 className="text-lg sm:text-xl font-serif text-white font-normal leading-snug">
                        {proj.title}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-stone-300 mt-1 line-clamp-1">
                        {proj.woodSpecies} • {proj.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {layoutStyle === 'trifold' && (
            <motion.div
              key="trifold"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch min-h-[560px]"
            >
              {BUILD_PROJECTS.slice(0, 3).map((proj, idx) => (
                <div
                  key={proj.id}
                  onClick={() => { setActiveProject(proj); setInspectModalOpen(true); }}
                  className={`rounded-3xl overflow-hidden relative group cursor-pointer border border-stone-200/90 shadow-md flex flex-col justify-between p-6 sm:p-7 bg-stone-900 ${
                    idx === 1 ? 'min-h-[580px] md:-translate-y-2 ring-2 ring-[#b86d1f]/30' : 'min-h-[540px]'
                  } transition-all duration-300`}
                >
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
                  
                  {/* Top Badge */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-semibold border border-white/20">
                      {proj.category}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#b86d1f] transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>

                  {/* Bottom Content */}
                  <div className="relative z-10">
                    <div className="flex items-center gap-1.5 text-stone-300 text-xs mb-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#f0ba78]" />
                      <span>{proj.location}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-serif text-white font-normal leading-snug">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-stone-300 mt-2 leading-relaxed line-clamp-2">
                      {proj.highlight}
                    </p>
                    <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-[11px] text-stone-400">
                      <span>{proj.woodSpecies}</span>
                      <span className="font-mono text-[#f0ba78]">{proj.year}</span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {layoutStyle === 'masonry' && (
            <motion.div
              key="masonry"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-5 min-h-[560px]"
            >
              {/* Top Cinematic Wide Panorama */}
              <div
                onClick={() => { setActiveProject(BUILD_PROJECTS[2]); setInspectModalOpen(true); }}
                className="w-full rounded-3xl overflow-hidden relative group cursor-pointer border border-stone-200/90 shadow-md min-h-[260px] sm:min-h-[300px] flex flex-col justify-end p-7 sm:p-9 bg-stone-900"
              >
                <img
                  src={BUILD_PROJECTS[2].image}
                  alt={BUILD_PROJECTS[2].title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div className="max-w-xl">
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-semibold border border-white/20 mb-2 inline-block">
                      {BUILD_PROJECTS[2].category} • {BUILD_PROJECTS[2].location}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif text-white font-normal leading-snug">
                      {BUILD_PROJECTS[2].title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-300 mt-1">
                      {BUILD_PROJECTS[2].highlight}
                    </p>
                  </div>
                  <button className="px-4 py-2 rounded-xl bg-white text-stone-900 text-xs font-semibold flex items-center gap-1.5 shrink-0 shadow-md">
                    <span>Inspect Blueprint</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#b86d1f]" />
                  </button>
                </div>
              </div>

              {/* Bottom 3 Balanced Gallery Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {[BUILD_PROJECTS[0], BUILD_PROJECTS[1], BUILD_PROJECTS[3]].map((proj) => (
                  <div
                    key={proj.id}
                    onClick={() => { setActiveProject(proj); setInspectModalOpen(true); }}
                    className="rounded-3xl overflow-hidden relative group cursor-pointer border border-stone-200/90 shadow-xs min-h-[230px] flex flex-col justify-end p-5 bg-stone-900"
                  >
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    <div className="relative z-10">
                      <span className="text-[10px] text-[#f0ba78] font-bold uppercase tracking-wider block mb-0.5">
                        {proj.category}
                      </span>
                      <h4 className="text-base font-serif text-white font-normal truncate">
                        {proj.title}
                      </h4>
                      <p className="text-[11px] text-stone-300 truncate mt-0.5">
                        {proj.woodSpecies}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Blueprint & Specification Inspection Modal */}
      {inspectModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setInspectModalOpen(false)}
        >
          <div 
            className="bg-stone-900 border border-stone-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-white relative shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-stone-800 pb-5 mb-5">
              <div>
                <span className="px-2.5 py-1 rounded-full bg-[#b86d1f]/20 border border-[#b86d1f]/40 text-[#f0ba78] text-[11px] font-semibold uppercase tracking-wider inline-block mb-2">
                  Architectural Specifications
                </span>
                <h3 className="text-2xl font-serif font-normal text-white">{activeProject.title}</h3>
                <p className="text-xs text-stone-400 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#f0ba78]" />
                  {activeProject.location} • {activeProject.year}
                </p>
              </div>
              <button
                onClick={() => setInspectModalOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-400 hover:text-white transition-colors cursor-pointer text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5 text-xs text-stone-300">
              <div className="bg-stone-800/60 p-3.5 rounded-xl border border-stone-700/60">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#f0ba78] block mb-1">Wood Species &amp; Curation</span>
                <p className="text-stone-200 text-sm">{activeProject.woodSpecies}</p>
                <p className="text-stone-400 text-xs mt-1">Finish: {activeProject.finish}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-stone-800/60 p-3 rounded-xl border border-stone-700/60">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-0.5">Hardware &amp; Mechanics</span>
                  <p className="text-stone-200">{activeProject.hardware}</p>
                </div>
                <div className="bg-stone-800/60 p-3 rounded-xl border border-stone-700/60">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-0.5">Structural Dimensions</span>
                  <p className="text-stone-200 font-mono">{activeProject.dimensions}</p>
                </div>
              </div>

              <div className="bg-[#b86d1f]/10 p-3.5 rounded-xl border border-[#b86d1f]/30">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#f0ba78] block mb-1">Architectural Highlight</span>
                <p className="text-stone-200">{activeProject.highlight}</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between">
              <span className="text-xs text-stone-400">Available for bespoke residential &amp; corporate commissioning</span>
              <button
                onClick={() => setInspectModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-[#b86d1f] hover:bg-[#cf802b] text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Close Blueprint
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
