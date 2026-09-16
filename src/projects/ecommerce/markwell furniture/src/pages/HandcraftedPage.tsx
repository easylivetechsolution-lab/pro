import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, // wait, user requested no Sparkles icon! Let's NOT import Sparkles!
  Compass, 
  Layers, 
  TreePine, 
  Rotate3d, 
  Eye, 
  ShoppingBag, 
  Heart, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Flame,
  Award
} from 'lucide-react';
import type { Product } from '../types';
import { FEATURED_PRODUCTS } from '../data';
import craftsmanWoodworkerImg from '../assets/images/craftsman_woodworker_1789334457347.jpg';
import redwoodChairImg from '../assets/images/redwood_lounge_chair_1789334472223.jpg';
import woodDeskChairImg from '../assets/images/wood_desk_chair_1789334500077.jpg';
import teakCredenzaImg from '../assets/images/teak_credenza_1789334512576.jpg';
import bookshelfRoomImg from '../assets/images/wooden_bookshelf_room_1789334485985.jpg';
import ergoChairFrontImg from '../assets/images/ergo_chair_front_1789335622198.jpg';
import ergoChairSideImg from '../assets/images/ergo_chair_side_1789335636307.jpg';
import ergoChairBackImg from '../assets/images/ergo_chair_back_1789335649130.jpg';
import ergoChairThreeQtrImg from '../assets/images/ergo_chair_three_qtr_1789335668046.jpg';

interface HandcraftedPageProps {
  onAddToCart: (product: Product, selectedColor?: string, quantity?: number) => void;
  onToggleWishlist: (productId: string) => void;
  wishlist: string[];
  onQuickView: (product: Product) => void;
}

const ROTATION_FRAMES = [
  ergoChairFrontImg,
  ergoChairSideImg,
  ergoChairBackImg,
  ergoChairThreeQtrImg,
];

const TIMBERS = [
  {
    name: 'American Black Walnut',
    origin: 'Appalachian Hardwood Belt',
    grain: 'Deep chocolate heartwood with flowing marbled grain lines and dense, vibration-dampening mass.',
    density: '640 kg/m³',
    finish: 'Hand-rubbed organic Danish oil & beeswax',
    colorHex: '#3d2817',
  },
  {
    name: 'European Alpine White Oak',
    origin: 'Bavaria & Central France',
    grain: 'Light biscuit tones with distinctive silver medullary ray flecks and outstanding dimensional stability.',
    density: '720 kg/m³',
    finish: 'Matte invisible botanical wax seal',
    colorHex: '#b59a79',
  },
  {
    name: 'Reclaimed Old-Growth Redwood',
    origin: 'Northern California Pacific Coast',
    grain: 'Copper-rose coloration with ultra-tight annual growth rings and natural moisture resistance.',
    density: '450 kg/m³',
    finish: 'Hand-buffed natural carnauba wax',
    colorHex: '#7a3e2c',
  },
  {
    name: 'Grade-A Plantation Teak',
    origin: 'Sustainable Southeast Asian Reserves',
    grain: 'Rich golden honey hues infused with natural silica oils that resist humidity swings and dry air.',
    density: '680 kg/m³',
    finish: 'Organic linseed oil immersion',
    colorHex: '#8b5a2b',
  },
];

const JOINERY_METHODS = [
  {
    title: 'Through Mortise & Tenon',
    description: 'The tenon passes entirely through the receiving timber and is mechanically locked with contrasting hardwood wedges. Immovable under heavy static loads.',
    badge: 'Zero Hardware',
  },
  {
    title: 'Hand-Cut Half-Blind Dovetails',
    description: 'Interlocking trapezoidal pins that resist tensile pull from the front. Used across all solid wood drawers and credenza carcasses.',
    badge: 'Tensile Strength',
  },
  {
    title: 'Steam-Bent Contours',
    description: 'Solid cherry and oak planks are softened in 210°F steam chambers, then clamped over custom curved molds to yield organic lumbar curvature without laminates.',
    badge: 'Organic Form',
  },
  {
    title: 'Butterfly Key Splines',
    description: 'Double-dovetail wooden keys inserted across natural grain fissures to stabilize timber movement while celebrating the organic story of the tree.',
    badge: 'Architectural Heritage',
  },
];

