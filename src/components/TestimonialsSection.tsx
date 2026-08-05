import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote, CheckCircle2, ArrowRight } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  onOpenReviewsModal: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  onOpenReviewsModal,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="bg-[#FAF8F5] text-[#241C15] py-20 px-6 lg:px-12 border-b border-[#E8E2D7]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Navigation Arrows Top Left (Matching PNG Header) */}
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold">
            Customer Reviews
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full border border-stone-300 bg-white text-[#1A331E] flex items-center justify-center hover:bg-[#1A331E] hover:text-white transition-colors"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full bg-[#1A331E] text-white flex items-center justify-center hover:bg-[#2D5233] transition-colors"
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Testimonial Card Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Customer Photo */}
          <div className="lg:col-span-5 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-[#E8F0EA]"
              >
                <img
                  src={current.customerPhoto}
                  alt={current.customerName}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Bottom Left Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-between text-xs text-[#1A331E] border border-stone-200">
                  <span className="font-semibold">{current.customerName}</span>
                  <span className="text-stone-500 font-medium">Verified Buyer</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Large Quote Block */}
          <div className="lg:col-span-7 space-y-8 relative">
            
            {/* Quote Icon */}
            <div className="text-[#2D5233] opacity-90">
              <Quote className="w-16 h-16 sm:w-20 sm:h-20 stroke-[1.5]" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-[#1A331E]">
                  "{current.quote}"
                </h3>

                <div className="space-y-1 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-2xl font-bold text-[#1A331E]">
                      — {current.customerName}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-[#2D5233] font-semibold bg-[#2D5233]/10 px-2.5 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified Buyer
                    </span>
                  </div>
                  <p className="text-stone-500 text-xs font-medium">
                    Reviewed on product: <span className="text-[#1A331E] underline">{current.productName}</span> ({current.location})
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom Avatar Stack */}
            <div className="pt-8 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop"
                    alt="Reviewer"
                    className="w-9 h-9 rounded-full border-2 border-white object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=100&auto=format&fit=crop"
                    alt="Reviewer"
                    className="w-9 h-9 rounded-full border-2 border-white object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop"
                    alt="Reviewer"
                    className="w-9 h-9 rounded-full border-2 border-white object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="text-xs text-stone-600 space-y-0.5">
                  <p className="font-semibold text-[#1A331E]">They trusted us with their skin,</p>
                  <p className="text-stone-500">We're ready whenever you are.</p>
                </div>
              </div>

              <button
                onClick={onOpenReviewsModal}
                className="w-10 h-10 rounded-full bg-[#1A331E] text-white flex items-center justify-center hover:bg-[#2D5233] transition-colors self-start sm:self-auto"
                title="View All Reviews"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
