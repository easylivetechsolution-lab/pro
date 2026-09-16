import React, { useState, useRef, useEffect } from 'react';
import { 
  RotateCw, 
  ZoomIn, 
  Palette, 
  Layers, 
  Maximize2, 
  Minimize2,
  Star, 
  ArrowRight, 
  TreePine,
  Leaf,
  Hammer,
  Compass,
  Check,
  Plus,
  Crosshair,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import type { Product } from '../types';
import { HANDCRAFTED_FEATURE_ITEM } from '../data';

// High-fidelity custom imagery matching the reference
import craftsmanImg from '../assets/images/craftsman_woodworker_1789334457347.jpg';
import redwoodChairImg from '../assets/images/redwood_lounge_chair_1789334472223.jpg';
import woodenBookshelfImg from '../assets/images/wooden_bookshelf_room_1789334485985.jpg';
import woodDeskChairImg from '../assets/images/wood_desk_chair_1789334500077.jpg';
import teakCredenzaImg from '../assets/images/teak_credenza_1789334512576.jpg';
import loungeChairImg from '../assets/images/lounge_chair_shot_1789337923984.jpg';

// Standard 360 Ergonomic Chair Assets (Guaranteed reliable local loading)
import ergoChairFrontImg from '../assets/images/ergo_chair_front_1789335622198.jpg';
import ergoChairSideImg from '../assets/images/ergo_chair_side_1789335636307.jpg';
import ergoChairBackImg from '../assets/images/ergo_chair_back_1789335649130.jpg';
import ergoChairThreeQtrImg from '../assets/images/ergo_chair_three_qtr_1789335668046.jpg';

interface HandcraftedAnd360SectionProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, color?: string) => void;
  onExploreHandcrafted: () => void;
}

const CHAIR_COLORS = [
  { id: 'onyx', name: 'Onyx Black', hex: '#111215', accent: '#3b4252', bgGlow: 'rgba(255,255,255,0.06)' },
  { id: 'slate', name: 'Slate Gray', hex: '#4a5568', accent: '#718096', bgGlow: 'rgba(113,128,150,0.12)' },
  { id: 'cognac', name: 'Cognac Amber', hex: '#b36224', accent: '#d97706', bgGlow: 'rgba(217,119,6,0.15)' },
  { id: 'arctic', name: 'Arctic White', hex: '#e2e8f0', accent: '#ffffff', bgGlow: 'rgba(255,255,255,0.18)' },
];

const CHAIR_MATERIALS = [
  { id: 'mesh', name: 'AeroWave™ 4D Mesh', desc: 'Breathable dual-zone elastomeric weave' },
  { id: 'leather', name: 'Italian Full-Grain Leather', desc: 'Hand-buffed Tuscan aniline hide' },
  { id: 'recycled', name: 'OceanBound EcoPoly', desc: '100% post-consumer recycled technical textile' },
];

// 12 angles for smooth 360-degree rotation of the standard ergonomic office chair
const ROTATION_ANGLES = [
  { angle: 0, label: 'Three-Quarter Front 0°', img: ergoChairThreeQtrImg, flip: false },
  { angle: 30, label: 'Front Facing 30°', img: ergoChairFrontImg, flip: false },
  { angle: 60, label: 'Three-Quarter Left 60°', img: ergoChairThreeQtrImg, flip: true },
  { angle: 90, label: 'Profile Left 90°', img: ergoChairSideImg, flip: true },
  { angle: 120, label: 'Rear-Left 120°', img: ergoChairBackImg, flip: true },
  { angle: 150, label: 'Rear Angle Left 150°', img: ergoChairBackImg, flip: true },
  { angle: 180, label: 'Spine & Back View 180°', img: ergoChairBackImg, flip: false },
  { angle: 210, label: 'Rear Angle Right 210°', img: ergoChairBackImg, flip: false },
  { angle: 240, label: 'Profile Right 240°', img: ergoChairSideImg, flip: false },
  { angle: 270, label: 'Side Profile 270°', img: ergoChairSideImg, flip: false },
  { angle: 300, label: 'Three-Quarter Right 300°', img: ergoChairThreeQtrImg, flip: false },
  { angle: 330, label: 'Front Angle 330°', img: ergoChairFrontImg, flip: false },
];

