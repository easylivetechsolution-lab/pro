import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ShieldCheck,
  MessageSquare
} from 'lucide-react';
import { SERVICES_DATA } from '../data/remodelingData';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    serviceId: 'roofing',
    budget: '$25,000 - $50,000',
    timeline: 'Within 1-2 Months',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0B131E] text-slate-100 pt-28 pb-24">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#182335] border border-white/10 text-xs font-semibold uppercase tracking-[0.22em] text-[#C07848] mb-5">
          <span>Inquire &amp; Collaborate</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-white mb-6 max-w-4xl mx-auto leading-[1.12]">
          Let's Discuss Your Residence
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
          Connect directly with Firmans architectural team. We provide complimentary on-site feasibility evaluations, CAD layouts, and transparent pricing.
        </p>
      </section>

      {/* Main Content: Info + Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Studio Contact & Service Area */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#121C2B] rounded-3xl p-8 border border-white/10 shadow-xl space-y-6">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
                Firmans Home Exterior &amp; Interior Remodeling
              </h2>

              <div className="space-y-5 text-sm text-slate-300">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#C07848]/15 border border-[#C07848]/40 flex items-center justify-center text-[#C07848] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-slate-400 block mb-0.5">
                      Direct Telephone
                    </span>
                    <a href="tel:5551234567" className="text-base font-semibold text-white hover:text-[#C07848] transition-colors">
                      (555) 123-4567
                    </a>
                    <span className="text-xs text-slate-400 block mt-0.5">
                      Direct Architect Consultation Line
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#C07848]/15 border border-[#C07848]/40 flex items-center justify-center text-[#C07848] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-slate-400 block mb-0.5">
                      Electronic Mail
                    </span>
                    <a href="mailto:inquiries@firmansremodeling.com" className="text-base font-semibold text-white hover:text-[#C07848] transition-colors">
                      inquiries@firmansremodeling.com
                    </a>
                    <span className="text-xs text-slate-400 block mt-0.5">
                      Plans, RFPs, and Blueprints
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#C07848]/15 border border-[#C07848]/40 flex items-center justify-center text-[#C07848] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-slate-400 block mb-0.5">
                      Design Studio &amp; Materials Showroom
                    </span>
                    <span className="text-sm font-semibold text-white block">
                      1200 Architecture Boulevard, Suite 400
                    </span>
                    <span className="text-xs text-slate-400">
                      Metro District, ST 12345
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#C07848]/15 border border-[#C07848]/40 flex items-center justify-center text-[#C07848] shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-slate-400 block mb-0.5">
                      Hours of Operation
                    </span>
                    <span className="text-xs text-white block">
                      Monday – Friday: 7:30 AM – 6:00 PM
                    </span>
                    <span className="text-xs text-slate-400">
                      Saturday: 9:00 AM – 3:00 PM (By Appointment)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Region Notice */}
            <div className="bg-[#121C2B] rounded-3xl p-6 border border-white/10 space-y-3">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#C07848]">
                REGIONAL COVERAGE
              </span>
              <h3 className="text-base font-bold text-white">
                Primary Residential Jurisdictions
              </h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Firmans is actively licensed and bonded across the Greater Metropolitan area, handling all residential permitting, structural inspections, and municipal code compliance.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Booking Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#121C2B] rounded-3xl p-8 sm:p-10 border border-white/10 shadow-2xl relative">
              {submitted ? (
                <div className="text-center py-16 space-y-4 animate-in fade-in duration-400">
                  <div className="w-16 h-16 rounded-full bg-[#C07848]/20 border border-[#C07848] text-[#C07848] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white">
                    Consultation Request Received
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto font-light">
                    Thank you, {formData.name}. Our principal project superintendent will review your property details and contact you within 24 business hours to schedule your on-site review.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2 rounded-full bg-[#182335] text-xs font-semibold text-slate-300 hover:text-white border border-white/10"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-1">
                      Request Your Project Evaluation
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 font-light">
                      Complete the details below for a comprehensive estimate and layout review.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0B131E] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#C07848]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(555) 000-0000"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0B131E] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#C07848]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="sarah@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0B131E] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#C07848]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Property Address / City *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="Street, City, Zip"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0B131E] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#C07848]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Primary Remodeling Trade
                      </label>
                      <select
                        value={formData.serviceId}
                        onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#0B131E] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C07848]"
                      >
                        {SERVICES_DATA.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Estimated Budget
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#0B131E] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C07848]"
                      >
                        <option>$10,000 - $25,000</option>
                        <option>$25,000 - $50,000</option>
                        <option>$50,000 - $100,000</option>
                        <option>$100,000+</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Desired Timeline
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#0B131E] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C07848]"
                      >
                        <option>Immediate / ASAP</option>
                        <option>Within 1-2 Months</option>
                        <option>Within 3-6 Months</option>
                        <option>Planning Phase</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Scope Overview &amp; Goals
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly describe what you would like to remodel (e.g. replacing existing roof with standing seam metal and upgrading front windows)..."
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0B131E] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#C07848]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#C07848] hover:bg-[#D28A5B] text-white font-semibold py-3.5 px-6 rounded-xl text-sm tracking-wide shadow-lg shadow-[#C07848]/25 transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Consultation Request</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
