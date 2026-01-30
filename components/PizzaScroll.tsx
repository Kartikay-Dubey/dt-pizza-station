"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const TOTAL_FRAMES = 192;

export default function PizzaScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const promises = [];

            for (let i = 0; i < TOTAL_FRAMES; i++) {
                const promise = new Promise((resolve, reject) => {
                    const img = new Image();
                    const frameNumber = (i + 1).toString().padStart(3, "0");
                    img.src = `/sequence/ezgif-frame-${frameNumber}.png`;
                    img.onload = () => {
                        loadedImages[i] = img;
                        resolve(img);
                    };
                    img.onerror = () => {
                        console.error(`Failed to load frame ${i}`);
                        resolve(null);
                    };
                });
                promises.push(promise);
            }

            // Track loading progress
            let loadedCount = 0;
            promises.forEach(p => p.then(() => {
                loadedCount++;
                setProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
            }));

            await Promise.all(promises);
            setImages(loadedImages);
            setLoading(false);
        };
        loadImages();
    }, []);

    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas || images.length === 0) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const frameInd = Math.min(TOTAL_FRAMES - 1, Math.floor(index));
        const img = images[frameInd];

        // Maintain aspect ratio and center
        const width = canvas.width;
        const height = canvas.height;
        ctx.clearRect(0, 0, width, height);

        if (img) {
            // Object-contain logic:
            const scaleContain = Math.min(width / img.width, height / img.height) * 0.8; // 0.8 to give some breathing room

            const w = img.width * scaleContain;
            const h = img.height * scaleContain;
            const x = (width - w) / 2;
            const y = (height - h) / 2;

            ctx.drawImage(img, x, y, w, h);
        }
    };

    useMotionValueEvent(frameIndex, "change", (latest) => {
        requestAnimationFrame(() => renderFrame(latest));
    });

    // Handle Resize & Initial Draw
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                if (images.length > 0) renderFrame(frameIndex.get());
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, [images]);

    return (
        <div ref={containerRef} className="relative h-[600vh] bg-pizza-dark">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                {loading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20 bg-pizza-dark">
                        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
                            <div
                                className="h-full bg-pizza-red transition-all duration-300 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <p className="text-xl font-mono animate-pulse">Preheating Oven... {progress}%</p>
                    </div>
                )}
                <canvas
                    ref={canvasRef}
                    className="w-full h-full"
                />
                {/* Video Overlay for Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-pizza-dark via-pizza-dark/50 to-transparent pointer-events-none z-10" />
                <div className="absolute inset-0 bg-black/20 pointer-events-none z-10" />
            </div>

            {/* Storytelling Overlays */}
            <OverlaySection opacity={useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0])}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-center"
                >
                    <h1 className="text-8xl md:text-[12rem] font-bold tracking-tighter leading-none text-white mix-blend-difference">
                        DT PIZZA
                    </h1>
                    <span className="block text-pizza-red text-2xl md:text-4xl mt-4 tracking-[0.5em] font-medium uppercase animate-pulse">
                        Station
                    </span>
                </motion.div>
            </OverlaySection>

            <OverlaySection className="justify-start pl-10 md:pl-24" opacity={useTransform(scrollYProgress, [0.15, 0.25, 0.35], [0, 1, 0])}>
                <div className="max-w-xl">
                    <span className="text-pizza-red font-mono text-sm mb-4 block tracking-widest uppercase">01. Sourcing</span>
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">Fresh<br />Ingredients.</h2>
                    <p className="text-2xl text-white/60 font-light leading-relaxed">
                        Hand-picked daily from local organic farms to ensure superior taste.
                    </p>
                </div>
            </OverlaySection>

            <OverlaySection className="justify-end pr-10 md:pr-24" opacity={useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0, 1, 0])}>
                <div className="max-w-xl text-right">
                    <span className="text-pizza-red font-mono text-sm mb-4 block tracking-widest uppercase">02. Baking</span>
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">Fired to<br />Perfection.</h2>
                    <p className="text-2xl text-white/60 font-light leading-relaxed">
                        Stone-baked at 400°C for that authentic Neapolitan char and crunch.
                    </p>
                </div>
            </OverlaySection>

            <OverlaySection opacity={useTransform(scrollYProgress, [0.85, 0.95, 0.98], [0, 1, 0])}>
                <div className="text-center">
                    <h2 className="text-5xl md:text-8xl font-bold mb-8 relative z-20">Ready?</h2>
                    <button className="bg-pizza-red text-white px-10 py-5 rounded-full text-2xl font-bold hover:bg-red-600 transition-all hover:scale-105 shadow-2xl shadow-red-900/50 uppercase tracking-widest relative z-20">
                        Order Now
                    </button>
                </div>
            </OverlaySection>
        </div>
    );
}

function OverlaySection({ children, className = "justify-center", opacity }: { children: React.ReactNode, className?: string, opacity: any }) {
    return (
        <motion.div
            style={{ opacity }}
            className={`pointer-events-none fixed inset-0 flex flex-col items-center h-screen z-30 p-6 ${className}`}
        >
            <div className="mt-auto mb-auto">
                {children}
            </div>
        </motion.div>
    );
}
