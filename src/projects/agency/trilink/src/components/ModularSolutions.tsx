import React, { useState } from 'react';
import {
  CreditCard,
  Maximize2,
  Check,
  Bot,
  Layers,
  Coins,
  ArrowUpRight,
  TrendingUp,
  Cpu,
  Globe,
  Sliders,
  DollarSign,
  ChevronRight,
  Send,
  ShoppingBag
} from 'lucide-react';
import { BentoDetailModal, type BentoModalData } from './BentoDetailModal';

export const ModularSolutions: React.FC = () => {
  const [selectedModal, setSelectedModal] = useState<BentoModalData | null>(null);

  // Card 1 State: Payments currency/locale switch
  const [currencyIndex, setCurrencyIndex] = useState<'USD' | 'EUR' | 'JPY'>('USD');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'card' | 'affirm' | 'klarna' | 'crypto'>('card');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Card 2 State: Billing token slider
  const [tokenUsage, setTokenUsage] = useState(2010); // in millions
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  // Card 3 State: Agentic Commerce Chat
  const [agentPurchased, setAgentPurchased] = useState(false);

  // Card 4 State: Issuing Card spending limit
  const [cardLimit, setCardLimit] = useState(5000);
  const [cardActive, setCardActive] = useState(true);

  // Card 6 State: Connect active row selection
  const [selectedStudio, setSelectedStudio] = useState<'Daybreak' | 'Jackson' | 'QuietFire'>('Daybreak');

  const bentoModals: Record<string, BentoModalData> = {
    payments: {
      id: 'payments',
      badge: 'Payments Suite',
      title: 'Accept and optimize payments globally—online and in person',
      description:
        'Simplify your checkout, expand your reach, and boost conversion with AI-powered tools to accept payments anywhere in over 135+ currencies.',
      features: [
        { title: 'Optimized Checkout UIs', desc: 'Prebuilt, conversion-optimized checkout elements supporting 125+ payment methods.' },
        { title: 'In-person Smart Terminals', desc: 'EMV, contactless Tap to Pay on iPhone and Android, and pre-certified hardware.' },
        { title: 'Dynamic Currency Conversion', desc: 'Present prices in local currencies with automatic FX conversion and settlement.' },
        { title: 'Intelligent Fraud Shield', desc: 'Built-in ML models trained on billions in transaction velocity to block fraud without false declines.' },
      ],
      quote: {
        text: 'Finding a partner that can keep up with volume spikes and global scalability is critical to us. Trilink got us into dozens of markets in weeks.',
        author: 'Ben Volk',
        role: 'Director of Global Acceptance, Amazon',
        company: 'Amazon',
      },
      productCards: [
        { title: 'Authorization Boost', desc: 'Boost revenue by improving authorization acceptance with ML retries.', linkText: 'Explore Auth Boost' },
        { title: 'Trilink Radar', desc: 'Identify and block fraud in real-time with global risk intelligence.', linkText: 'Explore Radar' },
        { title: 'Trilink Terminal', desc: 'Manage in-person and online payments under one single ledger.', linkText: 'Explore Terminal' },
      ],
    },
    billing: {
      id: 'billing',
      badge: 'Revenue & Billing',
      title: 'Enable any billing model from subscription to usage-based',
      description:
        'Launch fast and improve revenue capture with billing software that supports usage meters, tiered plans, automated invoicing, and intelligent revenue recovery.',
      features: [
        { title: 'Usage-Based & Metered', desc: 'Bill by API calls, active seats, token usage, storage, or custom events in real time.' },
        { title: 'Smart Retries & Recovery', desc: 'Machine learning determines the exact optimal millisecond to retry failed recurring charges.' },
        { title: 'Customer Portal', desc: 'Self-serve subscription upgrades, invoice history, and payment method updates.' },
        { title: 'Global Tax Automation', desc: 'Calculate, collect, and report sales tax and VAT automatically worldwide.' },
      ],
      quote: {
        text: 'We evolved our business model to cater from individuals to enterprise tiers. Trilink Billing made it effortless to handle complex usage.',
        author: 'Julian Teixeira',
        role: 'Chief Revenue Officer, 1Password',
        company: '1Password',
      },
      productCards: [
        { title: 'Usage-Based Billing', desc: 'Meter high-throughput events and automate tiered consumption.', linkText: 'Explore Usage Billing' },
        { title: 'Invoicing Suite', desc: 'Create and collect one-off and recurring invoices with reconciliation.', linkText: 'Explore Invoicing' },
        { title: 'Trilink Tax', desc: 'Automate sales tax and VAT collection in 50+ countries with one line of code.', linkText: 'Explore Tax' },
      ],
    },
    agentic: {
      id: 'agentic',
      badge: 'Agentic Commerce',
      title: 'Monetize through agentic commerce and AI buyers',
      description:
        'Reach high-intent buyers and create new revenue streams by making your products programmatically shoppable through AI agents like ChatGPT, Claude, and Gemini.',
      features: [
        { title: 'Universal Commerce Protocol', desc: 'Standardized schema for AI agents to discover, select, and checkout catalog items.' },
        { title: 'Shared Payment Tokens', desc: 'Pass buyer payment authorizations securely without exposing underlying card numbers.' },
        { title: 'Agent Bot Defense', desc: 'Distinguish authorized user-guided agent transactions from malicious automated scraping.' },
        { title: 'Merchant of Record Control', desc: 'Maintain complete customer relationship and post-purchase support control.' },
      ],
      quote: {
        text: 'With Trilink’s Agentic Commerce Suite powering checkout within AI conversational platforms, users can move from discovery to purchase in seconds.',
        author: 'Sashanka Vishnuvajhala',
        role: 'SVP of Technology, Fanatics',
        company: 'Fanatics',
      },
      productCards: [
        { title: 'Agentic Commerce Protocol (ACP)', desc: 'Standardized programmatic commerce flows for agent ecosystems.', linkText: 'ACP Specification' },
        { title: 'Shared Payment Tokens', desc: 'Zero-knowledge tokenized payment delegation for AI assistants.', linkText: 'Token Documentation' },
        { title: 'Agent Toolkit', desc: 'APIs for autonomous agents to earn, budget, and spend funds safely.', linkText: 'View Agent Toolkit' },
      ],
    },
    issuing: {
      id: 'issuing',
      badge: 'Card Issuing',
      title: 'Create a physical and virtual card issuing program',
      description:
        'Offer commercial or consumer cards to generate new interchange revenue, automate expense tracking, and provide instant fund access.',
      features: [
        { title: 'Instant Virtual Cards', desc: 'Issue Visa/Mastercard cards programmatically in seconds to mobile wallets.' },
        { title: 'Granular Spend Controls', desc: 'Enforce real-time spending limits by merchant category, time window, or amount.' },
        { title: 'Custom Branded Cards', desc: 'Physical card printing with full-bleed custom finishes and fast shipping.' },
        { title: 'Shared Interchange Revenue', desc: 'Monetize card transactions by keeping a substantial share of interchange fees.' },
      ],
      quote: {
        text: 'Building a charge card program is a massive lift. Trilink provided immense value with a compliance-first design that scaled seamlessly.',
        author: 'Michael Cohen',
        role: 'VP Partnerships, Ramp',
        company: 'Ramp',
      },
      productCards: [
        { title: 'Trilink Connect', desc: 'Combine issuing with platform accounts and automated payouts.', linkText: 'Explore Connect' },
        { title: 'Capital for Platforms', desc: 'Provide working capital to your cardholders seamlessly.', linkText: 'Explore Capital' },
        { title: 'Financial Accounts', desc: 'Provide digital commercial accounts with FDIC passthrough insurance.', linkText: 'Financial Accounts' },
      ],
    },
    crypto: {
      id: 'crypto',
      badge: 'Stablecoins & Crypto',
      title: 'Access borderless money movement with stablecoins and crypto',
      description:
        'Integrate stablecoin payments, digital dollar payouts, and move treasury funds internationally 24/7 without friction or high wire fees.',
      features: [
        { title: 'USDC & USDT Checkout', desc: 'Accept crypto payments from customers in 150+ countries with automatic fiat conversion.' },
        { title: 'Instant 24/7 Payouts', desc: 'Disburse earnings globally on stablecoin rails with sub-cent gas fees.' },
        { title: 'Embedded Non-Custodial Wallets', desc: 'Onboard mainstream users effortlessly via email or social logins.' },
        { title: 'Regulatory Compliance Guardrails', desc: 'Automated AML, sanctioned wallet screening, and Travel Rule compliance.' },
      ],
      quote: {
        text: 'With stablecoins on Trilink, we hit the sweet spot: they are cheaper than cards, universal, and settle instantly worldwide.',
        author: 'Ronald Ding',
        role: 'Co-founder & CTO, Shadeform',
        company: 'Shadeform',
      },
      productCards: [
        { title: 'Stablecoin Orchestration', desc: 'Unified API for minting, burning, and cross-chain transfers.', linkText: 'Explore Stablecoins' },
        { title: 'Crypto Onramp', desc: 'Embed high-conversion credit card to crypto purchases into your app.', linkText: 'Explore Onramp' },
        { title: 'Tempo Network', desc: 'Ultra-low latency institutional payment settlement layer.', linkText: 'Explore Tempo' },
      ],
    },
    connect: {
      id: 'connect',
      badge: 'Platform Payments',
      title: 'Embed payments and financial services directly in your platform',
      description:
        'Scale your vertical SaaS platform or marketplace by facilitating multi-party payments, automated split disbursements, and custom merchant fee collection.',
      features: [
        { title: '40+ Embedded Components', desc: 'Embed turnkey onboarding, payout dashboards, and reports directly into your UI.' },
        { title: 'Automated KYC & Onboarding', desc: 'Global identity verification, sanctions screening, and bank account validation.' },
        { title: 'Custom Monetization Margins', desc: 'Collect platform application fees, markup transaction fees, or offer paid add-ons.' },
        { title: 'Global Multi-Party Payouts', desc: 'Pay sellers, service providers, and contractors in their local currencies.' },
      ],
      quote: {
        text: 'With Trilink Connect, our SaaS platforms can onboard hundreds of fitness studios in minutes with turnkey reporting and compliance.',
        author: 'Kurtis Moyer',
        role: 'Lead Product Manager, Mindbody',
        company: 'Mindbody',
      },
      productCards: [
        { title: 'Embedded Components', desc: 'Drop-in UI components for onboarding, reporting, and payouts.', linkText: 'View Components' },
        { title: 'Instant Payouts', desc: 'Allow your sellers to cash out their earnings in seconds 24/7/365.', linkText: 'Instant Payouts' },
        { title: 'Capital Financing', desc: 'Offer pre-approved business loans to your platform merchants.', linkText: 'Platform Capital' },
      ],
    },
  };

  return (
    <section id="modular-solutions" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight">
            Flexible solutions for every business model.
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-slate-600 font-normal leading-relaxed">
            Grow your business with a comprehensive set of payments and financial tools⁠—⁠designed to work individually or together.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* ========================================================================= */}
          {/* BENTO CARD 1: PAYMENTS (Spans 8 cols on desktop) */}
          {/* ========================================================================= */}
          <div
            onClick={() => setSelectedModal(bentoModals.payments)}
            className="md:col-span-8 group relative rounded-3xl bg-gradient-to-b from-slate-50 to-white border border-slate-200/80 p-6 sm:p-8 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
          >
            {/* Top Bar with Title and Modal Trigger */}
            <div className="flex items-start justify-between relative z-10 mb-6">
              <div className="max-w-md">
                <span className="text-xs font-bold text-[#00A86B] uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">
                  Payments
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mt-2.5 tracking-tight group-hover:text-[#00A86B] transition-colors">
                  Accept and optimize payments globally—online and in person
                </h3>
              </div>
              <button
                type="button"
                className="w-9 h-9 rounded-full bg-white shadow-xs border border-slate-200/70 flex items-center justify-center text-slate-400 group-hover:text-slate-900 group-hover:scale-110 transition-all shrink-0"
                aria-label="Expand payments details"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Interactive Showcase Preview */}
            <div
              className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2 items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Sub-Widget: Modern POS Smart Terminal Simulator */}
              <div className="lg:col-span-5 bg-slate-950 rounded-2xl p-4 text-white shadow-lg border border-slate-800">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                  <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-semibold text-slate-300">Trilink Terminal S1</span>
                    </div>
                  <div className="flex space-x-1">
                    {(['USD', 'EUR', 'JPY'] as const).map((curr) => (
                      <button
                        key={curr}
                        onClick={() => setCurrencyIndex(curr)}
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded transition-colors ${
                          currencyIndex === curr
                            ? 'bg-[#00E599] text-slate-950'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {curr}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-center py-4 bg-slate-900/90 rounded-xl mb-3 border border-slate-800/80">
                  <div className="text-xs text-slate-400">
                    {currencyIndex === 'USD' ? 'Pay Roastery Coffee' : currencyIndex === 'EUR' ? 'Cartsy Bezahlen' : 'Showflix に支払う'}
                  </div>
                  <div className="text-3xl font-mono font-extrabold text-white mt-1">
                    {currencyIndex === 'USD' ? '$5.46' : currencyIndex === 'EUR' ? '€26.89' : '¥5,000'}
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-1 flex items-center justify-center space-x-1">
                    <span>Tap, insert, or smart pay</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300 mb-3 px-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Mocha Specialty</span>
                    <span>{currencyIndex === 'USD' ? '$5.50' : currencyIndex === 'EUR' ? '€22.60' : '¥4,500'}</span>
                  </div>
                  <div className="flex justify-between text-emerald-400 font-medium">
                    <span>Reward (10% off)</span>
                    <span>{currencyIndex === 'USD' ? '-$0.55' : currencyIndex === 'EUR' ? '-€2.26' : '-¥450'}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-800 pt-1.5 font-bold text-white">
                    <span>Total</span>
                    <span>{currencyIndex === 'USD' ? '$5.46' : currencyIndex === 'EUR' ? '€26.89' : '¥5,000'}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setPaymentSuccess(true);
                    setTimeout(() => setPaymentSuccess(false), 2500);
                  }}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center space-x-1.5 ${
                    paymentSuccess
                      ? 'bg-emerald-500 text-white'
                      : 'bg-[#00E599] hover:bg-[#00D48D] text-slate-950'
                  }`}
                >
                  {paymentSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Payment Approved!</span>
                    </>
                  ) : (
                    <span>Simulate Tap to Pay</span>
                  )}
                </button>
              </div>

              {/* Right Sub-Widget: Browser Checkout Window Preview */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-md overflow-hidden text-slate-800">
                {/* Browser top header */}
                <div className="bg-slate-100/90 px-3 py-2 border-b border-slate-200 flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="bg-white px-2.5 py-0.5 rounded-md text-[11px] text-slate-500 font-mono flex-1 text-center truncate border border-slate-200/60">
                    trilink.com/checkout/pay
                  </div>
                </div>

                {/* Checkout Content */}
                <div className="p-4 text-xs space-y-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-500">Express Checkout</label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <div className="p-2 rounded-lg bg-emerald-600 text-white font-bold text-center flex items-center justify-center space-x-1 hover:opacity-95 cursor-pointer">
                        <span className="text-[11px]">Trilink Link</span>
                      </div>
                      <div className="p-2 rounded-lg bg-black text-white font-bold text-center flex items-center justify-center space-x-1 hover:opacity-95 cursor-pointer">
                        <span className="text-[11px]">Apple Pay</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] font-semibold text-slate-500 mb-1.5">Payment Method</div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { id: 'card', label: 'Card' },
                        { id: 'affirm', label: 'Affirm' },
                        { id: 'crypto', label: 'USDC' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setSelectedPaymentMethod(item.id as any)}
                          className={`py-1.5 px-2 rounded-lg border text-center font-medium transition-all ${
                            selectedPaymentMethod === item.id
                              ? 'border-[#00A86B] bg-emerald-50 text-[#00A86B] font-bold'
                              : 'border-slate-200 hover:border-slate-300 text-slate-700'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between font-semibold">
                    <span className="text-slate-600">Smart Temperature Kettle</span>
                    <span className="text-slate-900 font-mono">$150.00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Background subtle gradient */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none -z-0" />
          </div>

          {/* ========================================================================= */}
          {/* BENTO CARD 2: BILLING (Spans 4 cols on desktop) */}
          {/* ========================================================================= */}
          <div
            onClick={() => setSelectedModal(bentoModals.billing)}
            className="md:col-span-4 group relative rounded-3xl bg-gradient-to-b from-slate-50 to-white border border-slate-200/80 p-6 sm:p-7 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
          >
            <div className="flex items-start justify-between relative z-10 mb-5">
              <div>
                <span className="text-xs font-bold text-[#00A86B] uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">
                  Billing
                </span>
                <h3 className="text-xl font-bold text-slate-950 mt-2 tracking-tight group-hover:text-[#00A86B] transition-colors">
                  Enable any billing model
                </h3>
              </div>
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-white shadow-xs border border-slate-200/70 flex items-center justify-center text-slate-400 group-hover:text-slate-900 transition-all shrink-0"
                aria-label="Expand billing details"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Interactive Billing Visualization */}
            <div
              className="relative z-10 space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Pro Plan Card */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-md bg-emerald-100 text-[#00A86B] flex items-center justify-center font-bold text-xs">
                      P
                    </div>
                    <span className="text-sm font-bold text-slate-900">Pro Plan (Metered)</span>
                  </div>
                  <span className="text-xs font-mono font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    $0.01 / 1K tokens
                  </span>
                </div>

                <div className="mt-3">
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Usage Meter</span>
                    <span className="font-mono font-bold text-slate-800">{tokenUsage.toLocaleString()}M units</span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="4000"
                    value={tokenUsage}
                    onChange={(e) => setTokenUsage(Number(e.target.value))}
                    className="w-full accent-[#00A86B] cursor-pointer"
                  />
                </div>
              </div>

              {/* 30-Day Token Bar Chart */}
              <div className="bg-slate-950 rounded-2xl p-4 text-white border border-slate-800 shadow-md">
                <div className="flex justify-between items-end mb-3">
                  <div>
                    <div className="text-[11px] text-slate-400">Tokens used in last 30 days</div>
                    <div className="text-lg font-mono font-extrabold text-emerald-400 mt-0.5">
                      {(tokenUsage * 1000000).toLocaleString()}
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-1.5 py-0.5 rounded font-mono">
                    +24.8%
                  </span>
                </div>

                {/* Animated Histogram Bars */}
                <div className="flex items-end justify-between h-20 pt-2 gap-1">
                  {[35, 42, 60, 48, 75, 90, 65, 80, 55, 95, 110, 85, 100, 120, 90, 130, 140, 115, 125, 150].map(
                    (val, i) => {
                      const dynamicHeight = Math.min(100, Math.round((val / 150) * (tokenUsage / 2000) * 100));
                      return (
                        <div
                          key={i}
                          onMouseEnter={() => setHoveredBar(i)}
                          onMouseLeave={() => setHoveredBar(null)}
                          className="flex-1 bg-slate-800 hover:bg-[#00E599] rounded-t-sm transition-all relative cursor-pointer"
                          style={{ height: `${Math.max(12, dynamicHeight)}%` }}
                        >
                          {hoveredBar === i && (
                            <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-white text-slate-900 font-mono text-[9px] px-1 py-0.5 rounded whitespace-nowrap shadow-md z-20 font-bold">
                              {val * 15}k
                            </div>
                          )}
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#00A86B]">
              <span>Explore usage-based models</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>

          {/* ========================================================================= */}
          {/* BENTO CARD 3: AGENTIC COMMERCE (Spans 4 cols on desktop) */}
          {/* ========================================================================= */}
          <div
            onClick={() => setSelectedModal(bentoModals.agentic)}
            className="md:col-span-4 group relative rounded-3xl bg-gradient-to-b from-slate-50 to-white border border-slate-200/80 p-6 sm:p-7 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
          >
            <div className="flex items-start justify-between relative z-10 mb-4">
              <div>
                <span className="text-xs font-bold text-purple-700 uppercase tracking-wider bg-purple-50 px-3 py-1 rounded-full">
                  Agentic AI
                </span>
                <h3 className="text-xl font-bold text-slate-950 mt-2 tracking-tight group-hover:text-[#00A86B] transition-colors">
                  Monetize through agentic commerce
                </h3>
              </div>
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-white shadow-xs border border-slate-200/70 flex items-center justify-center text-slate-400 group-hover:text-slate-900 transition-all shrink-0"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* AI Assistant Chat Interactive Simulation */}
            <div
              className="relative z-10 space-y-3"
              onClick={(e) => e.stopPropagation()}
            >
              {/* User Bubble */}
              <div className="bg-slate-200/80 text-slate-800 text-xs p-3 rounded-2xl rounded-tr-xs max-w-[85%] ml-auto">
                "Find me cozy basics in size M for winter."
              </div>

              {/* Agent Bubble */}
              <div className="bg-white border border-slate-200/80 text-slate-700 text-xs p-3 rounded-2xl rounded-tl-xs shadow-xs space-y-2">
                <div className="flex items-center space-x-1.5 text-purple-600 font-bold text-[11px]">
                  <Bot className="w-3.5 h-3.5" />
                  <span>Trilink Agentic Assistant</span>
                </div>
                <p>Found top-rated essentials matching your size:</p>

                {/* Product in Chat */}
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-200/60 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 text-xs">Essential Hoodie</div>
                    <div className="text-[11px] text-slate-500">Navy - Medium · Cartsy</div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-slate-900 text-xs">$48.00</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setAgentPurchased(true);
                    setTimeout(() => setAgentPurchased(false), 2200);
                  }}
                  className={`w-full py-2 rounded-lg font-bold text-xs transition-all flex items-center justify-center space-x-1.5 ${
                    agentPurchased
                      ? 'bg-emerald-600 text-white'
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                >
                  {agentPurchased ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Bought via Agent Token</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Instant Buy ($48.00)</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-purple-600">
              <span>Universal Commerce Protocol</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          {/* ========================================================================= */}
          {/* BENTO CARD 4: ISSUING (Spans 4 cols on desktop) */}
          {/* ========================================================================= */}
          <div
            onClick={() => setSelectedModal(bentoModals.issuing)}
            className="md:col-span-4 group relative rounded-3xl bg-gradient-to-b from-slate-50 to-white border border-slate-200/80 p-6 sm:p-7 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
          >
            <div className="flex items-start justify-between relative z-10 mb-4">
              <div>
                <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider bg-cyan-50 px-3 py-1 rounded-full">
                  Card Issuing
                </span>
                <h3 className="text-xl font-bold text-slate-950 mt-2 tracking-tight group-hover:text-[#00A86B] transition-colors">
                  Create a card issuing program
                </h3>
              </div>
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-white shadow-xs border border-slate-200/70 flex items-center justify-center text-slate-400 group-hover:text-slate-900 transition-all shrink-0"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Virtual Card Showcase */}
            <div
              className="relative z-10 space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Virtual Gradient Card with Trilink Identity */}
              <div className="h-36 rounded-2xl bg-gradient-to-tr from-slate-950 via-[#0A2333] to-[#00A86B] p-4 text-white shadow-lg flex flex-col justify-between border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-emerald-400/20 rounded-full blur-xl" />
                <div className="flex justify-between items-center relative z-10">
                  <span className="font-mono text-xs font-bold tracking-widest text-emerald-300">TRILINK CORPORATE</span>
                  <span className="w-6 h-4 bg-amber-400/80 rounded-sm inline-block" />
                </div>
                <div className="relative z-10">
                  <div className="font-mono text-sm tracking-wider text-slate-200">•••• •••• •••• 8842</div>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1">
                    <span>ALEX MORGAN</span>
                    <span>EXP 08/29</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Controls */}
              <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">Monthly Limit</span>
                  <span className="font-mono font-bold text-slate-900">${cardLimit.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="15000"
                  step="500"
                  value={cardLimit}
                  onChange={(e) => setCardLimit(Number(e.target.value))}
                  className="w-full accent-[#00A86B] cursor-pointer"
                />
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-cyan-600">
              <span>Physical & virtual issuing</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          {/* ========================================================================= */}
          {/* BENTO CARD 5: CRYPTO & STABLECOINS (Spans 4 cols on desktop) */}
          {/* ========================================================================= */}
          <div
            onClick={() => setSelectedModal(bentoModals.crypto)}
            className="md:col-span-4 group relative rounded-3xl bg-gradient-to-b from-slate-50 to-white border border-slate-200/80 p-6 sm:p-7 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
          >
            <div className="flex items-start justify-between relative z-10 mb-4">
              <div>
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider bg-teal-50 px-3 py-1 rounded-full">
                  Stablecoins
                </span>
                <h3 className="text-xl font-bold text-slate-950 mt-2 tracking-tight group-hover:text-[#00A86B] transition-colors">
                  Borderless money movement with stablecoins
                </h3>
              </div>
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-white shadow-xs border border-slate-200/70 flex items-center justify-center text-slate-400 group-hover:text-slate-900 transition-all shrink-0"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Globe / Network Nodes visual */}
            <div
              className="relative z-10 bg-slate-950 rounded-2xl p-4 text-white border border-slate-800 shadow-md space-y-3"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Global Onchain Payouts</span>
                <span className="text-emerald-400 font-mono font-bold">24/7/365</span>
              </div>

              {/* Simulated Global Route Nodes */}
              <div className="space-y-2 text-xs">
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-[10px]">
                      $
                    </div>
                    <span>San Francisco → London</span>
                  </div>
                  <span className="font-mono font-bold text-emerald-400">$172 USDC</span>
                </div>

                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-[10px]">
                      $
                    </div>
                    <span>Tokyo → Singapore</span>
                  </div>
                  <span className="font-mono font-bold text-emerald-400">$83 USDC</span>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Avg Settlement: &lt;1.8 sec</span>
                <span className="text-emerald-400">Fee: $0.001</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-teal-600">
              <span>View global stablecoin rails</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          {/* ========================================================================= */}
          {/* BENTO CARD 6: CONNECT PLATFORM (Spans 12 cols on desktop) */}
          {/* ========================================================================= */}
          <div
            onClick={() => setSelectedModal(bentoModals.connect)}
            className="md:col-span-12 group relative rounded-3xl bg-gradient-to-b from-slate-50 to-white border border-slate-200/80 p-6 sm:p-8 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
          >
            <div className="flex items-start justify-between relative z-10 mb-6">
              <div className="max-w-xl">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">
                  Connect Architecture
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mt-2.5 tracking-tight group-hover:text-[#00A86B] transition-colors">
                  Embed payments and financial services in your platform
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Orchestrate accounts, payouts, and splits across thousands of connected businesses worldwide.
                </p>
              </div>
              <button
                type="button"
                className="w-9 h-9 rounded-full bg-white shadow-xs border border-slate-200/70 flex items-center justify-center text-slate-400 group-hover:text-slate-900 transition-all shrink-0"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Platform Table Dashboard Simulation */}
            <div
              className="relative z-10 bg-white rounded-2xl border border-slate-200 shadow-md p-4 sm:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-pink-100 text-pink-700 font-bold flex items-center justify-center text-sm">
                    Z
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Zenflow SaaS Suite</h4>
                    <p className="text-xs text-slate-500">Connected Accounts Dashboard</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-xs">
                  <span className="text-slate-500">Select Studio to inspect:</span>
                  {(['Daybreak', 'Jackson', 'QuietFire'] as const).map((studio) => (
                    <button
                      key={studio}
                      onClick={() => setSelectedStudio(studio)}
                      className={`px-2.5 py-1 rounded-full font-medium transition-all ${
                        selectedStudio === studio
                          ? 'bg-[#00E599] text-slate-950 font-bold shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {studio} Yoga
                    </button>
                  ))}
                </div>
              </div>

              {/* Table of Connected Accounts */}
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-100 pb-2">
                      <th className="py-2.5">Account Name</th>
                      <th>Region</th>
                      <th>Status</th>
                      <th>Payment Balance</th>
                      <th>Total Volume (YTD)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    <tr className={`transition-colors ${selectedStudio === 'Daybreak' ? 'bg-emerald-50/80 font-bold' : 'hover:bg-slate-50'}`}>
                      <td className="py-3 text-slate-900 flex items-center space-x-2">
                        <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-bold">D</span>
                        <span>Daybreak Yoga</span>
                      </td>
                      <td className="text-slate-600">United States</td>
                      <td><span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Active</span></td>
                      <td className="font-mono text-slate-900">$1,502.00</td>
                      <td className="font-mono text-slate-900">$71,880.00</td>
                    </tr>

                    <tr className={`transition-colors ${selectedStudio === 'Jackson' ? 'bg-emerald-50/80 font-bold' : 'hover:bg-slate-50'}`}>
                      <td className="py-3 text-slate-900 flex items-center space-x-2">
                        <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-[10px] font-bold">J</span>
                        <span>Jackson Hot Yoga</span>
                      </td>
                      <td className="text-slate-600">Australia</td>
                      <td><span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Active</span></td>
                      <td className="font-mono text-slate-900">$3,660.00</td>
                      <td className="font-mono text-slate-900">$126,433.30</td>
                    </tr>

                    <tr className={`transition-colors ${selectedStudio === 'QuietFire' ? 'bg-emerald-50/80 font-bold' : 'hover:bg-slate-50'}`}>
                      <td className="py-3 text-slate-900 flex items-center space-x-2">
                        <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center text-[10px] font-bold">Q</span>
                        <span>Quiet Fire Yoga</span>
                      </td>
                      <td className="text-slate-600">United Kingdom</td>
                      <td><span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Active</span></td>
                      <td className="font-mono text-slate-900">£1,388.00</td>
                      <td className="font-mono text-slate-900">£45,568.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bento Detail Modal */}
      <BentoDetailModal data={selectedModal} onClose={() => setSelectedModal(null)} />
    </section>
  );
};
