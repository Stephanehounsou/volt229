"use client";
import { useState } from "react";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <div className="min-h-[80vh] grid lg:grid-cols-[1.1fr_0.9fr]">
      {/* Left form */}
      <div className="flex items-center justify-center px-5 md:px-12 py-16">
        <div className="w-full max-w-[420px]">
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => setMode("login")}
              className={`h-10 px-5 font-display text-[12px] tracking-widest uppercase border transition ${mode === "login" ? "bg-white text-black border-white" : "bg-transparent border-white/20 text-white/60 hover:text-white"}`}
            >
              Connexion
            </button>
            <button
              onClick={() => setMode("register")}
              className={`h-10 px-5 font-display text-[12px] tracking-widest uppercase border transition ${mode === "register" ? "bg-white text-black border-white" : "bg-transparent border-white/20 text-white/60 hover:text-white"}`}
            >
              Inscription
            </button>
          </div>

          <h1 className="font-display text-[36px] leading-[0.9]">
            {mode === "login" ? "BON RETOUR\nSUR LE TERRAIN." : "REJOINS\nVOLT229."}
          </h1>
          <p className="mt-4 text-[13px] text-[#8A8F98] leading-relaxed">
            {mode === "login"
              ? "Connecte-toi pour suivre tes commandes, ta pointure enregistrée, tes favoris."
              : "Crée ton compte en 20s. Pointure mémorisée, suivi WhatsApp, early access drops."}
          </p>

          <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
            {mode === "register" && <input placeholder="Nom complet" className="w-full h-12 bg-[#121214] border border-white/10 px-4 text-[14px] outline-none focus:border-[#C6FF3D]/50" />}
            <input placeholder="Email ou WhatsApp (+229)" className="w-full h-12 bg-[#121214] border border-white/10 px-4 text-[14px] outline-none focus:border-[#C6FF3D]/50" />
            <input type="password" placeholder="Mot de passe" className="w-full h-12 bg-[#121214] border border-white/10 px-4 text-[14px] outline-none focus:border-[#C6FF3D]/50" />
            {mode === "register" && (
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="Pointure (ex: 42.5)" className="h-12 bg-[#121214] border border-white/10 px-4 text-[14px] outline-none focus:border-[#C6FF3D]/50" />
                <select className="h-12 bg-[#121214] border border-white/10 px-4 text-[14px] outline-none focus:border-[#C6FF3D]/50">
                  <option>Poste: Meneur</option>
                  <option>Arrière</option>
                  <option>Ailier</option>
                  <option>Intérieur</option>
                  <option>Pivot</option>
                </select>
              </div>
            )}

            <Button size="lg" className="w-full mt-2">
              {mode === "login" ? "Se connecter" : "Créer mon compte • 20s"}
            </Button>

            <div className="relative my-6">
              <div className="h-px bg-white/10" />
              <span className="absolute left-1/2 -translate-x-1/2 -top-2 px-3 bg-[#0D0D0F] text-[11px] tracking-widest uppercase text-[#8A8F98]">Ou</span>
            </div>

            <button className="w-full h-12 border border-white/15 bg-white/[0.03] flex items-center justify-center gap-2.5 text-[13px] hover:bg-white/10 transition">
              <span className="w-5 h-5 rounded-full bg-white text-black grid place-items-center font-bold text-[12px]">G</span> Continuer avec Google
            </button>

            <div className="pt-4 text-[11px] text-[#8A8F98] text-center">
              En continuant, tu acceptes nos CGV • Livraison 24h Cotonou • Paiement MoMo sécurisé
            </div>
          </form>
        </div>
      </div>

      {/* Right visual */}
      <div className="hidden lg:block relative bg-[#F5F5F0] text-black overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(198,255,61,0.5),transparent_60%)]" />
        <div className="relative h-full p-12 flex flex-col justify-between">
          <div>
            <div className="inline-flex px-3 py-1 bg-black text-white font-display text-[11px] tracking-widest uppercase">VOLT229 • MEMBRE</div>
            <h2 className="mt-8 font-display text-[64px] leading-[0.85] tracking-[-0.02em]">
              TES
              <br />
              POINTURES
              <br />
              MÉMORISÉES.
              <br />
              TES DROPS
              <br />
              EN AVANCE.
            </h2>
          </div>

          <div className="space-y-4">
            <div className="bg-black text-white p-4 flex justify-between items-center">
              <div>
                <div className="font-display text-[12px] tracking-widest uppercase text-white/60">Avantage membre</div>
                <div className="mt-1 font-display text-[16px]">Early access • -10% premier achat</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#C6FF3D] text-black grid place-items-center">⚡</div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-[12px]">
              <div className="bg-white border border-black/10 p-3">
                <div className="font-bold">Suivi WhatsApp</div>
                <div className="text-black/60 mt-1 leading-relaxed">Chaque commande notifiée, livreur en direct.</div>
              </div>
              <div className="bg-white border border-black/10 p-3">
                <div className="font-bold">Pointure stockée</div>
                <div className="text-black/60 mt-1 leading-relaxed">Plus besoin de re-mesurer, on s'en souvient.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
