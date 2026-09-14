import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  DollarSign, 
  TrendingDown, 
  Send, 
  CheckCircle2, 
  FileText, 
  Globe, 
  Package, 
  ShieldCheck, 
  Clock, 
  Building2, 
  Mail, 
  User, 
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import type { Product } from '../types';

interface ProductPricingModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToQuoteBasket?: (product: Product, quantity: number) => void;
}

export const ProductPricingModal: React.FC<ProductPricingModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToQuoteBasket
}) => {
  if (!product || !isOpen) return null;

  // Pricing calculation helper based on product category & volume
  const getBaseUnitPrice = (category: string) => {
    switch (category) {
      case 'ppe': return 0.12;
      case 'diagnostics': return 2.40;
      case 'surgical': return 185.00;
      case 'consumables': return 0.85;
      case 'furniture': return 4200.00;
      default: return 1.50;
    }
  };

  const basePrice = getBaseUnitPrice(product.category);
  const moqQty = product.moqNumber || 10000;

  // 3 Volume Tiers
  const tier1Qty = moqQty;
  const tier2Qty = moqQty * 5;
  const tier3Qty = moqQty * 20;

  const tier1UnitPrice = basePrice;
  const tier2UnitPrice = basePrice * 0.88; // 12% discount
  const tier3UnitPrice = basePrice * 0.76; // 24% discount

  // State
  const [selectedTier, setSelectedTier] = useState<number>(1);
  const [customQty, setCustomQty] = useState<number>(moqQty);
  const [selectedIncoterm, setSelectedIncoterm] = useState<string>('CPT');
  const [destinationCountry, setDestinationCountry] = useState<string>('United States');
  const [targetPort, setTargetPort] = useState<string>('');
  const [contactName, setContactName] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  // Active quantity based on tier selection
  const activeQuantity = selectedTier === 1 
    ? tier1Qty 
    : selectedTier === 2 
    ? tier2Qty 
    : selectedTier === 3 
    ? tier3Qty 
    : customQty;

  const activeUnitPrice = selectedTier === 1
    ? tier1UnitPrice
    : selectedTier === 2
    ? tier2UnitPrice
    : selectedTier === 3
    ? tier3UnitPrice
    : (customQty >= tier3Qty ? tier3UnitPrice : customQty >= tier2Qty ? tier2UnitPrice : tier1UnitPrice);

  const estimatedTotal = activeQuantity * activeUnitPrice;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedRef = `HM-PRC-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedRef(generatedRef);
  };

  const handleReset = () => {
    setSubmittedRef(null);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-slate-950/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 text-slate-800"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sky-100 text-[#0284c7] flex items-center justify-center">
                <DollarSign className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#0284c7]">
                  Instant Commercial Pricing Schedule
                </span>
                <h3 className="text-base sm:text-lg font-black text-[#071324] leading-tight">
                  Tiered Volume Pricing & Quotation
                </h3>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {submittedRef ? (
            /* Submission Success Screen */
            <div className="p-6 sm:p-10 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block mb-1">
                  Commercial Pricing Inquiry Registered
                </span>
                <h4 className="text-2xl font-black text-[#071324] tracking-tight">
                  Quotation Request #{submittedRef}
                </h4>
                <p className="text-slate-600 text-sm mt-2 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-slate-800">{contactName || 'Valued Partner'}</strong>. Hearts & Mind Trade Logistics has prepared this preliminary pricing schedule for <strong className="text-slate-800">{companyName || 'your organization'}</strong>.
                </p>
              </div>

              {/* Summary Box */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 max-w-md mx-auto text-left space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Product:</span>
                  <span className="font-bold text-slate-800">{product.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Quoted Quantity:</span>
                  <span className="font-bold text-[#0284c7]">{activeQuantity.toLocaleString()} units</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Benchmark Unit Price:</span>
                  <span className="font-bold text-emerald-600">${activeUnitPrice.toFixed(2)} USD / unit</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Delivery Terms:</span>
                  <span className="font-bold text-slate-800">{selectedIncoterm} - {destinationCountry}</span>
                </div>
                <div className="flex justify-between pt-1 font-bold text-sm">
                  <span className="text-[#071324]">Est. Landed FOB/CPT Value:</span>
                  <span className="text-[#0284c7] font-mono">${estimatedTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#071324] hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow transition-colors"
                >
                  Return to Catalogue
                </button>
                {onAddToQuoteBasket && (
                  <button
                    onClick={() => {
                      onAddToQuoteBasket(product, activeQuantity);
                      handleReset();
                    }}
                    className="w-full sm:w-auto px-6 py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Also Add to RFQ Basket</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Pricing Details and Form */
            <div className="p-6 overflow-y-auto max-h-[80vh] space-y-6">
              {/* Product Snippet */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-contain rounded-lg bg-white border border-slate-200 p-1 shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#0284c7] tracking-wider">
                      {product.categoryLabel}
                    </span>
                    <h4 className="font-bold text-sm sm:text-base text-[#071324] leading-tight">
                      {product.name}
                    </h4>
                    <span className="text-xs text-slate-500 block mt-0.5">
                      Base MOQ: <strong>{product.moq}</strong> | Packaging: {product.packaging}
                    </span>
                  </div>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase block">Compliance Pass</span>
                  <div className="flex gap-1 mt-1">
                    {product.compliance.map((c) => (
                      <span key={c} className="text-[10px] font-bold bg-white border border-slate-200 text-slate-700 px-1.5 py-0.5 rounded">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3 Tier Volume Pricing Matrix */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                    <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Select Volume Tier for Instant Pricing</span>
                  </h5>
                  <span className="text-[11px] text-slate-400">Institutional B2B Benchmarks</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Tier 1 */}
                  <div
                    onClick={() => setSelectedTier(1)}
                    className={`cursor-pointer rounded-xl p-4 border transition-all relative ${
                      selectedTier === 1
                        ? 'border-[#0284c7] bg-sky-50/70 shadow-sm ring-1 ring-[#0284c7]'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Tier 1 (Base MOQ)
                      </span>
                      {selectedTier === 1 && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0284c7]" />
                      )}
                    </div>
                    <div className="text-lg font-black text-[#071324] font-mono">
                      {tier1Qty.toLocaleString()} pcs
                    </div>
                    <div className="text-sm font-bold text-slate-700 mt-1">
                      ${tier1UnitPrice.toFixed(2)}{' '}
                      <span className="text-xs font-normal text-slate-500">/ unit</span>
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1 block">
                      Standard wholesale export benchmark
                    </span>
                  </div>

                  {/* Tier 2 */}
                  <div
                    onClick={() => setSelectedTier(2)}
                    className={`cursor-pointer rounded-xl p-4 border transition-all relative ${
                      selectedTier === 2
                        ? 'border-[#0284c7] bg-sky-50/70 shadow-sm ring-1 ring-[#0284c7]'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <span className="absolute -top-2 right-2 px-1.5 py-0.5 bg-emerald-600 text-white font-bold text-[9px] rounded-full uppercase">
                      Save 12%
                    </span>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Tier 2 (Mid-Volume)
                      </span>
                      {selectedTier === 2 && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0284c7]" />
                      )}
                    </div>
                    <div className="text-lg font-black text-[#071324] font-mono">
                      {tier2Qty.toLocaleString()} pcs
                    </div>
                    <div className="text-sm font-bold text-emerald-600 mt-1">
                      ${tier2UnitPrice.toFixed(2)}{' '}
                      <span className="text-xs font-normal text-slate-500">/ unit</span>
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1 block">
                      Regional distributor & hospital consortium
                    </span>
                  </div>

                  {/* Tier 3 */}
                  <div
                    onClick={() => setSelectedTier(3)}
                    className={`cursor-pointer rounded-xl p-4 border transition-all relative ${
                      selectedTier === 3
                        ? 'border-[#0284c7] bg-sky-50/70 shadow-sm ring-1 ring-[#0284c7]'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <span className="absolute -top-2 right-2 px-1.5 py-0.5 bg-[#0284c7] text-white font-bold text-[9px] rounded-full uppercase">
                      Save 24% (FCL)
                    </span>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Tier 3 (Full Container)
                      </span>
                      {selectedTier === 3 && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0284c7]" />
                      )}
                    </div>
                    <div className="text-lg font-black text-[#071324] font-mono">
                      {tier3Qty.toLocaleString()}+ pcs
                    </div>
                    <div className="text-sm font-bold text-[#0284c7] mt-1">
                      ${tier3UnitPrice.toFixed(2)}{' '}
                      <span className="text-xs font-normal text-slate-500">/ unit</span>
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1 block">
                      National tender & direct factory allocation
                    </span>
                  </div>
                </div>
              </div>

              {/* Form to submit tailored quotation request */}
              <form onSubmit={handleSubmit} className="space-y-4 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#0284c7]" />
                    <span>Commercial Quote Specifications</span>
                  </h5>
                  <span className="text-[11px] text-emerald-600 font-bold">Formal Quote in &lt; 24h</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Target Incoterm
                    </label>
                    <select
                      value={selectedIncoterm}
                      onChange={(e) => setSelectedIncoterm(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#0284c7]"
                    >
                      <option value="CPT">CPT - Carriage Paid To (Recommended)</option>
                      <option value="CIF">CIF - Cost, Insurance & Freight</option>
                      <option value="FOB">FOB - Free on Board (Origin Port)</option>
                      <option value="DAP">DAP - Delivered at Place</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Destination Country / Port
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rotterdam Port, Netherlands / Houston, USA"
                      value={destinationCountry}
                      onChange={(e) => setDestinationCountry(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0284c7]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Procurement Contact Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Arthur Vance"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0284c7]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Institutional / Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. procurement@health-network.org"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0284c7]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Organization / Healthcare Entity Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Regional Hospital Consortium / Ministry of Health"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0284c7]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Custom Packing / Delivery Requirements (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Specific sterile labeling, palletization specifications, or staged monthly shipment schedule..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0284c7] resize-none"
                    />
                  </div>
                </div>

                {/* Calculation Summary Bar */}
                <div className="p-3.5 bg-slate-900 text-white rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">
                      Estimated Benchmark Value ({selectedIncoterm})
                    </span>
                    <span className="text-xl font-black font-mono text-white">
                      ${estimatedTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                    </span>
                    <span className="text-xs text-slate-400 ml-2">
                      ({activeQuantity.toLocaleString()} pcs @ ${activeUnitPrice.toFixed(2)}/unit)
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Price Inquiry</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