// Carousel items for the handcrafted card
const HANDCRAFTED_CAROUSEL_ITEMS: Product[] = [
  {
    ...HANDCRAFTED_FEATURE_ITEM,
    id: 'redwood-lounge-chair',
    name: 'Redwood Lounge Chair',
    price: 1299,
    reviewCount: 24,
    rating: 5,
    image: redwoodChairImg,
    description: 'Masterfully shaped from aged solid walnut and premium saddle leather. Features ergonomically angled joinery and hand-stitched piping.',
  },
  {
    id: 'kyoto-solid-oak-desk',
    name: 'Kyoto Solid Oak Desk',
    price: 1420,
    category: 'desks',
    rating: 5,
    reviewCount: 19,
    image: woodDeskChairImg,
    description: 'Handcrafted Japanese oak study desk featuring traditional mortise and tenon joints with concealed cable management.',
    features: ['Solid White Oak', 'Hand-rubbed oil finish', 'Concealed Cable Channel'],
  },
  {
    id: 'artisan-teak-credenza',
    name: 'Artisan Teak Credenza',
    price: 1850,
    category: 'storage',
    rating: 5,
    reviewCount: 31,
    image: teakCredenzaImg,
    description: 'Architectural lowboard sideboard in sustainably harvested teak wood with sliding fluted tambour doors.',
    features: ['Sustainably Harvested Teak', 'Fluted Tambour Doors', 'Soft-close hinges'],
  },
  {
    id: 'artisan-oak-bookshelf',
    name: 'Artisan Solid Oak Bookshelf',
    price: 1150,
    category: 'handcrafted',
    rating: 5,
    reviewCount: 29,
    image: woodenBookshelfImg,
    description: 'Free-standing open architectural shelving unit handcrafted from solid European white oak with asymmetric compartments.',
    features: ['Solid European White Oak', 'Asymmetric Staggered Shelves', 'Organic Beeswax Finish'],
  },
  {
    id: 'sculpted-wooden-lounge',
    name: 'Wooden Lounge Chair',
    price: 1249,
    category: 'handcrafted',
    rating: 5,
    reviewCount: 52,
    image: loungeChairImg,
    description: 'Steam-bent solid cherry wood frame paired with full-grain Italian saddle leather and traditional mortise-and-tenon joinery.',
    features: ['Solid Steam-bent Cherry', 'Full-Grain Saddle Leather', 'Hand-Numbered by Artisan'],
  },
];

