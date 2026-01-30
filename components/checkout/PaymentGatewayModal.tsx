"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle, Smartphone } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function PaymentGatewayModal({ isOpen, onClose, amount }: { isOpen: boolean; onClose: () => void; amount: number }) {
    const [step, setStep] = useState<"processing" | "confirming" | "success">("processing");
    const router = useRouter();
    const { clearCart } = useCart();

    useEffect(() => {
        if (isOpen) {
            setStep("processing");
            // Simulate processing
            const t1 = setTimeout(() => setStep("confirming"), 2000);
            const t2 = setTimeout(() => {
                setStep("success");
                clearCart();
                setTimeout(() => {
                    router.push("/order-confirmed");
                }, 1000);
            }, 4500);

            return () => {
                clearTimeout(t1);
                clearTimeout(t2);
            };
        }
    }, [isOpen, router, clearCart]);

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[100] flex items-center justify-center p-6"
        >
            <div className="text-center space-y-6 max-w-sm w-full">
                <AnimatePresence mode="wait">
                    {step === "processing" && (
                        <motion.div
                            key="processing"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="bg-zinc-800 p-8 rounded-3xl border border-white/5 shadow-2xl"
                        >
                            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                                <Loader2 size={32} className="text-blue-500 animate-spin" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Contacting Bank...</h3>
                            <p className="text-white/50 text-sm">Please do not close this window.</p>
                        </motion.div>
                    )}

                    {step === "confirming" && (
                        <motion.div
                            key="confirming"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="bg-zinc-800 p-8 rounded-3xl border border-white/5 shadow-2xl"
                        >
                            <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                                <Smartphone size={32} className="text-yellow-500 animate-pulse" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Confirming Payment</h3>
                            <p className="text-white/50 text-sm">Processing ₹{amount} secure transaction.</p>
                        </motion.div>
                    )}

                    {step === "success" && (
                        <motion.div
                            key="success"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="bg-zinc-800 p-8 rounded-3xl border border-green-500/20 shadow-2xl shadow-green-500/10"
                        >
                            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle size={32} className="text-green-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Payment Successful!</h3>
                            <p className="text-white/50 text-sm">Redirecting to order confirmation...</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
