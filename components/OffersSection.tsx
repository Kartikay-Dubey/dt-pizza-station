"use client";

import { motion, Variants } from "framer-motion";
import { Tag, Clock, Flame, Star, Percent, Gift } from "lucide-react";
import clsx from "clsx";

const OFFERS = [
    {
        id: 1,
        title: "Buy 1 Get 1 Free",
        description: "Order any Medium or Large Pizza and get another one absolutely free! Valid on all classic range pizzas.",
        code: "BOGO26",
        color: "from-orange-500 to-red-600",
        icon: <Gift size={32} />,
        badge: "Most Popular"
    },
    {
        id: 2,
        title: "Flat ₹100 OFF",
        description: "Get a flat ₹100 discount on your first order above ₹499. Use the code at checkout to redeem.",
        code: "DTFIRST100",
        color: "from-blue-500 to-indigo-600",
        icon: <Percent size={32} />,
        badge: "New User"
    },
    {
        id: 3,
        title: "Midnight Feast",
        description: "Craving late night? Get 20% OFF on all orders placed between 11 PM and 3 AM. Night owls rejoice!",
        code: "OWL20",
        color: "from-purple-500 to-pink-600",
        icon: <Clock size={32} />,
        badge: "Limited Time"
    },
    {
        id: 4,
        title: "Spicy Weekend",
        description: "Free Garlic Bread with Cheese on all orders containing a Spicy Pizza. Valid Sat-Sun only.",
        code: "SPICYWKND",
        color: "from-red-600 to-rose-600",
        icon: <Flame size={32} />,
        badge: "Weekend Special"
    }
];

const container: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 10
        }
    }
};

export default function OffersSection() {
    return (
        <section className="py-20 bg-pizza-dark relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-pizza-red/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-pizza-orange/5 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="text-pizza-red font-bold tracking-[0.2em] uppercase mb-2 block text-sm">Best Deals</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Exclusive Offers</h2>
                </motion.div>

                {/* Compact Grid Layout */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto"
                >
                    {OFFERS.map((offer) => (
                        <motion.div
                            key={offer.id}
                            variants={item}
                            whileHover={{ y: -3, scale: 1.01 }}
                            className="glass-panel group relative overflow-hidden rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-300 flex items-center p-4 gap-4"
                        >
                            {/* Icon Box */}
                            <div className={clsx(
                                "w-16 h-16 rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0 bg-gradient-to-br",
                                offer.color
                            )}>
                                {offer.icon}
                            </div>

                            {/* Text Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    {offer.badge && (
                                        <span className={clsx(
                                            "min-w-max text-[9px] font-bold uppercase px-2 py-0.5 rounded-full border tracking-wide",
                                            "bg-white/5 text-white/90 border-white/10"
                                        )}>
                                            {offer.badge}
                                        </span>
                                    )}
                                    <h3 className="text-lg font-bold text-white truncate group-hover:text-pizza-red transition-colors">
                                        {offer.title}
                                    </h3>
                                </div>
                                <p className="text-white/50 text-xs leading-snug line-clamp-2 mb-2">
                                    {offer.description}
                                </p>

                                {/* Code & Action */}
                                <div className="flex items-center gap-3">
                                    <div className="bg-black/30 border border-white/10 border-dashed rounded px-2 py-1 flex items-center gap-2">
                                        <span className="text-[10px] text-white/40 uppercase font-bold">Code:</span>
                                        <span className="font-mono text-xs font-bold text-white">{offer.code}</span>
                                    </div>
                                    <button
                                        className="text-xs font-bold text-white hover:text-pizza-red transition-colors ml-auto flex items-center gap-1"
                                        onClick={() => navigator.clipboard.writeText(offer.code)}
                                    >
                                        Copy
                                    </button>
                                </div>
                            </div>

                            {/* Subtle Gradient BG on Hover */}
                            <div className={clsx(
                                "absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none",
                                offer.color
                            )} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
