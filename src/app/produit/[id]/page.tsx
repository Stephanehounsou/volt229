"use client";
import { useParams } from "next/navigation";
import { products } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";
import dynamic from "next/dynamic";
import Button from "@/components/ui/Button";
import ProductCard from "@/components/product/ProductCard";
import { useCart } from "@/components/cart/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, ShieldCheck, RotateCcw, Star, Plus, Minus, ShoppingBag, Heart } from "lucide-react";
import Link from "next/link";

const ProductViewer3D = dynamic(() => import("@/components/product/ProductViewer3D"), {
  ssr: false,
  loading: () => <div className="w-full aspect-[16/10] bg-[#0F0F11] border border-white/10 animate-pulse" />,
});

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;
  const product = products.find((p) => p.id === id) || products[0];

  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[2] || product.sizes[0]);
  const [selectedColorName, setSelectedColorName] = useState(product.colors[0].name);
  const selectedColor = product.colors.find((c) => c.name === selectedColorName) || product.colors[0];
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(product.image);

  const { addItem } = useCart();
  const similar = products.filter((p) => p.brand === product.brand && p.id !== product.id).slice(0, 3);

  const handleAdd = () => {
    addItem({ product, size: selectedSize, colorName: selectedColorName, qty });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // All images for gallery
  const allImages = [product.image, ...product.colors.flatMap(c => c.images)].filter((v,i,a)=>a.indexOf(v)===i).slice(0,6);

  return (
    <div className="mx-auto max-w-[1600px] px-5 md:px-8 py-8">
      <div className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-[#8A8F98] mb-6">
        <Link href="/" className="hover:text-white">Accueil</Link>
        <span>/</span>
        <Link href="/catalogue" className="hover:text-white">Catalogue</Link>
        <span>/</span>
        <span className="text-white">{product.name}</span>
      </div>

      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
        {/* Viewer */}
        <div className="space-y-4">
          {/* Real image hero + 3D toggle */}
          <div className="relative w-full aspect-[16/12] bg-[#0F0F11] border border-white/[0.06] overflow-hidden">
            <img src={activeImage} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1.5 bg-[#0D0D0F]/80 backdrop-blur border border-white/10 text-[11px] tracking-widest uppercase font-display">Photo réelle • Cotonou</span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto no-scrollbar">
              {allImages.map((img, i) => (
                <button key={i} onClick={() => setActiveImage(img)} className={`shrink-0 w-16 h-16 border-2 overflow-hidden ${activeImage===img ? "border-[#C6FF3D]" : "border-white/20 hover:border-white/40"}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <ProductViewer3D colors={product.colors} selectedColor={selectedColor.hex} onSelectColor={(name) => {
            const col = product.colors.find(c=>c.name===name);
            if (col) {
              setSelectedColorName(name);
              if (col.images[0]) setActiveImage(col.images[0]);
            }
          }} />

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Tige", value: product.tech[0] },
              { label: "Amorti", value: product.tech[1] || "ArcFoam" },
              { label: "Traction", value: "CourtGrip" },
            ].map((f) => (
              <div key={f.label} className="bg-[#121214] border border-white/10 p-4">
                <div className="text-[10px] tracking-widest uppercase text-[#8A8F98]">{f.label}</div>
                <div className="mt-1 font-display text-[13px]">{f.value}</div>
              </div>
            ))}
          </div>

          <div className="bg-[#F5F5F0] text-black p-5 flex gap-4 items-start">
            <ShieldCheck className="w-5 h-5 mt-0.5 shrink-0" />
            <div className="text-[13px] leading-relaxed">
              <span className="font-bold">Authentique garanti.</span> Photo réelle prise à Fidjrossè, facture + boîte originale. Scanne le QR pour voir l'historique. Si fake, on rembourse x2.
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="lg:sticky lg:top-[88px]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2">
                <span className="px-2.5 py-1 bg-[#C6FF3D] text-black font-display text-[10px] tracking-widest uppercase">{product.brand}</span>
                <span className="px-2.5 py-1 bg-white/10 border border-white/10 font-display text-[10px] tracking-widest uppercase">{product.category}</span>
                {product.isNew && <span className="px-2.5 py-1 bg-[#E63946] text-white font-display text-[10px] tracking-widest uppercase">Nouveau</span>}
              </div>
              <h1 className="mt-4 font-display text-[32px] md:text-[44px] leading-[0.9] tracking-[-0.01em]">{product.name}</h1>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-[#C6FF3D] text-[#C6FF3D]" : "text-white/20"}`} />
                  ))}
                </div>
                <span className="text-[12px] text-[#8A8F98]">{product.rating} • {product.reviewsCount} avis • Stock: {product.stock} paires à Cotonou</span>
              </div>
            </div>
            <button className="w-10 h-10 rounded-full border border-white/10 grid place-items-center hover:bg-white/10">
              <Heart className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-6 flex items-baseline gap-4">
            <div className="font-display text-[36px]">{formatPrice(product.price)}</div>
            {product.oldPrice && <div className="text-[16px] text-[#8A8F98] line-through">{formatPrice(product.oldPrice)}</div>}
          </div>

          <p className="mt-4 text-[14px] leading-relaxed text-[#8A8F98]">{product.description}</p>

          {/* Color selector */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-display text-[12px] tracking-[0.2em] uppercase">Coloris: <span className="text-white">{selectedColor.name}</span></h4>
              <span className="text-[11px] text-[#8A8F98]">{product.colors.length} options</span>
            </div>
            <div className="flex gap-2.5 flex-wrap">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => {
                    setSelectedColorName(c.name);
                    if (c.images[0]) setActiveImage(c.images[0]);
                  }}
                  className={`group relative h-12 px-4 border flex items-center gap-2.5 transition ${selectedColorName === c.name ? "bg-white text-black border-white" : "bg-white/[0.04] border-white/10 hover:border-white/20 text-white"}`}
                >
                  <span className="w-4 h-4 rounded-full border border-black/10" style={{ background: c.hex }} />
                  <span className="font-display text-[12px] tracking-wide">{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Size selector */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-display text-[12px] tracking-[0.2em] uppercase">Pointure</h4>
              <button className="text-[11px] tracking-wide underline decoration-white/30 underline-offset-4 hover:decoration-white">Guide des tailles</button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`h-12 border font-display text-[14px] transition ${selectedSize === s ? "bg-[#C6FF3D] text-black border-[#C6FF3D]" : "bg-white/[0.04] border-white/10 hover:border-white/30"}`}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="mt-2 text-[11px] text-[#8A8F98]">Conseil VOLT: prends +0.5 pour le basket. Tu fais du 42 ville → 42.5 ici.</div>
          </div>

          {/* Qty + Add */}
          <div className="mt-8 flex gap-3">
            <div className="flex items-center border border-white/10 bg-white/[0.04]">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-12 h-12 grid place-items-center hover:bg-white/10"><Minus className="w-4 h-4" /></button>
              <div className="w-12 h-12 grid place-items-center font-display text-[16px]">{qty}</div>
              <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="w-12 h-12 grid place-items-center hover:bg-white/10"><Plus className="w-4 h-4" /></button>
            </div>
            <div className="flex-1">
              <Button size="lg" className="w-full" onClick={handleAdd}>
                <ShoppingBag className="w-4 h-4" /> {added ? "Ajouté ✓" : "Ajouter au panier"} • {formatPrice(product.price * qty)}
              </Button>
            </div>
          </div>

          <AnimatePresence>
            {added && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="mt-3 p-3 bg-[#C6FF3D] text-black text-[13px] flex justify-between items-center">
                <span>Ajouté au panier — {product.name} • {selectedSize} • {selectedColorName}</span>
                <Link href="/panier" className="underline font-bold">Voir panier</Link>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 grid grid-cols-1 gap-3">
            {[
              { icon: Truck, title: "Livraison 24h Cotonou", desc: "2 000 XOF • Suivi WhatsApp • Retrait Fidjrossè gratuit" },
              { icon: RotateCcw, title: "Retours 7 jours", desc: "Essaie chez toi, retour gratuit si pointure pas bonne" },
            ].map((i) => (
              <div key={i.title} className="flex gap-3 p-3 border border-white/10 bg-white/[0.02]">
                <div className="w-8 h-8 rounded-full bg-white/10 grid place-items-center shrink-0"><i.icon className="w-4 h-4" /></div>
                <div>
                  <div className="font-display text-[12px] tracking-wide">{i.title}</div>
                  <div className="text-[12px] text-[#8A8F98]">{i.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Similar */}
      <div className="mt-20 border-t border-white/10 pt-12">
        <h3 className="font-display text-[24px] tracking-wide mb-6">Tu vas aussi kiffer</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {similar.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
