import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Plus, ChevronLeft, ChevronRight, Star, Leaf, Check } from 'lucide-react';
import { Product, Category } from '../types';

interface BestSellersProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  activeCategory: Category;
  onSelectCategory: (cat: Category) => void;
}

export const BestSellers: React.FC<BestSellersProps> = ({
  products,
  onSelectProduct,
  onQuickAdd,
  activeCategory,
  onSelectCategory,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [addedId, setAddedId] = useState<string | null>(null);

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

  const handleQuickAddClick = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onQuickAdd(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
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

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <button
              onClick={() => scroll('left')}
              className="w-11 h-11 rounded-full border border-stone-300 bg-white text-[#1A331E] flex items-center justify-center hover:bg-[#1A331E] hover:text-white transition-colors shadow-sm"
              aria-label="Previous products"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-11 h-11 rounded-full bg-[#1A331E] text-white flex items-center justify-center hover:bg-[#2D5233] transition-colors shadow-sm"
              aria-label="Next products"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
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
            <motion.div
              key={product.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              onClick={() => onSelectProduct(product)}
              className="w-[280px] sm:w-[320px] flex-shrink-0 bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl border border-stone-200/80 transition-all cursor-pointer flex flex-col justify-between group snap-start"
            >
              <div>
                {/* Image Container with Top Badges & Quick Add (+) Button */}
                <div className="relative aspect-square rounded-2xl bg-[#F4F8F5] overflow-hidden mb-4 p-4 flex items-center justify-center">
                  
                  {/* Top Left Badge Tag */}
                  <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                    {product.badge && (
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#1A331E] text-[10px] font-semibold border border-stone-200 shadow-sm">
                        {product.badge}
                      </span>
                    )}
                    {product.isRefillable && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#2D5233] text-white text-[9px] font-bold tracking-wider uppercase flex items-center gap-1">
                        <Leaf className="w-2.5 h-2.5" /> Refillable
                      </span>
                    )}
                  </div>

                  {/* Top Right Floating Circular "+" Button */}
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={(e) => handleQuickAddClick(e, product)}
                    className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all ${
                      addedId === product.id
                        ? 'bg-[#2D5233] text-white'
                        : 'bg-[#1A331E] text-white hover:bg-[#2D5233]'
                    }`}
                    title="Quick Add to Cart"
                  >
                    {addedId === product.id ? (
                      <Check className="w-4 h-4 text-white" />
                    ) : (
                      <Plus className="w-4 h-4 text-white" />
                    )}
                  </motion.button>

                  {/* Product Image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Product Title & Subtitle */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-amber-500 text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-stone-800">{product.rating}</span>
                    <span className="text-stone-400 text-[11px]">({product.reviewCount})</span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#1A331E] leading-tight group-hover:text-[#2D5233] transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-stone-500 text-xs line-clamp-1 font-light">
                    {product.subtitle}
                  </p>
                </div>
              </div>

              {/* Price & Refill Tag */}
              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="font-sans font-bold text-lg text-[#1A331E]">
                    £{product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-stone-400 line-through ml-2 font-normal">
                      £{product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <span className="text-xs font-semibold text-[#2D5233] group-hover:underline flex items-center gap-1">
                  View Ritual →
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
