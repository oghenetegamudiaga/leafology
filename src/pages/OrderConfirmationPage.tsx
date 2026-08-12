import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { CheckCircle2, Package, MapPin, Gift, ArrowRight, ShieldCheck, Leaf } from 'lucide-react';
import { Order } from '../types';

export const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedOrdersRaw = localStorage.getItem('leafology_orders');
      if (storedOrdersRaw) {
        const orders: Order[] = JSON.parse(storedOrdersRaw);
        const found = orders.find((o) => o.id === orderId);
        if (found) {
          setOrder(found);
        }
      }
    } catch (err) {
      console.error('Error loading order confirmation:', err);
    } finally {
      setLoaded(true);
    }
  }, [orderId]);

  if (!loaded) {
    return <div className="min-h-[70vh] bg-[#FAF8F5]" />;
  }

  // If order not found, redirect to homepage gracefully
  if (!order) {
    return <Navigate to="/" replace />;
  }

  const formattedDate = new Date(order.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="bg-[#FAF8F5] text-[#241C15] py-12 px-4 sm:px-6 lg:px-12 min-h-[85vh]">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Main Success Banner */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/80 shadow-md text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#E8F0EA] text-[#2D5233] flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10 text-[#2D5233]" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-[#2D5233] uppercase tracking-widest block">
              Order Confirmed · #{order.id}
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1A331E]">
              Thank you — your order's in good hands.
            </h1>
            <p className="text-stone-600 text-sm max-w-lg mx-auto font-light leading-relaxed">
              We'll start hand-batching your order right away in Oxfordshire UK. You'll get a shipping confirmation email as soon as it's on its way.
            </p>
          </div>

          <div className="pt-2">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#1A331E] text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#2D5233] transition-colors shadow-lg"
            >
              <span>Keep Exploring</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Order Details & Summary Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-sm space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-100 pb-4 gap-2 text-xs">
            <div>
              <span className="text-stone-400 block font-medium">Order Reference</span>
              <span className="font-bold text-[#1A331E] text-sm">{order.id}</span>
            </div>
            <div className="sm:text-right">
              <span className="text-stone-400 block font-medium">Date Placed</span>
              <span className="font-bold text-stone-700">{formattedDate}</span>
            </div>
          </div>

          {/* Purchased Items */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#1A331E] flex items-center gap-2">
              <Package className="w-5 h-5 text-[#2D5233]" /> Order Items
            </h3>

            <div className="space-y-3 divide-y divide-stone-100">
              {order.items.map((item) => {
                const unitPrice = item.isSubscription
                  ? item.selectedVariant.price * 0.85
                  : item.selectedVariant.price;

                return (
                  <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-4 text-xs">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-14 h-14 rounded-xl object-cover bg-emerald-50 flex-shrink-0"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-[#1A331E] text-sm truncate">{item.product.name}</h4>
                      <p className="text-stone-500 text-xs">{item.selectedVariant.name}</p>
                      {item.isSubscription && (
                        <span className="text-[10px] text-[#2D5233] font-bold">
                          Subscribe & Save (15% OFF)
                        </span>
                      )}
                    </div>

                    <div className="text-right">
                      <span className="text-stone-500 text-xs block">Qty: {item.quantity}</span>
                      <span className="font-bold text-[#1A331E] text-sm">
                        £{(unitPrice * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pricing Totals */}
          <div className="pt-4 border-t border-stone-200 space-y-2 text-xs text-stone-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-[#1A331E]">£{order.subtotal.toFixed(2)}</span>
            </div>

            {order.discount > 0 && (
              <div className="flex justify-between text-[#2D5233] font-semibold">
                <span>Discount Applied</span>
                <span>-£{order.discount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>UK Royal Mail Shipping</span>
              <span className="font-bold text-[#2D5233]">FREE</span>
            </div>

            <div className="flex justify-between text-lg font-bold text-[#1A331E] pt-3 border-t border-stone-200">
              <span>Total Paid</span>
              <span>£{order.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Delivery & Gift Note Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-100 text-xs">
            
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-1">
              <span className="font-bold text-[#1A331E] flex items-center gap-1.5 mb-1">
                <MapPin className="w-4 h-4 text-[#2D5233]" /> Shipping Address
              </span>
              <p className="font-semibold text-stone-800">{order.shippingAddress.fullName}</p>
              <p className="text-stone-600">{order.shippingAddress.addressLine1}</p>
              {order.shippingAddress.addressLine2 && (
                <p className="text-stone-600">{order.shippingAddress.addressLine2}</p>
              )}
              <p className="text-stone-600">
                {order.shippingAddress.city}, {order.shippingAddress.postcode}
              </p>
              <p className="text-stone-600">{order.shippingAddress.country}</p>
            </div>

            {order.giftNote ? (
              <div className="p-4 rounded-2xl bg-[#E8F0EA] border border-[#2D5233]/20 space-y-1">
                <span className="font-bold text-[#1A331E] flex items-center gap-1.5 mb-1">
                  <Gift className="w-4 h-4 text-emerald-600" /> Handwritten Gift Note
                </span>
                <p className="text-stone-700 italic">"{order.giftNote}"</p>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 flex flex-col justify-center items-center text-center text-stone-400 space-y-1">
                <Leaf className="w-5 h-5 text-[#8CAE92]" />
                <span>Small batch fresh UK dispatch</span>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
