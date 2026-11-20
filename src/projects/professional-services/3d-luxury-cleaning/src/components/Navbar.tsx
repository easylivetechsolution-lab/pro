import React, { useEffect, useState } from 'react';

interface NavbarProps {
  activeView: 'landing' | 'crm';
  onNavigateView: (view: 'landing' | 'crm', sectionId?: string) => void;
  onOpenQuote: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeView, onNavigateView, onOpenQuote }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSectionLink = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    onNavigateView('landing', sectionId);
  };

  const overVideo = activeView === 'landing' && !scrolled;

  return (
    <header
      className={`${
        activeView === 'landing' ? 'fixed top-0 inset-x-0' : 'sticky top-0'
      } z-40 w-full transition-colors duration-200 ${
        overVideo
          ? 'bg-gradient-to-b from-slate-950/65 via-slate-950/25 to-transparent'
          : 'bg-white border-b border-sky-100/90 shadow-xs'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single-element Brand Wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            onNavigateView('landing', 'top');
          }}
          className={`inline-flex items-center gap-2.5 font-display text-xl font-bold tracking-tight whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded transition-colors ${
            overVideo ? 'text-white drop-shadow-[0_1px_6px_rgba(2,6,23,0.75)]' : 'text-slate-900'
          }`}
        >
          <img src="/assets/aistudio/aetherlogo.png" alt="" aria-hidden="true" className="h-12 w-[4.5rem] object-contain" />
          AetherClean
        </a>

        {/* Zone 2: Concise single-line text links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium"
        >
          <a
            href="#top"
            onClick={(e) => handleSectionLink(e, 'top')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded ${
              overVideo
                ? 'text-white/95 drop-shadow-[0_1px_4px_rgba(2,6,23,0.75)] hover:text-sky-200'
                : 'text-slate-700 hover:text-sky-700'
            }`}
          >
            Header
          </a>
          <a
            href="#solutions"
            onClick={(e) => handleSectionLink(e, 'solutions')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded ${
              overVideo
                ? 'text-white/95 drop-shadow-[0_1px_4px_rgba(2,6,23,0.75)] hover:text-sky-200'
                : 'text-slate-700 hover:text-sky-700'
            }`}
          >
            Our Services
          </a>
          <a
            href="#process"
            onClick={(e) => handleSectionLink(e, 'process')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded ${
              overVideo
                ? 'text-white/95 drop-shadow-[0_1px_4px_rgba(2,6,23,0.75)] hover:text-sky-200'
                : 'text-slate-700 hover:text-sky-700'
            }`}
          >
            How It Works
          </a>
          <button
            type="button"
            onClick={() => onNavigateView(activeView === 'crm' ? 'landing' : 'crm')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded ${
              activeView === 'crm'
                ? 'text-sky-700 font-semibold underline decoration-sky-600 decoration-2 underline-offset-4'
                : overVideo
                  ? 'text-white/95 hover:text-sky-200'
                  : 'text-slate-600 hover:text-sky-700'
            }`}
          >
            {activeView === 'crm' ? 'Back to Site' : 'CRM'}
          </button>
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onNavigateView(activeView === 'crm' ? 'landing' : 'crm')}
            className={`md:hidden px-3 py-2 text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer ${
              overVideo ? 'text-white hover:text-sky-200' : 'text-slate-700 hover:text-sky-700'
            }`}
          >
            {activeView === 'crm' ? 'Site' : 'CRM'}
          </button>
          <button
            type="button"
            onClick={onOpenQuote}
            className="px-4 py-2 text-sm font-semibold text-white bg-sky-600 rounded-lg hover:bg-sky-500 active:scale-[0.99] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
          >
            Instant Quote
          </button>
        </div>
      </div>
    </header>
  );
};
