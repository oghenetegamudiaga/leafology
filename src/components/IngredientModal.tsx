import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, Leaf, Check, Sparkles } from 'lucide-react';
import { INGREDIENTS } from '../data/mockData';

interface IngredientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IngredientModal: React.FC<IngredientModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [search, setSearch] = useState('');

  const filtered = INGREDIENTS.filter(
    (ing) =>
      ing.commonName.toLowerCase().includes(search.toLowerCase()) ||
      ing.botanicalName.toLowerCase().includes(search.toLowerCase()) ||
      ing.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-3xl bg-[#FAF8F5] rounded-3xl p-6 sm:p-10 text-[#241C15] shadow-2xl border border-stone-300 max-h-[90vh] flex flex-col justify-between"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-9 h-9 rounded-full bg-stone-200 hover:bg-[#1A331E] hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-6 flex-1 overflow-y-auto pr-2 no-scrollbar">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D5233]/10 text-[#2D5233] text-xs font-semibold uppercase tracking-wider">
                <Leaf className="w-3.5 h-3.5" /> Honest Plant Education
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A331E]">
                Ingredient Glossary
              </h2>
              <p className="text-xs text-stone-600 max-w-lg">
                We list every single ingredient in full — heaviest first. Search any active botanical below to see why we chose it.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search ingredients (e.g. Pink Clay, Shikakai, Oatmeal)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-stone-300 rounded-2xl text-sm focus:outline-none focus:border-[#1A331E]"
              />
            </div>

            {/* Ingredient Cards List */}
            <div className="space-y-4 pt-2">
              {filtered.map((ing) => (
                <div key={ing.id} className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-[#1A331E]">
                        {ing.commonName}
                      </h3>
                      <span className="text-xs font-serif italic text-[#2D5233] font-semibold">
                        Botanical Name: {ing.botanicalName}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {ing.foundInProducts.map((pName, i) => (
                        <span key={i} className="text-[10px] bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full border border-stone-200">
                          Found in {pName}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {ing.description}
                  </p>

                  <div className="pt-2 border-t border-stone-100 flex flex-wrap gap-2">
                    {ing.benefits.map((b, i) => (
                      <span key={i} className="inline-flex items-center gap-1 text-[11px] font-medium text-[#2D5233] bg-[#2D5233]/10 px-2.5 py-0.5 rounded-full">
                        <Check className="w-3 h-3" /> {b}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-stone-200 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-[#1A331E] text-white text-xs font-semibold hover:bg-[#2D5233]"
            >
              Close Glossary
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
