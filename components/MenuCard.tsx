"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MenuItem } from "@/data/menu";
import { useCart } from "@/context/CartContext";
import { Plus, Star, Heart, Check, Flame } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

export default function MenuCard({ item, index }: { item: MenuItem; index: number }) {
    const { addToCart, setCustomizingItem } = useCart();
    const [isLiked, setIsLiked] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    const handleAdd = () => {
        setIsAdding(true);
        setTimeout(() => {
            if (item.customizable || item.price.s) {
                setCustomizingItem(item);
            } else {
                addToCart(item);
            }
            setIsAdding(false);
        }, 300);
    };

    const startPrice = item.price.single || item.price.s || 0;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="group relative h-full glass-panel rounded-xl overflow-hidden hover:bg-white/5 transition-colors"
        >
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-pizza-red/5 to-transparent pointer-events-none" />

            <div className="relative p-4 flex flex-col h-full gap-3">
                {/* Header: Title, Veg/Non-Veg, Price */}
                <div className="flex justify-between items-start">
                    <div className="flex-1 pr-2">
                        <div className="flex items-center gap-2 mb-1">
                            <div className={clsx(
                                "w-3 h-3 rounded border flex items-center justify-center flex-shrink-0",
                                item.isVeg ? "border-green-500" : "border-red-500"
                            )}>
                                <div className={clsx(
                                    "w-1.5 h-1.5 rounded-full",
                                    item.isVeg ? "bg-green-500" : "bg-red-500"
                                )} />
                            </div>

                            {/* Bestseller Badge */}
                            {index % 4 === 0 && (
                                <span className="text-[9px] bg-cheese-gold text-black px-1.5 py-0.5 rounded font-bold uppercase tracking-wide">
                                    Bestseller
                                </span>
                            )}
                        </div>

                        <h3 className="text-lg font-bold text-white group-hover:text-pizza-red transition-colors leading-tight">
                            {item.name}
                        </h3>
                    </div>
                </div>

                {/* Description - Optimized for scanning */}
                <p className="text-white/60 text-xs leading-relaxed line-clamp-2 min-h-[2.5em]">
                    {item.description}
                </p>

                {/* Footer: Price & Add Button */}
                <div className="flex items-center justify-between mt-auto">
                    <span className="font-mono text-lg font-bold text-white">₹{startPrice}</span>

                    <button
                        onClick={handleAdd}
                        disabled={isAdding}
                        className={clsx(
                            "relative overflow-hidden h-9 rounded-lg font-bold uppercase text-xs tracking-wider transition-all shadow-lg flex items-center justify-center",
                            isAdding
                                ? "w-9 bg-green-500 text-white"
                                : "px-4 bg-white text-pizza-dark hover:bg-pizza-red hover:text-white"
                        )}
                    >
                        {isAdding ? <Check size={16} /> : (item.customizable ? "Add +" : "Add")}
                    </button>
                </div>
            </div>

            {/* External Like Button (Top Right) */}
            <button
                onClick={() => setIsLiked(!isLiked)}
                className="absolute top-3 right-3 z-20 text-white/10 hover:text-pizza-red transition-colors"
            >
                <Heart size={16} fill={isLiked ? "currentColor" : "none"} className={isLiked ? "text-pizza-red" : ""} />
            </button>
        </motion.div>
    );
}
