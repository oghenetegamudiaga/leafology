import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight, ShieldCheck, Gift, Tag, Check, Sparkles, Truck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const navigate = useNavigate();
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(false);
  const [giftNote, setGiftNote] = useState('');
  const [showGiftNoteInput, setShowGiftNoteInput] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => {
    const itemPrice = item.isSubscription
      ? item.selectedVariant.price * 0.85
      : item.selectedVariant.price;
    return sum + itemPrice * item.quantity;
  }, 0);

  const discountAmount = appliedDiscount ? subtotal * 0.05 : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount);

  // Thresholds
  const discount55Threshold = 55;
  const freeGiftThreshold = 85;

  // Determine progress target & text
  let thresholdMessage = '';
  let progressPercentage = 100;

  if (subtotal < discount55Threshold) {
    const remaining = discount55Threshold - subtotal;
    progressPercentage = (subtotal / discount55Threshold) * 100;
    thresholdMessage = `Spend £${remaining.toFixed(2)} more for 5% off with code 555!`;
  } else if (subtotal < freeGiftThreshold) {
    const remaining = freeGiftThreshold - subtotal;
    progressPercentage = (subtotal / freeGiftThreshold) * 100;
    thresholdMessage = `Add £${remaining.toFixed(2)} more and we'll slip a free surprise into your parcel!`;
  } else {
    progressPercentage = 100;
    thresholdMessage = "🎉 Free surprise gift unlocked for your order!";
  }

  const handleApplyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (discountCode.trim() === '555' || discountCode.trim().toUpperCase() === 'LEAF10') {
      setAppliedDiscount(true);
    }
  };

  const handleProceedToCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  const handleShopBestsellers = () => {
    onClose();
    navigate('/shop');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="relative w-full max-w-md bg-[#FAF8F5] text-[#241C15] h-full shadow-2xl flex flex-col justify-between z-10 overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 bg-[#1A331E] text-[#FAF8F5] flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-emerald-300" />
                <h3 className="font-serif text-2xl font-bold">Your Basket</h3>
                <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full font-sans font-bold">
                  {cartItems.reduce((s, i) => s + i.quantity, 0)} items
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free UK Delivery & Threshold Progress Banner */}
            <div className="p-4 bg-[#E8F0EA] border-b border-stone-200 text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-[#2D5233]">
                <Truck className="w-4 h-4 text-[#2D5233]" />
                <span>You've got free UK delivery — always.</span>
              </div>

              <div className="flex items-center justify-between font-semibold text-[#1A331E]">
                <span className="flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-[#2D5233]" />
                  <span>{thresholdMessage}</span>
                </span>
                <span className="text-[11px] text-stone-500 font-bold">{progressPercentage.toFixed(0)}%</span>
              </div>

              <div className="w-full h-2 rounded-full bg-stone-300 overflow-hidden">
                <div
                  className="h-full bg-[#2D5233] transition-all duration-500 rounded-full"
                  style={{ width: `${Math.min(100, Math.max(5, progressPercentage))}%` }}
                />
              </div>
            </div>

            {/* Cart Items List or Empty State */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                  <div className="w-16 h-16 rounded-full bg-stone-200 flex items-center justify-center text-stone-400">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif text-xl font-bold text-[#1A331E]">
                      Your basket's feeling a little bare. Let's fix that.
                    </h4>
                    <p className="text-xs text-stone-500 max-w-xs">
                      Explore our handcrafted waterless powders, balms & eco paper refills.
                    </p>
                  </div>
                  <button
                    onClick={handleShopBestsellers}
                    className="px-6 py-2.5 rounded-full bg-[#1A331E] text-white font-semibold text-xs hover:bg-[#2D5233] transition-colors shadow-md"
                  >
                    Shop Bestsellers
                  </button>
                </div>
              ) : (
                cartItems.map((item) => {
                  const unitPrice = item.isSubscription
                    ? item.selectedVariant.price * 0.85
                    : item.selectedVariant.price;

                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm flex gap-4 items-center"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-xl object-cover bg-emerald-50 flex-shrink-0"
                        referrerPolicy="no-referrer"
                      />

                      <div className="flex-1 space-y-1">
                        <div className="flex items-start justify-between">
                          <h4 className="font-serif font-bold text-sm text-[#1A331E] line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-stone-400 hover:text-red-600 transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <p className="text-[11px] text-stone-500">
                          {item.selectedVariant.name}
                        </p>

                        {item.isSubscription && (
                          <span className="text-[9px] font-bold text-[#2D5233] bg-[#2D5233]/10 px-2 py-0.5 rounded-full inline-block">
                            Subscribe & Save (15% OFF)
                          </span>
                        )}

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2 border border-stone-200 rounded-lg px-2 py-0.5 bg-stone-50">
                            <button
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="text-stone-600 hover:text-black font-bold text-xs"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-[#1A331E]">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="text-stone-600 hover:text-black font-bold text-xs"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="font-bold text-sm text-[#1A331E]">
                            £{(unitPrice * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}

              {/* Gift Note Toggle */}
              {cartItems.length > 0 && (
                <div className="pt-2">
                  <button
                    onClick={() => setShowGiftNoteInput(!showGiftNoteInput)}
                    className="text-xs text-[#1A331E] font-semibold underline flex items-center gap-1.5"
                  >
                    <Gift className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{showGiftNoteInput ? 'Hide Gift Note' : '+ Add a handwritten gift note (Free)'}</span>
                  </button>

                  {showGiftNoteInput && (
                    <textarea
                      value={giftNote}
                      onChange={(e) => setGiftNote(e.target.value)}
                      placeholder="Add a gift note (optional) — we'll write it out by hand."
                      className="w-full mt-2 p-3 text-xs rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-[#1A331E]"
                      rows={3}
                    />
                  )}
                </div>
              )}
            </div>

            {/* Footer Summary & Checkout Button */}
            {cartItems.length > 0 && (
              <div className="p-6 bg-white border-t border-stone-200 space-y-4">
                
                {/* Promo Code Form */}
                <form onSubmit={handleApplyCode} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
                    <input
                      type="text"
                      placeholder="Promo code (e.g. 555)"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-[#1A331E]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1A331E] text-white text-xs font-semibold rounded-xl hover:bg-[#2D5233] transition-colors"
                  >
                    Apply
                  </button>
                </form>

                {appliedDiscount && (
                  <div className="flex items-center justify-between text-xs text-[#2D5233] bg-[#2D5233]/10 p-2 rounded-xl font-semibold">
                    <span>Discount Code Applied (5% Off)</span>
                    <span>-£{discountAmount.toFixed(2)}</span>
                  </div>
                )}

                {/* Subtotal Lines */}
                <div className="space-y-1.5 text-xs text-stone-600 pt-1">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#1A331E]">£{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>UK Shipping</span>
                    <span className="font-bold text-[#2D5233]">FREE</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#1A331E] pt-2 border-t border-stone-200">
                    <span>Total</span>
                    <span>£{finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button - Navigates to /checkout */}
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-4 rounded-full bg-[#1A331E] text-white font-semibold text-sm hover:bg-[#2D5233] transition-colors shadow-lg flex items-center justify-center gap-2 group"
                >
                  <span>Proceed to Secure Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-stone-400 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2D5233]" />
                  <span>Handcrafted in Oxfordshire · Plastic-Free Dispatch</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
