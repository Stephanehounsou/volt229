"use client";
import { motion } from "framer-motion";

export default function Marquee() {
  const text = "AUTHENTIQUE • LIVRAISON 24H COTONOU • MTN MOMO • MOOV MONEY • STOCK LOCAL • ";
  return (
    <div className="relative w-full overflow-hidden bg-[#C6FF3D] text-black h-[36px] flex items-center">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="font-display text-[15px] tracking-[0.15em] uppercase px-4">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
