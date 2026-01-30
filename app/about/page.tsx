"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Leaf, Truck, Users } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="pt-32 pb-20">
            {/* Hero Section */}
            <section className="container mx-auto px-6 text-center mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-pizza-red font-bold tracking-[0.2em] uppercase mb-4 block">Since 2026</span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter">
                        The Art of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pizza-red to-pizza-orange">Authentic Pizza</span>
                    </h1>
                    <p className="text-white/60 text-lg leading-relaxed max-w-3xl mx-auto">
                        DT Pizza Station isn't just a restaurant; it's a tribute to the timeless tradition of Neapolitan pizza making.
                        We believe that great food brings people together, and every slice we serve is a testament to that belief.
                    </p>
                </motion.div>
            </section>

            {/* Values Grid */}
            <section className="container mx-auto px-6 mb-24">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <ValueCard
                        icon={<Leaf size={32} />}
                        title="Farm Fresh"
                        desc="We source our vegetables daily from local organic farms to ensure peak freshness."
                        delay={0.1}
                    />
                    <ValueCard
                        icon={<Award size={32} />}
                        title="Master Chefs"
                        desc="Our pizzaiolos are trained in the art of hand-stretched dough and wood-fire baking."
                        delay={0.2}
                    />
                    <ValueCard
                        icon={<Truck size={32} />}
                        title="Fast Delivery"
                        desc="Hot and fresh at your doorstep. We promise delivery within 45 minutes."
                        delay={0.3}
                    />
                    <ValueCard
                        icon={<Users size={32} />}
                        title="Community"
                        desc="We love our neighborhood. A portion of our profits goes to local charities."
                        delay={0.4}
                    />
                </div>
            </section>

            {/* Story Section */}
            <section className="bg-white/5 py-20">
                <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-gray-800 to-black p-1 rounded-2xl rotate-3 transform hover:rotate-0 transition-transform duration-500"
                        >
                            <div className="bg-gray-900 h-96 rounded-xl flex items-center justify-center border border-white/10 overflow-hidden relative">
                                <Image
                                    src="/kitchen-story.jpg"
                                    alt="Our Kitchen"
                                    fill
                                    className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                                />
                            </div>
                        </motion.div>
                    </div>
                    <div className="flex-1 space-y-6">
                        <h2 className="text-4xl font-bold text-white">Our Story</h2>
                        <p className="text-white/60 text-lg leading-relaxed">
                            It started with a simple craving for a pizza that tasted like it came straight from a Naples oven.
                            Disappointed by the commercial chains, we decided to take matters into our own hands.
                        </p>
                        <p className="text-white/60 text-lg leading-relaxed">
                            Building our own wood-fired oven and experimenting with 48-hour fermented doughs,
                            we finally cracked the code to the perfect crust: airy, charred, and chewy.
                            Today, DT Pizza Station is the result of that passion.
                        </p>
                        <div className="pt-4">
                            <span className="font-handwriting text-3xl text-pizza-red transform -rotate-2 block">
                                - The DT Team
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function ValueCard({ icon, title, desc, delay }: { icon: any, title: string, desc: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            viewport={{ once: true }}
            className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-pizza-red/30 hover:bg-white/10 transition-colors"
        >
            <div className="text-pizza-red mb-4">{icon}</div>
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
        </motion.div>
    )
}
