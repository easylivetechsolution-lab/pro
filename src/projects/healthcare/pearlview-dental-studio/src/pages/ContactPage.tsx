import React, { useState } from 'react';
import { 
  MapPin, Phone, Mail, Clock, ShieldCheck, CheckCircle2, 
  Send, Navigation, Car, Headphones, HeartHandshake, AlertCircle 
} from 'lucide-react';
import { CLINIC_INFO } from '../data/dentalData';

interface ContactPageProps {
  onOpenBooking?: () => void;
  onNavigate: (page: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenBooking, onNavigate }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    reason: 'Cosmetic Consultation',
    preferredTime: 'Morning (8am - 12pm)',
    insurance: 'Delta Dental PPO',
    comfortPreference: 'Noise-canceling headphones',
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-zinc-900 pt-6 pb-24">
      {/* Top Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
          <button 
            onClick={() => onNavigate('home')}
            className="hover:text-[#0E282E] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-[#0E282E] font-semibold">Contact & Concierge</span>
        </div>
      </div>

      {/* Page Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="rounded-3xl bg-[#0E282E] text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute left-1/4 bottom-0 w-80 h-80 bg-[#16363D]/40 rounded-full blur-2xl pointer-events-none" />

          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#EAD8B7] text-xs font-semibold uppercase tracking-widest mb-6">
              <MapPin className="w-3.5 h-3.5" />
              <span>Downtown Austin Studio</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal text-white tracking-tight mb-6 leading-tight">
              Get in Touch with Our Concierge Team
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-light mb-8">
              Whether reserving a bespoke 3D smile consultation, checking real-time insurance coverage, or requesting emergency dental relief, we are at your service.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenBooking}
                className="px-8 py-4 bg-[#EAD8B7] hover:bg-white text-[#0E282E] font-semibold text-xs sm:text-sm tracking-wider uppercase rounded-full shadow-lg transition-all duration-200 cursor-pointer"
              >
                Book Online Reservation
              </button>
              <a
                href={`tel:${CLINIC_INFO.phone}`}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm rounded-full transition-colors border border-white/15"
              >
                Call Concierge: {CLINIC_INFO.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Form & Location Details */}
      <div id="inquiry-form" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-zinc-200 shadow-sm p-6 sm:p-10">
            <div className="mb-8">
              <span className="text-xs uppercase font-bold tracking-widest text-[#5B7980] block mb-1">
                Concierge Reservation Request
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#0E282E]">
                Send Us a Note or Request a Time
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 mt-2">
                We respond to all patient inquiries within two hours during business hours.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200 text-center animate-in fade-in duration-300">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif font-bold text-emerald-950 mb-2">
                  Inquiry Received with Gratitude
                </h3>
                <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto leading-relaxed mb-6">
                  Thank you, {formData.fullName || 'valued patient'}. Our concierge coordinator will reach out to {formData.email || formData.phone} within 2 hours to confirm your preferred timing and verify insurance details.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 bg-emerald-900 text-white text-xs font-semibold rounded-full hover:bg-emerald-950"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lauren Davis"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full p-3 bg-[#FAF9F6] border border-zinc-300 rounded-xl text-xs text-zinc-900 focus:outline-hidden focus:ring-2 focus:ring-[#0E282E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(512) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-3 bg-[#FAF9F6] border border-zinc-300 rounded-xl text-xs text-zinc-900 focus:outline-hidden focus:ring-2 focus:ring-[#0E282E]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="lauren@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3 bg-[#FAF9F6] border border-zinc-300 rounded-xl text-xs text-zinc-900 focus:outline-hidden focus:ring-2 focus:ring-[#0E282E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                      Primary Purpose of Visit
                    </label>
                    <select
                      value={formData.reason}
                      onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                      className="w-full p-3 bg-[#FAF9F6] border border-zinc-300 rounded-xl text-xs text-zinc-900 focus:outline-hidden focus:ring-2 focus:ring-[#0E282E]"
                    >
                      <option>Cosmetic Smile Consultation (Veneers / Whitening)</option>
                      <option>Comprehensive New Patient Wellness Exam & Cleaning</option>
                      <option>Dental Implant Consultation</option>
                      <option>Invisalign® Clear Aligners</option>
                      <option>Second Opinion / Restorative Dentistry</option>
                      <option>Urgent / Same-Day Dental Discomfort</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                      Preferred Day / Time
                    </label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full p-3 bg-[#FAF9F6] border border-zinc-300 rounded-xl text-xs text-zinc-900 focus:outline-hidden focus:ring-2 focus:ring-[#0E282E]"
                    >
                      <option>Morning (8:00 AM - 12:00 PM)</option>
                      <option>Lunchtime (12:00 PM - 2:00 PM)</option>
                      <option>Afternoon (2:00 PM - 5:00 PM)</option>
                      <option>Saturday Morning VIP Hours</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                      Dental Insurance Status
                    </label>
                    <select
                      value={formData.insurance}
                      onChange={(e) => setFormData({ ...formData, insurance: e.target.value })}
                      className="w-full p-3 bg-[#FAF9F6] border border-zinc-300 rounded-xl text-xs text-zinc-900 focus:outline-hidden focus:ring-2 focus:ring-[#0E282E]"
                    >
                      <option>Delta Dental PPO</option>
                      <option>MetLife Dental</option>
                      <option>Cigna Dental</option>
                      <option>Aetna Dental</option>
                      <option>Guardian Dental</option>
                      <option>Other PPO Provider</option>
                      <option>No Insurance (Interested in PearlView Club)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                    Sensory & Comfort Preferences
                  </label>
                  <select
                    value={formData.comfortPreference}
                    onChange={(e) => setFormData({ ...formData, comfortPreference: e.target.value })}
                    className="w-full p-3 bg-[#FAF9F6] border border-zinc-300 rounded-xl text-xs text-zinc-900 focus:outline-hidden focus:ring-2 focus:ring-[#0E282E]"
                  >
                    <option>Noise-canceling Bose® headphones</option>
                    <option>Weighted anxiety blanket & calming tea</option>
                    <option>Nitrous oxide (mild laughing gas relaxation)</option>
                    <option>Standard appointment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                    Specific Smile Goals or Questions (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us what you'd love to improve about your smile, or any dental anxieties we can help ease..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full p-3 bg-[#FAF9F6] border border-zinc-300 rounded-xl text-xs text-zinc-900 focus:outline-hidden focus:ring-2 focus:ring-[#0E282E]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#0E282E] hover:bg-[#153B44] text-white text-xs font-semibold uppercase tracking-wider rounded-xl shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Concierge Request</span>
                </button>
              </form>
            )}
          </div>

          {/* Location & Studio Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm p-6 sm:p-8">
              <h3 className="text-xl font-serif font-bold text-[#0E282E] mb-4">
                Studio Address & Hours
              </h3>

              <div className="space-y-4 text-xs text-zinc-600 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-bold text-zinc-900 block">PearlView Dental Studio</span>
                    <span>{CLINIC_INFO.address}</span>
                    <span className="text-[11px] text-zinc-400 block mt-0.5">2nd Floor, Suite 200 &bull; Historic 2nd St District</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-bold text-zinc-900 block">Studio Hours</span>
                    <span>{CLINIC_INFO.hours.weekdays}</span>
                    <span className="block">{CLINIC_INFO.hours.saturday}</span>
                    <span className="block text-zinc-400">{CLINIC_INFO.hours.sunday}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-bold text-zinc-900 block">Direct Concierge Phone</span>
                    <a href={`tel:${CLINIC_INFO.phone}`} className="text-[#0E282E] font-semibold hover:underline">
                      {CLINIC_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-bold text-zinc-900 block">Concierge Email</span>
                    <a href={`mailto:${CLINIC_INFO.email}`} className="text-[#0E282E] font-semibold hover:underline">
                      {CLINIC_INFO.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Parking & Transit */}
              <div className="p-4 bg-[#FAF9F6] rounded-2xl border border-zinc-200 text-xs space-y-2.5">
                <div className="flex items-center gap-2 font-bold text-zinc-900">
                  <Car className="w-4 h-4 text-[#0E282E]" />
                  <span>Complimentary Valet & Reserved Parking</span>
                </div>
                <p className="text-zinc-600 text-[11px] leading-relaxed">
                  Complimentary 2-hour parking validation is provided for our secure underground patient garage accessed via Colorado Street. Valet available at the main building entrance.
                </p>
              </div>
            </div>

            {/* Emergency Dental Guarantee */}
            <div className="bg-[#0E282E] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-md">
              <div className="flex items-center gap-2 text-xs font-bold text-[#EAD8B7] uppercase tracking-wider mb-2">
                <AlertCircle className="w-4 h-4" />
                <span>Urgent Care Dental Protocol</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-2">
                Experiencing a Dental Emergency?
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                We reserve daily emergency appointment windows for fractured teeth, acute toothaches, and broken crowns. Same-day relief guaranteed.
              </p>
              <a
                href={`tel:${CLINIC_INFO.phone}`}
                className="inline-flex items-center justify-center w-full py-3 bg-[#EAD8B7] text-[#0E282E] font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-white transition-colors"
              >
                Emergency Dispatch: {CLINIC_INFO.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
