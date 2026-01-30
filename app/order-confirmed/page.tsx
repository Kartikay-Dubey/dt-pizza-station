"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, ClipboardList, Home } from "lucide-react";

export default function OrderConfirmed() {
    const orderId = `DT-${Math.floor(Math.random() * 1000000)}`;

    return (
        <div className="min-h-screen bg-pizza-dark flex items-center justify-center p-6 relative overflow-hidden">
            {/* Confetti / bg effects could go here */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pizza-red/10 via-black to-black pointer-events-none" />

            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full bg-zinc-900 border border-white/10 p-8 rounded-3xl text-center relative z-10 shadow-2xl"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/30"
                >
                    <Check size={48} className="text-white stroke-[3px]" />
                </motion.div>

                <h1 className="text-3xl font-bold text-white mb-2">Order Confirmed!</h1>
                <p className="text-white/60 mb-8">Your piping hot pizza is being prepared.</p>

                <div className="bg-white/5 rounded-xl p-4 mb-8 space-y-2 border border-white/5">
                    <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Order ID</p>
                    <p className="text-xl font-mono text-cheese-gold tracking-widest">{orderId}</p>
                </div>

                <div className="space-y-3">
                    <button className="w-full bg-pizza-red text-white py-4 rounded-xl font-bold hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
                        <ClipboardList size={20} /> Track Details
                    </button>
                    <Link href="/" className="w-full bg-white/5 text-white py-4 rounded-xl font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2 border border-white/10">
                        <Home size={20} /> Back to Home
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
