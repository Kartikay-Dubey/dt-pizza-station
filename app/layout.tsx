import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "DT Pizza Station | Crafted. Fired. Perfected.",
  description: "Experience the art of premium pizza.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased text-white`}
      >
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
          <ScrollToTop />
        </CartProvider>
      </body>
    </html>
  );
}
