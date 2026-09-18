import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Building,
  Globe2,
  Ship,
  Sparkles,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { FARM_ESTATES } from '../data';

export const ContactPage: React.FC = () => {
  const [inquiryType, setInquiryType] = useState('wholesale');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    commodity: 'Citrus & Fruits',
    volume: '1-3 Ocean Reefer Containers (40ft)',
    destinationPort: 'Rotterdam (NLRTM)',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const offices = [
    {
      title: 'Global Commercial & Logistics HQ',
      address: '742 Harbor Promenade, Suite 1200, San Diego, CA 92101, USA',
      phone: '+1 (800) 492-3848 / +1 (619) 555-0192',
      email: 'global-trade@agrifuturefarms.com',
      hours: 'Mon – Fri: 06:00 – 19:00 PST (Continuous Dispatch Desk)',
      type: 'Maritime & Global Air Freight Operations',
    },
    {
      title: 'European Logistics Hub',
      address: 'Maasvlakte Distribution Park 44, 3199 LK Rotterdam, Netherlands',
      phone: '+31 (0) 10 798 4200',
      email: 'rotterdam-port@agrifuturefarms.com',
      hours: 'Mon – Sat: 07:00 – 20:00 CET',
      type: 'Cold-Chain Receiving & EU Cross-Docking',
    },
    {
      title: 'Asia-Pacific Regional Desk',
      address: 'Marina Bay Financial Centre Tower 2, Singapore 018983',
      phone: '+65 6712 8890',
      email: 'apac-orders@agrifuturefarms.com',
      hours: 'Mon – Fri: 08:30 – 18:30 SGT',
      type: 'Direct Importer & Wholesale Partnerships',
    },
  ];

  const faqs = [
    {
      q: 'What is your minimum wholesale order volume for international export?',
      a: 'For ocean freight, our standard baseline order is one 40ft High-Cube Controlled Atmosphere Reefer container (approx. 20–24 metric tons depending on the commodity). For high-brix berries and specialty tree fruit via air freight, we accommodate palletized orders from 1,200 kg.',
    },
    {
      q: 'How do you guarantee cold-chain temperature integrity during ocean transit?',
      a: 'Every container is sealed at our on-farm packing facilities with dual satellite IoT data loggers. These transmit temperature, relative humidity, oxygen, and carbon dioxide levels in real time throughout the sea voyage. Any thermal deviation triggers automated alerts before container discharge.',
    },
    {
      q: 'Can we visit the farm estates and inspect the living soil practices firsthand?',
      a: 'Yes. We host bi-annual Agronomy Field Days for commercial buyers, chefs, and research institutions across our Green Valley and Highland Terroir estates. Please select "Estate Farm Tour" on the contact form to arrange accreditation.',
    },
    {
      q: 'Are all shipments backed by multi-residue pesticide laboratory certificates?',
      a: 'Yes. Every lot is accompanied by ISO 17025 accredited chromatography lab certificates confirming zero detectable synthetic pesticide, herbicide, or fungicide residues.',
    },
  ];

  return (
    <div className="pt-24 pb-20 bg-[#061810] text-white min-h-screen">
      {/* 1. Hero Banner */}
      <section className="relative py-16 sm:py-24 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className="text-[#34d399] text-xs sm:text-sm font-semibold tracking-widest uppercase block">
              GLOBAL CONTACT & DISPATCH
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white font-serif leading-[1.1]">
              Let's Cultivate Something <br />
              <span className="text-[#dfc599]">Extraordinary Together.</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed pt-2">
              Connect with our international commercial wholesale desk, schedule an agronomy estate tour, or request custom cold-chain export specifications.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Contact Form & Direct Channels */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Interactive Form */}
          <div className="lg:col-span-7 bg-[#071f14] p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl">
            <div className="mb-8 space-y-2">
              <span className="text-xs font-mono text-[#dfc599] uppercase tracking-wider">
                COMMERCIAL & GENERAL INQUIRIES
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif">
                Send a Message to Our Desk
              </h2>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white font-serif">Inquiry Successfully Transmitted</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Our Global Commercial Desk has received your inquiry for <strong>{formData.commodity}</strong> and will contact you within 4 business hours with certified specs and pricing.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-full bg-[#dfc599] text-[#091f13] text-xs font-bold uppercase tracking-wider"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Inquiry Type Tabs */}
                <div>
                  <label className="block text-xs font-mono text-gray-300 uppercase tracking-wider mb-2">
                    Inquiry Category
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'wholesale', label: 'Wholesale Export' },
                      { id: 'agronomy', label: 'Agronomy / Tech' },
                      { id: 'visit', label: 'Farm Tour' },
                      { id: 'general', label: 'General / Press' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setInquiryType(tab.id)}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
                          inquiryType === tab.id
                            ? 'bg-[#dfc599] text-[#091f13] font-bold shadow-md'
                            : 'bg-[#05180f] text-gray-300 hover:bg-[#082215] border border-white/10'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-300 mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Marcus Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#05180f] border border-white/15 focus:border-[#dfc599] text-sm text-white placeholder-gray-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-300 mb-1.5">Company / Organization *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Global Produce Ltd"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#05180f] border border-white/15 focus:border-[#dfc599] text-sm text-white placeholder-gray-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-300 mb-1.5">Work Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="procurement@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#05180f] border border-white/15 focus:border-[#dfc599] text-sm text-white placeholder-gray-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-300 mb-1.5">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 019-2834"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#05180f] border border-white/15 focus:border-[#dfc599] text-sm text-white placeholder-gray-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Commodity & Volume Selection (if wholesale) */}
                {inquiryType === 'wholesale' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-[#05180f] border border-white/10">
                    <div>
                      <label className="block text-xs text-emerald-400 font-mono mb-1.5">Crop Commodity</label>
                      <select
                        value={formData.commodity}
                        onChange={(e) => setFormData({ ...formData, commodity: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#082216] border border-white/15 text-sm text-white focus:outline-none"
                      >
                        <option>Citrus & Oranges (Cara Cara, Navel)</option>
                        <option>Tree Fruits & Avocados (Hass Estate)</option>
                        <option>Premium Berries (Ruby Strawberries, Blueberries)</option>
                        <option>Heirloom Obsidian Tomatoes</option>
                        <option>Ancient Grains (Golden Durum, Einkorn)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-emerald-400 font-mono mb-1.5">Estimated Volume</label>
                      <select
                        value={formData.volume}
                        onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#082216] border border-white/15 text-sm text-white focus:outline-none"
                      >
                        <option>Sample Pallet (500kg - 1,200kg Air)</option>
                        <option>1-3 Ocean Reefer Containers (40ft)</option>
                        <option>4-10 Ocean Reefer Containers (Seasonal Contract)</option>
                        <option>Full Season Annual Program (20+ Containers)</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Message */}
                <div>
                  <label className="block text-xs text-gray-300 mb-1.5">Detailed Requirements / Port of Destination</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Specify delivery timeline, packing preferences (bulk vs retail clamshells), or agronomy queries..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#05180f] border border-white/15 focus:border-[#dfc599] text-sm text-white placeholder-gray-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-full bg-[#dfc599] hover:bg-[#e8d5b2] text-[#091f13] text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Inquiry to Export Desk</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Global Office Cards & Contact Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-mono text-[#dfc599] uppercase tracking-wider block">
                DIRECT REGIONAL DESKS
              </span>
              <h2 className="text-2xl font-bold text-white font-serif">
                Continuous Operations & Export Desks
              </h2>
            </div>

            <div className="space-y-4">
              {offices.map((office, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#071f14] border border-white/10 space-y-3 shadow-lg"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-bold text-white font-serif">{office.title}</h3>
                    <span className="text-[10px] font-mono text-emerald-400 bg-[#05180f] px-2 py-0.5 rounded border border-[#22c55e]/30">
                      {office.type}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs text-gray-300 pt-1">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#dfc599] flex-shrink-0 mt-0.5" />
                      <span>{office.address}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{office.phone}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" />
                      <span>{office.email}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span>{office.hours}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Frequently Asked Questions Accordion */}
      <section className="py-16 bg-[#04120a] border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <span className="text-[#34d399] text-xs sm:text-sm font-semibold tracking-widest uppercase block">
              COMMON INQUIRIES
            </span>
            <h2 className="text-3xl font-bold text-white font-serif">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-300 text-sm">
              Answers regarding international delivery, cold chains, certifications, and private farm tours.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#071f14] border border-white/10 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-base font-bold text-white font-serif">{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#dfc599] flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
