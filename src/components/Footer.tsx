// src/components/Footer.tsx
"use client";

import Link from "next/link";
import { Shield, Send, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-[#050811] border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-xs font-sans mt-24">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Top Grid: Columnas de Navegación & Newsletter */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 pb-14 border-b border-slate-800/60">
          
          {/* Columna 1: Brand & Bio */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900 border border-slate-700/80 group-hover:border-cyan-400/50 transition-colors">
                <Shield className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="font-bold tracking-tight text-white text-base">
                PLEXUS<span className="text-cyan-400">CODE</span>
              </span>
            </Link>
            <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
              AI-Powered Software Engineering & Defensive Cybersecurity Architectures. Secure by design. Scalable by default.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {/* LinkedIn SVG */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z"/>
                </svg>
              </a>
              {/* GitHub SVG */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                </svg>
              </a>
              {/* Mail */}
              <a
                href="mailto:contact@plexuscode.com"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Columna 2: Solutions */}
          <div className="space-y-3">
            <h4 className="font-mono uppercase text-slate-200 text-xs tracking-wider font-semibold">
              Soluciones
            </h4>
            <ul className="space-y-2.5">
              <li><Link href="#services" className="hover:text-cyan-400 transition-colors">Custom Web SaaS</Link></li>
              <li><Link href="#services" className="hover:text-cyan-400 transition-colors">Agentes Autónomos IA</Link></li>
              <li><Link href="#services" className="hover:text-cyan-400 transition-colors">AppSec & Auditorías</Link></li>
              <li><Link href="#services" className="hover:text-cyan-400 transition-colors">Pipelines de Pagos</Link></li>
            </ul>
          </div>

          {/* Columna 3: Technologies */}
          <div className="space-y-3">
            <h4 className="font-mono uppercase text-slate-200 text-xs tracking-wider font-semibold">
              Tecnologías
            </h4>
            <ul className="space-y-2.5">
              <li><Link href="#stack" className="hover:text-cyan-400 transition-colors">Next.js 15 & React</Link></li>
              <li><Link href="#stack" className="hover:text-cyan-400 transition-colors">TypeScript & Zod</Link></li>
              <li><Link href="#stack" className="hover:text-cyan-400 transition-colors">Supabase & Postgres</Link></li>
              <li><Link href="#stack" className="hover:text-cyan-400 transition-colors">Zero-Trust Policies</Link></li>
            </ul>
          </div>

          {/* Columna 4: Company */}
          <div className="space-y-3">
            <h4 className="font-mono uppercase text-slate-200 text-xs tracking-wider font-semibold">
              Firma
            </h4>
            <ul className="space-y-2.5">
              <li><Link href="#services" className="hover:text-cyan-400 transition-colors">Sobre Plexus Code</Link></li>
              <li><Link href="#contact" className="hover:text-cyan-400 transition-colors">Contacto</Link></li>
              <li><a href="mailto:contact@plexuscode.com" className="hover:text-cyan-400 transition-colors">contact@plexuscode.com</a></li>
            </ul>
          </div>

          {/* Columna 5: Newsletter / Updates */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <h4 className="font-mono uppercase text-slate-200 text-xs tracking-wider font-semibold">
              Tech Updates
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Recibe análisis sobre AppSec y arquitecturas de IA.
            </p>
            <div className="flex items-center gap-1.5">
              <input
                type="email"
                placeholder="tu@empresa.com"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
              />
              <button
                className="p-1.5 bg-cyan-400 hover:bg-cyan-300 text-black rounded-lg transition-colors shrink-0"
                aria-label="Suscribir"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Políticas Legales */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            COPYRIGHT © PLEXUS CODE, 2026. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6 text-[11px]">
            <Link href="#contact" className="hover:text-slate-400 transition-colors">PRIVACIDAD</Link>
            <span className="text-slate-700">|</span>
            <Link href="#contact" className="hover:text-slate-400 transition-colors">TÉRMINOS</Link>
            <span className="text-slate-700">|</span>
            <Link href="#contact" className="hover:text-slate-400 transition-colors">SEGURIDAD ZERO TRUST</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}