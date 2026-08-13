import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroSection } from '../components/HeroSection';
import { KeyAdvantages } from '../components/KeyAdvantages';
import { BestSellers } from '../components/BestSellers';
import { RefillExplainer } from '../components/RefillExplainer';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { BlogSection } from '../components/BlogSection';

import { PRODUCTS, TESTIMONIALS, BLOG_POSTS } from '../data/mockData';
import { Category, Product, Variant } from '../types';

interface HomePageProps {
  onAddToCart: (product: Product, variant: Variant, isSubscription: boolean) => void;
  onOpenStory: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onAddToCart, onOpenStory }) => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const handleQuickAdd = (product: Product) => {
    onAddToCart(product, product.variants[0], false);
  };

  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        onShopClick={() => navigate('/shop')}
        onExploreClick={() => navigate('/shop/Skin')}
        onSelectProduct={(product) => navigate(`/product/${product.slug}`)}
        heroProduct={PRODUCTS[0]}
      />

      {/* Key Advantages Section */}
      <KeyAdvantages
        onExploreClick={() => navigate('/shop')}
      />

      {/* Best Sellers Carousel Section */}
      <BestSellers
        products={PRODUCTS}
        onQuickAdd={handleQuickAdd}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* Zero-Waste Refill Explainer Section */}
      <RefillExplainer
        onOpenRefills={() => navigate('/refills')}
      />

      {/* Testimonials Section */}
      <TestimonialsSection
        testimonials={TESTIMONIALS}
        onOpenReviewsModal={() => navigate('/our-story')}
      />

      {/* Blog Section */}
      <BlogSection
        posts={BLOG_POSTS}
      />
    </div>
  );
};
