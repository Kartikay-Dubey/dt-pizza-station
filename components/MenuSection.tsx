"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MENU_ITEMS } from "@/data/menu";
import MenuCard from "./MenuCard";
import CartDrawer from "./CartDrawer";
import CustomizationModal from "./CustomizationModal";
import FloatingCartBtn from "./FloatingCartBtn";

import clsx from "clsx";

function MenuContent() {
    const [activeCategory, setActiveCategory] = useState(MENU_ITEMS[0].title);

    // Filter Logic: Find active category data
    const activeCategoryData = MENU_ITEMS.find(c => c.title === activeCategory);

    return (
        <section id="menu" className="bg-pizza-dark relative z-10 min-h-screen pb-32">
            {/* Cart Overlays */}
            <CartDrawer />
            <CustomizationModal />
            <FloatingCartBtn />

            {/* Decorative Overlay */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-1/2 left-0 w-96 h-96 bg-pizza-red/5 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pizza-orange/5 rounded-full blur-[150px] mix-blend-screen" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10 pt-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-8 text-center"
                >
                    <span className="text-pizza-red text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-2 block animate-pulse">
                        Premium Selection
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
                        Our Menu
                    </h2>
                </motion.div>

                {/* Sticky Navigation */}
                <div className="sticky top-20 z-40 mb-8 py-2">
                    <div className="glass-panel rounded-full px-2 p-1.5 md:px-3 md:py-2 mx-auto max-w-max flex gap-1 overflow-x-auto no-scrollbar shadow-2xl shadow-black/50">
                        {MENU_ITEMS.map((category) => (
                            <button
                                key={category.title}
                                onClick={() => setActiveCategory(category.title)}
                                className={clsx(
                                    "px-4 py-2 rounded-full transition-all duration-300 text-xs md:text-sm font-bold uppercase tracking-wider whitespace-nowrap relative isolate",
                                    activeCategory === category.title
                                        ? "text-white"
                                        : "text-white/40 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <span className="relative z-10">{category.title}</span>
                                {activeCategory === category.title && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-pizza-red rounded-full -z-10 shadow-lg shadow-pizza-red/40"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Filtered Content Area */}
                <div className="min-h-[500px]">
                    <AnimatePresence mode="wait">
                        {activeCategoryData && (
                            <motion.div
                                key={activeCategory}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Category Header */}
                                <div className="flex items-end gap-3 mb-6 border-b border-white/5 pb-2">
                                    <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                                        {activeCategoryData.title}
                                    </h3>
                                    <span className="text-white/30 text-sm font-medium pb-1.5">
                                        ({activeCategoryData.items.length} items)
                                    </span>
                                </div>

                                {/* Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {activeCategoryData.items.map((item, index) => (
                                        <MenuCard key={`${activeCategory}-${item.name}`} item={item} index={index} />
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}

export default function MenuSection() {
    return <MenuContent />;
}
