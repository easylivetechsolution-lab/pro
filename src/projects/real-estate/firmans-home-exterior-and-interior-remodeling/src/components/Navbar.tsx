import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { FirmansLogo } from './FirmansLogo';

interface NavbarProps {
  currentRoute: 'home' | 'services' | 'gallery' | 'about' | 'contact';
  onNavigate: (route: 'home' | 'services' | 'gallery' | 'about' | 'contact') => void;
  onOpenQuote: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate, onOpenQuote }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { name: string; route: 'home' | 'services' | 'gallery' | 'about' | 'contact' }[] = [
    { name: 'Home', route: 'home' },
    { name: 'Services', route: 'services' },
    { name: 'Gallery', route: 'gallery' },
    { name: 'About', route: 'about' },
    { name: 'Contact', route: 'contact' },
  ];

  const handleLinkClick = (route: 'home' | 'services' | 'gallery' | 'about' | 'contact') => {
    onNavigate(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B131E]/95 backdrop-blur-md py-3.5 shadow-xl shadow-black/30 border-b border-white/10'
          : 'bg-gradient-to-b from-[#0B131E]/95 via-[#0B131E]/70 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo: FIRMANS */}
        <button
          id="navbar-brand"
          onClick={() => handleLinkClick('home')}
          className="group text-left cursor-pointer transition-transform active:scale-98"
        >
          <FirmansLogo size="md" variant="light" />
        </button>

        {/* Desktop Navigation Links */}
        <nav id="desktop-nav-links" className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <button
              key={link.route}
              id={`nav-link-${link.route}`}
              onClick={() => handleLinkClick(link.route)}
              className={`text-sm font-medium tracking-wide transition-all relative py-1.5 px-3 rounded-full cursor-pointer ${
                currentRoute === link.route
                  ? 'bg-white/10 text-white font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.name}
              {currentRoute === link.route && (
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#C07848] rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <button
            id="nav-get-quote-btn"
            onClick={onOpenQuote}
            className="hidden sm:inline-flex items-center gap-2 bg-[#C07848] hover:bg-[#D28A5B] text-white font-semibold px-5 py-2.5 rounded-full text-xs sm:text-sm tracking-wide shadow-md shadow-[#C07848]/20 transition-all cursor-pointer"
          >
            <span>Request Estimate</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 md:hidden transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer-menu"
          className="md:hidden bg-[#0B131E]/98 border-b border-white/10 px-6 py-6 space-y-4 backdrop-blur-xl animate-in slide-in-from-top-4"
        >
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.route}
                id={`mobile-nav-${link.route}`}
                onClick={() => handleLinkClick(link.route)}
                className={`text-left text-base font-medium py-2.5 px-4 rounded-xl transition-colors cursor-pointer ${
                  currentRoute === link.route
                    ? 'bg-[#C07848]/20 text-[#C07848] font-bold border border-[#C07848]/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>
          <div className="pt-3 border-t border-white/10">
            <button
              id="mobile-get-quote-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#C07848] hover:bg-[#D28A5B] text-white font-semibold px-5 py-3 rounded-xl text-sm shadow-md"
            >
              <span>Request Estimate</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
