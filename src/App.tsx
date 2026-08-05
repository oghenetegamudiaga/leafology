import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { FramerMobileMenu } from './components/FramerMobileMenu';
import { HeroSection } from './components/HeroSection';
import { KeyAdvantages } from './components/KeyAdvantages';
import { BestSellers } from './components/BestSellers';
import { RefillExplainer } from './components/RefillExplainer';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BlogSection } from './components/BlogSection';
import { Footer } from './components/Footer';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { QuizModal } from './components/QuizModal';
import { IngredientModal } from './components/IngredientModal';
import { OurStoryModal } from './components/OurStoryModal';

import { PRODUCTS, TESTIMONIALS, BLOG_POSTS } from './data/mockData';
import { Product, CartItem, Category, Variant } from './types';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'initial-1',
      product: PRODUCTS[0],
      selectedVariant: PRODUCTS[0].variants[0],
      quantity: 1,
      isSubscription: false,
    }
  ]);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isIngredientsOpen, setIsIngredientsOpen] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [checkoutMessage, setCheckoutMessage] = useState<string | null>(null);

  // Cart operations
  const handleAddToCart = (product: Product, variant: Variant, isSubscription: boolean) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedVariant.id === variant.id && item.isSubscription === isSubscription
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: `cart-${Date.now()}-${Math.random()}`,
            product,
            selectedVariant: variant,
            quantity: 1,
            isSubscription,
          }
        ];
      }
    });
  };

  const handleQuickAdd = (product: Product) => {
    handleAddToCart(product, product.variants[0], false);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    setCheckoutMessage('Thank you! Your Leafology order has been placed. We are hand-batching your order in Oxfordshire UK.');
    setCartItems([]);
    setTimeout(() => {
      setIsCartOpen(false);
      setCheckoutMessage(null);
    }, 4000);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#241C15] font-sans flex flex-col selection:bg-[#3A5A40] selection:text-white">
      
      {/* Header Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
        onSelectCategory={setActiveCategory}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenStory={() => setIsStoryOpen(true)}
        onOpenIngredients={() => setIsIngredientsOpen(true)}
        activeCategory={activeCategory}
      />

      {/* FRAMER STYLE MOBILE MENU */}
      <FramerMobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onSelectCategory={setActiveCategory}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenStory={() => setIsStoryOpen(true)}
        onOpenIngredients={() => setIsIngredientsOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={totalCartCount}
        activeCategory={activeCategory}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* Hero Section (Matching PNG Layout) */}
        <HeroSection
          onShopClick={() => setActiveCategory('All')}
          onExploreClick={() => setActiveCategory('Skin')}
          onSelectProduct={setSelectedProduct}
          heroProduct={PRODUCTS[0]}
        />

        {/* Key Advantages Section (Matching PNG Layout) */}
        <KeyAdvantages
          onExploreClick={() => setActiveCategory('All')}
        />

        {/* Best Sellers Carousel Section (Matching PNG Layout) */}
        <BestSellers
          products={PRODUCTS}
          onSelectProduct={setSelectedProduct}
          onQuickAdd={handleQuickAdd}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        {/* Zero-Waste Refill Explainer Section */}
        <RefillExplainer
          onOpenRefills={() => setActiveCategory('Refills')}
        />

        {/* Testimonials Section (Matching PNG Layout) */}
        <TestimonialsSection
          testimonials={TESTIMONIALS}
          onOpenReviewsModal={() => setIsStoryOpen(true)}
        />

        {/* Blog / Skin Care Tips & Trends Section (Matching PNG Layout) */}
        <BlogSection
          posts={BLOG_POSTS}
        />

      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={setActiveCategory}
        onOpenStory={() => setIsStoryOpen(true)}
        onOpenIngredients={() => setIsIngredientsOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenRefills={() => setActiveCategory('Refills')}
      />

      {/* Interactive Modals & Drawers */}
      <ProductQuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectProduct={setSelectedProduct}
      />

      <IngredientModal
        isOpen={isIngredientsOpen}
        onClose={() => setIsIngredientsOpen(false)}
      />

      <OurStoryModal
        isOpen={isStoryOpen}
        onClose={() => setIsStoryOpen(false)}
      />

      {/* Simulated Checkout Success Toast */}
      {checkoutMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm p-4 rounded-2xl bg-[#3A5A40] text-white shadow-2xl border border-white/20 text-xs font-semibold flex items-center justify-between gap-3 animate-bounce">
          <span>{checkoutMessage}</span>
          <button onClick={() => setCheckoutMessage(null)} className="text-white hover:opacity-75">✕</button>
        </div>
      )}

    </div>
  );
}
