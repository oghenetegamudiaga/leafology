import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Leaf, Filter, X, ArrowUpDown, Check, RefreshCw } from 'lucide-react';
import { PRODUCTS } from '../data/mockData';
import { Category, Product, Variant } from '../types';
import { ProductCard } from '../components/ProductCard';

interface ShopPageProps {
  onAddToCart: (product: Product, variant: Variant, isSubscription: boolean) => void;
}

const CATEGORY_SEO_TEXT: Record<Category, string> = {
  All: 'Handcrafted in Oxfordshire. Waterless botanical skincare, plastic-free haircare, and zero-waste refills.',
  Hair: 'No plastic bottles, no sulphates, no compromise. Just plant-powered cleansing that actually works.',
  Skin: 'Waterless powders, barrier repair balms & raw botanical polishes for radiant, calm skin.',
  Body: 'Nourishing botanical salves & rich herbal butter bars crafted without liquid fillers.',
  Teeth: 'Mineralizing hydroxyapatite tooth powders for natural enamel support and plastic-free fresh breath.',
  Home: 'Hand-poured UK rapeseed & soy wax aromatherapy candles with pure essential oils.',
  Bundles: 'Curated morning & evening ritual kits with 20%+ savings compared to individual prices.',
  Refills: '100% plastic-free paper refills designed to top up your durable tins & amber glass jars.',
};

const ALL_CATEGORIES: Category[] = ['All', 'Skin', 'Hair', 'Teeth', 'Body', 'Home', 'Bundles', 'Refills'];

