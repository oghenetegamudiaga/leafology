import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { RefreshCw, Leaf, Sparkles, ChevronDown, ArrowRight, ShieldCheck, CheckCircle2, PackageCheck } from 'lucide-react';

export const RefillsPage: React.FC = () => {
  const [refillsPerYear, setRefillsPerYear] = useState(4);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const plasticBottlesSaved = refillsPerYear * 3;
  const moneySaved = refillsPerYear * 4.5;

  const faqs = [
    {
      q: 'How do I know what to refill?',
      a: 'Start by purchasing any product in its Full Size vessel (Amber Glass Jar or Aluminium Shaker Tin). Once your product is running low, return to our shop and select the "Paper Bag Refill" option for that product. Pour the fresh dry powder or salve directly into your original container.'
    },
    {
      q: 'Can I subscribe to more than one product?',
      a: 'Yes! You can subscribe to as many refill products as you like. Each subscription receives a 15% discount on every auto-delivery order, delivered straight to your door every 2 months in compostable paper pouches.'
    },
    {
      q: 'Can I pause, skip, or cancel my refill subscription?',
      a: 'Absolutely. You can manage your refill subscriptions at any time from your Account dashboard. You can pause, skip an upcoming delivery, or cancel with a single click, with no lock-in contracts.'
    },
    {
      q: 'Are paper refills available for every product?',
      a: 'Paper bag refills are available for all of our waterless powders, dry cleansers, tooth powders, and wax candle blocks. Liquid oil potions (like Hibiscus Dream Hair Potion) come in recyclable glass dropper bottles.'
    }
  ];

  return (
    <div className="bg-[#FAF8F5] text-[#241C15] py-12 px-4 sm:px-6 lg:px-12 min-h-[85vh]">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F0EA] border border-[#2D5233]/20 text-[#2D5233] text-xs font-bold uppercase tracking-widest">
            <RefreshCw className="w-3.5 h-3.5 text-[#2D5233]" /> Zero-Waste Eco System
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#1A331E]">
            Buy Once. <span className="font-serif italic text-[#2D5233]">Refill Forever.</span>
          </h1>

          <p className="text-stone-600 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed">
            Our circular packaging system means every glass jar and aluminium vessel you own can be topped up endlessly at home with 100% compostable paper bag refills.
          </p>
        </div>

        {/* 3 Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-sm space-y-4 text-left relative overflow-hidden">
            <div className="w-14 h-14 rounded-2xl bg-[#E8F0EA] text-[#2D5233] font-serif text-2xl font-bold flex items-center justify-center border border-[#2D5233]/20">
              01
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#1A331E]">Buy the Durable Vessel</h3>
            <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed">
              Start with our signature aluminium shaker tin or amber glass jar. Designed to sit permanently on your bathroom counter for a lifetime.
            </p>
            <div className="pt-2 text-xs font-bold text-[#2D5233]">
              Step 1: Permanent Vessel →
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-sm space-y-4 text-left relative overflow-hidden">
            <div className="w-14 h-14 rounded-2xl bg-[#E8F0EA] text-[#2D5233] font-serif text-2xl font-bold flex items-center justify-center border border-[#2D5233]/20">
              02
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#1A331E]">Order Paper Bag Refill</h3>
            <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed">
              When running low, order our paper bag refill. Shipped plastic-free in 100% recyclable, compostable paper pouches at 15-25% lower cost.
            </p>
            <div className="pt-2 text-xs font-bold text-[#2D5233]">
              Step 2: Save 15-25% →
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-sm space-y-4 text-left relative overflow-hidden">
            <div className="w-14 h-14 rounded-2xl bg-[#E8F0EA] text-[#2D5233] font-serif text-2xl font-bold flex items-center justify-center border border-[#2D5233]/20">
              03
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#1A331E]">Top Up & Save</h3>
            <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed">
              Pour the fresh dry powder directly into your original container. Same award-winning formula, zero plastic landfill waste.
            </p>
            <div className="pt-2 text-xs font-bold text-[#2D5233]">
              Step 3: Repeat Ritual →
            </div>
          </div>

        </div>

        {/* Refill Impact Calculator Widget */}
        <div className="bg-[#1A331E] text-[#FAF8F5] p-8 sm:p-12 rounded-3xl shadow-2xl space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            
            <div className="space-y-4 max-w-md">
              <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" /> Eco Impact Calculator
              </div>
              <h3 className="font-serif text-3xl font-bold text-white">
                Calculate Your Yearly Plastic Savings
              </h3>
              <p className="text-white/80 text-xs sm:text-sm font-light leading-relaxed">
                Adjust the slider to see how switching to Leafology paper refills impacts your wallet & the planet.
              </p>

              <div className="pt-2 space-y-2">
                <div className="flex justify-between text-xs text-white/90 font-medium">
                  <span>Refills per year:</span>
                  <span className="font-bold text-emerald-200 text-sm">{refillsPerYear} Refills</span>
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

            <div className="flex items-center gap-8 bg-white/10 p-6 rounded-2xl border border-white/10 text-center w-full md:w-auto">
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
        </div>

        {/* FAQ Accordion Section */}
        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="text-center space-y-2">
            <h2 className="font-serif text-3xl font-bold text-[#1A331E]">Refill System FAQs</h2>
            <p className="text-xs text-stone-500 font-light">
              Everything you need to know about starting your zero-waste skincare journey.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-5 text-left font-serif font-bold text-lg text-[#1A331E] flex items-center justify-between gap-4"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#2D5233] transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="p-5 pt-0 text-xs sm:text-sm text-stone-600 font-light leading-relaxed border-t border-stone-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Shop Refills CTA */}
        <div className="text-center pt-4">
          <Link
            to="/shop/Refills"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#1A331E] text-white font-semibold text-sm hover:bg-[#2D5233] transition-all shadow-xl"
          >
            <span>Explore All Eco Refills</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};
