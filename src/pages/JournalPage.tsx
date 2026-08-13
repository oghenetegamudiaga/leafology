import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { BookOpen, Calendar, Clock, User, ArrowRight, Sparkles, Tag } from 'lucide-react';
import { BLOG_POSTS } from '../data/mockData';

export const JournalPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Skin Education', 'Sustainability', 'Hair Care'];

  const filteredPosts = selectedCategory === 'All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter((post) => post.category === selectedCategory);

  const featuredPost = BLOG_POSTS[0];

  return (
    <div className="bg-[#FAF8F5] text-[#241C15] py-12 px-4 sm:px-6 lg:px-12 min-h-[85vh]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F0EA] border border-[#2D5233]/20 text-[#2D5233] text-xs font-bold uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5 text-[#2D5233]" /> Leafology Botanical Journal
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A331E]">
            Plant Science, Waterless Beauty & Sustainable Rituals
          </h1>
          <p className="text-stone-600 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed">
            Honest insights from our Oxfordshire studio on plastic-free skincare, waterless formulations, and ancient botanical traditions.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 flex-wrap border-b border-stone-200 pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#1A331E] text-white shadow-md'
                  : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post Hero Banner (Shown when 'All' is selected) */}
        {selectedCategory === 'All' && featuredPost && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 aspect-[16/10] rounded-2xl overflow-hidden bg-stone-100">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-3 text-xs text-stone-500 font-medium">
                <span className="px-3 py-1 rounded-full bg-[#E8F0EA] text-[#2D5233] font-bold text-[11px]">
                  Featured Article
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {featuredPost.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {featuredPost.readTime}
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A331E] hover:text-[#2D5233] transition-colors leading-tight">
                <Link to={`/journal/${featuredPost.slug}`}>{featuredPost.title}</Link>
              </h2>

              <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed">
                {featuredPost.excerpt}
              </p>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-500 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#2D5233]" /> By {featuredPost.author}
                </span>
                <Link
                  to={`/journal/${featuredPost.slug}`}
                  className="px-6 py-2.5 rounded-full bg-[#1A331E] text-white font-semibold text-xs hover:bg-[#2D5233] transition-colors flex items-center gap-2 group"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="space-y-6">
          <h3 className="font-serif text-2xl font-bold text-[#1A331E]">
            {selectedCategory === 'All' ? 'All Journal Articles' : `${selectedCategory} Articles`}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <motion.article
                key={post.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl p-5 border border-stone-200/80 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-stone-100 relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#1A331E] text-[10px] font-bold border border-stone-200">
                      {post.category}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-[11px] text-stone-400 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {post.date}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {post.readTime}
                      </span>
                    </div>

                    <h4 className="font-serif text-xl font-bold text-[#1A331E] group-hover:text-[#2D5233] transition-colors leading-snug line-clamp-2">
                      <Link to={`/journal/${post.slug}`}>{post.title}</Link>
                    </h4>

                    <p className="text-stone-500 text-xs font-light line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-stone-500 flex items-center gap-1">
                    <User className="w-3 h-3 text-[#2D5233]" /> {post.author}
                  </span>
                  <Link
                    to={`/journal/${post.slug}`}
                    className="text-xs font-bold text-[#2D5233] group-hover:underline flex items-center gap-1"
                  >
                    Read Story →
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
