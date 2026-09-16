import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Gift, 
  PartyPopper, 
  Check, 
  Copy, 
  ArrowRight, 
  RotateCcw, 
  Award,
  Crown,
  Lock,
  Unlock,
  Sparkles
} from 'lucide-react';

interface ExecutiveGift {
  id: string;
  name: string;
  value: number;
  qualifyingThreshold: number;
  couponCode: string;
  image: string;
  description: string;
  materials: string;
}

const EXECUTIVE_GIFTS: ExecutiveGift[] = [
  {
    id: 'gift-blotter',
    name: 'Tuscan Full-Grain Leather Desk Blotter & Coaster Set',
    value: 180,
    qualifyingThreshold: 1200,
    couponCode: 'VIP-LEATHER-GIFT',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
    description: 'Hand-burnished Italian vegetable-tanned leather with soft suede backing and matching hand-stitched coaster duo.',
    materials: '100% Aniline Tuscan Hide • Hand-Stitched Edge'
  },
  {
    id: 'gift-charger',
    name: 'Solid Brass & Smoked Oak Dual MagSafe Charging Valet',
    value: 160,
    qualifyingThreshold: 950,
    couponCode: 'VIP-VALET-GIFT',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=600&q=80',
    description: 'Precision-milled French smoked oak block with solid unlacquered brushed brass tray for keys, fountain pens, and phones.',
    materials: 'Smoked European Oak • Solid Architectural Brass'
  },
  {
    id: 'gift-pen',
    name: 'Master Artisan Hand-Turned Walnut Fountain Pen & Inkwell',
    value: 140,
    qualifyingThreshold: 750,
    couponCode: 'VIP-ATELIER-PEN',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=600&q=80',
    description: 'Turned from 80-year-old French Black Walnut heartwood with 14k gold-plated Schmidt German iridium nib.',
    materials: 'Black Walnut • 14k Gold Plated Nib • Brass Core'
  },
  {
    id: 'gift-voucher',
    name: '$250 Private Atelier Workspace Upgrade Voucher',
    value: 250,
    qualifyingThreshold: 1500,
    couponCode: 'EXECUTIVE-250-CASH',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=600&q=80',
    description: 'Instant credit applied to any bespoke commission, standing desk, or ergonomic executive seating suite.',
    materials: 'Complimentary Voucher • No Expiry Date'
  },
];

