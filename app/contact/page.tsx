"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="pt-32 pb-20 container mx-auto px-6 text-center">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-bold mb-12 text-white"
            >
                Contact Us
            </motion.h1>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="glass-panel p-8 rounded-2xl flex flex-col items-center gap-4">
                    <div className="bg-pizza-red/20 p-4 rounded-full text-pizza-red">
                        <Phone size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white">Call Us</h3>
                    <p className="text-white/60">+91 98765 43210</p>
                </div>

                <div className="glass-panel p-8 rounded-2xl flex flex-col items-center gap-4">
                    <div className="bg-pizza-red/20 p-4 rounded-full text-pizza-red">
                        <Mail size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white">Email Us</h3>
                    <p className="text-white/60">hello@dtpizza.com</p>
                </div>

                <div className="glass-panel p-8 rounded-2xl flex flex-col items-center gap-4">
                    <div className="bg-pizza-red/20 p-4 rounded-full text-pizza-red">
                        <MapPin size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white">Visit Us</h3>
                    <p className="text-white/60">123 Pizza Street, Food City</p>
                </div>
            </div>
        </div>
    );
}
