// src/components/CtaBanner.tsx
"use client";

import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, Sparkles } from "lucide-react";

interface CtaBannerProps {
  onOpenContact?: () => void;
}

export default function CtaBanner({ onOpenContact }: CtaBannerProps) {
  const { t } = useLanguage();

  return (
    <section className="relative py-24 px-6 sm:px-8 w-full max-w-7xl mx-auto z-10">
      <div className="relative glass-card rounded-3xl p-10 sm:p-16 md:p-20 text-center overflow-hidden border border-cyan-500/30 bg-gradient-to-b from-slate-900/90 to-slate-950/90 shadow-2xl">
        {/* Glow de fondo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-cyan-500/15 blur-[120px] pointer-events-none rounded-full" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/50 text-cyan-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.cta.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            {t.cta.title}
          </h2>

          <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {t.cta.description}
          </p>

          <div className="pt-4 flex justify-center">
            <button
              onClick={onOpenContact}
              type="button"
              className="inline-flex items-center gap-3 px-10 py-5 text-base sm:text-lg font-bold text-black bg-cyan-400 hover:bg-cyan-300 rounded-2xl transition-all duration-200 shadow-[0_0_35px_rgba(0,240,255,0.5)] hover:shadow-[0_0_50px_rgba(0,240,255,0.75)] transform hover:-translate-y-0.5 cursor-pointer"
            >
              {t.cta.button}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}