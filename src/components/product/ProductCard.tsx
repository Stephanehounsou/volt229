"use client";
import Link from "next/link";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Product } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { useRef, useState } from "react";

export default function ProductCard({ product, index }: { product: Product; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      style={{ perspective: 1000 }}
      className="group relative"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative bg-[#121214] border border-white/[0.06] overflow-hidden rounded-[2px] hover:border-[#C6FF3D]/30 transition-colors duration-500"
      >
        {/* Image area with real photo */}
        <Link href={`/produit/${product.id}`} className="block relative aspect-[4/3] overflow-hidden bg-[#0D0D0F]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(198,255,61,0.12),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
          
          {/* Real product image */}
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
            loading="lazy"
          />

          {/* Gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-[5]" />

          {/* Parallax floating badge */}
          <div
            className="absolute bottom-3 left-3 z-20 px-2.5 py-1 bg-[#0D0D0F]/80 backdrop-blur border border-white/10 text-[10px] tracking-widest uppercase font-display text-white/80"
            style={{ transform: hovered ? "translateZ(30px)" : "translateZ(0px)", transition: "transform 0.4s ease" }}
          >
            {product.tech[0]} • {product.brand}
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2 z-20">
            {product.isNew && (
              <span className="px-2.5 py-1 bg-[#C6FF3D] text-black font-display text-[10px] tracking-widest uppercase shadow-lg">Nouveau</span>
            )}
            {product.oldPrice && (
              <span className="px-2.5 py-1 bg-[#E63946] text-white font-display text-[10px] tracking-widest uppercase shadow-lg">-{Math.round(((product.oldPrice - product.price)/product.oldPrice)*100)}%</span>
            )}
          </div>

          {/* Quick color */}
          <div className="absolute top-3 right-3 flex gap-1.5 z-20">
            {product.colors.slice(0,3).map((c) => (
              <span key={c.name} className="w-3 h-3 rounded-full border border-white/40 shadow-md" style={{ background: c.hex }} />
            ))}
          </div>

          {/* 360 hint on hover */}
          <div className="absolute inset-0 z-20 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="px-3 py-1.5 bg-[#C6FF3D] text-black font-display text-[11px] tracking-widest uppercase">Voir 360°</span>
          </div>
        </Link>

        {/* Info */}
        <div className="p-4">
          <div className="flex justify-between items-start gap-3">
            <div className="min-w-0">
              <Link href={`/produit/${product.id}`}>
                <h3 className="font-display text-[15px] leading-[1.1] tracking-wide line-clamp-2 group-hover:text-[#C6FF3D] transition-colors">
                  {product.name}
                </h3>
              </Link>
              <p className="mt-1 text-[11px] tracking-[0.15em] uppercase text-[#8A8F98]">{product.category} • {product.brand}</p>
            </div>
            <div className="text-right shrink-0">
              <div className="font-display text-[16px]">{formatPrice(product.price)}</div>
              {product.oldPrice && (
                <div className="text-[11px] text-[#8A8F98] line-through">{formatPrice(product.oldPrice)}</div>
              )}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex gap-1">
              {product.sizes.slice(0,4).map((s) => (
                <span key={s} className="w-7 h-6 grid place-items-center bg-white/[0.04] border border-white/[0.06] text-[10px] font-medium">
                  {s}
                </span>
              ))}
              {product.sizes.length > 4 && (
                <span className="w-7 h-6 grid place-items-center bg-white/[0.04] text-[10px]">+{product.sizes.length - 4}</span>
              )}
            </div>
            <span className="text-[11px] text-[#8A8F98]">★ {product.rating} ({product.reviewsCount})</span>
          </div>
        </div>

        {/* Hover shine */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]" />
        </div>
      </motion.div>
    </motion.div>
  );
}
