import React from 'react';
import { X, ArrowUpDown, RefreshCw } from 'lucide-react';
import { SortOption } from '../hooks/useProductFilters';

interface ProductFilterBarProps {
  availableConcerns: string[];
  selectedConcerns: string[];
  onToggleConcern: (concern: string) => void;
  onlyRefillable: boolean;
  onSetOnlyRefillable: (val: boolean) => void;
  onlyVegan: boolean;
  onSetOnlyVegan: (val: boolean) => void;
  sortBy: SortOption;
  onSetSortBy: (sort: SortOption) => void;
  hasActiveFilters: boolean;
  onResetFilters: () => void;
}

export const ProductFilterBar: React.FC<ProductFilterBarProps> = ({
  availableConcerns,
  selectedConcerns,
  onToggleConcern,
  onlyRefillable,
  onSetOnlyRefillable,
  onlyVegan,
  onSetOnlyVegan,
  sortBy,
  onSetSortBy,
  hasActiveFilters,
  onResetFilters,
}) => {
  return (
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
                  onClick={() => onToggleConcern(concern)}
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
              onChange={(e) => onSetOnlyRefillable(e.target.checked)}
              className="rounded text-[#2D5233] focus:ring-[#2D5233] w-4 h-4"
            />
            <span>Refillable Only</span>
          </label>

          {/* Vegan Toggle */}
          <label className="flex items-center gap-2 text-xs font-semibold text-stone-700 cursor-pointer">
            <input
              type="checkbox"
              checked={onlyVegan}
              onChange={(e) => onSetOnlyVegan(e.target.checked)}
              className="rounded text-[#2D5233] focus:ring-[#2D5233] w-4 h-4"
            />
            <span>100% Vegan</span>
          </label>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 pl-2 border-l border-stone-200">
            <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
            <select
              value={sortBy}
              onChange={(e) => onSetSortBy(e.target.value as SortOption)}
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
              onClick={onResetFilters}
              className="text-xs font-bold text-rose-700 hover:underline flex items-center gap-1 ml-auto lg:ml-0"
            >
              <RefreshCw className="w-3 h-3" /> Clear Filters
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
