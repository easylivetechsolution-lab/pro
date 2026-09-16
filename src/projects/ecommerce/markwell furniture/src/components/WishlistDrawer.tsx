import React from 'react';
import { X, Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import type { Product } from '../types';
import { FEATURED_PRODUCTS } from '../data';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  onRemoveFromWishlist,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  const wishlistedProducts = FEATURED_PRODUCTS.filter((p) =>
    wishlistIds.includes(p.id)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#12151c] border-l border-white/10 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Heart className="w-5 h-5 text-rose-400 fill-current" />
              <h3 className="text-lg font-bold text-white">Saved Workspace Items</h3>
              <span className="text-xs bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded-full font-bold">
                {wishlistedProducts.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-zinc-500 mb-4">
                  <Heart className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-white mb-1">No items saved yet</h4>
                <p className="text-xs text-zinc-400 max-w-xs mb-6">
                  Click the heart icon on any chair, desk or handcrafted piece to save it for your dream workspace.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-[#f3ba77] hover:bg-[#e29d52] text-black font-semibold text-xs transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              wishlistedProducts.map((product) => (
                <div 
                  key={product.id}
                  className="flex gap-4 p-3.5 rounded-2xl bg-[#171b24] border border-white/5 hover:border-white/10 transition-colors"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 rounded-xl object-cover bg-zinc-900 shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                          {product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveFromWishlist(product.id)}
                          className="text-zinc-500 hover:text-rose-400 p-1 transition-colors"
                          title="Remove from saved"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-sm font-bold text-[#f3ba77] font-mono mt-1 block">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        onAddToCart(product);
                        onRemoveFromWishlist(product.id);
                      }}
                      className="mt-2 w-full py-1.5 px-3 rounded-lg bg-[#e29d52] hover:bg-[#f3ba77] text-black font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Cart</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-6 bg-[#0f1118] border-t border-white/10">
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition-colors"
            >
              Continue Browsing
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
