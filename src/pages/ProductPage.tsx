import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Star,
  Check,
  ShieldCheck,
  Leaf,
  RefreshCw,
  ShoppingBag,
  Award,
  ChevronRight,
  Heart,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { PRODUCTS } from '../data/mockData';
import { Product, Variant } from '../types';
import { ProductCard } from '../components/ProductCard';
import { useWishlist } from '../context/WishlistContext';

interface ProductPageProps {
  onAddToCart: (product: Product, variant: Variant, isSubscription: boolean) => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({ onAddToCart }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const product = PRODUCTS.find((p) => p.slug === slug);

  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [isSubscription, setIsSubscription] = useState(false);
  const [activeTab, setActiveTab] = useState<'what' | 'why' | 'how' | 'ingredients'>('what');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [addedToast, setAddedToast] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      setSelectedVariant(product.variants[0] || null);
      setSelectedImage(product.image);
      setIsSubscription(false);
      setActiveTab('what');
    }
  }, [slug, product]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!product || !selectedVariant) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center bg-[#FAF8F5]">
        <Leaf className="w-16 h-16 text-[#8CAE92] mb-4 animate-bounce" />
        <h2 className="font-serif text-3xl font-bold text-[#1A331E] mb-2">Product Not Found</h2>
        <p className="text-stone-600 text-sm max-w-md mb-6">
          We couldn't find the botanical ritual product you were looking for. It may have been moved or renamed.
        </p>
        <Link
          to="/shop"
          className="px-6 py-3 rounded-full bg-[#1A331E] text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#2D5233] transition-colors shadow-md flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop Collection
        </Link>
      </div>
    );
  }

  const galleryImages = product.galleryImages && product.galleryImages.length > 0
    ? product.galleryImages
    : [product.image];

  const handleAdd = () => {
    onAddToCart(product, selectedVariant, isSubscription);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const finalPrice = isSubscription
    ? selectedVariant.price * 0.85
    : selectedVariant.price;

  // Cross sell products from same category or fallback to other products
  const crossSellProducts = PRODUCTS.filter((p) => p.id !== product.id && (p.category === product.category || p.category === 'Skin')).slice(0, 4);

  return (
    <div className="bg-[#FAF8F5] text-[#241C15] py-8 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 overflow-x-auto no-scrollbar pb-2">
          <Link to="/" className="hover:text-[#1A331E] transition-colors whitespace-nowrap">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
          <Link to="/shop" className="hover:text-[#1A331E] transition-colors whitespace-nowrap">Shop</Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
          <Link to={`/shop/${product.category}`} className="hover:text-[#1A331E] transition-colors whitespace-nowrap">
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
          <span className="font-semibold text-[#1A331E] truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* Main Product Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="aspect-square rounded-3xl overflow-hidden bg-white border border-stone-200 p-3 shadow-sm relative group">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              
              {/* Badges on main image */}
              <div className="absolute top-6 left-6 z-10 flex flex-col gap-1.5">
                {product.badge && (
                  <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#1A331E] text-xs font-bold border border-stone-200 shadow-md">
                    {product.badge}
                  </span>
                )}
                {product.isRefillable && (
                  <span className="px-3 py-1 rounded-full bg-[#2D5233] text-white text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-md">
                    <Leaf className="w-3.5 h-3.5" /> 100% Refillable
                  </span>
                )}
              </div>
            </div>

            {/* Gallery Thumbnail Strip */}
            {galleryImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      selectedImage === img
                        ? 'border-[#1A331E] ring-2 ring-[#1A331E]/20 scale-105 shadow-md'
                        : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}

            {/* Award Banner if present */}
            {product.award && (
              <div className="p-4 bg-[#E8F0EA] border border-[#2D5233]/20 rounded-2xl text-xs text-[#2D5233] flex items-center gap-3 font-semibold shadow-sm">
                <Award className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                <span>{product.award}</span>
              </div>
            )}
          </div>

          {/* Right Column: Product Info & Purchase Options */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Title, Category & Review Stars */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-[#1A331E] text-white">
                  {product.category}
                </span>
                {product.isVegan && (
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                    🌱 100% Vegan
                  </span>
                )}
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1A331E] leading-tight">
                {product.name}
              </h1>
              <p className="text-sm text-stone-600 font-medium">{product.subtitle}</p>

              {/* Rating Summary */}
              <div className="flex items-center gap-2 pt-1 text-sm text-stone-600">
                <div className="flex text-amber-400">
                  {'★'.repeat(Math.floor(product.rating))}
                </div>
                <span className="font-bold text-[#1A331E]">{product.rating}</span>
                <span className="text-stone-400">({product.reviewCount} verified reviews)</span>
              </div>
            </div>

            {/* Price & Discount display */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-sm flex items-center justify-between">
              <div>
                <span className="font-serif text-3xl font-bold text-[#1A331E]">
                  £{finalPrice.toFixed(2)}
                </span>
                {product.originalPrice && !isSubscription && (
                  <span className="text-sm text-stone-400 line-through ml-3 font-normal">
                    £{product.originalPrice.toFixed(2)}
                  </span>
                )}
                {isSubscription && (
                  <span className="text-xs text-[#2D5233] font-bold block mt-0.5">
                    (Saved 15% with subscription)
                  </span>
                )}
              </div>

              <span className="text-xs text-stone-500 font-medium bg-[#FAF8F5] px-3 py-1.5 rounded-full border border-stone-200">
                Free UK Delivery Included
              </span>
            </div>

            {/* Variant Selector */}
            <div className="space-y-3">
              <label className="text-xs uppercase font-bold tracking-wider text-stone-700 block">
                Select Size & Format:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.variants.map((v) => {
                  const isSelected = selectedVariant.id === v.id;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#1A331E] text-white border-[#1A331E] shadow-md scale-[1.01]'
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
                          <span className="text-[9px] bg-[#2D5233] text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                            Eco Refill
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Inline hint for refill paper bag variant */}
              {selectedVariant.type === 'refill_paper_bag' && (
                <p className="text-xs text-[#2D5233] bg-[#E8F0EA] p-3.5 rounded-2xl border border-[#2D5233]/20 flex items-start gap-2 font-medium">
                  <Leaf className="w-4 h-4 text-[#2D5233] flex-shrink-0 mt-0.5" />
                  <span>
                    New here? Grab the Full size first, then come back to top up with our 100% plastic-free paper refills.
                  </span>
                </p>
              )}
            </div>

            {/* Subscribe & Save Toggle */}
            <div className="p-4 rounded-2xl bg-[#E8F0EA] border border-stone-300 space-y-2">
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
              <p className="text-xs text-stone-600 font-light">
                {isSubscription
                  ? 'Delivered every 2 months. Pause, skip or cancel anytime with 1 click.'
                  : 'Select to auto-deliver your refill every 2 months and save 15% on every order. Pause, skip or cancel anytime.'}
              </p>
            </div>

            {/* Main Add to Basket & Wishlist Action Bar */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleAdd}
                disabled={addedToast}
                className="flex-1 py-4 px-8 rounded-full bg-[#1A331E] text-white font-semibold text-base hover:bg-[#2D5233] transition-all shadow-xl flex items-center justify-center gap-3"
              >
                {addedToast ? (
                  <>
                    <Check className="w-5 h-5 text-emerald-300" />
                    <span>Added to Basket!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add to Basket — £{finalPrice.toFixed(2)}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-14 h-14 rounded-full border border-stone-200 flex items-center justify-center transition-all shadow-md flex-shrink-0 ${
                  isInWishlist(product.id)
                    ? 'bg-rose-600 text-white border-rose-600'
                    : 'bg-white text-stone-700 hover:text-rose-600 hover:border-rose-300'
                }`}
                title={isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                aria-label={isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <Heart className={`w-6 h-6 ${isInWishlist(product.id) ? 'fill-white stroke-white' : ''}`} />
              </button>
            </div>

            {/* Trust Icon Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-center text-[11px] text-stone-600">
              <div className="p-3 rounded-2xl bg-white border border-stone-200 flex flex-col items-center gap-1">
                <Leaf className="w-4 h-4 text-[#2D5233]" />
                <span className="font-semibold">Plastic-Free</span>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-stone-200 flex flex-col items-center gap-1">
                <Heart className="w-4 h-4 text-[#2D5233]" />
                <span className="font-semibold">Cruelty-Free</span>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-stone-200 flex flex-col items-center gap-1">
                <Award className="w-4 h-4 text-[#2D5233]" />
                <span className="font-semibold">Handmade in UK</span>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-stone-200 flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#2D5233]" />
                <span className="font-semibold">100% Vegan</span>
              </div>
            </div>

            {/* Accordion Tabs */}
            <div className="pt-6 border-t border-stone-200">
              <div className="flex border-b border-stone-200 text-xs font-semibold gap-6">
                {(['what', 'why', 'how', 'ingredients'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 capitalize transition-colors ${
                      activeTab === tab
                        ? 'border-b-2 border-[#1A331E] text-[#1A331E] font-bold'
                        : 'text-stone-400 hover:text-stone-700'
                    }`}
                  >
                    {tab === 'what'
                      ? 'What It Is'
                      : tab === 'why'
                      ? 'Why It Works'
                      : tab === 'how'
                      ? 'How to Use'
                      : 'Full Ingredients List'}
                  </button>
                ))}
              </div>

              <div className="pt-4 text-xs text-stone-700 leading-relaxed min-h-[100px]">
                {activeTab === 'what' && <p className="text-sm leading-relaxed">{product.description}</p>}

                {activeTab === 'why' && (
                  <ul className="space-y-2">
                    {product.whyItWorks.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#2D5233] flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {activeTab === 'how' && (
                  <ol className="space-y-2">
                    {product.howToUse.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#1A331E] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                )}

                {activeTab === 'ingredients' && (
                  <div className="space-y-2 p-3 bg-white rounded-xl border border-stone-200">
                    <p className="font-bold text-[#1A331E]">Active Botanical Ingredients:</p>
                    <p className="italic text-stone-600">{product.ingredients.join(', ')}</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Static Customer Reviews Stub Section */}
        <section className="pt-12 border-t border-stone-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="font-serif text-3xl font-bold text-[#1A331E]">Customer Reviews</h3>
              <p className="text-xs text-stone-500">Based on {product.reviewCount} verified purchases</p>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-stone-200 shadow-sm">
              <div className="flex text-amber-400">
                {'★'.repeat(5)}
              </div>
              <span className="text-sm font-bold text-[#1A331E]">{product.rating} / 5.0</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-stone-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#1A331E]">Hannah M. — Verified Buyer</span>
                <div className="flex text-amber-400 text-xs">★★★★★</div>
              </div>
              <p className="text-xs text-stone-600 italic">
                "Absolutely love the {product.name}! Knowing it's 100% plastic-free makes my daily routine feel so clean and mindful."
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-stone-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#1A331E]">David K. — Verified Buyer</span>
                <div className="flex text-amber-400 text-xs">★★★★★</div>
              </div>
              <p className="text-xs text-stone-600 italic">
                "The paper bag refill system is so convenient. High quality natural formulation without the unnecessary water weight!"
              </p>
            </div>
          </div>
        </section>

        {/* Complete the Ritual Cross-Sell Section */}
        {crossSellProducts.length > 0 && (
          <section className="pt-12 border-t border-stone-200 space-y-6">
            <div className="space-y-1">
              <h3 className="font-serif text-3xl font-bold text-[#1A331E]">Complete the Ritual</h3>
              <p className="text-xs text-stone-500">Pair this product with these complementary botanical formulations</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {crossSellProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onQuickAdd={(item) => onAddToCart(item, item.variants[0], false)}
                />
              ))}
            </div>
          </section>
        )}

      </div>

      {/* Sticky Mobile Add to Basket Bar */}
      {showStickyBar && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md p-3 px-6 border-t border-stone-200 shadow-2xl flex items-center justify-between gap-4 animate-in slide-in-from-bottom duration-300">
          <div>
            <span className="font-serif text-base font-bold text-[#1A331E] block line-clamp-1">
              {product.name}
            </span>
            <span className="text-xs font-bold text-[#2D5233]">
              £{finalPrice.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleAdd}
            disabled={addedToast}
            className="py-2.5 px-6 rounded-full bg-[#1A331E] text-white font-semibold text-xs hover:bg-[#2D5233] transition-colors shadow-md flex items-center gap-2 flex-shrink-0"
          >
            {addedToast ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Basket</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
