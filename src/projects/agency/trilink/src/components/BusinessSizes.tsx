import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Building,
  Rocket,
  Globe2,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  CreditCard,
  ShieldCheck,
  Zap,
  ExternalLink,
  Layers,
  Sparkles
} from 'lucide-react';

export const BusinessSizes: React.FC = () => {
  // Enterprise accordion state
  const [activeEnterprise, setActiveEnterprise] = useState<'Hertz' | 'URBN' | 'Instacart' | 'LeMonde'>('Hertz');

  // Startups carousel slide state
  const [startupIndex, setStartupIndex] = useState(0);

  // Platform simulation active tab
  const [platformFeature, setPlatformFeature] = useState<'payments' | 'capital' | 'payouts' | 'notification'>('payments');

  // Platform testimonials carousel state
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const enterpriseStories = {
    Hertz: {
      name: 'Hertz',
      title: 'Hertz unifies commerce with Trilink.',
      image: 'https://images.stripeassets.com/fzn2n1nzq965/24BNV3GGtvCprFLrYovyaa/b2eac20a1d5ec75e4bff3888b998d163/enterprise-accordion-hertz.png?w=1232&q=90',
      stats: [
        { label: 'Countries', value: '160' },
        { label: 'Locations globally', value: '11K+' },
        { label: 'Products used', value: 'Payments, Terminal, Connect, Radar, Trilink Sigma' },
      ],
    },
    URBN: {
      name: 'URBN',
      title: 'URBN consolidates $5 billion in online and in-store revenue onto Trilink.',
      image: 'https://images.stripeassets.com/fzn2n1nzq965/37wKFanVluouT2iEZUbD0H/f75e77141e1330ad81ea18c6aea65f0c/enterprise-accordion-urbn.png?w=1232&q=90',
      stats: [
        { label: 'Consumer brands', value: '5+' },
        { label: 'Store locations', value: '700+' },
        { label: 'Products used', value: 'Payments, Terminal, Connect, Trilink Sigma, Radar, Link' },
      ],
    },
    Instacart: {
      name: 'Instacart',
      title: 'Instacart powers online grocery delivery with Trilink.',
      image: 'https://images.stripeassets.com/fzn2n1nzq965/1v5hJ2NWvKpQfVbMqOzCpE/c900b9ed4c288f7cf0a0dced5f4983f2/enterprise-accordion-instacart.png?w=1232&q=90',
      stats: [
        { label: 'Shoppers', value: '600K+' },
        { label: 'Retail partners', value: '1.8K across 100K stores' },
        { label: 'Products used', value: 'Payments, Connect, Data Pipeline, Issuing' },
      ],
    },
    LeMonde: {
      name: 'Le Monde',
      title: 'Le Monde improves local and international payments with Trilink.',
      image: 'https://images.stripeassets.com/fzn2n1nzq965/5AQ9A87KzwpPy4CD3uPz5C/4afd1a1e9d6e1d698c4c7c74a4868822/enterprise-accordion-lemonde.png?w=1232&q=90',
      stats: [
        { label: 'Digital & print payments', value: '100%' },
        { label: 'Go-live timeline', value: '<3 months' },
        { label: 'Products used', value: 'Payments, Trilink Sigma, Radar' },
      ],
    },
  };

  const startupStories = [
    {
      company: 'Lovable',
      title: 'Lovable grows into a vibe-coding juggernaut with Trilink.',
      image: 'https://images.stripeassets.com/fzn2n1nzq965/1CBkJePR5Cwf2QNIVCia1I/c0a702cec7a3814c69f21f86b89ed718/lovable.png?w=432&q=90',
      tag: 'AI App Generation',
    },
    {
      company: 'Gamma',
      title: 'Gamma expands to $100M ARR and 70 million users with Trilink.',
      image: 'https://images.stripeassets.com/fzn2n1nzq965/2QjRFO1cRvocACDtyA7g9e/44245671788d6e086ab7d82b37937450/Gamma.png?w=432&q=90',
      tag: 'Presentations & Docs',
    },
    {
      company: 'Runway',
      title: 'Runway protects developer time with no-code solutions from Trilink.',
      image: 'https://images.stripeassets.com/fzn2n1nzq965/6fpvaTP1TZWXKWVMewABjV/4412b9ca2940d89d3834ac65c1fc329d/Runway.png?w=432&q=90',
      tag: 'GenAI Video',
    },
    {
      company: 'Supabase',
      title: 'Supabase delivers its backend-as-a-service to 150 countries with Trilink.',
      image: 'https://images.stripeassets.com/fzn2n1nzq965/7fM8bvEbivprOMM1zyow9N/3cad3cc826f96e4038b4ea88d81ebe3b/Supabase.png?w=432&q=90',
      tag: 'Developer Cloud',
    },
    {
      company: 'Linear',
      title: 'Linear partners with Trilink to handle billing and payments.',
      image: 'https://images.stripeassets.com/fzn2n1nzq965/4b8Ubw7N2kYwb7QZl3Ogri/422cc19f725aa68e647d90ce2833c8d0/linear.png?w=432&q=90',
      tag: 'Issue Tracking & PM',
    },
    {
      company: 'ElevenLabs',
      title: 'ElevenLabs grows into a $3B AI audio leader with Trilink.',
      image: 'https://images.stripeassets.com/fzn2n1nzq965/JK7aZoMzWA3uUbLb35kxx/dea1444a0aee29751c0c7098ffb33534/Eleven_Labs.png?w=432&q=90',
      tag: 'Voice Synthesis',
    },
    {
      company: 'Browserbase',
      title: 'Browserbase offers usage-based billing for an AI agent browser with Trilink.',
      image: 'https://images.stripeassets.com/fzn2n1nzq965/1NiQJZA0rKbwXZ7mD4BCrM/0abdaba77e564f858a33241a9aab0939/browserbase.png?w=432&q=90',
      tag: 'Headless Browser AI',
    },
    {
      company: 'Decagon',
      title: 'Decagon decreases support costs by 65% with Trilink-integrated agents.',
      image: 'https://images.stripeassets.com/fzn2n1nzq965/1hreJwxuVJ5ucPtuA7pRKH/3c5630387bca898d01ae17fc7ae2890a/decagon.png?w=432&q=90',
      tag: 'Enterprise Support AI',
    },
  ];

  const testimonials = [
    {
      company: 'Mindbody',
      quote:
        'With Trilink, we have a global technology partner to help our customers—from Canadian yoga studios to British boxing classes—keep growing and evolving in a new wellness world.',
      author: 'Kurtis Moyer',
      role: 'Lead Product Manager of Payments, Mindbody',
    },
    {
      company: 'Jobber',
      quote:
        'Without Trilink, it would have taken significant time and engineering effort to offer these resources to our customers. The financial infrastructure Trilink offers is incredibly valuable.',
      author: 'Laura Collinson',
      role: 'Director of Fintech, Jobber',
    },
    {
      company: 'Substack',
      quote:
        'Trilink makes the subscriptions and payment piece really easy for everyone involved. And that helps us make it easy for writers and other creators to do the work they want to do on Substack and get paid for it.',
      author: 'Seth McMillan',
      role: 'Engineering Manager, Substack',
    },
    {
      company: 'Lightspeed',
      quote:
        'Trilink offers an enterprise-grade infrastructure that puts our customers on the cutting edge of modern payments technology. The combination of Terminal and Connect is a powerful integrated solution.',
      author: 'Dax Dasilva',
      role: 'Founder and CEO, Lightspeed',
    },
  ];

  return (
    <div className="bg-white py-24 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28">
        {/* ========================================================================= */}
        {/* SECTION HEADER */}
        {/* ========================================================================= */}
        <div className="max-w-3xl">
          <span className="text-xs font-bold text-[#00A86B] uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">
            Scale Across Stages
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 mt-3">
            Powering businesses of all sizes.
          </h2>
          <p className="mt-3 text-lg sm:text-xl text-slate-600 font-normal">
            Run your business on a reliable platform that adapts to your needs.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 1. ENTERPRISES */}
        {/* ========================================================================= */}
        <section id="enterprises" className="space-y-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="max-w-2xl">
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
                Transform your enterprise with agile financial infrastructure
              </h3>
              <p className="mt-2 text-slate-600 text-base">
                50% of Fortune 100 companies have used Trilink to grow their businesses—from expanding internationally to reimagining the customer experience.
              </p>
            </div>
            <a
              href="#contact-sales"
              className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm shadow-sm shrink-0"
            >
              <span>Trilink for enterprises</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>

          {/* Customer Stories Tabs Accordion */}
          <div className="rounded-3xl border border-slate-200/90 overflow-hidden bg-slate-50/60 shadow-md">
            {/* Story Navigation Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-slate-200 bg-white">
              {(['Hertz', 'URBN', 'Instacart', 'LeMonde'] as const).map((key) => {
                const isSelected = activeEnterprise === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveEnterprise(key)}
                    className={`py-4 px-6 text-left font-bold text-sm transition-all border-b-2 ${
                      isSelected
                        ? 'border-[#00A86B] text-slate-950 bg-emerald-50/40'
                        : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <span className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-0.5">
                      Case Study
                    </span>
                    <span>{enterpriseStories[key].name}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Story Content */}
            <div className="p-6 sm:p-10 space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight leading-snug">
                    {enterpriseStories[activeEnterprise].title}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200">
                    {enterpriseStories[activeEnterprise].stats.map((s, i) => (
                      <div key={i} className="p-3.5 bg-white rounded-xl border border-slate-200/80 shadow-xs">
                        <div className="text-xs text-slate-500 font-medium">{s.label}</div>
                        <div className="text-base sm:text-lg font-bold text-slate-900 mt-1 font-mono">{s.value}</div>
                      </div>
                    ))}
                  </div>

                  <a
                    href="#contact-sales"
                    className="inline-flex items-center text-sm font-bold text-[#00A86B] hover:underline"
                  >
                    <span>Read {enterpriseStories[activeEnterprise].name} case study</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </a>
                </div>

                <div className="lg:col-span-5 rounded-2xl overflow-hidden shadow-md border border-slate-200/60 bg-white">
                  <img
                    src={enterpriseStories[activeEnterprise].image}
                    alt={enterpriseStories[activeEnterprise].name}
                    className="w-full h-64 sm:h-72 object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Enterprise Value Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-4">
                <Building className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Professional Services</h4>
              <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
                Get tailored guidance from Trilink specialists on architecture, complex integrations, or zero-downtime ledger migrations.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#00A86B] flex items-center justify-center font-bold mb-4">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Trilink-Certified Experts</h4>
              <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
                Collaborate with global systems integrators and certified partner agencies ready to implement custom fintech workflows.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Enterprise Support Plans</h4>
              <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
                24/7 designated incident responders, custom SLAs, emergency war rooms, and proactive peak-season monitoring.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. STARTUPS */}
        {/* ========================================================================= */}
        <section id="startups" className="space-y-10 pt-12 border-t border-slate-100">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="max-w-2xl">
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
                Build a foundation for your startup that enables faster growth
              </h3>
              <p className="mt-2 text-slate-600 text-base">
                From stablecoin pioneers to 88% of the Forbes AI 50, startups build what's next on Trilink’s easy-to-integrate financial stack.
              </p>
            </div>

            {/* Carousel Nav buttons */}
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setStartupIndex(Math.max(0, startupIndex - 1))}
                disabled={startupIndex === 0}
                className="p-2.5 rounded-full border border-slate-200 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-slate-800"
                aria-label="Previous startups"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setStartupIndex(Math.min(startupStories.length - 3, startupIndex + 1))}
                disabled={startupIndex >= startupStories.length - 3}
                className="p-2.5 rounded-full border border-slate-200 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-slate-800"
                aria-label="Next startups"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Startups Carousel */}
          <div className="overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${startupIndex * 33.333}%)` }}
            >
              {startupStories.map((story, i) => (
                <div
                  key={i}
                  className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 rounded-3xl border border-slate-200/90 overflow-hidden bg-white shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="h-52 overflow-hidden bg-slate-100 relative">
                      <img
                        src={story.image}
                        alt={story.company}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <span className="absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-slate-900 shadow-xs">
                        {story.tag}
                      </span>
                    </div>

                    <div className="p-6">
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#00A86B] transition-colors leading-snug">
                        {story.title}
                      </h4>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2">
                    <span className="text-xs font-bold text-[#00A86B] flex items-center group-hover:underline">
                      Read {story.company}’s story <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Startups Programs Banner Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50/40 border border-emerald-200/80 flex flex-col justify-between shadow-sm">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                  Accelerator & Grants
                </span>
                <h4 className="text-xl font-bold text-slate-950 mt-3">Trilink Startups Program</h4>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  Access up to $50,000 in fee-free transaction credits, prioritized support, focused founder community, and technical mentorship.
                </p>
              </div>
              <div className="mt-6">
                <a href="#contact-sales" className="inline-flex items-center text-sm font-bold text-[#00A86B] hover:underline">
                  Apply for startup credits <ArrowRight className="w-4 h-4 ml-1.5" />
                </a>
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50/40 border border-blue-200/80 flex flex-col justify-between shadow-sm">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-100/80 px-2.5 py-0.5 rounded-full">
                  Instant Legal Entity
                </span>
                <h4 className="text-xl font-bold text-slate-950 mt-3">Trilink Atlas</h4>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  Incorporate a Delaware C-Corp or LLC, obtain your US EIN tax ID, issue founder shares, and open a bank account in just two business days.
                </p>
              </div>
              <div className="mt-6">
                <a href="#contact-sales" className="inline-flex items-center text-sm font-bold text-blue-600 hover:underline">
                  Start your company with Atlas <ArrowRight className="w-4 h-4 ml-1.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. PLATFORMS & SAAS */}
        {/* ========================================================================= */}
        <section id="platforms" className="space-y-10 pt-12 border-t border-slate-100">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="max-w-2xl">
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
                Make your SaaS platform a complete financial operating system
              </h3>
              <p className="mt-2 text-slate-600 text-base">
                From high-growth vertical software to Fortune 500 SaaS, platforms use Trilink to monetize transaction flows and offer embedded banking services.
              </p>
            </div>
            <a
              href="#contact-sales"
              className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-[#00E599] hover:bg-[#00D48D] text-slate-950 font-bold text-sm shadow-sm shrink-0"
            >
              <span>Trilink for platforms</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>

          {/* Interactive Embedded Platform Simulator */}
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
                  Embedded Component API
                </span>
                <div className="text-lg font-bold text-white mt-1">
                  trilinkConnectInstance.create('
                  <span className="text-emerald-300">{platformFeature}</span>
                  ');
                </div>
              </div>

              {/* Component selector pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'payments', label: 'Payments' },
                  { id: 'capital', label: 'Capital Promotion' },
                  { id: 'payouts', label: 'Instant Payouts' },
                  { id: 'notification', label: 'Risk Banner' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setPlatformFeature(item.id as any)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      platformFeature === item.id
                        ? 'bg-[#00E599] text-slate-950 font-bold shadow-sm'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Simulated Embedded View */}
            <div className="mt-8 bg-slate-950 rounded-2xl p-6 border border-slate-800/80">
              {platformFeature === 'payments' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="flex justify-between items-center text-sm font-bold border-b border-slate-800 pb-3">
                    <span>Recent Customer Transactions</span>
                    <span className="text-xs font-mono text-emerald-400">Live Webhook Feed</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    {[
                      { amount: '$15.99', status: 'Succeeded', method: 'Mastercard •••• 1234', desc: 'Single class' },
                      { amount: '$999.99', status: 'Succeeded', method: 'Klarna Pay in 4', desc: 'Annual pass' },
                      { amount: '$119.99', status: 'Succeeded', method: 'Apple Pay •••• 5678', desc: 'Monthly auto-renew' },
                    ].map((tx, idx) => (
                      <div key={idx} className="p-3 bg-slate-900/90 rounded-xl flex items-center justify-between border border-slate-800/50">
                        <div className="flex items-center space-x-3">
                          <span className="font-mono font-bold text-white text-sm">{tx.amount}</span>
                          <span className="text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded text-[10px] font-semibold">{tx.status}</span>
                        </div>
                        <span className="text-slate-400 font-mono text-[11px]">{tx.method}</span>
                        <span className="text-slate-300 font-medium">{tx.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {platformFeature === 'capital' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="flex justify-between items-center text-sm font-bold border-b border-slate-800 pb-3">
                    <span>Pre-Approved Capital Offer</span>
                    <span className="text-xs text-purple-400 bg-purple-950 px-2 py-0.5 rounded">Expires in 14 days</span>
                  </div>
                  <div className="p-5 bg-gradient-to-r from-purple-950/50 to-slate-900 rounded-2xl border border-purple-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="text-2xl font-bold font-mono text-white">$37,000 Pre-Qualified</div>
                      <p className="text-xs text-slate-300 mt-1">Automatic repayment from future card transactions. No personal guarantee required.</p>
                    </div>
                    <button className="px-5 py-2.5 bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs rounded-xl shadow-sm shrink-0">
                      Accept Offer
                    </button>
                  </div>
                </div>
              )}

              {platformFeature === 'payouts' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="flex justify-between items-center text-sm font-bold border-b border-slate-800 pb-3">
                    <span>Account Balance & Payouts</span>
                    <span className="text-xs font-mono text-emerald-400">FDIC Passthrough Insured</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="text-xs text-slate-400">Total Balance</div>
                      <div className="text-xl font-bold font-mono text-white mt-1">$8,820.56</div>
                    </div>
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="text-xs text-slate-400">Available to Pay Out</div>
                      <div className="text-xl font-bold font-mono text-emerald-400 mt-1">$4,341.80</div>
                    </div>
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center">
                      <button className="w-full py-2.5 bg-[#00E599] hover:bg-[#00D48D] text-slate-950 font-bold text-xs rounded-lg shadow-sm">
                        Initiate Instant Payout
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {platformFeature === 'notification' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="flex justify-between items-center text-sm font-bold border-b border-slate-800 pb-3">
                    <span>Embedded Compliance Notice Banner</span>
                    <span className="text-xs text-amber-400">Action Required</span>
                  </div>
                  <div className="p-4 bg-amber-950/40 border border-amber-800/60 rounded-xl flex items-center justify-between text-xs text-amber-200">
                    <div className="flex items-center space-x-3">
                      <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
                      <span>Beneficial ownership verification required before next payout disbursement.</span>
                    </div>
                    <button className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs shrink-0">
                      Submit Info
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Platform Testimonial Carousel */}
          <div className="pt-8">
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200/80">
              <div className="flex items-center justify-between mb-6">
                <div className="flex space-x-2">
                  {testimonials.map((t, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveTestimonial(idx)}
                      className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
                        activeTestimonial === idx
                          ? 'bg-slate-950 text-white shadow-xs'
                          : 'bg-white text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {t.company}
                    </button>
                  ))}
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  {activeTestimonial + 1} of {testimonials.length}
                </div>
              </div>

              <blockquote className="text-base sm:text-xl font-medium text-slate-800 italic leading-relaxed mb-6">
                "{testimonials[activeTestimonial].quote}"
              </blockquote>

              <div className="text-xs font-bold text-slate-900">
                {testimonials[activeTestimonial].author}
                <span className="text-slate-500 font-normal ml-1">
                  — {testimonials[activeTestimonial].role}
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
