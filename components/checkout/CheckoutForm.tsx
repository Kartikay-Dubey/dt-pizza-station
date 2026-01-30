"use client";

import { useState } from "react";
import { Check, MapPin, Truck } from "lucide-react";
import clsx from "clsx";

export default function CheckoutForm({ onSubmit }: { onSubmit: (data: any) => void }) {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        instructions: [] as string[]
    });

    const instructions = [
        "Leave at door",
        "Avoid calling",
        "Direction usage",
        "Fragile"
    ];

    const toggleInstruction = (inst: string) => {
        setFormData(prev => ({
            ...prev,
            instructions: prev.instructions.includes(inst)
                ? prev.instructions.filter(i => i !== inst)
                : [...prev.instructions, inst]
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <MapPin className="text-pizza-red" />
                Delivery Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-white/60 uppercase tracking-wider">Full Name</label>
                        <input
                            required
                            type="text"
                            placeholder="John Doe"
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pizza-red focus:ring-1 focus:ring-pizza-red transition-all"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-white/60 uppercase tracking-wider">Phone Number</label>
                        <input
                            required
                            type="tel"
                            placeholder="+91 98765 43210"
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pizza-red focus:ring-1 focus:ring-pizza-red transition-all"
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-white/60 uppercase tracking-wider">Address</label>
                    <textarea
                        required
                        placeholder="Flat No, Building, Street Area, Landmark..."
                        rows={3}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pizza-red focus:ring-1 focus:ring-pizza-red transition-all resize-none"
                        value={formData.address}
                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                    />
                </div>

                <div className="space-y-3">
                    <label className="text-sm font-bold text-white/60 uppercase tracking-wider flex items-center gap-2">
                        <Truck size={14} /> Delivery Instructions
                    </label>
                    <div className="flex flex-wrap gap-3">
                        {instructions.map((inst) => (
                            <button
                                key={inst}
                                type="button"
                                onClick={() => toggleInstruction(inst)}
                                className={clsx(
                                    "px-4 py-2 rounded-full border text-sm font-medium transition-all flex items-center gap-2",
                                    formData.instructions.includes(inst)
                                        ? "bg-pizza-red/10 border-pizza-red text-pizza-red"
                                        : "bg-white/5 border-transparent text-white/50 hover:bg-white/10 hover:text-white"
                                )}
                            >
                                {formData.instructions.includes(inst) && <Check size={12} />}
                                {inst}
                            </button>
                        ))}
                    </div>
                </div>
            </form>
        </div>
    );
}
