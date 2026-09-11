import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedProperties } from './components/FeaturedProperties';
import { PrivateCollection } from './components/PrivateCollection';
import { AgentCarousel } from './components/AgentCarousel';
import { GlobalDestinations } from './components/GlobalDestinations';
import { TheJournal } from './components/TheJournal';
import { InvestmentCalculator } from './components/InvestmentCalculator';
import { Footer } from './components/Footer';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import {
  PropertyDetailModal,
  AgentConsultationModal,
  PrivateCollectionModal,
  GlobalSearchModal,
  JournalArticleModal,
} from './components/Modals';
import {
  PROPERTIES_DATA,
  AGENTS_DATA,
  DESTINATIONS_DATA,
  JOURNAL_ARTICLES,
} from './data/estatesData';
import type { Property, Agent, Destination, JournalArticle, Currency } from './types';
import { MessageSquare, Phone, Volume2, VolumeX } from 'lucide-react';

export default function App() {
  const [currentCurrency, setCurrentCurrency] = useState<Currency>('USD');
  const [properties, setProperties] = useState<Property[]>(PROPERTIES_DATA);

  // Page routing state ('home' | 'about' | 'contact')
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'contact'>(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash === '#about') return 'about';
      if (window.location.hash === '#contact') return 'contact';
    }
    return 'home';
  });

  React.useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#about') {
        setCurrentPage('about');
        window.scrollTo(0, 0);
      } else if (hash === '#contact') {
        setCurrentPage('contact');
        window.scrollTo(0, 0);
      } else if (hash === '#home' || hash === '' || hash.startsWith('#prop') || hash.startsWith('#dest') || hash.startsWith('#agent') || hash.startsWith('#journ') || hash.startsWith('#private')) {
        setCurrentPage('home');
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavigatePage = (page: 'home' | 'about' | 'contact', targetHash?: string) => {
    setCurrentPage(page);
    if (page === 'about') {
      window.location.hash = '#about';
      window.scrollTo(0, 0);
    } else if (page === 'contact') {
      window.location.hash = '#contact';
      window.scrollTo(0, 0);
    } else {
      if (window.location.hash === '#about' || window.location.hash === '#contact') {
        window.location.hash = targetHash || '';
      }
      if (targetHash) {
        setTimeout(() => {
          const el = document.querySelector(targetHash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 120);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // Modals state
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedAgentForConsultation, setSelectedAgentForConsultation] = useState<Agent | null>(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isPrivateCollectionOpen, setIsPrivateCollectionOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);

  // Ambient sound atmosphere state (gentle Web Audio API ocean ambiance)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioContextRef = React.useRef<AudioContext | null>(null);
  const gainNodeRef = React.useRef<GainNode | null>(null);

  const toggleAmbiance = () => {
    if (isAudioPlaying) {
      if (gainNodeRef.current && audioContextRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioContextRef.current.currentTime, 0.5);
        setTimeout(() => {
          setIsAudioPlaying(false);
        }, 600);
      } else {
        setIsAudioPlaying(false);
      }
    } else {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        // Generate gentle filtered pink noise mimicking ocean tide waves
        const bufferSize = ctx.sampleRate * 4;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          data[i] = (b0 + b1 + b2) * 0.03;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320, ctx.currentTime);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 1.5);
        gainNodeRef.current = gain;

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start();

        setIsAudioPlaying(true);
      } catch (err) {
        console.warn('Audio ambiance not allowed before user interaction', err);
      }
    }
  };

  const handleSearchSubmit = (filters: { location: string; type: string; priceRange: string }) => {
    let filtered = [...PROPERTIES_DATA];

    if (filters.location !== 'Any location') {
      filtered = filtered.filter((p) => p.location.includes(filters.location.split(',')[0]));
    }

    if (filters.type !== 'Any type') {
      filtered = filtered.filter((p) => p.type === filters.type);
    }

    if (filters.priceRange === 'Under $10,000,000') {
      filtered = filtered.filter((p) => p.price < 10000000);
    } else if (filters.priceRange === '$10,000,000 - $20,000,000') {
      filtered = filtered.filter((p) => p.price >= 10000000 && p.price <= 20000000);
    } else if (filters.priceRange === '$20,000,000+') {
      filtered = filtered.filter((p) => p.price > 20000000);
    }

    setProperties(filtered);

    // Smooth scroll to properties
    const el = document.getElementById('properties');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectDestination = (_dest: Destination) => {
    const el = document.getElementById('properties');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const openConsultationForAgent = (agent: Agent | null) => {
    setSelectedAgentForConsultation(agent);
    setIsConsultationOpen(true);
  };

  const openViewingForProperty = (_property: Property, agent?: Agent) => {
    setSelectedProperty(null);
    if (agent) {
      setSelectedAgentForConsultation(agent);
    }
    setIsConsultationOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0b0c0e] text-[#e8e6e3] selection:bg-[#c5a880] selection:text-black">
      {/* Navigation */}
      <Navbar
        currentCurrency={currentCurrency}
        onCurrencyChange={setCurrentCurrency}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenConsultation={() => {
          setSelectedAgentForConsultation(null);
          setIsConsultationOpen(true);
        }}
        onOpenPrivateCollection={() => setIsPrivateCollectionOpen(true)}
        currentPage={currentPage}
        onNavigatePage={handleNavigatePage}
      />

      {/* Main Page and Dedicated Pages */}
      <main>
        {currentPage === 'home' && (
          <>
            {/* Hero Section matching screenshot with floating filter bar */}
            <Hero
              onSearchSubmit={handleSearchSubmit}
              onExploreClick={() => {
                const el = document.getElementById('properties');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onPrivateViewingClick={() => {
                setSelectedAgentForConsultation(null);
                setIsConsultationOpen(true);
              }}
              currentCurrency={currentCurrency}
            />

            {/* Featured Properties Section matching screenshot */}
            <FeaturedProperties
              properties={properties}
              currentCurrency={currentCurrency}
              onSelectProperty={(prop) => setSelectedProperty(prop)}
            />

            {/* Private Collection / Off-Market Homes Section matching screenshot */}
            <PrivateCollection
              onDiscoverClick={() => setIsPrivateCollectionOpen(true)}
            />

            {/* THE CORE REQUEST: Spinning Sliding Carousel of Company Agents & Contact Details */}
            <AgentCarousel
              agents={AGENTS_DATA}
              onSelectAgent={openConsultationForAgent}
            />

            {/* Global Destinations matching screenshot */}
            <GlobalDestinations
              destinations={DESTINATIONS_DATA}
              onSelectDestination={handleSelectDestination}
            />

            {/* Portfolio & Acquisition Investment Calculator */}
            <InvestmentCalculator
              properties={PROPERTIES_DATA}
              currentCurrency={currentCurrency}
              onOpenConsultation={() => {
                setSelectedAgentForConsultation(null);
                setIsConsultationOpen(true);
              }}
            />

            {/* Market Insights / The Journal Section matching screenshot */}
            <TheJournal
              articles={JOURNAL_ARTICLES}
              onSelectArticle={(art) => setSelectedArticle(art)}
            />
          </>
        )}

        {currentPage === 'about' && (
          <AboutPage
            onNavigateHome={() => handleNavigatePage('home')}
            onOpenContact={() => handleNavigatePage('contact')}
            onOpenConsultation={() => {
              setSelectedAgentForConsultation(null);
              setIsConsultationOpen(true);
            }}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            onNavigateHome={() => handleNavigatePage('home')}
            agents={AGENTS_DATA}
            onOpenConsultation={openConsultationForAgent}
          />
        )}
      </main>

      {/* Footer matching screenshot */}
      <Footer
        onOpenConsultation={() => {
          setSelectedAgentForConsultation(null);
          setIsConsultationOpen(true);
        }}
        onOpenPrivateCollection={() => setIsPrivateCollectionOpen(true)}
        onNavigatePage={handleNavigatePage}
      />

      {/* Floating Concierge & Sound Button */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center space-x-2">
        {/* Atmosphere Audio Toggle */}
        <button
          onClick={toggleAmbiance}
          className={`p-3 rounded-full backdrop-blur-md border shadow-xl transition-all ${
            isAudioPlaying
              ? 'bg-[#c5a880] text-black border-[#d8b88a]'
              : 'bg-[#14161f]/80 text-[#9ca3af] hover:text-white border-[#272b38]'
          }`}
          title={isAudioPlaying ? 'Mute Coastal Soundscape' : 'Play Coastal Atmosphere Soundscape'}
          aria-label="Toggle ambient soundscape"
        >
          {isAudioPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* VIP Advisory Quick Button */}
        <button
          onClick={() => {
            setSelectedAgentForConsultation(null);
            setIsConsultationOpen(true);
          }}
          className="hidden sm:flex items-center space-x-2 px-3.5 py-2.5 bg-[#14161f]/90 hover:bg-[#1d202c] backdrop-blur-md border border-[#272b38] hover:border-[#c5a880]/50 rounded-full text-xs text-white shadow-xl transition-all"
        >
          <Phone className="w-3.5 h-3.5 text-[#c5a880]" />
          <span className="font-medium tracking-wide">Advisory Desk</span>
        </button>
      </div>

      {/* --- ALL INTERACTIVE MODALS --- */}
      {selectedProperty && (
        <PropertyDetailModal
          property={selectedProperty}
          currentCurrency={currentCurrency}
          onClose={() => setSelectedProperty(null)}
          onBookViewing={openViewingForProperty}
        />
      )}

      {isConsultationOpen && (
        <AgentConsultationModal
          agent={selectedAgentForConsultation}
          property={selectedProperty}
          onClose={() => {
            setIsConsultationOpen(false);
            setSelectedAgentForConsultation(null);
          }}
        />
      )}

      {isPrivateCollectionOpen && (
        <PrivateCollectionModal
          onClose={() => setIsPrivateCollectionOpen(false)}
        />
      )}

      {isSearchOpen && (
        <GlobalSearchModal
          properties={PROPERTIES_DATA}
          agents={AGENTS_DATA}
          currentCurrency={currentCurrency}
          onClose={() => setIsSearchOpen(false)}
          onSelectProperty={(prop) => setSelectedProperty(prop)}
          onSelectAgent={(agent) => openConsultationForAgent(agent)}
        />
      )}

      {selectedArticle && (
        <JournalArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </div>
  );
}
