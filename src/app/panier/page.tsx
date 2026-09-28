"use client";
import { useCart } from "@/components/cart/CartContext";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { Trash2, Smartphone, Truck, ShieldCheck, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function PanierPage() {
  const { items, removeItem, totalPrice, clear, totalItems } = useCart();
  const [payment, setPayment] = useState<"mtn" | "moov" | "fedapay" | "cash">("mtn");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Cotonou");
  const [orderDone, setOrderDone] = useState(false);

  const deliveryFee = city === "Cotonou" ? 2000 : city === "Porto-Novo" ? 3500 : 5000;
  const grandTotal = totalPrice + deliveryFee;

  if (orderDone) {
    return (
      <div className="mx-auto max-w-[800px] px-5 md:px-8 py-24 text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-[#C6FF3D] text-black grid place-items-center text-3xl">✓</div>
        <h1 className="mt-8 font-display text-[48px] leading-[0.9]">COMMANDE<br /><span className="text-[#C6FF3D]">CONFIRMÉE</span></h1>
        <p className="mt-4 text-[#8A8F98] max-w-[480px] mx-auto">Merci ! On prépare ta paire à Fidjrossè. Tu reçois un SMS + suivi WhatsApp dans 5 min. Livraison {city} sous {city === "Cotonou" ? "24h" : "48-72h"}.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/catalogue"><Button variant="ghost">Continuer shopping</Button></Link>
          <Link href="/"><Button>Retour accueil</Button></Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-[800px] px-5 md:px-8 py-24 text-center">
        <h1 className="font-display text-[48px] leading-[0.9]">PANIER<br />VIDE</h1>
        <p className="mt-4 text-[#8A8F98]">Ajoute des bangers, on s'occupe du reste — MoMo, livraison 24h.</p>
        <div className="mt-8">
          <Link href="/catalogue"><Button size="lg">Explorer le catalogue</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1600px] px-5 md:px-8 py-8">
      <h1 className="font-display text-[40px] md:text-[64px] leading-[0.9]">PANIER <span className="text-[#8A8F98] text-[20px] align-middle">({totalItems})</span></h1>

      <div className="mt-8 grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
        {/* Items */}
        <div className="space-y-4">
          {items.map((it, idx) => (
            <div key={idx} className="flex gap-4 p-4 bg-[#121214] border border-white/10">
              <div className="w-[96px] h-[96px] bg-[#0D0D0F] border border-white/10 shrink-0 overflow-hidden">
                <img src={it.product.image} alt={it.product.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-4">
                  <div>
                    <div className="font-display text-[14px] leading-tight">{it.product.name}</div>
                    <div className="mt-1 text-[11px] tracking-widest uppercase text-[#8A8F98]">{it.product.brand} • Pointure {it.size} • {it.colorName}</div>
                  </div>
                  <button onClick={() => removeItem(it.product.id, it.size)} className="w-8 h-8 grid place-items-center bg-white/5 hover:bg-[#E63946] hover:text-white transition rounded-full shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <div className="font-display text-[16px]">{formatPrice(it.product.price * it.qty)}</div>
                  <div className="flex items-center gap-2 text-[12px] text-[#8A8F98]">
                    Qté {it.qty} • {formatPrice(it.product.price)} / paire
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex gap-3 pt-2">
            <button onClick={clear} className="text-[12px] tracking-widest uppercase underline decoration-white/20 underline-offset-4 hover:decoration-white">Vider panier</button>
            <Link href="/catalogue" className="text-[12px] tracking-widest uppercase underline decoration-white/20 underline-offset-4 hover:decoration-white">Continuer shopping</Link>
          </div>
        </div>

        {/* Checkout */}
        <div className="lg:sticky lg:top-[88px] space-y-6">
          <div className="bg-[#121214] border border-white/10 p-6">
            <h3 className="font-display text-[16px] tracking-wide">Récapitulatif</h3>
            <div className="mt-4 space-y-2 text-[13px]">
              <div className="flex justify-between"><span className="text-[#8A8F98]">Sous-total</span><span>{formatPrice(totalPrice)}</span></div>
              <div className="flex justify-between"><span className="text-[#8A8F98]">Livraison {city}</span><span>{formatPrice(deliveryFee)}</span></div>
              <div className="h-px bg-white/10 my-3" />
              <div className="flex justify-between font-display text-[18px]"><span>Total</span><span className="text-[#C6FF3D]">{formatPrice(grandTotal)}</span></div>
            </div>

            <div className="mt-6">
              <label className="font-display text-[11px] tracking-widest uppercase text-[#8A8F98]">Ville de livraison</label>
              <select value={city} onChange={(e) => setCity(e.target.value)} className="mt-2 w-full h-11 bg-[#0D0D0F] border border-white/10 px-3 text-[13px] outline-none focus:border-[#C6FF3D]/50">
                <option>Cotonou</option>
                <option>Porto-Novo</option>
                <option>Parakou</option>
                <option>Abomey</option>
              </select>
            </div>

            <div className="mt-6">
              <h4 className="font-display text-[11px] tracking-widest uppercase text-[#8A8F98] mb-3">Paiement</h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "mtn", label: "MTN MoMo", desc: "Sans frais" },
                  { id: "moov", label: "Moov Money", desc: "Sans frais" },
                  { id: "fedapay", label: "Fedapay", desc: "Carte" },
                  { id: "cash", label: "Cash", desc: "À la livraison" },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setPayment(m.id as any)}
                    className={`p-3 border text-left transition ${payment === m.id ? "bg-[#C6FF3D] text-black border-[#C6FF3D]" : "bg-white/[0.04] border-white/10 hover:border-white/20"}`}
                  >
                    <div className="font-display text-[12px] tracking-wide flex items-center gap-1.5"><Smartphone className="w-3 h-3" /> {m.label}</div>
                    <div className={`text-[11px] mt-1 ${payment === m.id ? "text-black/60" : "text-[#8A8F98]"}`}>{m.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {(payment === "mtn" || payment === "moov") && (
              <div className="mt-4">
                <label className="font-display text-[11px] tracking-widest uppercase text-[#8A8F98]">Numéro {payment === "mtn" ? "MTN" : "Moov"}</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+229 01 XX XX XX XX" className="mt-2 w-full h-11 bg-[#0D0D0F] border border-white/10 px-3 text-[13px] outline-none focus:border-[#C6FF3D]/50 placeholder:text-[#8A8F98]/50" />
              </div>
            )}

            <Button size="lg" className="w-full mt-6" onClick={() => setOrderDone(true)}>
              Payer {formatPrice(grandTotal)} <ArrowRight className="w-4 h-4" />
            </Button>

            <div className="mt-4 flex gap-2 text-[11px] text-[#8A8F98]">
              <ShieldCheck className="w-4 h-4 shrink-0" /> Paiement sécurisé • Reçu instantané • Authentique garanti
            </div>
          </div>

          <div className="bg-[#F5F5F0] text-black p-4 flex gap-3">
            <Truck className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="text-[12px] leading-relaxed"><span className="font-bold">Livraison 24h à Cotonou.</span> Commande avant 16h, livrée ce soir. Suivi WhatsApp + appel livreur.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
