import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare, 
  CheckCircle2, 
  Building2, 
  ShieldCheck, 
  HelpCircle, 
  ChevronDown,
  ChevronUp,
  ArrowRight
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Product Consultation',
    preferredContact: 'Email',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setIsSubmitted(true);
  };

  const FAQS = [
    {
      question: 'How does White-Glove delivery and setup work?',
      answer: 'Our dedicated two-person logistics team coordinates a 2-hour delivery window. They carry all pieces directly to your chosen room or floor, assemble your desk and seating, verify electronic lift mechanisms, and remove all packing crates for recycling.'
    },
    {
      question: 'Can I request custom dimensions or specific wood stains?',
      answer: 'Yes. Through our Handcrafted Atelier, we accommodate customized length, depth, cable cutouts, and bespoke wood finishes for solid American Black Walnut and European Oak. Typical bespoke lead time is 4–6 weeks.'
    },
    {
      question: 'What is covered under the 10-Year Commercial Warranty?',
      answer: 'Our 10-year warranty provides comprehensive coverage for all structural timber joinery, solid metal frames, dual-motor standing desk lift columns, and ergonomic pneumatic gas cylinders. Any defect is resolved with on-site repair or complete replacement.'
    },
    {
      question: 'How does the 30-Day In-Office Trial work?',
      answer: 'Order any chair or workstation and use it in your daily workflow for up to 30 days. If you find the ergonomic support or aesthetic fit is not ideal for your posture, our team will pick it up free of charge and provide a full refund.'
    },
    {
      question: 'Do you provide CAD floor plans for B2B commercial projects?',
      answer: 'Yes. For teams furnishing 5 or more workstations, our interior architectural team provides complimentary 2D and 3D spatial layout renderings within 48 hours to ensure compliance with egress and cable raceways.'
    }
  ];

  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-[#0e1014] text-[#e8eaed] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-zinc-400 mb-6 font-medium">
          <Link to="/" className="hover:text-[#f3ba77] transition-colors">Home</Link>
          <span className="text-zinc-600">/</span>
          <span className="text-white">Contact</span>
        </nav>

        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider text-[#e2b47f] mb-4">
            <Mail className="w-3.5 h-3.5" />
            Concierge Support
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-5">
            Get in Touch with Our Specialists
          </h1>
          <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed">
            Whether you need ergonomic guidance, bespoke dimensions, or volume commercial quotes, 
            our design consultants are here to support your workspace.
          </p>
        </div>

        {/* 3 Quick Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          <div className="bg-[#141820] border border-white/10 rounded-2xl p-6 flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#e2a466]">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-1">Direct Phone Concierge</h3>
              <p className="text-xs text-zinc-400 mb-2">Speak directly with an ergonomic consultant</p>
              <a href="tel:18004927580" className="text-sm font-semibold text-[#e2a466] hover:underline">
                +1 (800) 492-7580
              </a>
              <span className="text-[11px] text-zinc-500 block mt-1">Mon–Sat: 8am – 7pm PST</span>
            </div>
          </div>

          <div className="bg-[#141820] border border-white/10 rounded-2xl p-6 flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#e2a466]">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-1">Email Inquiries</h3>
              <p className="text-xs text-zinc-400 mb-2">Guaranteed response within 4 hours</p>
              <a href="mailto:concierge@markwell-atelier.com" className="text-sm font-semibold text-[#e2a466] hover:underline">
                concierge@markwell-atelier.com
              </a>
              <span className="text-[11px] text-zinc-500 block mt-1">Trade: trade@markwell-atelier.com</span>
            </div>
          </div>

          <div className="bg-[#141820] border border-white/10 rounded-2xl p-6 flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#e2a466]">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-1">Design Ateliers</h3>
              <p className="text-xs text-zinc-400 mb-2">Flagships in SF, New York, & London</p>
              <span className="text-sm font-semibold text-white">
                Walk-ins & Appointments
              </span>
              <span className="text-[11px] text-zinc-500 block mt-1">Complimentary material samples</span>
            </div>
          </div>

        </div>

        {/* Main Grid: Form + Showroom Locations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-[#141820] border border-white/10 rounded-3xl p-6 sm:p-10">
            <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
              Send Us a Message
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mb-8">
              Fill out the form below and an atelier consultant will reach out promptly.
            </p>

            {isSubmitted ? (
              <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-8 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Inquiry Successfully Received</h3>
                <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto mb-6">
                  Thank you, <strong>{formData.name}</strong>. Inquiry confirmation #WW-{(Math.random() * 100000 | 0)} has been logged. 
                  A senior design consultant will contact you via {formData.preferredContact.toLowerCase()} shortly.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      inquiryType: 'Product Consultation',
                      preferredContact: 'Email',
                      message: '',
                    });
                  }}
                  className="bg-[#e2a466] hover:bg-[#efb57b] text-black text-xs font-semibold px-6 py-2.5 rounded-full transition-colors cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eleanor Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#0a0c10] border border-white/15 focus:border-[#e2a466] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. eleanor@studio.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#0a0c10] border border-white/15 focus:border-[#e2a466] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. (415) 555-0192"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#0a0c10] border border-white/15 focus:border-[#e2a466] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full bg-[#0a0c10] border border-white/15 focus:border-[#e2a466] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none transition-colors cursor-pointer"
                    >
                      <option value="Product Consultation" className="bg-[#141820]">Product Consultation</option>
                      <option value="Custom Atelier Dimensions" className="bg-[#141820]">Custom Atelier Dimensions</option>
                      <option value="Commercial B2B Order" className="bg-[#141820]">Commercial B2B Order</option>
                      <option value="White-Glove Shipping Support" className="bg-[#141820]">White-Glove Shipping Support</option>
                      <option value="Warranty & Maintenance" className="bg-[#141820]">Warranty & Maintenance</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us about your space, dimensions, ergonomic preferences, or timeline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#0a0c10] border border-white/15 focus:border-[#e2a466] rounded-xl p-4 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Your data is strictly confidential.</span>
                  </div>

                  <button
                    type="submit"
                    className="bg-[#e2a466] hover:bg-[#efb57b] text-black font-semibold text-xs sm:text-sm px-7 py-3 rounded-full transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <span>Submit Inquiry</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Atelier Locations & Hours */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            <div className="bg-[#141820] border border-white/10 rounded-3xl p-6 sm:p-8">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#e2a466]" />
                Showroom Locations
              </h3>

              <div className="space-y-6">
                <div className="border-b border-white/5 pb-5">
                  <span className="text-xs font-bold text-[#e2a466] uppercase tracking-wider block mb-1">
                    San Francisco Flagship
                  </span>
                  <p className="text-xs text-zinc-300 leading-relaxed mb-2">
                    1450 Utah Street, Suite 400<br />
                    San Francisco, CA 94110
                  </p>
                  <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Mon–Sat: 9:00 AM – 6:00 PM PST</span>
                  </div>
                </div>

                <div className="border-b border-white/5 pb-5">
                  <span className="text-xs font-bold text-[#e2a466] uppercase tracking-wider block mb-1">
                    New York SoHo Atelier
                  </span>
                  <p className="text-xs text-zinc-300 leading-relaxed mb-2">
                    482 Broome Street, 3rd Floor<br />
                    New York, NY 10013
                  </p>
                  <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Mon–Sat: 10:00 AM – 7:00 PM EST</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold text-[#e2a466] uppercase tracking-wider block mb-1">
                    London Mayfair Gallery
                  </span>
                  <p className="text-xs text-zinc-300 leading-relaxed mb-2">
                    18 Berkeley Square<br />
                    London, W1J 6BQ, United Kingdom
                  </p>
                  <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Mon–Fri: 10:00 AM – 6:30 PM GMT</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#141820] border border-white/10 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Guaranteed Response Window</h4>
                  <span className="text-[11px] text-zinc-400">All messages answered by senior design leads</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#e2a466] block mb-2">
              Common Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;

              return (
                <div 
                  key={index}
                  className="bg-[#141820] border border-white/10 rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-semibold text-white">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#e2a466] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-white/5">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
