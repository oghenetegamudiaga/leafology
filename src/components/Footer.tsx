import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, ArrowRight, ShieldCheck, Heart, Award, Check } from 'lucide-react';
import { Category } from '../types';

interface FooterProps {
  onSelectCategory?: (cat: Category) => void;
  onOpenStory: () => void;
  onOpenIngredients: () => void;
  onOpenQuiz: () => void;
  onOpenRefills: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenStory,
  onOpenIngredients,
  onOpenQuiz,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#1A331E] text-[#FAF8F5] pt-16 pb-12 px-6 lg:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Newsletter Signup Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#244226] border border-white/15 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left max-w-lg">
            <span className="text-xs uppercase font-bold text-[#8CAE92] tracking-widest block">
              Join the Leaf-Lovers Community
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Get 10% Off Your First Order
            </h3>
            <p className="text-white/70 text-xs font-light">
              Be the first to know about fresh small-batch drops, paper bag refill restocks, and botanical skincare tips.
            </p>
          </div>

          <div className="w-full lg:w-auto min-w-[320px]">
            {subscribed ? (
              <div className="p-4 rounded-full bg-[#38633F] text-white text-xs font-semibold flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-emerald-300" />
                <span>You're in! Check your inbox for your 10% discount code.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 bg-white/10 p-1.5 rounded-full border border-white/20">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-3 text-xs text-white placeholder-white/50 bg-transparent focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-[#FAF8F5] text-[#1A331E] font-bold text-xs hover:bg-white transition-colors flex items-center gap-1.5 flex-shrink-0"
                >
                  <span>Join & Save</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4 Column Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 text-sm">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Leaf className="w-6 h-6 text-[#8CAE92]" />
              <span className="font-serif text-3xl font-bold tracking-wider text-white">Leafology</span>
            </Link>
            <p className="text-white/70 text-xs leading-relaxed max-w-sm font-light">
              Award-winning, plant-based skincare, haircare & home remedies. Handcrafted in small fresh runs in Oxfordshire, UK. 100% waterless powders & plastic-free paper refills.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-[#8CAE92]">
              <Award className="w-4 h-4 text-emerald-300" />
              <span>Winner of 7 Beauty Industry Awards</span>
            </div>
          </div>

          {/* Col 2: Shop Categories */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-bold text-amber-200">Shop Collections</h4>
            <ul className="space-y-2 text-xs text-white/70">
              {(['Skin', 'Hair', 'Teeth', 'Body', 'Home', 'Bundles', 'Refills'] as Category[]).map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/shop/${cat}`}
                    className="hover:text-amber-200 transition-colors block"
                  >
                    {cat} Care
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Brand & Education */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-bold text-amber-200">About & Wisdom</h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <button onClick={onOpenStory} className="hover:text-amber-200 transition-colors">
                  Our Naked Story (Founder)
                </button>
              </li>
              <li>
                <button onClick={onOpenIngredients} className="hover:text-amber-200 transition-colors">
                  Ingredient Glossary
                </button>
              </li>
              <li>
                <button onClick={onOpenQuiz} className="hover:text-amber-200 transition-colors">
                  Routine Finder Quiz
                </button>
              </li>
              <li>
                <Link to="/shop/Refills" className="hover:text-amber-200 transition-colors block">
                  The Refill System
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust Signals */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-bold text-amber-200">Our Promises</h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#A3B18A]" /> Free UK Delivery Always
              </li>
              <li className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-[#A3B18A]" /> 100% Plastic-Free Refills
              </li>
              <li className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#A3B18A]" /> Vegan & Cruelty Free
              </li>
              <li className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#A3B18A]" /> Handcrafted in Oxfordshire
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Signature Line */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <p className="font-serif italic text-white/70 text-center sm:text-left">
            "Handcrafted in small, fresh batches in Oxfordshire, UK — with love, for the whole world."
          </p>
          <div className="flex items-center gap-6">
            <span>© 2026 Leafology.co.uk</span>
            <span>All rights reserved.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
