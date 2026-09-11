import React, { useState, useEffect } from 'react';
import { Search, Menu, X, Globe, Shield, PhoneCall } from 'lucide-react';
import type { Currency } from '../types';
import { CURRENCY_RATES } from '../data/estatesData';

interface NavbarProps {
  currentCurrency: Currency;
  onCurrencyChange: (c: Currency) => void;
  onOpenSearch: () => void;
  onOpenConsultation: () => void;
  onOpenPrivateCollection: () => void;
  currentPage?: 'home' | 'about' | 'contact';
  onNavigatePage?: (page: 'home' | 'about' | 'contact', targetHash?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCurrency,
  onCurrencyChange,
  onOpenSearch,
  onOpenConsultation,
  onOpenPrivateCollection,
  currentPage = 'home',
  onNavigatePage,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; href: string; page?: 'home' | 'about' | 'contact'; isPrivate?: boolean; badge?: string }[] = [
    { label: 'PROPERTIES', href: '#properties', page: 'home' },
    { label: 'DESTINATIONS', href: '#destinations', page: 'home' },
    { label: 'AGENTS', href: '#agents', page: 'home' },
    { label: 'JOURNAL', href: '#journal', page: 'home' },
    { label: 'PRIVATE COLLECTION', href: '#private-collection', isPrivate: true },
    { label: 'ABOUT', href: '#about', page: 'about' },
    { label: 'CONTACT', href: '#contact', page: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent, item: (typeof navLinks)[0]) => {
    if (item.isPrivate) {
      e.preventDefault();
      onOpenPrivateCollection();
      return;
    }

    if (item.page === 'about') {
      e.preventDefault();
      onNavigatePage?.('about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (item.page === 'contact') {
      e.preventDefault();
      onNavigatePage?.('contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (onNavigatePage) {
      e.preventDefault();
      onNavigatePage('home', item.href);
    }
  };

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0b0c0e]/95 backdrop-blur-md border-b border-[#22252e] py-3.5 shadow-2xl'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          id="brand-logo-link"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onNavigatePage?.('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex flex-col items-start group focus:outline-none lg:-ml-3"
        >
          <span className="font-display-luxury text-xl md:text-2xl tracking-[0.28em] font-medium text-white group-hover:text-[#d8b88a] transition-colors">
            AURELIA
          </span>
          <span className="text-[9px] tracking-[0.45em] text-[#a3a8b5] font-light uppercase group-hover:text-white transition-colors">
            ESTATES
          </span>
        </a>

        {/* Desktop Nav Items */}
        <nav id="desktop-nav-menu" className="hidden lg:flex items-center space-x-8">
          {navLinks.map((item) => {
            const isActive =
              (item.page === 'about' && currentPage === 'about') ||
              (item.page === 'contact' && currentPage === 'contact') ||
              (item.page === 'home' && currentPage === 'home' && false);

            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={`relative text-[11.5px] font-medium tracking-[0.2em] transition-colors py-1 flex items-center gap-1.5 ${
                  isActive
                    ? 'text-[#d8b88a] border-b border-[#d8b88a]'
                    : 'text-[#c7cbd4] hover:text-[#d8b88a]'
                }`}
              >
                {item.label}
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[8.5px] font-semibold tracking-wider bg-[#d8b88a]/15 text-[#d8b88a] rounded border border-[#d8b88a]/30">
                    {item.badge}
                  </span>
                )}
                {item.isPrivate && (
                  <Shield className="w-3 h-3 text-[#d8b88a] opacity-80" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Actions: Currency Selector, Search, Consultation CTA */}
        <div className="flex items-center space-x-4 md:space-x-6">
          {/* Currency Toggle */}
          <div className="relative">
            <button
              id="currency-selector-btn"
              onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
              className="flex items-center space-x-1.5 text-xs tracking-wider text-[#b8bcc7] hover:text-white transition-colors py-1.5 px-2 rounded border border-transparent hover:border-[#2f333d]"
              aria-label="Select currency"
            >
              <Globe className="w-3.5 h-3.5 text-[#d8b88a]" />
              <span className="font-medium">{currentCurrency}</span>
            </button>

            {showCurrencyDropdown && (
              <div className="absolute right-0 mt-2 w-32 bg-[#14161c] border border-[#272b36] rounded-md shadow-2xl py-1.5 z-50 backdrop-blur-xl">
                {(Object.keys(CURRENCY_RATES) as Currency[]).map((cur) => (
                  <button
                    key={cur}
                    onClick={() => {
                      onCurrencyChange(cur);
                      setShowCurrencyDropdown(false);
                    }}
                    className={`w-full text-left px-3.5 py-1.5 text-xs flex items-center justify-between hover:bg-[#20232c] transition-colors ${
                      currentCurrency === cur ? 'text-[#d8b88a] font-semibold' : 'text-[#a6abb7]'
                    }`}
                  >
                    <span>{cur}</span>
                    <span className="text-[10px] opacity-70">
                      {CURRENCY_RATES[cur].symbol}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Trigger */}
          <button
            id="nav-search-button"
            onClick={onOpenSearch}
            className="text-[#c7cbd4] hover:text-[#d8b88a] transition-colors p-1.5 rounded-full hover:bg-white/5"
            aria-label="Search properties and advisors"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Private Consultation CTA Button */}
          <button
            id="nav-consultation-btn"
            onClick={onOpenConsultation}
            className="hidden sm:flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-wider text-[#0d0e12] bg-[#c5a880] hover:bg-[#d8b88a] active:scale-[0.98] transition-all rounded shadow-sm"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>PRIVATE VIEWING</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white p-1 hover:text-[#d8b88a] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div id="mobile-nav-drawer" className="lg:hidden bg-[#0d0e12] border-b border-[#242833] px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleNavClick(e, item);
                }}
                className="text-sm font-medium tracking-[0.18em] text-[#d1d5db] hover:text-[#d8b88a] py-2 border-b border-[#1b1e26] flex items-center justify-between"
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 text-[9px] bg-[#d8b88a]/20 text-[#d8b88a] rounded">
                    {item.badge}
                  </span>
                )}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-2.5 text-xs font-medium tracking-wider text-[#0d0e12] bg-[#c5a880] hover:bg-[#d8b88a] rounded transition-all text-center"
            >
              BOOK PRIVATE VIEWING
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
