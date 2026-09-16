import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroSection } from '../components/HeroSection';
import { CategorySection } from '../components/CategorySection';
import { CuratedSuitesSection } from '../components/CuratedSuitesSection';
import { HandcraftedAnd360Section } from '../components/HandcraftedAnd360Section';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { TrustBar } from '../components/TrustBar';
import { ErgonomicAndB2BSection } from '../components/ErgonomicAndB2BSection';
import { QualityInspectionSection } from '../components/QualityInspectionSection';
import { DynamicBuildGrid } from '../components/DynamicBuildGrid';
import { BlackLabelSection } from '../components/BlackLabelSection';
import { DesignTrendsSection } from '../components/DesignTrendsSection';
import { GiftsShowcaseSection } from '../components/GiftsShowcaseSection';
import { WhyChooseSection } from '../components/WhyChooseSection';
import { ClientTestimonialsSection } from '../components/ClientTestimonialsSection';
import { BlogSection } from '../components/BlogSection';
import { NewsletterSection } from '../components/NewsletterSection';

import type { Product, BlogPost } from '../types';
import { FEATURED_PRODUCTS } from '../data';

interface HomePageProps {
  onAddToCart: (product: Product, selectedColor?: string, quantity?: number) => void;
  onToggleWishlist: (productId: string) => void;
  wishlist: string[];
  onQuickView: (product: Product) => void;
  onOpenStory: () => void;
  onOpenB2B: () => void;
  onReadBlogPost: (post: BlogPost) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onAddToCart,
  onToggleWishlist,
  wishlist,
  onQuickView,
  onOpenStory,
  onOpenB2B,
  onReadBlogPost,
}) => {
  const navigate = useNavigate();
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');

  const handleSelectCategory = (categoryId: string) => {
    navigate(`/shop?category=${categoryId}`);
  };

  return (
    <div>
      {/* 1. Hero Section with Automatic Slide Transition */}
      <HeroSection
        onExploreClick={() => navigate('/shop')}
        onWatchStory={onOpenStory}
        onViewProduct={onQuickView}
        featuredProduct={FEATURED_PRODUCTS[3]} // Executive desk
      />

      {/* 2. Shop By Category ("Explore Our Collections") */}
      <CategorySection
        onSelectCategory={handleSelectCategory}
      />

      {/* 3. Curated Workspace Suites & Bundles */}
      <CuratedSuitesSection onAddToCart={(product) => onAddToCart(product)} />

      {/* 4. Split Feature: "Our Handcrafted Furniture" & "360° Interactive View" */}
      <HandcraftedAnd360Section
        onSelectProduct={onQuickView}
        onAddToCart={(product, color) => onAddToCart(product, color)}
        onExploreHandcrafted={() => navigate('/handcrafted')}
      />

      {/* 5. Featured Products Row */}
      <FeaturedProducts
        onAddToCart={(product, color) => onAddToCart(product, color)}
        onToggleWishlist={onToggleWishlist}
        wishlist={wishlist}
        onQuickView={onQuickView}
        selectedCategoryFilter={selectedCategoryFilter}
        onCategoryChange={setSelectedCategoryFilter}
      />

      {/* 6. Trust & Quality Proposition Strip + Brand Quote */}
      <TrustBar />

      {/* 7. Ergonomic Designed for You & B2B Wholesale */}
      <ErgonomicAndB2BSection
        onShopErgonomic={() => navigate('/shop?category=chairs')}
        onOpenB2B={() => navigate('/b2b')}
      />

      {/* 8. 10-Point Quality Inspection Section */}
      <QualityInspectionSection
        onExploreProducts={() => navigate('/shop')}
        onOpenB2B={() => navigate('/b2b')}
      />

      {/* 9. Dynamic Build Grid */}
      <DynamicBuildGrid />

      {/* 10. Our Label Products - Specially Built Expensive */}
      <BlackLabelSection
        onAddToCart={(product: Product) => onAddToCart(product)}
      />

      {/* 11. Design Trends Section */}
      <DesignTrendsSection
        onSelectProduct={onQuickView}
        onAddToCart={(product) => onAddToCart(product)}
      />

      {/* 12. Gifts That Could Be Yours */}
      <GiftsShowcaseSection />

      {/* 13. Why Choose MarkWell */}
      <WhyChooseSection
        onLearnMore={onOpenStory}
      />

      {/* 14. Clients Who Loved Our Work */}
      <ClientTestimonialsSection
        onOpenB2B={() => navigate('/b2b')}
      />

      {/* 15. Blog & Insights */}
      <BlogSection
        onReadPost={onReadBlogPost}
      />

      {/* 16. Newsletter Subscription */}
      <NewsletterSection onViewAllArticles={() => navigate('/about')} />
    </div>
  );
};
