import React, { useState } from 'react';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  MapPin,
  QrCode,
  Download,
  Send,
  Search,
  Sparkles,
  Layers,
  Thermometer,
  Droplet,
} from 'lucide-react';
import { FarmEstate, ProductItem, BatchRecord, StoryArticle } from '../types';
import { FARM_ESTATES, FEATURED_PRODUCTS, SAMPLE_BATCHES } from '../data';

interface ModalsProps {
  // Video Story Modal
  storyModalOpen: boolean;
  onCloseStoryModal: () => void;

  // Partner Modal
  partnerModalOpen: boolean;
  onClosePartnerModal: () => void;

  // Wholesale Pricing Modal
  wholesaleModalOpen: boolean;
  onCloseWholesaleModal: () => void;
  selectedWholesaleProduct?: ProductItem | null;

  // Batch Detail Modal
  batchModalOpen: boolean;
  onCloseBatchModal: () => void;
  selectedBatch?: BatchRecord | null;

  // Search Modal
  searchModalOpen: boolean;
  onCloseSearchModal: () => void;

  // Estate Detail Modal
  estateModalOpen: boolean;
  onCloseEstateModal: () => void;
  selectedEstate?: FarmEstate | null;

  // Article Modal
  articleModalOpen: boolean;
  onCloseArticleModal: () => void;
  selectedArticle?: StoryArticle | null;
}

