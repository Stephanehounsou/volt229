"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import Marquee from "@/components/home/Marquee";
import ProductCard from "@/components/product/ProductCard";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Button from "@/components/ui/Button";
import { products } from "@/lib/products";
import { ArrowUpRight, Play, Truck, ShieldCheck, Smartphone, Star } from "lucide-react";

const Hero3D = dynamic(() => import("@/components/home/Hero3D"), {
  ssr: false,
  loading: () => <div className="w-full h-[520px] md:h-[700px] bg-[#0D0D0F] animate-pulse" />,
});

export default function Home() {
  const featured = products.filter((p) => p.featured).slice(0, 6);
  const newDrops = products.filter((p) => p.isNew).slice(0, 4);

  return (
    <div className="overflow-hidden">
      <Marquee />

      {/* HERO */}
      <section className="relative mx-auto max-w-[1600px] px-5 md:px-8 pt-8 md:pt-14 pb-12 grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
        {/* Left copy */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C6FF3D]/10 border border-[#C6FF3D]/20 text-[11px] tracking-[0.2em] uppercase text-[#C6FF3D]"
          >
            <span className="w-2 h-2 rounded-full bg-[#C6FF3D] animate-pulse" />
            Nouveau drop — VOLT ARC-1 Cotonou Night
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 font-display text-[14vw] lg:text-[112px] leading-[0.85] tracking-[-0.02em]"
          >
            LA SNEAKER
            <br />
            <span className="text-[#C6FF3D]">CULTURE</span>
            <br />
            BÉNINOISE
            <br />
            <span className="inline-flex items-baseline gap-4">
              COMMENCE
              <span className="text-[18px] md:text-[20px] font-body font-normal tracking-normal normal-case bg-[#F5F5F0] text-black px-3 py-1 rotate-[-2deg]">ICI • 229</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 max-w-[480px] text-[16px] leading-relaxed text-[#8A8F98]"
          >
            Baskets basketball authentiques. Paiement Mobile Money. Livraison 24h à Cotonou. Conçue pour le goudron chaud, pensée pour l'énergie du terrain béninois.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link href="/catalogue">
              <Button size="lg">Explorer le catalogue <ArrowUpRight className="w-4 h-4" /></Button>
            </Link>
            <Link href="/videos">
              <Button variant="ghost" size="lg"><Play className="w-4 h-4" /> Voir en action</Button>
            </Link>
          </motion.div>

          <div className="mt-10 grid grid-cols-3 gap-6 max-w-[420px] border-t border-white/10 pt-6">
            {[
              { k: "Authenticité", v: "100%" },
              { k: "Livraison Cotonou", v: "24H" },
              { k: "Clients", v: "2.4k+" },
            ].map((s) => (
              <div key={s.k}>
                <div className="font-display text-[28px] leading-none">{s.v}</div>
                <div className="text-[11px] tracking-widest uppercase text-[#8A8F98] mt-1">{s.k}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 3D */}
        <div className="relative lg:-mr-8">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(198,255,61,0.18),transparent_65%)] pointer-events-none" />
          <Hero3D />
          {/* Floating cards */}
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="absolute top-[18%] left-[8%] bg-[#F5F5F0] text-black px-4 py-3 shadow-2xl hidden md:block"
          >
            <div className="text-[11px] tracking-widest uppercase opacity-60">Nouveau</div>
            <div className="font-display text-[14px] leading-none mt-1">VOLT ARC-1<br />COTONOU NIGHT</div>
            <div className="mt-2 text-[12px] font-bold">89 000 XOF</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20, rotate: 2 }}
            animate={{ opacity: 1, y: 0, rotate: 2 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-[20%] right-[6%] bg-[#0D0D0F] border border-white/10 px-4 py-3 hidden md:flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-[#C6FF3D] grid place-items-center text-black">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] tracking-widest uppercase text-[#8A8F98]">Livraison</div>
              <div className="font-display text-[13px]">24H COTONOU</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHY VOLT229 */}
      <section className="mx-auto max-w-[1600px] px-5 md:px-8 py-20 border-t border-white/[0.06]">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Truck, title: "Livraison locale 24h", desc: "Cotonou, Porto-Novo, Parakou. Suivi en temps réel via WhatsApp. Retrait gratuit Fidjrossè.", accent: "#C6FF3D" },
            { icon: ShieldCheck, title: "100% Authentique", desc: "Sourcing direct, facture, QR vérifiable. Zéro fake. On joue franc jeu, comme sur le terrain.", accent: "#F5F5F0" },
            { icon: Smartphone, title: "Paiement MoMo", desc: "MTN MoMo, Moov Money, Fedapay, cash à la livraison. Sans friction, sans frais cachés.", accent: "#E63946" },
          ].map((f, i) => (
            <ScrollReveal key={f.title} delay={i * 0.1}>
              <div className="group relative bg-[#121214] border border-white/[0.06] p-7 hover:border-white/15 transition-colors">
                <div className="w-10 h-10 rounded-full flex items-center justify-center border" style={{ borderColor: f.accent + "40", color: f.accent }}>
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="mt-5 font-display text-[18px] tracking-wide">{f.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-[#8A8F98]">{f.desc}</p>
                <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* FEATURED GRID */}
      <section className="mx-auto max-w-[1600px] px-5 md:px-8 py-12">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <div className="font-display text-[13px] tracking-[0.2em] uppercase text-[#C6FF3D]">Sélection VOLT</div>
            <h2 className="mt-2 font-display text-[42px] md:text-[64px] leading-[0.9]">NOUVEAUTÉS<br />& CLASSIQUES</h2>
          </div>
          <Link href="/catalogue" className="hidden md:inline-flex items-center gap-2 font-display text-[13px] tracking-widest uppercase border-b border-white/20 pb-1 hover:border-[#C6FF3D] hover:text-[#C6FF3D] transition-colors">
            Voir tout le catalogue <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

        <div className="md:hidden mt-8">
          <Link href="/catalogue" className="w-full">
            <Button variant="ghost" size="lg" className="w-full">Voir tout le catalogue</Button>
          </Link>
        </div>
      </section>

      {/* VIDEO PREVIEW */}
      <section className="relative mt-8 bg-[#F5F5F0] text-black overflow-hidden">
        <div className="mx-auto max-w-[1600px] px-5 md:px-8 py-16 md:py-24 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
          <div>
            <div className="inline-flex px-3 py-1 bg-black text-white font-display text-[11px] tracking-widest uppercase">CULTURE • TERRAIN • COTONOU</div>
            <h2 className="mt-6 font-display text-[48px] md:text-[72px] leading-[0.85] tracking-[-0.02em]">
              FAIT POUR
              <br />
              LE GOUDRON
              <br />
              <span className="bg-[#C6FF3D] px-2">CHAUD.</span>
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-black/60 max-w-[420px]">
              On teste chaque paire sous 38°C à Fidjrossè. Traction, respirabilité, amorti qui tient. Pas de marketing — du terrain.
            </p>
            <div className="mt-8 flex gap-3">
              <Link href="/videos"><Button variant="secondary" size="lg">Voir les tests terrain</Button></Link>
            </div>
          </div>

          <div className="relative aspect-[16/10] bg-black overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,#0D0D0F_0%,#1A1A1E_100%)]" />
            {/* fake video thumbnail with animated lines */}
            <div className="absolute inset-0 grid place-items-center">
              <div className="w-[88px] h-[88px] rounded-full bg-[#C6FF3D] grid place-items-center shadow-[0_0_50px_rgba(198,255,61,0.5)] group-hover:scale-110 transition-transform duration-500">
                <Play className="w-7 h-7 text-black ml-1" fill="black" />
              </div>
            </div>
            <div className="absolute bottom-0 inset-x-0 p-4 flex justify-between items-end">
              <div className="bg-white text-black px-3 py-2 font-display text-[12px] tracking-widest">UNBOXING • VOLT ARC-1 • 2:34</div>
              <div className="bg-black text-white px-3 py-2 text-[11px] tracking-widest uppercase">720p • 60fps • Cotonou</div>
            </div>
            {/* scanlines */}
            <div className="absolute inset-0 opacity-[0.04] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,white_2px,white_3px)] pointer-events-none" />
          </div>
        </div>
      </section>

      {/* NEW DROPS CAROUSEL */}
      <section className="mx-auto max-w-[1600px] px-5 md:px-8 py-16">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="font-display text-[28px] tracking-wide">DERNIERS DROPS</h3>
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-[11px] tracking-[0.2em] uppercase text-[#8A8F98]">Scroll →</span>
        </div>
        <div className="flex gap-5 overflow-x-auto no-scrollbar pb-4 snap-x">
          {newDrops.concat(products.slice(4,8)).map((p, i) => (
            <div key={p.id + i} className="min-w-[280px] snap-start">
              <ProductCard product={p} index={i} />
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-[1600px] px-5 md:px-8 py-16 border-t border-white/10">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Junior A.", city: "Fidjrossè • Meneur", text: "GT Jump 2 reçue en 6h. La traction sur goudron est folle. VOLT c'est le seul shop qui comprend le terrain béninois.", rating: 5 },
            { name: "Fatou K.", city: "Haie Vive • Ailière", text: "Paiement MoMo sans galère, pointure conseillée par VOLT chatbot parfaite. Enfin un vrai shop premium au Bénin.", rating: 5 },
            { name: "Marius D.", city: "Ganhi • Pivot", text: "LeBron XXI en 46 trouvé ici alors que StockX me taxait 40k de shipping. Livré, authentique, boîte nickel.", rating: 5 },
          ].map((t, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="bg-[#121214] border border-white/[0.06] p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-[#C6FF3D] text-[#C6FF3D]" />
                  ))}
                </div>
                <p className="text-[14px] leading-relaxed">"{t.text}"</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 grid place-items-center font-display text-[12px]">{t.name[0]}</div>
                  <div>
                    <div className="font-display text-[13px] tracking-wide">{t.name}</div>
                    <div className="text-[11px] text-[#8A8F98]">{t.city}</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
