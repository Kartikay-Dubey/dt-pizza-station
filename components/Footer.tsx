"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer id="footer" className="bg-black/50 backdrop-blur-xl border-t border-white/5 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="text-2xl font-bold tracking-tighter text-white">
                            DT <span className="text-pizza-red">PIZZA</span>
                        </div>
                        <p className="text-white/60 text-sm leading-relaxed">
                            Crafting the finest Neapolitan pizzas since 2026. Made with passion, fired with wood.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-white/60">
                            <li><a href="/" className="hover:text-pizza-red transition-colors">Home</a></li>
                            <li><a href="/offers" className="hover:text-pizza-red transition-colors">Offers</a></li>
                            <li><a href="/track-order" className="hover:text-pizza-red transition-colors">Track Order</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Contact Us</h4>
                        <ul className="space-y-4 text-sm text-white/60">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-pizza-red flex-shrink-0" />
                                <span>123 Pizza Street, Food City, FC 40001</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-pizza-red flex-shrink-0" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-pizza-red flex-shrink-0" />
                                <span>hello@dtpizza.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Follow Us</h4>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Twitter].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-pizza-red transition-all">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 text-center text-xs text-white/40">
                    &copy; 2026 DT Pizza Station. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
