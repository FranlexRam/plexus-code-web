// src/app/security/page.tsx
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { LanguageProvider } from "@/context/LanguageContext";

export default function SecurityPage() {
  return (
    <LanguageProvider>
      <main className="relative min-h-screen bg-[#06090f] text-slate-100 selection:bg-cyan-400 selection:text-black overflow-x-clip">
        <Navbar />
        
        <div className="bg-[#06090f] text-slate-300 pt-32 pb-20 px-4 sm:px-8 lg:px-14 xl:px-20">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <span className="text-xs sm:text-sm font-mono text-cyan-400 uppercase tracking-widest block mb-3 font-semibold">
                ARQUITECTURA DE SEGURIDAD
              </span>
              <h1 className="text-fluid-h2 font-extrabold text-white tracking-tight mb-6">
                Arquitectura Zero-Trust
              </h1>
              <div className="w-16 h-1 bg-cyan-400 mb-10"></div>
              
              <div className="prose prose-invert prose-lg max-w-none">
                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 sm:p-10">
                  <p className="text-lg text-slate-300 leading-relaxed mb-6">
                    <strong>Documentación de estándares de seguridad en proceso de redacción.</strong>
                  </p>
                  <p className="text-slate-400 leading-relaxed">
                    Estamos trabajando en la documentación completa de nuestros estándares de seguridad Zero-Trust. Esta arquitectura implementa verificaciones continuas de identidad, autorización mínima y micro-segmentación de red para proteger aplicaciones y datos críticos, incluso en entornos de alto riesgo.
                  </p>
                  <div className="mt-8 p-4 bg-slate-800/30 border border-slate-700 rounded-xl">
                    <h3 className="text-white font-bold mb-2">Última actualización:</h3>
                    <p className="text-cyan-300 font-semibold">Octubre 2026</p>
                    <p className="text-sm text-slate-400 mt-2">
                      Para consultas sobre arquitectura de seguridad o auditorías AppSec, por favor contáctanos en <a href="mailto:contact@plexuscode.com" className="text-cyan-400 hover:text-cyan-300 transition-colors">contact@plexuscode.com</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-colors"
              >
                ← Volver al inicio
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </LanguageProvider>
  );
}