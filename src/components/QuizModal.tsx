import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Check, ArrowRight, RotateCcw, ShieldCheck, Heart } from 'lucide-react';
import { QUIZ_QUESTIONS, PRODUCTS } from '../data/mockData';
import { Product } from '../types';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, onSelectProduct }) => {
  if (!isOpen) return null;

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const question = QUIZ_QUESTIONS[currentStep];

  const handleSelectOption = (value: string) => {
    const updated = { ...answers, [currentStep]: value };
    setAnswers(updated);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  // Match products based on quiz answers
  const matchedCategory = answers[0] || 'Skin';
  const recommendedProducts = PRODUCTS.filter(
    (p) => p.category === matchedCategory || p.concern.some((c) => c.includes(answers[1] || ''))
  ).slice(0, 3);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-3xl p-6 sm:p-10 text-[#241C15] shadow-2xl border border-stone-300 overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-9 h-9 rounded-full bg-stone-200 hover:bg-[#1A331E] hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!showResults ? (
            <div className="space-y-8">
              {/* Quiz Step Indicator */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-stone-500">
                  <span className="flex items-center gap-1.5 text-[#2D5233]">
                    <Sparkles className="w-4 h-4 text-emerald-500" /> Leafology Routine Finder
                  </span>
                  <span>Step {currentStep + 1} of {QUIZ_QUESTIONS.length}</span>
                </div>

                <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#1A331E] transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Header */}
              <div className="space-y-2">
                <h3 className="font-serif text-3xl font-bold text-[#1A331E]">
                  {question.title}
                </h3>
                <p className="text-xs text-stone-600">{question.subtitle}</p>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {question.options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleSelectOption(opt.value)}
                    className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-[#1A331E] hover:shadow-md transition-all text-left space-y-1 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-lg text-[#1A331E] group-hover:text-[#2D5233]">
                        {opt.label}
                      </span>
                      <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 group-hover:text-[#1A331E] transition-all" />
                    </div>
                    <p className="text-xs text-stone-500 font-normal">{opt.description}</p>
                  </button>
                ))}
              </div>

              {/* Back button if step > 0 */}
              {currentStep > 0 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="text-xs text-stone-500 hover:text-stone-800 underline font-semibold"
                >
                  ← Previous Question
                </button>
              )}
            </div>
          ) : (
            /* Quiz Results View */
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-[#2D5233] text-white flex items-center justify-center mx-auto shadow-md">
                  <Sparkles className="w-6 h-6 text-emerald-300" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-[#1A331E]">
                  Your Tailored Leafology Ritual
                </h3>
                <p className="text-xs text-stone-600 max-w-md mx-auto">
                  Based on your answers, our Oxfordshire formulator recommends these handcrafted plant formulas:
                </p>
              </div>

              {/* Recommended Product Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {recommendedProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onSelectProduct(p);
                      onClose();
                    }}
                    className="p-3 bg-white rounded-2xl border border-stone-200 hover:border-[#1A331E] transition-all cursor-pointer space-y-2 group shadow-sm"
                  >
                    <div className="aspect-square rounded-xl bg-stone-100 overflow-hidden">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                    </div>
                    <h4 className="font-serif font-bold text-sm text-[#1A331E] line-clamp-1 group-hover:text-[#2D5233]">
                      {p.name}
                    </h4>
                    <p className="text-[11px] text-stone-500 font-bold">£{p.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-stone-200">
                <button
                  onClick={resetQuiz}
                  className="text-xs text-stone-500 hover:text-stone-800 underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Retake Quiz
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-[#1A331E] text-white text-xs font-semibold hover:bg-[#2D5233]"
                >
                  Close & Explore Store
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
