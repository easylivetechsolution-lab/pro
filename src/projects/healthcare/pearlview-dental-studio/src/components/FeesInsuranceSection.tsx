import React, { useState } from 'react';
import { ShieldCheck, CreditCard, Users, Banknote, Check, ArrowRight, Calculator } from 'lucide-react';

interface FeesInsuranceSectionProps {
  onOpenBooking: () => void;
  onNavigate?: (page: string) => void;
}

export const FeesInsuranceSection: React.FC<FeesInsuranceSectionProps> = ({ onOpenBooking, onNavigate }) => {
  const [showCalculator, setShowCalculator] = useState(false);
  const [treatmentCost, setTreatmentCost] = useState(2500);
  const [insuranceEstimate, setInsuranceEstimate] = useState(40); // percentage
  const [loanTerm, setLoanTerm] = useState(12); // months

  const outOfPocket = Math.round(treatmentCost * (1 - insuranceEstimate / 100));
  const monthlyPayment = Math.round(outOfPocket / loanTerm);

  const paymentFeatures = [
    {
      icon: ShieldCheck,
      title: 'Insurance Plans',
      desc: 'We accept most major PPO insurance plans (Delta, MetLife, Cigna, Aetna, etc.). We verify and file claims on your behalf.'
    },
    {
      icon: CreditCard,
      title: 'Flexible Payment Options',
      desc: 'HSA, FSA, all major credit cards, Apple Pay, and interest-free split payment schedules.'
    },
    {
      icon: Users,
      title: 'PearlView Membership Plan',
      desc: 'Comprehensive annual care for uninsured patients including 2 cleanings, exams, x-rays + 20% off all cosmetic procedures.'
    },
    {
      icon: Banknote,
      title: '0% APR Financing',
      desc: 'Low monthly payments with CareCredit & Sunbit. 90%+ approval rates without affecting credit score.'
    }
  ];

  const expectations = [
    'Clear upfront itemized cost estimates',
    'Comprehensive treatment plan agreed before starting',
    'Zero hidden or surprise fees ever',
    "We'll customize treatment sequencing to your budget"
  ];

  return (
    <section id="insurance" className="py-20 lg:py-28 bg-white border-b border-zinc-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Heading, Subtitle, CTA (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#5B7980] mb-2">
                <span>Fees & Insurance</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#0E282E] tracking-tight mb-4">
                Flexible Options for Quality Care
              </h2>
              <p className="text-sm text-zinc-600 leading-relaxed mb-6">
                We accept most major insurance plans and offer clear, flexible financing options to ensure luxury dental wellness is effortlessly attainable.
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setShowCalculator(!showCalculator)}
                  className="inline-flex items-center justify-between px-5 py-3 text-xs font-semibold text-[#0E282E] bg-[#FAF9F6] hover:bg-zinc-100 border border-zinc-300 rounded-xl transition-all cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-[#D4AF37]" />
                    {showCalculator ? 'Hide Payment Calculator' : 'Estimate Monthly Payments'}
                  </span>
                  <span className="text-xs">&rarr;</span>
                </button>

                {onNavigate && (
                  <button
                    onClick={() => onNavigate('fees-insurance')}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold tracking-wider uppercase text-[#0E282E] bg-[#EAD8B7] hover:bg-white border border-[#D4AF37]/40 rounded-full shadow-xs transition-all cursor-pointer"
                  >
                    <span>Detailed Fees & Insurance Page &rarr;</span>
                  </button>
                )}

                <button
                  onClick={onOpenBooking}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#0E282E] hover:bg-[#153B44] rounded-full shadow-md transition-all cursor-pointer"
                >
                  <span>Book Consultation & Insurance Check</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Insurance Carriers Logos / Names */}
            <div className="mt-8 pt-6 border-t border-zinc-100">
              <p className="text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-2">
                Accepted In-Network & PPO Providers
              </p>
              <div className="flex flex-wrap gap-2 text-[11px] font-medium text-zinc-600">
                <span className="px-2.5 py-1 bg-[#FAF9F6] rounded-md border border-zinc-200">Delta Dental</span>
                <span className="px-2.5 py-1 bg-[#FAF9F6] rounded-md border border-zinc-200">MetLife</span>
                <span className="px-2.5 py-1 bg-[#FAF9F6] rounded-md border border-zinc-200">Cigna</span>
                <span className="px-2.5 py-1 bg-[#FAF9F6] rounded-md border border-zinc-200">Aetna</span>
                <span className="px-2.5 py-1 bg-[#FAF9F6] rounded-md border border-zinc-200">Guardian</span>
              </div>
            </div>
          </div>

          {/* Middle Column: 4 Payment Feature Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {paymentFeatures.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#FAF9F6] border border-zinc-200/90 shadow-2xs hover:shadow-xs transition-shadow flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200/80 flex items-center justify-center text-[#0E282E] group-hover:bg-[#0E282E] group-hover:text-[#EAD8B7] transition-colors flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900 font-sans mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: "What to Expect" checklist card (3 cols) */}
          <div className="lg:col-span-3 p-6 rounded-3xl bg-[#FAF9F6] border border-zinc-200/90 shadow-2xs flex flex-col justify-between h-full">
            <div>
              <h3 className="text-base font-serif font-bold text-[#0E282E] mb-4">
                What to Expect
              </h3>
              <ul className="space-y-3.5">
                {expectations.map((exp, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-700">
                    <div className="w-4 h-4 rounded-full bg-[#E8EFF0] text-[#0E282E] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>{exp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-200/70">
              <p className="text-xs font-serif italic text-zinc-600 leading-relaxed">
                &ldquo;We believe premium dentistry should be clear, transparent, and accessible.&rdquo;
              </p>
              <p className="text-[11px] font-semibold text-[#0E282E] mt-2">
                &mdash; PearlView Billing Concierge
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Financing Calculator Modal/Drawer */}
        {showCalculator && (
          <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-[#0E282E] text-white shadow-xl border border-[#1A3E46] animate-in fade-in zoom-in-95 duration-300">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-[#D4AF37]" />
                  <h4 className="font-serif text-lg text-white">0% APR Financing & Payment Estimator</h4>
                </div>
                <button
                  onClick={() => setShowCalculator(false)}
                  className="text-xs text-zinc-400 hover:text-white"
                >
                  Close &times;
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                {/* Sliders */}
                <div className="md:col-span-2 space-y-5">
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-zinc-300">Estimated Procedure Cost:</span>
                      <span className="font-bold text-[#EAD8B7]">${treatmentCost.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min={500}
                      max={8000}
                      step={100}
                      value={treatmentCost}
                      onChange={(e) => setTreatmentCost(Number(e.target.value))}
                      className="w-full accent-[#D4AF37] cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-zinc-300">Estimated Insurance Coverage:</span>
                      <span className="font-bold text-[#EAD8B7]">{insuranceEstimate}% (${Math.round(treatmentCost * (insuranceEstimate / 100)).toLocaleString()})</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={80}
                      step={5}
                      value={insuranceEstimate}
                      onChange={(e) => setInsuranceEstimate(Number(e.target.value))}
                      className="w-full accent-[#D4AF37] cursor-pointer"
                    />
                  </div>

                  <div>
                    <span className="text-xs text-zinc-300 block mb-2">Financing Term:</span>
                    <div className="flex gap-2">
                      {[6, 12, 24].map((term) => (
                        <button
                          key={term}
                          onClick={() => setLoanTerm(term)}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                            loanTerm === term
                              ? 'bg-[#EAD8B7] text-[#0E282E]'
                              : 'bg-white/10 text-white hover:bg-white/20'
                          }`}
                        >
                          {term} Months (0% APR)
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Calculation Output Card */}
                <div className="p-6 rounded-2xl bg-white/10 border border-white/15 text-center flex flex-col justify-center items-center">
                  <span className="text-[11px] uppercase tracking-wider text-zinc-300 font-medium">
                    Estimated Monthly Investment
                  </span>
                  <div className="text-4xl font-serif font-bold text-[#EAD8B7] my-2">
                    ${monthlyPayment} <span className="text-sm font-sans font-normal text-zinc-300">/mo</span>
                  </div>
                  <p className="text-[11px] text-zinc-300">
                    Based on out-of-pocket balance of <strong>${outOfPocket.toLocaleString()}</strong> over {loanTerm} months.
                  </p>
                  <button
                    onClick={onOpenBooking}
                    className="mt-4 w-full py-2.5 bg-white hover:bg-[#EAD8B7] text-[#0E282E] font-semibold text-xs rounded-xl shadow-md transition-colors"
                  >
                    Apply with CareCredit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
