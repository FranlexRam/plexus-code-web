// src/components/SuccessStories.tsx
"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function SuccessStories() {
  const { t } = useLanguage();

  const stories = [
    { key: "opsflow" as const, color: "emerald" },
    { key: "aonpay" as const, color: "amber" }
  ];

  return (
    <section id="success-stories" className="relative py-20 sm:py-28 lg:py-36 px-4 sm:px-8 lg:px-14 xl:px-20 w-full z-10 bg-gradient-to-b from-slate-950 to-slate-900/80">
      
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-20 sm:mb-28 lg:mb-36">
        <span className="text-xs sm:text-sm font-mono text-cyan-400 uppercase tracking-widest block mb-3 font-semibold">
          IMPACTO REAL
        </span>
        <h2 className="text-fluid-h2 font-extrabold text-white tracking-tight">
          {t.successStories.title}
        </h2>
        <p className="mt-4 sm:mt-6 text-fluid-body text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Casos de estudio implementados con el framework Problema—Solución—Resultado.
        </p>
      </div>

      {/* Stories Grid */}
      <div className="space-y-28">
        {stories.map(({ key, color }) => {
          const story = t.successStories[key];
          
          return (
            <div key={key} className="max-w-7xl mx-auto">
              {/* Card Header */}
              <div className="mb-10">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-12">
                  <div>
                    <h3 className="text-fluid-h3 font-bold text-white tracking-tight mb-4">
                      {story.title}
                    </h3>
                    <p className="text-lg text-slate-300 leading-relaxed max-w-3xl">
                      {story.description}
                    </p>
                  </div>
                  {"integrationNote" in story && story.integrationNote && (
                    <div className="lg:max-w-md p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/30">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs font-bold mt-0.5">
                          i
                        </div>
                        <p className="text-sm text-emerald-300 leading-relaxed">
                          {story.integrationNote}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* PSR Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="space-y-4 p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400">
                    <span className="text-lg font-bold">?</span>
                  </div>
                  <h4 className="text-xl font-bold text-white">Problema</h4>
                  <p className="text-slate-300 leading-relaxed">
                    {story.problem}
                  </p>
                </div>

                <div className="space-y-4 p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <span className="text-lg font-bold">🛠</span>
                  </div>
                  <h4 className="text-xl font-bold text-white">Solución</h4>
                  <p className="text-slate-300 leading-relaxed">
                    {story.solution}
                  </p>
                </div>

                <div className="space-y-4 p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-amber-500/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <span className="text-lg font-bold">✓</span>
                  </div>
                  <h4 className="text-xl font-bold text-white">Resultado</h4>
                  <p className="text-slate-300 leading-relaxed">
                    {story.result}
                  </p>
                </div>
              </div>

              {/* Video Placeholder */}
              <div className="mb-12">
                <div className="min-h-[300px] bg-slate-900/50 rounded-2xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center p-8">
                  <div className="w-16 h-16 rounded-full bg-slate-800/70 border border-slate-700 flex items-center justify-center text-slate-400 mb-6">
                    <span className="text-2xl">🎬</span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">
                    Micro‑video Showcase — Fase 3
                  </h4>
                  <p className="text-slate-400 text-center max-w-xl">
                    Demostración en video (8–15 s, bucle autoplay) del flujo real de automatización.
                    Integración programática de .mp4/.webm optimizados con datos sanitizados.
                  </p>
                </div>
              </div>

              {/* CTA Banner */}
              <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800/50 to-slate-900 p-8 border border-slate-800">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <h4 className="text-xl font-bold text-white mb-3">
                      {story.ctaMessage}
                    </h4>
                    <p className="text-slate-300 max-w-2xl">
                      Un diagnóstico técnico 100% gratuito evalúa arquitectura, presupuesto y cronograma.
                    </p>
                  </div>
                  <button className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-white font-bold rounded-xl transition-colors duration-300 shadow-lg shadow-cyan-500/20 whitespace-nowrap">
                    {story.ctaButton}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}