import React, { useState } from 'react';
import {
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { FAQS } from '../data';
import faqBgImage from '../assets/images/faq_farm_panoramic_1789618860306.jpg';

interface FaqAndContactProps {
  onSuccessSubmit: () => void;
}

export const FaqAndContact: React.FC<FaqAndContactProps> = ({ onSuccessSubmit }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    inquiryType: 'Wholesale & Forward Contracts',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      onSuccessSubmit();
      setFormData({
        name: '',
        email: '',
        company: '',
        inquiryType: 'Wholesale & Forward Contracts',
        message: '',
      });
      setTimeout(() => setSubmitted(false), 6000);
    }, 800);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#041009] text-white relative overflow-hidden border-t border-[#c39953]/15">
      {/* Background Farmland Landscape Image - High Clarity */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src={faqBgImage}
          alt="Expansive organic farmland and crop fields"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-[1.02] transition-transform duration-1000"
        />
        {/* Balanced tint overlay: preserves bright, sharp details of crop rows, silos, and daylight sky */}
        <div className="absolute inset-0 bg-[#020b06]/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#041009]/80 via-transparent to-[#030c07]/90" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: FAQs */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <h2
                id="faq-heading"
                className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-serif"
              >
                Common Questions
              </h2>

              <p className="text-sm text-gray-300 leading-relaxed">
                Find answers to the most frequently asked questions about our farms, products,
                traceability, exports and wholesale partnerships.
              </p>
            </div>

            {/* Accordion List */}
            <div className="space-y-3 pt-2">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={faq.q}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden backdrop-blur-md ${
                      isOpen
                        ? 'bg-[#092217]/95 border-[#c39953]/50 shadow-md'
                        : 'bg-[#071911]/85 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-3 focus:outline-none"
                    >
                      <span className="text-xs sm:text-sm font-semibold text-white">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#d8b06d] transition-transform duration-300 flex-shrink-0 ${
                          isOpen ? 'transform rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs text-gray-300 leading-relaxed border-t border-white/5 pt-2">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Contact Inquiry & Partnership Form */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <h2
                id="contact-form-heading"
                className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-serif"
              >
                Let's Grow Something
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f0e6d2] to-[#d8b06d]">
                  Extraordinary.
                </span>
              </h2>

              <p className="text-sm text-gray-300 leading-relaxed">
                Partner with us for premium products, global export opportunities and a sustainable tomorrow.
              </p>
            </div>

            {/* Direct Contact Info Icons Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              <div className="p-3.5 rounded-2xl bg-[#092217] border border-white/10 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#133d28] flex items-center justify-center text-[#34d399] flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-gray-400 uppercase block font-semibold">Call Us</span>
                  <span className="text-xs font-mono text-white font-medium truncate block">+1 (555) 012-4567</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#092217] border border-white/10 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#133d28] flex items-center justify-center text-[#d8b06d] flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-gray-400 uppercase block font-semibold">Email Us</span>
                  <span className="text-xs font-mono text-white font-medium truncate block">hello@agrifuture.com</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#092217] border border-white/10 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#133d28] flex items-center justify-center text-[#38bdf8] flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-gray-400 uppercase block font-semibold">Visit Us</span>
                  <span className="text-xs text-white font-medium truncate block">123 Farm Lane, Green Valley</span>
                </div>
              </div>
            </div>

            {/* Interactive Form */}
            <form
              id="partner-inquiry-form"
              onSubmit={handleSubmit}
              className="p-6 rounded-3xl bg-[#071911]/90 backdrop-blur-md border border-[#22c55e]/30 shadow-2xl space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Marcus Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#041009] border border-white/15 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c39953]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. marcus@globalimports.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#041009] border border-white/15 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c39953]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Company / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pacific Harvest Foods"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#041009] border border-white/15 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c39953]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Inquiry Scope
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#041009] border border-white/15 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#c39953]"
                  >
                    <option value="Wholesale & Forward Contracts">Wholesale & Forward Contracts</option>
                    <option value="Export & Intermodal Logistics">Export & Intermodal Logistics</option>
                    <option value="Farm Estate Site Visit">Farm Estate Site Visit</option>
                    <option value="Technology & Data Integration">Technology & Data Integration</option>
                    <option value="Agronomic Research Partnership">Agronomic Research Partnership</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Message / Commodity Requirements
                </label>
                <textarea
                  rows={3}
                  placeholder="Detail volume requirements, crop varieties, destination ports or timeline..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#041009] border border-white/15 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c39953]"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-[11px] text-gray-400">
                  Phytosanitary documentation & NDA provided upon initial contact.
                </p>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-[#d8b06d] to-[#c39953] hover:from-[#e3c185] hover:to-[#cca35c] text-[#041009] text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span>Transmitting...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

              {submitted && (
                <div className="p-3 rounded-xl bg-emerald-950/80 border border-[#22c55e] text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
                  <span>Inquiry transmitted successfully. An AgriFuture agronomist or export director will contact you within 24 hours.</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
