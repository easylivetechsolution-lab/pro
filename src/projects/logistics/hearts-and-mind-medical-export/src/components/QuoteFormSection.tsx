import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Send, 
  CheckCircle2, 
  Plane, 
  ArrowRight, 
  FileText,
  Clock,
  Sparkles
} from 'lucide-react';
import type { RFQItem } from '../types';

interface QuoteFormSectionProps {
  prefilledIncoterm?: string;
  rfqItems: RFQItem[];
  onSubmitSuccess: (refId: string) => void;
}

export const QuoteFormSection: React.FC<QuoteFormSectionProps> = ({
  prefilledIncoterm = 'CPT',
  rfqItems,
  onSubmitSuccess
}) => {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [preferredIncoterm, setPreferredIncoterm] = useState(prefilledIncoterm);
  const [destinationPort, setDestinationPort] = useState('');
  const [complianceReqs, setComplianceReqs] = useState<{ [key: string]: boolean }>({
    FDA: true,
    CE: true,
    ISO: true,
    Other: false
  });
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [institutionName, setInstitutionName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  // Sync prefilled incoterm
  useEffect(() => {
    if (prefilledIncoterm) {
      setPreferredIncoterm(prefilledIncoterm);
    }
  }, [prefilledIncoterm]);

  // If RFQ items exist, prefill product description
  useEffect(() => {
    if (rfqItems.length > 0 && !productName) {
      const summary = rfqItems.map(i => `${i.product.name} (Qty: ${i.quantity.toLocaleString()})`).join(', ');
      setProductName(summary);
      const totalUnits = rfqItems.reduce((acc, i) => acc + i.quantity, 0);
      setQuantity(`${totalUnits.toLocaleString()} units`);
    }
  }, [rfqItems]);

  const toggleCompliance = (key: string) => {
    setComplianceReqs(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const refId = `HMM-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedRef(refId);
      setIsSubmitting(false);
      onSubmitSuccess(refId);
    }, 800);
  };

  return (
    <section id="contact-section" className="py-20 bg-[#f8fafc] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold tracking-widest text-[#0284c7] uppercase">
            GET IN TOUCH
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b1b33] tracking-tight mt-1 mb-2">
            Request an Institutional Quote
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Tell us what you need, and our team will respond with a tailored quote and sourcing plan within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Corporate Coordinates matching screenshot */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="space-y-6 text-xs text-slate-600">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-sky-50 text-[#0284c7] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0b1b33] text-xs uppercase tracking-wider mb-1">
                      Corporate Address
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      123 Global Trade Blvd<br />
                      New Orleans, LA 70130, USA
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-sky-50 text-[#0284c7] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0b1b33] text-xs uppercase tracking-wider mb-1">
                      Email (Encrypted)
                    </h3>
                    <a 
                      href="mailto:info@heartsmindmedicalexport.com" 
                      className="text-[#0284c7] hover:underline break-all font-medium"
                    >
                      info@heartsmindmedicalexport.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-sky-50 text-[#0284c7] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0b1b33] text-xs uppercase tracking-wider mb-1">
                      Phone / WhatsApp
                    </h3>
                    <a 
                      href="tel:+15045550187" 
                      className="text-slate-800 font-bold hover:text-[#0284c7]"
                    >
                      +1 (504) 555-0187 <span className="text-[10px] text-emerald-600 font-medium">(Priority)</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Verified response time badge */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-500">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>Trade desk active 24/7 for urgent hospital tenders.</span>
              </div>
            </div>
          </div>

          {/* Middle Form: Institutional Request matching screenshot */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            {!submittedRef ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Row 1: Product & Quantity */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Product Name / Description *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Surgical Masks, Nitrile Gloves"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0284c7] text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Quantity Needed *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., 50,000 pcs"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0284c7] text-slate-800"
                    />
                  </div>
                </div>

                {/* Row 2: Destination & Incoterm */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Preferred Incoterm *
                    </label>
                    <select
                      value={preferredIncoterm}
                      onChange={(e) => setPreferredIncoterm(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0284c7] text-slate-800 font-medium"
                    >
                      <option value="CPT">CPT - Carriage Paid To (Recommended)</option>
                      <option value="FOB">FOB - Free On Board</option>
                      <option value="CIF">CIF - Cost, Insurance and Freight</option>
                      <option value="DDP">DDP - Delivered Duty Paid</option>
                      <option value="EXW">EXW - Ex Works</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Destination Port / Country *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Port of New Orleans / Rotterdam"
                      value={destinationPort}
                      onChange={(e) => setDestinationPort(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0284c7] text-slate-800"
                    />
                  </div>
                </div>

                {/* Row 3: Institution & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Hospital / Institution Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., St. Jude Regional Healthcare"
                      value={institutionName}
                      onChange={(e) => setInstitutionName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0284c7] text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Official Contact Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="procurement@hospital.org"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0284c7] text-slate-800"
                    />
                  </div>
                </div>

                {/* Compliance Requirements Checkboxes matching screenshot */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Compliance Requirements
                  </label>
                  <div className="flex flex-wrap items-center gap-4">
                    {['FDA', 'CE', 'ISO', 'Other'].map((item) => (
                      <label key={item} className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 font-medium">
                        <input
                          type="checkbox"
                          checked={!!complianceReqs[item]}
                          onChange={() => toggleCompliance(item)}
                          className="w-4 h-4 rounded text-[#0284c7] focus:ring-[#0284c7] border-slate-300"
                        />
                        <span>{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Additional Details */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Additional Details / Special Instructions *
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Specify sterile requirements, target arrival date, packaging sizes, or customs inspection preferences..."
                    value={additionalDetails}
                    onChange={(e) => setAdditionalDetails(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0284c7] text-slate-800"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#0b1b33] hover:bg-[#122849] text-white font-bold text-sm rounded-lg shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Transmitting RFQ to Trade Desk...</span>
                  ) : (
                    <>
                      <span>Submit Quote Request</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="py-8 text-center">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-[#0b1b33] mb-1">
                  Institutional RFQ Dispatched
                </h3>
                <p className="text-xs font-mono font-bold text-[#0284c7] mb-4">
                  Official Reference: {submittedRef}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto mb-6">
                  Thank you, <strong>{institutionName}</strong>. Hearts and Mind Medical Export LLC has registered your procurement requirements under <strong>{preferredIncoterm}</strong> freight terms.
                </p>

                <div className="bg-slate-50 rounded-xl p-4 text-xs text-left text-slate-700 border border-slate-200 mb-6 space-y-1">
                  <div><strong>Dest. Port:</strong> {destinationPort}</div>
                  <div><strong>Items:</strong> {productName}</div>
                  <div><strong>Est. Response:</strong> Within 24 hours to {contactEmail}</div>
                </div>

                <button
                  onClick={() => setSubmittedRef(null)}
                  className="px-6 py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white font-semibold text-xs rounded-lg transition-colors"
                >
                  Submit Another Quote
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Global Reach Card matching screenshot */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl overflow-hidden relative border border-slate-800 bg-[#0b1b33] text-white p-6 sm:p-7 shadow-lg min-h-[380px] flex flex-col justify-between">
              {/* Background image of jetliner soaring */}
              <div 
                className="absolute inset-0 opacity-30 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=800&q=80')`
                }}
              />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6">
                  <Plane className="w-5 h-5 text-cyan-400 rotate-45" />
                </div>

                <h3 className="text-2xl font-black text-white tracking-tight mb-2 leading-tight">
                  Global Reach.<br />Local Support.
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  Your trusted partner for medical supplies and international trade logistics.
                </p>
              </div>

              <div className="relative z-10 pt-4 border-t border-white/10">
                <a
                  href="tel:+15045550187"
                  className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-2 border border-white/20"
                >
                  <span>Contact Us Today</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
