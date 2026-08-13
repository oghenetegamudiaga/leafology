import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart, Leaf, Award, ShieldCheck, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import founderImg from '../assets/images/founder_portrait_1785896928823.jpg';

export const OurStoryPage: React.FC = () => {
  return (
    <div className="bg-[#FAF8F5] text-[#241C15] py-12 px-4 sm:px-6 lg:px-12 min-h-[85vh]">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F0EA] border border-[#2D5233]/20 text-[#2D5233] text-xs font-bold uppercase tracking-widest">
            <Heart className="w-3.5 h-3.5 text-[#2D5233]" /> Made by Hand in Oxfordshire
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#1A331E]">
            The Naked Story
          </h1>
          
          <p className="font-serif italic text-lg sm:text-2xl text-[#2D5233] max-w-2xl mx-auto">
            The person, the plants, and the promise behind Leafology.
          </p>
        </div>

        {/* Editorial Layout: Founder Image & Backstory */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-md grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-5 aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border-4 border-[#FAF8F5] bg-stone-100">
            <img
              src={founderImg}
              alt="Leafology founder holding balm in Oxfordshire garden"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="md:col-span-7 space-y-5 text-stone-700 text-sm sm:text-base font-light leading-relaxed">
            <p className="font-serif text-lg sm:text-xl text-[#1A331E] font-medium leading-relaxed italic border-l-4 border-[#2D5233] pl-4 py-1">
              "Leafology didn't start in a sterile corporate lab. It started with one woman, 15 years spent modelling for fine-art photographers around the world, and a growing unease about what she was putting on her skin."
            </p>

            <p>
              Returning home to the countryside of Oxfordshire UK, she began experimenting with waterless dry botanical powders, wild tea infusions, cold-pressed seed oils, and plastic-free metal vessels.
            </p>

            <p>
              What started as a small kitchen experiment has grown into an award-winning, small-batch studio loved by thousands of repeat customers across the UK and beyond.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs font-bold text-[#2D5233]">
              <Sparkles className="w-4 h-4" /> Fresh small-batch runs hand-mixed weekly in Oxfordshire.
            </div>
          </div>

        </div>

        {/* 3 Pillars Ethos Grid */}
        <div className="space-y-6">
          <div className="text-center max-w-lg mx-auto space-y-2">
            <h2 className="font-serif text-3xl font-bold text-[#1A331E]">Our Core Botanical Ethos</h2>
            <p className="text-xs text-stone-500 font-light">
              Every single product we make adheres strictly to three uncompromised promises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#E8F0EA] text-[#1A331E] flex items-center justify-center mx-auto shadow-inner">
                <Leaf className="w-6 h-6 text-[#2D5233]" />
              </div>
              <h3 className="font-serif font-bold text-xl text-[#1A331E]">100% Waterless</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                By excluding liquid water fillers, our formulas stay naturally fresh without synthetic liquid preservatives or micro-plastics.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#E8F0EA] text-[#1A331E] flex items-center justify-center mx-auto shadow-inner">
                <Award className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-serif font-bold text-xl text-[#1A331E]">7 Beauty Awards</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                Recognized nationally by the Beauty Shortlist & Natural Health Beauty Awards for pure botanical efficacy.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#E8F0EA] text-[#1A331E] flex items-center justify-center mx-auto shadow-inner">
                <ShieldCheck className="w-6 h-6 text-[#2D5233]" />
              </div>
              <h3 className="font-serif font-bold text-xl text-[#1A331E]">Plastic-Free Refills</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                Durable glass & metal vessels built to last a lifetime, refilled endlessly with 100% compostable paper pouches.
              </p>
            </div>

          </div>
        </div>

        {/* Oxfordshire Hand-Batching Journey */}
        <div className="bg-[#1A331E] text-[#FAF8F5] rounded-3xl p-8 sm:p-12 shadow-2xl space-y-6">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold text-emerald-300">
              The Handcrafted Promise
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold">
              "We formulate for skin & scalp comfort, never corporate profit margins."
            </h2>
            <p className="text-white/80 text-xs sm:text-sm font-light leading-relaxed">
              When you order from Leafology, your package is prepared by hand in small runs, wrapped in eco recycled botanical card, and dispatched direct from Oxfordshire without single-use plastic tape or bubble wrap.
            </p>
          </div>

          <div className="pt-4">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#FAF8F5] text-[#1A331E] font-semibold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-lg"
            >
              <span>Explore Our Botanical Shop</span>
              <ArrowRight className="w-4 h-4 text-[#1A331E]" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
