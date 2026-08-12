import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { PRODUCTS } from '../data/mockData';
import { Category, Product, Variant } from '../types';
import { ProductCard } from '../components/ProductCard';
import { ProductFilterBar } from '../components/ProductFilterBar';
import { useProductFilters } from '../hooks/useProductFilters';

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

  const {
    selectedConcerns,
    toggleConcern,
    onlyRefillable,
    setOnlyRefillable,
    onlyVegan,
    setOnlyVegan,
    sortBy,
    setSortBy,
    availableConcerns,
    filteredProducts,
    hasActiveFilters,
    resetFilters,
  } = useProductFilters(PRODUCTS, { initialCategory: activeCategory });

  const handleCategorySelect = (cat: Category) => {
    if (cat === 'All') {
      navigate('/shop');
    } else {
      navigate(`/shop/${cat}`);
    }
  };

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

        {/* Reusable Filter & Control Bar */}
        <ProductFilterBar
          availableConcerns={availableConcerns}
          selectedConcerns={selectedConcerns}
          onToggleConcern={toggleConcern}
          onlyRefillable={onlyRefillable}
          onSetOnlyRefillable={setOnlyRefillable}
          onlyVegan={onlyVegan}
          onSetOnlyVegan={setOnlyVegan}
          sortBy={sortBy}
          onSetSortBy={setSortBy}
          hasActiveFilters={hasActiveFilters}
          onResetFilters={resetFilters}
        />

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
                Nothing matched that search — but we bet one of these will.
              </p>
              <button
                onClick={resetFilters}
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
