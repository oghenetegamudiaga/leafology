import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Truck, RotateCcw, ShieldCheck, ChevronRight, ArrowUpRight, Sparkles, Leaf } from 'lucide-react';

interface KeyAdvantagesProps {
  onExploreClick: () => void;
}

export const KeyAdvantages: React.FC<KeyAdvantagesProps> = ({ onExploreClick }) => {
  const [activeAdvantage, setActiveAdvantage] = useState(0);

  const advantages = [
    {
      id: 0,
      title: 'Carefully Selected Ingredients',
      description: 'We use skin-friendly, plant-active botanicals like French Pink Clay, Colloidal Oatmeal, and Wild Hibiscus that nourish your barrier without harsh liquid sulphates or fillers.',
      cta: 'Explore All Collection'
    },
    {
      id: 1,
      title: 'Visible & Trusted Results',
      description: 'Backed by 7 beauty industry awards and 4.9★ verified Trustpilot customer reviews across the UK. Proven formulas that bring back your natural skin and scalp radiance.',
      cta: 'View Customer Reviews'
    },
    {
      id: 2,
      title: 'Cruelty-Free & Plastic-Free Commitment',
      description: 'Every Leafology container is made from durable glass or aluminium, backed by our compostable paper bag refill system. 100% vegan, cruelty-free, and plastic-neutral.',
      cta: 'Learn How Refills Work'
    },
    {
      id: 3,
      title: 'Expertly Crafted Range',
      description: 'Formulated and hand-batched in small, fresh runs in Oxfordshire, UK by an artist turn plant scientist. Guaranteed freshness in every single jar.',
      cta: 'Read Founder Story'
    }
  ];

  return (
    <section className="bg-[#FAF8F5] text-[#241C15] py-16 lg:py-24 px-6 lg:px-12 border-b border-[#E8E2D7]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Top Perks Strip (Matching PNG Top Header) */}
        <div className="text-center space-y-8">
          <div className="space-y-2">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A331E]">
              Our Key <span className="font-serif italic text-[#2D5233]">Advantages</span>
            </h2>
            <p className="text-stone-600 text-sm max-w-md mx-auto">
              Shop with confidence knowing you can return your product within 7 days if it doesn't meet your expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 border-t border-b border-[#E2EADF] py-8">
            <div className="flex flex-col items-center text-center space-y-2 px-4">
              <div className="w-12 h-12 rounded-full bg-[#E8F0EA] text-[#1A331E] flex items-center justify-center mb-1">
                <Truck className="w-5 h-5 text-[#2D5233]" />
              </div>
              <h4 className="font-semibold text-base text-[#1A331E]">Free UK Shipping</h4>
              <p className="text-xs text-stone-600 max-w-xs leading-relaxed">
                Free delivery on all UK orders with no minimum purchase required for your convenience.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-2 px-4 border-y md:border-y-0 md:border-x border-[#E2EADF] py-4 md:py-0">
              <div className="w-12 h-12 rounded-full bg-[#E8F0EA] text-[#1A331E] flex items-center justify-center mb-1">
                <RotateCcw className="w-5 h-5 text-[#2D5233]" />
              </div>
              <h4 className="font-semibold text-base text-[#1A331E]">7-Day Returns</h4>
              <p className="text-xs text-stone-600 max-w-xs leading-relaxed">
                Shop with complete confidence knowing you can exchange or return products within 7 days.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-2 px-4">
              <div className="w-12 h-12 rounded-full bg-[#E8F0EA] text-[#1A331E] flex items-center justify-center mb-1">
                <ShieldCheck className="w-5 h-5 text-[#2D5233]" />
              </div>
              <h4 className="font-semibold text-base text-[#1A331E]">Safe & Secure Checkout</h4>
              <p className="text-xs text-stone-600 max-w-xs leading-relaxed">
                We use advanced 256-bit SSL encryption and trusted UK payment gateways.
              </p>
            </div>
          </div>
        </div>

        {/* Main Split Layout: Model Photo Left, Feature Cards Right (Matching PNG) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Model Photo Frame */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-xl border-8 border-white bg-[#F3EFE6]"
            >
              <img
                src="https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop"
                alt="Glowing model with natural skincare"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A331E]/40 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-stone-200 text-[#1A331E]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#2D5233] uppercase tracking-wider mb-1">
                  <Leaf className="w-3.5 h-3.5" /> Handcrafted in Oxfordshire
                </div>
                <p className="text-xs text-stone-600 font-medium">
                  "Freshly made in small batches with zero synthetic liquid preservatives."
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Feature Accordion List */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-3">
              <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#1A331E]">
                It's Time to <span className="font-serif italic text-[#2D5233]">Upgrade</span> <br />
                Your Skincare
              </h2>
              <p className="text-stone-600 text-sm max-w-lg leading-relaxed">
                Premium quality ingredients, cruelty-free formulas, and results that leave you feeling absolutely radiant every single day.
              </p>
            </div>

            {/* Interactive Cards */}
            <div className="space-y-4 pt-2">
              {advantages.map((adv) => {
                const isActive = activeAdvantage === adv.id;
                return (
                  <motion.div
                    key={adv.id}
                    onClick={() => setActiveAdvantage(adv.id)}
                    className={`p-6 rounded-2xl transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-white border-[#2D5233] shadow-md'
                        : 'bg-[#E8F0EA]/60 border-transparent hover:bg-white/80'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className={`font-serif text-xl sm:text-2xl font-medium ${isActive ? 'text-[#1A331E]' : 'text-stone-700'}`}>
                        {adv.title}
                      </h3>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform ${isActive ? 'bg-[#2D5233] text-white rotate-90' : 'bg-stone-200 text-stone-600'}`}>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>

                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-stone-100 space-y-4"
                      >
                        <p className="text-stone-600 text-sm leading-relaxed">
                          {adv.description}
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onExploreClick();
                          }}
                          className="px-5 py-2.5 rounded-full bg-[#2D5233] text-[#FAF8F5] text-xs font-semibold hover:bg-[#1A331E] transition-colors flex items-center gap-2"
                        >
                          <span>{adv.cta}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
