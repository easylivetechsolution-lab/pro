/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { OurProcess } from './components/OurProcess';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { VideoModal } from './components/VideoModal';
import { ServiceDetailModal, ProjectDetailModal } from './components/ServiceDetailModal';
import { SERVICES_DATA, GALLERY_PROJECTS } from './data/remodelingData';
import type { ServiceItem, GalleryProject } from './types';

// Standalone Pages
import { ServicesPage } from './pages/ServicesPage';
import { GalleryPage } from './pages/GalleryPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

export type AppRoute = 'home' | 'services' | 'gallery' | 'about' | 'contact';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>('home');
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteInitialServiceId, setQuoteInitialServiceId] = useState<string | undefined>(undefined);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<GalleryProject | null>(null);

  // Sync with URL hash for deep linking and history support
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'services') setCurrentRoute('services');
      else if (hash === 'gallery') setCurrentRoute('gallery');
      else if (hash === 'about') setCurrentRoute('about');
      else if (hash === 'contact') setCurrentRoute('contact');
      else setCurrentRoute('home');
    };

    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  const handleNavigate = (route: AppRoute) => {
    setCurrentRoute(route);
    window.location.hash = route === 'home' ? '' : route;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuote = (serviceId?: string) => {
    setQuoteInitialServiceId(serviceId);
    setQuoteModalOpen(true);
  };

  const handleSelectServiceById = (serviceId: string) => {
    const s = SERVICES_DATA.find((item) => item.id === serviceId);
    if (s) {
      setSelectedService(s);
    } else {
      handleOpenQuote(serviceId);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B131E] text-slate-100 flex flex-col selection:bg-[#C07848] selection:text-white">
      {/* Top Fixed Header with Firmans Monogram Branding */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        onOpenQuote={() => handleOpenQuote()}
      />

      {/* Main Page Content */}
      <main className="flex-grow">
        {currentRoute === 'home' && (
          <>
            {/* 1. Hero Section */}
            <Hero
              onOpenQuote={() => handleOpenQuote()}
              onOpenVideo={() => setVideoModalOpen(true)}
            />

            {/* 2. Services Section */}
            <ServicesSection
              onSelectService={(srv) => setSelectedService(srv)}
              onNavigate={handleNavigate}
            />

            {/* 3. Why Choose Us Section with Clean Interactive Hotspots */}
            <WhyChooseUs
              onOpenQuote={() => handleOpenQuote()}
            />

            {/* 4. Architectural Process Blueprint */}
            <OurProcess
              onOpenQuote={() => handleOpenQuote()}
            />

            {/* 5. Documented Transformations (Before & After Slider) */}
            <GallerySection
              onSelectProject={(proj) => setSelectedProject(proj)}
              onNavigate={handleNavigate}
            />

            {/* 6. Testimonials Section */}
            <TestimonialsSection />

            {/* 7. Ready to Transform Your Home? Pre-Footer Banner */}
            <CtaBanner
              onOpenQuote={() => handleOpenQuote()}
            />
          </>
        )}

        {currentRoute === 'services' && (
          <ServicesPage
            onOpenQuote={handleOpenQuote}
            onSelectService={(srv) => setSelectedService(srv)}
          />
        )}

        {currentRoute === 'gallery' && (
          <GalleryPage
            onSelectProject={(proj) => setSelectedProject(proj)}
            onOpenQuote={() => handleOpenQuote()}
          />
        )}

        {currentRoute === 'about' && (
          <AboutPage
            onOpenQuote={() => handleOpenQuote()}
          />
        )}

        {currentRoute === 'contact' && (
          <ContactPage />
        )}
      </main>

      {/* Persistent Global Footer */}
      <Footer
        onSelectService={handleSelectServiceById}
        onOpenQuote={() => handleOpenQuote()}
        onNavigate={handleNavigate}
      />

      {/* Interactive Modals */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialServiceId={quoteInitialServiceId}
      />

      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        onOpenQuote={() => handleOpenQuote()}
      />

      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onOpenQuote={(srvId) => handleOpenQuote(srvId)}
      />

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenQuote={() => handleOpenQuote()}
      />
    </div>
  );
}
