"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { X, Check } from "lucide-react";
import clsx from "clsx";

export default function CustomizationModal() {
    const { customizingItem, setCustomizingItem, addToCart } = useCart();
    const [selectedSize, setSelectedSize] = useState<"s" | "m" | "l" | "single">("single");
    const [extras, setExtras] = useState<string[]>([]);

    // Reset state when item changes
    useEffect(() => {
        if (customizingItem) {
            // Default size selection logic
            if (customizingItem.price.s) setSelectedSize("s");
            else if (customizingItem.price.single) setSelectedSize("single");

            setExtras([]);
        }
    }, [customizingItem]);

    if (!customizingItem) return null;

    // Calculate dynamic price
    const basePrice = selectedSize === "single"
        ? (customizingItem.price.single || 0)
        : (customizingItem.price[selectedSize] || 0);

    // Simple costs for extras (hardcoded for demo)
    const extraCosts: Record<string, number> = {
        "Extra Cheese": 30,
        "Double Patty": 40,
        "Spicy Medium": 0,
        "Spicy Hot": 0
    };

    const extrasTotal = extras.reduce((acc, curr) => acc + (extraCosts[curr] || 0), 0);
    const totalPrice = basePrice + extrasTotal;

    const handleAdd = () => {
        addToCart(customizingItem, selectedSize, extras, totalPrice);
        setCustomizingItem(null); // Close modal
    };

    const toggleExtra = (extra: string) => {
        setExtras(prev =>
            prev.includes(extra)
                ? prev.filter(e => e !== extra)
                : [...prev, extra]
        );
    };

    return (
        <AnimatePresence>
            {customizingItem && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setCustomizingItem(null)}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-zinc-900 border border-white/10 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative"
                        >
                            {/* Header */}
                            <div className="relative h-32 bg-pizza-red/10 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
                                <button
                                    onClick={() => setCustomizingItem(null)}
                                    className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                                <div className="absolute bottom-4 left-6">
                                    <h3 className="text-2xl font-bold text-white">{customizingItem.name}</h3>
                                    <p className="text-white/60 text-sm">{customizingItem.description}</p>
                                </div>
                            </div>

                            <div className="p-6 space-y-8">
                                {/* Size Selector */}
                                {!customizingItem.price.single && (
                                    <div className="space-y-3">
                                        <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Select Size</label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {(["s", "m", "l"] as const).map((size) => (
                                                customizingItem.price[size] !== undefined && (
                                                    <button
                                                        key={size}
                                                        onClick={() => setSelectedSize(size)}
                                                        className={clsx(
                                                            "py-3 rounded-xl border flex flex-col items-center justify-center transition-all",
                                                            selectedSize === size
                                                                ? "bg-white text-black border-white"
                                                                : "bg-white/5 text-white/60 border-transparent hover:bg-white/10"
                                                        )}
                                                    >
                                                        <span className="font-bold uppercase text-sm mb-1">
                                                            {size === 's' ? 'Small' : size === 'm' ? 'Medium' : 'Large'}
                                                        </span>
                                                        <span className="text-xs opacity-70">₹{customizingItem.price[size]}</span>
                                                    </button>
                                                )
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Customizations */}
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Customize</label>
                                    <div className="space-y-2">
                                        {/* Demo Options */}
                                        {[
                                            { name: "Extra Cheese", price: 30 },
                                            { name: "Double Patty", price: 40 },
                                            { name: "Spicy Medium", price: 0 },
                                            { name: "Spicy Hot", price: 0 }
                                        ].map((opt) => (
                                            <button
                                                key={opt.name}
                                                onClick={() => toggleExtra(opt.name)}
                                                className={clsx(
                                                    "w-full flex items-center justify-between p-3 rounded-xl border transition-all text-sm",
                                                    extras.includes(opt.name)
                                                        ? "bg-pizza-red/10 border-pizza-red text-pizza-red"
                                                        : "bg-white/5 border-transparent text-white/70 hover:bg-white/10"
                                                )}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={clsx(
                                                        "w-5 h-5 rounded-full border flex items-center justify-center",
                                                        extras.includes(opt.name) ? "border-pizza-red bg-pizza-red text-white" : "border-white/20"
                                                    )}>
                                                        {extras.includes(opt.name) && <Check size={12} />}
                                                    </div>
                                                    <span>{opt.name}</span>
                                                </div>
                                                {opt.price > 0 && <span>+₹{opt.price}</span>}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Footer CTA */}
                            <div className="p-6 border-t border-white/10 bg-zinc-900 sticky bottom-0">
                                <button
                                    onClick={handleAdd}
                                    className="w-full bg-gradient-to-r from-pizza-red to-orange-600 text-white font-bold text-lg py-4 rounded-2xl shadow-lg shadow-pizza-red/20 active:scale-95 transition-transform flex items-center justify-between px-6"
                                >
                                    <span>Add to Cart</span>
                                    <span>₹{totalPrice}</span>
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
