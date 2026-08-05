import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingBag, X, Sparkles, ChevronRight, Leaf, Heart, BookOpen, ShieldCheck, HelpCircle } from 'lucide-react';
import { Category } from '../types';

interface FramerMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (cat: Category) => void;
  onOpenQuiz: () => void;
  onOpenStory: () => void;
  onOpenIngredients: () => void;
  onOpenCart: () => void;
  cartCount: number;
  activeCategory: Category;
}

export const FramerMobileMenu: React.FC<FramerMobileMenuProps> = ({
  isOpen,
  onClose,
  onSelectCategory,
  onOpenQuiz,
  onOpenStory,
  onOpenIngredients,
  onOpenCart,
  cartCount,
  activeCategory,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { label: Category; desc: string; icon: string }[] = [
    { label: 'All', desc: 'Browse the full botanical collection', icon: '✨' },
    { label: 'Skin', desc: 'Waterless powders, balms & face polishes', icon: '🌸' },
    { label: 'Hair', desc: 'Shikakai powders & botanical hair potions', icon: '🌿' },
    { label: 'Teeth', desc: 'Hydroxyapatite zero-waste tooth powders', icon: '🦷' },
    { label: 'Body', desc: 'Nourishing salves & organic butter bars', icon: '💧' },
    { label: 'Home', desc: 'Rapeseed & soy wax aromatherapy candles', icon: '🕯️' },
    { label: 'Bundles', desc: 'Ritual kits with 20%+ bundle savings', icon: '🎁' },
    { label: 'Refills', desc: 'Paper bag eco refills & subscription sets', icon: '♻️' },
  ];

  // Variants for Framer Motion animation container & staggered children
  const backdropVariants = {
    closed: { opacity: 0, transition: { duration: 0.25 } },
    open: { opacity: 1, transition: { duration: 0.3 } }
  };

  const menuVariants = {
    closed: {
      clipPath: 'circle(0% at calc(100% - 40px) 40px)',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      clipPath: 'circle(150% at calc(100% - 40px) 40px)',
      transition: {
        type: 'spring',
        stiffness: 70,
        restDelta: 2
      }
    }
  };

  const itemVariants = {
    closed: { y: 25, opacity: 0 },
    open: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.08 + i * 0.04,
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    })
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-between overflow-hidden">
          {/* Framer Blur Backdrop */}
          <motion.div
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-md"
            initial="closed"
            animate="open"
            exit="closed"
            variants={backdropVariants}
            onClick={onClose}
          />

          {/* Framer Drawer Container */}
          <motion.div
            className="relative w-full h-full bg-[#1A331E] text-[#FAF8F5] flex flex-col justify-between p-6 overflow-y-auto no-scrollbar"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            {/* Top Bar with Brand & Close Button */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-[#8CAE92]" />
                <span className="font-serif text-2xl tracking-wide font-semibold">Leafology</span>
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ rotate: 90 }}
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Mobile Search Bar */}
            <motion.div custom={0} variants={itemVariants} className="mt-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                <input
                  type="text"
                  placeholder="Search products, ingredients, refills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white/10 rounded-full text-sm text-white placeholder-white/50 border border-white/10 focus:outline-none focus:border-[#8CAE92] transition-all"
                />
              </div>
            </motion.div>

            {/* Quick Action Pills */}
            <motion.div custom={1} variants={itemVariants} className="mt-4 flex gap-2 overflow-x-auto no-scrollbar pb-2">
              <button
                onClick={() => { onOpenQuiz(); onClose(); }}
                className="flex items-center gap-2 px-4 py-2 bg-[#8CAE92]/20 border border-[#8CAE92]/40 text-[#FAF8F5] rounded-full text-xs font-medium whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#8CAE92]" />
                Find Your Routine Quiz
              </button>
              <button
                onClick={() => { onOpenIngredients(); onClose(); }}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white/90 rounded-full text-xs font-medium whitespace-nowrap"
              >
                <Leaf className="w-3.5 h-3.5 text-emerald-300" />
                Ingredient Glossary
              </button>
              <button
                onClick={() => { onOpenStory(); onClose(); }}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white/90 rounded-full text-xs font-medium whitespace-nowrap"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#8CAE92]" />
                Our Naked Story
              </button>
            </motion.div>

            {/* Main Category List with Staggered Framer Motion */}
            <div className="mt-6 flex-1 flex flex-col gap-2">
              <span className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-1">
                Shop Collections
              </span>
              {categories.map((cat, idx) => (
                <motion.div
                  key={cat.label}
                  custom={idx + 2}
                  variants={itemVariants}
                >
                  <button
                    onClick={() => {
                      onSelectCategory(cat.label);
                      onClose();
                    }}
                    className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-all text-left ${
                      activeCategory === cat.label
                        ? 'bg-white/15 border border-white/20 text-white shadow-sm'
                        : 'hover:bg-white/5 text-white/80'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{cat.icon}</span>
                      <div>
                        <span className="font-serif text-xl tracking-wide font-medium block">
                          {cat.label}
                        </span>
                        <span className="text-xs text-white/50">{cat.desc}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/40" />
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Bottom Section with Trust Signal & Cart Action */}
            <motion.div custom={11} variants={itemVariants} className="mt-6 pt-4 border-t border-white/10 space-y-3">
              <button
                onClick={() => { onOpenCart(); onClose(); }}
                className="w-full py-3.5 px-6 bg-[#FAF8F5] text-[#1A331E] rounded-full font-semibold flex items-center justify-center gap-3 shadow-lg hover:bg-white transition-colors"
              >
                <ShoppingBag className="w-5 h-5 text-[#1A331E]" />
                <span>View Basket</span>
                {cartCount > 0 && (
                  <span className="px-2 py-0.5 text-xs bg-[#2D5233] text-white rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>

              <div className="flex items-center justify-between text-xs text-white/60 px-2 pt-2">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#A3B18A]" /> Free UK Delivery
                </span>
                <span>Handcrafted in Oxfordshire 🇬🇧</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