export const HandcraftedAnd360Section: React.FC<HandcraftedAnd360SectionProps> = ({
  onSelectProduct,
  onAddToCart,
  onExploreHandcrafted,
}) => {
  // 360 Viewer State
  const [angleIndex, setAngleIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isAutoSpinning, setIsAutoSpinning] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeColor, setActiveColor] = useState(CHAIR_COLORS[0]);
  const [activeMaterial, setActiveMaterial] = useState(CHAIR_MATERIALS[0]);
  const [activeControlTab, setActiveControlTab] = useState<'rotate' | 'zoom' | 'colors' | 'materials'>('rotate');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Handcrafted Carousel State & Auto-play
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isCardHovered, setIsCardHovered] = useState(false);

  // Auto-advance handcrafted product card every 3.5 seconds
  useEffect(() => {
    if (isCardHovered) return;
    const interval = setInterval(() => {
      setActiveCardIndex((prev) => (prev + 1) % HANDCRAFTED_CAROUSEL_ITEMS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isCardHovered]);

  const viewerRef = useRef<HTMLDivElement>(null);

  // Auto-spin timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoSpinning && !isDragging) {
      interval = setInterval(() => {
        setAngleIndex((prev) => (prev + 1) % ROTATION_ANGLES.length);
      }, 700);
    }
    return () => clearInterval(interval);
  }, [isAutoSpinning, isDragging]);

  // Drag handlers for 360 viewer
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setIsAutoSpinning(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    if (Math.abs(deltaX) > 22) {
      if (deltaX > 0) {
        setAngleIndex((prev) => (prev + 1) % ROTATION_ANGLES.length);
      } else {
        setAngleIndex((prev) => (prev - 1 + ROTATION_ANGLES.length) % ROTATION_ANGLES.length);
      }
      setStartX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setIsAutoSpinning(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - startX;
    if (Math.abs(deltaX) > 18) {
      if (deltaX > 0) {
        setAngleIndex((prev) => (prev + 1) % ROTATION_ANGLES.length);
      } else {
        setAngleIndex((prev) => (prev - 1 + ROTATION_ANGLES.length) % ROTATION_ANGLES.length);
      }
      setStartX(e.touches[0].clientX);
    }
  };

  const handlePrevCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveCardIndex((prev) => (prev - 1 + HANDCRAFTED_CAROUSEL_ITEMS.length) % HANDCRAFTED_CAROUSEL_ITEMS.length);
  };

  const handleNextCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveCardIndex((prev) => (prev + 1) % HANDCRAFTED_CAROUSEL_ITEMS.length);
  };

  const currentAngle = ROTATION_ANGLES[angleIndex];
  const activeProduct = HANDCRAFTED_CAROUSEL_ITEMS[activeCardIndex];

  return (
    <section id="handcrafted" className="py-12 sm:py-16 bg-[#faf8f5] relative text-[#161c24] border-b border-stone-200/70">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Left Handcrafted (Wide, ~65% width) + Right 360° View (~35% width) */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 lg:gap-6 items-stretch">

          {/* ========================================================
              LEFT CONTAINER: "Our Handcrafted Furniture" 
              (Craftsman backdrop on left, Product Card & Stacked Images on right)
             ======================================================== */}
          <div className="xl:col-span-8 rounded-3xl overflow-hidden border border-stone-200/90 shadow-xl flex flex-col lg:flex-row relative bg-stone-900">
            
            {/* 1. CRAFTSMAN WORKSHOP HERO SUB-PANEL (Left half of Handcrafted) */}
            <div className="lg:w-[54%] p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden shrink-0 min-h-[460px]">
              
              {/* Clear, Vivid Craftsman Woodworker working on furniture */}
              <img
                src={craftsmanImg}
                alt="Skilled craftsman woodworker shaping furniture on workbench"
                className="absolute inset-0 w-full h-full object-cover object-[72%_center] pointer-events-none scale-105"
              />

              {/* Precise gradient overlay: dark on left for text readability, clear & transparent on right so the craftsman and his hands working on the timber are fully visible */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/55 to-black/10 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />

              {/* Top Content: Title & Narrative */}
              <div className="relative z-10">
                {/* Title in Serif Display */}
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-normal text-white tracking-tight leading-[1.15] drop-shadow-md">
                  Our Handcrafted<br />Furniture
                </h2>

                {/* Subtitle in Warm Golden Italic Script */}
                <p className="font-serif italic text-xl sm:text-2xl text-[#f3ba77] mt-1 font-normal tracking-wide drop-shadow-sm">
                  Made by Skilled Hands
                </p>

                {/* Description */}
                <p className="text-xs sm:text-[13px] text-zinc-200 mt-3 leading-relaxed max-w-sm font-normal drop-shadow-sm">
                  We create timeless, high-quality furniture using traditional craftsmanship and sustainable materials. Every piece is unique, designed to last generations.
                </p>

                {/* Call to Action Button */}
                <button
                  onClick={onExploreHandcrafted}
                  className="inline-flex items-center gap-2 bg-[#ebd6bc] hover:bg-[#e2c4a0] text-[#1a1410] font-semibold text-xs sm:text-[13px] px-5 py-2.5 rounded-full transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer mt-5"
                >
                  <span>Explore Handcrafted Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Bottom Row: 4 Feature Badges matching mockup */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-8 pt-6 border-t border-white/20 relative z-10">
                
                {/* 1. Solid Wood */}
                <div className="flex flex-col items-center text-center p-2.5 rounded-xl bg-black/55 backdrop-blur-md border border-white/10 shadow-sm">
                  <TreePine className="w-5 h-5 text-[#f3ba77] mb-1.5" />
                  <span className="text-[11px] font-semibold text-zinc-100 leading-tight">Solid Wood</span>
                </div>

                {/* 2. Sustainable Materials */}
                <div className="flex flex-col items-center text-center p-2.5 rounded-xl bg-black/55 backdrop-blur-md border border-white/10 shadow-sm">
                  <Leaf className="w-5 h-5 text-[#f3ba77] mb-1.5" />
                  <span className="text-[11px] font-semibold text-zinc-100 leading-tight">Sustainable Materials</span>
                </div>

                {/* 3. Artisan Craftsmanship */}
                <div className="flex flex-col items-center text-center p-2.5 rounded-xl bg-black/55 backdrop-blur-md border border-white/10 shadow-sm">
                  <Hammer className="w-5 h-5 text-[#f3ba77] mb-1.5" />
                  <span className="text-[11px] font-semibold text-zinc-100 leading-tight">Artisan Craftsmanship</span>
                </div>

                {/* 4. Custom Designs */}
                <div className="flex flex-col items-center text-center p-2.5 rounded-xl bg-black/55 backdrop-blur-md border border-white/10 shadow-sm">
                  <Compass className="w-5 h-5 text-[#f3ba77] mb-1.5" />
                  <span className="text-[11px] font-semibold text-zinc-100 leading-tight">Custom Designs</span>
                </div>

              </div>

            </div>

            {/* 2. GALLERY SUB-PANEL (Right half of Handcrafted: White Auto-Sliding Card + 2 Stacked Images) */}
            <div className="flex-1 bg-[#f7f3ee] p-5 sm:p-7 flex flex-col sm:flex-row items-stretch justify-center gap-4 relative overflow-hidden">
              
              {/* Main White Auto-Sliding Product Card */}
              <div 
                onMouseEnter={() => setIsCardHovered(true)}
                onMouseLeave={() => setIsCardHovered(false)}
                className="w-full sm:w-[260px] bg-white rounded-2xl p-3.5 shadow-xl border border-stone-200/80 flex flex-col justify-between shrink-0 group relative"
              >
                
                {/* Product Image with Top-Right Action Pill and Auto-Slide Fade Effect */}
                <div 
                  onClick={() => onSelectProduct(activeProduct)}
                  className="w-full h-44 sm:h-48 bg-stone-50 rounded-xl overflow-hidden relative cursor-pointer flex items-center justify-center"
                >
                  <img
                    key={activeProduct.id}
                    src={activeProduct.image}
                    alt={activeProduct.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out"
                  />

                  {/* Previous / Next slide hover buttons */}
                  <button
                    onClick={handlePrevCard}
                    title="Previous Handcrafted Piece"
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer backdrop-blur-xs"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleNextCard}
                    title="Next Handcrafted Piece"
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer backdrop-blur-xs"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  {/* Dark Plus / Details button in top-right */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProduct(activeProduct);
                    }}
                    title="View Product Details"
                    className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-[#12161f]/85 hover:bg-[#12161f] text-white flex items-center justify-center transition-transform hover:scale-105 shadow-sm cursor-pointer z-10"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Product Metadata */}
                <div className="pt-3 pb-1">
                  <h4 
                    onClick={() => onSelectProduct(activeProduct)}
                    className="text-sm font-semibold text-stone-900 group-hover:text-[#c47f30] transition-colors cursor-pointer leading-tight line-clamp-1"
                  >
                    {activeProduct.name}
                  </h4>
                  
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-sm font-bold text-stone-900">
                      ${activeProduct.price.toLocaleString()}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-stone-500">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                      <span>({activeProduct.reviewCount})</span>
                    </div>
                  </div>
                </div>

                {/* Interactive Carousel Pagination Indicators at Bottom with auto-slide progress */}
                <div className="flex items-center justify-center gap-2 pt-2 border-t border-stone-100">
                  {HANDCRAFTED_CAROUSEL_ITEMS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveCardIndex(idx)}
                      title={`View piece ${idx + 1}`}
                      className={`h-1 transition-all duration-300 cursor-pointer rounded-xs ${
                        activeCardIndex === idx 
                          ? 'w-7 bg-stone-900' 
                          : 'w-4 bg-stone-300 hover:bg-stone-400'
                      }`}
                    />
                  ))}
                </div>

              </div>

              {/* Stacked Showcase Images beside the white card (matching the reference photo) */}
              <div className="flex-1 flex flex-col gap-3 justify-between min-h-[220px]">
                
                {/* Top Image: Modern Wooden Bookshelf with Plants & Room Floor */}
                <div className="flex-1 rounded-xl overflow-hidden relative group border border-stone-200/60 shadow-xs min-h-[110px]">
                  <img
                    src={woodenBookshelfImg}
                    alt="Handcrafted Shelving with Indoor Plants in sunlit room"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                </div>

                {/* Bottom Image: Handcrafted Desk & Chair */}
                <div className="flex-1 rounded-xl overflow-hidden relative group border border-stone-200/60 shadow-xs min-h-[110px]">
                  <img
                    src={woodDeskChairImg}
                    alt="Solid Wood Desk and Chair"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                </div>

              </div>

            </div>

          </div>


          {/* ========================================================
              RIGHT CONTAINER: "360° View"
              Matching the reference standard image with dark studio backdrop,
              elliptical orbit floor ring, ergonomic chair, and floating side toolbar.
             ======================================================== */}
          <div className="xl:col-span-4 bg-[#080c14] border border-stone-800/80 rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative shadow-xl overflow-hidden select-none min-h-[460px]">
            
            {/* Subtle radial spotlight glow in background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_55%,rgba(32,48,72,0.4)_0%,rgba(8,12,20,0.95)_75%)] pointer-events-none" />

            {/* Header: "360° View" + Corner Fullscreen Expand matching reference */}
            <div className="flex items-start justify-between z-10 relative">
              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight leading-none font-sans">
                  360° View
                </h3>
                <p className="text-xs text-zinc-400 mt-2 font-normal">
                  Drag to rotate and explore in 3D
                </p>
              </div>

              {/* Four-corner expand icon matching reference */}
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="text-zinc-300 hover:text-white transition-colors cursor-pointer p-1 rounded-lg hover:bg-white/5"
                title="Expand Fullscreen View"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 8V4h4" />
                  <path d="M20 8V4h-4" />
                  <path d="M4 16v4h4" />
                  <path d="M20 16v4h-4" />
                </svg>
              </button>
            </div>

            {/* Interactive 360 Stage */}
            <div
              ref={viewerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleMouseUp}
              className="relative flex-1 min-h-[310px] flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden select-none my-1"
            >
              {/* Elliptical Perspective Orbit Floor Ring from reference image */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[300px] sm:w-[330px] h-[90px] pointer-events-none overflow-visible flex items-center justify-center">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 320 90">
                  <defs>
                    <radialGradient id="orbitFloorShadow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#1e293b" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#080c14" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Floor ambient radial shadow under casters */}
                  <ellipse cx="160" cy="45" rx="140" ry="30" fill="url(#orbitFloorShadow)" />

                  {/* Thin gold/amber orbit ellipse */}
                  <ellipse cx="160" cy="45" rx="135" ry="28" fill="none" stroke="#b3874b" strokeWidth="1" strokeOpacity="0.45" />

                  {/* Active bright arc segment */}
                  <ellipse
                    cx="160"
                    cy="45"
                    rx="135"
                    ry="28"
                    fill="none"
                    stroke="#f3ba77"
                    strokeWidth="2"
                    strokeDasharray="45 380"
                    strokeDashoffset={`${(currentAngle.angle * 1.15) % 425}`}
                    strokeOpacity="0.9"
                    strokeLinecap="round"
                  />

                  {/* Fixed circular orbit node ticks matching reference */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
                    const rad = (deg * Math.PI) / 180;
                    const x = 160 + 135 * Math.cos(rad);
                    const y = 45 + 28 * Math.sin(rad);
                    return (
                      <circle key={deg} cx={x} cy={y} r="2" fill="#c79553" opacity="0.65" />
                    );
                  })}

                  {/* Dynamic angle indicator knob */}
                  {(() => {
                    const rad = ((currentAngle.angle - 90) * Math.PI) / 180;
                    const x = 160 + 135 * Math.cos(rad);
                    const y = 45 + 28 * Math.sin(rad);
                    return (
                      <g>
                        <circle cx={x} cy={y} r="3.5" fill="#f3ba77" />
                        <circle cx={x} cy={y} r="6" fill="none" stroke="#f3ba77" strokeWidth="1" opacity="0.5" />
                      </g>
                    );
                  })()}
                </svg>
              </div>

              {/* Standard Ergonomic Task Chair Image with 360 Rotation */}
              <div 
                className="relative z-10 transition-transform duration-200 ease-out pointer-events-none flex items-center justify-center -translate-y-2"
                style={{
                  transform: `scale(${zoomLevel}) ${currentAngle.flip ? 'scaleX(-1)' : 'scaleX(1)'}`,
                  filter: activeColor.id === 'cognac' ? 'sepia(0.35) saturate(1.3)' : activeColor.id === 'slate' ? 'saturate(0.3) brightness(1.1)' : activeColor.id === 'arctic' ? 'brightness(1.25) contrast(1.05)' : 'none'
                }}
              >
                <img
                  key={currentAngle.angle}
                  src={currentAngle.img}
                  alt={`Ergonomic task chair 360 view angle ${currentAngle.angle}`}
                  className="max-h-[250px] sm:max-h-[285px] w-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] select-none pointer-events-none"
                  draggable={false}
                />
              </div>

              {/* Floating Vertical Toolbar on the Right side matching screenshot */}
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-[#0c111c]/90 backdrop-blur-md border border-white/10 rounded-2xl py-3 px-3 flex flex-col gap-3.5 z-20 shadow-2xl min-w-[124px]">
                
                {/* 1. Rotate button */}
                <button
                  onClick={() => {
                    setActiveControlTab('rotate');
                    setIsAutoSpinning(!isAutoSpinning);
                  }}
                  className={`flex items-center gap-2.5 transition-all text-left cursor-pointer group px-1 py-1 rounded-xl ${
                    activeControlTab === 'rotate' || isAutoSpinning
                      ? 'text-[#f3ba77]'
                      : 'text-zinc-300 hover:text-white'
                  }`}
                  title="Toggle 360 Rotation"
                >
                  <div className="w-7 h-7 flex items-center justify-center shrink-0">
                    <svg className={`w-6 h-6 transition-transform ${isAutoSpinning ? 'animate-spin' : ''}`} viewBox="0 0 24 24" fill="none">
                      {/* Circular ring */}
                      <circle cx="12" cy="12" r="6.6" stroke="currentColor" strokeWidth="1.6" fill="none" />
                      {/* 4 Pointer triangles at 12, 3, 6, 9 o'clock matching standard */}
                      <polygon points="12,1.5 9.5,5.5 14.5,5.5" fill="currentColor" />
                      <polygon points="12,22.5 9.5,18.5 14.5,18.5" fill="currentColor" />
                      <polygon points="1.5,12 5.5,9.5 5.5,14.5" fill="currentColor" />
                      <polygon points="22.5,12 18.5,9.5 18.5,14.5" fill="currentColor" />
                    </svg>
                  </div>
                  <span className={`text-[13px] tracking-tight ${
                    activeControlTab === 'rotate' || isAutoSpinning ? 'font-medium text-[#f3ba77]' : 'font-normal text-zinc-300 group-hover:text-white'
                  }`}>
                    Rotate
                  </span>
                </button>

                {/* 2. Zoom button */}
                <button
                  onClick={() => {
                    setActiveControlTab('zoom');
                    setZoomLevel((prev) => (prev === 1 ? 1.25 : prev === 1.25 ? 1.45 : 1));
                  }}
                  className={`flex items-center gap-2.5 transition-all text-left cursor-pointer group px-1 py-1 rounded-xl ${
                    activeControlTab === 'zoom'
                      ? 'text-[#f3ba77]'
                      : 'text-zinc-200 hover:text-white'
                  }`}
                  title="Zoom In/Out"
                >
                  <div className="w-7 h-7 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                      {/* Magnifying lens */}
                      <circle cx="10" cy="10" r="6.8" stroke="currentColor" strokeWidth="1.8" />
                      {/* Lens handle */}
                      <line x1="15" y1="15" x2="21.5" y2="21.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                      {/* Inner reticle circle */}
                      <circle cx="10" cy="10" r="3.2" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </div>
                  <span className={`text-[13px] tracking-tight ${
                    activeControlTab === 'zoom' ? 'font-medium text-[#f3ba77]' : 'font-normal text-zinc-200 group-hover:text-white'
                  }`}>
                    Zoom
                  </span>
                </button>

                {/* 3. Colors button */}
                <button
                  onClick={() => setActiveControlTab(activeControlTab === 'colors' ? 'rotate' : 'colors')}
                  className={`flex items-center gap-2.5 transition-all text-left cursor-pointer group px-1 py-1 rounded-xl ${
                    activeControlTab === 'colors'
                      ? 'text-[#f3ba77]'
                      : 'text-zinc-200 hover:text-white'
                  }`}
                  title="Configure Finish Colors"
                >
                  <div className="w-7 h-7 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                      {/* Outer circle */}
                      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
                      {/* Dividing quadrant cross */}
                      <line x1="12" y1="3.5" x2="12" y2="20.5" stroke="currentColor" strokeWidth="1.4" />
                      <line x1="3.5" y1="12" x2="20.5" y2="12" stroke="currentColor" strokeWidth="1.4" />
                      {/* Top-Left: Solid filled white quadrant */}
                      <path d="M12 3.5 A8.5 8.5 0 0 0 3.5 12 L12 12 Z" fill="currentColor" />
                      {/* Bottom-Left: Arc segment */}
                      <path d="M12 16.5 A4.5 4.5 0 0 1 7.5 12" stroke="currentColor" strokeWidth="1.4" />
                      {/* Bottom-Right: Diagonal hatched lines */}
                      <line x1="13" y1="18.5" x2="18.5" y2="13" stroke="currentColor" strokeWidth="1.4" />
                      <line x1="14.8" y1="19.8" x2="19.8" y2="14.8" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </div>
                  <span className={`text-[13px] tracking-tight ${
                    activeControlTab === 'colors' ? 'font-medium text-[#f3ba77]' : 'font-normal text-zinc-200 group-hover:text-white'
                  }`}>
                    Colors
                  </span>
                </button>

                {/* 4. Materials button */}
                <button
                  onClick={() => setActiveControlTab(activeControlTab === 'materials' ? 'rotate' : 'materials')}
                  className={`flex items-center gap-2.5 transition-all text-left cursor-pointer group px-1 py-1 rounded-xl ${
                    activeControlTab === 'materials'
                      ? 'text-[#f3ba77]'
                      : 'text-zinc-200 hover:text-white'
                  }`}
                  title="Explore Technical Materials"
                >
                  <div className="w-7 h-7 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                      {/* Rounded diamond container (square rotated 45 deg) */}
                      <rect x="4.8" y="4.8" width="14.4" height="14.4" rx="3.5" transform="rotate(45 12 12)" stroke="currentColor" strokeWidth="1.8" />
                      {/* Botanical leaf/sprig branch inside matching reference */}
                      <path d="M7.5 16.5 C10 14.5 12 12 16.5 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      <path d="M10.5 13.5 C8.5 13 7.5 10.5 9.5 10 C10.5 11 11 12.5 10.5 13.5 Z" fill="currentColor" />
                      <path d="M13.5 10.5 C14 8.5 16.5 7.5 17 9.5 C16 10.5 14.5 11 13.5 10.5 Z" fill="currentColor" />
                      <path d="M11.5 14.8 C13 15.6 15 15 15 13.6 C14 13.6 12.5 14 11.5 14.8 Z" fill="currentColor" />
                      <path d="M16.5 7.5 C16.5 6 15 5.5 14.5 6.5 C15 7.5 16 7.5 16.5 7.5 Z" fill="currentColor" />
                    </svg>
                  </div>
                  <span className={`text-[13px] tracking-tight ${
                    activeControlTab === 'materials' ? 'font-medium text-[#f3ba77]' : 'font-normal text-zinc-200 group-hover:text-white'
                  }`}>
                    Materials
                  </span>
                </button>

              </div>
            </div>

            {/* Bottom Configurator Sub-panel (Only appears when Colors or Materials selected) */}
            {activeControlTab === 'colors' && (
              <div className="pt-3 border-t border-white/10 flex items-center justify-between z-10 relative">
                <span className="text-xs text-zinc-400">Finish: <strong className="text-white">{activeColor.name}</strong></span>
                <div className="flex items-center gap-2">
                  {CHAIR_COLORS.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setActiveColor(c)}
                      className={`w-5 h-5 rounded-full border transition-all flex items-center justify-center cursor-pointer ${
                        activeColor.id === c.id ? 'ring-2 ring-[#f3ba77] scale-110 border-white' : 'border-white/20'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {activeColor.id === c.id && <Check className="w-2.5 h-2.5 text-white" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeControlTab === 'materials' && (
              <div className="pt-3 border-t border-white/10 z-10 relative">
                <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
                  {CHAIR_MATERIALS.map((mat) => (
                    <button
                      key={mat.id}
                      onClick={() => setActiveMaterial(mat)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all whitespace-nowrap cursor-pointer ${
                        activeMaterial.id === mat.id
                          ? 'bg-[#f3ba77] text-black font-semibold'
                          : 'bg-white/10 text-zinc-300 hover:bg-white/15'
                      }`}
                    >
                      {mat.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Fullscreen 360 Viewer Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col p-6 sm:p-10 animate-in fade-in duration-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Aeroflex 360° Studio Viewer</h2>
              <p className="text-xs text-zinc-400">Drag to inspect all 12 precision angles</p>
            </div>
            <button
              onClick={() => setIsFullscreen(false)}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
            >
              <Minimize2 className="w-5 h-5" />
            </button>
          </div>

          <div
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
            className="flex-1 flex items-center justify-center cursor-grab active:cursor-grabbing relative"
          >
            <img
              src={currentAngle.img}
              alt="Chair 360 Fullscreen"
              className="max-h-[65vh] object-contain drop-shadow-2xl pointer-events-none"
              style={{
                transform: `scale(${zoomLevel * 1.2}) ${currentAngle.flip ? 'scaleX(-1)' : 'scaleX(1)'}`,
                filter: activeColor.id === 'cognac' ? 'sepia(0.35) saturate(1.3)' : activeColor.id === 'slate' ? 'saturate(0.3) brightness(1.1)' : activeColor.id === 'arctic' ? 'brightness(1.25) contrast(1.05)' : 'none'
              }}
            />
          </div>

          <div className="flex items-center justify-center gap-4 pt-4 border-t border-white/10">
            <span className="text-xs text-zinc-400 font-mono">{currentAngle.angle}° - {currentAngle.label}</span>
          </div>
        </div>
      )}

    </section>
  );
};
