import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, X, Filter, Leaf, RefreshCw, ArrowUpDown } from 'lucide-react';
import { PRODUCTS } from '../data/mockData';
import { Category, Product, Variant } from '../types';
import { ProductCard } from '../components/ProductCard';

interface SearchPageProps {
  onAddToCart: (product: Product, variant: Variant, isSubscription: boolean) => void;
}

const CATEGORIES: Category[] = ['All', 'Skin', 'Hair', 'Teeth', 'Body', 'Home', 'Bundles', 'Refills'];

export const SearchPage: React.FC<SearchPageProps> = ({ onAddToCart }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [onlyRefillable, setOnlyRefillable] = useState(false);
  const [onlyVegan, setOnlyVegan] = useState(false);
  const [sortBy, setSortBy] = useState<'bestseller' | 'price-asc' | 'price-desc' | 'rating'>('bestseller');

  // Synchronize URL search parameter when search input changes
  useEffect(() => {
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  }, [searchQuery, setSearchParams]);

  // Extract all concerns from PRODUCTS
  const availableConcerns = useMemo(() => {
    const set = new Set<string>();
    PRODUCTS.forEach((p) => p.concern?.forEach((c) => set.add(c)));
    return Array.from(set);
  }, []);

  // Filter products immediately on page load
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    // 1. Text Search Filter (name, subtitle, description)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.ingredients.some((ing) => ing.toLowerCase().includes(q))
      );
    }

    // 2. Category Filter
    if (selectedCategory !== 'All') {
      if (selectedCategory === 'Refills') {
        list = list.filter((p) => p.isRefillable);
      } else {
        list = list.filter((p) => p.category === selectedCategory);
      }
    }

    // 3. Concern Filter
    if (selectedConcerns.length > 0) {
      list = list.filter((p) =>
        selectedConcerns.every((c) => p.concern?.includes(c))
      );
    }

    // 4. Refillable Filter
    if (onlyRefillable) {
      list = list.filter((p) => p.isRefillable);
    }

    // 5. Vegan Filter
    if (onlyVegan) {
      list = list.filter((p) => p.isVegan);
    }

    // 6. Sort
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
  }, [searchQuery, selectedCategory, selectedConcerns, onlyRefillable, onlyVegan, sortBy]);

  const toggleConcern = (concern: string) => {
    setSelectedConcerns((prev) =>
      prev.includes(concern) ? prev.filter((c) => c !== concern) : [...prev, concern]
    );
  };

  const resetAll = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedConcerns([]);
    setOnlyRefillable(false);
    setOnlyVegan(false);
    setSortBy('bestseller');
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'All' ||
    selectedConcerns.length > 0 ||
    onlyRefillable ||
    onlyVegan;

  const handleQuickAdd = (product: Product) => {
    onAddToCart(product, product.variants[0], false);
  };

  return (
    <div className="bg-[#FAF8F5] text-[#241C15] py-12 px-4 sm:px-6 lg:px-12 min-h-[80vh]">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Search Header */}
        <div className="space-y-4">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1A331E]">
            Search <span className="font-serif italic text-[#2D5233]">Botanicals</span>
          </h1>

          {/* Prominent Instant Search Input */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="text"
              autoFocus
              placeholder="Search by product name, concern (e.g. Sensitive), ingredient..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-13 pr-12 py-4 rounded-full bg-white text-stone-800 placeholder-stone-400 border border-stone-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1A331E] transition-all text-sm font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Integrated Controls & Filters Bar */}
        <div className="bg-white rounded-3xl p-5 border border-stone-200/80 shadow-sm space-y-4">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#1A331E] text-white shadow-sm'
                    : 'bg-[#E8F0EA] text-stone-700 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-3 border-t border-stone-100">
            
            {/* Concern Filters */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-bold text-stone-500 mr-1 uppercase tracking-wider">Concerns:</span>
              {availableConcerns.map((concern) => {
                const isSelected = selectedConcerns.includes(concern);
                return (
                  <button
                    key={concern}
                    onClick={() => toggleConcern(concern)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-[#2D5233] text-white font-semibold'
                        : 'bg-[#FAF8F5] text-stone-700 border border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    {concern}
                  </button>
                );
              })}
            </div>

            {/* Quick Toggles & Sort */}
            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-2 text-xs font-semibold text-stone-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyRefillable}
                  onChange={(e) => setOnlyRefillable(e.target.checked)}
                  className="rounded text-[#2D5233] focus:ring-[#2D5233] w-4 h-4"
                />
                <span>Refillable</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-semibold text-stone-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyVegan}
                  onChange={(e) => setOnlyVegan(e.target.checked)}
                  className="rounded text-[#2D5233] focus:ring-[#2D5233] w-4 h-4"
                />
                <span>Vegan</span>
              </label>

              <div className="flex items-center gap-2">
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
                  onClick={resetAll}
                  className="text-xs font-bold text-rose-700 hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" /> Reset
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Results Counter & Immediate Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-stone-600">
            <span>
              Found <b>{filteredProducts.length}</b> {filteredProducts.length === 1 ? 'product' : 'products'}
              {searchQuery && <> for "<b>{searchQuery}</b>"</>}
            </span>
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
              <h3 className="font-serif text-2xl font-bold text-[#1A331E]">No Products Found</h3>
              <p className="text-xs text-stone-600">
                Nothing matched that search — but we bet one of our bestsellers will nourish your routine.
              </p>
              <button
                onClick={resetAll}
                className="px-6 py-2.5 rounded-full bg-[#1A331E] text-white font-semibold text-xs hover:bg-[#2D5233] transition-colors"
              >
                Clear Search & View All
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
