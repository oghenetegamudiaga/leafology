import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Leaf, RefreshCw, PackageCheck, Sparkles, ArrowRight } from 'lucide-react';

interface RefillExplainerProps {
  onOpenRefills: () => void;
}

export const RefillExplainer: React.FC<RefillExplainerProps> = ({ onOpenRefills }) => {
  const [refillsPerYear, setRefillsPerYear] = useState(4);

  const plasticBottlesSaved = refillsPerYear * 3;
  const moneySaved = refillsPerYear * 4.5; // average £4.50 saved per refill

  return (
    <section className="bg-[#1A331E] text-[#FAF8F5] py-20 px-6 lg:px-12 relative overflow-hidden">
      {/* Background Leaves Graphic Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
        <Leaf className="w-[600px] h-[600px] text-white" />
      </div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#38633F]/50 border border-[#8CAE92]/30 text-[#8CAE92] text-xs font-semibold tracking-wider uppercase">
            <RefreshCw className="w-3.5 h-3.5" /> Plastic-Free Packaging Pioneer
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#FAF8F5]">
            Buy once. <span className="font-serif italic text-emerald-200">Refill forever.</span>
          </h2>

          <p className="text-white/80 text-base leading-relaxed font-light">
            Our refill system means every glass jar and aluminium tin you own can be topped up at home with compostable paper bag refills — zero plastic, zero waste.
          </p>
        </div>

        {/* 3 Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <motion.div
            whileHover={{ y: -6 }}
            className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-4 text-left relative overflow-hidden group"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#8CAE92]/20 text-[#8CAE92] font-serif text-2xl font-bold flex items-center justify-center">
              01
            </div>
            <h3 className="font-serif text-2xl font-semibold text-white">Buy the Tin or Jar</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Start with our beautiful aluminium tin or amber glass jar. Built to last a lifetime on your bathroom counter.
            </p>
            <div className="pt-2 text-xs font-semibold text-[#8CAE92] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Step 1: Permanent Vessel →
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -6 }}
            className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-4 text-left relative overflow-hidden group"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#8CAE92]/20 text-[#8CAE92] font-serif text-2xl font-bold flex items-center justify-center">
              02
            </div>
            <h3 className="font-serif text-2xl font-semibold text-white">Order the Paper Refill</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              When low, order our paper bag refill. Shipped plastic-free in 100% recyclable, compostable paper pouches.
            </p>
            <div className="pt-2 text-xs font-semibold text-[#8CAE92] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Step 2: Save 15-25% →
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -6 }}
            className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-4 text-left relative overflow-hidden group"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#8CAE92]/20 text-[#8CAE92] font-serif text-2xl font-bold flex items-center justify-center">
              03
            </div>
            <h3 className="font-serif text-2xl font-semibold text-white">Top Up & Save</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Pour the fresh dry powder or salve into your vessel. Same award-winning formula, a fraction of the cost & waste.
            </p>
            <div className="pt-2 text-xs font-semibold text-[#8CAE92] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Step 3: Repeat Ritual →
            </div>
          </motion.div>

        </div>

        {/* Refill Impact Calculator Widget */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#1A331E] to-[#244226] border border-white/15 max-w-4xl mx-auto shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-md">
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> Eco Impact Calculator
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Calculate Your Yearly Plastic Savings
            </h3>
            <p className="text-white/70 text-xs leading-relaxed">
              Adjust the slider to see how switching to Leafology paper refills impacts your wallet & the planet.
            </p>

            <div className="pt-2 space-y-2">
              <div className="flex justify-between text-xs text-white/90 font-medium">
                <span>Refills per year:</span>
                <span className="font-bold text-emerald-200">{refillsPerYear} Refills</span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                value={refillsPerYear}
                onChange={(e) => setRefillsPerYear(Number(e.target.value))}
                className="w-full accent-[#8CAE92] cursor-pointer"
              />
            </div>
          </div>

          <div className="flex items-center gap-6 bg-white/10 p-6 rounded-2xl border border-white/10 text-center w-full md:w-auto">
            <div className="space-y-1">
              <span className="font-serif text-4xl sm:text-5xl font-extrabold text-emerald-200 block">
                {plasticBottlesSaved}
              </span>
              <span className="text-[11px] text-white/70 font-medium uppercase tracking-wider block">
                Plastic Bottles Saved
              </span>
            </div>

            <div className="w-px h-12 bg-white/20" />

            <div className="space-y-1">
              <span className="font-serif text-4xl sm:text-5xl font-extrabold text-[#8CAE92] block">
                £{moneySaved.toFixed(0)}
              </span>
              <span className="text-[11px] text-white/70 font-medium uppercase tracking-wider block">
                Money Saved
              </span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenRefills}
            className="px-8 py-4 rounded-full bg-[#FAF8F5] text-[#1A331E] font-semibold text-sm hover:bg-white transition-all shadow-xl inline-flex items-center gap-2"
          >
            <span>Explore All Eco Refills</span>
            <ArrowRight className="w-4 h-4 text-[#1A331E]" />
          </motion.button>
        </div>

      </div>
    </section>
  );
};
