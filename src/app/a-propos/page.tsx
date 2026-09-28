"use client";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Button from "@/components/ui/Button";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export default function AProposPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-5 md:px-8 py-8">
      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
        <div>
          <div className="inline-flex px-3 py-1 bg-[#C6FF3D] text-black font-display text-[11px] tracking-widest uppercase rotate-[-1deg]">Depuis 2024 • Cotonou</div>
          <h1 className="mt-6 font-display text-[48px] md:text-[84px] leading-[0.85] tracking-[-0.02em]">
            ON N'A PAS
            <br />
            CRÉÉ UN SHOP.
            <br />
            <span className="text-[#C6FF3D]">ON A CRÉÉ</span>
            <br />
            UN TERRAIN.
          </h1>

          <div className="mt-10 space-y-6 text-[15px] leading-relaxed text-[#8A8F98] max-w-[560px]">
            <p>
              VOLT229 est né sur le goudron de Fidjrossè. Pas dans un bureau climatisé. On en avait marre de commander sur StockX, payer 40k de shipping, attendre 3 semaines et recevoir une paire qui glisse sous la chaleur.
            </p>
            <p className="text-[#F5F5F0]">
              Alors on a fait simple : stock local à Cotonou, 100% authentique, paiement Mobile Money, livraison 24h. Et nos propres paires — VOLT ARC-1, COURT-229 — pensées pour le terrain béninois : respirabilité, traction goudron chaud, amorti qui tient à 38°C.
            </p>
            <p>
              229 = indicatif du Bénin. Volt = énergie du terrain. On n'est pas un revendeur. On est des joueurs qui vendent aux joueurs.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-6 max-w-[480px] border-y border-white/10 py-6">
            {[
              { k: "Paires livrées", v: "2.4k+" },
              { k: "Taux retour", v: "2.1%" },
              { k: "Note clients", v: "4.8/5" },
            ].map((s) => (
              <div key={s.k}>
                <div className="font-display text-[28px] leading-none text-[#C6FF3D]">{s.v}</div>
                <div className="text-[11px] tracking-widest uppercase text-[#8A8F98] mt-1">{s.k}</div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <h3 className="font-display text-[18px] tracking-wide">L'équipe</h3>
            <div className="mt-4 grid grid-cols-2 gap-4 max-w-[480px]">
              {[
                { name: "Kémi — Founder", role: "Ex-meneur U18 Bénin, design VOLT ARC-1" },
                { name: "Jordy — Ops", role: "Logistique 24h, 2.4k paires livrées" },
              ].map((p) => (
                <div key={p.name} className="bg-[#121214] border border-white/10 p-4">
                  <div className="font-display text-[13px]">{p.name}</div>
                  <div className="mt-1 text-[12px] text-[#8A8F98]">{p.role}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6 lg:sticky lg:top-[88px]">
          <div className="bg-[#121214] border border-white/10 p-6">
            <h3 className="font-display text-[16px] tracking-wide">Contact direct</h3>
            <div className="mt-6 space-y-4">
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 grid place-items-center shrink-0"><MapPin className="w-4 h-4" /></div>
                <div className="text-[13px] leading-relaxed">
                  <div className="font-display text-[12px] tracking-wide">Shop & Stock</div>
                  <div className="text-[#8A8F98]">Fidjrossè, rue 12.127, Cotonou<br />Ouvert lun-sam 10h-19h • Retrait gratuit</div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 grid place-items-center shrink-0"><Phone className="w-4 h-4" /></div>
                <div className="text-[13px]">
                  <div className="font-display text-[12px] tracking-wide">WhatsApp / Appel</div>
                  <div className="text-[#C6FF3D]">+229 01 52 00 00 00</div>
                  <div className="text-[#8A8F98] text-[11px]">Réponse en 3 min • 8h-22h</div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 grid place-items-center shrink-0"><Mail className="w-4 h-4" /></div>
                <div className="text-[13px]">
                  <div className="font-display text-[12px] tracking-wide">Email</div>
                  <div className="text-[#8A8F98]">volt@volt229.bj</div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-display text-[12px] tracking-widest uppercase text-[#8A8F98] mb-3">Envoie un message</h4>
              <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                <input placeholder="Ton nom" className="w-full h-11 bg-[#0D0D0F] border border-white/10 px-4 text-[13px] outline-none focus:border-[#C6FF3D]/50" />
                <input placeholder="WhatsApp ou email" className="w-full h-11 bg-[#0D0D0F] border border-white/10 px-4 text-[13px] outline-none focus:border-[#C6FF3D]/50" />
                <textarea placeholder="Ton message — pointure, modèle, livraison ?" rows={4} className="w-full bg-[#0D0D0F] border border-white/10 p-4 text-[13px] outline-none focus:border-[#C6FF3D]/50 resize-none" />
                <Button size="lg" className="w-full">Envoyer • Réponse en 3 min <ArrowUpRight className="w-4 h-4" /></Button>
              </form>
            </div>
          </div>

          <div className="bg-[#C6FF3D] text-black p-6">
            <div className="font-display text-[20px] leading-[0.9]">TU VEUX TESTER<br />AVANT D'ACHETER ?</div>
            <p className="mt-3 text-[13px] leading-relaxed text-black/70">Passe au shop Fidjrossè. On a toutes les pointures en test. Tu shoots, tu dribbles, tu décides. Pas de pression.</p>
            <Link href="/catalogue" className="mt-4 inline-flex items-center gap-2 font-display text-[12px] tracking-widest uppercase border-b border-black pb-1">
              Voir le stock local <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <ScrollReveal>
        <div className="mt-24 border-t border-white/10 pt-12">
          <div className="font-display text-[14px] tracking-[0.3em] uppercase text-[#8A8F98]">Manifeste</div>
          <div className="mt-6 grid md:grid-cols-3 gap-8 font-display text-[28px] md:text-[36px] leading-[0.9] tracking-[-0.01em]">
            <div>1. AUTHENTIQUE<br /><span className="text-[#8A8F98] text-[16px] font-body normal-case">Ou rien. Zéro fake, facture, QR.</span></div>
            <div>2. LOCAL<br /><span className="text-[#8A8F98] text-[16px] font-body normal-case">Stock Cotonou, livraison 24h, MoMo.</span></div>
            <div>3. TERRAIN<br /><span className="text-[#8A8F98] text-[16px] font-body normal-case">Pensé pour le goudron chaud, pas pour Instagram.</span></div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
