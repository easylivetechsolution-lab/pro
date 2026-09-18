import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { OurStory } from './components/OurStory';
import { CropProducts } from './components/CropProducts';
import { FarmIntelligence } from './components/FarmIntelligence';
import { SeedToHarvest } from './components/SeedToHarvest';
import { FarmsAndEstates } from './components/FarmsAndEstates';
import { Sustainability } from './components/Sustainability';
import { TechnologySection } from './components/TechnologySection';
import { Traceability } from './components/Traceability';
import { HarvestShowcase } from './components/HarvestShowcase';
import { ExportLogistics } from './components/ExportLogistics';
import { OurPeople } from './components/OurPeople';
import { FieldStories } from './components/FieldStories';
import { PartnersAndTestimonials } from './components/PartnersAndTestimonials';
import { FaqAndContact } from './components/FaqAndContact';
import { Footer } from './components/Footer';
import { Modals } from './components/Modals';

// Separate Dedicated Pages
import { AboutPage } from './pages/AboutPage';
import { ProductsPage } from './pages/ProductsPage';
import { TechnologyPage } from './pages/TechnologyPage';
import { InsightsPage } from './pages/InsightsPage';
import { ContactPage } from './pages/ContactPage';

import { FarmEstate, ProductItem, BatchRecord, StoryArticle } from './types';
import { FEATURED_PRODUCTS, FARM_ESTATES, SAMPLE_BATCHES, FIELD_STORIES } from './data';

