import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  ShoppingBag,
  ShieldCheck,
  CreditCard,
  Gift,
  Truck,
  Tag,
  Check,
  ArrowRight,
  Leaf,
  Lock
} from 'lucide-react';
import { CartItem, Order } from '../types';

interface CheckoutPageProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

// Zod validation schema for Shipping Address & Mock Payment
const checkoutSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
  addressLine1: z.string().min(5, 'Please enter your street address'),
  addressLine2: z.string().optional(),
  city: z.string().min(2, 'Please enter your city or town'),
  postcode: z.string().min(3, 'Please enter a valid UK postcode'),
  country: z.string().min(1, 'Country is required'),

  giftNote: z.string().optional(),

  // Mock payment fields validation
  cardName: z.string().min(2, 'Please enter cardholder name'),
  cardNumber: z.string().regex(/^[\d\s]{15,19}$/, 'Please enter a valid 16-digit card number'),
  cardExpiry: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'Format as MM/YY (e.g. 12/28)'),
  cardCvc: z.string().regex(/^\d{3,4}$/, 'CVC must be 3 or 4 digits'),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const navigate = useNavigate();
  const hasPlacedOrderRef = React.useRef<boolean>(false);

  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      country: 'United Kingdom',
    },
  });

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

  let thresholdMessage = '';
  let progressPercentage = 100;

  if (subtotal < discount55Threshold) {
    const remaining = discount55Threshold - subtotal;
    progressPercentage = (subtotal / discount55Threshold) * 100;
    thresholdMessage = `Spend £${remaining.toFixed(2)} more for 5% off with code 555!`;
  } else if (subtotal < freeGiftThreshold) {
    const remaining = freeGiftThreshold - subtotal;
    progressPercentage = (subtotal / freeGiftThreshold) * 100;
    thresholdMessage = `Add £${remaining.toFixed(2)} more for a free surprise gift in your parcel!`;
  } else {
    progressPercentage = 100;
    thresholdMessage = '🎉 Free surprise gift unlocked for your parcel!';
  }

  const handleApplyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (discountCode.trim() === '555' || discountCode.trim().toUpperCase() === 'LEAF10') {
      setAppliedDiscount(true);
    }
  };

  const onSubmitOrder = (data: CheckoutFormValues) => {
    hasPlacedOrderRef.current = true;

    // Construct order object
    const newOrder: Order = {
      id: `LEAF-${Date.now().toString().slice(-8)}`,
      createdAt: new Date().toISOString(),
      items: [...cartItems],
      shippingAddress: {
        fullName: data.fullName,
        email: data.email,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        city: data.city,
        postcode: data.postcode,
        country: data.country,
      },
      giftNote: data.giftNote,
      subtotal,
      discount: discountAmount,
      total: finalTotal,
    };

    // Save to localStorage under leafology_orders
    try {
      const existingOrdersRaw = localStorage.getItem('leafology_orders');
      const existingOrders: Order[] = existingOrdersRaw ? JSON.parse(existingOrdersRaw) : [];
      existingOrders.unshift(newOrder);
      localStorage.setItem('leafology_orders', JSON.stringify(existingOrders));
    } catch (err) {
      console.error('Failed to save order to localStorage:', err);
    }

    // Navigate first, then clear cart
    navigate(`/order-confirmation/${newOrder.id}`);
    onClearCart();
  };

  // If cart is empty and order wasn't just placed, render friendly empty state
  if (cartItems.length === 0 && !hasPlacedOrderRef.current) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center bg-[#FAF8F5]">
        <div className="w-20 h-20 rounded-full bg-stone-200 flex items-center justify-center text-stone-400 mb-4">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-[#1A331E] mb-2">
          Your basket's feeling a little bare. Let's fix that.
        </h2>
        <p className="text-stone-600 text-sm max-w-md mb-6 font-light">
          Discover our waterless botanical cleansers, solid butter balms & 100% plastic-free paper refills.
        </p>
        <Link
          to="/shop"
          className="px-8 py-3.5 rounded-full bg-[#1A331E] text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#2D5233] transition-colors shadow-lg"
        >
          Explore Shop Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F5] text-[#241C15] py-12 px-4 sm:px-6 lg:px-12 min-h-[85vh]">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="border-b border-stone-200 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-[#2D5233] uppercase tracking-wider">
              <Lock className="w-3.5 h-3.5" /> 256-Bit Encrypted Secure Checkout
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1A331E]">
              Checkout
            </h1>
          </div>
          <Link to="/shop" className="text-xs text-[#1A331E] font-bold hover:underline">
            ← Continue Shopping
          </Link>
        </div>

        {/* Main Grid: Left Form (Address & Payment), Right Summary */}
        <form onSubmit={handleSubmit(onSubmitOrder)} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Delivery Address, Gift Note & Payment */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* 1. Shipping Address Section */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
                <div className="w-8 h-8 rounded-full bg-[#1A331E] text-white text-xs font-bold flex items-center justify-center">
                  1
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#1A331E]">Shipping Address</h3>
                  <p className="text-xs text-stone-500">Free UK Royal Mail Tracked Delivery on all orders</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Full Name */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-stone-700 block">Full Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Sara Jahan"
                    {...register('fullName')}
                    className={`w-full p-3 text-xs rounded-xl border bg-[#FAF8F5] focus:bg-white focus:outline-none transition-all ${
                      errors.fullName ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-stone-200 focus:border-[#1A331E]'
                    }`}
                  />
                  {errors.fullName && (
                    <span className="text-[11px] font-semibold text-red-600 block">
                      {errors.fullName.message}
                    </span>
                  )}
                </div>

                {/* Email Address */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-stone-700 block">Email Address * (For order updates)</label>
                  <input
                    type="email"
                    placeholder="e.g. sara@example.co.uk"
                    {...register('email')}
                    className={`w-full p-3 text-xs rounded-xl border bg-[#FAF8F5] focus:bg-white focus:outline-none transition-all ${
                      errors.email ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-stone-200 focus:border-[#1A331E]'
                    }`}
                  />
                  {errors.email && (
                    <span className="text-[11px] font-semibold text-red-600 block">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                {/* Address Line 1 */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-stone-700 block">Street Address *</label>
                  <input
                    type="text"
                    placeholder="House number & street name"
                    {...register('addressLine1')}
                    className={`w-full p-3 text-xs rounded-xl border bg-[#FAF8F5] focus:bg-white focus:outline-none transition-all ${
                      errors.addressLine1 ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-stone-200 focus:border-[#1A331E]'
                    }`}
                  />
                  {errors.addressLine1 && (
                    <span className="text-[11px] font-semibold text-red-600 block">
                      {errors.addressLine1.message}
                    </span>
                  )}
                </div>

                {/* Address Line 2 */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-stone-700 block">Apartment, suite, unit (optional)</label>
                  <input
                    type="text"
                    placeholder="Flat 2B"
                    {...register('addressLine2')}
                    className="w-full p-3 text-xs rounded-xl border border-stone-200 bg-[#FAF8F5] focus:bg-white focus:border-[#1A331E] focus:outline-none transition-all"
                  />
                </div>

                {/* Town / City */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 block">Town / City *</label>
                  <input
                    type="text"
                    placeholder="e.g. Oxford"
                    {...register('city')}
                    className={`w-full p-3 text-xs rounded-xl border bg-[#FAF8F5] focus:bg-white focus:outline-none transition-all ${
                      errors.city ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-stone-200 focus:border-[#1A331E]'
                    }`}
                  />
                  {errors.city && (
                    <span className="text-[11px] font-semibold text-red-600 block">
                      {errors.city.message}
                    </span>
                  )}
                </div>

                {/* Postcode */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 block">Postcode *</label>
                  <input
                    type="text"
                    placeholder="e.g. OX1 2JD"
                    {...register('postcode')}
                    className={`w-full p-3 text-xs rounded-xl border bg-[#FAF8F5] focus:bg-white focus:outline-none transition-all ${
                      errors.postcode ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-stone-200 focus:border-[#1A331E]'
                    }`}
                  />
                  {errors.postcode && (
                    <span className="text-[11px] font-semibold text-red-600 block">
                      {errors.postcode.message}
                    </span>
                  )}
                </div>

                {/* Country */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-stone-700 block">Country</label>
                  <input
                    type="text"
                    readOnly
                    {...register('country')}
                    className="w-full p-3 text-xs rounded-xl border border-stone-200 bg-stone-100 font-semibold text-stone-600 cursor-not-allowed"
                  />
                </div>

              </div>
            </div>

            {/* 2. Optional Gift Note Section */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-[#1A331E]">
                <Gift className="w-5 h-5 text-emerald-600" />
                <h3 className="font-serif text-xl font-bold">Handwritten Gift Note (Optional)</h3>
              </div>
              <p className="text-xs text-stone-500 font-light">
                Add a gift note (optional) — we'll write it out by hand on recycled botanical card.
              </p>
              <textarea
                rows={3}
                placeholder="Write your custom gift message here..."
                {...register('giftNote')}
                className="w-full p-3.5 text-xs rounded-xl border border-stone-200 bg-[#FAF8F5] focus:bg-white focus:border-[#1A331E] focus:outline-none transition-all"
              />
            </div>

            {/* 3. Mock Payment Section */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
                <div className="w-8 h-8 rounded-full bg-[#1A331E] text-white text-xs font-bold flex items-center justify-center">
                  2
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#1A331E]">Payment Details</h3>
                  <p className="text-xs text-stone-500">Test Mock Payment Mode (No real charge will be made)</p>
                </div>
              </div>

              <div className="p-3 bg-[#E8F0EA] rounded-2xl border border-[#2D5233]/20 text-xs text-[#2D5233] font-semibold flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#2D5233] flex-shrink-0" />
                <span>Test Mode: Any valid 16-digit card number (e.g. 4242 4242 4242 4242) works!</span>
              </div>

              <div className="space-y-4">
                
                {/* Cardholder Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 block">Name on Card *</label>
                  <input
                    type="text"
                    placeholder="Sara Jahan"
                    {...register('cardName')}
                    className={`w-full p-3 text-xs rounded-xl border bg-[#FAF8F5] focus:bg-white focus:outline-none transition-all ${
                      errors.cardName ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-stone-200 focus:border-[#1A331E]'
                    }`}
                  />
                  {errors.cardName && (
                    <span className="text-[11px] font-semibold text-red-600 block">
                      {errors.cardName.message}
                    </span>
                  )}
                </div>

                {/* Card Number */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 block">Card Number *</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="4242 4242 4242 4242"
                      {...register('cardNumber')}
                      className={`w-full p-3 pl-11 text-xs rounded-xl border bg-[#FAF8F5] focus:bg-white focus:outline-none transition-all ${
                        errors.cardNumber ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-stone-200 focus:border-[#1A331E]'
                      }`}
                    />
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  </div>
                  {errors.cardNumber && (
                    <span className="text-[11px] font-semibold text-red-600 block">
                      {errors.cardNumber.message}
                    </span>
                  )}
                </div>

                {/* Expiry & CVC */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-700 block">Expiry Date *</label>
                    <input
                      type="text"
                      placeholder="MM/YY (e.g. 12/28)"
                      {...register('cardExpiry')}
                      className={`w-full p-3 text-xs rounded-xl border bg-[#FAF8F5] focus:bg-white focus:outline-none transition-all ${
                        errors.cardExpiry ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-stone-200 focus:border-[#1A331E]'
                      }`}
                    />
                    {errors.cardExpiry && (
                      <span className="text-[11px] font-semibold text-red-600 block">
                        {errors.cardExpiry.message}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-700 block">Security Code (CVC) *</label>
                    <input
                      type="text"
                      placeholder="123"
                      maxLength={4}
                      {...register('cardCvc')}
                      className={`w-full p-3 text-xs rounded-xl border bg-[#FAF8F5] focus:bg-white focus:outline-none transition-all ${
                        errors.cardCvc ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-stone-200 focus:border-[#1A331E]'
                      }`}
                    />
                    {errors.cardCvc && (
                      <span className="text-[11px] font-semibold text-red-600 block">
                        {errors.cardCvc.message}
                      </span>
                    )}
                  </div>
                </div>

              </div>
            </div>

            {/* Submit Place Order Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-8 rounded-full bg-[#1A331E] text-white font-semibold text-base hover:bg-[#2D5233] transition-all shadow-xl flex items-center justify-center gap-3 group"
            >
              <Lock className="w-5 h-5 text-emerald-300" />
              <span>Place Order — £{finalTotal.toFixed(2)}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

          </div>

          {/* Right Column: Order Summary & Thresholds Panel */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-sm space-y-6 sticky top-24">
              <h3 className="font-serif text-2xl font-bold text-[#1A331E] border-b border-stone-100 pb-3">
                Order Summary ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)
              </h3>

              {/* Threshold Progress Bar */}
              <div className="p-3.5 rounded-2xl bg-[#E8F0EA] border border-[#2D5233]/20 text-xs space-y-2">
                <div className="flex items-center gap-2 text-[#2D5233] font-bold">
                  <Truck className="w-4 h-4" />
                  <span>Free UK Delivery Always</span>
                </div>
                <p className="text-[11px] text-stone-700 font-semibold">{thresholdMessage}</p>
                <div className="w-full h-1.5 rounded-full bg-stone-300 overflow-hidden">
                  <div
                    className="h-full bg-[#2D5233] transition-all duration-500 rounded-full"
                    style={{ width: `${Math.min(100, Math.max(5, progressPercentage))}%` }}
                  />
                </div>
              </div>

              {/* Line Items List */}
              <div className="space-y-4 max-h-[320px] overflow-y-auto pr-1 no-scrollbar">
                {cartItems.map((item) => {
                  const unitPrice = item.isSubscription
                    ? item.selectedVariant.price * 0.85
                    : item.selectedVariant.price;

                  return (
                    <div key={item.id} className="flex items-center gap-3 text-xs">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-14 h-14 rounded-xl object-cover bg-stone-50 flex-shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-[#1A331E] truncate">{item.product.name}</h4>
                        <p className="text-stone-500 text-[11px] truncate">{item.selectedVariant.name}</p>
                        <span className="text-stone-400 text-[10px]">Qty: {item.quantity}</span>
                      </div>
                      <span className="font-bold text-[#1A331E]">
                        £{(unitPrice * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Promo Code Entry */}
              <div className="pt-3 border-t border-stone-100">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code (e.g. 555)"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-[#1A331E]"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCode}
                    className="px-4 py-2.5 bg-[#1A331E] text-white text-xs font-semibold rounded-xl hover:bg-[#2D5233] transition-colors flex-shrink-0"
                  >
                    Apply
                  </button>
                </div>
                {appliedDiscount && (
                  <p className="text-[11px] font-bold text-[#2D5233] mt-2 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Code 555 applied (5% discount!)
                  </p>
                )}
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-2 text-xs text-stone-600 pt-3 border-t border-stone-200">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#1A331E]">£{subtotal.toFixed(2)}</span>
                </div>

                {appliedDiscount && (
                  <div className="flex justify-between text-[#2D5233] font-semibold">
                    <span>Discount (5% OFF)</span>
                    <span>-£{discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>UK Royal Mail Shipping</span>
                  <span className="font-bold text-[#2D5233]">FREE</span>
                </div>

                <div className="flex justify-between text-lg font-bold text-[#1A331E] pt-3 border-t border-stone-200">
                  <span>Total Due</span>
                  <span>£{finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-stone-200 text-[11px] text-stone-500 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#1A331E]">
                  <ShieldCheck className="w-4 h-4 text-[#2D5233]" />
                  <span>Leafology Promise</span>
                </div>
                <p>Hand-batched in small fresh runs in Oxfordshire UK. 100% plastic-free dispatch.</p>
              </div>

            </div>

          </div>

        </form>

      </div>
    </div>
  );
};
