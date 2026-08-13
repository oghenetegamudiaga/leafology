import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ChevronRight, Calendar, Clock, User, ArrowLeft, Share2, Sparkles, BookOpen } from 'lucide-react';
import { BLOG_POSTS, PRODUCTS } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';

interface JournalPostPageProps {
  onAddToCart?: (product: Product, variant: any, isSubscription: boolean) => void;
}

export const JournalPostPage: React.FC<JournalPostPageProps> = ({ onAddToCart }) => {
  const { slug } = useParams<{ slug: string }>();

  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/journal" replace />;
  }

  // Related posts (excluding current post)
  const relatedPosts = BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 2);

  // Recommended products based on article theme
  const recommendedProducts = post.category === 'Hair Care'
    ? PRODUCTS.filter((p) => p.category === 'Hair')
    : PRODUCTS.filter((p) => p.category === 'Skin' || p.category === 'Refills').slice(0, 2);

  return (
    <div className="bg-[#FAF8F5] text-[#241C15] py-10 px-4 sm:px-6 lg:px-12 min-h-[85vh]">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 overflow-x-auto no-scrollbar">
          <Link to="/" className="hover:text-[#1A331E] transition-colors whitespace-nowrap">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
          <Link to="/journal" className="hover:text-[#1A331E] transition-colors whitespace-nowrap">Journal</Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
          <span className="font-semibold text-[#1A331E] truncate max-w-[240px]">{post.title}</span>
        </nav>

        {/* Back Link */}
        <Link
          to="/journal"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#2D5233] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Journal Overview
        </Link>

        {/* Article Container */}
        <article className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-md space-y-8">
          
          {/* Article Header Meta */}
          <div className="space-y-4 text-center sm:text-left">
            <span className="px-3.5 py-1 rounded-full bg-[#E8F0EA] text-[#2D5233] text-xs font-bold uppercase tracking-wider inline-block">
              {post.category}
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A331E] leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-stone-500 font-medium pt-2 border-t border-b border-stone-100 py-3">
              <span className="flex items-center gap-1.5 text-[#1A331E] font-bold">
                <User className="w-4 h-4 text-[#2D5233]" /> By {post.author}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" /> {post.date}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> {post.readTime}
              </span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-stone-100 shadow-sm border border-stone-200">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Main Article Content */}
          <div className="prose prose-stone max-w-none space-y-5 text-sm sm:text-base text-stone-700 font-light leading-relaxed">
            <p className="font-serif text-lg text-[#1A331E] font-medium leading-relaxed italic border-l-4 border-[#2D5233] pl-4 py-1">
              "{post.excerpt}"
            </p>

            <p>{post.content}</p>

            <p>
              When we formulate products in our Oxfordshire studio, our highest priority is protecting the natural skin & hair micro-biome. Traditional commercial cosmetics contain up to 80% water, which necessitates strong chemical preservatives to prevent mold and bacterial breakdown. By contrast, waterless dry botanical powders stay naturally fresh and active without harsh additives.
            </p>

            <h3 className="font-serif text-2xl font-bold text-[#1A331E] pt-4">
              How Waterless Powder Formulations Work
            </h3>

            <p>
              When you activate a dry powder cleanser or tea scalp paste with warm water in your hand right before use, you are unleashing 100% fresh, undiluted botanical active ingredients. You get maximum potency, zero synthetic liquid preservatives, and lightweight shipping that dramatically cuts carbon output.
            </p>

            <div className="p-6 rounded-2xl bg-[#E8F0EA] border border-[#2D5233]/20 space-y-2">
              <h4 className="font-serif font-bold text-base text-[#1A331E] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#2D5233]" /> Key Takeaway for Your Daily Routine
              </h4>
              <p className="text-xs text-stone-700 font-normal leading-relaxed">
                By purchasing durable aluminium vessels once and topping up with 100% plastic-free paper refills, you reduce plastic packaging waste to zero while giving your skin purer, fresher ingredients.
              </p>
            </div>
          </div>

          {/* Article Footer & Share */}
          <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-stone-500">
              Published by Leafology Studio · Oxfordshire, UK
            </span>
            <Link
              to="/journal"
              className="px-6 py-2.5 rounded-full bg-[#1A331E] text-white font-semibold text-xs hover:bg-[#2D5233] transition-colors"
            >
              Explore More Journal Articles
            </Link>
          </div>

        </article>

        {/* Related Botanical Ritual Products */}
        {recommendedProducts.length > 0 && (
          <div className="space-y-6 pt-4">
            <h3 className="font-serif text-2xl font-bold text-[#1A331E]">
              Featured Botanical Rituals Mentioned
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {recommendedProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onQuickAdd={onAddToCart ? (p) => onAddToCart(p, p.variants[0], false) : undefined}
                />
              ))}
            </div>
          </div>
        )}

        {/* More Articles Section */}
        {relatedPosts.length > 0 && (
          <div className="space-y-6 pt-4 border-t border-stone-200">
            <h3 className="font-serif text-2xl font-bold text-[#1A331E]">
              Continue Reading
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((relPost) => (
                <div key={relPost.id} className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm flex gap-4 items-center">
                  <img
                    src={relPost.image}
                    alt={relPost.title}
                    className="w-20 h-20 rounded-2xl object-cover bg-stone-100 flex-shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#2D5233] uppercase">
                      {relPost.category}
                    </span>
                    <h4 className="font-serif font-bold text-sm text-[#1A331E] line-clamp-2 leading-snug">
                      <Link to={`/journal/${relPost.slug}`}>{relPost.title}</Link>
                    </h4>
                    <Link
                      to={`/journal/${relPost.slug}`}
                      className="text-xs text-[#2D5233] font-bold hover:underline inline-block pt-1"
                    >
                      Read Article →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
