import React from 'react';
import { ArrowRight, ArrowUp } from 'lucide-react';

interface FooterProps {
  onPartnerClick: () => void;
  onNavigate?: (page: string, sectionId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onPartnerClick, onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', page: 'home', sectionId: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Our Farms', page: 'home', sectionId: 'farms' },
    { label: 'Products', page: 'products' },
    { label: 'Technology', page: 'technology' },
    { label: 'Sustainability', page: 'home', sectionId: 'sustainability' },
    { label: 'Insights', page: 'insights' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleLinkClick = (link: { page: string; sectionId?: string }) => {
    if (onNavigate) {
      onNavigate(link.page, link.sectionId);
    } else {
      scrollToTop();
    }
  };

  return (
    <footer className="bg-[#030c07] text-white pt-16 pb-12 border-t border-[#c39953]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Brand & Mission Centered Block - No Logo */}
        <div className="flex flex-col items-center text-center space-y-4 pb-12 border-b border-white/10">
          <button
            onClick={() => handleLinkClick({ page: 'home', sectionId: 'home' })}
            className="cursor-pointer focus:outline-none text-center group"
            title="AgriFuture"
          >
            <span className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-serif group-hover:text-[#dfc599] transition-colors">
              Agri<span className="text-[#34d399] font-medium">Future</span>
            </span>
          </button>

          <p className="text-sm font-serif italic text-gray-300 tracking-wide max-w-md">
            "Healthy Land. Abundant Future."
          </p>

          <button
            onClick={onPartnerClick}
            className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#041009] bg-gradient-to-r from-[#d8b06d] to-[#c39953] hover:from-[#e3c185] hover:to-[#cca35c] rounded-full transition-all duration-300 shadow-md flex items-center gap-2 cursor-pointer"
          >
            <span>Partner With Us</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Navigation Links Row */}
        <div className="py-8 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-medium text-gray-300">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link)}
              className="hover:text-[#dfc599] transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Bottom Legal & Back to Top */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 AgriFuture Inc. All rights reserved. Certified Sustainable Enterprise.</p>

          <div className="flex items-center gap-6">
            <button
              onClick={() => handleLinkClick({ page: 'contact' })}
              className="hover:text-gray-300 transition-colors cursor-pointer"
            >
              Commercial Desk
            </button>
            <button
              onClick={() => handleLinkClick({ page: 'about' })}
              className="hover:text-gray-300 transition-colors cursor-pointer"
            >
              Certifications & ROC™
            </button>
            <button
              onClick={() => handleLinkClick({ page: 'technology' })}
              className="hover:text-gray-300 transition-colors cursor-pointer"
            >
              Cold-Chain Standards
            </button>

            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full bg-[#0e291d] hover:bg-[#133827] text-gray-300 hover:text-white flex items-center justify-center transition-colors ml-2 cursor-pointer"
              title="Return to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
