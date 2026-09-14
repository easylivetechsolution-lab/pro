import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  ShieldCheck, 
  Ship, 
  ArrowRight, 
  ChevronDown,
  CheckCircle2
} from 'lucide-react';

interface HowWeWorkProps {
  onQuickQuoteSubmit: (data: { name: string; email: string; productCategory: string }) => void;
}

export const HowWeWork: React.FC<HowWeWorkProps> = ({ onQuickQuoteSubmit }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [productNeeded, setProductNeeded] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [quoteRef, setQuoteRef] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !productNeeded) return;

    const ref = `RFQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setQuoteRef(ref);
    setSubmitted(true);
    onQuickQuoteSubmit({ name: fullName, email, productCategory: productNeeded });
  };

  const steps = [
    {
      number: 1,
      icon: (
        <svg className="w-8 h-8 text-white stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="14 2 14 8 20 8" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="16" y1="13" x2="8" y2="13" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="16" y1="17" x2="8" y2="17" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="10 9 9 9 8 9" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'RFQ Submission',
      desc: 'Tell us what you need — products, quantities, destination and terms.'
    },
    {
      number: 2,
      icon: (
        <svg className="w-8 h-8 text-white stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="9 12 11 14 15 10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Verification & Logistics Setup',
      desc: 'We verify manufacturers, confirm compliance, and prepare shipping & documentation.'
    },
    {
      number: 3,
      icon: (
        <svg className="w-8 h-8 text-white stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M2 21h20M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4a11.6 11.6 0 0 0 1.62 6M12 10V4M12 4l-4 2M12 4l4 2M9 10h6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'CPT / Freight Delivery',
      desc: 'We manage freight, customs and delivery under agreed Incoterms (e.g., CPT).'
    }
  ];

  return (
    <section id="how-it-works-section" className="relative py-10 sm:py-12 lg:py-14 bg-[#040e21] text-white overflow-hidden">
      {/* Background Layer 1: Deep Navy Gradient Base */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#030b1a] via-[#040f24] to-[#071836]" />

      {/* Background Layer 2: Illuminated Digital World Map & Trade Network */}
      <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 1440 600" fill="none" preserveAspectRatio="xMidYMid slice">
          {/* Subtle World Map Dot Grid / Landmasses */}
          <g fill="#0284c7" opacity="0.35">
            {/* North America */}
            <circle cx="280" cy="180" r="2.5"/><circle cx="300" cy="190" r="3"/><circle cx="320" cy="170" r="2"/>
            <circle cx="340" cy="180" r="3"/><circle cx="310" cy="210" r="3.5"/><circle cx="330" cy="220" r="3"/>
            <circle cx="350" cy="230" r="2.5"/><circle cx="290" cy="230" r="3"/><circle cx="270" cy="210" r="2"/>
            {/* Europe */}
            <circle cx="680" cy="160" r="3"/><circle cx="700" cy="150" r="3.5"/><circle cx="720" cy="165" r="3"/>
            <circle cx="690" cy="180" r="3.5"/><circle cx="710" cy="190" r="2.5"/><circle cx="730" cy="180" r="3"/>
            {/* Asia & Pacific */}
            <circle cx="880" cy="190" r="3.5"/><circle cx="910" cy="180" r="3"/><circle cx="940" cy="200" r="4"/>
            <circle cx="960" cy="220" r="3"/><circle cx="930" cy="230" r="3.5"/><circle cx="900" cy="220" r="3"/>
            <circle cx="980" cy="250" r="2.5"/><circle cx="950" cy="260" r="3"/>
            {/* Africa */}
            <circle cx="690" cy="260" r="3"/><circle cx="710" cy="280" r="3.5"/><circle cx="700" cy="310" r="3"/>
            <circle cx="720" cy="330" r="2.5"/><circle cx="730" cy="300" r="3"/>
            {/* South America */}
            <circle cx="380" cy="340" r="3"/><circle cx="400" cy="360" r="3.5"/><circle cx="390" cy="390" r="3"/>
          </g>

          {/* Interconnected Geodesic Trade Network Lines */}
          <path d="M310 210 Q 500 120, 690 180 T 940 200" stroke="#00d2ff" strokeWidth="1.2" strokeDasharray="4 3" opacity="0.6"/>
          <path d="M330 220 Q 510 280, 710 280 T 930 230" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" opacity="0.5"/>
          <path d="M690 180 Q 700 240, 710 280" stroke="#00d2ff" strokeWidth="1" opacity="0.4"/>
          <path d="M940 200 Q 1100 240, 1260 220" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="5 4" opacity="0.7"/>
          <path d="M720 165 Q 830 140, 910 180" stroke="#00d2ff" strokeWidth="1" opacity="0.5"/>

          {/* Glowing Hub Nodes */}
          <circle cx="310" cy="210" r="5" fill="#00d2ff" opacity="0.8"/>
          <circle cx="310" cy="210" r="10" stroke="#00d2ff" strokeWidth="1" opacity="0.4"/>
          <circle cx="690" cy="180" r="6" fill="#38bdf8" opacity="0.9"/>
          <circle cx="690" cy="180" r="14" stroke="#38bdf8" strokeWidth="1.2" opacity="0.5"/>
          <circle cx="940" cy="200" r="6" fill="#00d2ff" opacity="0.9"/>
          <circle cx="940" cy="200" r="14" stroke="#00d2ff" strokeWidth="1.2" opacity="0.5"/>

          {/* Holographic Radar Concentric Arcs */}
          <circle cx="1120" cy="260" r="120" stroke="#00d2ff" strokeWidth="0.75" strokeDasharray="6 6" opacity="0.35"/>
          <circle cx="1120" cy="260" r="180" stroke="#38bdf8" strokeWidth="0.75" opacity="0.25"/>
          <circle cx="1120" cy="260" r="250" stroke="#00d2ff" strokeWidth="0.5" strokeDasharray="8 6" opacity="0.2"/>
        </svg>
      </div>

      {/* Background Layer 3: High-Resolution Real Container Vessel on the Right */}
      <div className="absolute right-0 top-0 bottom-0 w-full sm:w-2/3 lg:w-1/2 pointer-events-none overflow-hidden select-none z-0">
        <img 
          src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1400&q=85" 
          alt="International Cargo Ship and Shipping Logistics" 
          className="w-full h-full object-cover object-right sm:object-right opacity-60 sm:opacity-90 filter contrast-125 sm:contrast-110 saturate-100 sm:saturate-110 brightness-[0.4] sm:brightness-100 transition-all duration-300"
        />
        {/* Smooth gradients that fade the image out on the left side to keep text completely legible, but leave the cargo ship perfectly visible on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#040e21] via-[#040e21]/70 sm:via-[#040e21]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040e21] via-transparent to-[#040e21]/30" />
      </div>

      {/* Section Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid: Left Column has Header + 3 Steps, Right Column has Request a Quote Card starting at top */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Section Header & 3-Steps Workflow Pipeline */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-between h-full">
            {/* Header */}
            <div className="max-w-2xl mb-6 sm:mb-8">
              <span className="text-xs sm:text-sm font-bold tracking-widest text-[#00d2ff] uppercase">
                HOW WE WORK
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-1 mb-2 leading-tight drop-shadow-sm">
                Simple. Secure. Global.
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                Our streamlined procurement process ensures you get the right products, at the right price, delivered on time.
              </p>
            </div>

            {/* 3 Steps Pipeline */}
            <div className="flex flex-col md:flex-row items-start justify-between gap-6 md:gap-3 lg:gap-4 relative pt-1 sm:pt-2">
              {steps.map((step, idx) => (
                <React.Fragment key={step.number}>
                  {/* Step Item */}
                  <div className="flex-1 w-full md:w-auto">
                    {/* Top Row: Circular Number Badge + Icon + Stepped L-Connector Line */}
                    <div className="relative mb-2.5">
                      <div className="flex items-center gap-3">
                        {/* Circle Badge (Light cyan with navy bold number) */}
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#38bdf8] text-[#030e20] font-black text-xs sm:text-sm flex items-center justify-center shadow-lg shadow-sky-400/20 shrink-0">
                          {step.number}
                        </div>

                        {/* White Outline Icon */}
                        <div className="text-white">
                          {step.icon}
                        </div>
                      </div>

                      {/* Stepped L-Connector Line */}
                      <div className="relative h-4 w-full mt-1.5 pointer-events-none">
                        {/* Vertical line from bottom of number */}
                        <div className="absolute left-3.5 sm:left-4 top-0 w-0.5 h-3 bg-[#00d2ff]" />
                        {/* Horizontal branch extending right */}
                        <div className="absolute left-3.5 sm:left-4 top-3 right-3 h-0.5 bg-[#00d2ff]" />
                      </div>
                    </div>

                    {/* Step Title & Description */}
                    <div className="pt-1">
                      <h3 className="text-sm sm:text-base font-bold text-white mb-1.5 leading-snug tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed max-w-[220px]">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Horizontal Arrow Between Steps */}
                  {idx < steps.length - 1 && (
                    <div className="hidden md:flex items-center justify-center pt-6 text-slate-400 shrink-0">
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300 stroke-[1.5]" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Right Column: Shifted up & Compact Request a Quote Card */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="bg-[#071a33]/90 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-[#16365c] shadow-2xl shadow-black/60 relative">
              {/* Card Header */}
              <div className="mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Request a Quote
                </h3>
                <p className="text-xs text-slate-300 mt-0.5 leading-normal">
                  Get a personalized quote from our global supplier network.
                </p>
              </div>

              {/* Inner White Form Container */}
              <div className="bg-white rounded-xl p-4 sm:p-4.5 shadow-inner text-slate-800">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    {/* Full Name */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-800 mb-1">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:border-transparent transition-all placeholder:text-slate-400"
                      />
                    </div>

                    {/* Business Email */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-800 mb-1">
                        Business Email <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:border-transparent transition-all placeholder:text-slate-400"
                      />
                    </div>

                    {/* Products Needed */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-800 mb-1">
                        Products Needed <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          required
                          value={productNeeded}
                          onChange={(e) => setProductNeeded(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 appearance-none focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:border-transparent transition-all pr-8 cursor-pointer"
                        >
                          <option value="" disabled>Select</option>
                          <option value="ppe">Personal Protective Equipment (PPE)</option>
                          <option value="consumables">Medical Consumables & Syringes</option>
                          <option value="surgical">Surgical Instruments & Kits</option>
                          <option value="diagnostics">Diagnostics & Lab Supplies</option>
                          <option value="custom">Hospital Consortium Sourcing</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-slate-500">
                          <ChevronDown className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      id="how-we-work-submit-quote"
                      className="w-full py-2.5 px-4 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs sm:text-sm rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-1"
                    >
                      <span>Submit Request</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </form>
                ) : (
                  <div className="py-3 text-center">
                    <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 mb-0.5">
                      Request Submitted!
                    </h4>
                    <p className="text-[11px] font-mono font-bold text-[#0284c7] mb-1.5">
                      Reference: {quoteRef}
                    </p>
                    <p className="text-[11px] text-slate-600 mb-3 leading-relaxed">
                      Thank you <strong>{fullName}</strong>. Your inquiry has been routed to our global trade team.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs text-[#0284c7] font-semibold hover:underline"
                    >
                      Submit another request
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
