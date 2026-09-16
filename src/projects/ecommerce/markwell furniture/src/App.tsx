/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { B2BPage } from './pages/B2BPage';
import { HandcraftedPage } from './pages/HandcraftedPage';

import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { B2BModal } from './components/B2BModal';
import { StoryModal } from './components/StoryModal';
import { BlogModal } from './components/BlogModal';
import { SearchModal } from './components/SearchModal';
import { WishlistDrawer } from './components/WishlistDrawer';

import type { CartItem, Product, BlogPost } from './types';
import { FEATURED_PRODUCTS } from './data';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  // Cart state initialized with 1 item for immediate rich live experience
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: FEATURED_PRODUCTS[0],
      quantity: 1,
      selectedColor: 'Onyx Black',
    },
  ]);

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>([
    FEATURED_PRODUCTS[1].id, // Standing desk saved
  ]);

  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isB2BOpen, setIsB2BOpen] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);

  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 2800);
  };

  // Keyboard shortcut '/' for search & Escape to close modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !isSearchOpen && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsCartOpen(false);
        setIsWishlistOpen(false);
        setIsSearchOpen(false);
        setIsB2BOpen(false);
        setIsStoryOpen(false);
        setQuickViewProduct(null);
        setSelectedBlogPost(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  // Add to Cart
  const handleAddToCart = (product: Product, selectedColor?: string, quantity: number = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === selectedColor
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { product, quantity, selectedColor }];
      }
    });

    showToast(`Added "${product.name}" to cart`);
  };

  // Update Cart Quantity
  const handleUpdateQuantity = (productId: string, delta: number, color?: string) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.product.id === productId && item.selectedColor === color) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  // Remove from Cart
  const handleRemoveItem = (productId: string, color?: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.product.id === productId && item.selectedColor === color)
      )
    );
  };

  // Wishlist toggle
  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed item from saved wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved item to your workspace wishlist');
        return [...prev, productId];
      }
    });
  };

  // Checkout handler
  const handleCheckout = () => {
    setIsCartOpen(false);
    showToast('Order confirmed! Our white-glove logistics team will contact you.');
    setCart([]);
  };

  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen bg-[#0e1014] text-[#e8eaed] flex flex-col selection:bg-[#e29d52]/30 selection:text-[#f4d19b]">
        
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#161a24] text-white border border-[#e29d52]/50 shadow-2xl rounded-2xl px-5 py-3.5 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="w-6 h-6 rounded-full bg-[#e29d52]/20 flex items-center justify-center text-[#f3ba77]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
          </div>
        )}

        {/* Global Navigation Bar */}
        <Navbar
          cart={cart}
          wishlist={wishlist}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenB2B={() => setIsB2BOpen(true)}
        />

        {/* Page Content Routes */}
        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  wishlist={wishlist}
                  onQuickView={(product) => setQuickViewProduct(product)}
                  onOpenStory={() => setIsStoryOpen(true)}
                  onOpenB2B={() => setIsB2BOpen(true)}
                  onReadBlogPost={(post) => setSelectedBlogPost(post)}
                />
              }
            />

            <Route
              path="/shop"
              element={
                <ShopPage
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  wishlist={wishlist}
                  onQuickView={(product) => setQuickViewProduct(product)}
                />
              }
            />

            <Route
              path="/about"
              element={
                <AboutPage
                  onOpenStory={() => setIsStoryOpen(true)}
                />
              }
            />

            <Route
              path="/contact"
              element={
                <ContactPage />
              }
            />

            <Route
              path="/b2b"
              element={
                <B2BPage />
              }
            />

            <Route
              path="/handcrafted"
              element={
                <HandcraftedPage
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  wishlist={wishlist}
                  onQuickView={(product) => setQuickViewProduct(product)}
                />
              }
            />

            {/* Fallback to Home */}
            <Route
              path="*"
              element={
                <HomePage
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  wishlist={wishlist}
                  onQuickView={(product) => setQuickViewProduct(product)}
                  onOpenStory={() => setIsStoryOpen(true)}
                  onOpenB2B={() => setIsB2BOpen(true)}
                  onReadBlogPost={(post) => setSelectedBlogPost(post)}
                />
              }
            />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer
          onOpenB2B={() => setIsB2BOpen(true)}
        />

        {/* Modals & Drawers */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cart={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onCheckout={handleCheckout}
        />

        <WishlistDrawer
          isOpen={isWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
          wishlistIds={wishlist}
          onRemoveFromWishlist={handleToggleWishlist}
          onAddToCart={(product) => handleAddToCart(product)}
        />

        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          isWishlisted={quickViewProduct ? wishlist.includes(quickViewProduct.id) : false}
        />

        <B2BModal
          isOpen={isB2BOpen}
          onClose={() => setIsB2BOpen(false)}
        />

        <StoryModal
          isOpen={isStoryOpen}
          onClose={() => setIsStoryOpen(false)}
        />

        <BlogModal
          post={selectedBlogPost}
          onClose={() => setSelectedBlogPost(null)}
        />

        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSelectProduct={(product) => setQuickViewProduct(product)}
        />

      </div>
    </>
  );
}
