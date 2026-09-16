import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Tag, 
  Layers, 
  Truck, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  Calculator, 
  ArrowRight, 
  Download, 
  Users, 
  Clock, 
  PhoneCall,
  Briefcase
} from 'lucide-react';
import boardroomWideImg from '../assets/images/boardroom_conference_wide_1789339388609.jpg';
import confTableImg from '../assets/images/conf_table_shot_1789337885116.jpg';

export const B2BPage: React.FC = () => {
  const [stationCount, setStationCount] = useState(25);
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    workEmail: '',
    phone: '',
    projectTimeline: '1-3 Months',
    needsCAD: true,
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Approximate calculation
  const basePricePerStation = 1298; // Desk + Ergonomic Chair bundle
  const discountPercent = stationCount >= 50 ? 0.30 : stationCount >= 16 ? 0.22 : 0.15;
  const retailTotal = stationCount * basePricePerStation;
  const savings = retailTotal * discountPercent;
  const discountedTotal = retailTotal - savings;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.workEmail) return;
    setIsSubmitted(true);
  };

  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-[#0e1014] text-[#e8eaed] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-zinc-400 mb-6 font-medium">
          <Link to="/" className="hover:text-[#f3ba77] transition-colors">Home</Link>
          <span className="text-zinc-600">/</span>
          <span className="text-white">B2B & Wholesale</span>
        </nav>

        {/* Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider text-[#e2b47f] mb-4">
              <Building2 className="w-3.5 h-3.5" />
              Corporate & Commercial Wholesale
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
              Furnish High-Performance Workspaces with Tiered Wholesale
            </h1>
            <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed mb-8">
              Equip entire floors, collaborative studios, and enterprise campuses with solid sustainable hardwood 
              and certified ergonomic seating. Volume discounts up to 30%, custom wood finishes, and full spatial CAD support.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#quote-section"
                className="bg-[#e2a466] hover:bg-[#efb57b] text-black font-semibold text-xs sm:text-sm px-7 py-3.5 rounded-full transition-colors cursor-pointer flex items-center gap-2"
              >
                <span>Calculate Project Savings</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#tiers-section"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/15 font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-full transition-colors cursor-pointer"
              >
                View Volume Tiers
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="aspect-4/3 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
              <img
                src={boardroomWideImg}
                alt="MarkWell enterprise conference room setup"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs font-bold text-[#e2a466] uppercase tracking-wider block mb-1">
                  Nexa Tech HQ / 120 Workstations
                </span>
                <p className="text-xs text-white">
                  Custom walnut standing desks and synchronized mesh seating delivered in 3 weeks.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of B2B Commercial Service */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <div className="bg-[#141820] border border-white/10 p-6 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#e2a466] mb-4">
              <Tag className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-1.5">Volume Discount Tiers</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Transparent tier structures from 15% to 30% off catalog pricing, applied directly to all desks, chairs, and credenzas.
            </p>
          </div>

          <div className="bg-[#141820] border border-white/10 p-6 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#e2a466] mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-1.5">Complimentary 3D CAD Plans</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Send your architectural floor plan; our interior specialists generate complete 2D layout and 3D photorealistic renderings within 48h.
            </p>
          </div>

          <div className="bg-[#141820] border border-white/10 p-6 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#e2a466] mb-4">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-1.5">Turnkey White-Glove Setup</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Dedicated freight crews deliver after hours, assemble every piece, test electric lift columns, and haul away all crates.
            </p>
          </div>

          <div className="bg-[#141820] border border-white/10 p-6 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#e2a466] mb-4">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-1.5">Net 30/60 Commercial Terms</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Seamless procurement with tax-exempt invoicing, consolidated PO billing, and flexible payment terms for enterprise teams.
            </p>
          </div>
        </div>

        {/* Volume Tiers Breakdown */}
        <div id="tiers-section" className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#e2a466] block mb-2">
              Wholesale Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Volume Discount Tiers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Tier 1 */}
            <div className="bg-[#141820] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                  Starter Tier
                </span>
                <h3 className="text-2xl font-bold text-white mb-2">Studio Scale</h3>
                <p className="text-xs text-zinc-400 mb-6">Ideal for boutique agencies, law practices, and growing startups.</p>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
                  <div className="font-mono text-3xl font-extrabold text-[#e2a466]">15% OFF</div>
                  <span className="text-xs text-zinc-300">5 to 15 Workstations</span>
                </div>

                <ul className="space-y-2.5 text-xs text-zinc-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Dedicated account lead</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Free wood finish sample kit</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Consolidated freight shipping</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>10-Year commercial warranty</span>
                  </li>
                </ul>
              </div>

              <a
                href="#quote-section"
                onClick={() => setStationCount(10)}
                className="mt-8 block text-center bg-white/10 hover:bg-white/20 text-white text-xs font-semibold py-3 rounded-xl border border-white/15 transition-colors"
              >
                Select Studio Tier
              </a>
            </div>

            {/* Tier 2 */}
            <div className="bg-[#141820] border-2 border-[#e2a466] rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative shadow-xl shadow-black/40">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#e2a466] text-black text-[10px] font-extrabold uppercase px-3 py-0.5 rounded-full">
                Most Popular
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#e2a466] block mb-1">
                  Department Tier
                </span>
                <h3 className="text-2xl font-bold text-white mb-2">Expansion Floor</h3>
                <p className="text-xs text-zinc-400 mb-6">Designed for expanding divisions and mid-sized offices.</p>

                <div className="bg-[#e2a466]/10 border border-[#e2a466]/30 rounded-xl p-4 mb-6">
                  <div className="font-mono text-3xl font-extrabold text-[#e2a466]">22% OFF</div>
                  <span className="text-xs text-zinc-300">16 to 49 Workstations</span>
                </div>

                <ul className="space-y-2.5 text-xs text-zinc-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#e2a466] shrink-0" />
                    <span>All Studio benefits included</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#e2a466] shrink-0" />
                    <span>Free 3D CAD spatial layout planning</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#e2a466] shrink-0" />
                    <span>Priority production batch queue</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#e2a466] shrink-0" />
                    <span>Complimentary on-site ergonomic audit</span>
                  </li>
                </ul>
              </div>

              <a
                href="#quote-section"
                onClick={() => setStationCount(30)}
                className="mt-8 block text-center bg-[#e2a466] hover:bg-[#efb57b] text-black text-xs font-bold py-3 rounded-xl transition-colors"
              >
                Select Expansion Tier
              </a>
            </div>

            {/* Tier 3 */}
            <div className="bg-[#141820] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                  Enterprise Tier
                </span>
                <h3 className="text-2xl font-bold text-white mb-2">Headquarters Campus</h3>
                <p className="text-xs text-zinc-400 mb-6">Complete campus and multi-floor corporate rollouts.</p>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
                  <div className="font-mono text-3xl font-extrabold text-[#e2a466]">30% OFF</div>
                  <span className="text-xs text-zinc-300">50+ Workstations</span>
                </div>

                <ul className="space-y-2.5 text-xs text-zinc-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>All Department Tier benefits</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Bespoke timber stain matching</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Free white-glove assembly & placement</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Net 60 billing & custom asset tagging</span>
                  </li>
                </ul>
              </div>

              <a
                href="#quote-section"
                onClick={() => setStationCount(60)}
                className="mt-8 block text-center bg-white/10 hover:bg-white/20 text-white text-xs font-semibold py-3 rounded-xl border border-white/15 transition-colors"
              >
                Select Enterprise Tier
              </a>
            </div>

          </div>
        </div>

        {/* Interactive Volume Savings Calculator & Quote Request Form */}
        <div id="quote-section" className="bg-[#141820] border border-white/10 rounded-3xl p-6 sm:p-12 mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Interactive Calculator */}
            <div className="lg:col-span-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 pb-8 lg:pb-0 lg:pr-10">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#e2a466] uppercase tracking-wider mb-2">
                  <Calculator className="w-4 h-4" />
                  Estimated Savings Estimator
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Calculate Your Commercial Budget
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 mb-6">
                  Based on standard Executive Standing Desk + AeroFlow Ergonomic Chair bundle ($1,298 list price per station).
                </p>

                {/* Slider */}
                <div className="bg-[#0a0c10] border border-white/15 rounded-2xl p-5 mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-semibold text-zinc-300">Station Quantity:</span>
                    <span className="font-mono text-xl font-bold text-[#e2a466]">{stationCount} Desks</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="150"
                    step="5"
                    value={stationCount}
                    onChange={(e) => setStationCount(Number(e.target.value))}
                    className="w-full accent-[#e2a466] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-500 font-mono mt-2">
                    <span>5 (Studio)</span>
                    <span>50 (Expansion)</span>
                    <span>150+ (Enterprise)</span>
                  </div>
                </div>

                {/* Breakdown summary */}
                <div className="space-y-3 font-mono text-xs text-zinc-300 mb-6">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Standard Catalog Total:</span>
                    <span className="text-zinc-400 line-through">${retailTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Volume Tier Discount ({(discountPercent * 100).toFixed(0)}%):</span>
                    <span>-${savings.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                    <span>Estimated Project Total:</span>
                    <span className="text-[#e2a466]">${discountedTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-2 text-xs text-zinc-300 font-medium mb-1">
                  <Clock className="w-4 h-4 text-[#e2a466]" />
                  <span>Lead Time: 2–3 Weeks for Standard Hardwoods</span>
                </div>
                <p className="text-[11px] text-zinc-500">
                  Custom stains and dimensions add 10 days. White-glove assembly scheduled on your preferred move-in weekend.
                </p>
              </div>
            </div>

            {/* Right Column: Quote Request Form */}
            <div className="lg:col-span-7">
              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                Request Official B2B Quote & CAD Layout
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mb-6">
                Receive an itemized formal quote with volume discounts and CAD space planning in 4 hours.
              </p>

              {isSubmitted ? (
                <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-8 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Quote Request Submitted</h4>
                  <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto mb-6">
                    Thank you for contacting MarkWell B2B. A Senior Commercial Account Director has been assigned 
                    to <strong>{formData.companyName}</strong>. You will receive your quote pack shortly at <strong>{formData.workEmail}</strong>.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-[#e2a466] hover:bg-[#efb57b] text-black text-xs font-semibold px-6 py-2.5 rounded-full transition-colors cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Acme Architecture LLC"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full bg-[#0a0c10] border border-white/15 focus:border-[#e2a466] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">
                        Contact Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Marcus Chen"
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        className="w-full bg-[#0a0c10] border border-white/15 focus:border-[#e2a466] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="m.chen@acme.com"
                        value={formData.workEmail}
                        onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                        className="w-full bg-[#0a0c10] border border-white/15 focus:border-[#e2a466] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">
                        Direct Phone
                      </label>
                      <input
                        type="tel"
                        placeholder="(415) 555-0182"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#0a0c10] border border-white/15 focus:border-[#e2a466] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">
                        Project Timeline
                      </label>
                      <select
                        value={formData.projectTimeline}
                        onChange={(e) => setFormData({ ...formData, projectTimeline: e.target.value })}
                        className="w-full bg-[#0a0c10] border border-white/15 focus:border-[#e2a466] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none cursor-pointer"
                      >
                        <option value="Immediate (< 1 month)" className="bg-[#141820]">Immediate (&lt; 1 month)</option>
                        <option value="1-3 Months" className="bg-[#141820]">1-3 Months</option>
                        <option value="3-6 Months" className="bg-[#141820]">3-6 Months</option>
                        <option value="Exploring for Future" className="bg-[#141820]">Exploring for Future</option>
                      </select>
                    </div>

                    <div className="flex items-center pt-6">
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300">
                        <input
                          type="checkbox"
                          checked={formData.needsCAD}
                          onChange={(e) => setFormData({ ...formData, needsCAD: e.target.checked })}
                          className="w-4 h-4 accent-[#e2a466] rounded cursor-pointer"
                        />
                        <span>Include Complimentary 3D CAD Planning</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Project Notes / Specific Needs
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Specify office square footage, preferred wood stains (Walnut, Oak), or power hub needs..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#0a0c10] border border-white/15 focus:border-[#e2a466] rounded-xl p-3 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-zinc-400">
                      Response commitment: within 4 business hours
                    </span>
                    <button
                      type="submit"
                      className="bg-[#e2a466] hover:bg-[#efb57b] text-black font-semibold text-xs sm:text-sm px-7 py-3 rounded-full transition-colors cursor-pointer flex items-center gap-2"
                    >
                      <span>Request Official Quote</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
