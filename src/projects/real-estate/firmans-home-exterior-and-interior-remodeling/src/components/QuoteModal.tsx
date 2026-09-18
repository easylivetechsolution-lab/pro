import React, { useState } from 'react';
import { X, Check, ArrowRight, Calculator, ShieldCheck, PhoneCall } from 'lucide-react';
import { SERVICES_DATA } from '../data/remodelingData';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, initialServiceId }) => {
  const [selectedServices, setSelectedServices] = useState<string[]>(
    initialServiceId ? [initialServiceId] : ['roofing']
  );
  const [homeSqFt, setHomeSqFt] = useState<number>(2500);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== id));
      }
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const calculateEstimate = () => {
    let base = 0;
    const ratePerSqFt = homeSqFt > 3500 ? 1.2 : 1.0;

    selectedServices.forEach((sId) => {
      switch (sId) {
        case 'roofing':
          base += 12000 * ratePerSqFt;
          break;
        case 'windows-doors':
          base += 14000 * ratePerSqFt;
          break;
        case 'exterior-painting':
          base += 7500 * ratePerSqFt;
          break;
        case 'gutters':
          base += 2800 * ratePerSqFt;
          break;
        case 'turf-grass':
          base += 8500 * ratePerSqFt;
          break;
        case 'flooring':
          base += 9000 * ratePerSqFt;
          break;
        case 'interior-painting':
          base += 5500 * ratePerSqFt;
          break;
        case 'remodeling':
          base += 32000 * ratePerSqFt;
          break;
        default:
          base += 5000;
      }
    });

    const low = Math.round((base * 0.85) / 500) * 500;
    const high = Math.round((base * 1.25) / 500) * 500;
    return { low, high };
  };

  const { low, high } = calculateEstimate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in">
      <div
        id="quote-calculator-modal"
        className="relative w-full max-w-2xl bg-[#0B131E] border border-white/15 rounded-3xl p-6 sm:p-8 text-white shadow-2xl overflow-hidden my-8"
      >
        {/* Glow ambient background */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#C07848]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors border border-white/10 cursor-pointer"
          aria-label="Close quote modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#C07848] uppercase">
                <Calculator className="w-4 h-4" />
                <span>Firmans Home Exterior &amp; Interior Remodeling Estimator</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white">
                Request Your Project Estimate
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-light">
                Select your architectural trades to calculate preliminary scopes and schedule your on-site evaluation.
              </p>
            </div>

            {/* Step 1: Select Services */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                1. Select Remodeling Disciplines
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {SERVICES_DATA.map((srv) => {
                  const isChecked = selectedServices.includes(srv.id);
                  return (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => toggleService(srv.id)}
                      className={`p-2.5 rounded-xl text-left border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-[#C07848]/20 border-[#C07848] text-white shadow-sm'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/30'
                      }`}
                    >
                      <span className="truncate">{srv.title}</span>
                      {isChecked && <Check className="w-3.5 h-3.5 text-[#C07848] shrink-0 ml-1" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Property Size Slider */}
            <div className="space-y-2 bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">Approximate Residence Footprint:</span>
                <span className="font-bold text-[#C07848] text-sm">{homeSqFt.toLocaleString()} sq. ft.</span>
              </div>
              <input
                type="range"
                min="1000"
                max="8000"
                step="250"
                value={homeSqFt}
                onChange={(e) => setHomeSqFt(Number(e.target.value))}
                className="w-full accent-[#C07848] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>1,000 sq.ft.</span>
                <span>4,000 sq.ft.</span>
                <span>8,000+ sq.ft.</span>
              </div>
            </div>

            {/* Instant Calculated Estimated Range */}
            <div className="bg-[#121C2B] border border-[#C07848]/40 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#D28A5B]">
                  Preliminary Estimated Range
                </span>
                <div className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
                  ${low.toLocaleString()} – ${high.toLocaleString()}
                </div>
              </div>
              <div className="text-right text-[11px] text-slate-300 hidden sm:block font-light">
                Includes Materials, Permitting, <br />Superintendence &amp; Lifetime Warranty
              </div>
            </div>

            {/* Step 3: Contact Info */}
            <div className="space-y-3 pt-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                2. Contact Information
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Full Name *"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#C07848]"
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone Number *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#C07848]"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="email"
                  required
                  placeholder="Email Address *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#C07848]"
                />
                <input
                  type="text"
                  placeholder="Property Address (Street, City)"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#C07848]"
                />
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-[#C07848] hover:bg-[#D28A5B] text-white font-semibold py-3.5 rounded-full text-sm tracking-wide shadow-lg shadow-[#C07848]/20 transition-all duration-200 cursor-pointer"
            >
              <span>Submit Consultation Request</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-6 text-[11px] text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C07848]" /> Fixed price guarantee
              </span>
              <span className="flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5 text-[#C07848]" /> 24hr architect reply
              </span>
            </div>
          </form>
        ) : (
          <div className="text-center py-10 space-y-5 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-[#C07848]/20 border border-[#C07848] flex items-center justify-center text-[#C07848] mx-auto">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="text-2xl font-bold font-serif text-white">
              Thank You, {fullName || 'Valued Homeowner'}!
            </h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed font-light">
              Your consultation request has been received. Our project superintendent will call you at <span className="text-[#D28A5B] font-semibold">{phone || '(555) 123-4567'}</span> within 24 hours to schedule your on-site evaluation.
            </p>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 max-w-sm mx-auto text-xs text-slate-300 space-y-1">
              <div className="font-semibold text-white">Consultation Ref #{Math.floor(100000 + Math.random() * 900000)}</div>
              <div>Estimated Range: ${low.toLocaleString()} – ${high.toLocaleString()}</div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-2.5 rounded-full text-xs transition-colors cursor-pointer"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
