// src/components/Hero.tsx
"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Activity, Lock, Cpu, ArrowRight, ShieldCheck } from "lucide-react";

interface HeroProps {
  onOpenContact?: () => void;
}

export default function Hero({ onOpenContact }: HeroProps) {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[90vh] pt-28 sm:pt-36 lg:pt-48 pb-16 sm:pb-24 px-4 sm:px-8 lg:px-14 xl:px-20 w-full flex items-center overflow-hidden">
      
      {/* Resplandor adaptativo */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 lg:left-1/4 w-[300px] sm:w-[500px] lg:w-[700px] h-[300px] bg-cyan-500/10 blur-[120px] lg:blur-[160px] pointer-events-none rounded-full" />

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center z-10">
        
        {/* Lado Izquierdo: Textos & Botones */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          <div className="inline-flex items-center gap-2 text-slate-400 font-mono text-xs sm:text-sm lg:text-base font-semibold tracking-wide">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span>{t.hero.tag}</span>
          </div>

          <h1 className="text-fluid-hero font-extrabold tracking-tight text-white">
            {t.hero.titleLine1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">
              {t.hero.titleLine2}
            </span>
          </h1>

          <p className="text-fluid-body text-slate-300 max-w-2xl leading-relaxed">
            {t.hero.description}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              type="button"
              onClick={onOpenContact}
              className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-bold text-black bg-cyan-400 hover:bg-cyan-300 rounded-2xl transition-all duration-200 shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_40px_rgba(0,240,255,0.6)] transform hover:-translate-y-0.5 cursor-pointer min-h-[48px]"
            >
              {t.hero.ctaPrimary}
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="#services"
              className="inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-semibold text-slate-200 hover:text-white border border-slate-800 hover:border-slate-700 bg-slate-900/60 rounded-2xl transition-all duration-200 min-h-[48px]"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>

        {/* Lado Derecho: Monitor de Estado */}
        <div className="lg:col-span-5 w-full">
          <div className="glass-card rounded-3xl p-5 sm:p-8 xl:p-10 border border-cyan-500/25 bg-slate-950/70 shadow-2xl space-y-5 sm:space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 text-xs sm:text-sm font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-cyan-400 font-semibold">{t.hero.badgeLive}</span>
            </div>

            <div className="space-y-3 sm:space-y-4 font-mono">
              <div className="bg-slate-900/90 p-4 sm:p-5 rounded-2xl border border-slate-800 flex items-center gap-4">
                <Activity className="w-6 h-6 text-cyan-400 shrink-0" />
                <div>
                  <div className="text-[11px] sm:text-xs text-slate-500 uppercase">{t.hero.metric1}</div>
                  <div className="text-slate-100 font-bold text-sm sm:text-lg mt-0.5">{t.hero.metric1Val}</div>
                </div>
              </div>

              <div className="bg-slate-900/90 p-4 sm:p-5 rounded-2xl border border-slate-800 flex items-center gap-4">
                <Lock className="w-6 h-6 text-cyan-400 shrink-0" />
                <div>
                  <div className="text-[11px] sm:text-xs text-slate-500 uppercase">{t.hero.metric2}</div>
                  <div className="text-emerald-400 font-bold text-sm sm:text-lg mt-0.5">{t.hero.metric2Val}</div>
                </div>
              </div>

              <div className="bg-slate-900/90 p-4 sm:p-5 rounded-2xl border border-slate-800 flex items-center gap-4">
                <Cpu className="w-6 h-6 text-cyan-400 shrink-0" />
                <div>
                  <div className="text-[11px] sm:text-xs text-slate-500 uppercase">{t.hero.metric3}</div>
                  <div className="text-slate-100 font-bold text-sm sm:text-lg mt-0.5">{t.hero.metric3Val}</div>
                </div>
              </div>
            </div>

            <div className="p-3.5 sm:p-4 bg-slate-900/60 rounded-xl border border-slate-800/80 font-mono text-xs sm:text-sm text-slate-400 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
              <span>TLS 1.3 • Strict Transport Security</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}