import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { TrustBar } from './components/TrustBar';
import { CategoryShowcase } from './components/CategoryShowcase';
import { HowWeWork } from './components/HowWeWork';
import { ProductCatalog } from './components/ProductCatalog';
import { IncotermsAndLogistics } from './components/IncotermsAndLogistics';
import { TradeToolsSimulator } from './components/TradeToolsSimulator';
import { AboutFounder } from './components/AboutFounder';
import { DocumentVaultSection } from './components/DocumentVaultSection';
import { QuoteFormSection } from './components/QuoteFormSection';
import { Footer } from './components/Footer';

// Dedicated Pages
import { AboutPage } from './pages/AboutPage';
import { ProductsPage } from './pages/ProductsPage';
import { TradeShippingPage } from './pages/TradeShippingPage';
import { ContactPage } from './pages/ContactPage';
import { ArrowRight } from 'lucide-react';

// Modals
import { RFQDrawerModal } from './components/RFQDrawerModal';
import { ClientPortalModal } from './components/ClientPortalModal';
import { DocumentVaultModal } from './components/DocumentVaultModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ProductPricingModal } from './components/ProductPricingModal';

// Data & Types
import { PRODUCTS } from './data/mockData';
import type { Product, RFQItem } from './types';

type PageType = 'home' | 'about' | 'products' | 'shipping' | 'contact';

