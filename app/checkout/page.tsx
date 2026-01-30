"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import PaymentGatewayModal from "@/components/checkout/PaymentGatewayModal";
import Link from "next/link";
import { ArrowLeft, CreditCard, ShieldCheck } from "lucide-react";
import clsx from "clsx";

export default function CheckoutPage() {
    const { cartItems, cartTotal } = useCart();
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "cod">("upi");

    // Hydration check or generic loading state could go here

    const handleFormSubmit = (data: any) => {
        // In a real app, we'd save this to context or state
        console.log("Form Data:", data);
        setIsPaymentModalOpen(true);
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-pizza-dark flex items-center justify-center p-6">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold text-white">Your Cart is Empty</h1>
                    <p className="text-white/60">Add some delicious pizzas to proceed.</p>
                    <Link href="/" className="inline-block bg-pizza-red text-white px-8 py-3 rounded-xl font-bold hover:bg-red-600 transition-colors">
                        Back to Menu
                    </Link>
                </div>
            </div>
        );
    }

    const taxes = Math.round(cartTotal * 0.05);
    const platformFee = 9;
    const finalTotal = cartTotal + taxes + platformFee;

    return (
        <div className="min-h-screen bg-pizza-dark py-12 md:py-24 px-6">
            <div className="container mx-auto max-w-6xl">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/" className="p-2 bg-white/5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors">
                        <ArrowLeft size={24} />
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">Checkout</h1>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column: Form */}
                    <div className="lg:col-span-2 space-y-6">
                        <CheckoutForm onSubmit={handleFormSubmit} />

                        {/* Trust Banner */}
                        <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4 flex items-center gap-3 text-green-400">
                            <ShieldCheck size={24} />
                            <div>
                                <h4 className="font-bold text-sm uppercase tracking-wide">100% Secure Payment</h4>
                                <p className="text-xs opacity-70">Your data is encrypted and safe.</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Payment & Summary */}
                    <div className="space-y-6">
                        {/* Order Summary Card */}
                        <div className="bg-zinc-900 border border-white/10 rounded-3xl p-6 sticky top-24">
                            <h3 className="text-xl font-bold text-white mb-4">Order Summary</h3>

                            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <div className="text-white/80">
                                            <span className="font-bold text-white mr-2">{item.quantity}x</span>
                                            {item.name}
                                        </div>
                                        <div className="text-white/60">₹{item.price * item.quantity}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-white/10 pt-4 space-y-2 text-sm">
                                <div className="flex justify-between text-white/60">
                                    <span>Item Total</span>
                                    <span>₹{cartTotal}</span>
                                </div>
                                <div className="flex justify-between text-white/60">
                                    <span>Taxes (5%)</span>
                                    <span>₹{taxes}</span>
                                </div>
                                <div className="flex justify-between text-white/60">
                                    <span>Platform Fee</span>
                                    <span>₹{platformFee}</span>
                                </div>
                                <div className="flex justify-between text-white font-bold text-lg pt-2 border-t border-white/10 mt-2">
                                    <span>To Pay</span>
                                    <span className="text-pizza-red">₹{finalTotal}</span>
                                </div>
                            </div>

                            {/* Payment Method Selector */}
                            <div className="mt-8 space-y-3">
                                <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest">Payment Method</h4>
                                {[
                                    { id: "upi", label: "UPI / GPay / PhonePe" },
                                    { id: "card", label: "Credit / Debit Card" },
                                    { id: "cod", label: "Cash on Delivery" }
                                ].map((method) => (
                                    <button
                                        key={method.id}
                                        onClick={() => setPaymentMethod(method.id as any)}
                                        className={clsx(
                                            "w-full flex items-center gap-3 p-3 rounded-xl border text-sm font-medium transition-all",
                                            paymentMethod === method.id
                                                ? "bg-pizza-red/10 border-pizza-red text-white"
                                                : "bg-white/5 border-transparent text-white/50 hover:bg-white/10"
                                        )}
                                    >
                                        <div className={clsx(
                                            "w-4 h-4 rounded-full border flex items-center justify-center",
                                            paymentMethod === method.id ? "border-pizza-red" : "border-white/20"
                                        )}>
                                            {paymentMethod === method.id && <div className="w-2 h-2 rounded-full bg-pizza-red" />}
                                        </div>
                                        {method.label}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => document.querySelector('form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))}
                                className="w-full bg-gradient-to-r from-pizza-red to-orange-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-pizza-red/20 mt-6 active:scale-[0.98] transition-all"
                            >
                                Pay ₹{finalTotal}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Modal */}
            <PaymentGatewayModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                amount={finalTotal}
            />
        </div>
    );
}
