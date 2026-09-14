import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plane, 
  Ship, 
  Truck, 
  FileCheck2, 
  ArrowRight, 
  Check,
  CheckCircle2, 
  ShieldCheck,
  X,
  Scale,
  ShieldAlert,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { INCOTERMS_DATA } from '../data/mockData';
import multimodalImg from '../assets/images/multimodal_logistics_1789272164591.jpg';

interface IncotermsAndLogisticsProps {
  onOpenVault: () => void;
  onRequestQuoteWithIncoterm: (incoterm: string) => void;
}

export const IncotermsAndLogistics: React.FC<IncotermsAndLogisticsProps> = ({
  onOpenVault,
  onRequestQuoteWithIncoterm
}) => {
  // Selected Incoterm tab
  const [selectedTermCode, setSelectedTermCode] = useState<string>('CPT');
  // Modal for Full Incoterms Guide
  const [isIncotermsModalOpen, setIsIncotermsModalOpen] = useState<boolean>(false);

  const selectedTerm = INCOTERMS_DATA.find((t) => t.code === selectedTermCode) || INCOTERMS_DATA[0];

  return (
    <section id="shipping-section" className="py-12 sm:py-20 bg-[#040e21] text-white overflow-hidden relative">
      {/* Background glow accents with subtle animation */}
      <motion.div 
        animate={{ 
          opacity: [0.05, 0.1, 0.05],
          scale: [1, 1.2, 1] 
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-600/10 rounded-full blur-[120px] pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          opacity: [0.05, 0.1, 0.05],
          scale: [1, 1.1, 1] 
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ======================================================== */}
        {/* MAIN SPLIT SHOWCASE: Left Dark + Multimodal Image / Right Light Ice-Blue with Skyline */}
        {/* ======================================================== */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-700/60 grid grid-cols-1 lg:grid-cols-12 mb-14 bg-[#051329]"
        >
          
          {/* LEFT SIDE: Deep Navy Container with Multimodal Image */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#051329] via-[#071a35] to-[#040d1c] p-6 sm:p-8 flex flex-col justify-between relative border-b lg:border-b-0 lg:border-r border-slate-700/50">
            {/* Top Text Content */}
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold tracking-widest text-[#00d2ff] uppercase">
                  TRADE & SHIPPING
                </span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug mb-2.5">
                Global Logistics & Trade Capabilities
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                We manage the complexity of international trade so you can focus on your mission. From Incoterms to customs clearance, we handle it all.
              </p>

              {/* Verified Capability Highlights */}
              <div className="space-y-2 mb-5">
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00d2ff] shrink-0" />
                  <span className="font-medium">Licensed Freight Forwarding & Charter Network</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00d2ff] shrink-0" />
                  <span className="font-medium">Transparent Landed Cost Architecture (No Hidden Fees)</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00d2ff] shrink-0" />
                  <span className="font-medium">Full Risk-Transfer Milestone Tracking at Every Leg</span>
                </div>
              </div>

                {/* Action Button */}
              <div className="mb-6">
                <button
                  onClick={() => {
                    const el = document.getElementById('trade-tools');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-sky-400/40 bg-sky-950/50 hover:bg-sky-900/60 text-sky-200 text-xs sm:text-sm font-semibold transition-all group shadow-sm"
                >
                  <span>Learn More About Our Logistics</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Bottom Multimodal Image (Air Cargo Jet + Ocean Container Vessel + Freight Trucks + World Map) */}
            <div className="relative mt-2 rounded-xl overflow-hidden border border-sky-500/20 shadow-lg group">
              <img
                src={multimodalImg}
                alt="Multimodal Freight Logistics - Cargo Airplane, Container Ship, and Semi-Truck Fleet"
                className="w-full h-56 sm:h-64 object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              {/* Soft directional gradient for seamless integration */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#040d1c]/90 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-sky-200/90 font-medium">
                <span>
                  Air • Ocean • Land Multimodal
                </span>
                <span className="text-[10px] text-slate-400 font-mono">CPT Protocol</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Light Ice-Blue Container with Skyline Silhouette & 2 Columns */}
          <div className="lg:col-span-7 bg-gradient-to-br from-[#eaf4fd] via-[#f1f8fe] to-[#e4f1fc] p-6 sm:p-8 text-slate-800 relative flex flex-col justify-between overflow-hidden">
            
            {/* Background Port & City Skyline Silhouette Watermark matching reference image */}
            <div className="absolute bottom-0 left-0 right-0 h-44 opacity-20 pointer-events-none overflow-hidden flex items-end">
              <svg 
                viewBox="0 0 1000 240" 
                preserveAspectRatio="none" 
                className="w-full h-full text-sky-700 fill-current"
              >
                {/* Modern architectural high-rises and harbor port cranes silhouette */}
                <path d="M0,240 L0,180 L25,180 L25,140 L45,140 L45,190 L70,190 L70,120 L95,120 L95,170 L120,170 L120,95 L140,95 L140,70 L155,70 L155,95 L170,95 L170,190 L195,190 L195,130 L220,130 L220,190 L245,190 L245,110 L275,110 L275,170 L300,170 L300,85 L320,85 L320,190 L345,190 L345,150 L370,150 L370,190 L400,190 L400,105 L425,105 L425,60 L435,60 L435,105 L460,105 L460,180 L490,180 L490,125 L515,125 L515,190 L545,190 L545,140 L575,140 L575,75 L590,75 L590,190 L620,190 L620,115 L645,115 L645,190 L675,190 L675,130 L700,130 L700,90 L715,90 L715,190 L745,190 L745,155 L775,155 L775,190 L810,190 L810,100 L835,100 L835,175 L860,175 L860,120 L890,120 L890,190 L920,190 L920,145 L950,145 L950,180 L1000,180 L1000,240 Z" />
                {/* Port Crane Gantry silhouette */}
                <path d="M780,150 L840,90 L890,90 L850,150 Z" opacity="0.6" />
                <line x1="840" y1="90" x2="840" y2="150" stroke="currentColor" strokeWidth="3" />
                <line x1="880" y1="90" x2="880" y2="150" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>

            {/* Content Container (2-column layout matching reference image) */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
              
              {/* Column 1: Incoterms & Trade Terms */}
              <div className="md:col-span-6 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="font-extrabold text-base sm:text-lg text-[#071a33] tracking-tight">
                      Incoterms & Trade Terms
                    </h3>
                    <span className="px-2 py-0.5 bg-sky-100 text-[#0284c7] font-extrabold text-[10px] rounded border border-sky-200">
                      ICC 2020 Rules
                    </span>
                  </div>
                  
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    We work with all major Incoterms, with a focus on <strong>CPT (Carriage Paid To)</strong> to ensure clarity on freight payment and risk transfer.
                  </p>

                  {/* Interactive Incoterm Selector Tabs */}
                  <div className="flex items-center gap-1.5 mb-3 bg-white/70 p-1 rounded-lg border border-sky-200/70">
                    {INCOTERMS_DATA.map((term) => (
                      <button
                        key={term.code}
                        onClick={() => setSelectedTermCode(term.code)}
                        className={`flex-1 py-1 px-2 rounded text-[11px] font-bold transition-all ${
                          selectedTermCode === term.code
                            ? 'bg-[#071a33] text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-sky-50'
                        }`}
                      >
                        {term.code}
                        {term.code === 'CPT' && (
                          <span className="ml-1 text-[9px] text-[#00d2ff] font-extrabold">★</span>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Dynamic Incoterm Card matching screenshot styling */}
                  <div className="bg-[#dcf0fa]/85 backdrop-blur-xs rounded-xl p-4 sm:p-5 border border-sky-200/90 shadow-2xs mb-5">
                    <div className="flex items-center justify-between mb-2.5">
                      <h4 className="font-bold text-sm sm:text-base text-[#071a33]">
                        {selectedTerm.code} ({selectedTerm.name})
                      </h4>
                      {selectedTerm.code === 'CPT' ? (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Recommended
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                          Available
                        </span>
                      )}
                    </div>

                    <ul className="space-y-2 text-xs text-slate-700 mb-3">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 stroke-[3] shrink-0 mt-0.5" />
                        <span><strong>Freight:</strong> {selectedTerm.freightPayer} pays for transport to destination</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 stroke-[3] shrink-0 mt-0.5" />
                        <span><strong>Risk:</strong> {selectedTerm.riskTransfer}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 stroke-[3] shrink-0 mt-0.5" />
                        <span><strong>Customs:</strong> Export by {selectedTerm.customsExport}, Import by {selectedTerm.customsImport}</span>
                      </li>
                    </ul>

                    <div className="text-[11px] text-slate-500 pt-2 border-t border-sky-200/60 leading-snug">
                      <span className="font-semibold text-[#071a33]">Best suited for:</span> {selectedTerm.bestFor}
                    </div>
                  </div>
                </div>

                {/* View Full Incoterms Guide Button */}
                <div>
                  <button
                    onClick={() => setIsIncotermsModalOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#071a33] hover:bg-[#0c284d] text-white text-xs font-semibold rounded-lg shadow-sm transition-all group"
                  >
                    <span>View Full Incoterms Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 text-sky-400 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Column 2: Shipping Network matching reference image */}
              <div className="md:col-span-6 flex flex-col justify-between h-full">
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-[#071a33] mb-3 tracking-tight">
                    Shipping Network
                  </h3>

                  <div className="space-y-3.5">
                    {/* Air Freight */}
                    <div className="flex items-start gap-3 p-2 rounded-lg bg-white/50 border border-sky-100/80 hover:border-sky-300 transition-colors">
                      <div className="p-1.5 text-[#0284c7] shrink-0 mt-0.5">
                        <Plane className="w-5 h-5 text-[#0284c7]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-xs sm:text-sm text-[#071a33]">Air Freight</h4>
                          <span className="text-[9px] font-bold text-sky-700 bg-sky-100 px-1.5 py-0.2 rounded">3-6 Days</span>
                        </div>
                        <p className="text-[11px] sm:text-xs text-slate-600 leading-normal mt-0.5">
                          Fast & secure worldwide chartered routes for urgent medical consumables & cold-chain items.
                        </p>
                      </div>
                    </div>

                    {/* Ocean Cargo */}
                    <div className="flex items-start gap-3 p-2 rounded-lg bg-white/50 border border-sky-100/80 hover:border-sky-300 transition-colors">
                      <div className="p-1.5 text-[#0284c7] shrink-0 mt-0.5">
                        <Ship className="w-5 h-5 text-[#0284c7]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-xs sm:text-sm text-[#071a33]">Ocean Cargo</h4>
                          <span className="text-[9px] font-bold text-sky-700 bg-sky-100 px-1.5 py-0.2 rounded">FCL & LCL</span>
                        </div>
                        <p className="text-[11px] sm:text-xs text-slate-600 leading-normal mt-0.5">
                          Cost-effective containerized volume freight for large hospital conglomerate orders.
                        </p>
                      </div>
                    </div>

                    {/* Truck & Rail */}
                    <div className="flex items-start gap-3 p-2 rounded-lg bg-white/50 border border-sky-100/80 hover:border-sky-300 transition-colors">
                      <div className="p-1.5 text-[#0284c7] shrink-0 mt-0.5">
                        <Truck className="w-5 h-5 text-[#0284c7]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-xs sm:text-sm text-[#071a33]">Truck & Rail</h4>
                          <span className="text-[9px] font-bold text-sky-700 bg-sky-100 px-1.5 py-0.2 rounded">Bonded Drayage</span>
                        </div>
                        <p className="text-[11px] sm:text-xs text-slate-600 leading-normal mt-0.5">
                          Flexible multimodal cross-border solutions connecting maritime ports with inland distribution centers.
                        </p>
                      </div>
                    </div>

                    {/* Compliance & Customs with Cyan Underline */}
                    <div className="flex items-start gap-3 p-2 rounded-lg bg-white/50 border border-sky-100/80 hover:border-sky-300 transition-colors">
                      <div className="p-1.5 text-[#0284c7] shrink-0 mt-0.5">
                        <ShieldCheck className="w-5 h-5 text-[#0284c7]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-[#071a33]">Compliance & Customs</h4>
                        <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed mt-0.5">
                          Export validation, documentation, customs clearance & international standards (FDA, ISO, CE, WHO).
                        </p>
                        {/* Cyan accent line matching screenshot */}
                        <div className="w-16 h-[2.5px] bg-[#00d2ff] rounded-full mt-2.5 shadow-[0_0_8px_#00d2ff]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Access Compliance Document Vault Button */}
                <div className="pt-4 border-t border-sky-200/80 mt-4">
                  <button
                    onClick={onOpenVault}
                    type="button"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#071a33] hover:bg-[#0c284d] text-white text-sm sm:text-base font-bold rounded-xl shadow-lg hover:shadow-2xl shadow-slate-900/30 transition-all duration-200 group cursor-pointer"
                  >
                    <FileCheck2 className="w-5 h-5 text-[#00d2ff]" />
                    <span>Access Compliance Document Vault</span>
                    <ArrowRight className="w-4 h-4 text-sky-400 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </motion.div>
      </div>

      {/* ======================================================== */}
      {/* FULL INCOTERMS 2020 COMPARISON MODAL */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isIncotermsModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsIncotermsModalOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl bg-white text-slate-800 rounded-2xl shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="bg-[#071a33] text-white p-6 flex items-center justify-between border-b border-white/10 shrink-0">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-[#00d2ff] uppercase tracking-wider bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                      International Chamber of Commerce (ICC) 2020
                    </span>
                    <span className="text-xs text-slate-300">Hearts & Mind Medical Export Protocol</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                    Comprehensive Incoterms Responsibility Matrix
                  </h3>
                </div>
                <button
                  onClick={() => setIsIncotermsModalOpen(false)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-6">
                <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-xs text-slate-700 leading-relaxed">
                  <span className="font-bold text-[#071a33]">Why We Recommend CPT:</span> In medical supply procurement, CPT provides the optimal risk-to-cost equilibrium. Hearts & Mind handles export customs, port clearance, and pays international freight all the way to your destination port or airport. Risk transfers once handed over to the carrier, ensuring no surprise demurrage or ocean freight spikes.
                </div>

                {/* Terms Comparison Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {INCOTERMS_DATA.map((term) => (
                    <div
                      key={term.code}
                      className={`p-4 rounded-xl border flex flex-col justify-between ${
                        term.code === 'CPT'
                          ? 'border-cyan-500 bg-cyan-50/40 ring-2 ring-cyan-400/20'
                          : 'border-slate-200 bg-slate-50'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-lg font-black text-[#071a33]">
                            {term.code}
                          </span>
                          {term.code === 'CPT' && (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                              Preferred
                            </span>
                          )}
                        </div>
                        <h4 className="font-bold text-xs text-[#071a33] mb-1">
                          {term.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 mb-3">
                          {term.fullName}
                        </p>

                        <div className="space-y-1.5 text-[11px] mb-4">
                          <div className="flex justify-between py-1 border-b border-slate-200/60">
                            <span className="text-slate-500">Freight Paid By:</span>
                            <span className="font-bold text-[#071a33]">{term.freightPayer}</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-200/60">
                            <span className="text-slate-500">Insurance By:</span>
                            <span className="font-bold text-[#071a33]">{term.insurancePayer}</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-200/60">
                            <span className="text-slate-500">Export Customs:</span>
                            <span className="font-bold text-[#071a33]">{term.customsExport}</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-200/60">
                            <span className="text-slate-500">Import Clearance:</span>
                            <span className="font-bold text-[#071a33]">{term.customsImport}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setIsIncotermsModalOpen(false);
                          onRequestQuoteWithIncoterm(term.code);
                        }}
                        className="w-full py-2 bg-[#071a33] hover:bg-[#0c284d] text-white text-xs font-bold rounded-lg transition-colors"
                      >
                        Request Quote ({term.code})
                      </button>
                    </div>
                  ))}
                </div>

                {/* Detailed Duties Breakdown for Selected Term */}
                <div className="border border-slate-200 rounded-xl p-5 bg-white">
                  <h4 className="font-bold text-sm text-[#071a33] mb-3">
                    Detailed Legal Breakdown: {selectedTerm.code} ({selectedTerm.fullName})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-200/70">
                      <span className="font-bold text-emerald-900 block mb-2">
                        Seller Obligations (Hearts & Mind)
                      </span>
                      <ul className="space-y-1.5 text-slate-700">
                        {selectedTerm.sellerDuties.map((d, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 bg-sky-50/60 rounded-lg border border-sky-200/70">
                      <span className="font-bold text-sky-900 block mb-2">
                        Buyer Obligations (Purchaser)
                      </span>
                      <ul className="space-y-1.5 text-slate-700">
                        {selectedTerm.buyerDuties.map((d, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between shrink-0">
                <span className="text-xs text-slate-500">
                  Custom trade terms or government tender specifications available upon inquiry.
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsIncotermsModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setIsIncotermsModalOpen(false);
                      onRequestQuoteWithIncoterm('CPT');
                    }}
                    className="px-4 py-2 bg-[#00d2ff] hover:bg-[#00bde6] text-[#071a33] font-bold text-xs rounded-lg shadow-sm"
                  >
                    Request Institutional Quote
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

