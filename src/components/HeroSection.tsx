import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, ArrowRight, Sparkles, Award } from 'lucide-react';
import { Product } from '../types';
import founderImg from '../assets/images/founder_portrait_1785896928823.jpg';

interface HeroSectionProps {
  onShopClick: () => void;
  onExploreClick: () => void;
  onSelectProduct: (product: Product) => void;
  heroProduct: Product;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onShopClick,
  onExploreClick,
  onSelectProduct,
  heroProduct,
}) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <section className="relative bg-gradient-to-b from-[#244226] via-[#1F3C22] to-[#1A331E] text-[#FAF8F5] overflow-hidden pt-8 pb-16 lg:pb-24 px-6 lg:px-12">
      {/* Giant Background Watermark Text "LEAFOLOGY" */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none overflow-hidden opacity-10">
        <span className="font-serif text-[18vw] leading-none font-extrabold uppercase tracking-widest text-[#FAF8F5] block whitespace-nowrap">
          LEAFOLOGY
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column Content */}
        <div className="lg:col-span-7 space-y-8 z-10 pt-4">
          
          {/* Floating Ritual Video Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 p-1.5 pr-5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 cursor-pointer hover:bg-white/20 transition-all shadow-lg"
            onClick={() => setIsVideoModalOpen(true)}
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#1A331E] flex items-center justify-center border border-white/30">
              <img
                src={founderImg}
                alt="Ritual Preview"
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
              <Play className="w-4 h-4 text-white absolute fill-white" />
            </div>
            <span className="text-xs font-medium text-white/90 tracking-wide">
              Watch Botanical Ritual Video
            </span>
          </motion.div>

          {/* Main Editorial Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[1.05] text-[#FAF8F5]">
              Elevate Your <br />
              <span className="font-serif italic font-normal text-[#9CB8A1]">
                Skincare Routine
              </span>
            </h1>

            <p className="text-white/80 text-base sm:text-lg max-w-xl leading-relaxed font-light">
              Handcrafted in Oxfordshire, UK. Waterless botanical powders, concentrated salves, and plastic-free paper refills made for your daily ritual.
            </p>
          </motion.div>

          {/* Dual Pill Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onShopClick}
              className="px-8 py-4 rounded-full bg-[#FAF8F5] text-[#1A331E] font-medium text-sm sm:text-base hover:bg-white transition-all shadow-xl flex items-center gap-2 group"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-4 h-4 text-[#1A331E] group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onExploreClick}
              className="px-8 py-4 rounded-full bg-transparent text-[#FAF8F5] font-medium text-sm sm:text-base border border-white/30 hover:bg-white/10 transition-all"
            >
              Explore Collection
            </motion.button>
          </motion.div>

          {/* Customer Rating & Avatar Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <div className="flex -space-x-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop"
                alt="Customer"
                className="w-10 h-10 rounded-full border-2 border-[#1A331E] object-cover"
                referrerPolicy="no-referrer"
              />
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop"
                alt="Customer"
                className="w-10 h-10 rounded-full border-2 border-[#1A331E] object-cover"
                referrerPolicy="no-referrer"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop"
                alt="Customer"
                className="w-10 h-10 rounded-full border-2 border-[#1A331E] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-300">
                  {'★'.repeat(5)}
                </div>
                <span className="text-xs font-semibold text-white/90">4.9/5 Rating</span>
              </div>
              <p className="text-xs text-white/70 max-w-xs leading-normal">
                Designed with care to support healthy, glowing skin through every step of your routine.
              </p>
            </div>
          </motion.div>

        </div>

        {/* Right Column (Hero Model Image Card) */}
        <div className="lg:col-span-5 relative z-10 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative w-full max-w-md lg:max-w-none aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/15 bg-[#1A331E]"
          >
            {/* Hero Editorial Image */}
            <img
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1000&auto=format&fit=crop"
              alt="Glowing model applying Leafology skincare"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Floating Hero Product Card Tag */}
            <div
              onClick={() => onSelectProduct(heroProduct)}
              className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md text-[#1A331E] border border-white/40 shadow-xl flex items-center justify-between cursor-pointer hover:bg-white transition-all group"
            >
              <div className="flex items-center gap-3">
                <img
                  src={heroProduct.image}
                  alt={heroProduct.name}
                  className="w-12 h-12 rounded-xl object-cover bg-[#E8F0EA]"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#2D5233] tracking-wider block">
                    ★ Featured Hero Ritual
                  </span>
                  <h4 className="font-serif text-base font-bold leading-tight group-hover:text-[#2D5233] transition-colors">
                    {heroProduct.name}
                  </h4>
                  <span className="text-xs font-medium text-stone-600">
                    £{heroProduct.price.toFixed(2)} · Refillable
                  </span>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-[#1A331E] text-white flex items-center justify-center group-hover:bg-[#2D5233] transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Award Badge Floating Top Right */}
            <div className="absolute top-6 right-6 bg-[#2D5233] text-white text-[11px] font-semibold px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-white/20">
              <Award className="w-3.5 h-3.5 text-amber-300" />
              <span>Beauty Award Winner 2024</span>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-3xl bg-[#1A331E] rounded-3xl p-6 border border-white/20 text-white shadow-2xl">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 text-white"
            >
              ✕
            </button>
            <div className="text-center space-y-4 my-4">
              <Sparkles className="w-8 h-8 text-amber-300 mx-auto" />
              <h3 className="font-serif text-3xl font-bold">The Leafology Botanical Ritual</h3>
              <p className="text-white/70 max-w-md mx-auto text-sm">
                Watch how our waterless Renaissance Cleansing Powder activates into a creamy paste in your hands. Hand-milled in Oxfordshire with zero synthetic liquid preservatives.
              </p>
              <div className="aspect-video bg-black/50 rounded-2xl overflow-hidden relative flex items-center justify-center border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1200&auto=format&fit=crop"
                  alt="Video thumbnail"
                  className="w-full h-full object-cover opacity-60"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute w-16 h-16 rounded-full bg-white/90 text-[#1A331E] flex items-center justify-center shadow-xl cursor-pointer hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 fill-[#1A331E] ml-1" />
                </div>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="px-6 py-2.5 rounded-full bg-[#FAF8F5] text-[#1A331E] font-semibold text-sm hover:bg-white"
              >
                Close Video
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