export const ShopPage: React.FC<ShopPageProps> = ({ onAddToCart }) => {
  const { category: urlCategory } = useParams<{ category?: string }>();
  const navigate = useNavigate();

  // Validate URL category or default to 'All'
  const activeCategory: Category = useMemo(() => {
    if (!urlCategory) return 'All';
    const found = ALL_CATEGORIES.find(
      (c) => c.toLowerCase() === urlCategory.toLowerCase()
    );
    return found || 'All';
  }, [urlCategory]);

  // Filter state
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [onlyRefillable, setOnlyRefillable] = useState(false);
  const [onlyVegan, setOnlyVegan] = useState(false);
  const [sortBy, setSortBy] = useState<'bestseller' | 'price-asc' | 'price-desc' | 'rating'>('bestseller');

  const handleCategorySelect = (cat: Category) => {
    if (cat === 'All') {
      navigate('/shop');
    } else {
      navigate(`/shop/${cat}`);
    }
  };

  // Base products filtered by category
  const baseCategoryProducts = useMemo(() => {
    if (activeCategory === 'All') return PRODUCTS;
    if (activeCategory === 'Refills') return PRODUCTS.filter((p) => p.isRefillable);
    return PRODUCTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  // Dynamic concerns list based on products in active category
  const availableConcerns = useMemo(() => {
    const set = new Set<string>();
    baseCategoryProducts.forEach((p) => p.concern?.forEach((c) => set.add(c)));
    return Array.from(set);
  }, [baseCategoryProducts]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let list = [...baseCategoryProducts];

    // Filter by concerns (AND logic if selected)
    if (selectedConcerns.length > 0) {
      list = list.filter((p) =>
        selectedConcerns.every((c) => p.concern?.includes(c))
      );
    }

    // Filter by refillable
    if (onlyRefillable) {
      list = list.filter((p) => p.isRefillable);
    }

    // Filter by vegan
    if (onlyVegan) {
      list = list.filter((p) => p.isVegan);
    }

    // Sort logic
    if (sortBy === 'bestseller') {
      list.sort((a, b) => (b.badge === 'Bestseller' ? 1 : 0) - (a.badge === 'Bestseller' ? 1 : 0));
    } else if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [baseCategoryProducts, selectedConcerns, onlyRefillable, onlyVegan, sortBy]);

  const toggleConcern = (concern: string) => {
    setSelectedConcerns((prev) =>
      prev.includes(concern) ? prev.filter((c) => c !== concern) : [...prev, concern]
    );
  };

  const clearAllFilters = () => {
    setSelectedConcerns([]);
    setOnlyRefillable(false);
    setOnlyVegan(false);
    setSortBy('bestseller');
  };

  const hasActiveFilters = selectedConcerns.length > 0 || onlyRefillable || onlyVegan;

  const handleQuickAdd = (product: Product) => {
    onAddToCart(product, product.variants[0], false);
  };

  return (
    <div className="bg-[#FAF8F5] text-[#241C15] py-12 px-4 sm:px-6 lg:px-12 min-h-[80vh]">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Category Hero Header */}
        <div className="space-y-3 text-center sm:text-left border-b border-stone-200/80 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0EA] text-[#2D5233] text-xs font-bold uppercase tracking-wider">
            <Leaf className="w-3.5 h-3.5" /> Leafology Botanical Shop
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A331E]">
            {activeCategory === 'All' ? 'Full Botanical Collection' : `${activeCategory} Care`}
          </h1>
          <p className="text-stone-600 text-sm sm:text-base max-w-2xl font-light leading-relaxed">
            {CATEGORY_SEO_TEXT[activeCategory]}
          </p>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-[#1A331E] text-[#FAF8F5] shadow-md scale-[1.02]'
                  : 'bg-[#E8F0EA] text-stone-700 hover:bg-stone-200'
              }`}
            >
              {cat} {cat === 'Refills' && '♻️'}
            </button>
          ))}
        </div>

        {/* Filter & Control Bar */}
        <div className="bg-white rounded-3xl p-5 border border-stone-200/80 shadow-sm space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Left: Concern Pills */}
            <div className="space-y-2">
              <span className="text-xs uppercase font-bold tracking-wider text-stone-500 block">
                Target Concern:
              </span>
              <div className="flex flex-wrap gap-2">
                {availableConcerns.map((concern) => {
                  const isSelected = selectedConcerns.includes(concern);
                  return (
                    <button
                      key={concern}
                      onClick={() => toggleConcern(concern)}
                      className={`px-3 py-1.5 rounded-full text-xs transition-all font-medium flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-[#1A331E] text-white font-semibold'
                          : 'bg-[#FAF8F5] text-stone-700 border border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      <span>{concern}</span>
                      {isSelected && <X className="w-3 h-3 text-white/80" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Toggles & Sort Dropdown */}
            <div className="flex flex-wrap items-center gap-4 pt-2 lg:pt-0 border-t lg:border-t-0 border-stone-100">
              
              {/* Refill Toggle */}
              <label className="flex items-center gap-2 text-xs font-semibold text-stone-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyRefillable}
                  onChange={(e) => setOnlyRefillable(e.target.checked)}
                  className="rounded text-[#2D5233] focus:ring-[#2D5233] w-4 h-4"
                />
                <span>Refillable Only</span>
              </label>

              {/* Vegan Toggle */}
              <label className="flex items-center gap-2 text-xs font-semibold text-stone-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyVegan}
                  onChange={(e) => setOnlyVegan(e.target.checked)}
                  className="rounded text-[#2D5233] focus:ring-[#2D5233] w-4 h-4"
                />
                <span>100% Vegan</span>
              </label>

              {/* Sort Selector */}
              <div className="flex items-center gap-2 pl-2 border-l border-stone-200">
                <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#FAF8F5] text-xs font-semibold text-[#1A331E] p-2 rounded-xl border border-stone-200 focus:outline-none cursor-pointer"
                >
                  <option value="bestseller">Sort: Bestsellers First</option>
                  <option value="rating">Sort: Highest Rated</option>
                  <option value="price-asc">Sort: Price (Low to High)</option>
                  <option value="price-desc">Sort: Price (High to Low)</option>
                </select>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs font-bold text-rose-700 hover:underline flex items-center gap-1 ml-auto lg:ml-0"
                >
                  <RefreshCw className="w-3 h-3" /> Clear Filters
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Results Counter & Product Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>Showing <b>{filteredProducts.length}</b> products in <b>{activeCategory}</b></span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickAdd={handleQuickAdd}
                />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-3xl border border-stone-200/80 max-w-lg mx-auto space-y-4 shadow-sm">
              <Leaf className="w-12 h-12 text-stone-300 mx-auto" />
              <h3 className="font-serif text-2xl font-bold text-[#1A331E]">No Products Match</h3>
              <p className="text-xs text-stone-600">
                Nothing matched that specific filter combination — but we bet one of our bestsellers will nourish your routine.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-6 py-2.5 rounded-full bg-[#1A331E] text-white font-semibold text-xs hover:bg-[#2D5233] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
