"use client";

import { motion } from "framer-motion";

export default function MenuPage() {
    return (
        <div className="pt-32 pb-20 container mx-auto px-6 text-center">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-bold mb-8 text-white"
            >
                Full Menu
            </motion.h1>
            <p className="text-white/60 text-xl font-light max-w-2xl mx-auto">
                Explore our complete range of handcrafted pizzas, sides, and beverages.
            </p>
            {/* Ideally verify if we should reuse MenuSection here or just plain text for now. 
                Using plain text placeholder as requested to "Render a basic but clean UI". */}
        </div>
    );
}
