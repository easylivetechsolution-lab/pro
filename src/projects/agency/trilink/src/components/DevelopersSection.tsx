import React, { useState } from 'react';
import {
  Code2,
  Terminal as TerminalIcon,
  Copy,
  Check,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  ExternalLink,
  QrCode,
  Share2,
  Play
} from 'lucide-react';

export const DevelopersSection: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState<'node' | 'python' | 'go' | 'curl'>('node');
  const [copiedCode, setCopiedCode] = useState(false);
  const [simulatedTerminalRunning, setSimulatedTerminalRunning] = useState(true);
  const [selectedArchNode, setSelectedArchNode] = useState<string | null>('sdk');

  const codeSnippets: Record<string, string> = {
    node: `// Initialize Trilink Node SDK
import Trilink from 'trilink';
const trilink = new Trilink('sk_test_tri_live_9942');

// Create an optimized checkout session with Agentic Tokens
const session = await trilink.checkout.sessions.create({
  customer: 'cus_99482910',
  mode: 'subscription',
  payment_method_types: ['card', 'link', 'usdc'],
  line_items: [{
    price: 'price_pro_tokens_metered',
    quantity: 1,
  }],
  success_url: 'https://example.com/success',
  cancel_url: 'https://example.com/cancel',
});

console.log('Checkout session created:', session.url);`,

    python: `# Initialize Trilink Python SDK
import trilink
trilink.api_key = "sk_test_tri_live_9942"

# Create an optimized checkout session
session = trilink.checkout.Session.create(
    customer="cus_99482910",
    mode="subscription",
    payment_method_types=["card", "link", "usdc"],
    line_items=[{
        "price": "price_pro_tokens_metered",
        "quantity": 1,
    }],
    success_url="https://example.com/success",
    cancel_url="https://example.com/cancel",
)

print(f"Session URL: {session.url}")`,

    go: `// Initialize Trilink Go SDK
package main

import (
	"fmt"
	"github.com/trilink/trilink-go"
	"github.com/trilink/trilink-go/checkout/session"
)

func main() {
	trilink.Key = "sk_test_tri_live_9942"

	params := &trilink.CheckoutSessionParams{
		Customer: trilink.String("cus_99482910"),
		Mode:     trilink.String(string(trilink.CheckoutSessionModeSubscription)),
		PaymentMethodTypes: trilink.StringSlice([]string{
			"card", "link", "usdc",
		}),
	}
	s, _ := session.New(params)
	fmt.Printf("Checkout URL: %s\\n", s.URL)
}`,

    curl: `# Create checkout session via cURL
curl https://api.trilink.com/v1/checkout/sessions \\
  -u sk_test_tri_live_9942: \\
  -d customer=cus_99482910 \\
  -d mode=subscription \\
  -d "payment_method_types[0]"=card \\
  -d "payment_method_types[1]"=link \\
  -d "payment_method_types[2]"=usdc \\
  -d "line_items[0][price]"=price_pro_tokens_metered \\
  -d success_url="https://example.com/success"`,
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippets[selectedLang]);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="developers" className="py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Glow gradient backdrops */}
      <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider bg-emerald-950/80 border border-emerald-800/80 px-3 py-1 rounded-full">
              Developer Ecosystem
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-3">
              Reliable, extensible infrastructure for every stack.
            </h2>
            <p className="mt-3 text-slate-400 text-lg">
              Adapt Trilink to your business needs with flexible SDKs, unified webhook destinations, and prebuilt APIs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs transition-colors"
            >
              View Trilink GitHub
            </a>
            <a
              href="#documentation"
              className="px-5 py-2.5 rounded-full bg-[#00E599] hover:bg-[#00D48D] text-slate-950 font-bold text-xs shadow-md transition-all flex items-center"
            >
              <span>View developer docs</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </a>
          </div>
        </div>

        {/* 1. Connect to existing systems Interactive Architecture */}
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Connect to existing systems.
            </h3>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Orchestrate payments across multiple processors, build custom workflows, and connect to third parties using APIs, partner apps, or prebuilt connectors.
            </p>
          </div>

          {/* Interactive Architecture Map Diagram */}
          <div className="rounded-3xl bg-gradient-to-br from-[#051124] via-[#082830] to-[#0E4839] border border-[#00E599]/40 p-6 sm:p-10 relative overflow-hidden shadow-2xl transition-all duration-700">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#00E599]/25 rounded-full blur-3xl pointer-events-none animate-pulse" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#00D2FF]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 items-center text-center">
              {/* Left Column: Business systems */}
              <div className="space-y-3">
                <div className="text-xs uppercase font-mono font-bold text-emerald-300 mb-2 text-left sm:text-center">
                  Business Systems
                </div>
                {['ERP (NetSuite, SAP)', 'CRM (Salesforce, HubSpot)', 'Subscriptions & Billing', 'Booking Engine'].map(
                  (sys, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-white/[0.1] hover:bg-white/[0.18] border border-white/20 text-xs font-semibold text-white shadow-lg backdrop-blur-md transition-all hover:border-[#00E599] hover:scale-[1.02]"
                    >
                      {sys}
                    </div>
                  )
                )}
              </div>

              {/* Center Column: Trilink Hub with Interactive Hub nodes */}
              <div className="space-y-4">
                <div className="text-xs uppercase font-mono font-bold text-emerald-300 mb-2">
                  Trilink Integration Core
                </div>

                <div className="p-6 rounded-3xl bg-gradient-to-b from-[#0A2333]/95 to-[#051124]/95 border border-[#00E599]/60 shadow-2xl backdrop-blur-xl space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br from-[#00E599] to-[#00D2FF] text-slate-950 flex items-center justify-center font-black shadow-xl ring-2 ring-[#00E599]/40">
                    TL
                  </div>
                  <div className="font-bold text-base text-white">Trilink Engine</div>
                  <div className="grid grid-cols-2 gap-2 text-left pt-2">
                    {[
                      { id: 'sdk', label: 'SDK Client' },
                      { id: 'events', label: 'Event Webhooks' },
                      { id: 'data', label: 'Data Pipeline' },
                      { id: 'orch', label: 'Orchestration' },
                    ].map((n) => (
                      <button
                        key={n.id}
                        onClick={() => setSelectedArchNode(n.id)}
                        className={`p-2 rounded-xl text-[11px] font-mono transition-all ${
                          selectedArchNode === n.id
                            ? 'bg-gradient-to-r from-[#00E599] to-[#00D2FF] text-slate-950 font-bold shadow-md scale-[1.02]'
                            : 'bg-white/[0.08] text-slate-200 hover:bg-white/[0.18] border border-white/10'
                        }`}
                      >
                        {n.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Processors / Destinations */}
              <div className="space-y-3">
                <div className="text-xs uppercase font-mono font-bold text-emerald-300 mb-2 text-left sm:text-center">
                  Processors & Networks
                </div>
                {['Visa / Mastercard / Amex', 'Apple Pay / Google Pay', 'Local Bank Clearing (ACH, SEPA)', 'USDC & Stablecoin Rails'].map(
                  (net, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-white/[0.1] hover:bg-white/[0.18] border border-white/20 text-xs font-semibold text-white shadow-lg backdrop-blur-md transition-all hover:border-[#00E599] hover:scale-[1.02]"
                    >
                      {net}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 2. Scale with confidence (Metrics & Stream) */}
        <div className="space-y-8 pt-6">
          <div>
            <h3 className="text-2xl font-bold text-white tracking-tight">Scale with confidence.</h3>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Handle thousands of transactions per second with consistent speed and reliability, even during peak traffic periods.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#051124] via-[#082830] to-[#0E4839] border border-[#00E599]/30 hover:border-[#00E599]/60 transition-all duration-500 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="text-4xl sm:text-5xl font-mono font-extrabold text-[#00E599] drop-shadow-[0_0_15px_rgba(0,229,153,0.3)]">500M+</div>
              <div className="text-sm font-semibold text-slate-100 mt-2">API requests per day</div>
              <p className="text-xs text-slate-300 mt-1">Processed with zero downtime across 28 global points of presence.</p>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#051124] via-[#082830] to-[#0E4839] border border-[#00E599]/30 hover:border-[#00D2FF]/60 transition-all duration-500 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00D2FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="text-4xl sm:text-5xl font-mono font-extrabold text-[#00D2FF] drop-shadow-[0_0_15px_rgba(0,210,255,0.3)]">10K+</div>
              <div className="text-sm font-semibold text-slate-100 mt-2">API requests per second</div>
              <p className="text-xs text-slate-300 mt-1">Peak bursting capacity engineered for viral launches and flash sales.</p>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#051124] via-[#082830] to-[#0E4839] border border-[#00E599]/30 hover:border-[#00E599]/60 transition-all duration-500 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="text-4xl sm:text-5xl font-mono font-extrabold text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">150K+</div>
              <div className="text-sm font-semibold text-slate-100 mt-2">transactions per minute</div>
              <p className="text-xs text-slate-300 mt-1">Tested during global high-volume holiday sales.</p>
            </div>
          </div>
        </div>

        {/* 3. Choose an integration path */}
        <div className="space-y-8 pt-6">
          <div>
            <h3 className="text-2xl font-bold text-white tracking-tight">Choose an integration path.</h3>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              With AI-powered support, rich documentation, and built-in debugging tools, you can quickly get started with the best option for your business.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Card A: No-Code */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#051124] via-[#082830] to-[#0E4839] border border-[#00E599]/30 flex flex-col justify-between space-y-6 hover:border-[#00E599]/60 transition-all duration-500 shadow-2xl group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00E599]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="space-y-4 relative z-10">
                <div className="h-44 rounded-2xl bg-black/40 backdrop-blur-md p-4 border border-white/10 flex flex-col justify-between text-xs">
                  <div className="space-y-2">
                    <div className="p-2 rounded-lg bg-white/[0.08] text-slate-200 border border-white/5">
                      "I'd like to purchase your organic coffee subscription."
                    </div>
                    <div className="p-2 rounded-lg bg-[#00E599]/10 border border-[#00E599]/30 text-[#00E599] flex items-center justify-between">
                      <span className="font-mono">buy.trilink.com/roastery-sub</span>
                      <QrCode className="w-4 h-4 text-[#00E599]" />
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-400 flex justify-between">
                    <span>Generated in 1 click</span>
                    <span className="text-[#00E599] font-bold">QR & Link Ready</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white">Don’t code?</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Set up billing, take in-person payments, or share payment links right from the Trilink Dashboard—no code required.
                  </p>
                </div>
              </div>

              <a href="#no-code" className="text-xs font-bold text-[#00E599] flex items-center hover:underline relative z-10">
                Explore no-code options <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </a>
            </div>

            {/* Card B: Pre-integrated platform */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#051124] via-[#082830] to-[#0E4839] border border-[#00E599]/30 flex flex-col justify-between space-y-6 hover:border-[#00D2FF]/60 transition-all duration-500 shadow-2xl group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00D2FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="space-y-4 relative z-10">
                <div className="h-44 rounded-2xl bg-black/40 backdrop-blur-md p-4 border border-white/10 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-2 w-full text-center">
                    {['Shopify', 'WooCommerce', 'Webflow', 'Squarespace', 'Xero', 'Zapier'].map((p, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-xs font-semibold text-slate-200 hover:text-white hover:border-[#00E599] transition-all">
                        {p}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white">Use a pre-integrated platform.</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Browse our directory of hundreds of platforms and website builders that connect to Trilink out-of-the-box.
                  </p>
                </div>
              </div>

              <a href="#marketplace" className="text-xs font-bold text-[#00D2FF] flex items-center hover:underline relative z-10">
                See app directory <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </a>
            </div>

            {/* Card C: Interactive Code Editor */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#051124] via-[#082830] to-[#0E4839] border border-[#00E599]/30 flex flex-col justify-between space-y-6 hover:border-[#00E599]/60 transition-all duration-500 shadow-2xl group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00E599]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="space-y-4 relative z-10">
                {/* Code Window with Tab switcher */}
                <div className="rounded-2xl bg-black/50 border border-white/15 overflow-hidden">
                  <div className="flex items-center justify-between px-3 py-2 bg-black/30 border-b border-white/10 text-xs">
                    <div className="flex space-x-2">
                      {(['node', 'python', 'go', 'curl'] as const).map((lang) => (
                        <button
                          key={lang}
                          onClick={() => setSelectedLang(lang)}
                          className={`px-2 py-0.5 rounded font-mono text-[11px] transition-all ${
                            selectedLang === lang
                              ? 'bg-[#00E599] text-slate-950 font-bold'
                              : 'text-slate-300 hover:text-white'
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={handleCopyCode}
                      className="p-1 rounded text-slate-400 hover:text-white transition-colors"
                      title="Copy code"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-[#00E599]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <pre className="p-3 text-[11px] font-mono text-emerald-300 overflow-x-auto max-h-32 bg-black/40">
                    <code>{codeSnippets[selectedLang]}</code>
                  </pre>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white">Build your own integration.</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Use our idiomatic SDKs, REST APIs, webhooks, and AI agent extensions to construct custom payment workflows.
                  </p>
                </div>
              </div>

              <a href="#docs" className="text-xs font-bold text-[#00E599] flex items-center hover:underline relative z-10">
                Get started with docs <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
