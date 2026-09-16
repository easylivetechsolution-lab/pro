import React, { useState } from 'react';
import { 
  Crown, 
  ShieldCheck, 
  ArrowRight, 
  Check, 
  PhoneCall, 
  Award, 
  Lock,
  Layers,
  ChevronRight
} from 'lucide-react';
import type { Product } from '../types';

// Imagery
import execDeskImg from '../assets/images/exec_desk_shot_1789337899461.jpg';
import loungeChairImg from '../assets/images/lounge_chair_shot_1789337923984.jpg';
import credenzaImg from '../assets/images/teak_credenza_1789334512576.jpg';
import confTableImg from '../assets/images/conf_table_shot_1789337885116.jpg';

interface BlackLabelItem {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  edition: string;
  leadTime: string;
  image: string;
  materials: string[];
  keyFeature: string;
  dimensions: string;
  artisanPlaque: string;
}

const BLACK_LABEL_COLLECTION: BlackLabelItem[] = [
  {
    id: 'bl-sovereign-desk',
    name: 'The Sovereign Monolith Executive Desk',
    tagline: 'Single-slab 180-year-old French Burl Walnut & Solid Unlacquered Brass',
    price: 14800,
    originalPrice: 16500,
    edition: 'Edition 04 of 12 Crafted Annually',
    leadTime: '6-8 Weeks White-Glove Handcraft',
    image: execDeskImg,
    materials: ['180-Yr French Burl Walnut', 'Solid Hand-Spun Brass Billet', 'Full-Grain Tuscan Leather Blotter', 'Biometric Motorized Drawer'],
    keyFeature: 'Concealed biometric fingerprint vault & invisible electromagnetic wireless Qi charging surface beneath the grain.',
    dimensions: '3000mm W × 1150mm D × 760mm H',
    artisanPlaque: 'Individually serialized on an engraved 24k gold-plated brass maker\'s mark.',
  },
  {
    id: 'bl-aurelius-lounge',
    name: 'The Aurelius Grand President Lounge & Ottoman',
    tagline: 'Steam-Curved Santos Rosewood & Hand-Buffed Tuscan Aniline Leather',
    price: 7400,
    edition: 'Edition 09 of 25 Hand-Numbered',
    leadTime: '4-5 Weeks Handcraft',
    image: loungeChairImg,
    materials: ['Bookmatched Santos Rosewood', '100% Tuscan Saddle Aniline Hide', 'Hand-Cast Patinated Bronze Swivel', 'Dual-Density Memory Latex Core'],
    keyFeature: 'Ergonomically tuned 118° cervical relaxation tilt engineered for deep contemplation and sovereign executive comfort.',
    dimensions: '980mm W × 920mm D × 1040mm H',
    artisanPlaque: 'Hand-signed by Master Cabinetmaker with certificate of botanical provenance.',
  },
  {
    id: 'bl-nocturne-credenza',
    name: 'The Nocturne Fluted Credenza & Cellar',
    tagline: 'Calacatta Viola Honed Marble & Tambour Smoked Bog Oak',
    price: 11200,
    edition: 'Edition 02 of 15 Commissioned',
    leadTime: '6-7 Weeks White-Glove Handcraft',
    image: credenzaImg,
    materials: ['Apuan Calacatta Viola Marble', 'Smoked European Bog Oak', 'Integrated LED Climate Humidor', 'Solid Bronze Sliding Hardware'],
    keyFeature: 'Features a center whisper-quiet thermo-electric humidor and spirits vault with soft interior halo illumination.',
    dimensions: '2600mm W × 550mm D × 780mm H',
    artisanPlaque: 'Includes bespoke engraved owner monogram on interior drawer lining.',
  },
  {
    id: 'bl-pantheon-table',
    name: 'The Imperial Boardroom Monolith',
    tagline: 'Continuous Bookmatched Nero Marquina Marble & Gunmetal Titanium',
    price: 19500,
    edition: 'Limited Private Commission',
    leadTime: '8-10 Weeks Architectural Delivery',
    image: confTableImg,
    materials: ['Continuous Bookmatched Nero Marquina', 'Matte Architectural Titanium', 'Acoustic Sub-Baffles', 'Motorized Retractor Wells'],
    keyFeature: '14-seat monolithic conference centerpiece with motorized concealed conference microphones and concealed cable spine.',
    dimensions: '4400mm W × 1450mm D × 750mm H',
    artisanPlaque: 'Direct architectural liaison and on-site white-glove assembly included.',
  },
];

interface BlackLabelSectionProps {
  onAddToCart?: (product: Product, color?: string) => void;
  onOpenB2B?: () => void;
}

