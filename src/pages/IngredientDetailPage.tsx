import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ChevronRight, Leaf, Check, ArrowLeft, Sparkles, Package } from 'lucide-react';
import { INGREDIENTS, PRODUCTS } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { slugifyIngredient } from './IngredientGlossaryPage';
import { Product } from '../types';

interface IngredientDetailPageProps {
  onAddToCart?: (product: Product, variant: any, isSubscription: boolean) => void;
}

export const IngredientDetailPage: React.FC<IngredientDetailPageProps> = ({ onAddToCart }) => {
  const { slug } = useParams<{ slug: string }>();

  const ingredient = INGREDIENTS.find(
    (ing) => slugifyIngredient(ing.commonName) === slug || ing.id === slug
  );

  if (!ingredient) {
    return <Navigate to="/ingredients" replace />;
  }

  // Find products that contain this ingredient
  const matchingProducts = PRODUCTS.filter((product) =>
    ingredient.foundInProducts.some((pName) =>
      product.name.toLowerCase().includes(pName.toLowerCase()) ||
      pName.toLowerCase().includes(product.name.toLowerCase())
    )
  );

  return (
    <div className="bg-[#FAF8F5] text-[#241C15] py-10 px-4 sm:px-6 lg:px-12 min-h-[85vh]">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 overflow-x-auto no-scrollbar">
          <Link to="/" className="hover:text-[#1A331E] transition-colors whitespace-nowrap">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
          <Link to="/ingredients" className="hover:text-[#1A331E] transition-colors whitespace-nowrap">Ingredients</Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
          <span className="font-semibold text-[#1A331E] truncate max-w-[240px]">{ingredient.commonName}</span>
        </nav>

        {/* Back Link */}
        <Link
          to="/ingredients"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#2D5233] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Ingredient Glossary
        </Link>

        {/* Main Ingredient Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-md space-y-8">
          
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8F0EA] text-[#2D5233] text-xs font-bold uppercase tracking-wider">
              <Leaf className="w-3.5 h-3.5" /> Botanical Active Detail
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1A331E]">
              {ingredient.commonName}
            </h1>

            <p className="font-serif italic text-lg text-[#2D5233] font-semibold">
              Botanical Name: {ingredient.botanicalName}
            </p>
          </div>

          {/* Description */}
          <div className="space-y-3 text-stone-700 text-sm sm:text-base font-light leading-relaxed border-t border-stone-100 pt-6">
            <h3 className="font-serif text-xl font-bold text-[#1A331E]">Origin & Properties</h3>
            <p>{ingredient.description}</p>
          </div>

          {/* Key Benefits Checklist */}
          <div className="space-y-4 border-t border-stone-100 pt-6">
            <h3 className="font-serif text-xl font-bold text-[#1A331E]">Key Skin & Hair Benefits</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ingredient.benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#E8F0EA] border border-[#2D5233]/20 text-xs font-semibold text-[#1A331E] flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-[#2D5233] text-white flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Found in Products Section */}
        <div className="space-y-6 pt-4">
          <div className="space-y-1">
            <h3 className="font-serif text-2xl font-bold text-[#1A331E] flex items-center gap-2">
              <Package className="w-5 h-5 text-[#2D5233]" /> Formulated In These Rituals
            </h3>
            <p className="text-xs text-stone-500 font-light">
              Explore the handcrafted Leafology skincare and haircare rituals featuring {ingredient.commonName}.
            </p>
          </div>

          {matchingProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {matchingProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onQuickAdd={onAddToCart ? (p) => onAddToCart(p, p.variants[0], false) : undefined}
                />
              ))}
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-white border border-stone-200 text-xs text-stone-600 space-y-2">
              <p className="font-semibold text-[#1A331E]">Featured in products across our collection:</p>
              <ul className="list-disc list-inside space-y-1 text-stone-500">
                {ingredient.foundInProducts.map((name, i) => (
                  <li key={i}>{name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
