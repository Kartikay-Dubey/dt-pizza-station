"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function TrackOrderPage() {
    return (
        <div className="pt-32 pb-20 container mx-auto px-6 text-center">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-bold mb-8 text-white"
            >
                Track Your Order
            </motion.h1>

            <div className="max-w-md mx-auto mt-12 relative">
                <input
                    type="text"
                    placeholder="Enter Order ID (e.g. DT-1234)"
                    className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white focus:outline-none focus:border-pizza-red transition-colors"
                />
                <button className="absolute right-2 top-2 bg-pizza-red text-white p-2 rounded-full hover:bg-red-600 transition-colors">
                    <Search size={20} />
                </button>
            </div>
        </div>
    );
}
