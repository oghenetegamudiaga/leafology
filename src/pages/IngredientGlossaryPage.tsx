import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Leaf, Search, Check, ArrowRight, Sparkles, Filter } from 'lucide-react';
import { INGREDIENTS } from '../data/mockData';

export const slugifyIngredient = (name: string): string => {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

export const IngredientGlossaryPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredIngredients = INGREDIENTS.filter((ing) => {
    const query = searchQuery.toLowerCase().trim();
    return (
      ing.commonName.toLowerCase().includes(query) ||
      ing.botanicalName.toLowerCase().includes(query) ||
      ing.description.toLowerCase().includes(query) ||
      ing.benefits.some((b) => b.toLowerCase().includes(query)) ||
      ing.foundInProducts.some((p) => p.toLowerCase().includes(query))
    );
  });

  return (
    <div className="bg-[#FAF8F5] text-[#241C15] py-12 px-4 sm:px-6 lg:px-12 min-h-[85vh]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F0EA] border border-[#2D5233]/20 text-[#2D5233] text-xs font-bold uppercase tracking-widest">
            <Leaf className="w-3.5 h-3.5 text-[#2D5233]" /> 100% Transparent Botanical Transparency
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A331E]">
            Ingredient Glossary
          </h1>
          <p className="text-stone-600 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed">
            We list every active plant, clay, seed oil, and herbal infusion in full — heaviest first. Search any active botanical to see why we chose it.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
          <input
            type="text"
            placeholder="Search ingredients (e.g. Pink Clay, Shikakai, Oatmeal, Hibiscus)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-stone-300 rounded-full text-sm font-medium focus:outline-none focus:border-[#1A331E] shadow-sm transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 hover:text-stone-700"
            >
              Clear
            </button>
          )}
        </div>

        {/* Ingredients Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-[#1A331E]">
              {searchQuery ? `Search Results (${filteredIngredients.length})` : 'All Active Botanicals'}
            </h2>
          </div>

          {filteredIngredients.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-stone-200 space-y-4 max-w-md mx-auto">
              <Leaf className="w-12 h-12 text-stone-300 mx-auto" />
              <h3 className="font-serif text-xl font-bold text-[#1A331E]">No ingredients found</h3>
              <p className="text-xs text-stone-500">
                Try searching for a common name like "Oatmeal" or "Rose".
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="px-6 py-2 rounded-full bg-[#1A331E] text-white text-xs font-semibold hover:bg-[#2D5233]"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredIngredients.map((ing) => {
                const slug = slugifyIngredient(ing.commonName);
                return (
                  <motion.div
                    key={ing.id}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => navigate(`/ingredients/${slug}`)}
                    className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-serif text-2xl font-bold text-[#1A331E] group-hover:text-[#2D5233] transition-colors">
                            {ing.commonName}
                          </h3>
                          <span className="text-xs font-serif italic text-[#2D5233] font-semibold block mt-0.5">
                            Botanical Name: {ing.botanicalName}
                          </span>
                        </div>
                        <span className="w-8 h-8 rounded-full bg-[#E8F0EA] text-[#2D5233] flex items-center justify-center flex-shrink-0 group-hover:bg-[#1A331E] group-hover:text-white transition-colors">
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>

                      <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed">
                        {ing.description}
                      </p>

                      {/* Benefits Pills */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        {ing.benefits.map((b, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 text-[11px] font-medium text-[#2D5233] bg-[#2D5233]/10 px-3 py-1 rounded-full"
                          >
                            <Check className="w-3 h-3 text-[#2D5233]" /> {b}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Found In Products List */}
                    <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex flex-wrap gap-1">
                        {ing.foundInProducts.map((pName, i) => (
                          <span
                            key={i}
                            className="text-[10px] bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full border border-stone-200 font-medium"
                          >
                            Found in {pName}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs font-bold text-[#2D5233] group-hover:underline">
                        View Ingredient →
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
