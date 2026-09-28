import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-[#08080A] border-t border-white/[0.06] mt-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[200px] right-[10%] w-[600px] h-[600px] bg-[#C6FF3D]/[0.04] rounded-full blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-5 md:px-8 py-16">
        <div className="grid md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-[#C6FF3D] flex items-center justify-center">
                <svg viewBox="0 0 32 32" className="w-6 h-6 text-black" fill="none">
                  <path d="M18 2L6 18H14L10 30L26 12H16L18 2Z" fill="currentColor" />
                </svg>
              </div>
              <span className="font-display text-[22px]">
                VOLT<span className="text-[#C6FF3D]">229</span>
              </span>
            </div>
            <p className="text-[#8A8F98] text-[14px] leading-relaxed max-w-[320px]">
              La sneaker culture béninoise commence ici. Baskets basketball authentiques, paiement Mobile Money, livraison 24h à Cotonou.
            </p>
            <div className="mt-6 flex gap-3">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] tracking-widest uppercase">MTN MoMo</span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] tracking-widest uppercase">Moov Money</span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] tracking-widest uppercase">Fedapay</span>
            </div>
          </div>

          <div>
            <h4 className="font-display text-[13px] tracking-[0.2em] uppercase mb-5 text-white/90">Boutique</h4>
            <ul className="space-y-3 text-[14px] text-[#8A8F98]">
              <li><Link href="/catalogue" className="hover:text-white transition">Nouveautés</Link></li>
              <li><Link href="/catalogue?brand=VOLT" className="hover:text-white transition">VOLT Originals</Link></li>
              <li><Link href="/catalogue?category=performance" className="hover:text-white transition">Performance</Link></li>
              <li><Link href="/catalogue?category=retro" className="hover:text-white transition">Retro</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-[13px] tracking-[0.2em] uppercase mb-5 text-white/90">Aide</h4>
            <ul className="space-y-3 text-[14px] text-[#8A8F98]">
              <li><span className="hover:text-white transition cursor-pointer">Guide des pointures</span></li>
              <li><span className="hover:text-white transition cursor-pointer">Livraison & Retours</span></li>
              <li><span className="hover:text-white transition cursor-pointer">Authenticité</span></li>
              <li><Link href="/a-propos" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-[13px] tracking-[0.2em] uppercase mb-5 text-white/90">Cotonou</h4>
            <p className="text-[14px] text-[#8A8F98] leading-relaxed">
              Fidjrossè, rue 12.127<br />
              Livraison : Cotonou, Porto-Novo, Parakou, Abomey<br />
              <span className="text-[#C6FF3D]">+229 01 52 00 00 00</span>
            </p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row justify-between gap-4 text-[12px] text-[#8A8F98] tracking-wide">
          <span>© 2026 VOLT229 — Tous droits réservés. Fait avec ⚡ à Cotonou.</span>
          <span className="uppercase tracking-[0.2em]">Bénin • 229 • Volt</span>
        </div>
      </div>
    </footer>
  );
}
