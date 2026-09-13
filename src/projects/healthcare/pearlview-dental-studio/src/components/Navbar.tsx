import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X, Smile, PhoneCall } from 'lucide-react';
import { CLINIC_INFO } from '../data/dentalData';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenBooking: (serviceId?: string, doctorId?: string) => void;
  onOpenQuiz: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPage, 
  onNavigate, 
  onOpenBooking, 
  onOpenQuiz 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', page: 'home' },
    { name: 'Services', page: 'services' },
    { name: 'Fees & Insurance', page: 'fees-insurance' },
    { name: 'Technology', page: 'technology' },
    { name: 'Patient Stories', page: 'patient-stories' },
    { name: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-navbar"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-zinc-200/80 py-3'
          : 'bg-[#FAF9F6] border-b border-zinc-200/50 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 group focus:outline-hidden text-left cursor-pointer"
        >
          <div className="relative w-10 h-10 rounded-xl bg-linear-to-br from-[#0E282E] to-[#1E434B] flex items-center justify-center shadow-md shadow-[#0E282E]/10 group-hover:scale-105 transition-transform duration-300">
            {/* Custom Luxury Tooth / Pearl Geometric Icon */}
            <svg
              className="w-6 h-6 text-[#EAD8B7] transition-transform duration-500 group-hover:rotate-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2C9.5 2 7.5 3.5 7 5.5C6.5 7.5 5 9 3.5 11.5C2 14 2.5 17 4.5 19C6.5 21 8.5 22 10 22C11.5 22 11.5 20.5 12 20.5C12.5 20.5 12.5 22 14 22C15.5 22 17.5 21 19.5 19C21.5 17 22 14 20.5 11.5C19 9 17.5 7.5 17 5.5C16.5 3.5 14.5 2 12 2Z" />
              <path d="M12 6.5C12.8 6.5 13.5 7.2 13.5 8C13.5 8.8 12.8 9.5 12 9.5C11.2 9.5 10.5 8.8 10.5 8C10.5 7.2 11.2 6.5 12 6.5Z" fill="currentColor" stroke="none" />
            </svg>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#D4AF37] rounded-full border-2 border-white" />
          </div>

          <div className="flex flex-col">
            <span className="font-serif text-xl tracking-tight font-semibold text-[#0E282E] flex items-center gap-1.5">
              PearlView <span className="font-sans font-light text-sm tracking-widest text-[#4A6468] uppercase"></span>
            </span>
            <span className="text-[10px] text-zinc-500 tracking-wider uppercase font-medium">
             Dental
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-[13.5px] font-medium text-zinc-700">
          {navLinks.map((link) => {
            const isActive = currentPage === link.page;
            return (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.page)}
                className={`relative py-1 transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? 'text-[#0E282E] font-bold after:w-full'
                    : 'text-zinc-600 hover:text-[#0E282E]'
                } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#0E282E] hover:after:w-full after:transition-all after:duration-300 ${
                  isActive ? 'after:w-full' : 'after:w-0'
                }`}
              >
                {link.name}
              </button>
            );
          })}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            id="nav-quiz-btn"
            onClick={onOpenQuiz}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#0E282E] bg-white border border-zinc-200/90 rounded-full hover:bg-zinc-50 hover:border-zinc-300 transition-all shadow-xs cursor-pointer"
            title="Interactive smile quiz"
          >
            <Smile className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Virtual Smile Assessment</span>
          </button>

          <button
            id="nav-book-btn"
            onClick={() => onOpenBooking()}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#0E282E] hover:bg-[#153B44] active:scale-[0.98] rounded-full shadow-md shadow-[#0E282E]/15 transition-all duration-200 cursor-pointer"
          >
            <span>Book Appointment</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            id="mobile-call-btn"
            href={`tel:${CLINIC_INFO.phone}`}
            className="p-2 text-zinc-700 bg-white border border-zinc-200 rounded-lg hover:bg-zinc-50"
            aria-label="Call clinic"
          >
            <PhoneCall className="w-4 h-4 text-[#0E282E]" />
          </a>
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-800 hover:text-black rounded-lg focus:outline-hidden cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-zinc-200 px-6 py-5 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-3.5">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.page)}
                className={`text-left text-base font-medium py-1.5 border-b border-zinc-100 cursor-pointer ${
                  currentPage === link.page
                    ? 'text-[#0E282E] font-bold'
                    : 'text-zinc-800 hover:text-[#0E282E]'
                }`}
              >
                {link.name}
              </button>
            ))}
            <div className="pt-3 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuiz();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-[#0E282E] bg-zinc-100 hover:bg-zinc-200 rounded-xl cursor-pointer"
              >
                <Smile className="w-4 h-4 text-[#D4AF37]" />
                <span>Virtual Smile Assessment</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold tracking-wider uppercase text-white bg-[#0E282E] rounded-xl shadow-md cursor-pointer"
              >
                <span>Book Appointment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
