import React, { useState, useEffect, useRef } from 'react';
import { TrilinkLogo } from './TrilinkLogo';
import {
  ChevronDown,
  ArrowRight,
  Menu,
  X,
  CreditCard,
  Building2,
  Cpu,
  Globe2,
  Terminal,
  ShieldCheck,
  Coins,
  Bot,
  Zap,
  Layers,
  Sparkles,
  BarChart3,
  Receipt,
  FileSpreadsheet,
  Rocket,
  Store,
  Compass,
  Code2,
  BookOpen,
  LifeBuoy
} from 'lucide-react';

interface NavbarProps {
  onOpenSignIn?: () => void;
  onOpenContactSales?: () => void;
  currentPage?: 'home' | 'pricing';
  onNavigate?: (page: 'home' | 'pricing') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSignIn,
  onOpenContactSales,
  currentPage = 'home',
  onNavigate,
}) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSectionLink = (hash: string) => {
    if (currentPage !== 'home' && onNavigate) {
      onNavigate('home');
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (menuKey: string) => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    setActiveMenu(menuKey);
  };

  const handleMouseLeave = () => {
    menuTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-3 border-b border-slate-200/80 text-slate-800'
          : 'bg-transparent py-4 text-slate-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Brand Logo & Navigation */}
        <div className="flex items-center space-x-8">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onNavigate?.('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center cursor-pointer"
          >
            <TrilinkLogo size="md" variant="dark" />
          </a>

          {/* Desktop Nav Links with Mega Menus */}
          <nav className="hidden lg:flex items-center space-x-1 relative">
            {/* Products */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('products')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-full text-sm font-semibold transition-colors ${
                  activeMenu === 'products'
                    ? 'text-[#00A86B] bg-emerald-50/80'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100/70'
                }`}
                aria-expanded={activeMenu === 'products'}
              >
                <span>Products</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMenu === 'products' ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Menu Dropdown */}
              {activeMenu === 'products' && (
                <div
                  className="absolute left-0 top-full pt-3 w-[640px] z-50"
                  onMouseEnter={() => handleMouseEnter('products')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 grid grid-cols-2 gap-6 ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">
                        Payments & Commerce
                      </div>
                      <div className="space-y-1">
                        <a href="#modular-solutions" className="group flex items-start p-2 rounded-xl hover:bg-slate-50 transition-colors">
                          <div className="w-8 h-8 rounded-lg bg-emerald-100/70 text-[#00A86B] flex items-center justify-center mr-3 mt-0.5 group-hover:scale-105 transition-transform">
                            <CreditCard className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 group-hover:text-[#00A86B] flex items-center">
                              Payments
                              <span className="ml-2 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-[#00875A]">Popular</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">Online payments & global checkout</p>
                          </div>
                        </a>

                        <a href="#modular-solutions" className="group flex items-start p-2 rounded-xl hover:bg-slate-50 transition-colors">
                          <div className="w-8 h-8 rounded-lg bg-blue-100/70 text-blue-600 flex items-center justify-center mr-3 mt-0.5 group-hover:scale-105 transition-transform">
                            <Terminal className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 group-hover:text-blue-600">Terminal</div>
                            <p className="text-xs text-slate-500 mt-0.5">In-person POS & contactless smart tap</p>
                          </div>
                        </a>

                        <a href="#modular-solutions" className="group flex items-start p-2 rounded-xl hover:bg-slate-50 transition-colors">
                          <div className="w-8 h-8 rounded-lg bg-purple-100/70 text-purple-600 flex items-center justify-center mr-3 mt-0.5 group-hover:scale-105 transition-transform">
                            <Bot className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 group-hover:text-purple-600 flex items-center">
                              Agentic Commerce
                              <span className="ml-2 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-purple-100 text-purple-700">New</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">Monetize through AI agents & chatbot carts</p>
                          </div>
                        </a>

                        <a href="#modular-solutions" className="group flex items-start p-2 rounded-xl hover:bg-slate-50 transition-colors">
                          <div className="w-8 h-8 rounded-lg bg-teal-100/70 text-teal-600 flex items-center justify-center mr-3 mt-0.5 group-hover:scale-105 transition-transform">
                            <Coins className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 group-hover:text-teal-600">Crypto & Stablecoins</div>
                            <p className="text-xs text-slate-500 mt-0.5">Instant cross-border USDC and stablecoin rails</p>
                          </div>
                        </a>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">
                        Revenue & Finance
                      </div>
                      <div className="space-y-1">
                        <a href="#modular-solutions" className="group flex items-start p-2 rounded-xl hover:bg-slate-50 transition-colors">
                          <div className="w-8 h-8 rounded-lg bg-amber-100/70 text-amber-600 flex items-center justify-center mr-3 mt-0.5 group-hover:scale-105 transition-transform">
                            <BarChart3 className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 group-hover:text-amber-600">Billing & Subscriptions</div>
                            <p className="text-xs text-slate-500 mt-0.5">Usage-based, tiered, and SaaS recurring models</p>
                          </div>
                        </a>

                        <a href="#modular-solutions" className="group flex items-start p-2 rounded-xl hover:bg-slate-50 transition-colors">
                          <div className="w-8 h-8 rounded-lg bg-rose-100/70 text-rose-600 flex items-center justify-center mr-3 mt-0.5 group-hover:scale-105 transition-transform">
                            <Layers className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 group-hover:text-rose-600">Trilink Connect</div>
                            <p className="text-xs text-slate-500 mt-0.5">Multi-party payments for platforms & apps</p>
                          </div>
                        </a>

                        <a href="#modular-solutions" className="group flex items-start p-2 rounded-xl hover:bg-slate-50 transition-colors">
                          <div className="w-8 h-8 rounded-lg bg-sky-100/70 text-sky-600 flex items-center justify-center mr-3 mt-0.5 group-hover:scale-105 transition-transform">
                            <ShieldCheck className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 group-hover:text-sky-600">Trilink Radar</div>
                            <p className="text-xs text-slate-500 mt-0.5">Machine learning real-time fraud defense</p>
                          </div>
                        </a>

                        <a href="#modular-solutions" className="group flex items-start p-2 rounded-xl hover:bg-slate-50 transition-colors">
                          <div className="w-8 h-8 rounded-lg bg-emerald-100/70 text-[#00A86B] flex items-center justify-center mr-3 mt-0.5 group-hover:scale-105 transition-transform">
                            <CreditCard className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 group-hover:text-[#00A86B]">Trilink Issuing</div>
                            <p className="text-xs text-slate-500 mt-0.5">Create physical and virtual card programs</p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Solutions */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('solutions')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-full text-sm font-semibold transition-colors ${
                  activeMenu === 'solutions'
                    ? 'text-[#00A86B] bg-emerald-50/80'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100/70'
                }`}
              >
                <span>Solutions</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMenu === 'solutions' ? 'rotate-180' : ''}`} />
              </button>

              {activeMenu === 'solutions' && (
                <div
                  className="absolute left-0 top-full pt-3 w-[560px] z-50"
                  onMouseEnter={() => handleMouseEnter('solutions')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 grid grid-cols-2 gap-6 ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">
                        By Stage
                      </div>
                      <div className="space-y-1">
                        <a href="#enterprises" className="group flex items-start p-2 rounded-xl hover:bg-slate-50 transition-colors">
                          <div className="w-8 h-8 rounded-lg bg-indigo-100/70 text-indigo-600 flex items-center justify-center mr-3 mt-0.5">
                            <Building2 className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600">Enterprises</div>
                            <p className="text-xs text-slate-500 mt-0.5">Agile infrastructure for global scale</p>
                          </div>
                        </a>
                        <a href="#startups" className="group flex items-start p-2 rounded-xl hover:bg-slate-50 transition-colors">
                          <div className="w-8 h-8 rounded-lg bg-emerald-100/70 text-[#00A86B] flex items-center justify-center mr-3 mt-0.5">
                            <Rocket className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 group-hover:text-[#00A86B]">Startups</div>
                            <p className="text-xs text-slate-500 mt-0.5">Launch faster and scale revenue</p>
                          </div>
                        </a>
                        <a href="#platforms" className="group flex items-start p-2 rounded-xl hover:bg-slate-50 transition-colors">
                          <div className="w-8 h-8 rounded-lg bg-purple-100/70 text-purple-600 flex items-center justify-center mr-3 mt-0.5">
                            <Layers className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 group-hover:text-purple-600">Platforms & SaaS</div>
                            <p className="text-xs text-slate-500 mt-0.5">Embed financial services in your app</p>
                          </div>
                        </a>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">
                        By Industry
                      </div>
                      <div className="space-y-1">
                        <a href="#startups" className="group flex items-start p-2 rounded-xl hover:bg-slate-50 transition-colors">
                          <div className="w-8 h-8 rounded-lg bg-cyan-100/70 text-cyan-600 flex items-center justify-center mr-3 mt-0.5">
                            <Sparkles className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 group-hover:text-cyan-600">AI Companies</div>
                            <p className="text-xs text-slate-500 mt-0.5">Compute credits and token billing</p>
                          </div>
                        </a>
                        <a href="#modular-solutions" className="group flex items-start p-2 rounded-xl hover:bg-slate-50 transition-colors">
                          <div className="w-8 h-8 rounded-lg bg-amber-100/70 text-amber-600 flex items-center justify-center mr-3 mt-0.5">
                            <Store className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 group-hover:text-amber-600">Ecommerce & Retail</div>
                            <p className="text-xs text-slate-500 mt-0.5">Unified online and in-store checkout</p>
                          </div>
                        </a>
                        <a href="#modular-solutions" className="group flex items-start p-2 rounded-xl hover:bg-slate-50 transition-colors">
                          <div className="w-8 h-8 rounded-lg bg-emerald-100/70 text-[#00A86B] flex items-center justify-center mr-3 mt-0.5">
                            <Globe2 className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 group-hover:text-[#00A86B]">Global Cross-Border</div>
                            <p className="text-xs text-slate-500 mt-0.5">135+ currencies with local payment methods</p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Developers */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('developers')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-full text-sm font-semibold transition-colors ${
                  activeMenu === 'developers'
                    ? 'text-[#00A86B] bg-emerald-50/80'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100/70'
                }`}
              >
                <span>Developers</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMenu === 'developers' ? 'rotate-180' : ''}`} />
              </button>

              {activeMenu === 'developers' && (
                <div
                  className="absolute left-0 top-full pt-3 w-[460px] z-50"
                  onMouseEnter={() => handleMouseEnter('developers')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 space-y-4 ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="grid grid-cols-2 gap-4">
                      <a href="#developers" className="group flex items-start p-2 rounded-xl hover:bg-slate-50 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-slate-900 text-emerald-400 flex items-center justify-center mr-3 mt-0.5">
                          <Code2 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-900 group-hover:text-[#00A86B]">Documentation</div>
                          <p className="text-xs text-slate-500 mt-0.5">Guides, tutorials, and SDKs</p>
                        </div>
                      </a>
                      <a href="#developers" className="group flex items-start p-2 rounded-xl hover:bg-slate-50 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-slate-900 text-blue-400 flex items-center justify-center mr-3 mt-0.5">
                          <Terminal className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-900 group-hover:text-blue-600">API Reference</div>
                          <p className="text-xs text-slate-500 mt-0.5">Complete endpoint schemas</p>
                        </div>
                      </a>
                    </div>
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span>Libraries in Node.js, Python, Go, Ruby, Java</span>
                      <a href="#developers" className="font-semibold text-[#00A86B] hover:underline flex items-center">
                        Explore SDKs <ArrowRight className="w-3 h-3 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Resources */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('resources')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-full text-sm font-semibold transition-colors ${
                  activeMenu === 'resources'
                    ? 'text-[#00A86B] bg-emerald-50/80'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100/70'
                }`}
              >
                <span>Resources</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMenu === 'resources' ? 'rotate-180' : ''}`} />
              </button>

              {activeMenu === 'resources' && (
                <div
                  className="absolute left-0 top-full pt-3 w-[360px] z-50"
                  onMouseEnter={() => handleMouseEnter('resources')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-5 space-y-2 ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 duration-150">
                    <a href="#whats-happening" className="group flex items-start p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                      <BookOpen className="w-4 h-4 text-emerald-600 mr-3 mt-1" />
                      <div>
                        <div className="text-sm font-semibold text-slate-900 group-hover:text-[#00A86B]">Trilink Sessions 2026</div>
                        <p className="text-xs text-slate-500 mt-0.5">Our global flagship keynote</p>
                      </div>
                    </a>
                    <a href="#book-of-the-week" className="group flex items-start p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                      <Compass className="w-4 h-4 text-blue-600 mr-3 mt-1" />
                      <div>
                        <div className="text-sm font-semibold text-slate-900 group-hover:text-blue-600">Trilink Press</div>
                        <p className="text-xs text-slate-500 mt-0.5">Books on economics and progress</p>
                      </div>
                    </a>
                    <a href="#whats-happening" className="group flex items-start p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                      <LifeBuoy className="w-4 h-4 text-amber-600 mr-3 mt-1" />
                      <div>
                        <div className="text-sm font-semibold text-slate-900 group-hover:text-amber-600">Customer Stories</div>
                        <p className="text-xs text-slate-500 mt-0.5">How leading companies scale</p>
                      </div>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Pricing */}
            <button
              type="button"
              onClick={() => {
                onNavigate?.('pricing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3.5 py-2 rounded-full text-sm font-semibold transition-colors ${
                currentPage === 'pricing'
                  ? 'text-[#00A86B] bg-emerald-50 font-bold shadow-xs'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100/70'
              }`}
            >
              Pricing
            </button>
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="hidden lg:flex items-center space-x-3">
          <button
            type="button"
            onClick={onOpenSignIn}
            className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-950 transition-colors rounded-full hover:bg-slate-100/80"
          >
            Sign in
          </button>

          <button
            type="button"
            onClick={onOpenContactSales}
            className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-950 transition-colors rounded-full border border-slate-200 hover:border-slate-300 bg-white/80 backdrop-blur-sm"
          >
            Contact sales
          </button>

          <button
            type="button"
            onClick={() => {
              if (currentPage !== 'home') onNavigate?.('home');
              setTimeout(() => {
                const el = document.querySelector('#modular-solutions');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="group relative inline-flex items-center justify-center px-4 py-2 text-sm font-bold text-slate-900 bg-[#00E599] hover:bg-[#00D48D] transition-all rounded-full shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Start now</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Mobile Hamburger button */}
        <div className="lg:hidden flex items-center">
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-6 py-6 shadow-2xl space-y-5 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                handleSectionLink('#modular-solutions');
              }}
              className="block w-full text-left px-3 py-2 text-base font-semibold text-slate-900 rounded-lg hover:bg-slate-100"
            >
              Products & Solutions
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                handleSectionLink('#developers');
              }}
              className="block w-full text-left px-3 py-2 text-base font-semibold text-slate-900 rounded-lg hover:bg-slate-100"
            >
              Developers
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                handleSectionLink('#enterprises');
              }}
              className="block w-full text-left px-3 py-2 text-base font-semibold text-slate-900 rounded-lg hover:bg-slate-100"
            >
              Enterprise
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onNavigate?.('pricing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`block w-full text-left px-3 py-2 text-base font-semibold rounded-lg ${
                currentPage === 'pricing'
                  ? 'text-[#00A86B] bg-emerald-50 font-bold'
                  : 'text-slate-900 hover:bg-slate-100'
              }`}
            >
              Pricing
            </button>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-3">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                if (onOpenSignIn) onOpenSignIn();
              }}
              className="w-full text-center py-2.5 text-sm font-semibold text-slate-800 rounded-xl bg-slate-100 hover:bg-slate-200"
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                if (onOpenContactSales) onOpenContactSales();
              }}
              className="w-full text-center py-2.5 text-sm font-semibold text-slate-800 rounded-xl border border-slate-300 hover:bg-slate-50"
            >
              Contact sales
            </button>
            <a
              href="#modular-solutions"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center w-full py-2.5 text-sm font-bold text-slate-900 bg-[#00E599] rounded-xl shadow-sm"
            >
              Start now
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
