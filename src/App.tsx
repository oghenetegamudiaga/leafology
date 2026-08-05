import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductPage } from './pages/ProductPage';
import { SearchPage } from './pages/SearchPage';

import { PRODUCTS } from './data/mockData';
import { Product, CartItem, Variant } from './types';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'initial-1',
      product: PRODUCTS[0],
      selectedVariant: PRODUCTS[0].variants[0],
      quantity: 1,
      isSubscription: false,
    }
  ]);

  const [checkoutMessage, setCheckoutMessage] = useState<string | null>(null);

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

  const handleCheckout = () => {
    setCheckoutMessage(
      'Thank you! Your Leafology order has been placed. We are hand-batching your order in Oxfordshire UK.'
    );
    setCartItems([]);
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
            path="*"
            element={<HomePage onAddToCart={handleAddToCart} onOpenStory={() => {}} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
