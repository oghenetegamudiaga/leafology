import { useState, useMemo } from 'react';
import { Product, Category } from '../types';

export type SortOption = 'bestseller' | 'price-asc' | 'price-desc' | 'rating';

export interface UseProductFiltersOptions {
  initialSearchQuery?: string;
  initialCategory?: Category;
}

export function useProductFilters(
  products: Product[],
  options: UseProductFiltersOptions = {}
) {
  const [searchQuery, setSearchQuery] = useState(options.initialSearchQuery || '');
  const [selectedCategory, setSelectedCategory] = useState<Category>(options.initialCategory || 'All');
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [onlyRefillable, setOnlyRefillable] = useState(false);
  const [onlyVegan, setOnlyVegan] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('bestseller');

  // Base products filtered by category if category selection is active
  const categoryFilteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return products;
    if (selectedCategory === 'Refills') return products.filter((p) => p.isRefillable);
    return products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  // Extract all available concerns from current category subset
  const availableConcerns = useMemo(() => {
    const set = new Set<string>();
    categoryFilteredProducts.forEach((p) => p.concern?.forEach((c) => set.add(c)));
    return Array.from(set);
  }, [categoryFilteredProducts]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let list = [...categoryFilteredProducts];

    // 1. Text Search Filter (name, subtitle, description, category, ingredients)
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

    // 2. Concerns Filter (AND logic if multiple selected)
    if (selectedConcerns.length > 0) {
      list = list.filter((p) =>
        selectedConcerns.every((c) => p.concern?.includes(c))
      );
    }

    // 3. Refillable Filter
    if (onlyRefillable) {
      list = list.filter((p) => p.isRefillable);
    }

    // 4. Vegan Filter
    if (onlyVegan) {
      list = list.filter((p) => p.isVegan);
    }

    // 5. Sort Logic
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
  }, [categoryFilteredProducts, searchQuery, selectedConcerns, onlyRefillable, onlyVegan, sortBy]);

  const toggleConcern = (concern: string) => {
    setSelectedConcerns((prev) =>
      prev.includes(concern) ? prev.filter((c) => c !== concern) : [...prev, concern]
    );
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedConcerns([]);
    setOnlyRefillable(false);
    setOnlyVegan(false);
    setSortBy('bestseller');
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedConcerns.length > 0 ||
    onlyRefillable ||
    onlyVegan;

  return {
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
  };
}