export const Modals: React.FC<ModalsProps> = ({
  storyModalOpen,
  onCloseStoryModal,
  partnerModalOpen,
  onClosePartnerModal,
  wholesaleModalOpen,
  onCloseWholesaleModal,
  selectedWholesaleProduct,
  batchModalOpen,
  onCloseBatchModal,
  selectedBatch,
  searchModalOpen,
  onCloseSearchModal,
  estateModalOpen,
  onCloseEstateModal,
  selectedEstate,
  articleModalOpen,
  onCloseArticleModal,
  selectedArticle,
}) => {
  // Video player state
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Wholesale form state
  const [wholesaleTonnage, setWholesaleTonnage] = useState('250');
  const [wholesaleSubmitted, setWholesaleSubmitted] = useState(false);

  // Partner form state
  const [partnerSubmitted, setPartnerSubmitted] = useState(false);

  return (
    <>
      {/* 1. Watch Our Story Modal */}
      {storyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-4xl rounded-3xl overflow-hidden bg-[#071911] border border-[#22c55e]/30 shadow-2xl">
            {/* Header / Close */}
            <div className="p-4 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  AgriFuture Cinematic Story / 4K Field Doc
                </span>
              </div>
              <button
                onClick={onCloseStoryModal}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Simulation Canvas */}
            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=85"
                alt="AgriFuture farmland"
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover transition-transform duration-1000 ${
                  isPlaying ? 'scale-105' : 'scale-100'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

              {/* Center Play/Pause Overlay */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-full bg-[#c39953]/90 hover:bg-[#d8b06d] text-[#041009] flex items-center justify-center shadow-2xl transition-transform hover:scale-110"
              >
                {isPlaying ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current ml-1" />}
              </button>

              {/* Bottom Video Controls Overlay */}
              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs text-white">
                <div className="space-y-1">
                  <h4 className="font-bold text-sm font-serif">Growing What's Next: The Earth & The Future</h4>
                  <p className="text-[11px] text-emerald-300">Narrated by Dr. Elena Carter, Chief Agronomist</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <span className="font-mono text-[11px] bg-black/60 px-2 py-1 rounded">01:48 / 02:30</span>
                </div>
              </div>
            </div>

            {/* Video Footer Bio */}
            <div className="p-6 bg-[#041009] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-300">
              <p>
                Filmed across Sacramento Delta, Okanagan Valley, and Argentine Pampas estates. 100% renewable production.
              </p>
              <button
                onClick={onCloseStoryModal}
                className="px-5 py-2 rounded-full bg-[#133827] text-white hover:bg-[#1a4a34] font-semibold text-xs transition-colors"
              >
                Close Video
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Partner With Us Modal */}
      {partnerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl rounded-3xl overflow-hidden bg-[#071911] border border-[#c39953]/40 shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-[#d8b06d] uppercase tracking-widest">
                  GLOBAL PARTNERSHIP INITIATIVE
                </span>
                <h3 className="text-2xl font-bold text-white font-serif mt-1">
                  Partner With AgriFuture
                </h3>
                <p className="text-xs text-gray-300 mt-1">
                  Connect with our commercial export desk for forward contract allocations and certified supply agreements.
                </p>
              </div>
              <button
                onClick={onClosePartnerModal}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {partnerSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-950/90 border border-[#22c55e] text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#22c55e] mx-auto" />
                <h4 className="text-base font-bold text-white">Application Received</h4>
                <p className="text-xs text-emerald-200 leading-relaxed">
                  Thank you. Our commercial export team has registered your credentials. An executive dossier will be sent to your provided email within 1 business day.
                </p>
                <button
                  onClick={() => {
                    setPartnerSubmitted(false);
                    onClosePartnerModal();
                  }}
                  className="px-6 py-2 rounded-full bg-[#22c55e] text-[#041009] text-xs font-bold uppercase"
                >
                  Done
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setPartnerSubmitted(true);
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eleanor Vance"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#041009] border border-white/15 text-xs text-white placeholder-gray-500 focus:ring-2 focus:ring-[#c39953]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Business Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. eleanor@vancefoods.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#041009] border border-white/15 text-xs text-white placeholder-gray-500 focus:ring-2 focus:ring-[#c39953]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Company / Entity</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Global Grocery Wholesale"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#041009] border border-white/15 text-xs text-white placeholder-gray-500 focus:ring-2 focus:ring-[#c39953]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Country / Jurisdiction</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. United Kingdom / EU"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#041009] border border-white/15 text-xs text-white placeholder-gray-500 focus:ring-2 focus:ring-[#c39953]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Commodity / Collaboration Interest</label>
                  <select className="w-full px-3.5 py-2.5 rounded-xl bg-[#041009] border border-white/15 text-xs text-white focus:ring-2 focus:ring-[#c39953]">
                    <option>Grain Wholesale & Silo Allocations</option>
                    <option>Fresh Produce (Hass Avocados, Tomatoes)</option>
                    <option>Regenerative Livestock & Pasture Beef</option>
                    <option>Specialty Herbs & Extracts</option>
                    <option>Agritech Licensing & Sensor Integration</option>
                  </select>
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClosePartnerModal}
                    className="px-4 py-2.5 rounded-full text-xs text-gray-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#d8b06d] to-[#c39953] text-[#041009] text-xs font-bold uppercase tracking-wider shadow-lg"
                  >
                    Submit Proposal
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 3. Wholesale Pricing Request Modal */}
      {wholesaleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl rounded-3xl overflow-hidden bg-[#071911] border border-[#22c55e]/40 shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-[#34d399] uppercase tracking-widest">
                  COMMERCIAL WHOLESALE DESK
                </span>
                <h3 className="text-2xl font-bold text-white font-serif mt-1">
                  Wholesale Price Calculator & Quote
                </h3>
                <p className="text-xs text-gray-300 mt-1">
                  {selectedWholesaleProduct
                    ? `Configuring quote for: ${selectedWholesaleProduct.name}`
                    : 'Real-time forward pricing and minimum order quantities.'}
                </p>
              </div>
              <button
                onClick={onCloseWholesaleModal}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {wholesaleSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-950/90 border border-[#22c55e] text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#22c55e] mx-auto" />
                <h4 className="text-base font-bold text-white">Quote Request Transmitted</h4>
                <p className="text-xs text-emerald-200">
                  Your formal CIF/FOB pricing specification for {wholesaleTonnage} metric tons has been compiled. Check your inbox for the breakdown.
                </p>
                <button
                  onClick={() => {
                    setWholesaleSubmitted(false);
                    onCloseWholesaleModal();
                  }}
                  className="px-6 py-2 rounded-full bg-[#22c55e] text-[#041009] text-xs font-bold uppercase"
                >
                  Close
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setWholesaleSubmitted(true);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Commodity Category / Variety
                  </label>
                  <select
                    defaultValue={selectedWholesaleProduct?.name || 'Heritage Golden Wheat'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#041009] border border-white/15 text-xs text-white focus:ring-2 focus:ring-[#22c55e]"
                  >
                    {FEATURED_PRODUCTS.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name} ({p.category})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs text-gray-300 mb-1">
                    <span>Desired Volume (Metric Tons):</span>
                    <span className="font-mono font-bold text-emerald-400">{wholesaleTonnage} Tons</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="2000"
                    step="10"
                    value={wholesaleTonnage}
                    onChange={(e) => setWholesaleTonnage(e.target.value)}
                    className="w-full accent-[#22c55e]"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                    <span>20 T (Sample)</span>
                    <span>500 T (Standard)</span>
                    <span>2,000+ T (Vessel)</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Destination Port</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rotterdam, Long Beach, Yokohama"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#041009] border border-white/15 text-xs text-white placeholder-gray-500 focus:ring-2 focus:ring-[#22c55e]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Incoterm Requested</label>
                    <select className="w-full px-3.5 py-2.5 rounded-xl bg-[#041009] border border-white/15 text-xs text-white focus:ring-2 focus:ring-[#22c55e]">
                      <option>FOB (Free on Board - Origin Port)</option>
                      <option>CIF (Cost, Insurance & Freight)</option>
                      <option>EXW (Ex Works - Estate Gate)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Official Contact Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="purchasing@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#041009] border border-white/15 text-xs text-white placeholder-gray-500 focus:ring-2 focus:ring-[#22c55e]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={onCloseWholesaleModal}
                    className="px-4 py-2.5 rounded-full text-xs text-gray-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#22c55e] hover:bg-[#16a34a] text-[#041009] text-xs font-bold uppercase tracking-wider shadow-lg"
                  >
                    Generate Quote
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 4. Batch Certificate of Analysis (COA) Inspector Modal */}
      {batchModalOpen && selectedBatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-3xl overflow-hidden bg-white text-gray-900 border border-gray-300 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-gray-200 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-[#166534] font-mono text-xs font-bold">
                    CERTIFICATE #{selectedBatch.batchId}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-emerald-700 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Passed Independent Testing
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-[#0a2316] font-serif">
                  {selectedBatch.productName} — Phytosanitary Report
                </h3>
              </div>
              <button
                onClick={onCloseBatchModal}
                className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Batch Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                <span className="text-[10px] text-gray-500 uppercase font-semibold">Cultivar / Variety</span>
                <p className="text-sm font-bold text-gray-800">{selectedBatch.variety}</p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                <span className="text-[10px] text-gray-500 uppercase font-semibold">Origin Farm Estate</span>
                <p className="text-sm font-bold text-gray-800">{selectedBatch.estate}</p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                <span className="text-[10px] text-gray-500 uppercase font-semibold">Harvest & Pack Dates</span>
                <p className="text-sm font-bold text-gray-800">
                  {selectedBatch.harvestDate} → {selectedBatch.packDate}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                <span className="text-[10px] text-gray-500 uppercase font-semibold">Cold Chain Log</span>
                <p className="text-sm font-bold text-gray-800">{selectedBatch.tempControlled}</p>
              </div>
            </div>

            {/* Lab Assays */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
              <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Laboratory Analytical Assays
              </h4>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-gray-600 block">Quality / Sugar / Brix:</span>
                  <span className="font-bold text-emerald-900">{selectedBatch.brixLevel}</span>
                </div>
                <div>
                  <span className="text-gray-600 block">Pesticide Residue:</span>
                  <span className="font-bold text-emerald-900">{selectedBatch.pesticideResidue}</span>
                </div>
                <div>
                  <span className="text-gray-600 block">Heavy Metals (Lead/Cadmium):</span>
                  <span className="font-bold text-emerald-900">Below Detection Limit (&lt;0.001 mg/kg)</span>
                </div>
                <div>
                  <span className="text-gray-600 block">Microbiological Safety:</span>
                  <span className="font-bold text-emerald-900">Salmonella/E. coli: Negative</span>
                </div>
              </div>
            </div>

            {/* Footer / Print */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-200 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-gray-800" />
                <span className="font-mono text-[11px]">Ledger Hash: 0x8F9a...24B1</span>
              </div>
              <button
                onClick={() => alert(`Certificate of Analysis for Batch ${selectedBatch.batchId} saved to download queue.`)}
                className="px-4 py-2 rounded-xl bg-[#0d281a] hover:bg-[#133827] text-white font-semibold flex items-center gap-1.5 shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Download Official PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Search Overlay Modal */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#071911] border border-[#22c55e]/40 shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-mono font-bold text-emerald-300 uppercase tracking-wider">
                Search AgriFuture Knowledge Base
              </h3>
              <button
                onClick={onCloseSearchModal}
                className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                autoFocus
                placeholder="Search crops, farm estates, certifications, technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#041009] border border-white/20 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
              />
            </div>

            {/* Quick Links / Suggestions */}
            <div className="space-y-2 pt-1 text-xs">
              <span className="text-gray-400 text-[11px] uppercase font-semibold">Suggested Topics:</span>
              <div className="flex flex-wrap gap-2">
                {['Hass Avocados', 'Golden Wheat', 'Green Valley Estate', 'Soil Moisture Telemetry', 'Rotational Cattle', 'Subsurface Drip', 'Export Ports'].map(
                  (topic) => (
                    <button
                      key={topic}
                      onClick={() => setSearchQuery(topic)}
                      className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-colors"
                    >
                      {topic}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Search Results Preview */}
            <div className="pt-2 border-t border-white/10 space-y-2 max-h-60 overflow-y-auto">
              {FEATURED_PRODUCTS.filter((p) =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.category.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((p) => (
                <div
                  key={p.id}
                  onClick={onCloseSearchModal}
                  className="p-3 rounded-xl bg-[#0a2317] hover:bg-[#0e2f21] border border-white/5 flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <h4 className="text-xs font-bold text-white">{p.name}</h4>
                    <p className="text-[11px] text-emerald-400">{p.category} • {p.originEstate}</p>
                  </div>
                  <span className="text-[11px] text-[#c39953] font-mono font-medium">View Crop →</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. Estate Detail Modal */}
      {estateModalOpen && selectedEstate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl rounded-3xl overflow-hidden bg-[#071911] border border-[#22c55e]/40 shadow-2xl p-6 sm:p-8 space-y-5 text-white">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-[#d8b06d] uppercase tracking-widest">
                  ESTATE DOSSIER
                </span>
                <h3 className="text-2xl font-bold text-white font-serif mt-1">
                  {selectedEstate.name}
                </h3>
                <p className="text-xs text-emerald-400 mt-0.5">
                  {selectedEstate.location}
                </p>
              </div>
              <button
                onClick={onCloseEstateModal}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-md">
              <img
                src={selectedEstate.imageUrl}
                alt={selectedEstate.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs font-mono font-bold text-white bg-black/60 px-3 py-1 rounded-full border border-white/20">
                  {selectedEstate.acres.toLocaleString()} Cultivated Acres
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#092217] border border-white/10">
                <span className="text-gray-400 text-[10px] block uppercase">Climate Classification</span>
                <span className="font-semibold text-white">{selectedEstate.climate}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#092217] border border-white/10">
                <span className="text-gray-400 text-[10px] block uppercase">Soil Stratum</span>
                <span className="font-semibold text-white">{selectedEstate.soilType}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#092217] border border-white/10">
                <span className="text-gray-400 text-[10px] block uppercase">Elevation</span>
                <span className="font-semibold text-white">{selectedEstate.elevation}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#092217] border border-white/10">
                <span className="text-gray-400 text-[10px] block uppercase">Active Cultivars</span>
                <span className="font-semibold text-[#34d399]">{selectedEstate.crops.join(', ')}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={onCloseEstateModal}
                className="px-6 py-2.5 rounded-full bg-[#133827] hover:bg-[#1a4a34] text-white text-xs font-semibold uppercase tracking-wider"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. Field Story Article Modal */}
      {articleModalOpen && selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-3xl overflow-hidden bg-white text-gray-900 border border-gray-300 shadow-2xl p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-gray-200 pb-4">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-[#166534] font-mono text-xs font-bold">
                  {selectedArticle.category} • {selectedArticle.readTime}
                </span>
                <h3 className="text-2xl font-bold text-[#0a2316] font-serif">
                  {selectedArticle.title}
                </h3>
                <span className="text-xs text-gray-500 block">Published {selectedArticle.date}</span>
              </div>
              <button
                onClick={onCloseArticleModal}
                className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
              <img
                src={selectedArticle.imageUrl}
                alt={selectedArticle.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="prose prose-sm text-gray-700 leading-relaxed space-y-3">
              <p className="font-semibold text-gray-900 text-sm">{selectedArticle.excerpt}</p>
              <p>{selectedArticle.content}</p>
              <p>
                Our longitudinal studies across 12,500 continuous acres indicate that biological soil diversity not only reduces total irrigation requirements by upwards of 35%, but also dramatically enhances natural plant defense phyto-compounds against seasonal pathogens.
              </p>
            </div>

            <div className="pt-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={onCloseArticleModal}
                className="px-6 py-2.5 rounded-full bg-[#0d281a] text-white text-xs font-semibold uppercase tracking-wider"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
