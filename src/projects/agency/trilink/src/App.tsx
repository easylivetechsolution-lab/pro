import React, { useEffect, useState } from 'react';
import './index.css';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ModularSolutions } from './components/ModularSolutions';
import { SessionsBanner } from './components/SessionsBanner';
import { StatsSection } from './components/StatsSection';
import { BusinessSizes } from './components/BusinessSizes';
import { DevelopersSection } from './components/DevelopersSection';
import { WhatsHappening } from './components/WhatsHappening';
import { BookOfTheWeek } from './components/BookOfTheWeek';
import { PricingPage } from './components/PricingPage';
import { Footer } from './components/Footer';
import { AuthAndSalesModals } from './components/AuthAndSalesModals';
import { SalesChatWidget } from './components/SalesChatWidget';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'pricing'>(() => {
    return window.location.hash.toLowerCase().includes('pricing') ? 'pricing' : 'home';
  });
  const [signInOpen, setSignInOpen] = useState(false);
  const [contactSalesOpen, setContactSalesOpen] = useState(false);

  // Sync route with URL hash for easy sharing and navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('pricing')) {
        setCurrentPage('pricing');
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: 'home' | 'pricing') => {
    setCurrentPage(page);
    if (page === 'pricing') {
      window.location.hash = '#pricing';
    } else {
      if (window.location.hash.includes('pricing')) {
        history.pushState(null, '', window.location.pathname);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#00E599] selection:text-slate-950 flex flex-col">
      {/* Top Navigation */}
      <div className="bg-white">
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onOpenSignIn={() => setSignInOpen(true)}
          onOpenContactSales={() => setContactSalesOpen(true)}
        />
      </div>

      {/* Main Page Content */}
      <main id="main-content" className="flex-1">
        {currentPage === 'pricing' ? (
          /* Dedicated Separate Pricing Page */
          <PricingPage
            onOpenSignIn={() => setSignInOpen(true)}
            onOpenContactSales={() => setContactSalesOpen(true)}
            onNavigateHome={() => handleNavigate('home')}
          />
        ) : (
          /* Homepage Sections (Pricing is separated onto its dedicated page) */
          <>
            {/* 1. Hero Section with Live GDP ticker, animated canvas mesh, Customer Logos & Interactive Checkout Preview */}
            <Hero
              onGetStarted={() => {
                const el = document.getElementById('modular-solutions');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onGoogleSignIn={() => setSignInOpen(true)}
            />

            {/* 2. Flexible Solutions Bento Grid with interactive components */}
            <ModularSolutions />

            {/* 3. Trilink Sessions 2026 Keynote Banner */}
            <SessionsBanner />

            {/* 4. Global Commerce Stats Section with Time-of-Day theme switcher and live node canvas */}
            <StatsSection />

            {/* 5. Businesses of all sizes: Enterprise, Startups, and Platforms */}
            <BusinessSizes />

            {/* 6. Developer Ecosystem: Integrations, Scale Metrics, and Code Playground */}
            <DevelopersSection />

            {/* 7. What's Happening Carousel: Annual Letter, Reports & Announcements */}
            <WhatsHappening />

            {/* 8. Book of the Week & Trilink Press */}
            <BookOfTheWeek />
          </>
        )}
      </main>

      {/* Footer with Comprehensive Sitemap */}
      <Footer
        onOpenSignIn={() => setSignInOpen(true)}
        onOpenContactSales={() => setContactSalesOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Trilink Floating Sales Reps Speech Bubble & Interactive Chat */}
      <SalesChatWidget onOpenContactSales={() => setContactSalesOpen(true)} />

      {/* Modal Dialogs for Sign In and Contact Sales */}
      <AuthAndSalesModals
        signInOpen={signInOpen}
        contactSalesOpen={contactSalesOpen}
        onCloseSignIn={() => setSignInOpen(false)}
        onCloseContactSales={() => setContactSalesOpen(false)}
      />
    </div>
  );
}
