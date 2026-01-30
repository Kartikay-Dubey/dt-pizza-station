"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

export default function CartDrawer() {
    const {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        updateQuantity,
        removeFromCart,
        cartTotal
    } = useCart();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-[70] flex flex-col shadow-2xl"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <ShoppingBag className="text-pizza-red" />
                                Your Order
                            </h2>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cartItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                                    <ShoppingBag size={48} className="text-white/20" />
                                    <p className="text-white/40 font-medium">Your cart is empty</p>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="text-pizza-red text-sm font-bold uppercase tracking-widest hover:underline"
                                    >
                                        Browse Menu
                                    </button>
                                </div>
                            ) : (
                                cartItems.map((item) => (
                                    <motion.div
                                        layout
                                        key={item.id}
                                        className="flex gap-4 bg-white/5 p-4 rounded-2xl border border-white/5"
                                    >
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className="font-bold text-white">{item.name}</h4>
                                                <span className="font-mono text-cheese-gold">₹{item.price * item.quantity}</span>
                                            </div>

                                            <div className="text-xs text-white/50 mb-3 space-y-1">
                                                {item.size !== "single" && (
                                                    <p className="uppercase tracking-wide">Size: {item.size === 's' ? 'Small' : item.size === 'm' ? 'Medium' : 'Large'}</p>
                                                )}
                                                {item.extras && item.extras.length > 0 && (
                                                    <p>+ {item.extras.join(", ")}</p>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-3 bg-black/40 rounded-lg p-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className="w-6 h-6 flex items-center justify-center bg-white/10 rounded hover:bg-white/20 text-white transition-colors"
                                                    >
                                                        {item.quantity === 1 ? <Trash2 size={12} /> : <Minus size={12} />}
                                                    </button>
                                                    <span className="text-sm font-bold text-white min-w-[1ch] text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="w-6 h-6 flex items-center justify-center bg-white/10 rounded hover:bg-white/20 text-white transition-colors"
                                                    >
                                                        <Plus size={12} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div className="p-6 border-t border-white/10 bg-zinc-900/50 backdrop-blur-md">
                                <div className="space-y-2 mb-6">
                                    <div className="flex justify-between text-white/60 text-sm">
                                        <span>Subtotal</span>
                                        <span>₹{cartTotal}</span>
                                    </div>
                                    <div className="flex justify-between text-white/60 text-sm">
                                        <span>Taxes (5%)</span>
                                        <span>₹{Math.round(cartTotal * 0.05)}</span>
                                    </div>
                                    <div className="flex justify-between text-white font-bold text-xl pt-4 border-t border-white/10">
                                        <span>Total</span>
                                        <span>₹{cartTotal + Math.round(cartTotal * 0.05)}</span>
                                    </div>
                                </div>

                                <Link
                                    href="/checkout"
                                    onClick={() => setIsCartOpen(false)}
                                    className="w-full bg-pizza-red hover:bg-red-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-pizza-red/25 transition-all active:scale-[0.98] block text-center"
                                >
                                    Proceed to Checkout
                                </Link>
                                <button className="w-full mt-3 bg-white/5 hover:bg-white/10 text-white font-medium py-3 rounded-xl transition-all border border-white/10 flex items-center justify-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    Order on WhatsApp
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
