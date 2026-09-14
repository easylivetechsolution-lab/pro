import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  FileCheck2, 
  Printer, 
  Download, 
  CheckCircle2,
  Package,
  Building2,
  HelpCircle
} from 'lucide-react';
import type { RFQItem, Product } from '../types';

interface RFQDrawerModalProps {
  isOpen: boolean;
  onClose: () => void;
  rfqItems: RFQItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearBasket: () => void;
}

export const RFQDrawerModal: React.FC<RFQDrawerModalProps> = ({
  isOpen,
  onClose,
  rfqItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearBasket,
}) => {
  const [step, setStep] = useState<'review' | 'details' | 'success'>('review');
  const [institutionName, setInstitutionName] = useState('');
  const [buyerType, setBuyerType] = useState('Hospital / Healthcare Network');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [destinationPort, setDestinationPort] = useState('');
  const [preferredIncoterm, setPreferredIncoterm] = useState('CPT');
  const [notes, setNotes] = useState('');
  const [generatedRfqId, setGeneratedRfqId] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const totalUnits = rfqItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleSubmitRfq = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      const rfqNumber = `HMM-RFQ-${Math.floor(100000 + Math.random() * 900000)}`;
      setGeneratedRfqId(rfqNumber);
      setSubmitting(false);
      setStep('success');
    }, 1000);
  };

  const handlePrint = () => {
    window.print();
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
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-600/30 border border-sky-400/40 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white leading-tight">
                Institutional RFQ Basket
              </h2>
              <span className="text-xs text-slate-400">
                Hearts and Mind Medical Export LLC • Global Trade Desk
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {step === 'review' && (
            <div>
              {rfqItems.length === 0 ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0b1b33] mb-1">
                    Your RFQ Basket is Empty
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
                    Browse our certified catalog of medical consumables, PPE, and surgical instruments to add items to your institutional quote.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 bg-[#0284c7] text-white font-bold text-xs rounded-lg shadow-sm hover:bg-[#0369a1] transition-colors"
                  >
                    Browse Product Catalog
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Selected Medical Items ({rfqItems.length})
                    </span>
                    <button
                      onClick={onClearBasket}
                      className="text-xs text-rose-600 hover:underline flex items-center gap-1 font-medium"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Clear Basket
                    </button>
                  </div>

                  {/* Items list */}
                  <div className="divide-y divide-slate-100 space-y-3">
                    {rfqItems.map((item) => (
                      <div key={item.product.id} className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-14 h-14 object-cover rounded-lg border border-slate-200"
                          />
                          <div>
                            <h4 className="text-xs sm:text-sm font-bold text-[#0b1b33]">
                              {item.product.name}
                            </h4>
                            <div className="text-[11px] text-slate-500">
                              MOQ: <span className="font-semibold text-slate-700">{item.product.moq}</span>
                            </div>
                            <div className="flex items-center gap-1 mt-0.5">
                              {item.product.compliance.map((c) => (
                                <span key={c} className="text-[9px] font-bold px-1 bg-sky-50 text-[#0284c7] rounded border border-sky-100">
                                  {c}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-4 self-end sm:self-center">
                          <div className="flex items-center border border-slate-300 rounded-lg bg-slate-50">
                            <button
                              onClick={() => {
                                const stepAmount = item.product.moqNumber >= 1000 ? 500 : 10;
                                const newQty = Math.max(item.product.moqNumber, item.quantity - stepAmount);
                                onUpdateQuantity(item.product.id, newQty);
                              }}
                              className="p-1.5 text-slate-600 hover:bg-slate-200 rounded-l-lg"
                              title="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => onUpdateQuantity(item.product.id, Math.max(1, Number(e.target.value)))}
                              className="w-20 py-1 text-center text-xs font-mono font-bold bg-transparent focus:outline-none"
                            />
                            <button
                              onClick={() => {
                                const stepAmount = item.product.moqNumber >= 1000 ? 500 : 10;
                                onUpdateQuantity(item.product.id, item.quantity + stepAmount);
                              }}
                              className="p-1.5 text-slate-600 hover:bg-slate-200 rounded-r-lg"
                              title="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary Bar */}
                  <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-[#0284c7]" />
                      <span>Total Units in RFQ: <strong>{totalUnits.toLocaleString()} units</strong></span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Standard pricing includes packaging & export pallets.
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 'details' && (
            <form onSubmit={handleSubmitRfq} className="space-y-4">
              <div className="pb-3 border-b border-slate-200">
                <h3 className="text-sm font-bold text-[#0b1b33]">
                  Institutional Buyer & Freight Details
                </h3>
                <p className="text-xs text-slate-500">
                  Please provide your organization’s credentials for tailored landed pricing and customs clearance.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Institution / Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. National Health Service / Regional Clinic"
                    value={institutionName}
                    onChange={(e) => setInstitutionName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0284c7] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Buyer Category *
                  </label>
                  <select
                    value={buyerType}
                    onChange={(e) => setBuyerType(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0284c7] focus:outline-none font-medium"
                  >
                    <option>Hospital / Healthcare Network</option>
                    <option>Government Ministry / Public Health Agency</option>
                    <option>Medical Wholesaler / Distributor</option>
                    <option>International NGO / Health Mission</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Procurement Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="tenders@healthcare.gov"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0284c7] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Phone / Direct WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 019-2834"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0284c7] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Preferred Incoterm *
                  </label>
                  <select
                    value={preferredIncoterm}
                    onChange={(e) => setPreferredIncoterm(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0284c7] focus:outline-none font-medium"
                  >
                    <option value="CPT">CPT - Carriage Paid To (Hearts & Mind Recommended)</option>
                    <option value="CIF">CIF - Cost, Insurance and Freight</option>
                    <option value="FOB">FOB - Free On Board</option>
                    <option value="DDP">DDP - Delivered Duty Paid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Destination Port / Airport *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Port of New Orleans, Rotterdam, Dubai (DXB)"
                    value={destinationPort}
                    onChange={(e) => setDestinationPort(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0284c7] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Special Tender Specifications or Delivery Deadlines
                </label>
                <textarea
                  rows={2}
                  placeholder="Need sterile individual wrapping, cold-chain monitoring, or specific FDA 510(k) documentation..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0284c7] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setStep('review')}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  ← Back to Items
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 bg-[#0b1b33] hover:bg-[#122849] text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-2"
                >
                  {submitting ? 'Transmitting RFQ...' : 'Submit Institutional RFQ →'}
                </button>
              </div>
            </form>
          )}

          {step === 'success' && (
            <div className="py-6 text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-[#0b1b33] mb-1">
                Official RFQ Transmitted!
              </h3>
              <p className="text-xs font-mono font-bold text-[#0284c7] mb-4">
                Reference ID: {generatedRfqId}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto mb-6">
                Your request for <strong>{totalUnits.toLocaleString()} units</strong> has been lodged with our international logistics and manufacturer verification desk under <strong>{preferredIncoterm}</strong> terms.
              </p>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-left max-w-md mx-auto mb-6 space-y-1">
                <div><strong>Client:</strong> {institutionName} ({buyerType})</div>
                <div><strong>Destination Port:</strong> {destinationPort}</div>
                <div><strong>Response Guaranteed:</strong> Within 24 hours to {contactEmail}</div>
                <div><strong>Trade Desk Priority:</strong> +1 (504) 555-0187</div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print / Save RFQ Specimen
                </button>
                <button
                  onClick={() => {
                    onClearBasket();
                    onClose();
                  }}
                  className="px-5 py-2 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs rounded-lg transition-colors"
                >
                  Done & Return to Catalog
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions when on review step */}
        {step === 'review' && rfqItems.length > 0 && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
            >
              Continue Browsing
            </button>

            <button
              onClick={() => setStep('details')}
              className="px-6 py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs rounded-lg shadow-sm flex items-center gap-2 transition-all"
            >
              <span>Proceed to Freight & Contact Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
