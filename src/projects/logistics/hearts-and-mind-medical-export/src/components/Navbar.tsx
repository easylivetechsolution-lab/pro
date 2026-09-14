import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  ShoppingBag, 
  UserCheck, 
  Menu, 
  X, 
  Phone, 
  Mail, 
  Globe2, 
  ChevronRight,
  ExternalLink,
  Lock,
  ArrowRight
} from 'lucide-react';
import logoImg from '../assets/images/heartandmind image.png';
import { LIVE_TRADE_UPDATES } from '../data/mockData';

interface NavbarProps {
  currentPage?: string;
  rfqCount: number;
  onOpenRfq: () => void;
  onOpenPortal: (mode: 'buyer' | 'manufacturer') => void;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage = 'home',
  rfqCount,
  onOpenRfq,
  onOpenPortal,
  onNavigate
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(currentPage);
  const [tickerIndex, setTickerIndex] = useState(0);

  // Sync activeSection with external currentPage
  useEffect(() => {
    setActiveSection(currentPage);
  }, [currentPage]);

  // Monitor scroll for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Automatic ticker rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % LIVE_TRADE_UPDATES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'products', label: 'Products / Supplies' },
    { id: 'shipping', label: 'Trade & Shipping (Incoterms)' },
    { id: 'contact', label: 'Contact / Request a Quote' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Bar - High Quality Corporate Presence */}
      <div className="bg-[#0b1b33] text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          {/* Left: Mission / Animated Ticker */}
          <div className="flex items-center gap-3 overflow-hidden text-center md:text-left">
            <span className="font-semibold text-cyan-400 shrink-0">
              Global Healthcare. Stronger Together.
            </span>
            <span className="hidden lg:inline-block text-slate-600">|</span>
            <div className="hidden lg:flex items-center overflow-hidden h-4">
              <AnimatePresence mode="wait">
                <motion.span
                  key={tickerIndex}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-slate-300 truncate max-w-md"
                >
                  {LIVE_TRADE_UPDATES[tickerIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Contact & Support */}
          <div className="flex items-center gap-4 text-slate-300">
            <div className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('contact')}>
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>24/7 Support: <strong className="text-white font-medium">+1 (504) 555-0187</strong></span>
            </div>
            <span className="hidden sm:inline text-slate-600">|</span>
            <a 
              href="mailto:info@heartsmindmedicalexport.com" 
              className="hidden sm:flex items-center gap-1 hover:text-cyan-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>info@heartsmindmedicalexport.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav Bar with Animated Blur & Border */}
      <nav 
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-slate-200' 
            : 'bg-white py-4 shadow-sm border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo matching the brand */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Real Logo Image */}
            <div className="relative w-11 h-11 bg-white rounded-xl flex items-center justify-center shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform duration-300 overflow-hidden border border-slate-200">
              <img 
                src={logoImg} 
                alt="Hearts and Mind Medical Export LLC Logo" 
                className="w-full h-full object-contain p-1"
              />
            </div>

            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-[#0b1b33] leading-tight">
                HEARTS AND MIND
              </span>
              <span className="text-xs sm:text-sm font-bold tracking-wider text-[#0284c7] leading-none">
                MEDICAL EXPORT LLC
              </span>
              <span className="text-[9px] font-semibold tracking-widest text-slate-400 mt-0.5 uppercase hidden sm:block">
                Global Sourcing • Logistics • Healthcare Tomorrows
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3.5 py-2 text-sm font-medium transition-colors rounded-lg ${
                    isActive 
                      ? 'text-[#0284c7]' 
                      : 'text-slate-600 hover:text-[#0b1b33] hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#0284c7] rounded-full"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* RFQ Basket Quick Button */}
            <button
              id="rfq-basket-button"
              onClick={onOpenRfq}
              className="relative flex items-center gap-2 px-3 py-2 text-sm font-semibold text-[#0b1b33] bg-slate-100 hover:bg-slate-200 rounded-lg transition-all border border-slate-200"
              title="View Request For Quote Basket"
            >
              <ShoppingBag className="w-4 h-4 text-[#0284c7]" />
              <span className="hidden sm:inline">RFQ Basket</span>
              <motion.span 
                key={rfqCount}
                initial={{ scale: 0.6 }}
                animate={{ scale: 1 }}
                className={`flex items-center justify-center min-w-[20px] h-5 px-1 text-xs font-bold text-white rounded-full ${
                  rfqCount > 0 ? 'bg-amber-600' : 'bg-slate-500'
                }`}
              >
                {rfqCount}
              </motion.span>
            </button>

            {/* Client Portal Button (Matches Reference Image) */}
            <button
              id="client-portal-button"
              onClick={() => onOpenPortal('buyer')}
              className="flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#0b1b33] hover:bg-[#122849] rounded-lg shadow-sm transition-all group"
            >
              <Lock className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
              <span>Client Portal</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-lg overflow-hidden"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      activeSection === item.id
                        ? 'bg-sky-50 text-[#0284c7] font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}

                <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col gap-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenPortal('buyer');
                      }}
                      className="flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold rounded-lg bg-slate-100 text-slate-800"
                    >
                      <UserCheck className="w-4 h-4 text-[#0284c7]" />
                      Buyer Portal
                    </button>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenPortal('manufacturer');
                      }}
                      className="flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold rounded-lg bg-slate-100 text-slate-800"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      Manufacturer
                    </button>
                  </div>

                  <div className="p-3 bg-sky-50 rounded-lg text-xs text-slate-600 flex items-center justify-between">
                    <span>Priority Trade Desk:</span>
                    <a href="tel:+15045550187" className="font-bold text-[#0284c7]">
                      +1 (504) 555-0187
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};
