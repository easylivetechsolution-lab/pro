import React, { useState } from 'react';
import {
  Check,
  ArrowRight,
  ShieldCheck,
  Globe2,
  Zap,
  CreditCard,
  Building2,
  HelpCircle,
  Sliders,
  ChevronDown,
  Layers,
  BarChart3,
  Receipt,
  Headphones,
  Cpu,
  Lock,
  Coins,
  Store
} from 'lucide-react';

interface PricingPageProps {
  onOpenSignIn?: () => void;
  onOpenContactSales?: () => void;
  onNavigateHome?: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({
  onOpenSignIn,
  onOpenContactSales,
  onNavigateHome,
}) => {
  // Currency selection
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD' | 'AUD'>('USD');

  // Calculator state
  const [monthlyVolume, setMonthlyVolume] = useState<number>(150000);
  const [avgTicket, setAvgTicket] = useState<number>(45);

  // Active FAQ
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const currencyConfig = {
    USD: { symbol: '$', rate: '2.9% + 30¢', fixedFee: 0.30, domesticName: 'US cards' },
    EUR: { symbol: '€', rate: '1.5% + 0.25€', fixedFee: 0.25, domesticName: 'European cards' },
    GBP: { symbol: '£', rate: '1.5% + 20p', fixedFee: 0.20, domesticName: 'UK cards' },
    JPY: { symbol: '¥', rate: '3.6%', fixedFee: 0.0, domesticName: 'Japan domestic cards' },
    CAD: { symbol: 'CA$', rate: '2.9% + 30¢', fixedFee: 0.30, domesticName: 'Canadian cards' },
    AUD: { symbol: 'A$', rate: '1.75% + 30¢', fixedFee: 0.30, domesticName: 'Australian cards' },
  };

  // Calculator calculations
  const transactionCount = Math.max(1, Math.round(monthlyVolume / avgTicket));
  const currentFixed = currencyConfig[currency].fixedFee;
  const isJpy = currency === 'JPY';
  const percentageFee = isJpy ? 0.036 : currency === 'EUR' || currency === 'GBP' ? 0.015 : currency === 'AUD' ? 0.0175 : 0.029;
  const estimatedFee = (monthlyVolume * percentageFee) + (transactionCount * currentFixed);
  const effectiveRate = ((estimatedFee / monthlyVolume) * 100).toFixed(2);
  const netPayout = monthlyVolume - estimatedFee;
  const volumeDiscountEstimated = monthlyVolume >= 100000 ? estimatedFee * 0.18 : 0;

  const faqs = [
    {
      q: 'What does "pay-as-you-go" pricing mean?',
      a: 'With Trilink pay-as-you-go pricing, you only pay when you process a transaction. There are no setup fees, monthly minimums, maintenance costs, or termination penalties. If you process zero transactions in a month, you pay zero dollars.',
    },
    {
      q: 'Are there any hidden fees or monthly gateway charges?',
      a: 'No. Unlike legacy merchant account providers, Trilink does not charge gateway access fees, batch settlement fees, PCI compliance validation fees, or cancellation fees. The rates shown above cover the complete payment platform.',
    },
    {
      q: 'What fees apply for international cards and currency conversion?',
      a: 'For cards issued outside your account jurisdiction, an additional +1% fee applies to cover cross-border processing interchange. If Trilink must convert currency between the customer currency and your payout bank account currency, a transparent 1% currency conversion rate applies.',
    },
    {
      q: 'How do dispute and chargeback fees work?',
      a: 'If a customer disputes a payment with their card issuer, a dispute fee ($15.00 in the US) is assessed by the card network. If you submit evidence through Trilink and win the dispute, Trilink returns the dispute fee back to your account balance.',
    },
    {
      q: 'When do I qualify for custom volume pricing?',
      a: 'Businesses processing over $100,000 per month or expecting rapid transaction velocity qualify for custom Interchange-Plus (IC+) pricing, volume tiers, and bundled product discounts. Contact our enterprise sales team for a custom quote.',
    },
    {
      q: 'How quickly do funds reach my bank account?',
      a: 'Standard payouts operate on a rolling 2-business-day schedule (e.g. transactions processed on Monday are deposited into your bank account on Wednesday). Eligible accounts can also activate Instant Payouts to receive funds in seconds, 24/7/365, for a 1% fee.',
    },
    {
      q: 'Is customer cardholder data secure?',
      a: 'Yes. Trilink is certified to PCI Service Provider Level 1—the highest level of certification available in the payments industry. Your servers never touch raw credit card numbers when using Trilink Elements or Hosted Checkout.',
    },
    {
      q: 'What payment methods are supported out of the box?',
      a: 'Trilink supports Visa, Mastercard, American Express, Discover, JCB, Apple Pay, Google Pay, Link by Trilink, Klarna, Affirm, Afterpay, WeChat Pay, Alipay, and local bank payment methods like SEPA, iDEAL, and Bancontact.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 pt-28 pb-20">
      {/* ========================================================================= */}
      {/* 1. HERO HEADER WITH COUNTRY / CURRENCY SELECTOR                           */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb back to Home */}
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 mb-6">
          <button
            type="button"
            onClick={onNavigateHome}
            className="hover:text-slate-950 transition-colors"
          >
            Trilink Home
          </button>
          <span>/</span>
          <span className="text-[#00A86B]">Pricing</span>
        </div>

        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#00875A] text-xs font-bold uppercase tracking-wider mb-4">
            <span>Simple, transparent pricing</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.1]">
            Pricing built for businesses of all sizes.
          </h1>

          <p className="mt-5 text-lg sm:text-xl text-slate-600 font-normal leading-relaxed">
            Access a complete payments platform with simple, pay-as-you-go pricing. No setup fees, monthly fees, or hidden fees.
          </p>
        </div>

        {/* Currency & Country Selector Dropdown */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select currency:</span>
          <div className="flex flex-wrap gap-2">
            {(['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'] as const).map((curr) => (
              <button
                key={curr}
                type="button"
                onClick={() => setCurrency(curr)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  currency === curr
                    ? 'bg-[#0a2540] text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {curr} ({currencyConfig[curr].symbol})
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. THE TWO SIGNATURE STRIPE PRICING CARDS (Standard vs Custom)             */}
        {/* ========================================================================= */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Card 1: Standard Pay-as-you-go */}
          <div className="lg:col-span-6 rounded-3xl bg-white border border-slate-200 shadow-xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden ring-1 ring-slate-100">
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#00A86B] bg-emerald-50 px-3 py-1 rounded-full">
                    Standard
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-3">
                    Pay as you go
                  </h2>
                </div>
              </div>

              <p className="text-sm text-slate-600 mt-2">
                Access a complete payments platform with simple, pay-as-you-go pricing. No setup fees, monthly fees, or hidden fees.
              </p>

              {/* Price display */}
              <div className="mt-8 pb-8 border-b border-slate-100">
                <div className="flex items-baseline space-x-2">
                  <span className="text-4xl sm:text-5xl font-extrabold text-slate-950 tracking-tight font-mono">
                    {currencyConfig[currency].rate}
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-2 space-y-1">
                  <p>per successful transaction for {currencyConfig[currency].domesticName}</p>
                  <p className="text-slate-400">+1% for international cards · +1% if currency conversion is required</p>
                </div>
              </div>

              {/* Features list */}
              <div className="mt-8 space-y-3.5 text-xs text-slate-700">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Included out of the box:
                </div>
                {[
                  '135+ currencies and dozens of payment methods',
                  'Built-in fraud prevention with Trilink Radar ML',
                  'Conversion-optimized prebuilt Checkout & Elements',
                  '1-click checkout with Trilink Link',
                  'Dynamic 3D Secure 2 authentication',
                  'Automated 2-day rolling bank payouts',
                  '24/7 phone, chat, and email support',
                  'Complete dashboard reporting & team access',
                ].map((feature, i) => (
                  <div key={i} className="flex items-start space-x-2.5">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-[#00A86B] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span className="leading-snug">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 pt-6">
              <button
                type="button"
                onClick={onOpenSignIn}
                className="w-full group inline-flex items-center justify-center py-3.5 px-6 rounded-full bg-[#00E599] hover:bg-[#00D48D] text-slate-950 font-bold text-sm shadow-md hover:shadow-lg transition-all"
              >
                <span>Get started with Standard</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Card 2: Custom Enterprise Split Card */}
          <div className="lg:col-span-6 rounded-3xl bg-[#0a2540] text-white shadow-xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden border border-[#0a2540]">
            {/* Subtle glow in corner */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#00E599] bg-emerald-500/20 px-3 py-1 rounded-full">
                    Custom
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
                    High volume or unique models
                  </h2>
                </div>
              </div>

              <p className="text-sm text-slate-300 mt-2">
                Design a custom package—available for businesses with large payments volume or unique business models.
              </p>

              {/* Custom features grid */}
              <div className="mt-8 pb-8 border-b border-slate-700/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-xs font-bold text-[#00E599]">IC+ Pricing</div>
                  <p className="text-xs text-slate-300 mt-1">Interchange-plus pass-through with zero markup slippage.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-xs font-bold text-[#00E599]">Volume Discounts</div>
                  <p className="text-xs text-slate-300 mt-1">Tiered pricing that automatically discounts as volume grows.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-xs font-bold text-[#00E599]">Multi-Product Savings</div>
                  <p className="text-xs text-slate-300 mt-1">Bundle Billing, Invoicing, Tax, and Radar under one rate.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-xs font-bold text-[#00E599]">Country-Specific Rates</div>
                  <p className="text-xs text-slate-300 mt-1">Localized card processing fees optimized per market.</p>
                </div>
              </div>

              {/* Dedicated Enterprise Benefits */}
              <div className="mt-8 space-y-3 text-xs text-slate-300">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Enterprise service level:
                </div>
                {[
                  'Dedicated Technical Account Manager & Solutions Architect',
                  '99.999% guaranteed historical SLA with contractual backing',
                  'Complimentary zero-downtime card data migration support',
                  'Priority 24/7/365 phone dispatch & private Slack/Teams channel',
                  'Custom fraud model training on your historical charge data',
                ].map((feature, i) => (
                  <div key={i} className="flex items-start space-x-2.5">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-[#00E599] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span className="leading-snug">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 pt-6 relative z-10">
              <button
                type="button"
                onClick={onOpenContactSales}
                className="w-full group inline-flex items-center justify-center py-3.5 px-6 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-bold text-sm shadow-md hover:shadow-lg transition-all"
              >
                <span>Contact sales for custom rates</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. INTERACTIVE FEE ESTIMATOR & VOLUME SAVINGS CALCULATOR                   */}
        {/* ========================================================================= */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-sm">
          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#00A86B] mb-2">
              <Sliders className="w-4 h-4" />
              <span>Interactive Fee Calculator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
              Estimate your processing fees and net revenue
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Adjust your monthly processing volume and average order size to preview fees with total transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Controls */}
            <div className="lg:col-span-7 space-y-6">
              {/* Slider 1: Monthly Volume */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-slate-700">Estimated Monthly Volume</span>
                  <span className="font-mono font-extrabold text-slate-950 text-base">
                    {currencyConfig[currency].symbol}{monthlyVolume.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="1000000"
                  step="5000"
                  value={monthlyVolume}
                  onChange={(e) => setMonthlyVolume(Number(e.target.value))}
                  className="w-full accent-[#00A86B] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>{currencyConfig[currency].symbol}5,000</span>
                  <span>{currencyConfig[currency].symbol}500,000</span>
                  <span>{currencyConfig[currency].symbol}1,000,000+</span>
                </div>
              </div>

              {/* Slider 2: Average Order Value */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-slate-700">Average Order Size</span>
                  <span className="font-mono font-extrabold text-slate-950 text-base">
                    {currencyConfig[currency].symbol}{avgTicket.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="250"
                  step="5"
                  value={avgTicket}
                  onChange={(e) => setAvgTicket(Number(e.target.value))}
                  className="w-full accent-[#00A86B] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>{currencyConfig[currency].symbol}5</span>
                  <span>{currencyConfig[currency].symbol}100</span>
                  <span>{currencyConfig[currency].symbol}250</span>
                </div>
              </div>
            </div>

            {/* Right Summary Card */}
            <div className="lg:col-span-5 bg-[#0a2540] text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-5">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Monthly Breakdown
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between pb-2 border-b border-slate-700/80">
                  <span className="text-slate-300">Total Transactions</span>
                  <span className="font-mono font-bold text-white">{transactionCount.toLocaleString()} orders</span>
                </div>

                <div className="flex justify-between pb-2 border-b border-slate-700/80">
                  <span className="text-slate-300">Estimated Trilink Fees</span>
                  <span className="font-mono font-bold text-emerald-400">
                    {currencyConfig[currency].symbol}{estimatedFee.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex justify-between pb-2 border-b border-slate-700/80">
                  <span className="text-slate-300">Effective Rate</span>
                  <span className="font-mono font-bold text-white">{effectiveRate}%</span>
                </div>

                <div className="flex justify-between items-baseline pt-2">
                  <span className="text-sm font-bold text-white">Net Deposited Revenue</span>
                  <span className="font-mono text-xl sm:text-2xl font-extrabold text-[#00E599]">
                    {currencyConfig[currency].symbol}{netPayout.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {monthlyVolume >= 100000 && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-[#00E599] flex items-center justify-between">
                  <span>Eligible for volume discount tier!</span>
                  <button
                    type="button"
                    onClick={onOpenContactSales}
                    className="underline font-bold text-white hover:text-[#00E599]"
                  >
                    Contact sales
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. FEATURES AVAILABLE OUT OF THE BOX (8 SIGNATURE STRIPE PILLARS)          */}
        {/* ========================================================================= */}
        <div className="mt-24">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">
              Features available out of the box
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Everything required to accept payments, prevent fraud, optimize checkout conversion, and scale globally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Globe2,
                title: 'Global access',
                desc: 'Accept payments in 135+ currencies with local payment methods like Apple Pay, Google Pay, Klarna, Affirm, and SEPA.',
              },
              {
                icon: ShieldCheck,
                title: 'Built-in fraud prevention',
                desc: 'Trilink Radar uses machine learning trained on billions in global velocity to detect and block fraud without declining legitimate buyers.',
              },
              {
                icon: Zap,
                title: 'Conversion optimization',
                desc: 'Prebuilt checkout elements, 1-click Link checkout, and dynamic payment method ordering tailored to each consumer device.',
              },
              {
                icon: BarChart3,
                title: 'Revenue recovery',
                desc: 'Smart retry algorithms automatically retry failed recurring transactions at the optimal millisecond to maximize recovered ARR.',
              },
              {
                icon: Layers,
                title: 'Embedded platform payments',
                desc: 'Trilink Connect facilitates multi-party splits, marketplace seller onboarding, and platform monetization with drop-in components.',
              },
              {
                icon: CreditCard,
                title: 'Fast predictable payouts',
                desc: 'Receive funds in your bank account on a rolling 2-day schedule, or enable Instant Payouts to cash out in minutes.',
              },
              {
                icon: Headphones,
                title: '24/7 phone & chat support',
                desc: 'Get support when you need it with real humans available around the clock by live chat, phone callback, and email.',
              },
              {
                icon: Lock,
                title: 'Security and compliance',
                desc: 'Certified to PCI Service Provider Level 1 and SOC 2 Type II with automated regulatory reporting and 1099 tax filing.',
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#00A86B] flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-950">{item.title}</h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 5. PRODUCT ADD-ONS TABLE                                                  */}
        {/* ========================================================================= */}
        <div className="mt-24">
          <div className="max-w-2xl mb-8">
            <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">
              Modular product add-ons
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Add specialized capabilities as your business requirements expand.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-200">
                    <th className="py-4 px-6">Product</th>
                    <th className="py-4 px-6">What it does</th>
                    <th className="py-4 px-6">Pricing</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  <tr>
                    <td className="py-4 px-6 font-bold text-slate-950 flex items-center space-x-2">
                      <ShieldCheck className="w-4 h-4 text-[#00A86B]" />
                      <span>Trilink Radar for Fraud Teams</span>
                    </td>
                    <td className="py-4 px-6 text-slate-600">Advanced custom rules, blocklists, and manual review workflows</td>
                    <td className="py-4 px-6 font-mono font-bold text-slate-950">+5¢ per screened charge</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-bold text-slate-950 flex items-center space-x-2">
                      <BarChart3 className="w-4 h-4 text-purple-600" />
                      <span>Trilink Billing & Subscriptions</span>
                    </td>
                    <td className="py-4 px-6 text-slate-600">Usage-based meters, recurring billing, tiered pricing, customer portal</td>
                    <td className="py-4 px-6 font-mono font-bold text-slate-950">0.5% on recurring volume</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-bold text-slate-950 flex items-center space-x-2">
                      <Receipt className="w-4 h-4 text-blue-600" />
                      <span>Trilink Invoicing</span>
                    </td>
                    <td className="py-4 px-6 text-slate-600">Online invoices, automated PDF generation, payment reminders</td>
                    <td className="py-4 px-6 font-mono font-bold text-slate-950">25 free/mo, then 0.4% per invoice</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-bold text-slate-950 flex items-center space-x-2">
                      <Store className="w-4 h-4 text-emerald-600" />
                      <span>Trilink Terminal (In-person POS)</span>
                    </td>
                    <td className="py-4 px-6 text-slate-600">Pre-certified smart card readers and Tap to Pay on iPhone/Android</td>
                    <td className="py-4 px-6 font-mono font-bold text-slate-950">2.7% + 5¢ per in-person charge</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-bold text-slate-950 flex items-center space-x-2">
                      <CreditCard className="w-4 h-4 text-cyan-600" />
                      <span>Trilink Issuing</span>
                    </td>
                    <td className="py-4 px-6 text-slate-600">Instant programmatic virtual and custom physical cards</td>
                    <td className="py-4 px-6 font-mono font-bold text-slate-950">10¢ per virtual card / $3 per physical</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 6. FREQUENTLY ASKED QUESTIONS (ACCORDION)                                 */}
        {/* ========================================================================= */}
        <div className="mt-24 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">
              Frequently asked questions
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Everything you need to know about Trilink pricing and billing terms.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between space-x-4 focus:outline-none"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                      openFaq === i ? 'rotate-180 text-slate-900' : ''
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 7. BOTTOM CTA SECTION                                                     */}
        {/* ========================================================================= */}
        <div className="mt-28 p-10 sm:p-14 rounded-3xl bg-[#0a2540] text-white flex flex-col sm:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="max-w-xl text-center sm:text-left">
            <h2 className="text-3xl font-extrabold tracking-tight">
              Ready to start accepting payments?
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              Create an account in minutes or contact our team to discuss customized enterprise rates.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenSignIn}
              className="px-6 py-3 rounded-full bg-[#00E599] hover:bg-[#00D48D] text-slate-950 font-bold text-sm shadow-md transition-all flex items-center group"
            >
              <span>Get started now</span>
              <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              type="button"
              onClick={onOpenContactSales}
              className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-colors"
            >
              Contact sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
