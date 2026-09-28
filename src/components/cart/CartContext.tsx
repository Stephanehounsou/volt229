"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/lib/products";

export type CartItem = {
  product: Product;
  size: number;
  colorName: string;
  qty: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size: number) => void;
  clear: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("volt229-cart");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("volt229-cart", JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: CartItem) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.product.id === newItem.product.id && i.size === newItem.size && i.colorName === newItem.colorName
      );
      if (existing) {
        return prev.map((i) =>
          i === existing ? { ...i, qty: i.qty + newItem.qty } : i
        );
      }
      return [...prev, newItem];
    });
  };

  const removeItem = (productId: string, size: number) => {
    setItems((prev) => prev.filter((i) => !(i.product.id === productId && i.size === size)));
  };

  const clear = () => setItems([]);

  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  const totalPrice = items.reduce((s, i) => s + i.product.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clear, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}
