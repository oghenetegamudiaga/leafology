import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import {
  User as UserIcon,
  LogOut,
  Package,
  Heart,
  RefreshCw,
  ArrowRight,
  Leaf,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { PRODUCTS } from '../data/mockData';
import { Order, Product, CartItem } from '../types';
import { ProductCard } from '../components/ProductCard';

interface AccountPageProps {
  onAddToCart: (product: Product, variant: any, isSubscription: boolean) => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({ onAddToCart }) => {
  const { user, logout } = useAuth();
  const { wishlist, removeFromWishlist } = useWishlist();

  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'subscriptions'>('orders');

  // If not logged in, redirect to /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Load orders from localStorage
  useEffect(() => {
    try {
      const storedOrdersRaw = localStorage.getItem('leafology_orders');
      if (storedOrdersRaw) {
        const parsedOrders: Order[] = JSON.parse(storedOrdersRaw);
        setOrders(parsedOrders);
      }
    } catch (err) {
      console.error('Failed to load orders for account page:', err);
    }
  }, []);

  // Filter wishlist products
  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  // Extract all historical subscription items from orders
  const subscriptionItems: { product: Product; variantName: string; orderId: string; date: string }[] = [];
  orders.forEach((o) => {
    o.items?.forEach((item) => {
      if (item.isSubscription) {
        subscriptionItems.push({
          product: item.product,
          variantName: item.selectedVariant.name,
          orderId: o.id,
          date: o.createdAt,
        });
      }
    });
  });

  return (
    <div className="bg-[#FAF8F5] text-[#241C15] py-12 px-4 sm:px-6 lg:px-12 min-h-[85vh]">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Welcome Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#1A331E] text-white flex items-center justify-center font-serif text-2xl font-bold border-2 border-emerald-300 shadow-md">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="space-y-0.5">
              <span className="text-xs uppercase font-bold tracking-widest text-[#2D5233] block">
                Leafology Community Member
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A331E]">
                Welcome back, {user.name}
              </h1>
              <p className="text-xs text-stone-500 font-medium">{user.email}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="px-5 py-2.5 rounded-full border border-stone-300 hover:bg-stone-100 text-stone-700 font-semibold text-xs transition-colors flex items-center gap-2"
          >
            <LogOut className="w-4 h-4 text-stone-500" />
            <span>Log Out</span>
          </button>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-3 border-b border-stone-200 pb-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'orders'
                ? 'bg-[#1A331E] text-white shadow-md'
                : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-400'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Order History ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'wishlist'
                ? 'bg-[#1A331E] text-white shadow-md'
                : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-400'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>My Wishlist ({wishlistProducts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('subscriptions')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'subscriptions'
                ? 'bg-[#1A331E] text-white shadow-md'
                : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-400'
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            <span>Subscriptions ({subscriptionItems.length})</span>
          </button>
        </div>

        {/* SECTION 1: ORDER HISTORY */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-[#1A331E]">Your Past Orders</h2>

            {orders.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-stone-200/80 max-w-lg mx-auto space-y-4 shadow-sm">
                <Package className="w-12 h-12 text-stone-300 mx-auto" />
                <h3 className="font-serif text-2xl font-bold text-[#1A331E]">No Orders Placed Yet</h3>
                <p className="text-xs text-stone-600">
                  You haven't placed any orders yet. Discover our fresh small-batch rituals and plastic-free paper refills!
                </p>
                <Link
                  to="/shop"
                  className="inline-block px-6 py-2.5 rounded-full bg-[#1A331E] text-white font-semibold text-xs hover:bg-[#2D5233] transition-colors"
                >
                  Explore Shop Collection
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-sm space-y-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-100 pb-3 gap-2 text-xs">
                      <div>
                        <span className="font-bold text-[#1A331E] text-sm">Order #{order.id}</span>
                        <span className="text-stone-400 block text-[11px]">
                          Placed on {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-bold text-sm text-[#1A331E]">
                          Total: £{order.total.toFixed(2)}
                        </span>
                        <Link
                          to={`/order-confirmation/${order.id}`}
                          className="px-4 py-2 rounded-full bg-[#FAF8F5] border border-stone-200 text-[#1A331E] font-semibold text-xs hover:bg-[#1A331E] hover:text-white transition-colors flex items-center gap-1"
                        >
                          <span>View Order</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>

                    {/* Order Items Preview */}
                    <div className="flex flex-wrap gap-4 pt-1">
                      {order.items?.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-[#FAF8F5] p-2 pr-4 rounded-2xl border border-stone-200 text-xs">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-10 h-10 rounded-xl object-cover bg-emerald-50"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <span className="font-bold text-[#1A331E] block line-clamp-1 max-w-[150px]">
                              {item.product.name}
                            </span>
                            <span className="text-[10px] text-stone-500">
                              Qty: {item.quantity} · {item.selectedVariant.weightOrVolume}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SECTION 2: WISHLIST */}
        {activeTab === 'wishlist' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold text-[#1A331E]">Saved Wishlist Rituals</h2>
              {wishlistProducts.length > 0 && (
                <span className="text-xs text-stone-500 font-medium">
                  {wishlistProducts.length} saved {wishlistProducts.length === 1 ? 'item' : 'items'}
                </span>
              )}
            </div>

            {wishlistProducts.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-stone-200/80 max-w-lg mx-auto space-y-4 shadow-sm">
                <Heart className="w-12 h-12 text-rose-300 mx-auto" />
                <h3 className="font-serif text-2xl font-bold text-[#1A331E]">Your Wishlist is Empty</h3>
                <p className="text-xs text-stone-600">
                  Click the heart icon on any product card across the shop to save your favorite botanical rituals here!
                </p>
                <Link
                  to="/shop"
                  className="inline-block px-6 py-2.5 rounded-full bg-[#1A331E] text-white font-semibold text-xs hover:bg-[#2D5233] transition-colors"
                >
                  Explore Collection
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlistProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickAdd={(p) => onAddToCart(p, p.variants[0], false)}
                    onRemoveFromWishlist={(p) => removeFromWishlist(p.id)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* SECTION 3: MANAGE SUBSCRIPTIONS */}
        {activeTab === 'subscriptions' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="font-serif text-2xl font-bold text-[#1A331E]">Manage Subscriptions</h2>
              <p className="text-xs text-stone-500 font-light">
                Auto-deliver refills every 2 months with 15% discount on every recurring order.
              </p>
            </div>

            {/* Microcopy disclaimer per Task 2 specs */}
            <div className="p-4 rounded-2xl bg-[#E8F0EA] border border-[#2D5233]/20 text-xs text-[#2D5233] font-semibold flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-[#2D5233] flex-shrink-0" />
              <span>Full subscription management (pause/skip/cancel) is coming in a later phase.</span>
            </div>

            {subscriptionItems.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-stone-200/80 max-w-lg mx-auto space-y-4 shadow-sm">
                <RefreshCw className="w-12 h-12 text-stone-300 mx-auto" />
                <h3 className="font-serif text-2xl font-bold text-[#1A331E]">No Active Subscriptions</h3>
                <p className="text-xs text-stone-600">
                  Select "Subscribe & Save 15%" on any product detail page to auto-deliver your favorite paper bag refills!
                </p>
                <Link
                  to="/shop"
                  className="inline-block px-6 py-2.5 rounded-full bg-[#1A331E] text-white font-semibold text-xs hover:bg-[#2D5233] transition-colors"
                >
                  Browse Refillable Rituals
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subscriptionItems.map((sub, idx) => (
                  <div key={idx} className="bg-white rounded-3xl p-5 border border-stone-200/80 shadow-sm flex gap-4 items-center">
                    <img
                      src={sub.product.image}
                      alt={sub.product.name}
                      className="w-16 h-16 rounded-2xl object-cover bg-emerald-50 flex-shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-[#2D5233] bg-[#2D5233]/10 px-2 py-0.5 rounded-full inline-block">
                        Auto-Deliver Every 2 Months (15% OFF)
                      </span>
                      <h4 className="font-serif font-bold text-base text-[#1A331E]">{sub.product.name}</h4>
                      <p className="text-xs text-stone-500">{sub.variantName}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
