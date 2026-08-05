import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { FramerMobileMenu } from './FramerMobileMenu';
import { Footer } from './Footer';
import { CartDrawer } from './CartDrawer';
import { QuizModal } from './QuizModal';
import { IngredientModal } from './IngredientModal';
import { OurStoryModal } from './OurStoryModal';
import { ProductQuickViewModal } from './ProductQuickViewModal';
import { PRODUCTS } from '../data/mockData';
import { Category, CartItem, Product, Variant } from '../types';

interface LayoutProps {
  cartItems: CartItem[];
  onAddToCart: (product: Product, variant: Variant, isSubscription: boolean) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  checkoutMessage: string | null;
  setCheckoutMessage: (msg: string | null) => void;
}

export const Layout: React.FC<LayoutProps> = ({
  cartItems,
  onAddToCart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  checkoutMessage,
  setCheckoutMessage,
}) => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isIngredientsOpen, setIsIngredientsOpen] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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

      {/* Framer Mobile Menu */}
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

      {/* Route Content Area */}
      <main className="flex-1">
        <Outlet context={{ onAddToCart, onOpenStory: () => setIsStoryOpen(true) }} />
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={setActiveCategory}
        onOpenStory={() => setIsStoryOpen(true)}
        onOpenIngredients={() => setIsIngredientsOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenRefills={() => setActiveCategory('Refills')}
      />

      {/* Modals & Drawers */}
      <ProductQuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={onAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={onUpdateQuantity}
        onRemoveItem={onRemoveItem}
        onCheckout={onCheckout}
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

      {/* Checkout Success Notification */}
      {checkoutMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm p-4 rounded-2xl bg-[#3A5A40] text-white shadow-2xl border border-white/20 text-xs font-semibold flex items-center justify-between gap-3 animate-bounce">
          <span>{checkoutMessage}</span>
          <button onClick={() => setCheckoutMessage(null)} className="text-white hover:opacity-75">✕</button>
        </div>
      )}
    </div>
  );
};
