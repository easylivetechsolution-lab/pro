import React from 'react';
import { TrilinkLogo } from './TrilinkLogo';
import {
  ArrowRight,
  Globe,
  Tag,
  Code2
} from 'lucide-react';

interface FooterProps {
  onOpenSignIn?: () => void;
  onOpenContactSales?: () => void;
  onNavigate?: (page: 'home' | 'pricing') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSignIn, onOpenContactSales, onNavigate }) => {
  const handleNavigatePricing = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('pricing');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-200/80 text-slate-700 pt-20 pb-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* ========================================================================= */}
        {/* TOP CTA SECTION */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-slate-200">
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Ready to get started?
            </h3>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-lg">
              Create an account instantly, or contact us to design a custom financial infrastructure package for your business.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onOpenSignIn}
                className="inline-flex items-center px-6 py-3 rounded-full bg-[#00E599] hover:bg-[#00D48D] text-slate-950 font-bold text-sm shadow-md transition-all group"
              >
                <span>Start now</span>
                <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                type="button"
                onClick={onOpenContactSales}
                className="px-5 py-3 rounded-full bg-white hover:bg-slate-100 text-slate-800 font-semibold text-sm border border-slate-300 shadow-xs transition-colors"
              >
                Contact sales
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#00A86B] flex items-center justify-center mb-3">
                  <Tag className="w-4 h-4" />
                </div>
                <h4 className="text-base font-bold text-slate-900">See what you’ll pay</h4>
                <p className="text-xs text-slate-500 mt-1">Integrated per-transaction pricing with no hidden fees or monthly lock-ins.</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleNavigatePricing}
                  className="text-xs font-bold text-[#00A86B] flex items-center hover:underline cursor-pointer"
                >
                  Pricing details <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                  <Code2 className="w-4 h-4" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Start building</h4>
                <p className="text-xs text-slate-500 mt-1">Get up and running with Trilink APIs and SDKs in as little as 10 minutes.</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100">
                <a href="#developers" className="text-xs font-bold text-blue-600 flex items-center hover:underline">
                  Integration options <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* COMPREHENSIVE MULTI-COLUMN SITEMAP */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-xs leading-relaxed">
          {/* Column 1: Products */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Products</h4>
            <ul className="space-y-2 text-slate-600">
              <li>
                <button
                  type="button"
                  onClick={handleNavigatePricing}
                  className="hover:text-slate-950 font-medium text-[#00A86B]"
                >
                  Pricing
                </button>
              </li>
              <li><a href="#modular-solutions" className="hover:text-slate-950">Payments</a></li>
              <li><a href="#modular-solutions" className="hover:text-slate-950">Trilink Checkout</a></li>
              <li><a href="#modular-solutions" className="hover:text-slate-950">Trilink Terminal</a></li>
              <li><a href="#modular-solutions" className="hover:text-slate-950">Trilink Billing</a></li>
              <li><a href="#modular-solutions" className="hover:text-slate-950">Usage-based Billing</a></li>
              <li><a href="#modular-solutions" className="hover:text-slate-950">Trilink Connect</a></li>
              <li><a href="#modular-solutions" className="hover:text-slate-950">Trilink Issuing</a></li>
              <li><a href="#modular-solutions" className="hover:text-slate-950">Stablecoins & Crypto</a></li>
              <li><a href="#modular-solutions" className="hover:text-slate-950">Agentic Commerce</a></li>
              <li><a href="#modular-solutions" className="hover:text-slate-950">Trilink Radar</a></li>
              <li><a href="#modular-solutions" className="hover:text-slate-950">Trilink Tax</a></li>
            </ul>
          </div>

          {/* Column 2: Solutions */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Solutions</h4>
            <ul className="space-y-2 text-slate-600">
              <li><a href="#enterprises" className="hover:text-slate-950">Enterprises</a></li>
              <li><a href="#startups" className="hover:text-slate-950">Startups</a></li>
              <li><a href="#platforms" className="hover:text-slate-950">SaaS & Platforms</a></li>
              <li><a href="#modular-solutions" className="hover:text-slate-950">Ecommerce</a></li>
              <li><a href="#modular-solutions" className="hover:text-slate-950">Embedded Finance</a></li>
              <li><a href="#modular-solutions" className="hover:text-slate-950">AI Companies</a></li>
              <li><a href="#modular-solutions" className="hover:text-slate-950">Creator Economy</a></li>
              <li><a href="#modular-solutions" className="hover:text-slate-950">Fintech</a></li>
              <li><a href="#modular-solutions" className="hover:text-slate-950">Marketplaces</a></li>
              <li><a href="#modular-solutions" className="hover:text-slate-950">Global Cross-Border</a></li>
            </ul>
          </div>

          {/* Column 3: Developers */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Developers</h4>
            <ul className="space-y-2 text-slate-600">
              <li><a href="#developers" className="hover:text-slate-950">Documentation</a></li>
              <li><a href="#developers" className="hover:text-slate-950">API Reference</a></li>
              <li><a href="#developers" className="hover:text-slate-950">API Status (99.999%)</a></li>
              <li><a href="#developers" className="hover:text-slate-950">API Changelog</a></li>
              <li><a href="#developers" className="hover:text-slate-950">Libraries & SDKs</a></li>
              <li><a href="#developers" className="hover:text-slate-950">Trilink CLI</a></li>
              <li><a href="#developers" className="hover:text-slate-950">GitHub Repositories</a></li>
            </ul>
          </div>

          {/* Column 4: Resources & Press */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Resources</h4>
            <ul className="space-y-2 text-slate-600">
              <li><a href="#whats-happening" className="hover:text-slate-950">Trilink Sessions 2026</a></li>
              <li><a href="#book-of-the-week" className="hover:text-slate-950">Trilink Press</a></li>
              <li><a href="#book-of-the-week" className="hover:text-slate-950">Works in Progress</a></li>
              <li><a href="#startups" className="hover:text-slate-950">Startup Guides</a></li>
              <li><a href="#whats-happening" className="hover:text-slate-950">Customer Stories</a></li>
              <li><a href="#whats-happening" className="hover:text-slate-950">Annual Letters</a></li>
              <li><a href="#" className="hover:text-slate-950">Privacy and Terms</a></li>
            </ul>
          </div>

          {/* Column 5: Company & Support */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Company</h4>
            <ul className="space-y-2 text-slate-600">
              <li><a href="#" className="hover:text-slate-950">About Trilink</a></li>
              <li><a href="#" className="hover:text-slate-950">Careers</a></li>
              <li><a href="#whats-happening" className="hover:text-slate-950">Newsroom</a></li>
              <li>
                <button type="button" onClick={onOpenSignIn} className="hover:text-slate-950 font-semibold text-emerald-700">
                  Sign In to Dashboard
                </button>
              </li>
              <li>
                <button type="button" onClick={onOpenContactSales} className="hover:text-slate-950">
                  Contact Sales Team
                </button>
              </li>
              <li className="pt-2 text-slate-400">
                Support: 24/7 Global Dispatch
              </li>
            </ul>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* FOOTER BOTTOM BAR */}
        {/* ========================================================================= */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="inline-flex items-center space-x-1.5 hover:text-slate-900 transition-colors"
            >
              <Globe className="w-4 h-4 text-slate-400" />
              <span className="font-semibold">United States (English)</span>
            </button>
            <span>© 2026 Trilink, LLC. All rights reserved.</span>
          </div>

          <div className="flex items-center space-x-3">
            <TrilinkLogo size="sm" showText={false} variant="dark" />
            <span className="font-mono text-[11px] text-slate-400">Trilink Financial Infrastructure</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
