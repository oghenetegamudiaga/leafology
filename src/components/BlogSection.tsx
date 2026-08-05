import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Calendar, Clock, BookOpen, X } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogSectionProps {
  posts: BlogPost[];
}

export const BlogSection: React.FC<BlogSectionProps> = ({ posts }) => {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  return (
    <section className="bg-[#FAF8F5] text-[#241C15] py-20 px-6 lg:px-12 border-b border-[#E8E2D7]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1A331E]">
            Skin Care <span className="font-serif italic text-[#2D5233]">Tips & Trends</span>
          </h2>
          <p className="text-stone-600 text-sm max-w-md mx-auto">
            Ingredient guides, zero-waste packaging tips, and botanical skincare wisdom from our Oxfordshire studio.
          </p>
        </div>

        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              onClick={() => setActivePost(post)}
              className="bg-white rounded-3xl p-4 border border-stone-200 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Image Container with Floating Arrow Top Right */}
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-stone-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Floating Arrow Badge */}
                  <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-[#1A331E] flex items-center justify-center shadow-md group-hover:bg-[#1A331E] group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Metadata Row (Date & Read Time) */}
                <div className="flex items-center gap-4 text-xs text-stone-400 font-medium px-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" /> {post.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-stone-400" /> {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl font-bold text-[#1A331E] leading-snug group-hover:text-[#2D5233] transition-colors px-1">
                  {post.title}
                </h3>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 px-1 text-xs font-semibold text-[#2D5233] flex items-center gap-1 group-hover:underline">
                Read Article →
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Blog Article Reader Modal */}
      {activePost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-3xl bg-[#FAF8F5] rounded-3xl p-6 sm:p-10 text-[#1A331E] shadow-2xl overflow-y-auto max-h-[90vh] border border-stone-300"
          >
            <button
              onClick={() => setActivePost(null)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-stone-200 flex items-center justify-center hover:bg-stone-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D5233]/10 text-[#2D5233] text-xs font-semibold uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" /> {activePost.category}
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A331E]">
                {activePost.title}
              </h2>

              <div className="flex items-center gap-4 text-xs text-stone-500 border-b border-stone-200 pb-4">
                <span>By {activePost.author}</span>
                <span>•</span>
                <span>{activePost.date}</span>
                <span>•</span>
                <span>{activePost.readTime}</span>
              </div>

              <div className="aspect-video rounded-2xl overflow-hidden">
                <img
                  src={activePost.image}
                  alt={activePost.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="prose prose-stone max-w-none text-stone-700 leading-relaxed space-y-4">
                <p className="font-serif text-lg italic text-[#1A331E] border-l-4 border-[#2D5233] pl-4">
                  "{activePost.excerpt}"
                </p>
                <p>{activePost.content}</p>
                <p>
                  Every Leafology formula is created with pure plant wisdom, waterless dry powder bases, and zero synthetic fillers. Thank you for caring for your skin and the planet simultaneously.
                </p>
              </div>

              <div className="pt-6 border-t border-stone-200 flex justify-end">
                <button
                  onClick={() => setActivePost(null)}
                  className="px-6 py-2.5 rounded-full bg-[#1A331E] text-white font-semibold text-xs hover:bg-[#2D5233]"
                >
                  Close Article
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};
