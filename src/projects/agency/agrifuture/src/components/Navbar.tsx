import React, { useState, useEffect } from 'react';
import { Search, CloudSun, Compass, Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string, sectionId?: string) => void;
  onOpenPartnerModal: () => void;
  onOpenSearchModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenPartnerModal,
  onOpenSearchModal,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', page: 'home', sectionId: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Our Farms', page: 'home', sectionId: 'farms' },
    { label: 'Products', page: 'products' },
    { label: 'Technology', page: 'technology' },
    { label: 'Insights', page: 'insights' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (item: { page: string; sectionId?: string }) => {
    setMobileMenuOpen(false);
    onNavigate(item.page, item.sectionId);
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#041009]/95 backdrop-blur-md border-b border-[#c39953]/20 py-2.5 shadow-2xl shadow-black/50'
          : 'bg-gradient-to-b from-[#041009]/90 via-[#041009]/50 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6 sm:gap-8">
        {/* Brand Text - No Logo */}
        <button
          id="brand-name-button"
          onClick={() => onNavigate('home', 'home')}
          className="focus:outline-none cursor-pointer text-left group mr-4 xl:mr-8 shrink-0"
          title="AgriFuture"
        >
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-white font-serif group-hover:text-[#dfc599] transition-colors">
            Agri<span className="text-[#34d399] font-medium">Future</span>
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav id="desktop-nav" className="hidden lg:flex items-center gap-1.5 xl:gap-3 ml-2">
          {navItems.map((item) => {
            const isActive =
              currentPage === item.page &&
              (!item.sectionId || item.page !== 'home' || item.sectionId === 'home');

            return (
              <button
                key={item.label}
                id={`nav-link-${item.page}-${item.sectionId || 'main'}`}
                onClick={() => handleNavClick(item)}
                className={`px-3.5 py-1.5 text-xs xl:text-sm font-medium transition-all duration-200 rounded-full cursor-pointer ${
                  isActive
                    ? 'text-[#fef08a] bg-[#113524] border border-[#dfc599]/40 shadow-inner'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls & Live Coordinates */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Subtle Live Weather pill */}
          <div
            id="header-weather-pill"
            className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d281a]/80 border border-emerald-500/20 text-[11px] text-emerald-300 select-none"
          >
            <CloudSun className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold text-white">24°C</span>
            <span className="text-emerald-400/80">Partly Cloudy</span>
            <span className="text-gray-500">|</span>
            <span className="text-gray-400 font-mono text-[10px] flex items-center gap-1">
              <Compass className="w-3 h-3 text-emerald-400" />
              12.9716° N, 77.5946° E
            </span>
          </div>

          {/* Search Button */}
          <button
            id="nav-search-button"
            onClick={onOpenSearchModal}
            className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            title="Search crops, estates & batch telemetry"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Partner With Us Button */}
          <button
            id="nav-partner-button"
            onClick={onOpenPartnerModal}
            className="px-4 py-2 text-xs font-semibold tracking-wide text-[#041009] bg-gradient-to-r from-[#d8b06d] to-[#c39953] hover:from-[#e3c185] hover:to-[#cca35c] rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#c39953]/20 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Partner With Us</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            id="mobile-search-button"
            onClick={onOpenSearchModal}
            className="p-2 text-gray-300 hover:text-white"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-300 hover:text-white focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-nav-drawer" className="lg:hidden bg-[#041009]/98 border-b border-[#c39953]/30 px-6 py-6 space-y-4 shadow-2xl">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className={`text-left py-2.5 text-base border-b border-white/5 transition-colors cursor-pointer ${
                  currentPage === item.page ? 'text-[#dfc599] font-bold' : 'text-gray-200 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xs text-emerald-300 py-1">
              <CloudSun className="w-4 h-4 text-amber-400" />
              <span>24°C Partly Cloudy • 12.9716° N, 77.5946° E</span>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPartnerModal();
              }}
              className="w-full py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-[#041009] bg-gradient-to-r from-[#d8b06d] to-[#c39953] rounded-full cursor-pointer"
            >
              Partner With Us
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
