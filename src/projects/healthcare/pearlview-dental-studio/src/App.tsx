import React, { useState, useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturesBanner } from './components/FeaturesBanner';
import { ServicesSection } from './components/ServicesSection';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { TeamSection } from './components/TeamSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ReviewsSection } from './components/ReviewsSection';
import { FeesInsuranceSection } from './components/FeesInsuranceSection';
import { JourneySection } from './components/JourneySection';
import { TechnologySection } from './components/TechnologySection';
import { FaqSection } from './components/FaqSection';
import { LocationSection } from './components/LocationSection';
import { CallToAction } from './components/CallToAction';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { SmileQuizModal } from './components/SmileQuizModal';

// Dedicated Pages
import { FeesInsurancePage } from './pages/FeesInsurancePage';
import { TechnologyPage } from './pages/TechnologyPage';
import { ServicesPage } from './pages/ServicesPage';
import { PatientStoriesPage } from './pages/PatientStoriesPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>();
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | undefined>();

  // Synchronize hash with page state for deep linking
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (['fees-insurance', 'technology', 'services', 'patient-stories', 'contact', 'home'].includes(hash)) {
        setCurrentPage(hash);
      }
    };

    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (serviceId?: string, doctorId?: string) => {
    setSelectedServiceId(serviceId);
    setSelectedDoctorId(doctorId);
    setIsBookingOpen(true);
  };

  const handleSelectService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setIsBookingOpen(true);
  };

  const handleBookWithDoctor = (doctorId: string) => {
    setSelectedDoctorId(doctorId);
    setIsBookingOpen(true);
  };

  const handleBookRecommended = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#172026] selection:bg-[#0E282E] selection:text-[#EAD8B7]">
      {/* 1. Top Announcement & Clinic Details Bar */}
      <TopBar onNavigate={handleNavigate} />

      {/* 2. Main Sticky Frosted Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenBooking}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      {/* Dynamic Page Rendering */}
      <main className="flex-1">
        {currentPage === 'fees-insurance' && (
          <FeesInsurancePage
            onOpenBooking={handleOpenBooking}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'technology' && (
          <TechnologyPage
            onOpenBooking={() => handleOpenBooking()}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            onOpenBooking={handleOpenBooking}
            onOpenQuiz={() => setIsQuizOpen(true)}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'patient-stories' && (
          <PatientStoriesPage
            onOpenBooking={() => handleOpenBooking()}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            onOpenBooking={() => handleOpenBooking()}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'home' && (
          <>
            {/* Hero Section with Opulent Headline, Proof & Visual Accents */}
            <Hero
              onOpenBooking={() => handleOpenBooking()}
              onOpenQuiz={() => setIsQuizOpen(true)}
            />

            {/* Four Core Pillars Strip */}
            <FeaturesBanner />

            {/* Comprehensive Dental Care with 4s Auto-Flip Cards & View All Link */}
            <ServicesSection 
              onSelectService={handleSelectService} 
              onNavigate={handleNavigate} 
            />

            {/* Real Patient Transformations with Interactive Split Slider */}
            <BeforeAfterSection onOpenBooking={() => handleOpenBooking()} />

            {/* Experienced, Trusted, Caring Team with Flippable Bios */}
            <TeamSection onBookWithDoctor={handleBookWithDoctor} />

            {/* Modern Clinic Architecture & Concierge Amenities */}
            <WhyChooseUs />

            {/* Verified Patient Testimonials with Navigation to Full Stories */}
            <ReviewsSection onNavigate={handleNavigate} />

            {/* Fees & Insurance with 0% APR Financing Calculator */}
            <FeesInsuranceSection 
              onOpenBooking={() => handleOpenBooking()} 
              onNavigate={handleNavigate} 
            />

            {/* Simple 3-Step First Visit Journey */}
            <JourneySection onOpenBooking={() => handleOpenBooking()} />

            {/* Advanced Digital Technology Showcase with Full Page Link */}
            <TechnologySection 
              onOpenBooking={() => handleOpenBooking()} 
              onNavigate={handleNavigate} 
            />

            {/* Frequently Asked Questions Accordions */}
            <FaqSection />

            {/* Location, Austin Studio Map & Office Hours */}
            <LocationSection />

            {/* Dark Luxury Midnight Banner */}
            <CallToAction onOpenBooking={() => handleOpenBooking()} />
          </>
        )}
      </main>

      {/* Luxury Footer with Routing Links */}
      <Footer onNavigate={handleNavigate} />

      {/* Interactive Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialServiceId={selectedServiceId}
        initialDoctorId={selectedDoctorId}
      />

      <SmileQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onBookRecommended={handleBookRecommended}
      />
    </div>
  );
}
