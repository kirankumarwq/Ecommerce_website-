import React, { createContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { Product, CartItem, AppContextType } from '../types';
import { dummyProducts } from '../data/products';

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(dummyProducts);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const item = window.localStorage.getItem('cart');
      return item ? JSON.parse(item) : [];
    } catch (error) {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const item = window.localStorage.getItem('wishlist');
      return item ? JSON.parse(item) : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    const timer = setTimeout(() => {
        setLoading(false);
    }, 1500); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    window.localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product: Product, quantity: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };
  
  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const addToWishlist = (product: Product) => {
    setWishlist(prevWishlist => {
      if (!prevWishlist.some(item => item.id === product.id)) {
        return [...prevWishlist, product];
      }
      return prevWishlist;
    });
  };

  const removeFromWishlist = (productId: number) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== productId));
  };
  
  const isInWishlist = (productId: number) => {
      return wishlist.some(item => item.id === productId);
  }

  const contextValue = useMemo(() => ({
    products,
    cart,
    wishlist,
    loading,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartTotal,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  }), [products, cart, wishlist, loading]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};