import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, Plane, Ship, Clock, RefreshCw, ShieldCheck } from 'lucide-react';
import { FLIPPER_CARDS_DATA } from '../data/mockData';
import multimodalLogisticsImg from '../assets/images/multimodal_logistics_1789272164591.jpg';

interface TradeToolsSimulatorProps {
  onRequestQuoteWithIncoterm: (incoterm: string) => void;
}

export const TradeToolsSimulator: React.FC<TradeToolsSimulatorProps> = ({
  onRequestQuoteWithIncoterm
}) => {
  // State for manual click flip
  const [manuallyFlipped, setManuallyFlipped] = useState<Record<string, boolean>>({});
  // State for automatic flip every 8 seconds
  const [autoFlipped, setAutoFlipped] = useState<boolean>(false);
  // State for hover-triggered flip
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  // Interactive Cargo Volume Slider (in CBM)
  const [cargoVolumeCbm, setCargoVolumeCbm] = useState<number>(25);

  // Auto-flip every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setAutoFlipped((prev) => !prev);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const toggleFlip = (id: string) => {
    setManuallyFlipped((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleFlipAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    const allFlipped: Record<string, boolean> = {};
    const shouldFlip = !Object.values(manuallyFlipped).some(Boolean);
    FLIPPER_CARDS_DATA.forEach(card => {
      allFlipped[card.id] = shouldFlip;
    });
    setManuallyFlipped(allFlipped);
  };

  // Dynamic calculations based on volume slider
  const estimatedPallets = Math.max(1, Math.round(cargoVolumeCbm / 1.8));
  const oceanTransitDays = cargoVolumeCbm > 60 ? '18 - 28 Days' : '14 - 22 Days';
  const airTransitDays = '3 - 6 Days';
  const recommendedMode =
    cargoVolumeCbm < 15
      ? 'Air Cargo Charter'
      : cargoVolumeCbm < 45
      ? 'Ocean LCL / FCL Multimodal'
      : 'Ocean FCL 40ft High-Cube Containers';

  return (
    <>
      {/* SECTION 1: GLOBAL LOGISTICS & PROCUREMENT PROTOCOL (White Background) */}
      <section className="py-20 sm:py-24 bg-white text-slate-900 relative overflow-hidden">
        {/* Animated Background Elements for a "vibrant touch" */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.03, 0.05, 0.03],
              rotate: [0, 90, 180, 270, 360]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-cyan-400 rounded-full blur-[120px]"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.02, 0.04, 0.02],
              x: [0, 50, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-400 rounded-full blur-[120px]"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-extrabold tracking-widest text-cyan-600 uppercase block mb-2"
            >
              GLOBAL LOGISTICS & PROCUREMENT PROTOCOL
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4"
            >
              Trade Duty & Shipment Scale
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-600 text-sm sm:text-base leading-relaxed"
            >
              Inspect legal risk-transfer checkpoints under ICC 2020 Incoterms and calculate real-time container specifications, transport modalities, and transit schedules for institutional medical procurement.
            </motion.p>
          </div>

          {/* 1. INTERACTIVE 3D TRADE DUTY FLIPPERS */}
          <div id="logistics-flipper-grid" className="">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <div className="text-cyan-600 text-xs font-bold tracking-wider uppercase mb-1">
                  Legal Responsibilities Matrix
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
                  Overview & Legal Matrix
                </h3>
              </div>
              <button
                onClick={handleFlipAll}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm self-start sm:self-auto"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Flip All Cards / Toggle View</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {FLIPPER_CARDS_DATA.map((card, index) => {
                const isCardHovered = hoveredCardId === card.id;
                const isFlipped = isCardHovered ? true : (autoFlipped !== !!manuallyFlipped[card.id]);

                return (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => toggleFlip(card.id)}
                    onMouseEnter={() => setHoveredCardId(card.id)}
                    onMouseLeave={() => setHoveredCardId(null)}
                    className="perspective-1000 h-[520px] cursor-pointer group"
                  >
                    <motion.div
                      className="relative w-full h-full transform-style-3d transition-transform duration-700 ease-out"
                      animate={{ rotateY: isFlipped ? 180 : 0 }}
                    >
                      {/* FRONT OF CARD */}
                      <div className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-b from-[#0b1b33] to-[#0d2242] border border-cyan-500/30 rounded-2xl p-6 sm:p-7 shadow-xl flex flex-col justify-between group-hover:border-cyan-400/60 transition-colors overflow-hidden">
                        {/* Subtle animated light sweep */}
                        <motion.div 
                          animate={{ x: [-200, 400] }}
                          transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
                          className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 pointer-events-none"
                        />
                        
                        <div className="space-y-3.5 relative z-10">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-cyan-200 bg-cyan-950/70 px-3 py-1 rounded-full border border-cyan-500/30">
                              {card.category}
                            </span>
                            <span className="text-[10px] font-bold tracking-wider uppercase text-cyan-400/90">
                              {card.tag}
                            </span>
                          </div>

                          <h4 className="text-lg sm:text-xl font-bold text-white leading-snug">
                            {card.title}
                          </h4>
                          
                          <div className="space-y-3">
                            {card.frontPoints.map((pt, i) => (
                              <div key={i} className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/20 shadow-sm">
                                <div className="flex items-start gap-2.5 text-slate-100 text-[13px] leading-relaxed">
                                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                                  <span className="text-slate-100 font-medium">{pt}</span>
                                </div>
                              </div>
                          ))}
                          </div>
                        </div>

                        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 relative z-10">
                          <span className="font-bold text-cyan-300">{card.tag}</span>
                          <span className="text-[11px] font-medium">Hearts & Mind Medical</span>
                        </div>
                      </div>

                      {/* BACK OF CARD (Flipped 180 degrees) */}
                      <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-white text-slate-800 rounded-2xl p-6 sm:p-7 shadow-2xl flex flex-col justify-between border-2 border-cyan-500 overflow-hidden">
                        <div className="space-y-3.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-100">
                              Compliance Matrix
                            </span>
                            <span className="text-[11px] text-cyan-600 font-bold">{card.tag}</span>
                          </div>

                          <h4 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                            {card.backTitle}
                          </h4>

                          <div className="space-y-2.5 pt-1">
                            {card.backDuties.map((duty, idx) => (
                              <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
                                <div className="font-black text-cyan-700 text-[11px] uppercase tracking-wider mb-1">
                                  {duty.role}
                                </div>
                                <div className="text-slate-700 text-xs leading-relaxed font-medium">
                                  {duty.duty}
                                </div>
                              </div>
                          ))}
                          </div>
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                          <span className="font-black text-cyan-800">HEARTS & MIND GLOBAL</span>
                          <span className="text-[11px] text-slate-400 font-bold">Legal Protocol</span>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: CARGO VOLUME & TRANSIT MODE SIMULATOR (Blue Background) */}
      <section id="trade-tools" className="py-20 sm:py-24 bg-[#061429] text-white relative overflow-hidden border-t border-sky-900/50">
        {/* Ambient background glows with subtle motion */}
        <motion.div 
          animate={{ 
            opacity: [0.1, 0.15, 0.1],
            scale: [1, 1.1, 1] 
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-cyan-600/20 rounded-full blur-3xl pointer-events-none" 
        />
        <motion.div 
          animate={{ 
            opacity: [0.05, 0.1, 0.05],
            x: [0, 30, 0] 
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-sky-600/10 rounded-full blur-3xl pointer-events-none" 
        />

        {/* Floating background particles for "vibrant touch" */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * 100 + "%", 
                y: Math.random() * 100 + "%",
                opacity: 0.1 + Math.random() * 0.2
              }}
              animate={{ 
                y: ["-10%", "110%"],
                x: [Math.random() * 100 + "%", Math.random() * 100 + "%"]
              }}
              transition={{ 
                duration: 20 + Math.random() * 30, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-[#0b1b33]/80 backdrop-blur-xl border border-sky-500/30 rounded-3xl p-8 sm:p-12 lg:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative text-white overflow-hidden">
            {/* Background Cargo / Multimodal Logistics Image with Overlay inside the inner container */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img
                src={multimodalLogisticsImg}
                alt="Multimodal Logistics Background"
                className="w-full h-full object-cover object-center opacity-85 scale-100 filter brightness-100 contrast-110 saturate-110"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#061429]/70 via-[#0b1b33]/45 to-[#071324]/75" />
            </div>

            <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10 mb-12">
              <div className="max-w-2xl">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="text-xs font-bold uppercase tracking-widest text-white mb-3 flex items-center gap-2"
                >
                  <span className="w-8 h-[1px] bg-white/50"></span>
                  Logistics Simulation Engine
                </motion.div>
                <motion.h3 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1]"
                >
                  Cargo Volume & Transit Mode Simulator
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-white text-base sm:text-lg mt-6 leading-relaxed max-w-xl opacity-90"
                >
                  Configure your specific procurement scale to visualize optimal freight modalities, estimated transit windows, and container capacity utilization.
                </motion.p>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="text-left bg-sky-950/40 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-sky-500/30 min-w-[280px] shadow-2xl relative group overflow-hidden"
              >
                {/* Background pulse for "live" feel */}
                <motion.div 
                  animate={{ opacity: [0.1, 0.2, 0.1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-cyan-500/5"
                />
                <span className="text-xs text-white block font-bold uppercase tracking-wider mb-2 relative z-10 opacity-80">Real-time Volume Data</span>
                <div className="flex items-baseline gap-2 relative z-10">
                  <span className="text-4xl sm:text-6xl font-black text-white font-mono tracking-tighter">
                    {cargoVolumeCbm}
                  </span>
                  <span className="text-2xl font-bold text-white font-mono italic">CBM</span>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 relative z-10">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-white opacity-60 font-medium italic">Est. Loading Capacity</span>
                    <span className="text-sm font-bold text-white">~{estimatedPallets} Pallets</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Interactive Range Slider with visual indicators */}
            <div className="mb-14 relative px-2">
              <div className="absolute -top-6 left-0 right-0 flex justify-between text-[10px] font-bold text-white uppercase tracking-widest px-1 opacity-70">
                <span>Micro Shipment</span>
                <span>Standard Container</span>
                <span>High-Cube Scale</span>
                <span>Vessel Fleet</span>
              </div>
              <div className="bg-[#061224]/80 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-inner group">
                <input
                  type="range"
                  min={2}
                  max={120}
                  step={1}
                  value={cargoVolumeCbm}
                  onChange={(e) => setCargoVolumeCbm(Number(e.target.value))}
                  className="w-full h-4 bg-slate-800 rounded-full appearance-none cursor-pointer accent-white hover:accent-slate-200 transition-all"
                />
                <div className="flex justify-between text-[11px] text-white opacity-60 font-mono font-bold pt-4">
                  <div className="flex flex-col items-center">
                    <div className="w-1 h-2 bg-white/20 mb-1"></div>
                    <span>2 CBM</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-1 h-2 bg-white/20 mb-1"></div>
                    <span>30 CBM</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-1 h-2 bg-white/20 mb-1"></div>
                    <span>68 CBM</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-1 h-2 bg-white/20 mb-1"></div>
                    <span>120 CBM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Calculation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div 
                whileHover={{ y: -5 }}
                className="p-6 sm:p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center gap-2 mb-4 text-white">
                    <div className="p-2 rounded-lg bg-white/10 border border-white/20">
                      <Ship className="w-5 h-5" />
                    </div>
                    <span className="text-xs text-white uppercase font-bold tracking-wider opacity-80">
                      Recommended Mode
                    </span>
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-white leading-tight mb-4 transition-colors">
                    {recommendedMode}
                  </div>
                </div>
                <div className="text-xs text-white opacity-60 mt-4 leading-relaxed border-t border-white/10 pt-4 font-medium italic">
                  Optimized for institutional medical supply chains under CPT/CIF terms.
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -5 }}
                className="p-6 sm:p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="p-2 rounded-lg bg-white/10 border border-white/20">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xs text-white uppercase font-bold tracking-wider opacity-80">
                      Transit Estimates
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10 shadow-sm">
                      <div className="flex items-center gap-2.5">
                        <Plane className="w-4 h-4 text-white opacity-70" />
                        <span className="text-sm font-bold text-white">Air Freight</span>
                      </div>
                      <span className="text-white font-mono font-black text-sm">{airTransitDays}</span>
                    </div>
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10 shadow-sm">
                      <div className="flex items-center gap-2.5">
                        <Ship className="w-4 h-4 text-white opacity-70" />
                        <span className="text-sm font-bold text-white">Ocean Cargo</span>
                      </div>
                      <span className="text-white font-mono font-black text-sm">{oceanTransitDays}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -5 }}
                className="p-6 sm:p-8 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 rounded-lg bg-white/10 border border-white/20">
                      <ShieldCheck className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xs text-white uppercase font-bold tracking-wider opacity-80">
                      Handling Protocol
                    </span>
                  </div>
                  <div className="text-xl font-black text-white leading-tight">
                    Pre-Cleared Export & Origin Paid
                  </div>
                  <p className="text-xs text-white mt-4 leading-relaxed font-medium opacity-80">
                    Hearts & Mind manages all origin logistics, port terminal handling, and mandatory customs filing.
                  </p>
                </div>
                <button
                  onClick={() => onRequestQuoteWithIncoterm('CPT')}
                  className="mt-6 py-4 px-6 bg-white hover:bg-slate-100 text-slate-900 font-black text-sm rounded-xl transition-all flex items-center justify-center gap-3 cursor-pointer shadow-lg group"
                >
                  <span>Request Live Quote</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            </div>
            </div>
          </div>
        </div>
    </section>
    </>
  );
};
