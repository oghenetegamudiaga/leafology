import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, Check, ShieldCheck, Leaf, RefreshCw, ShoppingBag, Award } from 'lucide-react';
import { Product, Variant } from '../types';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, variant: Variant, isSubscription: boolean) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedVariant, setSelectedVariant] = useState<Variant>(product.variants[0]);
  const [isSubscription, setIsSubscription] = useState(false);
  const [activeTab, setActiveTab] = useState<'what' | 'why' | 'how' | 'ingredients'>('what');
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [addedToast, setAddedToast] = useState(false);

  const images = product.galleryImages || [product.image];

  const handleAdd = () => {
    onAddToCart(product, selectedVariant, isSubscription);
    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
      onClose();
    }, 1200);
  };

  const finalPrice = isSubscription
    ? selectedVariant.price * 0.85 // 15% subscription discount
    : selectedVariant.price;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-3xl p-6 sm:p-10 text-[#241C15] shadow-2xl border border-stone-300 my-8 overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-stone-200 hover:bg-[#1A331E] hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Gallery Images */}
            <div className="lg:col-span-5 space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-white border border-stone-200 p-2 shadow-inner">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-xl"
                  referrerPolicy="no-referrer"
                />
              </div>

              {images.length > 1 && (
                <div className="flex gap-2">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(img)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImage === img ? 'border-[#1A331E] scale-105' : 'border-stone-200 opacity-60'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              )}

              {/* Award Badge if available */}
              {product.award && (
                <div className="p-3 bg-[#2D5233]/10 border border-[#2D5233]/20 rounded-xl text-xs text-[#2D5233] flex items-center gap-2 font-semibold">
                  <Award className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{product.award}</span>
                </div>
              )}
            </div>

            {/* Right Column: Product Specs & Variant Selection */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#1A331E] text-white">
                    {product.category}
                  </span>
                  {product.badge && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                      {product.badge}
                    </span>
                  )}
                </div>

                <h2 className="font-serif text-3xl font-bold text-[#1A331E]">
                  {product.name}
                </h2>
                <p className="text-xs text-stone-500 font-medium">{product.subtitle}</p>

                {/* Rating */}
                <div className="flex items-center gap-2 pt-1 text-xs text-stone-600">
                  <div className="flex text-amber-400">
                    {'★'.repeat(Math.floor(product.rating))}
                  </div>
                  <span className="font-bold text-[#1A331E]">{product.rating}</span>
                  <span className="text-stone-400">({product.reviewCount} customer reviews)</span>
                </div>
              </div>

              {/* FORMAT SELECTOR (Full Tin vs Paper Bag Refill) */}
              <div className="space-y-2">
                <label className="text-xs uppercase font-bold tracking-wider text-stone-600 block">
                  1. Choose Packaging Format:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.variants.map((v) => {
                    const isSelected = selectedVariant.id === v.id;
                    return (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#1A331E] text-white border-[#1A331E] shadow-md'
                            : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        <div>
                          <span className="text-xs font-semibold block">{v.name}</span>
                          <span className={`text-[11px] ${isSelected ? 'text-white/70' : 'text-stone-500'}`}>
                            {v.weightOrVolume}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold block">£{v.price.toFixed(2)}</span>
                          {v.type === 'refill_paper_bag' && (
                            <span className="text-[9px] bg-[#2D5233] text-white px-1.5 py-0.5 rounded-full font-bold">
                              Eco Refill
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {selectedVariant.type === 'refill_paper_bag' && (
                  <p className="text-[11px] text-[#2D5233] bg-[#2D5233]/10 p-2.5 rounded-xl flex items-center gap-1.5 font-medium">
                    <Leaf className="w-3.5 h-3.5 text-[#2D5233]" />
                    <span>Eco Paper Bag Refill selected: Shipped 100% plastic-free to top up your existing vessel at home!</span>
                  </p>
                )}
              </div>

              {/* SUBSCRIBE & SAVE TOGGLE */}
              <div className="p-3.5 rounded-2xl bg-[#E8F0EA] border border-stone-300 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-[#2D5233]" />
                    <span className="text-xs font-bold text-[#1A331E]">Subscribe & Save 15%</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isSubscription}
                      onChange={(e) => setIsSubscription(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2D5233]"></div>
                  </label>
                </div>
                <p className="text-[11px] text-stone-600">
                  {isSubscription
                    ? 'Delivered every 2 months. Pause, skip or cancel anytime with 1 click.'
                    : 'Select to auto-deliver your refill every 2 months and save 15% on every order.'}
                </p>
              </div>

              {/* Price & Add to Basket Button */}
              <div className="pt-2 flex items-center gap-4">
                <div>
                  <span className="text-2xl font-bold font-serif text-[#1A331E]">
                    £{finalPrice.toFixed(2)}
                  </span>
                  {isSubscription && (
                    <span className="text-xs text-[#2D5233] font-bold block">
                      (Saved 15% with Subscription)
                    </span>
                  )}
                </div>

                <button
                  onClick={handleAdd}
                  disabled={addedToast}
                  className="flex-1 py-4 px-6 rounded-full bg-[#1A331E] text-white font-semibold text-sm hover:bg-[#2D5233] transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                  {addedToast ? (
                    <>
                      <Check className="w-5 h-5 text-emerald-300" />
                      <span>Added to Basket!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      <span>Add to Basket</span>
                    </>
                  )}
                </button>
              </div>

              {/* Tabs: What it is / Why it works / How to use / Ingredients */}
              <div className="pt-4 border-t border-stone-200">
                <div className="flex border-b border-stone-200 text-xs font-semibold gap-4">
                  {(['what', 'why', 'how', 'ingredients'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setActiveTab(t)}
                      className={`pb-2 capitalize transition-colors ${
                        activeTab === t ? 'border-b-2 border-[#1A331E] text-[#1A331E]' : 'text-stone-400 hover:text-stone-700'
                      }`}
                    >
                      {t === 'what' ? 'What It Is' : t === 'why' ? 'Why It Works' : t === 'how' ? 'How to Use' : 'Ingredients'}
                    </button>
                  ))}
                </div>

                <div className="pt-3 text-xs text-stone-600 leading-relaxed min-h-[80px]">
                  {activeTab === 'what' && <p>{product.description}</p>}

                  {activeTab === 'why' && (
                    <ul className="space-y-1.5 list-disc list-inside">
                      {product.whyItWorks.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  )}

                  {activeTab === 'how' && (
                    <ol className="space-y-1.5 list-decimal list-inside">
                      {product.howToUse.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  )}

                  {activeTab === 'ingredients' && (
                    <div className="space-y-2">
                      <p className="font-semibold text-[#1A331E]">Full Ingredients List (Heavy First):</p>
                      <p className="italic text-stone-500">{product.ingredients.join(', ')}</p>
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
