"use client";
import { useState, useMemo } from "react";
import { products, brands, allSizes } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";

export default function CataloguePage() {
  const [brandFilter, setBrandFilter] = useState<string | null>(null);
  const [sizeFilter, setSizeFilter] = useState<number | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [priceMax, setPriceMax] = useState(150000);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (brandFilter && p.brand !== brandFilter) return false;
      if (sizeFilter && !p.sizes.includes(sizeFilter)) return false;
      if (categoryFilter && p.category !== categoryFilter) return false;
      if (p.price > priceMax) return false;
      return true;
    });
  }, [brandFilter, sizeFilter, categoryFilter, priceMax]);

  return (
    <div className="mx-auto max-w-[1600px] px-5 md:px-8 py-8">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="font-display text-[48px] md:text-[84px] leading-[0.85] tracking-[-0.02em]">
            CATALOGUE
            <span className="ml-4 inline-flex align-middle text-[14px] font-body tracking-widest uppercase bg-[#C6FF3D] text-black px-3 py-1 rotate-[-1deg]">{filtered.length} paires</span>
          </h1>
          <p className="mt-4 text-[#8A8F98] text-[14px] max-w-[520px]">Filtre par marque, pointure, usage. Toutes les paires en stock à Cotonou. Livraison 24h.</p>
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden inline-flex items-center gap-2 h-11 px-5 bg-white text-black font-display text-[13px] tracking-widest uppercase"
        >
          <SlidersHorizontal className="w-4 h-4" /> Filtres {showFilters ? <X className="w-4 h-4" /> : null}
        </button>
      </div>

      <div className="grid lg:grid-cols-[240px_1fr] gap-8 items-start">
        {/* Sidebar filters */}
        <div className={`${showFilters ? "block" : "hidden"} md:block sticky top-[88px] space-y-8 bg-[#121214] border border-white/10 p-5 md:bg-transparent md:border-0 md:p-0`}>
          <div>
            <h4 className="font-display text-[12px] tracking-[0.2em] uppercase mb-4 text-white/80">Marque</h4>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setBrandFilter(null)}
                className={`px-3 py-1.5 rounded-full border text-[12px] tracking-wide transition ${!brandFilter ? "bg-[#C6FF3D] text-black border-[#C6FF3D]" : "bg-white/5 border-white/10 hover:border-white/20"}`}
              >
                Toutes
              </button>
              {brands.map((b) => (
                <button
                  key={b}
                  onClick={() => setBrandFilter(b === brandFilter ? null : b)}
                  className={`px-3 py-1.5 rounded-full border text-[12px] tracking-wide transition ${brandFilter === b ? "bg-[#C6FF3D] text-black border-[#C6FF3D]" : "bg-white/5 border-white/10 hover:border-white/20"}`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-[12px] tracking-[0.2em] uppercase mb-4 text-white/80">Usage</h4>
            <div className="flex flex-col gap-2">
              {[
                { id: null, label: "Tous" },
                { id: "performance", label: "Performance • Terrain" },
                { id: "lifestyle", label: "Lifestyle • Ville" },
                { id: "retro", label: "Retro • Culture" },
              ].map((c) => (
                <button
                  key={String(c.id)}
                  onClick={() => setCategoryFilter(c.id)}
                  className={`text-left px-3 py-2 text-[13px] border transition ${categoryFilter === c.id ? "bg-white text-black border-white" : "bg-white/[0.04] border-white/10 hover:bg-white/10"}`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-[12px] tracking-[0.2em] uppercase mb-4 text-white/80">Pointure</h4>
            <div className="grid grid-cols-4 gap-2">
              {allSizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSizeFilter(sizeFilter === s ? null : s)}
                  className={`h-9 grid place-items-center border text-[12px] font-medium transition ${sizeFilter === s ? "bg-[#C6FF3D] text-black border-[#C6FF3D]" : "bg-white/[0.04] border-white/10 hover:border-white/30"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-[12px] tracking-[0.2em] uppercase mb-4 text-white/80">Prix max: {(priceMax/1000).toFixed(0)}k XOF</h4>
            <input type="range" min={50000} max={150000} step={5000} value={priceMax} onChange={(e) => setPriceMax(Number(e.target.value))} className="w-full accent-[#C6FF3D]" />
            <div className="flex justify-between text-[11px] text-[#8A8F98] mt-1">
              <span>50k</span><span>150k</span>
            </div>
          </div>

          <button
            onClick={() => { setBrandFilter(null); setSizeFilter(null); setCategoryFilter(null); setPriceMax(150000); }}
            className="w-full h-10 border border-white/10 text-[12px] tracking-widest uppercase font-display hover:bg-white/5 transition"
          >
            Réinitialiser
          </button>
        </div>

        {/* Grid */}
        <div>
          <AnimatePresence mode="popLayout">
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((p, i) => (
                <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.4, delay: i * 0.03 }}>
                  <ProductCard product={p} index={i} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="py-24 text-center border border-dashed border-white/10 mt-4">
              <div className="font-display text-[24px]">AUCUN RÉSULTAT</div>
              <p className="mt-2 text-[#8A8F98] text-[14px]">Essaie une autre pointure ou marque. Besoin d'aide ? Parle à VOLT.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
