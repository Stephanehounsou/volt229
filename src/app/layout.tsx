import type { Metadata } from "next";
import { Bebas_Neue, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/chatbot/Chatbot";
import CartProvider from "@/components/cart/CartContext";
import PageTransition from "@/components/animations/PageTransition";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VOLT229 — La sneaker culture béninoise",
  description: "La plateforme n°1 de baskets basketball au Bénin. Authentique, rapide, locale. Paiement Mobile Money, livraison express.",
  keywords: ["sneakers", "basketball", "Bénin", "VOLT229", "baskets", "MTN MoMo"],
  openGraph: {
    title: "VOLT229 — La sneaker culture béninoise commence ici",
    description: "Baskets basketball premium au Bénin. Authentiques. Livrées en 24h.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${bebas.variable} ${manrope.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#0D0D0F] text-[#F5F5F0] selection:bg-[#C6FF3D] selection:text-black">
        <CartProvider>
          <PageTransition>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </PageTransition>
          <Chatbot />
        </CartProvider>
      </body>
    </html>
  );
}
