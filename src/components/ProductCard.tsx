import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Plus, Star, Leaf, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onQuickAdd?: (product: Product) => void;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickAdd,
  className = '',
}) => {
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);

  const handleCardClick = () => {
    navigate(`/product/${product.slug}`);
  };

  const handleQuickAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onQuickAdd) {
      onQuickAdd(product);
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      onClick={handleCardClick}
      className={`bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl border border-stone-200/80 transition-all cursor-pointer flex flex-col justify-between group ${className}`}
    >
      <div>
        {/* Image Container with Badges & Quick Add (+) Button */}
        <div className="relative aspect-square rounded-2xl bg-[#F4F8F5] overflow-hidden mb-4 p-4 flex items-center justify-center">
          
          {/* Top Left Badges */}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
            {product.badge && (
              <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#1A331E] text-[10px] font-semibold border border-stone-200 shadow-sm">
                {product.badge}
              </span>
            )}
            {product.isRefillable && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#2D5233] text-white text-[9px] font-bold tracking-wider uppercase flex items-center gap-1">
                <Leaf className="w-2.5 h-2.5" /> Refillable
              </span>
            )}
          </div>

          {/* Quick Add (+) Button */}
          {onQuickAdd && (
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={handleQuickAddClick}
              className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all ${
                added
                  ? 'bg-[#2D5233] text-white'
                  : 'bg-[#1A331E] text-white hover:bg-[#2D5233]'
              }`}
              title="Quick Add to Basket"
            >
              {added ? (
                <Check className="w-4 h-4 text-white" />
              ) : (
                <Plus className="w-4 h-4 text-white" />
              )}
            </motion.button>
          )}

          {/* Product Image */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-amber-500 text-xs">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-stone-800">{product.rating}</span>
            <span className="text-stone-400 text-[11px]">({product.reviewCount})</span>
          </div>

          <h3 className="font-serif text-xl font-bold text-[#1A331E] leading-tight group-hover:text-[#2D5233] transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-stone-500 text-xs line-clamp-1 font-light">
            {product.subtitle}
          </p>
        </div>
      </div>

      {/* Price & Action Link */}
      <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
        <div>
          <span className="font-sans font-bold text-lg text-[#1A331E]">
            £{product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-stone-400 line-through ml-2 font-normal">
              £{product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <span className="text-xs font-semibold text-[#2D5233] group-hover:underline flex items-center gap-1">
          View Ritual →
        </span>
      </div>
    </motion.div>
  );
};
