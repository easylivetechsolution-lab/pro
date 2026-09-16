import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  ChevronRight,
  ShieldCheck,
  Building2
} from 'lucide-react';
import type { CartItem } from '../types';

interface NavbarProps {
  cart: CartItem[];
  wishlist: string[];
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenB2B: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cart,
  wishlist,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenB2B,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'Handcrafted', path: '/handcrafted' },
    { label: 'B2B Wholesale', path: '/b2b' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleLinkClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const isLinkActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0c10]/95 backdrop-blur-md py-3 border-b border-white/10 shadow-2xl'
          : 'bg-gradient-to-b from-black/75 via-black/35 to-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-3 lg:gap-6">
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleLinkClick('/')}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none shrink-0"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center">
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
          
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-white font-sans leading-none">
              Mark<span className="text-[#e29d52]">Well</span>
            </span>
            <span className="text-[8px] sm:text-[9px] tracking-[0.26em] uppercase text-zinc-400 font-semibold mt-0.5">
              Furniture Solutions
            </span>
          </div>
        </div>

        {/* Center Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => {
            const active = isLinkActive(link.path);
            return (
              <button
                key={link.path}
                id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => handleLinkClick(link.path)}
                className={`relative py-1 text-xs lg:text-[13px] xl:text-sm tracking-normal transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  active
                    ? 'text-[#f5be7e] font-semibold'
                    : 'text-zinc-300 hover:text-white font-normal'
                }`}
              >
                <span>{link.label}</span>
                {active && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#e29d52] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Search Pill + Profile + Wishlist + Cart */}
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 shrink-0">
          
          {/* Search Capsule Input matching screenshot */}
          <div 
            onClick={onOpenSearch}
            className="hidden md:flex items-center justify-between w-48 sm:w-56 lg:w-64 bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 hover:border-[#e29d52]/50 rounded-full px-4 py-2 text-xs text-zinc-400 cursor-pointer transition-all duration-200 shadow-inner group"
          >
            <span className="truncate text-zinc-400 select-none text-[12px]">Search furniture, office desks...</span>
            <Search className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors ml-2 shrink-0" />
          </div>

          {/* Search Trigger for Mobile */}
          <button
            id="mobile-search-trigger"
            onClick={onOpenSearch}
            className="md:hidden p-1.5 rounded-full text-zinc-300 hover:text-white transition-colors"
            title="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Profile / Account Icon matching screenshot */}
          <button
            id="user-account-btn"
            onClick={onOpenB2B}
            className="p-1 rounded-full text-zinc-300 hover:text-white transition-colors cursor-pointer"
            title="User Account"
          >
            <User className="w-5 h-5 stroke-[1.75]" />
          </button>

          {/* Wishlist Heart Icon matching screenshot */}
          <button
            id="wishlist-btn"
            onClick={onOpenWishlist}
            className="relative p-1 rounded-full text-zinc-300 hover:text-white transition-colors cursor-pointer"
            title="Wishlist"
          >
            <Heart className="w-5 h-5 stroke-[1.75]" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#e29d52] text-black text-[9px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Cart Icon with Circular Badge matching screenshot */}
          <button
            id="cart-drawer-trigger"
            onClick={onOpenCart}
            className="relative p-1 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            title="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
            <span className="absolute -top-1.5 -right-2 min-w-[18px] h-[18px] px-1 bg-[#f3ba77] text-black text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-md">
              {totalCartCount}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-1 text-zinc-300 hover:text-white transition-colors ml-1"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0c10]/98 border-b border-white/10 px-6 py-6 transition-all duration-300 shadow-2xl">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => {
              const active = isLinkActive(link.path);
              return (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`flex items-center justify-between text-left py-2.5 px-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    active
                      ? 'text-[#f5be7e] bg-[#e29d52]/10 font-semibold'
                      : 'text-zinc-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-zinc-500" />
                </button>
              );
            })}

            <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/b2b');
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-[#e29d52] to-[#c98239] text-black font-bold text-sm shadow-lg shadow-[#e29d52]/20 cursor-pointer"
              >
                <Building2 className="w-4 h-4" />
                B2B & Wholesale Trade Portal
              </button>
              <div className="flex items-center justify-center gap-2 text-xs text-zinc-400">
                <ShieldCheck className="w-4 h-4 text-[#e29d52]" />
                <span>Commercial Warranty & Worldwide Freight</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