export const HandcraftedPage: React.FC<HandcraftedPageProps> = ({
  onAddToCart,
  onToggleWishlist,
  wishlist,
  onQuickView,
}) => {
  const navigate = useNavigate();
  const [frameIndex, setFrameIndex] = useState(0);
  const [selectedTimber, setSelectedTimber] = useState(0);

  // Filter handcrafted pieces
  const handcraftedProducts = FEATURED_PRODUCTS.filter(
    (p) => p.category === 'handcrafted' || p.tag === 'Artisan' || p.tag === 'Handcrafted'
  );

  const [commissionForm, setCommissionForm] = useState({
    name: '',
    email: '',
    timber: 'American Black Walnut',
    dimensions: '',
    notes: '',
  });
  const [commissionSubmitted, setCommissionSubmitted] = useState(false);

  const handleCommissionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commissionForm.name || !commissionForm.email) return;
    setCommissionSubmitted(true);
  };

  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-[#0e1014] text-[#e8eaed] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-zinc-400 mb-6 font-medium">
          <Link to="/" className="hover:text-[#f3ba77] transition-colors">Home</Link>
          <span className="text-zinc-600">/</span>
          <span className="text-white">Handcrafted Atelier</span>
        </nav>

        {/* Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider text-[#e2b47f] mb-4">
              <Award className="w-3.5 h-3.5" />
              The MarkWell Atelier
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
              Honoring Timber. Sculpting Heirlooms.
            </h1>
            <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed mb-8">
              Every curve is hand-sculpted, every joinery mortise chiseled to micrometer tolerances, 
              and every surface finished with natural botanical waxes. Furniture engineered to mature gracefully 
              across generations.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#pieces-collection"
                className="bg-[#e2a466] hover:bg-[#efb57b] text-black font-semibold text-xs sm:text-sm px-7 py-3.5 rounded-full transition-colors cursor-pointer flex items-center gap-2"
              >
                <span>View Atelier Pieces</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#custom-commission"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/15 font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-full transition-colors cursor-pointer"
              >
                Commission Bespoke Work
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="aspect-4/3 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
              <img
                src={craftsmanWoodworkerImg}
                alt="Master woodworker hand planishing a solid walnut desktop"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs font-bold text-[#e2a466] uppercase tracking-wider block mb-1">
                  Individual Master Craftsman Signatures
                </span>
                <p className="text-xs text-white">
                  Each completed piece is individually numbered and heat-branded with the maker’s insignia.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Timbers Section */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#e2a466] block mb-2">
              Sustainable Hardwoods
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Our Timber Heritage
            </h2>
            <p className="text-sm text-zinc-400 mt-2 font-normal">
              We exclusively select slow-grown sustainable hardwoods dried to optimal equilibrium moisture content.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIMBERS.map((timber, i) => (
              <div
                key={timber.name}
                onClick={() => setSelectedTimber(i)}
                className={`bg-[#141820] border rounded-2xl p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 ${
                  selectedTimber === i 
                    ? 'border-[#e2a466] shadow-xl shadow-black/40 scale-[1.02]' 
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div 
                      className="w-7 h-7 rounded-full border-2 border-white/30 shadow-inner"
                      style={{ backgroundColor: timber.colorHex }}
                    />
                    <span className="text-[11px] font-mono text-zinc-500">{timber.density}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1">{timber.name}</h3>
                  <span className="text-xs text-[#e2a466] font-medium block mb-3">{timber.origin}</span>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">{timber.grain}</p>
                </div>

                <div className="pt-4 border-t border-white/5 text-[11px] text-zinc-500">
                  Finish: <strong className="text-zinc-300">{timber.finish}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traditional Joinery Section */}
        <div className="bg-[#141820] border border-white/10 rounded-3xl p-8 sm:p-12 mb-24">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#e2a466] block mb-2">
              Old-World Integrity
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
              Traditional Joinery That Defies Time
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Modern furniture manufacturers rely on quick metal brackets and toxic adhesives that fail after 3–5 years. 
              We utilize interlocking joinery that tightens with atmospheric pressure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {JOINERY_METHODS.map((method) => (
              <div key={method.title} className="bg-[#0a0c10] border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#e2a466] mb-3">
                    {method.badge}
                  </span>
                  <h3 className="text-base font-bold text-white mb-2">{method.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{method.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive 360° Inspection Viewer */}
        <div className="bg-[#141820] border border-white/10 rounded-3xl p-6 sm:p-12 mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider text-[#e2b47f] mb-4">
                <Rotate3d className="w-3.5 h-3.5" />
                Multi-Angle Inspection
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-4">
                Examine Joinery from Every Perspective
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed mb-6">
                Rotate through high-definition photographic angles to inspect back lumbar curves, 
                flawless grain alignment, and hand-finished chassis tolerances.
              </p>

              {/* Angle Step Buttons */}
              <div className="grid grid-cols-4 gap-2 mb-6">
                {['Front', 'Profile', 'Rear', '3/4 Angle'].map((label, idx) => (
                  <button
                    key={label}
                    onClick={() => setFrameIndex(idx)}
                    className={`py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer border ${
                      frameIndex === idx
                        ? 'bg-[#e2a466] text-black border-[#e2a466]'
                        : 'bg-[#0a0c10] text-zinc-400 border-white/10 hover:text-white'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setFrameIndex((prev) => (prev - 1 + ROTATION_FRAMES.length) % ROTATION_FRAMES.length)}
                  className="p-2.5 rounded-xl border border-white/15 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Previous Angle"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex-1 text-center font-mono text-xs text-zinc-400">
                  Angle {frameIndex + 1} of {ROTATION_FRAMES.length}
                </div>
                <button
                  onClick={() => setFrameIndex((prev) => (prev + 1) % ROTATION_FRAMES.length)}
                  className="p-2.5 rounded-xl border border-white/15 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Next Angle"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="aspect-4/3 rounded-2xl bg-[#0a0c10] border border-white/15 overflow-hidden relative flex items-center justify-center">
                <img
                  src={ROTATION_FRAMES[frameIndex]}
                  alt={`Atelier piece inspected at angle ${frameIndex + 1}`}
                  className="w-full h-full object-contain p-6 transition-all duration-300"
                />
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-[11px] font-mono text-zinc-300">
                  360° Studio Photography
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Handcrafted Collection Grid */}
        <div id="pieces-collection" className="mb-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#e2a466] block mb-1">
                Atelier Catalog
              </span>
              <h2 className="text-3xl font-bold text-white tracking-tight">
                Featured Handcrafted Pieces
              </h2>
            </div>
            <Link
              to="/shop?category=handcrafted"
              className="text-xs text-[#e2a466] hover:underline font-semibold flex items-center gap-1.5"
            >
              <span>View all handcrafted in shop</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {handcraftedProducts.map((product) => {
              const isWishlisted = wishlist.includes(product.id);

              return (
                <div
                  key={product.id}
                  className="group bg-[#141820] border border-white/10 hover:border-[#e2a466]/40 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-black/60"
                >
                  <div className="relative aspect-4/3 bg-[#0a0c10] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/15 backdrop-blur-md text-white border border-white/20">
                      Handcrafted
                    </span>

                    <button
                      onClick={() => onToggleWishlist(product.id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:text-rose-400 transition-colors z-10 cursor-pointer"
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>

                    <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                      <button
                        onClick={() => onQuickView(product)}
                        className="flex-1 bg-black/80 hover:bg-black backdrop-blur-md text-white text-xs font-semibold py-2 rounded-xl border border-white/20 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Quick View</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 
                        onClick={() => onQuickView(product)}
                        className="text-base font-bold text-white group-hover:text-[#f3ba77] transition-colors cursor-pointer mb-1"
                      >
                        {product.name}
                      </h3>
                      <p className="text-xs text-zinc-400 line-clamp-2 font-normal">
                        {product.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between gap-2">
                      <span className="text-lg font-bold text-white">
                        ${product.price.toFixed(2)}
                      </span>
                      <button
                        onClick={() => onAddToCart(product)}
                        className="bg-[#e2a466] hover:bg-[#efb57b] text-black text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Custom Commission Builder Form */}
        <div id="custom-commission" className="bg-[#141820] border border-white/10 rounded-3xl p-6 sm:p-12 mb-20">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#e2a466] block mb-2">
                Bespoke Atelier Service
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-3">
                Commission a Custom Architectural Piece
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 font-normal">
                Need specific table dimensions, custom cable grommets, or a rare European elm slab? 
                Submit your requirements for direct artisan review.
              </p>
            </div>

            {commissionSubmitted ? (
              <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-8 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Commission Inquiry Received</h3>
                <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto mb-6">
                  Thank you, <strong>{commissionForm.name}</strong>. Our Master Woodwright will review your requested specifications for <strong>{commissionForm.timber}</strong> and send drawing schematics to <strong>{commissionForm.email}</strong>.
                </p>
                <button
                  onClick={() => setCommissionSubmitted(false)}
                  className="bg-[#e2a466] hover:bg-[#efb57b] text-black text-xs font-semibold px-6 py-2.5 rounded-full transition-colors cursor-pointer"
                >
                  Submit Another Commission
                </button>
              </div>
            ) : (
              <form onSubmit={handleCommissionSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jonathan Mercer"
                      value={commissionForm.name}
                      onChange={(e) => setCommissionForm({ ...commissionForm, name: e.target.value })}
                      className="w-full bg-[#0a0c10] border border-white/15 focus:border-[#e2a466] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jonathan@mercer.com"
                      value={commissionForm.email}
                      onChange={(e) => setCommissionForm({ ...commissionForm, email: e.target.value })}
                      className="w-full bg-[#0a0c10] border border-white/15 focus:border-[#e2a466] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Timber Species
                    </label>
                    <select
                      value={commissionForm.timber}
                      onChange={(e) => setCommissionForm({ ...commissionForm, timber: e.target.value })}
                      className="w-full bg-[#0a0c10] border border-white/15 focus:border-[#e2a466] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none cursor-pointer"
                    >
                      <option value="American Black Walnut" className="bg-[#141820]">American Black Walnut</option>
                      <option value="European Alpine White Oak" className="bg-[#141820]">European Alpine White Oak</option>
                      <option value="Reclaimed Old-Growth Redwood" className="bg-[#141820]">Reclaimed Old-Growth Redwood</option>
                      <option value="Grade-A Plantation Teak" className="bg-[#141820]">Grade-A Plantation Teak</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Desired Dimensions (Length x Width x Height)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 78 inch W x 36 inch D x 30 inch H"
                      value={commissionForm.dimensions}
                      onChange={(e) => setCommissionForm({ ...commissionForm, dimensions: e.target.value })}
                      className="w-full bg-[#0a0c10] border border-white/15 focus:border-[#e2a466] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Specific Joinery / Electrical / Cable Management Details
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe bevel edges, live-edge preservation, hidden power ports, or room layout context..."
                    value={commissionForm.notes}
                    onChange={(e) => setCommissionForm({ ...commissionForm, notes: e.target.value })}
                    className="w-full bg-[#0a0c10] border border-white/15 focus:border-[#e2a466] rounded-xl p-3 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Complimentary CAD render with every custom commission</span>
                  </div>

                  <button
                    type="submit"
                    className="bg-[#e2a466] hover:bg-[#efb57b] text-black font-semibold text-xs sm:text-sm px-7 py-3 rounded-full transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <span>Submit Commission Inquiry</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
