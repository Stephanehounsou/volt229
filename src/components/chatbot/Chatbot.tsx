"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { products } from "@/lib/products";

type Msg = { role: "user" | "assistant"; text: string };

const SYSTEM_PROMPT = `Tu es VOLT, l'assistant de VOLT229, boutique sneakers basketball au Bénin. Ton ton: énergique, premium, rapide, jamais criard. Tu connais les pointures, stocks, livraison Cotonou 24h, paiement MTN MoMo / Moov Money / Fedapay. Tu conseilles pointure, modèle selon poste basket, budget. Tu es concis.`;

function fakeAIResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("pointure") || lower.includes("taille")) {
    return "Pour le basket, prends +0.5 au-dessus de ta pointure ville. Si tu fais du 42 ville → 42.5 ou 43 sur nos perfs (Nike GT, LeBron). Tu joues quel poste ? Meneur = léger (TWO WXY, AE 1), intérieur = amorti max (LeBron XXI, GT Jump 2).";
  }
  if (lower.includes("livraison")) {
    return "Livraison 24h à Cotonou (Fidjrossè, Haie Vive, Ganhi, Akpakpa) pour 2 000 XOF. Porto-Novo 48h — 3 500 XOF. Parakou/Abomey 72h — 5 000 XOF. Retrait gratuit au shop Fidjrossè.";
  }
  if (lower.includes("paiement") || lower.includes("momo") || lower.includes("mobile")) {
    return "On prend MTN MoMo, Moov Money (sans frais), Fedapay carte, et cash à la livraison à Cotonou. Paiement 100% sécurisé, tu reçois un reçu instantané.";
  }
  if (lower.includes("authentique") || lower.includes("vrai") || lower.includes("fake")) {
    return "100% authentique. On source direct Nike, Jordan, Adidas, Puma, New Balance + nos propres VOLT Originals. Facture + boîte + vérif QR. Pas de fake chez VOLT229, c'est notre promesse 229.";
  }
  if (lower.includes("volt") || lower.includes("arc-1")) {
    return "VOLT ARC-1 'Cotonou Night' — notre best-seller. ArcFoam réactif, VoltWeave respirant, traction pour goudron chaud. 89 000 XOF au lieu de 110k. Il reste du 40 au 45. Tu veux que je check ta pointure ?";
  }
  if (lower.includes("dispo") || lower.includes("stock")) {
    const p = products[Math.floor(Math.random() * 3)];
    return `Oui, ${p.name} est dispo en ${p.sizes.slice(0,3).join(", ")}... Stock local Cotonou. Tu veux que je te le réserve 2h ?`;
  }
  return "Bien vu ⚡ Je suis VOLT. Je peux t'aider sur : pointure, dispo, livraison 24h Cotonou, paiement MoMo, ou te conseiller une paire selon ton jeu. Tu cherches quoi — perf terrain ou lifestyle ? Donne ton budget et ta pointure, je te sors 2-3 bangers.";
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", text: "Yo ⚡ C'est VOLT. La sneaker culture béninoise commence ici. Besoin d'un conseil pointure, dispo ou livraison ?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, typing]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Msg = { role: "user", text: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", text: fakeAIResponse(userMsg.text) }]);
      setTyping(false);
    }, 700 + Math.random() * 600);
  };

  return (
    <>
      {/* Floating bubble */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-[#C6FF3D] text-black shadow-[0_8px_30px_rgba(198,255,61,0.4)] flex items-center justify-center hover:scale-105 transition-transform"
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {open ? <X className="w-6 h-6" key="x" /> : <MessageCircle className="w-6 h-6" key="msg" />}
        </AnimatePresence>
        {!open && <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#E63946] rounded-full animate-pulse border-2 border-[#0D0D0F]" />}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", damping: 22, stiffness: 300 }}
            className="fixed bottom-[84px] right-5 z-50 w-[92vw] max-w-[380px] h-[520px] bg-[#121214] border border-white/10 rounded-[16px] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.6)] flex flex-col"
          >
            {/* Header */}
            <div className="h-[56px] px-4 flex items-center justify-between bg-[#0D0D0F] border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#C6FF3D] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-black" />
                </div>
                <div>
                  <div className="font-display text-[13px] tracking-widest">VOLT • ASSISTANT</div>
                  <div className="text-[11px] text-[#8A8F98] -mt-0.5 flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" /> En ligne • Réponse instantanée
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="w-8 h-8 grid place-items-center rounded-full bg-white/5 hover:bg-white/10">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-[radial-gradient(ellipse_at_top,rgba(198,255,61,0.06),transparent_50%)]">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] px-3.5 py-2.5 rounded-[14px] text-[13.5px] leading-relaxed ${
                      m.role === "user"
                        ? "bg-[#C6FF3D] text-black rounded-br-[4px]"
                        : "bg-white/[0.06] border border-white/10 text-[#F5F5F0] rounded-bl-[4px]"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="px-3.5 py-2.5 rounded-[14px] rounded-bl-[4px] bg-white/[0.06] border border-white/10">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:0.1s]" />
                      <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:0.2s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick prompts */}
            <div className="px-3 py-2 flex gap-2 overflow-x-auto no-scrollbar border-t border-white/5">
              {["Pointure ?", "Livraison Cotonou", "Paiement MoMo", "VOLT ARC-1"].map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    setInput(q);
                    setTimeout(send, 50);
                  }}
                  className="shrink-0 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] tracking-wide hover:bg-white/10 transition"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10 bg-[#0D0D0F] flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Demande pointure, stock, livraison..."
                className="flex-1 h-11 px-4 rounded-full bg-white/[0.06] border border-white/10 text-[13.5px] outline-none focus:border-[#C6FF3D]/50 placeholder:text-[#8A8F98]"
              />
              <button
                onClick={send}
                className="w-11 h-11 rounded-full bg-[#C6FF3D] text-black grid place-items-center hover:bg-white transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