export default function App() {
  // Initial basket pre-seeded with 3 items matching screenshot "RFQ Basket (3)"
  const [rfqItems, setRfqItems] = useState<RFQItem[]>([
    {
      product: PRODUCTS[0], // Surgical Face Mask 3-Ply
      quantity: 50000,
    },
    {
      product: PRODUCTS[1], // Nitrile Examination Gloves
      quantity: 20000,
    },
    {
      product: PRODUCTS[2], // COVID-19 & Flu Rapid Test Kit
      quantity: 5000,
    }
  ]);

  // Modal controls
  const [isRfqOpen, setIsRfqOpen] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [portalMode, setPortalMode] = useState<'buyer' | 'manufacturer'>('buyer');
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [pricingProduct, setPricingProduct] = useState<Product | null>(null);

  // Filters & Navigation state
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [prefilledIncoterm, setPrefilledIncoterm] = useState<string>('CPT');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync hash routing on mount and hashchange
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'about') {
        setCurrentPage('about');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === 'products' || hash === 'supplies') {
        setCurrentPage('products');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === 'shipping' || hash === 'trade' || hash === 'logistics') {
        setCurrentPage('shipping');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === 'contact' || hash === 'quote') {
        setCurrentPage('contact');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === 'home') {
        setCurrentPage('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Add product to RFQ
  const handleAddToRfq = (product: Product, quantity?: number) => {
    const qtyToAdd = quantity || product.moqNumber;
    setRfqItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + qtyToAdd }
            : item
        );
      }
      return [...prev, { product, quantity: qtyToAdd }];
    });
    showToast(`Added ${product.name} to RFQ Basket`);
  };

  // Update quantity in RFQ
  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setRfqItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Remove item from RFQ
  const handleRemoveRfqItem = (productId: string) => {
    setRfqItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Clear Basket
  const handleClearBasket = () => {
    setRfqItems([]);
  };

  // Page Navigation
  const handleNavigate = (pageId: string) => {
    const pageMap: Record<string, PageType> = {
      home: 'home',
      about: 'about',
      products: 'products',
      shipping: 'shipping',
      contact: 'contact'
    };

    const targetPage = pageMap[pageId] || 'home';
    setCurrentPage(targetPage);
    window.location.hash = targetPage === 'home' ? '' : targetPage;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Category selection handler from showcase - routes to products page with category
  const handleCategorySelect = (categoryId: string) => {
    setActiveCategory(categoryId);
    setSearchQuery('');
    handleNavigate('products');
  };

  // Search handler from showcase - routes to products page with search query
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActiveCategory('all');
    handleNavigate('products');
  };

  // Quick quote submission from How We Work
  const handleQuickQuoteSubmit = (data: { name: string; email: string; productCategory: string }) => {
    showToast(`Quote request received for ${data.name}. Trade team notified!`);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-['Plus_Jakarta_Sans',sans-serif] relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0b1b33] text-white px-5 py-2.5 rounded-full shadow-2xl border border-cyan-400/40 text-xs font-semibold flex items-center gap-2 animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Animated Navigation */}
      <Navbar
        currentPage={currentPage}
        rfqCount={rfqItems.length}
        onOpenRfq={() => setIsRfqOpen(true)}
        onOpenPortal={(mode) => {
          setPortalMode(mode);
          setIsPortalOpen(true);
        }}
        onNavigate={handleNavigate}
      />

      <main>
        {currentPage === 'about' ? (
          <AboutPage
            onOpenPortal={(mode) => {
              setPortalMode(mode);
              setIsPortalOpen(true);
            }}
            onNavigate={handleNavigate}
            onOpenVault={() => setIsVaultOpen(true)}
          />
        ) : currentPage === 'products' ? (
          <ProductsPage
            initialCategory={activeCategory}
            initialSearchQuery={searchQuery}
            rfqCount={rfqItems.length}
            onAddToRfq={handleAddToRfq}
            onOpenRfq={() => setIsRfqOpen(true)}
            onViewProductDetails={(product) => setSelectedProduct(product)}
            onRequestPricing={(product) => setPricingProduct(product)}
            onOpenVault={() => setIsVaultOpen(true)}
            onNavigate={handleNavigate}
          />
        ) : currentPage === 'shipping' ? (
          <TradeShippingPage
            onOpenVault={() => setIsVaultOpen(true)}
            onRequestQuoteWithIncoterm={(term) => {
              setPrefilledIncoterm(term);
              handleNavigate('contact');
            }}
            onNavigate={handleNavigate}
          />
        ) : currentPage === 'contact' ? (
          <ContactPage
            prefilledIncoterm={prefilledIncoterm}
            rfqItems={rfqItems}
            onSubmitSuccess={(ref) => showToast(`RFQ ${ref} lodged successfully!`)}
            onNavigate={handleNavigate}
          />
        ) : (
          /* Default Home Page View */
          <>
            {/* 1. Hero Section with 4 Auto/Manual Slides */}
            <HeroSlider
              onRequestQuote={() => handleNavigate('contact')}
              onViewCatalog={() => handleNavigate('products')}
            />

            {/* 2. Trust Bar (Verified Manufacturers, Freight Partners, etc.) */}
            <TrustBar />

            {/* 3. Our Products Showcase (4 categories + search bar) */}
            <CategoryShowcase
              onSelectCategory={handleCategorySelect}
              onSearch={handleSearch}
            />

            {/* 4. How We Work (3 Steps + Embedded Request a Quote Card) */}
            <HowWeWork onQuickQuoteSubmit={handleQuickQuoteSubmit} />

            {/* 5. Product Catalog & RFQ Hub */}
            <ProductCatalog
              initialCategory={activeCategory}
              initialSearchQuery={searchQuery}
              rfqCount={rfqItems.length}
              onAddToRfq={handleAddToRfq}
              onOpenRfq={() => setIsRfqOpen(true)}
              onViewProductDetails={(product) => setSelectedProduct(product)}
              onRequestPricing={(product) => setPricingProduct(product)}
              onViewAllProducts={() => handleNavigate('products')}
              limit={12}
            />

            {/* 6. Trade & Shipping Section */}
            <IncotermsAndLogistics
              onOpenVault={() => setIsVaultOpen(true)}
              onRequestQuoteWithIncoterm={(term) => {
                setPrefilledIncoterm(term);
                handleNavigate('contact');
              }}
            />

            {/* 7. Interactive Trade Duty & Cargo Simulator */}
            <TradeToolsSimulator
              onRequestQuoteWithIncoterm={(term) => {
                setPrefilledIncoterm(term);
                handleNavigate('contact');
              }}
            />

            {/* 8. About Us - Chase Guidroz, Founder & CEO Narrative */}
            <AboutFounder
              onOpenPortal={(mode) => {
                setPortalMode(mode);
                setIsPortalOpen(true);
              }}
            />

            {/* 9. Document Vault Banner */}
            <DocumentVaultSection onOpenVault={() => setIsVaultOpen(true)} />

            {/* 10. Contact / Request an Institutional Quote Form */}
            <QuoteFormSection
              prefilledIncoterm={prefilledIncoterm}
              rfqItems={rfqItems}
              onSubmitSuccess={(ref) => showToast(`RFQ ${ref} lodged successfully!`)}
            />
          </>
        )}
      </main>

      {/* 10. Corporate Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenPortal={(mode) => {
          setPortalMode(mode);
          setIsPortalOpen(true);
        }}
        onOpenVault={() => setIsVaultOpen(true)}
        onOpenIncoterms={() => handleNavigate('shipping')}
      />

      {/* Interactive Modals */}
      <RFQDrawerModal
        isOpen={isRfqOpen}
        onClose={() => setIsRfqOpen(false)}
        rfqItems={rfqItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveRfqItem}
        onClearBasket={handleClearBasket}
      />

      <ClientPortalModal
        isOpen={isPortalOpen}
        onClose={() => setIsPortalOpen(false)}
        defaultMode={portalMode}
      />

      <DocumentVaultModal
        isOpen={isVaultOpen}
        onClose={() => setIsVaultOpen(false)}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToRfq={handleAddToRfq}
        onRequestPricing={(product) => setPricingProduct(product)}
      />

      <ProductPricingModal
        isOpen={!!pricingProduct}
        product={pricingProduct}
        onClose={() => setPricingProduct(null)}
        onAddToQuoteBasket={handleAddToRfq}
      />
    </div>
  );
}
