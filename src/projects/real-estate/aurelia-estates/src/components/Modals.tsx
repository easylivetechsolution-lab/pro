import React, { useState } from 'react';
import {
  X,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Calendar,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Search,
} from 'lucide-react';
import type { Property, Agent, JournalArticle, Currency } from '../types';
import { CURRENCY_RATES, AGENTS_DATA } from '../data/estatesData';

// --- 1. PROPERTY DETAIL MODAL ---
interface PropertyModalProps {
  property: Property | null;
  currentCurrency: Currency;
  onClose: () => void;
  onBookViewing: (property: Property, agent: Agent | undefined) => void;
}

export const PropertyDetailModal: React.FC<PropertyModalProps> = ({
  property,
  currentCurrency,
  onClose,
  onBookViewing,
}) => {
  if (!property) return null;

  const [activeImage, setActiveImage] = useState<string>(property.image);
  const allImages = [property.image, ...(property.additionalImages || [])];

  const rateInfo = CURRENCY_RATES[currentCurrency] || CURRENCY_RATES['USD'];
  const formattedPrice = `${rateInfo.symbol}${Math.round(property.price * rateInfo.rate).toLocaleString()}`;

  const assignedAgent = AGENTS_DATA.find((a) => a.id === property.agentId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#111319] border border-[#272b38] rounded-xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#212532] bg-[#0e1015]">
          <div className="flex items-center space-x-3">
            <span className="px-2.5 py-0.5 text-[10px] uppercase font-semibold tracking-wider bg-[#c5a880]/15 text-[#d8b88a] rounded border border-[#c5a880]/30">
              {property.status}
            </span>
            <span className="text-xs text-[#8e95a5]">{property.type}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#8e95a5] hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Main Photo & Thumbnail Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden bg-[#181a24]">
              <img
                src={activeImage}
                alt={property.title}
                className="w-full h-full object-cover transition-all duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-4 py-2 rounded border border-white/10">
                <span className="text-xs text-[#9ba2b3] uppercase tracking-wider block">Listing Price</span>
                <span className="text-2xl font-serif-luxury font-medium text-[#e8d5b5]">
                  {formattedPrice}
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-24 h-16 rounded overflow-hidden shrink-0 border-2 transition-all ${
                      activeImage === img ? 'border-[#c5a880]' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Stats */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#212532] pb-5">
            <div>
              <h2 className="font-serif-luxury text-3xl md:text-4xl text-white font-normal">
                {property.title}
              </h2>
              <div className="flex items-center space-x-2 text-sm text-[#c5c9d4] mt-1">
                <MapPin className="w-4 h-4 text-[#c5a880]" />
                <span>{property.location}</span>
              </div>
            </div>

            <div className="flex items-center space-x-6 text-sm text-[#9da4b4] bg-[#0c0d12] px-5 py-3 rounded-lg border border-[#1e222d]">
              <div className="flex items-center gap-2">
                <Bed className="w-4 h-4 text-[#c5a880]" />
                <span className="text-white font-medium">{property.beds} Beds</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="w-4 h-4 text-[#c5a880]" />
                <span className="text-white font-medium">{property.baths} Baths</span>
              </div>
              <div className="flex items-center gap-2">
                <Maximize2 className="w-4 h-4 text-[#c5a880]" />
                <span className="text-white font-medium">{property.sqFt.toLocaleString()} Sq Ft</span>
              </div>
            </div>
          </div>

          {/* Architectural Description */}
          <div className="space-y-2">
            <h3 className="text-xs uppercase font-semibold tracking-wider text-[#c5a880]">
              Architectural Overview
            </h3>
            <p className="text-sm text-[#a3aab9] leading-relaxed font-light">
              {property.description}
            </p>
          </div>

          {/* Luxury Features List */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase font-semibold tracking-wider text-[#c5a880]">
              Estate Signatures & Amenities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {property.features.map((feat, i) => (
                <div key={i} className="flex items-center space-x-2.5 text-xs text-[#d1d5db] bg-[#14161f] p-2.5 rounded border border-[#222633]">
                  <ShieldCheck className="w-4 h-4 text-[#c5a880] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Assigned Agent Contact Card */}
          {assignedAgent && (
            <div className="p-4 bg-[#0d0e13] rounded-lg border border-[#212430] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3.5">
                <img
                  src={assignedAgent.photo}
                  alt={assignedAgent.name}
                  className="w-12 h-12 rounded-full object-cover border border-[#c5a880]"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-serif-luxury text-lg text-white font-medium">{assignedAgent.name}</h4>
                  <p className="text-xs text-[#8e95a5]">{assignedAgent.role}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <a
                  href={`tel:${assignedAgent.phone.replace(/\s+/g, '')}`}
                  className="flex-1 sm:flex-none px-3.5 py-2 text-xs bg-[#171a23] hover:bg-[#202431] text-[#c5c9d4] rounded border border-[#282c3a] flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>Call Agent</span>
                </a>
                <button
                  onClick={() => onBookViewing(property, assignedAgent)}
                  className="flex-1 sm:flex-none px-5 py-2 text-xs font-semibold bg-[#c5a880] hover:bg-[#d8b88a] text-black rounded tracking-wider flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>SCHEDULE VIEWING</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- 2. AGENT CONSULTATION & VIEWING MODAL ---
interface ConsultationModalProps {
  agent?: Agent | null;
  property?: Property | null;
  onClose: () => void;
}

export const AgentConsultationModal: React.FC<ConsultationModalProps> = ({
  agent,
  property,
  onClose,
}) => {
  const [selectedAgent, setSelectedAgent] = useState<Agent>(agent || AGENTS_DATA[0]);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredMethod, setPreferredMethod] = useState<'PHONE' | 'VIDEO' | 'IN_PERSON'>('PHONE');
  const [preferredDate, setPreferredDate] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#111319] border border-[#272b38] rounded-xl shadow-2xl p-6 md:p-8 my-auto max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-[#8e95a5] hover:text-white rounded-full hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold tracking-[0.25em] text-[#c5a880] uppercase">
                PRIVATE ADVISORY
              </span>
              <h2 className="font-serif-luxury text-3xl text-white font-normal">
                Schedule a Confidential Consultation
              </h2>
              <p className="text-xs text-[#8e95a5] font-light">
                {property
                  ? `Inquiring on ${property.title} with designated broker.`
                  : 'Direct one-on-one session with our senior property advisors.'}
              </p>
            </div>

            {/* Selected Advisor Card */}
            <div className="p-3.5 bg-[#0e1015] rounded-lg border border-[#20232f] flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={selectedAgent.photo}
                  alt={selectedAgent.name}
                  className="w-11 h-11 rounded-full object-cover border border-[#c5a880]"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-serif-luxury text-base text-white">{selectedAgent.name}</h4>
                  <p className="text-[11px] text-[#8e95a5]">{selectedAgent.role}</p>
                </div>
              </div>

              {!agent && (
                <select
                  value={selectedAgent.id}
                  onChange={(e) => {
                    const found = AGENTS_DATA.find((a) => a.id === e.target.value);
                    if (found) setSelectedAgent(found);
                  }}
                  className="bg-[#171a23] text-xs text-[#c5c9d4] border border-[#2b303d] rounded px-2.5 py-1.5 focus:outline-none"
                >
                  {AGENTS_DATA.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name} ({a.region.split('&')[0]})
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Client Input Fields */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-[#9aa1b0] uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lord Harrington / Alexander Reed"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#151720] border border-[#272b38] rounded px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#c5a880]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#9aa1b0] uppercase tracking-wider mb-1">
                    Confidential Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@familyoffice.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#151720] border border-[#272b38] rounded px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#9aa1b0] uppercase tracking-wider mb-1">
                    Direct Phone / Signal
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#151720] border border-[#272b38] rounded px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
              </div>

              {/* Consultation Format */}
              <div>
                <label className="block text-xs text-[#9aa1b0] uppercase tracking-wider mb-1.5">
                  Consultation Format
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'PHONE', label: 'Direct Call' },
                    { id: 'VIDEO', label: 'Encrypted Video' },
                    { id: 'IN_PERSON', label: 'Private Walkthrough' },
                  ].map((fmt) => (
                    <button
                      type="button"
                      key={fmt.id}
                      onClick={() => setPreferredMethod(fmt.id as any)}
                      className={`py-2 px-2 rounded border text-center transition-colors ${
                        preferredMethod === fmt.id
                          ? 'bg-[#c5a880]/20 border-[#c5a880] text-[#d8b88a] font-semibold'
                          : 'bg-[#151720] border-[#252834] text-[#8e95a5]'
                      }`}
                    >
                      {fmt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#9aa1b0] uppercase tracking-wider mb-1">
                  Preferred Date & Time Window
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full bg-[#151720] border border-[#272b38] rounded px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#c5a880]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#9aa1b0] uppercase tracking-wider mb-1">
                  Asset Requirements / Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Target regions, budget envelope, or special security mandates..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#151720] border border-[#272b38] rounded px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#c5a880]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#c5a880] hover:bg-[#d8b88a] text-black font-semibold text-xs tracking-[0.2em] rounded transition-all flex items-center justify-center space-x-2"
            >
              <span>REQUEST CONFIDENTIAL APPOINTMENT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 bg-[#c5a880]/15 text-[#d8b88a] rounded-full flex items-center justify-center mx-auto border border-[#c5a880]/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif-luxury text-3xl text-white font-medium">
              Consultation Requested
            </h3>
            <p className="text-xs text-[#a1a8b8] max-w-md mx-auto leading-relaxed">
              Thank you, <span className="text-white font-semibold">{fullName}</span>. Your inquiry has been routed privately to{' '}
              <span className="text-[#d8b88a] font-semibold">{selectedAgent.name}</span>. An encrypted calendar invitation and direct callback will be dispatched within 2 hours.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#171a23] hover:bg-[#222634] text-white text-xs tracking-wider rounded border border-[#2a2e3d]"
              >
                CLOSE WINDOW
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- 3. PRIVATE COLLECTION ACCESS MODAL ---
interface PrivateCollectionModalProps {
  onClose: () => void;
}

export const PrivateCollectionModal: React.FC<PrivateCollectionModalProps> = ({ onClose }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [repName, setRepName] = useState('');
  const [clientType, setClientType] = useState('Family Office Principal');
  const [ndaAccepted, setNdaAccepted] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#111319] border border-[#272b38] rounded-xl shadow-2xl p-7 my-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-[#8e95a5] hover:text-white rounded-full hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 1 ? (
          <div className="space-y-5">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-[#c5a880]">
                <Lock className="w-4 h-4" />
                <span className="text-[10px] font-semibold tracking-[0.25em] uppercase">
                  CONFIDENTIAL REGISTRY
                </span>
              </div>
              <h2 className="font-serif-luxury text-3xl text-white font-normal">
                Off-Market Access Dossier
              </h2>
              <p className="text-xs text-[#9aa1b0] leading-relaxed">
                Access to the Aurelia Estates Off-Market Vault is restricted to accredited principals, sovereign funds, and certified family offices under unilateral NDA.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs text-[#9aa1b0] uppercase mb-1">Principal or Legal Entity</label>
                <input
                  type="text"
                  placeholder="e.g. Meridian Heritage Trust / Principal"
                  value={repName}
                  onChange={(e) => setRepName(e.target.value)}
                  className="w-full bg-[#151720] border border-[#272b38] rounded px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#c5a880]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#9aa1b0] uppercase mb-1">Entity Classification</label>
                <select
                  value={clientType}
                  onChange={(e) => setClientType(e.target.value)}
                  className="w-full bg-[#151720] border border-[#272b38] rounded px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#c5a880]"
                >
                  <option value="Family Office Principal">Family Office Principal</option>
                  <option value="Private Ultra-High-Net-Worth Individual">Private UHNW Individual</option>
                  <option value="Institutional Wealth Manager">Institutional Wealth Manager</option>
                  <option value="Legal Representative / Attorney">Legal Representative / Attorney</option>
                </select>
              </div>

              <div className="p-3 bg-[#0c0d12] rounded border border-[#20232e] text-[11.5px] text-[#8e95a5] space-y-2">
                <p className="font-medium text-white">Unilateral Non-Disclosure Agreement (Aurelia Protocol)</p>
                <p className="text-[11px] leading-relaxed">
                  By checking below, you agree that all dossiers, satellite coordinates, aerial surveys, and ownership lineages remain strictly confidential and privileged.
                </p>
                <label className="flex items-center space-x-2.5 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={ndaAccepted}
                    onChange={(e) => setNdaAccepted(e.target.checked)}
                    className="accent-[#c5a880]"
                  />
                  <span className="text-white text-xs font-medium">I accept the terms of the Non-Disclosure Agreement</span>
                </label>
              </div>
            </div>

            <button
              disabled={!ndaAccepted || !repName}
              onClick={() => setStep(2)}
              className="w-full py-3.5 bg-[#c5a880] disabled:bg-[#323642] disabled:text-[#6f7584] hover:bg-[#d8b88a] text-black font-semibold text-xs tracking-[0.2em] rounded transition-all flex items-center justify-center space-x-2"
            >
              <span>ACCESS THE PRIVATE COLLECTION</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 bg-[#c5a880]/15 text-[#d8b88a] rounded-full flex items-center justify-center mx-auto border border-[#c5a880]/30">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="font-serif-luxury text-3xl text-white font-medium">
              Accreditation Granted
            </h3>
            <p className="text-xs text-[#a1a8b8] max-w-sm mx-auto leading-relaxed">
              Your credentials for <span className="text-white font-semibold">{repName}</span> have been verified. You now have encrypted clearance to view 18 off-market residences.
            </p>
            <div className="pt-2">
              <button
                onClick={onClose}
                className="w-full py-3 bg-[#c5a880] text-black font-semibold text-xs tracking-wider rounded"
              >
                ENTER PRIVATE VAULT
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- 4. GLOBAL SEARCH MODAL ---
interface SearchModalProps {
  properties: Property[];
  agents: Agent[];
  currentCurrency: Currency;
  onClose: () => void;
  onSelectProperty: (prop: Property) => void;
  onSelectAgent: (agent: Agent) => void;
}

export const GlobalSearchModal: React.FC<SearchModalProps> = ({
  properties,
  agents,
  currentCurrency,
  onClose,
  onSelectProperty,
  onSelectAgent,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const rateInfo = CURRENCY_RATES[currentCurrency] || CURRENCY_RATES['USD'];

  const filteredProps = properties.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAgents = agents.filter(
    (a) =>
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-20 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#111319] border border-[#272b38] rounded-xl shadow-2xl p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-[#212532] pb-4">
          <div className="flex items-center space-x-3 w-full pr-4">
            <Search className="w-5 h-5 text-[#c5a880] shrink-0" />
            <input
              type="text"
              autoFocus
              placeholder="Search estates, locations (Santorini, Bali, Aspen), or advisors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent text-sm md:text-base text-white focus:outline-none placeholder-[#6b7280]"
            />
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#8e95a5] hover:text-white rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-1">
          {/* Properties Section */}
          <div className="space-y-2">
            <h4 className="text-[11px] uppercase tracking-wider font-semibold text-[#c5a880]">
              Estates ({filteredProps.length})
            </h4>
            {filteredProps.length === 0 ? (
              <p className="text-xs text-[#717787]">No estates found.</p>
            ) : (
              <div className="space-y-2">
                {filteredProps.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onSelectProperty(p);
                      onClose();
                    }}
                    className="p-2.5 rounded-lg bg-[#151720] hover:bg-[#1f222e] border border-[#232733] cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-12 h-10 object-cover rounded"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="text-sm font-medium text-white">{p.title}</p>
                        <p className="text-xs text-[#8e95a5]">{p.location}</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-[#d8b88a]">
                      {rateInfo.symbol}{Math.round(p.price * rateInfo.rate).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Advisors Section */}
          <div className="space-y-2 border-t border-[#212532] pt-4">
            <h4 className="text-[11px] uppercase tracking-wider font-semibold text-[#c5a880]">
              Advisors & Agents ({filteredAgents.length})
            </h4>
            {filteredAgents.length === 0 ? (
              <p className="text-xs text-[#717787]">No advisors found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredAgents.map((a) => (
                  <div
                    key={a.id}
                    onClick={() => {
                      onSelectAgent(a);
                      onClose();
                    }}
                    className="p-2.5 rounded-lg bg-[#151720] hover:bg-[#1f222e] border border-[#232733] cursor-pointer flex items-center space-x-3 transition-colors"
                  >
                    <img
                      src={a.photo}
                      alt={a.name}
                      className="w-10 h-10 object-cover rounded-full border border-[#c5a880]/60"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-white truncate">{a.name}</p>
                      <p className="text-[11px] text-[#8e95a5] truncate">{a.role.split(',')[0]}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 5. JOURNAL ARTICLE MODAL ---
interface ArticleModalProps {
  article: JournalArticle | null;
  onClose: () => void;
}

export const JournalArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#111319] border border-[#272b38] rounded-xl shadow-2xl p-6 md:p-8 my-auto max-h-[92vh] overflow-y-auto space-y-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-[#8e95a5] hover:text-white rounded-full hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-[10.5px] font-semibold tracking-wider text-[#c5a880] uppercase">
            <span>{article.category}</span>
            <span>•</span>
            <span className="text-[#8e95a5]">{article.date}</span>
          </div>

          <h2 className="font-serif-luxury text-3xl md:text-4xl text-white font-normal leading-tight">
            {article.title}
          </h2>

          <p className="text-xs md:text-sm text-[#9da4b4] italic font-light">
            {article.excerpt}
          </p>
        </div>

        <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-[#232733]">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="prose prose-invert max-w-none text-xs md:text-sm text-[#b5bbc7] leading-relaxed space-y-4 whitespace-pre-line font-light">
          {article.content}
        </div>

        <div className="pt-4 border-t border-[#212532] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#191c26] hover:bg-[#222736] text-white text-xs tracking-wider rounded border border-[#2b3040]"
          >
            BACK TO JOURNAL
          </button>
        </div>
      </div>
    </div>
  );
};
