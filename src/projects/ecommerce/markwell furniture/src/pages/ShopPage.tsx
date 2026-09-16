import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, 
  SlidersHorizontal, 
  Grid3X3, 
  List, 
  Heart, 
  ShoppingBag, 
  Eye, 
  Star, 
  CheckCircle2, 
  Truck, 
  ShieldCheck, 
  RotateCcw,
  ArrowUpDown,
  Tag
} from 'lucide-react';
import type { Product } from '../types';
import { FEATURED_PRODUCTS } from '../data';

interface ShopPageProps {
  onAddToCart: (product: Product, selectedColor?: string, quantity?: number) => void;
  onToggleWishlist: (productId: string) => void;
  wishlist: string[];
  onQuickView: (product: Product) => void;
}

const CATEGORY_TABS = [
  { id: 'all', label: 'All Furniture' },
  { id: 'desks', label: 'Office & Standing Desks' },
  { id: 'chairs', label: 'Ergonomic Chairs' },
  { id: 'conference', label: 'Conference Tables' },
  { id: 'storage', label: 'Storage & Credenzas' },
  { id: 'handcrafted', label: 'Handcrafted Atelier' },
];

export const ShopPage: React.FC<ShopPageProps> = ({
  onAddToCart,
  onToggleWishlist,
  wishlist,
  onQuickView,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [onlySale, setOnlySale] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Synchronize category param if URL changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setActiveCategory(cat);
    }
  }, [searchParams]);

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: catId });
    }
  };

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    return FEATURED_PRODUCTS.filter((product) => {
      // Category match
      if (activeCategory !== 'all' && product.category !== activeCategory) {
        // Also support handcrafted mapping
        if (activeCategory === 'handcrafted-furniture' && product.category !== 'handcrafted') {
          return false;
        } else if (activeCategory !== 'handcrafted-furniture' && product.category !== activeCategory) {
          return false;
        }
      }

      // Sale filter
      if (onlySale && !product.isSale) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchDesc = product.description.toLowerCase().includes(q);
        const matchCat = product.category.toLowerCase().includes(q);
        if (!matchName && !matchDesc && !matchCat) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 5) - (a.rating || 5);
      return 0; // featured default order
    });
  }, [activeCategory, searchQuery, sortBy, onlySale]);

  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-[#0e1014] text-[#e8eaed] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-zinc-400 mb-6 font-medium">
          <Link to="/" className="hover:text-[#f3ba77] transition-colors">Home</Link>
          <span className="text-zinc-600">/</span>
          <span className="text-white">Shop</span>
          {activeCategory !== 'all' && (
            <>
              <span className="text-zinc-600">/</span>
              <span className="text-[#f3ba77] capitalize">{activeCategory.replace('-', ' ')}</span>
            </>
          )}
        </nav>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider text-[#e2b47f] mb-3">
              <Tag className="w-3.5 h-3.5" />
              Complete Atelier Catalog
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Curated Furniture Collections
            </h1>
            <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl font-normal">
              Precision-machined ergonomic task chairs, solid sustainable hardwood desks, 
              and architectural storage solutions engineered for peak focus.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-400 font-mono">
              Showing <strong className="text-white">{filteredProducts.length}</strong> of {FEATURED_PRODUCTS.length} pieces
            </span>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto py-5 scrollbar-none">
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleCategoryChange(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#e2a466] text-[#0f1115] shadow-md shadow-black/30'
                    : 'bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 hover:border-white/20'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Controls Bar: Search, Filters, Sorting, View Mode */}
        <div className="bg-[#141820] border border-white/10 rounded-2xl p-3 sm:p-4 mb-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search by name, wood, feature..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0a0c10] border border-white/15 focus:border-[#e2a466] rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Filter options */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            
            {/* Sale Toggle Button */}
            <button
              onClick={() => setOnlySale(!onlySale)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                onlySale 
                  ? 'bg-amber-500/20 border-amber-500/50 text-[#f3ba77]' 
                  : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
              }`}
            >
              <Tag className="w-3.5 h-3.5" />
              <span>Special Offers Only</span>
            </button>

            {/* Sort Select */}
            <div className="flex items-center gap-2 bg-[#0a0c10] border border-white/15 rounded-xl px-3 py-1.5 text-xs text-zinc-300">
              <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />
              <label htmlFor="shop-sort" className="text-zinc-500">Sort:</label>
              <select
                id="shop-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-white font-medium focus:outline-none cursor-pointer text-xs"
              >
                <option value="featured" className="bg-[#141820] text-white">Featured</option>
                <option value="price-asc" className="bg-[#141820] text-white">Price: Low to High</option>
                <option value="price-desc" className="bg-[#141820] text-white">Price: High to Low</option>
                <option value="rating" className="bg-[#141820] text-white">Top Rated</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center border border-white/15 rounded-xl bg-[#0a0c10] p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-white/15 text-white' : 'text-zinc-500 hover:text-zinc-300'
                }`}
                title="Grid view"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'list' ? 'bg-white/15 text-white' : 'text-zinc-500 hover:text-zinc-300'
                }`}
                title="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Product Grid / List */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#141820] rounded-3xl border border-white/10 max-w-2xl mx-auto px-6">
            <Search className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No matching furniture pieces found</h3>
            <p className="text-sm text-zinc-400 mb-6">
              Try adjusting your search query or reset the category filters to browse our full collection.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setOnlySale(false);
                searchParams.delete('category');
                setSearchParams(searchParams);
              }}
              className="bg-[#e2a466] hover:bg-[#efb57b] text-black text-xs font-semibold px-6 py-2.5 rounded-full transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlist.includes(product.id);

              return (
                <div
                  key={product.id}
                  className="group bg-[#141820] border border-white/10 hover:border-[#e2a466]/40 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-black/60"
                >
                  {/* Image Container */}
                  <div className="relative aspect-4/3 bg-[#0a0c10] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Tag / Badge */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                      {product.isSale && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-500/90 text-white">
                          Sale
                        </span>
                      )}
                      {product.tag && !product.isSale && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/15 backdrop-blur-md text-white border border-white/20">
                          {product.tag}
                        </span>
                      )}
                    </div>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => onToggleWishlist(product.id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:text-rose-400 transition-colors z-10 cursor-pointer"
                      title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                      <Heart 
                        className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} 
                      />
                    </button>

                    {/* Quick View Hover Button */}
                    <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                      <button
                        onClick={() => onQuickView(product)}
                        className="flex-1 bg-black/80 hover:bg-black backdrop-blur-md text-white text-xs font-semibold py-2 rounded-xl border border-white/20 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Quick View</span>
                      </button>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Rating & Review Count */}
                      <div className="flex items-center gap-1.5 mb-2">
                        <div className="flex items-center text-amber-400">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                        </div>
                        <span className="text-xs font-bold text-white">{product.rating.toFixed(1)}</span>
                        <span className="text-[11px] text-zinc-500">({product.reviewCount} reviews)</span>
                      </div>

                      {/* Product Name */}
                      <h3 
                        onClick={() => onQuickView(product)}
                        className="text-base font-bold text-white group-hover:text-[#f3ba77] transition-colors cursor-pointer line-clamp-1"
                      >
                        {product.name}
                      </h3>

                      {/* Dimensions / Material Note */}
                      <p className="text-xs text-zinc-400 mt-1 line-clamp-2 font-normal">
                        {product.dimensions ? `${product.dimensions} / ` : ''}{product.materials ? product.materials.join(', ') : product.description}
                      </p>
                    </div>

                    {/* Pricing & Add to Cart Footer */}
                    <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between gap-2">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-bold text-white">
                            ${product.price.toFixed(2)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-zinc-500 line-through">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-emerald-400 block font-medium">
                          In Stock / White-Glove Ready
                        </span>
                      </div>

                      <button
                        onClick={() => onAddToCart(product)}
                        className="bg-[#e2a466] hover:bg-[#efb57b] text-black text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                        title="Add to cart"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* List View */
          <div className="flex flex-col gap-4">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlist.includes(product.id);

              return (
                <div
                  key={product.id}
                  className="group bg-[#141820] border border-white/10 hover:border-[#e2a466]/40 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center gap-6 transition-all duration-300"
                >
                  <div className="w-full md:w-56 aspect-4/3 md:aspect-square rounded-xl overflow-hidden bg-[#0a0c10] shrink-0 relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.isSale && (
                      <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-500 text-white">
                        Sale
                      </span>
                    )}
                  </div>

                  <div className="flex-1 w-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-[#e2a466] font-semibold uppercase tracking-wider">
                          {product.category}
                        </span>
                        <span className="text-zinc-600">/</span>
                        <div className="flex items-center gap-1 text-amber-400 text-xs">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span className="font-bold text-white">{product.rating}</span>
                          <span className="text-zinc-500 font-normal">({product.reviewCount} reviews)</span>
                        </div>
                      </div>

                      <h3 
                        onClick={() => onQuickView(product)}
                        className="text-lg sm:text-xl font-bold text-white group-hover:text-[#f3ba77] transition-colors cursor-pointer mb-2"
                      >
                        {product.name}
                      </h3>

                      <p className="text-xs sm:text-sm text-zinc-300 mb-3 max-w-2xl font-normal leading-relaxed">
                        {product.description}
                      </p>

                      <div className="flex flex-wrap gap-2 text-xs text-zinc-400 mb-4">
                        {product.dimensions && (
                          <span className="bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                            Dim: {product.dimensions}
                          </span>
                        )}
                        {product.materials && (
                          <span className="bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                            Materials: {product.materials.join(', ')}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10 gap-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-white">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-zinc-500 line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => onToggleWishlist(product.id)}
                          className="p-2.5 rounded-xl border border-white/15 text-zinc-400 hover:text-rose-400 transition-colors cursor-pointer"
                        >
                          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                        </button>
                        <button
                          onClick={() => onQuickView(product)}
                          className="px-4 py-2.5 rounded-xl border border-white/15 text-xs font-semibold text-white hover:bg-white/10 transition-colors cursor-pointer"
                        >
                          Quick View
                        </button>
                        <button
                          onClick={() => onAddToCart(product)}
                          className="bg-[#e2a466] hover:bg-[#efb57b] text-black text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* MarkWell Quality Guarantee Strip */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-6 p-8 rounded-3xl bg-[#141820] border border-white/10">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#e2a466]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">10-Year Warranty</h4>
              <p className="text-xs text-zinc-400 mt-1">Full commercial coverage on all structural joinery and mechanisms.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#e2a466]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">White-Glove Freight</h4>
              <p className="text-xs text-zinc-400 mt-1">Room of choice placement, assembly, and debris removal included.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#e2a466]">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">30-Day In-Office Trial</h4>
              <p className="text-xs text-zinc-400 mt-1">Test ergonomic chairs and workstations in your real flow with zero risk.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#e2a466]">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Certified Ergonomic</h4>
              <p className="text-xs text-zinc-400 mt-1">Tested to BIFMA and European biomechanical comfort standards.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
