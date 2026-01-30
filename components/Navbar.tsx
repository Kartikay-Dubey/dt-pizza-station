"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, Phone, Info, MapPin, Tag } from "lucide-react";
import clsx from "clsx";
import { useCart } from "@/context/CartContext";

const NAV_LINKS = [
    { name: "Home", href: "/", icon: <BookOpenIcon /> },
    { name: "Menu", href: "/#menu", icon: <Info size={18} /> },
    { name: "Offers", href: "/offers", icon: <Tag size={18} /> },
    { name: "Track Order", href: "/track-order", icon: <MapPin size={18} /> },
    { name: "About", href: "/about", icon: <Info size={18} /> },
    { name: "Contact", href: "#footer", icon: <Phone size={18} /> },
];

function BookOpenIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
    )
}

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { cartCount, setIsCartOpen } = useCart();
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [mobileMenuOpen]);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={clsx(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    scrolled
                        ? "bg-pizza-dark/80 backdrop-blur-xl border-b border-white/5 py-3 shadow-2xl shadow-black/50"
                        : "bg-transparent border-b border-transparent py-6"
                )}
            >
                <div className="container mx-auto px-6 flex items-center justify-between">
                    {/* Brand */}
                    <Link href="/" className="relative z-50 group">
                        <div className="flex items-center gap-3">
                            {/* Logo Icon - Exact Match to Reference */}
                            <div className="w-10 h-10 bg-[#D35400] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 ring-2 ring-white/10 group-hover:ring-pizza-red/50">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F5D0A9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M15 11h.01" />
                                    <path d="M11 15h.01" />
                                    <path d="M16.5 4a3 3 0 0 0-2.8 5.8 2.5 2.5 0 0 1 3.5 3.5 2.5 2.5 0 0 0 5.8 2.8C22.6 10 16.5 4.4 16.5 4z" />
                                    <path d="M3 14h.01" />
                                    <path d="M7 11h.01" />
                                    <path d="M10 7h.01" />
                                    <path d="M5.9 2.8A2.5 2.5 0 0 0 3 5.3a3 3 0 0 1-1.3 5.4 3 3 0 0 0-1.2 5.6 12 12 0 1 0 22-8.3 3 3 0 0 1-2.9-1.2 2.5 2.5 0 0 0-2.5-3.5C21.4 3.3 5 4.8 5.9 2.8z" />
                                </svg>
                            </div>
                            <div className="text-2xl font-bold tracking-tighter text-white leading-none">
                                DT <span className="text-pizza-red">PIZZA</span>
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={clsx(
                                    "text-sm font-medium tracking-wide transition-colors relative group py-2",
                                    pathname === link.href ? "text-white" : "text-white/60 hover:text-white"
                                )}
                            >
                                {link.name}
                                {/* Active/Hover Underline */}
                                <span className={clsx(
                                    "absolute bottom-0 left-0 w-full h-[2px] bg-pizza-red transform scale-x-0 transition-transform duration-300 origin-left",
                                    (pathname === link.href) ? "scale-x-100" : "group-hover:scale-x-100"
                                )} />
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-6">
                        {/* Cart Button */}
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative text-white/80 hover:text-white transition-colors group"
                        >
                            <ShoppingBag size={24} />
                            {cartCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    key={cartCount}
                                    className="absolute -top-2 -right-2 bg-pizza-red text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border border-pizza-dark"
                                >
                                    {cartCount}
                                </motion.span>
                            )}
                        </button>

                        {/* CTA */}
                        <Link
                            href="/"
                            className="bg-white text-pizza-dark px-6 py-2.5 rounded-full font-bold text-sm tracking-wide hover:bg-pizza-red hover:text-white transition-all shadow-lg hover:shadow-pizza-red/25 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 duration-200"
                        >
                            Order Now
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden relative z-50 text-white p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-pizza-dark/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center"
                    >
                        {/* Background abstract shapes */}
                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0 opacity-20">
                            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pizza-red rounded-full blur-[100px]" />
                            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pizza-orange rounded-full blur-[100px]" />
                        </div>

                        <div className="relative z-10 flex flex-col items-center gap-8 w-full px-6">
                            {NAV_LINKS.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                    className="w-full text-center"
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-4xl font-bold text-white hover:text-pizza-red transition-colors flex items-center justify-center gap-4"
                                    >
                                        <span className="opacity-50 scale-75">{link.icon}</span>
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6 }}
                                className="mt-8 flex gap-6"
                            >
                                <button className="bg-pizza-red text-white px-8 py-4 rounded-full text-xl font-bold w-full shadow-xl shadow-pizza-red/20 active:scale-95 transition-transform">
                                    Order Now
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