export const BlackLabelSection: React.FC<BlackLabelSectionProps> = ({ onAddToCart, onOpenB2B }) => {
  const [activeItem, setActiveItem] = useState<BlackLabelItem>(BLACK_LABEL_COLLECTION[0]);
  const [selectedCommission, setSelectedCommission] = useState<BlackLabelItem | null>(null);
  const [isCommissionSubmitted, setIsCommissionSubmitted] = useState(false);

  const handleOrderBlackLabel = (item: BlackLabelItem) => {
    if (onAddToCart) {
      // Map to standard product interface for cart addition
      const productObj: Product = {
        id: item.id,
        name: `[Black Label] ${item.name}`,
        price: item.price,
        originalPrice: item.originalPrice,
        rating: 5.0,
        reviewCount: 14,
        category: 'handcrafted',
        image: item.image,
        description: `${item.tagline}. ${item.keyFeature}`,
        isBestSeller: true,
        colors: [
          { name: 'Artisan Bespoke Finish', hex: '#1a1816' }
        ],
        features: [item.keyFeature, ...item.materials, `Edition: ${item.edition}`, `Lead Time: ${item.leadTime}`],
        dimensions: item.dimensions,
        materials: item.materials
      };
      onAddToCart(productObj, 'Artisan Bespoke Finish');
    } else {
      setSelectedCommission(item);
    }
  };

  return (
    <section id="black-label" className="bg-[#0b0c0e] text-white py-18 sm:py-22 lg:py-26 relative overflow-hidden select-none border-b border-stone-800/80">
      {/* Subtle Gold Dust Ambient Background Glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#dcb07a]/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-[#b86d1f]/6 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Ribbon */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 lg:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#dcb07a]/15 border border-[#dcb07a]/30 mb-3">
              <Crown className="w-3.5 h-3.5 text-[#f5cca0]" />
              <span className="text-[11px] font-bold tracking-[0.24em] text-[#f5cca0] uppercase font-sans">
                WORKWELL BLACK LABEL • HAUTE ATELIER
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-normal text-white tracking-tight leading-tight">
              Specially Built. Uncompromisingly Rare.
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm mt-2.5 leading-relaxed max-w-xl">
              Limited-edition masterworks commissioned from centuries-old timbers, monolithic Italian marble, and unlacquered living brass. Built for visionary leaders.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs text-stone-400 border-l border-stone-800/80 pl-4 lg:pl-6 shrink-0">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#dcb07a]" />
              <span>Numbered Limited Editions</span>
            </div>
            <div className="w-px h-4 bg-stone-800" />
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#dcb07a]" />
              <span>White-Glove Private Delivery</span>
            </div>
          </div>
        </div>

        {/* Featured Showcase: Active Flagship Item Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center bg-[#13151a] rounded-3xl border border-stone-800/90 p-6 sm:p-8 lg:p-10 shadow-2xl mb-12">
          
          {/* Left Large Visual */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden relative group aspect-[16/10] bg-stone-900 border border-stone-800/60 shadow-inner">
            <img
              src={activeItem.image}
              alt={activeItem.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            
            {/* Top Badge */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[#f5cca0] text-[11px] font-semibold border border-[#dcb07a]/30 flex items-center gap-1.5">
                <Crown className="w-3 h-3 text-[#f5cca0]" />
                {activeItem.edition}
              </span>
            </div>

            {/* Bottom Inscription */}
            <div className="absolute bottom-4 left-4 right-4 z-10">
              <p className="text-xs text-stone-300 italic font-serif">
                "{activeItem.artisanPlaque}"
              </p>
            </div>
          </div>

          {/* Right Product Specifications & Purchase Actions */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <span className="text-[11px] font-mono tracking-widest text-[#dcb07a] uppercase block mb-1">
                PRIVATE ATELIER COMMISSION
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-snug">
                {activeItem.name}
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 mt-2 leading-relaxed">
                {activeItem.tagline}
              </p>

              {/* Price & Lead Time */}
              <div className="mt-5 pb-5 border-b border-stone-800 flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-serif text-[#f5cca0] font-normal">
                  ${activeItem.price.toLocaleString()}
                </span>
                {activeItem.originalPrice && (
                  <span className="text-sm text-stone-500 line-through font-mono">
                    ${activeItem.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-[11px] text-stone-400 font-mono ml-auto">
                  {activeItem.leadTime}
                </span>
              </div>

              {/* Curated Materials Checklist */}
              <div className="py-5 border-b border-stone-800 space-y-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 block mb-2">
                  Materials of Construction:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeItem.materials.map((mat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-stone-300">
                      <Check className="w-3.5 h-3.5 text-[#dcb07a] shrink-0" />
                      <span className="truncate">{mat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Architectural Highlight */}
              <div className="py-4">
                <p className="text-xs text-stone-400 leading-relaxed">
                  <strong className="text-white">Architectural Note:</strong> {activeItem.keyFeature}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => handleOrderBlackLabel(activeItem)}
                className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#dcb07a] via-[#e5bd88] to-[#c79659] hover:brightness-105 text-stone-950 font-bold text-xs sm:text-sm tracking-wide uppercase shadow-lg shadow-[#dcb07a]/20 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.98]"
              >
                <span>Acquire Piece (${activeItem.price.toLocaleString()})</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setSelectedCommission(activeItem)}
                className="w-full sm:w-auto py-3.5 px-5 rounded-xl border border-stone-700 hover:border-stone-500 bg-white/5 hover:bg-white/10 text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#dcb07a]" />
                <span>Atelier Concierge</span>
              </button>
            </div>

          </div>

        </div>

        {/* Bottom Row of 4 Black Label Cards for Quick Switching */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {BLACK_LABEL_COLLECTION.map((item) => {
            const isSelected = activeItem.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected 
                    ? 'bg-[#1a1d24] border-[#dcb07a] ring-1 ring-[#dcb07a]/40 shadow-lg' 
                    : 'bg-[#111317] hover:bg-[#15181e] border-stone-800 hover:border-stone-700'
                }`}
              >
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-stone-900 shrink-0 border border-stone-800">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-[#f5cca0] font-mono block truncate">
                      {item.edition}
                    </span>
                    <h4 className="text-sm font-serif text-white font-normal truncate">
                      {item.name}
                    </h4>
                    <span className="text-xs font-semibold text-white/90">
                      ${item.price.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-800/80 text-[11px] text-stone-400">
                  <span className="truncate">{item.materials[0]}</span>
                  <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-[#dcb07a]' : 'text-stone-600'}`} />
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Private Concierge Commission Modal */}
      {selectedCommission && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => { setSelectedCommission(null); setIsCommissionSubmitted(false); }}
        >
          <div 
            className="bg-[#14161d] border border-stone-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-white relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {isCommissionSubmitted ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-[#dcb07a]/20 border border-[#dcb07a] flex items-center justify-center text-[#dcb07a] mx-auto mb-4">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-serif text-white mb-2">Commission Request Received</h3>
                <p className="text-xs text-stone-300 leading-relaxed mb-6">
                  Our Chief Atelier Concierge has received your private inquiry for <strong>{selectedCommission.name}</strong>. A dedicated architectural specialist will contact you within 4 business hours with timber provenance records and delivery scheduling.
                </p>
                <button
                  onClick={() => { setSelectedCommission(null); setIsCommissionSubmitted(false); }}
                  className="px-6 py-2.5 rounded-xl bg-[#dcb07a] text-stone-950 font-semibold text-xs cursor-pointer"
                >
                  Return to Showroom
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-start justify-between border-b border-stone-800 pb-4 mb-5">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#dcb07a] block mb-1">
                      BESPOKE ARCHITECTURAL INQUIRY
                    </span>
                    <h3 className="text-xl font-serif text-white">{selectedCommission.name}</h3>
                    <p className="text-xs text-stone-400 mt-0.5">${selectedCommission.price.toLocaleString()} • {selectedCommission.edition}</p>
                  </div>
                  <button
                    onClick={() => setSelectedCommission(null)}
                    className="w-7 h-7 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-400 text-xs"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); setIsCommissionSubmitted(true); }} className="space-y-3.5">
                  <div>
                    <label className="text-[11px] font-semibold text-stone-300 block mb-1">Full Name or Enterprise</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g., Lord Alistair Vance or Vance Capital" 
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-stone-500 outline-none focus:border-[#dcb07a]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-stone-300 block mb-1">Direct Private Email or Telephone</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="concierge@vanceholdings.com" 
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-stone-500 outline-none focus:border-[#dcb07a]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-stone-300 block mb-1">Custom Dimensions or Specific Timber Preferences</label>
                    <textarea 
                      rows={3} 
                      placeholder="Optional notes on room dimensions, marble vein preferences, or concealed technology..." 
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-stone-500 outline-none focus:border-[#dcb07a]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-[#dcb07a] hover:bg-[#e6bd8b] text-stone-950 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Connect with Master Artisan Concierge
                    </button>
                    <p className="text-[10px] text-stone-500 text-center mt-2">
                      Zero obligation. Strict NDA and confidential architectural consultation.
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

    </section>
  );
};
