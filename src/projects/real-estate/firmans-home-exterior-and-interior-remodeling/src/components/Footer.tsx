import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { FirmansLogo } from './FirmansLogo';

interface FooterProps {
  onSelectService: (serviceId: string) => void;
  onOpenQuote: () => void;
  onNavigate?: (route: 'home' | 'services' | 'gallery' | 'about' | 'contact') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectService, onOpenQuote, onNavigate }) => {
  const handleLinkClick = (route: 'home' | 'services' | 'gallery' | 'about' | 'contact') => {
    if (onNavigate) {
      onNavigate(route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleServiceClick = (serviceId: string) => {
    if (onNavigate) {
      onNavigate('services');
    }
    onSelectService(serviceId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#080E17] text-slate-400 text-xs border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Column 1: Brand & Slogan (Col 4) */}
          <div className="lg:col-span-4 space-y-4">
            <button
              onClick={() => handleLinkClick('home')}
              className="text-left cursor-pointer"
            >
              <FirmansLogo size="md" variant="light" />
            </button>

            <p className="text-sm text-slate-300 font-medium pt-1">
              Architectural Discipline. Lasting Craftsmanship.
            </p>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed font-light">
              Transforming fine residences across the region with turnkey design, structural precision, and lifetime-warranted craftsmanship.
            </p>
          </div>

          {/* Column 2: Pages Navigation (Col 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide">Navigation</h4>
            <ul className="space-y-2.5">
              {[
                { name: 'Home', route: 'home' as const },
                { name: 'Services', route: 'services' as const },
                { name: 'Gallery', route: 'gallery' as const },
                { name: 'About', route: 'about' as const },
                { name: 'Contact', route: 'contact' as const },
              ].map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleLinkClick(link.route)}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Services (Col 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide">Our Services</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5">
              <div className="space-y-2.5">
                <div>
                  <button
                    onClick={() => handleServiceClick('roofing')}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    Roofing
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => handleServiceClick('windows-doors')}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    Windows &amp; Doors
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => handleServiceClick('exterior-painting')}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    Exterior Painting
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => handleServiceClick('gutters')}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    Gutters
                  </button>
                </div>
              </div>
              <div className="space-y-2.5">
                <div>
                  <button
                    onClick={() => handleServiceClick('turf-grass')}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    Turf / Synthetic Grass
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => handleServiceClick('flooring')}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    Flooring
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => handleServiceClick('interior-painting')}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    Interior Painting
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => handleServiceClick('remodeling')}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    Full Remodeling
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Get in Touch (Col 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide">Get in Touch</h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C07848] shrink-0" />
                <a href="tel:5551234567" className="hover:text-white transition-colors">
                  (555) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C07848] shrink-0" />
                <a href="mailto:inquiries@firmansremodeling.com" className="hover:text-white transition-colors">
                  inquiries@firmansremodeling.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C07848] shrink-0 mt-0.5" />
                <span>1200 Architecture Blvd, Metro District, ST 12345</span>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:border-[#C07848] hover:bg-[#C07848] hover:text-white flex items-center justify-center text-slate-300 transition-all font-semibold"
              >
                F
              </a>
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:border-[#C07848] hover:bg-[#C07848] hover:text-white flex items-center justify-center text-slate-300 transition-all font-semibold"
              >
                I
              </a>
              <a
                href="#youtube"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:border-[#C07848] hover:bg-[#C07848] hover:text-white flex items-center justify-center text-slate-300 transition-all font-semibold"
              >
                Y
              </a>
              <a
                href="#linkedin"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:border-[#C07848] hover:bg-[#C07848] hover:text-white flex items-center justify-center text-slate-300 transition-all font-semibold"
              >
                L
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© 2026 Firmans Home Exterior and Interior Remodeling. All rights reserved.</p>
          <p className="tracking-wide">
            Architectural Precision <span className="mx-2 text-white/30">|</span> Enduring Craft <span className="mx-2 text-white/30">|</span> Guaranteed Delivery
          </p>
        </div>
      </div>
    </footer>
  );
};
