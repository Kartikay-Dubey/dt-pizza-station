"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { MenuItem } from "@/data/menu";

export type CartItem = {
    id: string; // unique id based on item + customization
    name: string;
    originalItem: MenuItem;
    price: number;
    quantity: number;
    size?: "s" | "m" | "l" | "single";
    extras?: string[]; // e.g. ["Extra Cheese", "Spicy"]
};

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: MenuItem, size?: "s" | "m" | "l" | "single", extras?: string[], priceOverride?: number) => void;
    removeFromCart: (itemId: string) => void;
    updateQuantity: (itemId: string, delta: number) => void;
    clearCart: () => void;

    // UI States
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;

    customizingItem: MenuItem | null;
    setCustomizingItem: (item: MenuItem | null) => void;

    cartTotal: number;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);

    // Initial load from local storage could go here

    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    const addToCart = (item: MenuItem, size: "s" | "m" | "l" | "single" = "single", extras: string[] = [], priceOverride?: number) => {
        // Determine price
        let finalPrice = priceOverride || 0;
        if (!priceOverride) {
            if (size === "single") finalPrice = item.price.single || 0;
            else finalPrice = item.price[size] || 0;
        }

        // Add extra costs for toppings if we had logic for that
        // For now assuming priceOverride includes extras or extras are free/handled elsewhere
        // Usually extras have fixed costs, let's assume +20 for cheese, +30 for patty if passed in extras
        // But for simplicity, we'll trust the price passed in or base calculation.

        // Generate a unique ID for this specific variation
        const extrasKey = extras.sort().join("-");
        const uniqueId = `${item.name}-${size}-${extrasKey}`;

        setCartItems(prev => {
            const existing = prev.find(i => i.id === uniqueId);
            if (existing) {
                return prev.map(i => i.id === uniqueId ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prev, {
                id: uniqueId,
                name: item.name,
                originalItem: item,
                price: finalPrice,
                quantity: 1,
                size,
                extras
            }];
        });

        // Optionally open cart or show toast
        // setIsCartOpen(true); 
    };

    const removeFromCart = (itemId: string) => {
        setCartItems(prev => prev.filter(i => i.id !== itemId));
    };

    const updateQuantity = (itemId: string, delta: number) => {
        setCartItems(prev => prev.map(i => {
            if (i.id === itemId) {
                const newQty = Math.max(0, i.quantity + delta);
                // If 0, we could remove, but maybe better to keep at 0 or remove explicitly
                // Let's remove if 0
                return { ...i, quantity: newQty };
            }
            return i;
        }).filter(i => i.quantity > 0));
    };

    const clearCart = () => setCartItems([]);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            isCartOpen,
            setIsCartOpen,
            customizingItem,
            setCustomizingItem,
            cartTotal,
            cartCount
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
};
