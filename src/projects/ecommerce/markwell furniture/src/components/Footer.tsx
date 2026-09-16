import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowUp, 
  Globe, 
  ShieldCheck, 
  ChevronDown 
} from 'lucide-react';

interface FooterProps {
  onOpenB2B: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenB2B }) => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#08090c] text-zinc-400 text-xs border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4">
            <Link 
              to="/"
              onClick={scrollToTop}
              className="flex items-center gap-3 group mb-4 inline-flex"
            >
              {/* Logo Mark */}
              <div className="w-8 h-8 flex items-center justify-center">
                <svg viewBox="0 0 40 32" fill="none" className="w-full h-full text-white transition-transform duration-300 group-hover:scale-105">
                  <path 
                    d="M4 28L12 6L20 20L28 6L36 28" 
                    stroke="currentColor" 
                    strokeWidth="4.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  />
                  <path 
                    d="M20 20L28 6" 
                    stroke="#e29d52" 
                    strokeWidth="4.5" 
                    strokeLinecap="round" 
                  />
                </svg>
              </div>

              <div>
                <span className="text-xl font-bold tracking-tight text-white font-sans">
                  Mark<span className="text-[#e29d52]">Well</span>
                </span>
                <span className="block text-[8px] tracking-[0.24em] uppercase text-zinc-500 font-semibold -mt-1">
                  Furniture Solutions
                </span>
              </div>
            </Link>

            <p className="text-xs text-zinc-400 leading-relaxed mb-6 max-w-sm">
              Architectural craftsmanship, certified ergonomic biomechanics, and sustainable workplace solutions for modern leaders and forward-thinking enterprises.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-zinc-400 bg-white/5 p-2.5 rounded-xl border border-white/5 w-fit">
              <ShieldCheck className="w-4 h-4 text-[#f3ba77]" />
              <span>Certified B-Corp / 10-Year Commercial Warranty</span>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-sans">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-white transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link to="/handcrafted" className="hover:text-white transition-colors">
                  Handcrafted Atelier
                </Link>
              </li>
              <li>
                <Link to="/b2b" className="hover:text-white transition-colors">
                  B2B & Wholesale
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Shop By Category (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-sans">
              Shop By Category
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/shop?category=desks" className="hover:text-white transition-colors">
                  Office & Standing Desks
                </Link>
              </li>
              <li>
                <Link to="/shop?category=chairs" className="hover:text-white transition-colors">
                  Ergonomic Chairs
                </Link>
              </li>
              <li>
                <Link to="/handcrafted" className="hover:text-white transition-colors">
                  Handcrafted Woodwork
                </Link>
              </li>
              <li>
                <Link to="/shop?category=conference" className="hover:text-white transition-colors">
                  Conference Tables
                </Link>
              </li>
              <li>
                <Link to="/shop?category=storage" className="hover:text-white transition-colors">
                  Storage & Credenzas
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support & Social (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-sans">
              Customer Support
            </h4>
            <ul className="space-y-2.5 mb-6">
              <li><Link to="/contact" className="hover:text-white transition-colors">FAQs & Assembly Guides</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Shipping & Freight Logistics</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">30-Day Risk-Free Returns</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Commercial Warranty Claim</Link></li>
            </ul>

            {/* Follow Us and Currency */}
            <div>
              <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block mb-2">
                Follow Us
              </span>
              <div className="flex items-center gap-3">
                <a href="#hero" className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-colors" title="Facebook">
                  f
                </a>
                <a href="#hero" className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-colors" title="Instagram">
                  📸
                </a>
                <a href="#hero" className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-colors" title="LinkedIn">
                  in
                </a>
                <a href="#hero" className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-colors" title="YouTube">
                  yt
                </a>
                <a href="#hero" className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-colors" title="Pinterest">
                  p
                </a>
              </div>
            </div>

            {/* Region / Currency */}
            <div className="mt-4 flex items-center gap-2 text-xs text-zinc-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 w-fit">
              <Globe className="w-3.5 h-3.5 text-[#f3ba77]" />
              <span>USD ($) / EN</span>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
            </div>

          </div>

        </div>

        {/* Bottom Legal & Back to Top Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            © {new Date().getFullYear()} MarkWell Furniture Solutions. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-zinc-300 transition-colors">Privacy Policy</Link>
            <Link to="/about" className="hover:text-zinc-300 transition-colors">Terms of Service</Link>
            <Link to="/about" className="hover:text-zinc-300 transition-colors">Commercial Guidelines</Link>
          </div>

          {/* Back to top smooth button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 p-2 px-3 rounded-full bg-white/5 hover:bg-[#e29d52] hover:text-black text-zinc-300 border border-white/10 transition-all cursor-pointer"
            title="Scroll to Top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};

