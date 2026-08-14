// src/components/ServicesBento.tsx
"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Code2, ShieldAlert, Bot, Workflow } from "lucide-react";

export default function ServicesBento() {
  const { t } = useLanguage();

  return (
    <section id="services" className="relative py-28 sm:py-36 px-6 sm:px-8 w-full max-w-7xl mx-auto z-10">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-3">
          {t.services.badge}
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          {t.services.title}
        </h2>
        <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
          {t.services.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Card 1 */}
        <div className="glass-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-105 transition-transform">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
              {t.services.card1Title}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed max-w-lg">
              {t.services.card1Desc}
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="glass-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
              {t.services.card2Title}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed max-w-lg">
              {t.services.card2Desc}
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="glass-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-105 transition-transform">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
              {t.services.card3Title}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed max-w-lg">
              {t.services.card3Desc}
            </p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="glass-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-105 transition-transform">
              <Workflow className="w-6 h-6" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
              {t.services.card4Title}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed max-w-lg">
              {t.services.card4Desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}