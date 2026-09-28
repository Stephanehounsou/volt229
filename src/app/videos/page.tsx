"use client";
import { useState } from "react";
import { Play, Clock, Eye } from "lucide-react";
import { motion } from "framer-motion";

const videos = [
  { id: "v1", title: "VOLT ARC-1 — Test terrain Fidjrossè 38°C", duration: "2:34", views: "12k", tag: "TEST TERRAIN", thumb: "bg-[#C6FF3D]" },
  { id: "v2", title: "Unboxing GT Jump 2 '229' — Édition Bénin", duration: "4:12", views: "8.4k", tag: "UNBOXING", thumb: "bg-[#0D0D0F]" },
  { id: "v3", title: "Comment choisir sa pointure basket ? Guide VOLT", duration: "3:05", views: "15k", tag: "GUIDE", thumb: "bg-[#E63946]" },
  { id: "v4", title: "Cotonou Streetball — Tournoi Ganhi x VOLT229", duration: "6:48", views: "22k", tag: "CULTURE", thumb: "bg-[#F5F5F0]" },
  { id: "v5", title: "LeBron XXI vs KD 17 — Quel amorti pour pivot ?", duration: "5:20", views: "9.1k", tag: "COMPARATIF", thumb: "bg-[#8A8F98]" },
  { id: "v6", title: "Puma MB.03 — Traction test sur goudron mouillé", duration: "2:58", views: "6.7k", tag: "TEST TERRAIN", thumb: "bg-[#1A1A1E]" },
];

export default function VideosPage() {
  const [active, setActive] = useState(videos[0]);

  return (
    <div className="mx-auto max-w-[1600px] px-5 md:px-8 py-8">
      <h1 className="font-display text-[40px] md:text-[72px] leading-[0.9]">VIDÉOS<br /><span className="text-[#C6FF3D]">TERRAIN</span></h1>
      <p className="mt-4 text-[#8A8F98] max-w-[560px] text-[14px]">Unboxing, tests terrain sous chaleur, culture basket béninoise. Pas de studio — on filme là où tu joues.</p>

      <div className="mt-8 grid lg:grid-cols-[1.5fr_0.7fr] gap-6 items-start">
        {/* Player */}
        <div className="relative aspect-[16/9] bg-black border border-white/10 overflow-hidden group">
          <div className={`absolute inset-0 ${active.thumb} opacity-20`} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.8)_100%)]" />
          <div className="absolute inset-0 grid place-items-center">
            <motion.div whileHover={{ scale: 1.08 }} className="w-[92px] h-[92px] rounded-full bg-[#C6FF3D] text-black grid place-items-center shadow-[0_0_60px_rgba(198,255,61,0.6)] cursor-pointer">
              <Play className="w-8 h-8 ml-1" fill="black" />
            </motion.div>
          </div>
          <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
            <div className="inline-flex px-2.5 py-1 bg-[#C6FF3D] text-black font-display text-[10px] tracking-widest uppercase mb-3">{active.tag}</div>
            <h2 className="font-display text-[20px] md:text-[28px] leading-[0.95] max-w-[70%]">{active.title}</h2>
            <div className="mt-3 flex gap-4 text-[12px] text-white/60">
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {active.duration}</span>
              <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" /> {active.views} vues</span>
              <span>• Cotonou • 60fps</span>
            </div>
          </div>
          {/* scanlines */}
          <div className="absolute inset-0 opacity-[0.05] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,white_2px,white_3px)] pointer-events-none" />
        </div>

        {/* Playlist */}
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
          {videos.map((v) => (
            <button
              key={v.id}
              onClick={() => setActive(v)}
              className={`w-full text-left flex gap-3 p-3 border transition ${active.id === v.id ? "bg-white text-black border-white" : "bg-[#121214] border-white/10 hover:border-white/20 text-white"}`}
            >
              <div className={`w-[96px] h-[56px] ${v.thumb} border border-black/10 relative shrink-0 grid place-items-center`}>
                <Play className="w-4 h-4 text-black/70" fill="currentColor" />
                <span className="absolute bottom-1 right-1 bg-black text-white text-[10px] px-1 font-display">{v.duration}</span>
              </div>
              <div className="min-w-0">
                <div className={`text-[11px] tracking-widest uppercase font-display ${active.id === v.id ? "text-black/60" : "text-[#C6FF3D]"}`}>{v.tag}</div>
                <div className="mt-1 font-display text-[13px] leading-tight line-clamp-2">{v.title}</div>
                <div className={`mt-1 text-[11px] ${active.id === v.id ? "text-black/60" : "text-[#8A8F98]"}`}>{v.views} vues</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-16 grid md:grid-cols-3 gap-6">
        {[
          { k: "Tests terrain réels", v: "On filme à 14h sous 38°C à Fidjrossè. Pas de clim, pas de bullshit. Si ça glisse, on te le dit." },
          { k: "Culture locale", v: "Tournois Ganhi, streetball Haie Vive, interviews joueurs béninois. La sneaker culture 229 existe." },
          { k: "Guides pointure", v: "VOLT mesure chaque modèle. On te dit exactement quoi prendre selon ton pied et ton poste." },
        ].map((f) => (
          <div key={f.k} className="border-t border-white/10 pt-6">
            <div className="font-display text-[16px]">{f.k}</div>
            <p className="mt-2 text-[13px] leading-relaxed text-[#8A8F98]">{f.v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
