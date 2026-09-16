import React, { useState, useEffect } from 'react';
import { 
  X, 
  Star, 
  Heart, 
  ShoppingBag, 
  Check, 
  Truck, 
  Shield, 
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Camera
} from 'lucide-react';
import type { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, selectedColor?: string, quantity?: number) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  if (!product) return null;

  const gallery = product.images && product.images.length > 0
    ? product.images
    : [product.image, ...(product.secondaryImage ? [product.secondaryImage] : [])];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Reset active image when product changes
  useEffect(() => {
    setActiveImageIndex(0);
    setQuantity(1);
  }, [product.id]);

  const activeImage = gallery[activeImageIndex] || product.image;

  const handleNext = () => {
    setActiveImageIndex((prev) => (prev + 1) % gallery.length);
  };

  const handlePrev = () => {
    setActiveImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const handleAdd = () => {
    onAddToCart(product, undefined, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#12151d] border border-white/15 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl z-10 overflow-hidden max-h-[90vh] overflow-y-auto no-scrollbar">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-colors cursor-pointer z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left: Product Images Gallery (6 cols) */}
          <div className="md:col-span-6 space-y-3.5">
            {/* Main Stage */}
            <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-[#181c26] relative border border-white/10 flex items-center justify-center group/mainImage">
              <img
                src={activeImage}
                alt={`${product.name} view ${activeImageIndex + 1}`}
                className={`w-full h-full ${
                  product.id === 'ww-mesh-chair-01' && activeImageIndex < 4 ? 'object-contain p-4' : 'object-cover'
                } transition-all duration-300`}
              />
              
              {product.isSale && (
                <span className="absolute top-3 left-3 bg-[#e29d52] text-black text-xs font-bold uppercase px-3 py-1 rounded-md shadow-lg z-10">
                  Sale Active
                </span>
              )}

              {/* View counter */}
              <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5 z-10 border border-white/10">
                <Camera className="w-3 h-3 text-[#f3ba77]" />
                <span>{activeImageIndex + 1} / {gallery.length} Views</span>
              </span>

              {/* Prev / Next navigation arrows on main stage */}
              {gallery.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-all hover:scale-105 cursor-pointer shadow-lg"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-all hover:scale-105 cursor-pointer shadow-lg"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail switcher row */}
            {gallery.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-1">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-16 sm:w-18 sm:h-18 shrink-0 rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-[#181c26] ${
                      activeImageIndex === idx 
                        ? 'border-[#f3ba77] ring-2 ring-[#e29d52]/40 scale-105 opacity-100 shadow-md' 
                        : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`Thumbnail ${idx + 1}`} 
                      className={`w-full h-full ${
                        product.id === 'ww-mesh-chair-01' && idx < 4 ? 'object-contain p-1' : 'object-cover'
                      }`} 
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info & Actions (6 cols) */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div>
              {/* Category & Tag */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#f3ba77] bg-[#e29d52]/15 px-2.5 py-0.5 rounded-full">
                  {product.category}
                </span>
                <span className="text-xs text-zinc-400">• Certified Ergonomic</span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
                {product.name}
              </h2>

              {/* Price & Reviews */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                <div className="flex items-baseline gap-2.5">
                  <span className="text-2xl font-bold text-white font-mono">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-zinc-500 line-through font-mono">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-semibold text-white">{product.rating}</span>
                  <span>({product.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Key Features list */}
              <div className="space-y-2 mb-6 bg-black/30 p-3.5 rounded-xl border border-white/5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                  Architectural Highlights
                </span>
                {product.features.slice(0, 3).map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                    <Check className="w-3.5 h-3.5 text-[#f3ba77] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Dimensions */}
              {product.dimensions && (
                <div className="text-xs text-zinc-400 mb-6 flex items-center justify-between bg-white/5 px-3 py-2 rounded-lg">
                  <span>Standard Dimensions:</span>
                  <span className="font-mono text-white font-semibold">{product.dimensions}</span>
                </div>
              )}
            </div>

            {/* Action Buttons: Quantity, Add to Cart, Wishlist */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-white/15 rounded-xl bg-black/40 px-2 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2 py-1 text-zinc-400 hover:text-white"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-mono font-bold text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2 py-1 text-zinc-400 hover:text-white"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart button */}
                <button
                  onClick={handleAdd}
                  className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                    addedAnimation
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                      : 'bg-gradient-to-r from-[#e29d52] to-[#cf8739] hover:from-[#f3ba77] hover:to-[#e29d52] text-black shadow-lg shadow-[#e29d52]/20'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Workspace Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart • ${(product.price * quantity).toFixed(2)}</span>
                    </>
                  )}
                </button>

                {/* Wishlist button */}
                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className={`p-3.5 rounded-xl border transition-colors cursor-pointer ${
                    isWishlisted
                      ? 'bg-rose-500 text-white border-rose-500 shadow-lg shadow-rose-500/30'
                      : 'bg-white/5 border-white/15 text-zinc-300 hover:text-white hover:bg-white/10'
                  }`}
                  title="Save to Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Trust Badges in Modal */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] text-zinc-400 text-center">
                <div className="flex items-center justify-center gap-1.5 p-2 bg-white/5 rounded-lg">
                  <Truck className="w-3.5 h-3.5 text-[#f3ba77]" />
                  <span>Free White-Glove</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 p-2 bg-white/5 rounded-lg">
                  <Shield className="w-3.5 h-3.5 text-[#f3ba77]" />
                  <span>10-Yr Warranty</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 p-2 bg-white/5 rounded-lg">
                  <RotateCcw className="w-3.5 h-3.5 text-[#f3ba77]" />
                  <span>30-Day Trial</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
