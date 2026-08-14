// src/components/TechStack.tsx
"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Globe, TerminalSquare, Database, Layers, Cpu, Shield } from "lucide-react";

const stackItems = [
  { name: "Next.js 15 & React", category: "Frontend & SSR", icon: Globe, desc: "Server Actions, Edge Rendering & Optimización Core Web Vitals." },
  { name: "TypeScript & Zod", category: "Type Safety & Validation", icon: TerminalSquare, desc: "Tipado estricto y validación de esquemas en tiempo de ejecución." },
  { name: "Supabase & Postgres", category: "Database & Auth", icon: Database, desc: "Políticas Row Level Security (RLS) y sincronización en tiempo real." },
  { name: "Tailwind CSS", category: "Design System", icon: Layers, desc: "Interfaces fluidas, modo oscuro y microinteracciones de alto rendimiento." },
  { name: "Autonomous AI / LLMs", category: "Agentic AI", icon: Cpu, desc: "Agentes autónomos conectados a bases vectoriales y APIs empresariales." },
  { name: "AppSec & Zero Trust", category: "Security Architecture", icon: Shield, desc: "Auditorías de seguridad, protección de endpoints y mitigación OWASP." },
];

export default function TechStack() {
  const { t } = useLanguage();

  return (
    <section id="stack" className="relative py-28 sm:py-36 px-6 sm:px-8 w-full max-w-7xl mx-auto z-10">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-3">
          {t.stack.badge}
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          {t.stack.title}
        </h2>
        <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
          {t.stack.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stackItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="glass-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-cyan-400/50 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400/90 uppercase tracking-wider bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-500/20">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}