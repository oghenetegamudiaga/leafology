import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductPage } from './pages/ProductPage';
import { SearchPage } from './pages/SearchPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';

import { PRODUCTS } from './data/mockData';
import { Product, CartItem, Variant } from './types';

export default function App() {
  // Task 1: Hydrate cartItems from localStorage (key: leafology_cart)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('leafology_cart');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage:', e);
    }
    return [
      {
        id: 'initial-1',
        product: PRODUCTS[0],
        selectedVariant: PRODUCTS[0].variants[0],
        quantity: 1,
        isSubscription: false,
      }
    ];
  });

  const [checkoutMessage, setCheckoutMessage] = useState<string | null>(null);

  // Sync cartItems changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('leafology_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [cartItems]);

  const handleAddToCart = (product: Product, variant: Variant, isSubscription: boolean) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedVariant.id === variant.id &&
          item.isSubscription === isSubscription
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: `cart-${Date.now()}-${Math.random()}`,
            product,
            selectedVariant: variant,
            quantity: 1,
            isSubscription,
          }
        ];
      }
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
    try {
      localStorage.removeItem('leafology_cart');
    } catch (e) {
      console.error('Failed to clear cart in localStorage:', e);
    }
  };

  const handleCheckout = () => {
    setCheckoutMessage(
      'Thank you! Your Leafology order has been placed. We are hand-batching your order in Oxfordshire UK.'
    );
    handleClearCart();
    setTimeout(() => {
      setCheckoutMessage(null);
    }, 4000);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <Layout
              cartItems={cartItems}
              onAddToCart={handleAddToCart}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onCheckout={handleCheckout}
              checkoutMessage={checkoutMessage}
              setCheckoutMessage={setCheckoutMessage}
            />
          }
        >
          <Route
            path="/"
            element={<HomePage onAddToCart={handleAddToCart} onOpenStory={() => {}} />}
          />
          <Route
            path="/shop"
            element={<ShopPage onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/shop/:category"
            element={<ShopPage onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/product/:slug"
            element={<ProductPage onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/search"
            element={<SearchPage onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/checkout"
            element={
              <CheckoutPage
                cartItems={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onClearCart={handleClearCart}
              />
            }
          />
          <Route
            path="/order-confirmation/:orderId"
            element={<OrderConfirmationPage />}
          />
          <Route
            path="*"
            element={<HomePage onAddToCart={handleAddToCart} onOpenStory={() => {}} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
