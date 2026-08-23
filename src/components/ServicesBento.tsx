// src/components/ServicesBento.tsx
"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Code2, ShieldAlert, Bot, CheckCircle } from "lucide-react";

export default function ServicesBento() {
  const { t } = useLanguage();

  return (
    <section id="services" className="relative py-28 sm:py-36 px-8 sm:px-14 lg:px-20 w-full z-10">
      
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-28">
        <span className="text-sm sm:text-base font-mono text-cyan-400 uppercase tracking-widest block mb-4 font-semibold">
          {t.services.badge}
        </span>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight">
          {t.services.title}
        </h2>
        <p className="mt-6 text-lg sm:text-2xl text-slate-300 leading-relaxed">
          {t.services.description}
        </p>
      </div>

      {/* Bloque 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-36">
        <div className="lg:col-span-6 space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Code2 className="w-7 h-7" />
          </div>
          <h3 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            {t.services.card1Title}
          </h3>
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
            {t.services.card1Desc}
          </p>
          <ul className="space-y-4 pt-2">
            <li className="flex items-center gap-3 text-base sm:text-lg text-slate-200">
              <CheckCircle className="w-6 h-6 text-cyan-400 shrink-0" />
              <span>Arquitectura Serverless & Edge Caching optimizada</span>
            </li>
            <li className="flex items-center gap-3 text-base sm:text-lg text-slate-200">
              <CheckCircle className="w-6 h-6 text-cyan-400 shrink-0" />
              <span>Validación de tipos estricta de extremo a extremo</span>
            </li>
            <li className="flex items-center gap-3 text-base sm:text-lg text-slate-200">
              <CheckCircle className="w-6 h-6 text-cyan-400 shrink-0" />
              <span>Puntajes de 95+ en Core Web Vitals y velocidad extrema</span>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-6 glass-card rounded-3xl p-8 sm:p-10 border border-cyan-500/20 bg-slate-950/70 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6 text-sm font-mono text-slate-400">
            <span>production-ready :: nextjs-core</span>
            <span className="text-emerald-400 font-semibold">STATUS: DEPLOYED</span>
          </div>
          <div className="space-y-4 font-mono text-sm sm:text-base text-slate-300">
            <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Render Speed:</span>
              <span className="text-cyan-400 font-bold">&lt; 180ms TTFB</span>
            </div>
            <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Concurrency Load:</span>
              <span className="text-emerald-400 font-bold">100k+ req/min</span>
            </div>
            <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Type Safety:</span>
              <span className="text-blue-400 font-bold">100% Strict Zod</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bloque 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-36">
        <div className="lg:col-span-6 order-2 lg:order-1 glass-card rounded-3xl p-8 sm:p-10 border border-blue-500/20 bg-slate-950/70 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6 text-sm font-mono text-slate-400">
            <span>security-audit :: zero-trust</span>
            <span className="text-cyan-400 font-semibold">ENCRYPTION: ACTIVE</span>
          </div>
          <div className="space-y-4 font-mono text-sm sm:text-base text-slate-300">
            <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">OWASP Protection:</span>
              <span className="text-emerald-400 font-bold">Mitigated (Top 10)</span>
            </div>
            <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Authentication:</span>
              <span className="text-cyan-400 font-bold">Multi-Factor & JWT RLS</span>
            </div>
            <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Penetration Test:</span>
              <span className="text-purple-400 font-bold">0 Critical Vulns</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-blue-950/70 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h3 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            {t.services.card2Title}
          </h3>
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
            {t.services.card2Desc}
          </p>
          <ul className="space-y-4 pt-2">
            <li className="flex items-center gap-3 text-base sm:text-lg text-slate-200">
              <CheckCircle className="w-6 h-6 text-blue-400 shrink-0" />
              <span>Auditorías estáticas y dinámicas de código fuente</span>
            </li>
            <li className="flex items-center gap-3 text-base sm:text-lg text-slate-200">
              <CheckCircle className="w-6 h-6 text-blue-400 shrink-0" />
              <span>Políticas Zero-Trust y hardening de servidores cloud</span>
            </li>
            <li className="flex items-center gap-3 text-base sm:text-lg text-slate-200">
              <CheckCircle className="w-6 h-6 text-blue-400 shrink-0" />
              <span>Blindaje de APIs y prevención de fugas de datos</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bloque 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        <div className="lg:col-span-6 space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Bot className="w-7 h-7" />
          </div>
          <h3 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            {t.services.card3Title}
          </h3>
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
            {t.services.card3Desc}
          </p>
          <ul className="space-y-4 pt-2">
            <li className="flex items-center gap-3 text-base sm:text-lg text-slate-200">
              <CheckCircle className="w-6 h-6 text-cyan-400 shrink-0" />
              <span>Agentes autónomos integrados con bases vectoriales</span>
            </li>
            <li className="flex items-center gap-3 text-base sm:text-lg text-slate-200">
              <CheckCircle className="w-6 h-6 text-cyan-400 shrink-0" />
              <span>Pipelines asíncronos para cobros y sincronización de datos</span>
            </li>
            <li className="flex items-center gap-3 text-base sm:text-lg text-slate-200">
              <CheckCircle className="w-6 h-6 text-cyan-400 shrink-0" />
              <span>Automatización completa de flujos operativos sin fricción</span>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-6 glass-card rounded-3xl p-8 sm:p-10 border border-cyan-500/20 bg-slate-950/70 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6 text-sm font-mono text-slate-400">
            <span>agentic-core :: vector-flow</span>
            <span className="text-cyan-400 font-semibold">PIPELINE: STREAMING</span>
          </div>
          <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 font-mono text-sm sm:text-base text-slate-300 space-y-3">
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