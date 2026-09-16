import React from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Truck 
} from 'lucide-react';
import type { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number, color?: string) => void;
  onRemoveItem: (productId: string, color?: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const freeShippingThreshold = 1000;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

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
              <ShoppingBag className="w-5 h-5 text-[#f3ba77]" />
              <h3 className="text-lg font-bold text-white">Your Workspace Cart</h3>
              <span className="text-xs bg-[#e29d52]/20 text-[#f3ba77] px-2 py-0.5 rounded-full font-bold">
                {cart.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3.5 bg-[#171c26] border-b border-white/5">
            <div className="flex items-center justify-between text-xs text-zinc-300 mb-1.5">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#f3ba77]" />
                {amountToFreeShipping > 0 ? (
                  <span>Add <strong className="text-white font-mono">${amountToFreeShipping.toFixed(2)}</strong> for Free White-Glove Freight</span>
                ) : (
                  <span className="text-[#f3ba77] font-semibold">You unlocked Free White-Glove Freight!</span>
                )}
              </div>
              <span className="font-mono text-[11px] text-zinc-400">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#e29d52] to-[#f3ba77] transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-zinc-500 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-white mb-1">Your cart is empty</h4>
                <p className="text-xs text-zinc-400 max-w-xs mb-6">
                  Explore our curated ergonomic chairs, desks, and handcrafted furniture to outfit your sanctuary.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-[#f3ba77] hover:bg-[#e29d52] text-black font-semibold text-xs transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item, index) => (
                <div 
                  key={`${item.product.id}-${item.selectedColor || 'default'}-${index}`}
                  className="flex gap-4 p-3.5 rounded-2xl bg-[#171b24] border border-white/5 hover:border-white/10 transition-colors"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-xl object-cover bg-zinc-900 shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id, item.selectedColor)}
                          className="text-zinc-500 hover:text-rose-400 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.selectedColor && (
                        <p className="text-[11px] text-zinc-400 mt-0.5">
                          Finish: <strong className="text-zinc-300">{item.selectedColor}</strong>
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                      <div className="flex items-center border border-white/15 rounded-lg bg-black/40">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1, item.selectedColor)}
                          className="p-1 text-zinc-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs px-2 font-mono font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1, item.selectedColor)}
                          className="p-1 text-zinc-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-bold text-[#f3ba77] font-mono">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#0f1118] border-t border-white/10 space-y-4">
              <div className="space-y-1.5 text-xs text-zinc-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-mono">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping & White-Glove Setup</span>
                  <span className="text-white font-mono">
                    {amountToFreeShipping === 0 ? 'FREE' : '$49.00'}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/10 text-sm font-bold text-white">
                  <span>Estimated Total</span>
                  <span className="text-[#f3ba77] font-mono text-base">
                    ${(subtotal + (amountToFreeShipping === 0 ? 0 : 49)).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={onCheckout}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#e29d52] to-[#cf8739] hover:from-[#f3ba77] hover:to-[#e29d52] text-black font-bold text-sm shadow-lg shadow-[#e29d52]/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500">
                <ShieldCheck className="w-3.5 h-3.5 text-[#f3ba77]" />
                <span>256-Bit SSL Encrypted • 30-Day Money Back Guarantee</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