export const GiftsShowcaseSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeGiftIndex, setActiveGiftIndex] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);
  const [sprinkleCount, setSprinkleCount] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);

  const activeGift = EXECUTIVE_GIFTS[activeGiftIndex];

  const triggerSprinkle = () => {
    setSprinkleCount((prev) => prev + 1);
    try {
      let originX = 0.5;
      let originY = 0.6;

      if (boxRef.current && typeof window !== 'undefined') {
        const rect = boxRef.current.getBoundingClientRect();
        if (window.innerWidth > 0 && window.innerHeight > 0) {
          const rawX = (rect.left + rect.width / 2) / window.innerWidth;
          const rawY = (rect.top + rect.height / 2) / window.innerHeight;
          if (!isNaN(rawX) && rawX >= 0 && rawX <= 1) {
            originX = Math.min(0.85, Math.max(0.15, rawX));
          }
          if (!isNaN(rawY) && rawY >= 0 && rawY <= 1) {
            originY = Math.min(0.85, Math.max(0.2, rawY));
          }
        }
      }

      // Primary festive burst with maximum z-index ensuring visible sprinkles
      confetti({
        particleCount: 85,
        spread: 80,
        origin: { x: originX, y: originY },
        colors: ['#ffd700', '#f5cca0', '#dcb07a', '#ffffff', '#ef4444', '#10b981', '#facc15'],
        ticks: 280,
        gravity: 0.95,
        scalar: 1.2,
        shapes: ['circle', 'square'],
        zIndex: 999999,
        disableForReducedMotion: false,
      });

      // Left angle sprinkle spray
      setTimeout(() => {
        confetti({
          particleCount: 45,
          angle: 60,
          spread: 60,
          origin: { x: Math.max(0.1, originX - 0.1), y: originY },
          colors: ['#ffd700', '#f5cca0', '#e29d52', '#ffffff'],
          zIndex: 999999,
          disableForReducedMotion: false,
        });
      }, 120);

      // Right angle sprinkle spray
      setTimeout(() => {
        confetti({
          particleCount: 45,
          angle: 120,
          spread: 60,
          origin: { x: Math.min(0.9, originX + 0.1), y: originY },
          colors: ['#ffd700', '#dc2626', '#dcb07a', '#10b981'],
          zIndex: 999999,
          disableForReducedMotion: false,
        });
      }, 220);
    } catch (err) {
      console.warn('Sprinkle celebration effect error:', err);
    }
  };

  const handleOpenBox = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
    triggerSprinkle();
  };

  const handleCycleGift = () => {
    setActiveGiftIndex((prev) => (prev + 1) % EXECUTIVE_GIFTS.length);
    setCopiedCode(false);
    if (!isOpen) {
      setIsOpen(true);
    }
    triggerSprinkle();
  };

  const handleSelectGift = (idx: number) => {
    setActiveGiftIndex(idx);
    setCopiedCode(false);
    if (!isOpen) {
      setIsOpen(true);
    }
    triggerSprinkle();
  };

  const handleToggleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    setCopiedCode(false);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <section id="executive-gifts" className="py-16 sm:py-20 lg:py-24 bg-[#0a0d10] text-white border-b border-stone-800/80 relative overflow-hidden select-none">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#dcb07a]/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#dcb07a]/15 border border-[#dcb07a]/30 mb-3">
            <Gift className="w-3.5 h-3.5 text-[#f5cca0]" />
            <span className="text-[11px] font-bold tracking-[0.24em] text-[#f5cca0] uppercase font-sans">
              COMPLIMENTARY EXECUTIVE REWARDS
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-normal text-white tracking-tight leading-tight">
            Gifts That Could Be Yours
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm mt-2.5 leading-relaxed max-w-xl mx-auto">
            Every qualifying order includes a hand-finished luxury gift. Tap the gift box below to unwrap your complimentary executive reward.
          </p>
        </div>

        {/* Interactive Center Stage: 3D Animated Gift Box & Reveal Card */}
        <div className="max-w-4xl mx-auto bg-[#13171e] rounded-3xl border border-stone-800/90 shadow-2xl p-6 sm:p-10 relative overflow-hidden">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
              {/* Left: The Animated 3D Red Gift Box */}
            <div className="md:col-span-5 flex flex-col items-center justify-center py-4">
              
              <div 
                ref={boxRef}
                onClick={handleOpenBox}
                className="relative w-56 h-56 sm:w-64 sm:h-64 cursor-pointer group flex items-center justify-center select-none"
              >
                {/* Subtle Ambient Backing Glow */}
                <div className={`absolute inset-0 rounded-full transition-all duration-700 blur-2xl ${
                  isOpen ? 'bg-red-600/30 scale-125' : 'bg-red-900/20 group-hover:bg-red-600/25 group-hover:scale-105'
                }`} />

                {/* The 3D Red Gift Box Representation */}
                <div className="relative w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center">
                  
                  {/* Box Base (Rich Crimson Luxury Red) */}
                  <motion.div 
                    animate={isOpen ? { scale: 1.02, y: 12 } : { y: [0, -3, 0] }}
                    transition={isOpen ? { duration: 0.3 } : { repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                    className="absolute bottom-0 w-36 h-28 sm:w-42 sm:h-32 bg-gradient-to-b from-[#b91c1c] via-[#991b1b] to-[#7f1d1d] rounded-2xl border border-red-500/40 shadow-[0_18px_40px_rgba(0,0,0,0.7)] flex items-center justify-center overflow-hidden z-10"
                  >
                    {/* Golden Vertical Ribbon on Box */}
                    <div className="absolute inset-y-0 w-8 bg-gradient-to-r from-[#e5bd88] via-[#ffd700] to-[#c79659] shadow-sm" />
                    
                    {/* Golden Horizontal Ribbon */}
                    <div className="absolute inset-x-0 h-7 bg-gradient-to-b from-[#e5bd88] via-[#ffd700] to-[#c79659] shadow-sm" />
                    
                    {/* Subtle Satin Sheen */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-white/15 pointer-events-none" />

                    {/* Golden Gift Emblem */}
                    <div className="absolute z-20 w-8 h-8 rounded-full bg-[#7f1d1d] border border-[#ffd700] flex items-center justify-center text-[#ffd700] shadow-md">
                      {isOpen ? <Unlock className="w-3.5 h-3.5" /> : <Gift className="w-3.5 h-3.5" />}
                    </div>
                  </motion.div>

                  {/* Product Emerging from Inside the Box When Opened */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        key={`emerging-product-${activeGift.id}`}
                        initial={{ y: 26, opacity: 0, scale: 0.2 }}
                        animate={{ y: -44, opacity: 1, scale: 1 }}
                        exit={{ y: 26, opacity: 0, scale: 0.2 }}
                        transition={{ type: "spring", stiffness: 260, damping: 18 }}
                        className="absolute z-20 flex flex-col items-center pointer-events-none"
                      >
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-[#ffd700] shadow-[0_16px_36px_rgba(0,0,0,0.85)] bg-[#191d26] p-1.5 relative">
                          <img 
                            src={activeGift.image} 
                            alt={activeGift.name} 
                            className="w-full h-full object-cover rounded-xl" 
                          />
                          <div className="absolute top-2 right-2 bg-[#ffd700] text-stone-950 font-black text-[9px] px-2 py-0.5 rounded-full shadow-md">
                            FREE
                          </div>
                        </div>
                        <div className="mt-1.5 px-3 py-1 rounded-full bg-stone-950/95 border border-[#ffd700]/70 text-[10px] font-bold text-[#ffd700] tracking-wide shadow-xl whitespace-nowrap flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-[#ffd700]" />
                          <span>${activeGift.value} Luxury Value</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Box Lid with Red Satin and Smooth Lift Animation */}
                  <motion.div
                    animate={isOpen ? { y: -64, x: -18, rotate: -24, scale: 1.06 } : { y: 0, x: 0, rotate: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 220, damping: 18 }}
                    className="absolute top-3 w-40 sm:w-44 h-13 bg-gradient-to-b from-[#dc2626] via-[#b91c1c] to-[#991b1b] rounded-xl border border-red-400/50 shadow-2xl flex items-center justify-center z-30 pointer-events-none"
                  >
                    {/* Golden Ribbon on Lid */}
                    <div className="absolute inset-y-0 w-8 bg-gradient-to-r from-[#e5bd88] via-[#ffd700] to-[#c79659]" />
                    
                    {/* Big Golden Satin Gift Bow */}
                    <div className="absolute -top-5 flex items-center justify-center">
                      {/* Left Loop */}
                      <div className="w-9 h-6 bg-gradient-to-br from-[#ffd700] via-[#e5bd88] to-[#c79659] rounded-full border border-yellow-200 shadow-md transform -rotate-25" />
                      {/* Right Loop */}
                      <div className="w-9 h-6 bg-gradient-to-bl from-[#c79659] via-[#e5bd88] to-[#ffd700] rounded-full border border-yellow-200 shadow-md transform rotate-25 -ml-2.5" />
                      {/* Center Rosette Knot */}
                      <div className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-[#ffe484] to-[#c79659] shadow-md border border-yellow-300" />
                      {/* Cascading Ribbon Tails */}
                      <div className="absolute top-4 -left-1 w-2.5 h-4 bg-[#c79659] transform -rotate-12 rounded-b" />
                      <div className="absolute top-4 right-0 w-2.5 h-4 bg-[#c79659] transform rotate-12 rounded-b" />
                    </div>
                  </motion.div>

                  {/* Warm Interior Glow Emerging When Open */}
                  {isOpen && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute -top-12 w-36 h-40 bg-gradient-to-t from-[#ffd700]/30 to-transparent blur-md rounded-full pointer-events-none z-15"
                    />
                  )}

                  {/* Floating Gold Sparkle Sprinkles Rising Out of Box */}
                  {isOpen && (
                    <div className="absolute -top-24 inset-x-0 h-44 pointer-events-none z-25 overflow-visible flex items-center justify-center">
                      {[
                        { emoji: '✨', x: -48, y: -45, delay: 0 },
                        { emoji: '⭐', x: 42, y: -50, delay: 0.05 },
                        { emoji: '🎉', x: -16, y: -68, delay: 0.02 },
                        { emoji: '✦', x: 26, y: -62, delay: 0.09 },
                        { emoji: '✨', x: 56, y: -36, delay: 0.14 },
                        { emoji: '⭐', x: -56, y: -32, delay: 0.18 },
                        { emoji: '💎', x: 0, y: -78, delay: 0.07 },
                      ].map((item, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, y: 15, scale: 0, x: 0 }}
                          animate={{ 
                            opacity: [0, 1, 1, 0], 
                            y: [0, item.y, item.y - 25],
                            x: [0, item.x, item.x * 1.25],
                            scale: [0.2, 1.35, 1.1, 0] 
                          }}
                          transition={{ 
                            duration: 1.6, 
                            delay: item.delay,
                            ease: "easeOut"
                          }}
                          className="absolute text-lg select-none drop-shadow-[0_2px_8px_rgba(255,215,0,0.7)]"
                        >
                          {item.emoji}
                        </motion.span>
                      ))}
                    </div>
                  )}

                </div>
              </div>

              {/* Status prompt beneath box */}
              <div className="text-center mt-3">
                {!isOpen ? (
                  <button
                    onClick={handleOpenBox}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#dcb07a] via-[#f5cca0] to-[#c79659] text-stone-950 font-bold text-xs shadow-lg shadow-[#dcb07a]/25 hover:brightness-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <Gift className="w-3.5 h-3.5 text-stone-900" />
                    <span>Tap to Open Gift Box</span>
                  </button>
                ) : (
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <button
                      onClick={triggerSprinkle}
                      className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-500/40 px-3.5 py-1.5 rounded-full cursor-pointer transition-all active:scale-95 shadow-sm"
                      title="Click for celebratory sprinkle"
                    >
                      <PartyPopper className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Reward Unlocked! ✨</span>
                    </button>
                    <button
                      onClick={handleCycleGift}
                      className="inline-flex items-center gap-1 text-[11px] text-[#dcb07a] hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Open another surprise</span>
                    </button>
                    <button
                      onClick={handleToggleClose}
                      className="inline-flex items-center gap-1 text-[11px] text-stone-400 hover:text-stone-200 px-2.5 py-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                      title="Close box to unwrap again"
                    >
                      <Lock className="w-3 h-3" />
                      <span>Re-close box</span>
                    </button>
                  </div>
                )}
              </div>

            </div>

            {/* Right: Mystery Card (when closed) OR Revealed Product Card (when open) */}
            <div className="md:col-span-7 flex flex-col justify-between">
              <AnimatePresence mode="wait">
                {!isOpen ? (
                  <motion.div
                    key="closed-state"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="bg-[#191d26] rounded-2xl border border-stone-700/70 p-6 sm:p-8 shadow-xl flex flex-col items-center text-center justify-center min-h-[340px] relative overflow-hidden"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 via-red-500/15 to-transparent border border-amber-500/40 flex items-center justify-center text-[#ffd700] mb-4 shadow-lg">
                      <Gift className="w-8 h-8 animate-bounce" />
                    </div>
                    
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dcb07a]/15 border border-[#dcb07a]/30 text-[#f5cca0] text-[11px] font-bold uppercase tracking-wider mb-2">
                      <Crown className="w-3 h-3 text-[#f5cca0]" />
                      VIP Mystery Reward
                    </span>
                    
                    <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-snug">
                      Unwrap Your Luxury Gift
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed max-w-md">
                      Every qualifying order includes a complimentary hand-crafted executive reward. Tap the gift box or the button below to break the seal and reveal your prize.
                    </p>

                    <button
                      onClick={handleOpenBox}
                      className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#dcb07a] via-[#f5cca0] to-[#c79659] text-stone-950 font-bold text-xs tracking-wide shadow-xl shadow-[#dcb07a]/25 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-stone-900" />
                      <span>Open Box & Reveal Product</span>
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`revealed-${activeGift.id}`}
                    initial={{ opacity: 0, scale: 0.94, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94, y: -15 }}
                    transition={{ type: "spring", stiffness: 280, damping: 22 }}
                    className="bg-[#191d26] rounded-2xl border border-stone-700/80 p-5 sm:p-6 shadow-xl relative overflow-hidden"
                  >
                    {/* Top Success Pill */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dcb07a]/20 border border-[#dcb07a]/40 text-[#f5cca0] text-[11px] font-bold uppercase tracking-wider">
                        <Crown className="w-3 h-3 text-[#f5cca0]" />
                        Executive Reward Unlocked
                      </span>
                      <span className="text-xs font-mono text-emerald-400 font-semibold">
                        ${activeGift.value} Retail Value • Yours Free
                      </span>
                    </div>

                    {/* Gift Info Layout */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 mb-4">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-stone-900 border border-stone-700 shrink-0">
                        <img src={activeGift.image} alt={activeGift.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-serif text-xl sm:text-2xl text-white font-normal leading-snug">
                          {activeGift.name}
                        </h4>
                        <p className="text-xs text-stone-300 mt-1.5 leading-relaxed">
                          {activeGift.description}
                        </p>
                        <p className="text-[11px] text-[#dcb07a] mt-1 font-mono">
                          {activeGift.materials}
                        </p>
                      </div>
                    </div>

                    {/* Coupon Claim Bar */}
                    <div className="bg-stone-900/90 rounded-xl p-3 border border-stone-700/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="text-left w-full sm:w-auto">
                        <span className="text-[10px] uppercase tracking-wider text-stone-400 block">Your VIP Claim Code:</span>
                        <span className="font-mono text-sm sm:text-base font-bold text-[#f5cca0] tracking-wider">
                          {activeGift.couponCode}
                        </span>
                      </div>

                      <button
                        onClick={() => handleCopyCode(activeGift.couponCode)}
                        className={`w-full sm:w-auto px-4 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          copiedCode
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#dcb07a] hover:bg-[#e6bd8b] text-stone-950 shadow-sm'
                        }`}
                      >
                        {copiedCode ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Code Copied to Clipboard!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy VIP Code</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="mt-3 text-center sm:text-left">
                      <span className="text-[11px] text-stone-400">
                        Auto-applies at checkout on orders of ${activeGift.qualifyingThreshold.toLocaleString()}+. Hand-packaged in keepsake wooden gift box.
                      </span>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

        {/* Bottom 4 Eligible Gifts Grid */}
        <div className="mt-12">
          <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 text-center mb-6">
            All 4 Eligible VIP Milestone Gifts in the Vault:
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {EXECUTIVE_GIFTS.map((gift, idx) => {
              const isCurrent = activeGiftIndex === idx;
              return (
                <div
                  key={gift.id}
                  onClick={() => handleSelectGift(idx)}
                  className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-[#181d26] border-[#dcb07a] ring-1 ring-[#dcb07a]/40 shadow-lg'
                      : 'bg-[#11141a] hover:bg-[#151922] border-stone-800'
                  }`}
                >
                  <div>
                    <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-stone-900 mb-3 border border-stone-800">
                      <img src={gift.image} alt={gift.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] text-[#f5cca0] font-mono font-bold">
                        ${gift.value} Value
                      </span>
                      <span className="text-[10px] text-stone-400">
                        Orders ${gift.qualifyingThreshold}+
                      </span>
                    </div>
                    <h5 className="font-serif text-sm text-white font-normal line-clamp-2">
                      {gift.name}
                    </h5>
                  </div>

                  <div className="mt-3 pt-2 border-t border-stone-800 flex items-center justify-between text-[11px] text-[#dcb07a]">
                    <span>{isCurrent ? 'Selected in Vault' : 'Click to preview'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
