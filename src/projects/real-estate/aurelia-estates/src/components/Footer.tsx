import React, { useState } from 'react';
import { Send, Check } from 'lucide-react';

// Custom SVG Icons for social networks
const Linkedin = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const Instagram = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Youtube = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

interface FooterProps {
  onOpenConsultation?: () => void;
  onOpenPrivateCollection?: () => void;
  onNavigatePage?: (page: 'home' | 'about' | 'contact', targetHash?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenConsultation: _onOpenConsultation,
  onOpenPrivateCollection: _onOpenPrivateCollection,
  onNavigatePage,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3500);
    }
  };

  return (
    <footer id="main-footer" className="bg-[#07080a] border-t border-[#1a1c24] text-[#8e95a5]">
      {/* Newsletter / Briefing Strip */}
      <div className="border-b border-[#161820] py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-serif-luxury text-2xl text-white font-normal tracking-wide">
              The Aurelia Confidential Dispatch
            </h3>
            <p className="text-xs text-[#8e95a5] font-light">
              Quarterly intelligence on ultra-prime transactions, private islands, and off-market releases.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto max-w-md items-center gap-2">
            <input
              type="email"
              placeholder="Enter your confidential email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full md:w-72 bg-[#12141a] border border-[#262a36] rounded px-3.5 py-2.5 text-xs text-white placeholder-[#5d6373] focus:outline-none focus:border-[#c5a880]"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-[#c5a880] hover:bg-[#d8b88a] text-black font-semibold text-xs tracking-wider rounded transition-colors flex items-center gap-1.5 shrink-0"
            >
              {subscribed ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>REGISTERED</span>
                </>
              ) : (
                <>
                  <span>REQUEST ACCESS</span>
                  <Send className="w-3 h-3" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Row matching screenshot */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-10 border-b border-[#161820]">
          {/* Logo & Tagline with vertical divider line matching screenshot */}
          <div className="flex items-center space-x-6">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onNavigatePage?.('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex flex-col items-start group"
            >
              <span className="font-display-luxury text-xl tracking-[0.28em] font-medium text-white group-hover:text-[#d8b88a] transition-colors">
                AURELIA
              </span>
              <span className="text-[8.5px] tracking-[0.45em] text-[#8e95a5] font-light uppercase">
                ESTATES
              </span>
            </a>

            <div className="h-9 w-[1px] bg-[#2a2e3b]" />

            <p className="text-xs text-[#a5abb8] font-light tracking-wide leading-tight">
              Extraordinary homes.<br />
              Remarkable places.
            </p>
          </div>

          {/* Navigation Links and Social Icons matching screenshot */}
          <div className="flex flex-wrap items-center gap-6 md:gap-8">
            <div className="flex flex-wrap items-center gap-6 text-[11px] font-medium tracking-[0.2em] text-[#c7cbd4]">
              <a
                href="#properties"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigatePage?.('home', '#properties');
                }}
                className="hover:text-[#d8b88a] transition-colors"
              >
                PROPERTIES
              </a>
              <a
                href="#destinations"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigatePage?.('home', '#destinations');
                }}
                className="hover:text-[#d8b88a] transition-colors"
              >
                DESTINATIONS
              </a>
              <a
                href="#journal"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigatePage?.('home', '#journal');
                }}
                className="hover:text-[#d8b88a] transition-colors"
              >
                JOURNAL
              </a>
              <a
                href="#agents"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigatePage?.('home', '#agents');
                }}
                className="hover:text-[#d8b88a] transition-colors"
              >
                ADVISORS
              </a>
              <button
                onClick={() => {
                  onNavigatePage?.('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-[#d8b88a] transition-colors uppercase"
              >
                ABOUT
              </button>
              <button
                onClick={() => {
                  onNavigatePage?.('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-[#d8b88a] transition-colors uppercase"
              >
                CONTACT
              </button>
            </div>

            {/* Social Icons matching screenshot */}
            <div className="flex items-center space-x-3 text-[#9ca3af]">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 hover:text-[#d8b88a] hover:bg-white/5 rounded transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 hover:text-[#d8b88a] hover:bg-white/5 rounded transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 hover:text-[#d8b88a] hover:bg-white/5 rounded transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Legal & Copyright Row matching screenshot */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#636875] gap-4">
          <p>© 2025 Aurelia Estates. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <a href="#privacy" onClick={(e) => { e.preventDefault(); alert('Aurelia Estates respects institutional confidentiality and strict client non-disclosure protocols.'); }} className="hover:text-[#a0a6b5] transition-colors">
              Privacy
            </a>
            <a href="#terms" onClick={(e) => { e.preventDefault(); alert('Terms of advisory representation and verified accreditation.'); }} className="hover:text-[#a0a6b5] transition-colors">
              Terms
            </a>
            <a href="#sitemap" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#a0a6b5] transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
