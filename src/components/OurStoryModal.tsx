import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Award, Sparkles, Heart, Leaf, ShieldCheck, CheckCircle2 } from 'lucide-react';
import founderImg from '../assets/images/founder_portrait_1785896928823.jpg';

interface OurStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OurStoryModal: React.FC<OurStoryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-3xl bg-[#FAF8F5] rounded-3xl p-6 sm:p-10 text-[#241C15] shadow-2xl border border-stone-300 max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-9 h-9 rounded-full bg-stone-200 hover:bg-[#1A331E] hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-8">
            
            {/* Header */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2D5233]/10 text-[#2D5233] text-xs font-semibold uppercase tracking-wider">
                <Heart className="w-3.5 h-3.5" /> Made by hand in Oxfordshire
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A331E]">
                The Naked Story
              </h2>
              <p className="font-serif italic text-[#2D5233] text-lg">
                The person, the plants, and the promise behind Leafology.
              </p>
            </div>

            {/* Editorial Image & Text */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                <img
                  src={founderImg}
                  alt="Leafology founder holding balm in Oxfordshire garden"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-4 text-xs text-stone-700 leading-relaxed font-normal">
                <p className="font-serif text-base text-[#1A331E] font-medium leading-normal">
                  "Leafology didn't start in a sterile corporate lab. It started with one woman, 15 years spent modelling for fine-art photographers around the world, and a growing unease about what she was putting on her skin."
                </p>

                <p>
                  Returning home to Oxfordshire, she began experimenting with waterless dry botanical powders, wild tea infusions, cold-pressed seed oils, and plastic-free metal tins.
                </p>

                <p>
                  What started as a small personal kitchen experiment has grown into an award-winning, small-batch UK studio loved by thousands of repeat customers across the world.
                </p>
              </div>
            </div>

            {/* Core Brand Ethos Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-200">
              <div className="p-4 rounded-2xl bg-white border border-stone-200 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-[#E8F0EA] text-[#1A331E] flex items-center justify-center mx-auto">
                  <Leaf className="w-5 h-5 text-[#2D5233]" />
                </div>
                <h4 className="font-serif font-bold text-base text-[#1A331E]">100% Waterless</h4>
                <p className="text-[11px] text-stone-500">
                  No liquid fillers, zero synthetic liquid preservatives required.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-[#E8F0EA] text-[#1A331E] flex items-center justify-center mx-auto">
                  <Award className="w-5 h-5 text-emerald-600" />
                </div>
                <h4 className="font-serif font-bold text-base text-[#1A331E]">7 Beauty Awards</h4>
                <p className="text-[11px] text-stone-500">
                  Recognized by Beauty Shortlist & Natural Health Awards.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-[#E8F0EA] text-[#1A331E] flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-5 h-5 text-[#2D5233]" />
                </div>
                <h4 className="font-serif font-bold text-base text-[#1A331E]">Plastic-Free Tins</h4>
                <p className="text-[11px] text-stone-500">
                  Durable glass & metal vessels with paper bag refills.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-[#1A331E] text-white text-xs font-semibold hover:bg-[#2D5233]"
              >
                Close Story
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
