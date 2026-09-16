import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Star, ArrowRight, ShoppingBag } from 'lucide-react';
import type { Product } from '../types';
import { FEATURED_PRODUCTS } from '../data';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isOpen]);

  const filteredProducts = FEATURED_PRODUCTS.filter((product) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      product.name.toLowerCase().includes(q) ||
      product.category.toLowerCase().includes(q) ||
      product.description.toLowerCase().includes(q)
    );
  });

  const popularSearches = ['Handcrafted Furniture', 'Teak Credenza', 'Ergonomic Mesh Chair', 'Standing Desk', 'Solid Oak Desk', 'Lounge Chair'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#13161f] border border-white/15 rounded-3xl max-w-2xl w-full p-6 shadow-2xl z-10 overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-white/10 pb-4 mb-4">
          <Search className="w-5 h-5 text-[#f3ba77] mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search furniture, office desks, ergonomic chairs..."
            className="w-full bg-transparent text-white text-base sm:text-lg placeholder-zinc-500 outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-zinc-400 hover:text-white mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold bg-white/5 hover:bg-white/10 text-zinc-300 px-3 py-1.5 rounded-lg border border-white/10"
          >
            ESC
          </button>
        </div>

        {/* Popular searches suggestions */}
        {!query && (
          <div className="mb-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 block mb-2">
              Popular Searches
            </span>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="text-xs bg-white/5 hover:bg-[#e29d52]/20 hover:text-[#f3ba77] hover:border-[#e29d52]/40 text-zinc-300 px-3 py-1.5 rounded-full border border-white/10 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto space-y-3 no-scrollbar">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
            <span>Results ({filteredProducts.length})</span>
            {query && <span>Matches for "{query}"</span>}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 text-zinc-400">
              <p className="text-sm">No workspace pieces found matching "{query}"</p>
              <p className="text-xs text-zinc-500 mt-1">Try searching for "desk", "mesh chair", or "oak"</p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="flex items-center justify-between p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#e29d52]/30 cursor-pointer transition-all group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 rounded-xl object-cover bg-zinc-900 shrink-0"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-[#f3ba77] transition-colors">
                      {product.name}
                    </h4>
                    <span className="text-[11px] text-zinc-400 capitalize">
                      {product.category} • In Stock
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-sm font-bold text-white font-mono">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="block text-[10px] text-zinc-500 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-[#f3ba77] group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
