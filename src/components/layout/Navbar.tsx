"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, User } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/cart/CartContext";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/catalogue", label: "Catalogue" },
  { href: "/videos", label: "Vidéos" },
  { href: "/a-propos", label: "À propos" },
];

function Logo({ variant = "horizontal" }: { variant?: "horizontal" | "icon" }) {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      {/* Icon: éclair + semelle V */}
      <div className="relative w-9 h-9 bg-[#C6FF3D] flex items-center justify-center overflow-hidden">
        <svg
          viewBox="0 0 32 32"
          className="w-6 h-6 text-black"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 2L6 18H14L10 30L26 12H16L18 2Z"
            fill="currentColor"
            className="group-hover:translate-x-[1px] transition-transform duration-300"
          />
          {/* sole hint */}
          <path
            d="M6 27C6 27 12 28.5 18 28C24 27.5 26 26 26 26"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      {variant === "horizontal" && (
        <span className="font-display text-[22px] tracking-[0.04em] leading-none">
          VOLT<span className="text-[#C6FF3D]">229</span>
        </span>
      )}
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-40 backdrop-blur-xl bg-[#0D0D0F]/70 border-b border-white/[0.06]">
        <div className="mx-auto max-w-[1600px] px-5 md:px-8 h-[64px] flex items-center justify-between">
          <Logo />

          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className="relative font-display text-[13px] tracking-[0.18em] uppercase"
                >
                  <span
                    className={`transition-colors ${
                      active ? "text-[#C6FF3D]" : "text-white/70 hover:text-white"
                    }`}
                  >
                    {l.label}
                  </span>
                  {active && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#C6FF3D]"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/auth"
              className="hidden md:flex w-10 h-10 items-center justify-center rounded-full border border-white/10 hover:border-white/20 hover:bg-white/5 transition"
            >
              <User className="w-4 h-4" />
            </Link>
            <Link
              href="/panier"
              className="relative w-10 h-10 flex items-center justify-center bg-[#F5F5F0] text-black rounded-full hover:bg-[#C6FF3D] transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-[#E63946] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/10"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-[64px] inset-x-0 bg-[#0D0D0F] border-b border-white/10 p-6"
            >
              <div className="flex flex-col gap-6">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-display text-[28px] tracking-wide"
                  >
                    {l.label}
                  </Link>
                ))}
                <Link
                  href="/auth"
                  onClick={() => setMobileOpen(false)}
                  className="font-display text-[28px] tracking-wide text-[#8A8F98]"
                >
                  Connexion
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      <div className="h-[64px]" />
    </>
  );
}
