// src/components/Footer.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Send, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-[#04060c] border-t border-slate-800 pt-24 pb-16 text-slate-300 font-sans mt-32">
      <div className="w-full px-8 sm:px-14 lg:px-20">
        
        {/* Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 pb-16 border-b border-slate-800">
          
          {/* Col 1: Brand & Redes Sociales Minimalistas */}
          <div className="col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-900/90 border border-slate-800 group-hover:border-cyan-400 transition-all p-2 shadow-lg">
                <Image
                  src="/logo.png"
                  alt="Plexus Code Logo"
                  width={48}
                  height={48}
                  className="object-contain w-full h-full"
                />
              </div>
              <span className="font-extrabold tracking-tight text-white text-3xl">
                PLEXUS<span className="text-cyan-400">CODE</span>
              </span>
            </Link>
            <p className="text-slate-400 text-lg leading-relaxed max-w-sm">
              AI-Powered Software Engineering & Defensive Cybersecurity Architectures. Secure by design. Scalable by default.
            </p>

            {/* Iconos Redes Sociales Estilo Teltonika (Monocromático -> Hover Cyan/Azul) */}
            <div className="flex items-center gap-5 pt-2">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/136934237/admin/dashboard/"
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-cyan-400 transition-all duration-200 transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-cyan-400 transition-all duration-200 transform hover:scale-110"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-cyan-400 transition-all duration-200 transform hover:scale-110"
                aria-label="X"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* Mail */}
              <a
                href="mailto:contact@plexuscode.com"
                className="text-white hover:text-cyan-400 transition-all duration-200 transform hover:scale-110"
                aria-label="Email"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Col 2: Soluciones */}
          <div className="space-y-4">
            <h4 className="text-white text-lg font-bold uppercase tracking-wider">
              Soluciones
            </h4>
            <ul className="space-y-3.5 text-base">
              <li><Link href="#services" className="hover:text-cyan-400 transition-colors">Custom Web SaaS</Link></li>
              <li><Link href="#services" className="hover:text-cyan-400 transition-colors">Agentes Autónomos IA</Link></li>
              <li><Link href="#services" className="hover:text-cyan-400 transition-colors">AppSec & Auditorías</Link></li>
              <li><Link href="#services" className="hover:text-cyan-400 transition-colors">Pipelines de Pagos</Link></li>
            </ul>
          </div>

          {/* Col 3: Tecnologías */}
          <div className="space-y-4">
            <h4 className="text-white text-lg font-bold uppercase tracking-wider">
              Tecnologías
            </h4>
            <ul className="space-y-3.5 text-base">
              <li><Link href="#stack" className="hover:text-cyan-400 transition-colors">Next.js 15 & React</Link></li>
              <li><Link href="#stack" className="hover:text-cyan-400 transition-colors">TypeScript & Zod</Link></li>
              <li><Link href="#stack" className="hover:text-cyan-400 transition-colors">Supabase & Postgres</Link></li>
              <li><Link href="#stack" className="hover:text-cyan-400 transition-colors">Zero-Trust Policies</Link></li>
            </ul>
          </div>

          {/* Col 4: Firma */}
          <div className="space-y-4">
            <h4 className="text-white text-lg font-bold uppercase tracking-wider">
              Firma
            </h4>
            <ul className="space-y-3.5 text-base">
              <li><Link href="#services" className="hover:text-cyan-400 transition-colors">Sobre Nosotros</Link></li>
              <li><Link href="#contact" className="hover:text-cyan-400 transition-colors">Contacto</Link></li>
              <li><a href="mailto:contact@plexuscode.com" className="hover:text-cyan-400 transition-colors">contact@plexuscode.com</a></li>
            </ul>
          </div>

          {/* Col 5: Updates */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <h4 className="text-white text-lg font-bold uppercase tracking-wider">
              Tech Updates
            </h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Recibe análisis sobre AppSec y arquitecturas de IA.
            </p>
            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder="tu@empresa.com"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
              />
              <button
                className="p-3.5 bg-cyan-400 hover:bg-cyan-300 text-black font-bold rounded-xl transition-colors shrink-0"
                aria-label="Suscribir"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-12 flex flex-col sm:flex-row items-center justify-between text-base text-slate-500 gap-6">
          <div>
            COPYRIGHT © PLEXUS CODE, 2026. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-8 text-base font-semibold">
            <Link href="#contact" className="hover:text-slate-300 transition-colors">PRIVACIDAD</Link>
            <span className="text-slate-800">|</span>
            <Link href="#contact" className="hover:text-slate-300 transition-colors">TÉRMINOS</Link>
            <span className="text-slate-800">|</span>
            <Link href="#contact" className="hover:text-slate-300 transition-colors">POLÍTICAS ZERO TRUST</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}