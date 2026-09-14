import React, { useState } from 'react';
import { 
  ChevronUp, 
  ShieldCheck, 
  ArrowUp,
  Globe2,
  Share2,
  Mail,
  ExternalLink,
  Building2,
  Phone,
  MessageCircle,
  Send,
  CheckCircle2
} from 'lucide-react';
import logoImg from '../assets/images/heartandmind image.png';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenPortal: (mode: 'buyer' | 'manufacturer') => void;
  onOpenVault: () => void;
  onOpenIncoterms: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenPortal,
  onOpenVault,
  onOpenIncoterms
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => {
      setNewsletterSubscribed(false);
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0b1b33] text-slate-300 pt-6 pb-4 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
                {/* Newsletter Subscription Banner */}
        <div className="mb-6 bg-gradient-to-r from-[#0c4a6e] via-[#0284c7] to-[#0369a1] rounded-lg p-5 sm:p-4 shadow-md text-white flex flex-col lg:flex-row items-center justify-between gap-4 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
            <svg viewBox="0 0 24 24" className="w-32 h-32 fill-current">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          
          <div className="max-w-md text-center lg:text-left z-10 w-full sm:w-auto">
            <h3 className="text-sm sm:text-base font-bold tracking-tight">
              Subscribe to Our Weekly Logistics Dispatch
            </h3>
            <p className="text-xs sm:text-sm text-cyan-100 mt-1">
              Get FDA/CE clearance updates, CPT freight trends, and ministry tender alerts.
            </p>
          </div>

          <div className="w-full lg:w-auto z-10">
            {newsletterSubscribed ? (
              <div className="bg-emerald-500/95 text-white px-4 py-2.5 rounded-md font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Subscribed Successfully!</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 w-full">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Professional email..."
                  required
                  className="bg-white/10 border border-white/30 rounded-md px-3.5 py-2.5 text-xs text-white placeholder-cyan-200 focus:outline-none focus:ring-1 focus:ring-white w-full sm:w-64 shadow-inner"
                />
                <button
                  type="submit"
                  className="bg-white text-[#0b1b33] hover:bg-cyan-50 px-5 py-2.5 rounded-md font-bold text-xs tracking-wide transition-all shadow-sm flex items-center justify-center gap-1.5 whitespace-nowrap"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 pb-6 border-b border-slate-800">
                    {/* Brand Column */}
                    <div className="lg:col-span-4">
                      <div className="flex items-center gap-4 mb-4 cursor-pointer" onClick={scrollToTop}>
                        <div className="relative w-16 h-16 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                          <img 
                            src={logoImg} 
                            alt="Hearts and Mind Medical Export LLC Logo" 
                            className="w-full h-full object-contain"
                          />
                        </div>

                        <div>
                          <div className="font-extrabold text-white text-lg tracking-tight leading-none">
                            HEARTS AND MIND
                          </div>
                          <div className="text-xs font-bold text-[#0284c7] tracking-wider leading-none mt-1">
                            MEDICAL EXPORT LLC
                          </div>
                        </div>
                      </div>

            <p className="text-xs text-slate-400 leading-relaxed mb-4 max-w-sm">
              Connecting certified medical manufacturers with hospitals, ministries, and distributors worldwide. Specialized in CPT logistics, customs navigation, and quality assurance.
            </p>

            <div className="text-[10px] tracking-wider text-cyan-400 font-semibold uppercase">
              Global Sourcing • Logistics • Healthcare Tomorrows
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 sm:col-span-1">
            <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-cyan-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-cyan-400 transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products')} className="hover:text-cyan-400 transition-colors">
                  Products / Supplies
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shipping')} className="hover:text-cyan-400 transition-colors">
                  Trade & Shipping (Incoterms)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-cyan-400 transition-colors">
                  Contact / Request a Quote
                </button>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="lg:col-span-3 sm:col-span-1">
            <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={onOpenIncoterms} className="hover:text-cyan-400 transition-colors">
                  Incoterms Guide (CPT, FOB, CIF, DDP)
                </button>
              </li>
              <li>
                <button onClick={onOpenVault} className="hover:text-cyan-400 transition-colors">
                  Compliance & Certifications
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPortal('manufacturer')} className="hover:text-cyan-400 transition-colors">
                  Manufacturer Portal
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPortal('buyer')} className="hover:text-cyan-400 transition-colors">
                  Buyer Portal
                </button>
              </li>
              <li>
                <button onClick={onOpenVault} className="hover:text-cyan-400 transition-colors">
                  Document Vault
                </button>
              </li>
            </ul>
          </div>

          {/* Connect With Us Column */}
          <div className="lg:col-span-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-4">
              Connect With Us
            </h4>

            {/* Social Icons with SVG brand symbols */}
            <div className="flex items-center gap-3 mb-6">
              <a 
                href="https://linkedin.com" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-[#0077b5] text-white flex items-center justify-center hover:opacity-90 hover:scale-105 transition-all shadow-xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="w-9 h-9 rounded-lg bg-[#1da1f2] text-white flex items-center justify-center hover:opacity-90 hover:scale-105 transition-all shadow-xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-[#1877f2] text-white flex items-center justify-center hover:opacity-90 hover:scale-105 transition-all shadow-xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a 
                href="mailto:info@heartsandmindexport.com" 
                aria-label="Email Us"
                className="w-9 h-9 rounded-lg bg-[#0284c7] text-white flex items-center justify-center hover:opacity-90 hover:scale-105 transition-all shadow-xs"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
            <p className="text-xs text-slate-400 mb-2">
              Global Medical Supply Distribution & Trade Logistics
            </p>
            <p className="text-[11px] text-slate-500">
              © {new Date().getFullYear()} Hearts and Mind Medical Export LLC. All rights reserved.
            </p>
          </div>
        </div>

        {/* Bottom Bar matching screenshot */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-6">
            <button className="hover:text-slate-300 transition-colors">Privacy Policy</button>
            <button className="hover:text-slate-300 transition-colors">Terms of Use</button>
            <button className="hover:text-slate-300 transition-colors">Cookie Settings</button>
          </div>

          {/* Floating Back to top button matching screenshot bottom right */}
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white flex items-center justify-center shadow-lg transition-all hover:scale-110"
            aria-label="Scroll to top of page"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

