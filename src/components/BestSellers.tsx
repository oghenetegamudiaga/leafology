import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Product, Category } from '../types';
import { ProductCard } from './ProductCard';

interface BestSellersProps {
  products: Product[];
  onQuickAdd: (product: Product) => void;
  activeCategory: Category;
  onSelectCategory: (cat: Category) => void;
}

export const BestSellers: React.FC<BestSellersProps> = ({
  products,
  onQuickAdd,
  activeCategory,
  onSelectCategory,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const categories: Category[] = ['All', 'Skin', 'Hair', 'Teeth', 'Body', 'Home', 'Bundles', 'Refills'];

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory || (activeCategory === 'Refills' && p.isRefillable));

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-[#FAF8F5] text-[#241C15] py-16 lg:py-24 px-6 lg:px-12 border-b border-[#E8E2D7]">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Header with Title & Navigation Arrows */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-2">
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1A331E]">
              Our <span className="font-serif italic text-[#2D5233]">Best</span> Sellers
            </h2>
            <p className="text-stone-600 text-sm max-w-md">
              Handcrafted in small batches with honest UK ingredients. Plastic-free tins and eco refills.
            </p>
          </div>

          {/* Navigation Arrows & View All */}
          <div className="flex items-center gap-4 self-end sm:self-auto">
            <Link
              to={activeCategory === 'All' ? '/shop' : `/shop/${activeCategory}`}
              className="text-xs font-bold text-[#1A331E] hover:text-[#2D5233] transition-colors flex items-center gap-1 uppercase tracking-wider"
            >
              <span>View All {activeCategory === 'All' ? '' : activeCategory}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                className="w-10 h-10 rounded-full border border-stone-300 bg-white text-[#1A331E] flex items-center justify-center hover:bg-[#1A331E] hover:text-white transition-colors shadow-sm"
                aria-label="Previous products"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-10 h-10 rounded-full bg-[#1A331E] text-white flex items-center justify-center hover:bg-[#2D5233] transition-colors shadow-sm"
                aria-label="Next products"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-[#1A331E] text-[#FAF8F5] shadow-md'
                  : 'bg-[#E8F0EA] text-stone-700 hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Horizontal Scrollable Product Cards Grid */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-6 overflow-x-auto no-scrollbar py-4 -mx-2 px-2 snap-x"
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickAdd={onQuickAdd}
              className="w-[280px] sm:w-[320px] flex-shrink-0 snap-start"
            />
          ))}
        </div>

      </div>
    </section>
  );
};

