import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, ShoppingBag, Sparkles, User, Leaf } from 'lucide-react';
import { Category } from '../types';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenMobileMenu: () => void;
  isMobileMenuOpen: boolean;
  onSelectCategory: (cat: Category) => void;
  onOpenQuiz: () => void;
  onOpenStory: () => void;
  onOpenIngredients: () => void;
  activeCategory: Category;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenMobileMenu,
  isMobileMenuOpen,
  onSelectCategory,
  onOpenQuiz,
  onOpenStory,
  onOpenIngredients,
  activeCategory,
}) => {
  const navigate = useNavigate();
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full font-sans transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-[#1A331E] text-[#FAF8F5] py-2 px-4 text-xs tracking-wide text-center flex items-center justify-between border-b border-white/10">
        <div className="hidden sm:flex items-center gap-2 text-white/80">
          <Leaf className="w-3.5 h-3.5 text-[#8CAE92]" />
          <span>Handcrafted in Oxfordshire · Plastic-Free Refills</span>
        </div>
        <div className="mx-auto sm:mx-0 font-medium text-[#FAF8F5]/90 flex items-center gap-2">
          <span>Free UK delivery on all orders</span>
          <span className="hidden md:inline text-white/40">•</span>
          <span className="hidden md:inline text-[#8CAE92]">Spend £55 save 5% with code <b>555</b></span>
        </div>
        <div className="hidden lg:flex items-center gap-4 text-white/80 text-xs">
          <button onClick={onOpenQuiz} className="hover:text-emerald-200 transition-colors flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-300" /> Routine Quiz
          </button>
        </div>
      </div>

      {/* Main Header Bar - Leaf Green Palette */}
      <div className="bg-[#244226] text-[#FAF8F5] px-6 lg:px-12 py-4 flex items-center justify-between border-b border-white/10 shadow-md">
        
        {/* Left: Brand Logo */}
        <Link to="/" className="flex items-center gap-3 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-[#38633F] flex items-center justify-center border border-white/20 shadow-inner">
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <span className="font-sans text-xl lg:text-2xl font-medium tracking-wide text-white">
            Leafology
          </span>
        </Link>

        {/* Center: Main Navigation Menu */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-xs lg:text-sm font-normal text-white/90">
          <Link
            to="/"
            className={`transition-colors hover:text-emerald-200 ${activeCategory === 'All' ? 'text-emerald-200 font-semibold' : 'text-white/90'}`}
          >
            Home
          </Link>
          
          <button
            onClick={onOpenStory}
            className="transition-colors hover:text-emerald-200 text-white/90"
          >
            About us
          </button>

          {/* Collection Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShowCategoryDropdown(true)}
            onMouseLeave={() => setShowCategoryDropdown(false)}
          >
            <Link
              to="/shop"
              className="flex items-center gap-1 hover:text-emerald-200 text-white/90 transition-colors py-1"
            >
              Collection +
            </Link>

            {showCategoryDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="absolute top-full left-0 w-56 bg-[#1A331E] rounded-xl p-2 border border-white/15 shadow-2xl z-50 mt-1"
              >
                {(['Skin', 'Hair', 'Teeth', 'Body', 'Home', 'Bundles', 'Refills'] as Category[]).map((cat) => (
                  <Link
                    key={cat}
                    to={`/shop/${cat}`}
                    onClick={() => {
                      onSelectCategory(cat);
                      setShowCategoryDropdown(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 rounded-lg text-xs lg:text-sm transition-all flex items-center justify-between ${
                      activeCategory === cat ? 'bg-white/20 text-white font-medium' : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span>{cat}</span>
                    {cat === 'Refills' && <span className="text-[10px] bg-[#38633F] text-white px-2 py-0.5 rounded-full">Eco</span>}
                  </Link>
                ))}
              </motion.div>
            )}
          </div>

          <Link
            to="/shop"
            className="transition-colors hover:text-emerald-200 text-white/90"
          >
            Shop +
          </Link>

          <button
            onClick={onOpenStory}
            className="transition-colors hover:text-emerald-200 text-white/90"
          >
            Contact
          </button>
        </nav>

        {/* Right: Search, Account, Cart Icons & Mobile Toggle */}
        <div className="flex items-center gap-5 sm:gap-6">
          <button
            onClick={() => navigate('/search')}
            className="text-white/80 hover:text-white transition-colors"
            title="Search Products"
            aria-label="Search Products"
          >
            <Search className="w-5 h-5 stroke-[1.75]" />
          </button>

          <button
            onClick={onOpenStory}
            className="text-white/80 hover:text-white transition-colors"
            title="Account"
            aria-label="Account"
          >
            <User className="w-5 h-5 stroke-[1.75]" />
          </button>

          {/* Cart Icon Button with Badge */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onOpenCart}
            className="relative text-white/90 hover:text-white transition-colors"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-[#3A5A40] text-white font-sans text-[10px] font-bold flex items-center justify-center border border-[#3A2213]"
              >
                {cartCount}
              </motion.span>
            )}
          </motion.button>

          {/* FRAMER STYLE HAMBURGER BUTTON (Mobile Toggle) */}
          <button
            onClick={onOpenMobileMenu}
            className="md:hidden relative w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex flex-col items-center justify-center gap-1.5 p-2 transition-colors border border-white/10 ml-1"
            aria-label="Toggle Navigation Menu"
          >
            <motion.span
              animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-4 h-0.5 bg-white rounded-full block origin-center"
            />
            <motion.span
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="w-4 h-0.5 bg-white rounded-full block"
            />
            <motion.span
              animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-4 h-0.5 bg-white rounded-full block origin-center"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
