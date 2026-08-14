// src/components/Hero.tsx
"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Activity, Lock, Cpu } from "lucide-react";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[90vh] pt-36 sm:pt-44 pb-20 px-4 sm:px-6 flex flex-col items-center justify-center">
      {/* Luz ambiental sutil */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] sm:w-[500px] h-[250px] bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="w-full max-w-4xl mx-auto text-center z-10 flex flex-col items-center">
        {/* Tagline */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/80 text-cyan-400 text-xs font-mono mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>{t.hero.badge}</span>
        </div>

        {/* Título Principal */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
          {t.hero.titleLine1} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            {t.hero.titleLine2}
          </span>
        </h1>

        {/* Párrafo con ancho limitado a 65 caracteres para lectura cómoda */}
        <p className="mt-6 text-sm sm:text-base md:text-lg text-slate-400 max-w-xl leading-relaxed">
          {t.hero.description}
        </p>

        {/* Botones de Acción */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-xs sm:max-w-none">
          <a
            href="#contact"
            className="w-full sm:w-auto px-6 py-3 text-xs sm:text-sm font-semibold text-black bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all duration-200"
          >
            {t.hero.ctaPrimary}
          </a>
          <a
            href="#services"
            className="w-full sm:w-auto px-6 py-3 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 bg-slate-900/60 rounded-xl transition-all duration-200"
          >
            {t.hero.ctaSecondary}
          </a>
        </div>

        {/* Panel de Métricas / Terminal Minimalista */}
        <div className="mt-16 w-full max-w-3xl glass-card rounded-2xl p-4 sm:p-6 text-left">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" />
              <span className="text-xs font-mono text-slate-400">{t.hero.terminalHeader}</span>
            </div>
            <span className="text-[11px] font-mono text-cyan-400 tracking-wide">
              {t.hero.threatScan}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/60 flex items-center gap-3">
              <Activity className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-500">{t.hero.metric1}</div>
                <div className="text-slate-200 font-semibold">{t.hero.metric1Val}</div>
              </div>
            </div>

            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/60 flex items-center gap-3">
              <Lock className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-500">{t.hero.metric2}</div>
                <div className="text-slate-200 font-semibold">{t.hero.metric2Val}</div>
              </div>
            </div>

            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/60 flex items-center gap-3">
              <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-500">{t.hero.metric3}</div>
                <div className="text-slate-200 font-semibold">{t.hero.metric3Val}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}