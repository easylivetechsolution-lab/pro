import React, { useState } from 'react';
import {
  Shield,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Lock,
  Building2,
  Sparkles,
  ArrowRight,
  UserCheck,
} from 'lucide-react';
import type { Agent } from '../types';

interface ContactPageProps {
  onNavigateHome: () => void;
  agents: Agent[];
  onOpenConsultation: (agent: Agent | null) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigateHome,
  agents,
  onOpenConsultation,
}) => {
  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState('Acquisition Mandate');
  const [region, setRegion] = useState('Global / Multi-Region');
  const [budget, setBudget] = useState('$10,000,000 - $25,000,000');
  const [message, setMessage] = useState('');
  const [requireNda, setRequireNda] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const randomRef = `AUR-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedRef(randomRef);
    }, 1200);
  };

  const salons = [
    {
      city: 'Geneva',
      subtitle: 'Alpine & European Historic Bureau',
      address: 'Rue du Rhône 42, 1204 Genève',
      country: 'Switzerland',
      phone: '+41 22 819 9000',
      email: 'geneva@aureliaestates.com',
      hours: 'Mon – Fri: 08:30 – 19:00 CET',
    },
    {
      city: 'London',
      subtitle: 'Mayfair & Sovereign Lineage Salon',
      address: '14 Berkeley Square, London W1J 6AE',
      country: 'United Kingdom',
      phone: '+44 20 7946 0912',
      email: 'london@aureliaestates.com',
      hours: 'Mon – Fri: 09:00 – 18:30 GMT',
    },
    {
      city: 'New York',
      subtitle: 'North American Metro & Ranch Division',
      address: '767 Fifth Avenue, 48th Floor, New York, NY 10153',
      country: 'United States',
      phone: '+1 (212) 555-0198',
      email: 'newyork@aureliaestates.com',
      hours: 'Mon – Fri: 09:00 – 18:00 EST',
    },
    {
      city: 'St. Barts',
      subtitle: 'Caribbean Maritime & Private Cay Desk',
      address: 'Rue du Roi Oscar II, Gustavia 97133',
      country: 'St. Barthélemy',
      phone: '+1 (787) 555-0812',
      email: 'stbarts@aureliaestates.com',
      hours: 'Mon – Sat: 09:00 – 17:30 AST',
    },
    {
      city: 'Singapore',
      subtitle: 'Asia-Pacific Island Sanctuary Hub',
      address: 'Marina Bay Financial Centre, Tower 3, Singapore 018982',
      country: 'Singapore',
      phone: '+65 6789 2200',
      email: 'singapore@aureliaestates.com',
      hours: 'Mon – Fri: 09:00 – 19:00 SGT',
    },
  ];

  return (
    <div className="pt-28 pb-20 min-h-screen bg-[#0b0c0e] text-[#e8e6e3]">
      {/* Top Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-8">
        <div className="flex items-center space-x-2 text-xs text-[#8e95a5]">
          <button
            onClick={onNavigateHome}
            className="hover:text-[#d8b88a] transition-colors"
          >
            HOME
          </button>
          <span>/</span>
          <span className="text-[#d8b88a] font-medium tracking-wider">CONTACT ADVISORY</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-14 border-b border-[#1c1f2a]">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/30 text-[#d8b88a] text-[11px] tracking-[0.2em] uppercase font-semibold">
            <Lock className="w-3.5 h-3.5" />
            <span>Confidential Client Advisory</span>
          </div>

          <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-tight tracking-tight">
            Private Advisory & Global Enquiries
          </h1>

          <p className="text-base sm:text-lg text-[#9da3b4] font-light leading-relaxed pt-2">
            Direct communication channels for acquisition mandates, confidential property representation, and accredited access to off-market portfolios.
          </p>
        </div>
      </section>

      {/* Main Content: Enquiry Form & Fast Contact Strip */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Interactive Form */}
          <div className="lg:col-span-7 bg-[#12141c] border border-[#222634] rounded-2xl p-8 sm:p-10 shadow-2xl">
            {submittedRef ? (
              <div className="text-center py-12 space-y-6">
                <div className="w-16 h-16 rounded-full bg-[#c5a880]/15 border border-[#c5a880]/40 flex items-center justify-center mx-auto text-[#d8b88a]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] tracking-[0.25em] font-semibold text-[#c5a880] uppercase">
                    Mandate Lodged Successfully
                  </span>
                  <h3 className="font-serif-luxury text-3xl text-white font-light">
                    Confidential Receipt Confirmed
                  </h3>
                </div>

                <div className="bg-[#0b0c0e] border border-[#232736] rounded-lg p-6 max-w-md mx-auto text-left space-y-3">
                  <div className="flex justify-between items-center text-xs border-b border-[#1c1f2b] pb-2">
                    <span className="text-[#8e95a5]">Reference Dossier:</span>
                    <span className="font-mono text-[#d8b88a] font-medium">{submittedRef}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs border-b border-[#1c1f2b] pb-2">
                    <span className="text-[#8e95a5]">Client Contact:</span>
                    <span className="text-white">{fullName}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs border-b border-[#1c1f2b] pb-2">
                    <span className="text-[#8e95a5]">Advisory Scope:</span>
                    <span className="text-white">{inquiryType}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#8e95a5]">Confidentiality NDA:</span>
                    <span className="text-[#d8b88a] font-semibold">
                      {requireNda ? 'Executed & Required' : 'Standard Discretion'}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#9da3b4] max-w-md mx-auto leading-relaxed">
                  A Senior Partner from the appropriate regional desk will review your requirements under strict institutional protocol and initiate contact via secure line within 4 hours.
                </p>

                <button
                  onClick={() => {
                    setSubmittedRef(null);
                    setMessage('');
                  }}
                  className="px-6 py-2.5 bg-[#1e222d] hover:bg-[#282d3d] text-[#e8e6e3] text-xs font-medium tracking-wider rounded transition-colors"
                >
                  LODGE ANOTHER ENQUIRY
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="font-serif-luxury text-2xl sm:text-3xl text-white font-normal">
                    Lodge an Acquisition or Sale Mandate
                  </h2>
                  <p className="text-xs text-[#8e95a5] mt-1 font-light">
                    Fields marked with institutional confidentiality are handled under legal client discretion.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium tracking-wider text-[#b0b5c3] uppercase">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lord Harrison Sterling"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#0b0c0e] border border-[#262a38] focus:border-[#c5a880] rounded px-3.5 py-2.5 text-xs text-white placeholder-[#5a6072] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium tracking-wider text-[#b0b5c3] uppercase">
                      Confidential Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. principal@sterlingholding.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#0b0c0e] border border-[#262a38] focus:border-[#c5a880] rounded px-3.5 py-2.5 text-xs text-white placeholder-[#5a6072] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium tracking-wider text-[#b0b5c3] uppercase">
                      Telephone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+41 22 555 0199"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#0b0c0e] border border-[#262a38] focus:border-[#c5a880] rounded px-3.5 py-2.5 text-xs text-white placeholder-[#5a6072] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium tracking-wider text-[#b0b5c3] uppercase">
                      Nature of Enquiry
                    </label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full bg-[#0b0c0e] border border-[#262a38] focus:border-[#c5a880] rounded px-3.5 py-2.5 text-xs text-white focus:outline-none transition-colors"
                    >
                      <option value="Acquisition Mandate">Acquisition Mandate (Buying)</option>
                      <option value="Confidential Listing Representation">Confidential Listing Representation (Selling)</option>
                      <option value="Off-Market Private Collection Access">Off-Market Private Collection Access</option>
                      <option value="Private Island & Coastal Sovereign Haven">Private Island & Coastal Sovereign Haven</option>
                      <option value="Family Office Portfolio Consultation">Family Office Portfolio Consultation</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium tracking-wider text-[#b0b5c3] uppercase">
                      Target Region
                    </label>
                    <select
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="w-full bg-[#0b0c0e] border border-[#262a38] focus:border-[#c5a880] rounded px-3.5 py-2.5 text-xs text-white focus:outline-none transition-colors"
                    >
                      <option value="Global / Multi-Region">Global / Multi-Region</option>
                      <option value="Mediterranean & Southern Europe">Mediterranean & Southern Europe</option>
                      <option value="Caribbean & St. Barts">Caribbean & St. Barts</option>
                      <option value="North American Metros & Mountain West">North American Metros & Mountain West</option>
                      <option value="Swiss & Austrian Alps">Swiss & Austrian Alps</option>
                      <option value="Asia-Pacific Island Sanctuaries">Asia-Pacific Island Sanctuaries</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium tracking-wider text-[#b0b5c3] uppercase">
                      Capital Allocation Range
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full bg-[#0b0c0e] border border-[#262a38] focus:border-[#c5a880] rounded px-3.5 py-2.5 text-xs text-white focus:outline-none transition-colors"
                    >
                      <option value="$5,000,000 - $10,000,000">$5,000,000 – $10,000,000</option>
                      <option value="$10,000,000 - $25,000,000">$10,000,000 – $25,000,000</option>
                      <option value="$25,000,000 - $50,000,000">$25,000,000 – $50,000,000</option>
                      <option value="$50,000,000+">$50,000,000+ (Trophy / Sovereign Tier)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium tracking-wider text-[#b0b5c3] uppercase">
                    Confidential Brief / Specific Parameters
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Specify target specifications, e.g., deep-water dock accommodating 50m yacht, direct helipad access, contiguous land buffers, or timeline requirements..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#0b0c0e] border border-[#262a38] focus:border-[#c5a880] rounded px-3.5 py-2.5 text-xs text-white placeholder-[#5a6072] focus:outline-none transition-colors"
                  />
                </div>

                {/* NDA Requirement Checkbox */}
                <div className="flex items-start space-x-3 pt-2">
                  <input
                    type="checkbox"
                    id="nda-checkbox"
                    checked={requireNda}
                    onChange={(e) => setRequireNda(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-[#303546] bg-[#0b0c0e] text-[#c5a880] focus:ring-[#c5a880]"
                  />
                  <label htmlFor="nda-checkbox" className="text-xs text-[#9da3b4] font-light leading-relaxed cursor-pointer">
                    <strong className="text-white font-medium">Require Bilateral Non-Disclosure Agreement (NDA)</strong> before transmitting full architectural blueprints, property ownership identity, or off-market dossiers.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#c5a880] hover:bg-[#d8b88a] disabled:opacity-50 text-black font-semibold text-xs tracking-wider rounded transition-all flex items-center justify-center space-x-2 shadow-lg active:scale-[0.99]"
                >
                  {isSubmitting ? (
                    <span>DISPATCHING CONFIDENTIAL MANDATE...</span>
                  ) : (
                    <>
                      <span>TRANSMIT MANDATE TO SENIOR ADVISORY</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Direct Hotlines & Protocols */}
          <div className="lg:col-span-5 space-y-6">
            {/* Rapid Direct Channels */}
            <div className="bg-[#12141c] border border-[#222634] rounded-2xl p-7 space-y-6">
              <div className="space-y-1">
                <span className="text-[10.5px] font-semibold tracking-[0.2em] text-[#c5a880] uppercase">
                  Immediate Advisory
                </span>
                <h3 className="font-serif-luxury text-xl text-white">Central Advisory Desks</h3>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-start space-x-3.5 p-3.5 rounded-lg bg-[#0b0c0e] border border-[#1f2330]">
                  <Phone className="w-4 h-4 text-[#d8b88a] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#8e95a5] font-light">Global Confidential Hotline</p>
                    <a href="tel:+41228199000" className="text-sm font-medium text-white hover:text-[#d8b88a] transition-colors">
                      +41 22 819 9000
                    </a>
                    <p className="text-[10px] text-[#616777] mt-0.5">24/7 Monitored encrypted line</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 p-3.5 rounded-lg bg-[#0b0c0e] border border-[#1f2330]">
                  <Mail className="w-4 h-4 text-[#d8b88a] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#8e95a5] font-light">Institutional Advisory Email</p>
                    <a href="mailto:advisory@aureliaestates.com" className="text-sm font-medium text-white hover:text-[#d8b88a] transition-colors">
                      advisory@aureliaestates.com
                    </a>
                    <p className="text-[10px] text-[#616777] mt-0.5">PGP / S/MIME encryption enabled</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 p-3.5 rounded-lg bg-[#0b0c0e] border border-[#1f2330]">
                  <Shield className="w-4 h-4 text-[#d8b88a] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#8e95a5] font-light">Aviation & Deep-Water Concierge</p>
                    <p className="text-sm font-medium text-white">
                      marine.aviation@aureliaestates.com
                    </p>
                    <p className="text-[10px] text-[#616777] mt-0.5">Direct helipad and marina berths</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Advisory Protocol Box */}
            <div className="bg-gradient-to-br from-[#151821] to-[#101219] border border-[#262b3a] rounded-2xl p-7 space-y-4">
              <div className="flex items-center space-x-2 text-[#d8b88a] text-xs font-semibold tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>WHAT TO EXPECT</span>
              </div>
              <h4 className="font-serif-luxury text-lg text-white">The Aurelia Advisory Protocol</h4>
              <ul className="space-y-2.5 text-xs text-[#9da3b4] font-light leading-relaxed">
                <li className="flex items-start space-x-2">
                  <span className="text-[#c5a880] font-semibold">1.</span>
                  <span><strong>Direct Partner Assignment:</strong> Within 4 hours, a regional Senior Vice President is assigned to your brief.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#c5a880] font-semibold">2.</span>
                  <span><strong>NDA Execution:</strong> Standard bilateral non-disclosure agreement is exchanged via DocuSign or physical courier.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#c5a880] font-semibold">3.</span>
                  <span><strong>Encrypted Dossier Delivery:</strong> Access granted to verified floor plans, maritime surveys, and unlisted opportunities.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Global Salons Grid */}
      <section className="bg-[#0e1015] border-y border-[#1c1f2a] py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <p className="text-xs font-semibold tracking-[0.25em] text-[#c5a880] uppercase">Physical Presence</p>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-white font-light">
              Global Advisory Salons
            </h2>
            <p className="text-sm text-[#8e95a5] font-light">
              Appointments strictly by accredited invitation or advance reservation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {salons.map((salon, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-[#12141c] border border-[#222634] hover:border-[#c5a880]/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#1b1e2a]">
                    <span className="font-serif-luxury text-xl text-white font-medium">{salon.city}</span>
                    <span className="text-[10px] tracking-wider font-semibold uppercase px-2 py-0.5 rounded bg-[#c5a880]/15 text-[#d8b88a] border border-[#c5a880]/30">
                      {salon.country}
                    </span>
                  </div>

                  <p className="text-xs text-[#c5a880] font-medium mb-3">{salon.subtitle}</p>

                  <div className="space-y-2 text-xs text-[#8e95a5] font-light">
                    <p className="flex items-center space-x-2">
                      <MapPin className="w-3.5 h-3.5 text-[#636979] shrink-0" />
                      <span>{salon.address}</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <Phone className="w-3.5 h-3.5 text-[#636979] shrink-0" />
                      <a href={`tel:${salon.phone}`} className="hover:text-white transition-colors">{salon.phone}</a>
                    </p>
                    <p className="flex items-center space-x-2">
                      <Mail className="w-3.5 h-3.5 text-[#636979] shrink-0" />
                      <a href={`mailto:${salon.email}`} className="hover:text-white transition-colors">{salon.email}</a>
                    </p>
                    <p className="flex items-center space-x-2">
                      <Clock className="w-3.5 h-3.5 text-[#636979] shrink-0" />
                      <span>{salon.hours}</span>
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-5 border-t border-[#1b1e2a]">
                  <button
                    onClick={() => onOpenConsultation(null)}
                    className="w-full py-2 text-[11px] font-medium tracking-wider text-white hover:text-[#d8b88a] bg-[#1a1d26] hover:bg-[#222634] rounded transition-colors text-center"
                  >
                    SCHEDULE SALON MEETING
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Direct Senior Partner Directory */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-[0.25em] text-[#c5a880] uppercase">Direct Access</p>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-white font-light">
              Connect Directly with Regional Partners
            </h2>
          </div>
          <p className="text-xs text-[#8e95a5] max-w-md font-light">
            Select an advisor based on geographic focus or architectural asset class for direct consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="p-5 rounded-xl bg-[#12141c] border border-[#202432] hover:border-[#c5a880]/50 transition-all flex items-start space-x-4 group"
            >
              <img
                src={agent.photo}
                alt={agent.name}
                className="w-16 h-16 rounded-full object-cover border border-[#2d3244] group-hover:border-[#c5a880] transition-colors shrink-0"
              />
              <div className="flex-1 min-w-0 space-y-1">
                <h4 className="font-serif-luxury text-base text-white font-medium truncate">{agent.name}</h4>
                <p className="text-[11px] text-[#c5a880] font-light truncate">{agent.role}</p>
                <p className="text-[10px] text-[#787f90]">{agent.region}</p>
                <div className="pt-2 flex items-center space-x-3 text-xs">
                  <button
                    onClick={() => onOpenConsultation(agent)}
                    className="text-[10.5px] font-semibold text-[#d8b88a] hover:text-white transition-colors flex items-center space-x-1"
                  >
                    <span>Direct Briefing</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
