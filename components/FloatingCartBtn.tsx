"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, ArrowRight } from "lucide-react";
import clsx from "clsx";

export default function FloatingCartBtn() {
    const { cartCount, cartTotal, setIsCartOpen } = useCart();

    return (
        <AnimatePresence>
            {cartCount > 0 && (
                <div className="fixed bottom-0 left-0 right-0 p-6 z-40 flex justify-center pointer-events-none">
                    <motion.button
                        initial={{ y: 150, opacity: 0, scale: 0.9 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 150, opacity: 0, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        onClick={() => setIsCartOpen(true)}
                        className="pointer-events-auto relative overflow-hidden group w-full max-w-md rounded-2xl shadow-2xl shadow-black/50 hover:shadow-pizza-red/20 transition-all duration-300 transform active:scale-95"
                    >
                        {/* Glass Background */}
                        <div className="absolute inset-0 bg-pizza-dark/90 backdrop-blur-xl border border-white/10" />
                        <div className="absolute inset-0 bg-gradient-to-r from-pizza-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="relative flex items-center justify-between p-4">
                            <div className="flex items-center gap-4">
                                <div className="bg-pizza-red w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-pizza-red/30">
                                    <span className="text-lg">{cartCount}</span>
                                </div>
                                <div className="flex flex-col items-start gap-0.5">
                                    <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Total</span>
                                    <span className="font-mono text-xl font-bold text-white tracking-tight">₹{cartTotal}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 pr-2">
                                <span className="text-sm font-bold uppercase tracking-wider text-white group-hover:text-pizza-red transition-colors">
                                    View Cart
                                </span>
                                <div className="bg-white/5 p-2 rounded-full group-hover:bg-pizza-red group-hover:text-white transition-all">
                                    <ArrowRight size={18} />
                                </div>
                            </div>
                        </div>
                    </motion.button>
                </div>
            )}
        </AnimatePresence>
    );
}
