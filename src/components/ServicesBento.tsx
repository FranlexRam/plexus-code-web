// src/components/ServicesBento.tsx
"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Code2, ShieldAlert, Bot, CheckCircle } from "lucide-react";

export default function ServicesBento() {
  const { t } = useLanguage();

  return (
    <section id="services" className="relative py-20 sm:py-28 lg:py-36 px-4 sm:px-8 lg:px-14 xl:px-20 w-full z-10 overflow-hidden">
      
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-24 lg:mb-32">
        <span className="text-xs sm:text-sm font-mono text-cyan-400 uppercase tracking-widest block mb-3 font-semibold">
          {t.services.badge}
        </span>
        <h2 className="text-fluid-h2 font-extrabold text-white tracking-tight">
          {t.services.title}
        </h2>
        <p className="mt-4 sm:mt-6 text-fluid-body text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {t.services.description}
        </p>
      </div>

      {/* Bloque 1: SaaS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 xl:gap-20 items-center mb-20 sm:mb-28 lg:mb-36">
        <div className="lg:col-span-6 space-y-4 sm:space-y-6">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Code2 className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <h3 className="text-fluid-h3 font-bold text-white tracking-tight">
            {t.services.card1Title}
          </h3>
          <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed">
            {t.services.card1Desc}
          </p>
          <ul className="space-y-3 pt-2">
            <li className="flex items-start sm:items-center gap-3 text-sm sm:text-base text-slate-200">
              <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5 sm:mt-0" />
              <span>Arquitectura Serverless & Edge Caching optimizada</span>
            </li>
            <li className="flex items-start sm:items-center gap-3 text-sm sm:text-base text-slate-200">
              <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5 sm:mt-0" />
              <span>Validación de tipos estricta de extremo a extremo</span>
            </li>
            <li className="flex items-start sm:items-center gap-3 text-sm sm:text-base text-slate-200">
              <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5 sm:mt-0" />
              <span>Puntajes de 95+ en Core Web Vitals</span>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-6 glass-card rounded-3xl p-5 sm:p-8 xl:p-10 border border-cyan-500/20 bg-slate-950/70 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 text-xs sm:text-sm font-mono text-slate-400">
            <span>production-ready :: nextjs-core</span>
            <span className="text-emerald-400 font-semibold">STATUS: DEPLOYED</span>
          </div>
          <div className="space-y-3 font-mono text-xs sm:text-sm text-slate-300">
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Render Speed:</span>
              <span className="text-cyan-400 font-bold">&lt; 180ms TTFB</span>
            </div>
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Concurrency:</span>
              <span className="text-emerald-400 font-bold">100k+ req/min</span>
            </div>
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Type Safety:</span>
              <span className="text-blue-400 font-bold">100% Strict Zod</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bloque 2: AppSec */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 xl:gap-20 items-center mb-20 sm:mb-28 lg:mb-36">
        <div className="lg:col-span-6 order-2 lg:order-1 glass-card rounded-3xl p-5 sm:p-8 xl:p-10 border border-blue-500/20 bg-slate-950/70 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 text-xs sm:text-sm font-mono text-slate-400">
            <span>security-audit :: zero-trust</span>
            <span className="text-cyan-400 font-semibold">ENCRYPTION: ACTIVE</span>
          </div>
          <div className="space-y-3 font-mono text-xs sm:text-sm text-slate-300">
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">OWASP Protection:</span>
              <span className="text-emerald-400 font-bold">Mitigated (Top 10)</span>
            </div>
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Authentication:</span>
              <span className="text-cyan-400 font-bold">Multi-Factor & JWT RLS</span>
            </div>
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Penetration Test:</span>
              <span className="text-purple-400 font-bold">0 Critical Vulns</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 order-1 lg:order-2 space-y-4 sm:space-y-6">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-950/70 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <ShieldAlert className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <h3 className="text-fluid-h3 font-bold text-white tracking-tight">
            {t.services.card2Title}
          </h3>
          <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed">
            {t.services.card2Desc}
          </p>
          <ul className="space-y-3 pt-2">
            <li className="flex items-start sm:items-center gap-3 text-sm sm:text-base text-slate-200">
              <CheckCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5 sm:mt-0" />
              <span>Auditorías de código y análisis estático</span>
            </li>
            <li className="flex items-start sm:items-center gap-3 text-sm sm:text-base text-slate-200">
              <CheckCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5 sm:mt-0" />
              <span>Políticas Zero-Trust y hardening cloud</span>
            </li>
            <li className="flex items-start sm:items-center gap-3 text-sm sm:text-base text-slate-200">
              <CheckCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5 sm:mt-0" />
              <span>Blindaje de APIs contra fugas de datos</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bloque 3: IA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 xl:gap-20 items-center">
        <div className="lg:col-span-6 space-y-4 sm:space-y-6">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Bot className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <h3 className="text-fluid-h3 font-bold text-white tracking-tight">
            {t.services.card3Title}
          </h3>
          <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed">
            {t.services.card3Desc}
          </p>
          <ul className="space-y-3 pt-2">
            <li className="flex items-start sm:items-center gap-3 text-sm sm:text-base text-slate-200">
              <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5 sm:mt-0" />
              <span>{t.services.card3Bullet1}</span>
            </li>
            <li className="flex items-start sm:items-center gap-3 text-sm sm:text-base text-slate-200">
              <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5 sm:mt-0" />
              <span>{t.services.card3Bullet2}</span>
            </li>
            <li className="flex items-start sm:items-center gap-3 text-sm sm:text-base text-slate-200">
              <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5 sm:mt-0" />
              <span>{t.services.card3Bullet3}</span>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-6 glass-card rounded-3xl p-5 sm:p-8 xl:p-10 border border-cyan-500/20 bg-slate-950/70 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 text-xs sm:text-sm font-mono text-slate-400">
            <span>agentic-core :: vector-flow</span>
            <span className="text-cyan-400 font-semibold">PIPELINE: STREAMING</span>
          </div>
          <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 font-mono text-xs sm:text-sm text-slate-300 space-y-2.5">
            <div className="text-cyan-400">&gt; Initializing contextual retrieval...</div>
            <div className="text-slate-400">&gt; Querying Vector DB with cosine similarity</div>
            <div className="text-emerald-400">&gt; 100% matched context extracted in 42ms</div>
            <div className="text-slate-200">&gt; Response streamed securely via TLS 1.3</div>
          </div>
        </div>
      </div>

    </section>
  );
}