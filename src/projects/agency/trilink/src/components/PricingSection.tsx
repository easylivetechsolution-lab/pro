import React, { useState } from 'react';
import { Check, ArrowRight, ShieldCheck, Zap, Globe, Sparkles } from 'lucide-react';

export const PricingSection: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  return (
    <section id="pricing-section" className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold text-[#00A86B] uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">
            Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 mt-3">
            Simple, pay-as-you-go pricing.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            No setup fees, no monthly minimums, and no hidden surprises. Everything you need to accept payments and scale.
          </p>

          <div className="mt-8 inline-flex items-center p-1 bg-slate-100 rounded-full">
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                billingCycle === 'annual'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Standard Rate
            </button>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Custom Enterprise
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Standard Pay as you go */}
          <div className="rounded-3xl border border-slate-200/90 p-8 bg-slate-50/50 flex flex-col justify-between hover:shadow-xl hover:border-emerald-300 transition-all">
            <div>
              <div className="text-sm font-bold text-slate-900">Online Payments</div>
              <p className="text-xs text-slate-500 mt-1">For web checkouts, mobile apps, and payment links</p>

              <div className="mt-6 mb-6">
                <div className="flex items-baseline">
                  <span className="text-4xl font-extrabold text-slate-950 font-mono">2.9%</span>
                  <span className="text-slate-500 text-sm ml-1 font-mono">+ 30¢</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">per successful domestic transaction</div>
              </div>

              <ul className="space-y-3 text-xs text-slate-600 border-t border-slate-200 pt-6">
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-[#00A86B] shrink-0" />
                  <span>Access to 125+ global payment methods</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-[#00A86B] shrink-0" />
                  <span>Apple Pay, Google Pay, and Link pre-integrated</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-[#00A86B] shrink-0" />
                  <span>Real-time machine learning fraud protection</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-[#00A86B] shrink-0" />
                  <span>Automated Smart Retries for recurring charges</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              className="mt-8 w-full py-3 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm shadow-sm transition-colors"
            >
              Get started now
            </button>
          </div>

          {/* Card 2: In-Person Point of Sale (Recommended) */}
          <div className="rounded-3xl border-2 border-[#00D492] p-8 bg-white shadow-xl flex flex-col justify-between relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#00E599] text-slate-950 text-[11px] font-bold tracking-wider uppercase shadow-xs">
              Unified Commerce
            </div>

            <div>
              <div className="text-sm font-bold text-slate-900">In-Person Terminal</div>
              <p className="text-xs text-slate-500 mt-1">For physical retail, popups, and smart reader tap</p>

              <div className="mt-6 mb-6">
                <div className="flex items-baseline">
                  <span className="text-4xl font-extrabold text-slate-950 font-mono">2.6%</span>
                  <span className="text-slate-500 text-sm ml-1 font-mono">+ 10¢</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">per card-present transaction</div>
              </div>

              <ul className="space-y-3 text-xs text-slate-600 border-t border-slate-100 pt-6">
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-[#00A86B] shrink-0" />
                  <span>Tap to Pay on iPhone & Android with zero hardware</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-[#00A86B] shrink-0" />
                  <span>Pre-certified smart terminal devices available</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-[#00A86B] shrink-0" />
                  <span>Unified customer ledger across online and physical stores</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-[#00A86B] shrink-0" />
                  <span>Offline transaction buffering during network dropouts</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              className="mt-8 w-full py-3 rounded-full bg-[#00E599] hover:bg-[#00D48D] text-slate-950 font-bold text-sm shadow-md transition-all"
            >
              Start terminal setup
            </button>
          </div>

          {/* Card 3: Custom Enterprise */}
          <div className="rounded-3xl border border-slate-200/90 p-8 bg-slate-50/50 flex flex-col justify-between hover:shadow-xl hover:border-emerald-300 transition-all">
            <div>
              <div className="text-sm font-bold text-slate-900">Custom Enterprise</div>
              <p className="text-xs text-slate-500 mt-1">For businesses with large payment volumes or unique models</p>

              <div className="mt-6 mb-6">
                <div className="text-4xl font-extrabold text-slate-950">Volume</div>
                <div className="text-xs text-slate-500 mt-1">discounted interchange-plus pricing</div>
              </div>

              <ul className="space-y-3 text-xs text-slate-600 border-t border-slate-200 pt-6">
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-[#00A86B] shrink-0" />
                  <span>Interchange-plus and tiered rate volume discounts</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-[#00A86B] shrink-0" />
                  <span>Dedicated Technical Account Manager & 24/7 SLA</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-[#00A86B] shrink-0" />
                  <span>Multi-currency treasury accounts with stablecoin rails</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-[#00A86B] shrink-0" />
                  <span>Custom migration assistance & data portability</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              className="mt-8 w-full py-3 rounded-full bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 font-bold text-sm shadow-xs transition-colors"
            >
              Contact sales team
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
