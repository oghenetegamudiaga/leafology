import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X, Leaf } from 'lucide-react';
import { PRODUCTS } from '../data/mockData';
import { Category, Product, Variant } from '../types';
import { ProductCard } from '../components/ProductCard';
import { ProductFilterBar } from '../components/ProductFilterBar';
import { useProductFilters } from '../hooks/useProductFilters';

interface SearchPageProps {
  onAddToCart: (product: Product, variant: Variant, isSubscription: boolean) => void;
}

const CATEGORIES: Category[] = ['All', 'Skin', 'Hair', 'Teeth', 'Body', 'Home', 'Bundles', 'Refills'];

export const SearchPage: React.FC<SearchPageProps> = ({ onAddToCart }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';

  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
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
  } = useProductFilters(PRODUCTS, { initialSearchQuery: queryParam });

  // Sync searchQuery with URL query parameter ?q=...
  useEffect(() => {
    if (queryParam !== searchQuery) {
      setSearchQuery(queryParam);
    }
  }, [queryParam]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim()) {
      setSearchParams({ q: val }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchParams({}, { replace: true });
  };

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
              placeholder="Search by product name, subtitle, description, ingredient..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="w-full pl-13 pr-12 py-4 rounded-full bg-white text-stone-800 placeholder-stone-400 border border-stone-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1A331E] transition-all text-sm font-medium"
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
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

        {/* Reusable Product Filter Bar */}
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
              <h3 className="font-serif text-2xl font-bold text-[#1A331E]">No Products Match</h3>
              <p className="text-xs text-stone-600">
                Nothing matched that search — but we bet one of these will.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 rounded-full bg-[#1A331E] text-white font-semibold text-xs hover:bg-[#2D5233] transition-colors"
              >
                Clear Search & Filters
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