export default function App() {
  // Page Routing state: 'home' | 'about' | 'products' | 'technology' | 'insights' | 'contact'
  const [currentPage, setCurrentPage] = useState<string>('home');

  // Modal states
  const [storyModalOpen, setStoryModalOpen] = useState(false);
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [wholesaleModalOpen, setWholesaleModalOpen] = useState(false);
  const [selectedWholesaleProduct, setSelectedWholesaleProduct] = useState<ProductItem | null>(null);
  const [batchModalOpen, setBatchModalOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<BatchRecord | null>(SAMPLE_BATCHES['AF-24157']);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [estateModalOpen, setEstateModalOpen] = useState(false);
  const [selectedEstate, setSelectedEstate] = useState<FarmEstate | null>(FARM_ESTATES[0]);
  const [articleModalOpen, setArticleModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<StoryArticle | null>(FIELD_STORIES[0]);

  // Read initial hash if provided (e.g. #about, #products, #technology, #insights, #contact)
  useEffect(() => {
    const handleHashSync = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['about', 'products', 'technology', 'insights', 'contact'].includes(hash)) {
        setCurrentPage(hash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === 'home' || hash === '') {
        setCurrentPage('home');
      } else {
        // Section anchors on home page (e.g. #farms, #story, #sustainability)
        setCurrentPage('home');
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    };

    handleHashSync();
    window.addEventListener('hashchange', handleHashSync);
    return () => window.removeEventListener('hashchange', handleHashSync);
  }, []);

  // Smooth navigation handler
  const handleNavigate = (page: string, sectionId?: string) => {
    setCurrentPage(page);

    if (page === 'home') {
      window.history.pushState(null, '', sectionId ? `#${sectionId}` : '#home');
      if (sectionId) {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 80);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      window.history.pushState(null, '', `#${page}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenWholesale = (product?: ProductItem) => {
    setSelectedWholesaleProduct(product || null);
    setWholesaleModalOpen(true);
  };

  const handleInspectBatch = (batchOrId: BatchRecord | string) => {
    if (typeof batchOrId === 'string') {
      setSelectedBatch(SAMPLE_BATCHES[batchOrId] || SAMPLE_BATCHES['AF-24157']);
    } else {
      setSelectedBatch(batchOrId);
    }
    setBatchModalOpen(true);
  };

  const handleSelectEstate = (estate: FarmEstate) => {
    setSelectedEstate(estate);
    setEstateModalOpen(true);
  };

  const handleOpenArticle = (article: StoryArticle) => {
    setSelectedArticle(article);
    setArticleModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#041009] text-[#e5e9e1] selection:bg-[#c39953] selection:text-[#041009]">
      {/* 1. Fixed Main Navigation Bar with Page Links */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenPartnerModal={() => setPartnerModalOpen(true)}
        onOpenSearchModal={() => setSearchModalOpen(true)}
      />

      {/* Main Viewport Router */}
      <main>
        {currentPage === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onSelectEstate={handleSelectEstate}
            onPartnerClick={() => setPartnerModalOpen(true)}
          />
        )}

        {currentPage === 'products' && (
          <ProductsPage
            onRequestWholesale={handleOpenWholesale}
            onInspectBatch={handleInspectBatch}
          />
        )}

        {currentPage === 'technology' && (
          <TechnologyPage
            onInspectBatch={handleInspectBatch}
            onPartnerClick={() => setPartnerModalOpen(true)}
          />
        )}

        {currentPage === 'insights' && (
          <InsightsPage
            onOpenArticle={handleOpenArticle}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage />
        )}

        {currentPage === 'home' && (
          <>
            {/* 2. Hero Section with Weather Overlay & Stats Banner */}
            <Hero
              onExploreClick={() => handleNavigate('products')}
              onPartnerClick={() => setPartnerModalOpen(true)}
              onWatchStoryClick={() => setStoryModalOpen(true)}
            />

            {/* 3. Section: Our Story (The Land Is Our Foundation) */}
            <OurStory
              onReadMore={() => handleNavigate('about')}
            />

            {/* 4. Section: What We Grow / Premium Crops & Products */}
            <CropProducts
              onSelectCategory={(categoryId) => {
                const match = FEATURED_PRODUCTS.find(
                  (p) => p.category.toLowerCase().includes(categoryId.toLowerCase())
                );
                handleOpenWholesale(match || FEATURED_PRODUCTS[0]);
              }}
              onViewAllProducts={() => handleNavigate('products')}
            />

            {/* 5. Section: Smart Farming / Farm Intelligence */}
            <FarmIntelligence
              onLearnMore={() => handleNavigate('technology')}
            />

            {/* 6. Section: Our Process / From Seed to Harvest */}
            <SeedToHarvest
              onLearnMore={() => handleNavigate('technology')}
            />

            {/* Luminous White Divider Line */}
            <div className="relative w-full bg-gradient-to-b from-[#071d13] to-[#031109] py-6 sm:py-8 overflow-hidden select-none">
              <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative">
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-white/50 to-transparent blur-[3px]" />
                  <div className="relative w-full h-[1.5px] bg-gradient-to-r from-transparent via-white/90 to-transparent" />
                  <div className="absolute w-2.5 h-2.5 rotate-45 bg-white shadow-[0_0_12px_rgba(255,255,255,1)]" />
                </div>
              </div>
            </div>

            {/* 7. Section: Our Farms & Estates */}
            <FarmsAndEstates
              onExploreAll={() => setPartnerModalOpen(true)}
              onSelectEstate={handleSelectEstate}
            />

            {/* 8. Section: Sustainability in Action */}
            <Sustainability
              onOurImpact={() => handleNavigate('about')}
            />

            {/* 9. Section: Technology for Better Harvests */}
            <TechnologySection
              onExploreTech={() => handleNavigate('technology')}
            />

            {/* 10. Section: Quality & Traceability / A Clearer Path From Farm to You */}
            <Traceability
              onInspectBatch={handleInspectBatch}
              onQualityProcess={() => handleNavigate('about')}
            />

            {/* 11. Section: Our Products / Harvest Showcase */}
            <HarvestShowcase
              onRequestWholesale={handleOpenWholesale}
              onSelectProduct={(prod) => handleOpenWholesale(prod)}
            />

            {/* 12. Section: Global Reach / Export & Logistics */}
            <ExportLogistics
              onExploreCapabilities={() => setPartnerModalOpen(true)}
            />

            {/* 13. Section: Our People / Meet the People Behind the Land */}
            <OurPeople
              onExploreTeam={() => handleNavigate('about')}
              onSelectMember={(member) => {
                handleNavigate('about');
              }}
            />

            {/* 14. Section: Field Stories & Agriculture Intelligence */}
            <FieldStories
              onOpenArticle={handleOpenArticle}
              onViewAllStories={() => handleNavigate('insights')}
              onVisitJournal={() => handleNavigate('insights')}
            />

            {/* 15. Section: Testimonials & Global Partners */}
            <PartnersAndTestimonials />

            {/* 16. Section: FAQ & Let's Grow Something Extraordinary */}
            <FaqAndContact
              onSuccessSubmit={() => {
                // Callback when inquiry submitted
              }}
            />
          </>
        )}
      </main>

      {/* 17. Bottom Footer with Page Links */}
      <Footer
        onPartnerClick={() => setPartnerModalOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Interactive Modals System */}
      <Modals
        storyModalOpen={storyModalOpen}
        onCloseStoryModal={() => setStoryModalOpen(false)}
        partnerModalOpen={partnerModalOpen}
        onClosePartnerModal={() => setPartnerModalOpen(false)}
        wholesaleModalOpen={wholesaleModalOpen}
        onCloseWholesaleModal={() => setWholesaleModalOpen(false)}
        selectedWholesaleProduct={selectedWholesaleProduct}
        batchModalOpen={batchModalOpen}
        onCloseBatchModal={() => setBatchModalOpen(false)}
        selectedBatch={selectedBatch}
        searchModalOpen={searchModalOpen}
        onCloseSearchModal={() => setSearchModalOpen(false)}
        estateModalOpen={estateModalOpen}
        onCloseEstateModal={() => setEstateModalOpen(false)}
        selectedEstate={selectedEstate}
        articleModalOpen={articleModalOpen}
        onCloseArticleModal={() => setArticleModalOpen(false)}
        selectedArticle={selectedArticle}
      />
    </div>
  );
}
