import React from 'react';
import { CLINIC_INFO } from '../data/dentalData';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer id="footer" className="bg-[#0A1A1E] text-zinc-400 text-xs py-14 border-t border-[#162D33]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-zinc-800">
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <button 
              onClick={() => handleNav('home')}
              className="flex items-center gap-2.5 mb-1.5 cursor-pointer text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-[#16363D] text-[#EAD8B7] flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-[#EAD8B7]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2C9.5 2 7.5 3.5 7 5.5C6.5 7.5 5 9 3.5 11.5C2 14 2.5 17 4.5 19C6.5 21 8.5 22 10 22C11.5 22 11.5 20.5 12 20.5C12.5 20.5 12.5 22 14 22C15.5 22 17.5 21 19.5 19C21.5 17 22 14 20.5 11.5C19 9 17.5 7.5 17 5.5C16.5 3.5 14.5 2 12 2Z" />
                </svg>
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-white">
                PearlView Dental
              </span>
            </button>
            <p className="text-xs text-zinc-400 font-serif italic">
              Exceptional care. Lasting smiles.
            </p>
          </div>

          {/* Quick Navigation links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-zinc-300 font-medium text-xs">
            <button onClick={() => handleNav('home')} className="hover:text-white transition-colors cursor-pointer">
              Home
            </button>
            <button onClick={() => handleNav('services')} className="hover:text-white transition-colors cursor-pointer">
              Services
            </button>
            <button onClick={() => handleNav('fees-insurance')} className="hover:text-white transition-colors cursor-pointer">
              Fees & Insurance
            </button>
            <button onClick={() => handleNav('technology')} className="hover:text-white transition-colors cursor-pointer">
              Technology
            </button>
            <button onClick={() => handleNav('patient-stories')} className="hover:text-white transition-colors cursor-pointer">
              Patient Stories
            </button>
            <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors cursor-pointer">
              Contact
            </button>
          </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
              aria-label="YouTube"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom Legal & Accreditations */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <p>
            &copy; {new Date().getFullYear()} PearlView Dental Studio. All rights reserved. 123 Wellness Drive, Austin, TX.
          </p>

          <div className="flex items-center gap-6">
            <button onClick={() => handleNav('fees-insurance')} className="hover:text-zinc-300 transition-colors cursor-pointer">
              Pricing Transparency
            </button>
            <button onClick={() => handleNav('contact')} className="hover:text-zinc-300 transition-colors cursor-pointer">
              Patient Inquiries
            </button>
            <button onClick={() => handleNav('home')} className="hover:text-zinc-300 transition-colors cursor-pointer">
              ADA Compliance
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
