import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  X, 
  ShoppingBag, 
  Check, 
  ShieldCheck, 
  Clock, 
  Package, 
  Layers, 
  CheckCircle2,
  FileCheck2,
  Share2,
  DollarSign
} from 'lucide-react';
import type { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToRfq: (product: Product, quantity: number) => void;
  onRequestPricing?: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToRfq,
  onRequestPricing
}) => {
  const [orderQty, setOrderQty] = useState<number>(product ? product.moqNumber : 10000);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToRfq(product, orderQty);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#0b1b33] text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Product Specification Sheet
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-xs text-slate-300 font-mono">{product.id}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left Image Column */}
            <div className="md:col-span-5">
              <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50 h-64 sm:h-72 relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Compliance Badges */}
              <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Regulatory Compliance Standard:
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {product.compliance.map((c) => (
                    <span 
                      key={c}
                      className="px-2 py-1 bg-sky-100 text-[#0284c7] text-xs font-bold rounded border border-sky-200 flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Details Column */}
            <div className="md:col-span-7 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-[#0284c7] uppercase mb-1">
                  {product.categoryLabel}
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#0b1b33] mb-3 leading-snug">
                  {product.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {product.description}
                </p>

                {/* Specs Table */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4 space-y-2 text-xs">
                  <div className="font-bold text-[#0b1b33] uppercase text-[10px] tracking-wider mb-2">
                    Technical Specifications
                  </div>
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="flex items-start justify-between py-1 border-b border-slate-200/60 last:border-0">
                      <span className="text-slate-500">{key}:</span>
                      <span className="font-semibold text-slate-800 text-right">{val}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs mb-6">
                  <div className="p-3 bg-white border border-slate-200 rounded-lg">
                    <span className="text-slate-400 block font-medium">Standard Packaging:</span>
                    <strong className="text-slate-800 text-[11px]">{product.packaging}</strong>
                  </div>
                  <div className="p-3 bg-white border border-slate-200 rounded-lg">
                    <span className="text-slate-400 block font-medium">Production Lead Time:</span>
                    <strong className="text-slate-800 text-[11px]">{product.leadTime}</strong>
                  </div>
                </div>
              </div>

              {/* Quantity Selector & Add to RFQ */}
              <div className="p-4 bg-sky-50 rounded-xl border border-sky-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] text-slate-600 font-bold block mb-1">
                    Requested Order Volume:
                  </span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={product.moqNumber}
                      step={1000}
                      value={orderQty}
                      onChange={(e) => setOrderQty(Math.max(product.moqNumber, Number(e.target.value)))}
                      className="w-28 px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-800"
                    />
                    <span className="text-xs text-slate-500 font-medium">
                      (Min MOQ: {product.moq})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {onRequestPricing && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onRequestPricing(product);
                      }}
                      className="flex-1 sm:flex-initial py-2.5 px-4 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 border border-[#0284c7] text-[#0284c7] bg-white hover:bg-sky-50 shadow-2xs transition-all cursor-pointer"
                    >
                      <DollarSign className="w-3.5 h-3.5" />
                      <span>Request Pricing</span>
                    </button>
                  )}

                  <button
                    onClick={handleAdd}
                    disabled={isAdded}
                    className={`flex-1 sm:flex-initial py-2.5 px-5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#0b1b33] hover:bg-[#122849] text-white'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Basket!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-cyan-400" />
                        <span>Add to RFQ Basket</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
