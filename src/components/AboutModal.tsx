// src/components/AboutModal.tsx
"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  
  const [mounted, setMounted] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        setMounted(true);
      });
      const timer = setTimeout(() => setAnimating(true), 20);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => {
    setAnimating(false);
    setTimeout(onClose, 300);
  };

  if (!mounted && !isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8 ${
        isOpen
          ? `${animating ? "opacity-100" : "opacity-0"}`
          : "opacity-0 pointer-events-none"
      } transition-opacity duration-300 ease-out`}
      onClick={handleClose}
    >
      {/* Overlay con desenfoque */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

      {/* Modal Container */}
      <div
        className={`relative w-full max-w-3xl rounded-[2rem] bg-gradient-to-br from-slate-950/90 via-slate-950/95 to-slate-950 border border-cyan-500/20 shadow-[0_0_80px_rgba(0,240,255,0.15)] overflow-hidden
          transform transition-all duration-300 ease-out ${
            animating
              ? "scale-100 opacity-100 translate-y-0"
              : "scale-95 opacity-0 translate-y-8"
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Luminosidad de fondo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-500/10 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute right-1/4 bottom-1/4 w-[400px] h-[300px] bg-blue-500/8 blur-[100px] rounded-full" />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between p-6 sm:p-8 border-b border-slate-800/50">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Sobre Plexus Code
            </h2>
            <button
              type="button"
              onClick={handleClose}
              className="p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 border border-slate-800 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer group"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-90 transition-transform" />
            </button>
          </div>

          {/* Contenido */}
          <div className="p-6 sm:p-8 md:p-10 max-h-[60vh] overflow-y-auto">
            <div className="prose prose-invert max-w-none space-y-6 text-slate-300">
              <div className="mb-8">
                <span className="text-xs sm:text-sm font-mono text-cyan-400 uppercase tracking-widest block mb-3 font-semibold">
                  SOFTWARE ENGINEERING & APPSEC STUDIO
                </span>
                <p className="text-lg leading-relaxed">
                  Plexus Code es un estudio de ingeniería de software especializado en 
                  arquitecturas SaaS empresariales, ciberseguridad defensiva (AppSec) y 
                  Sistemas Multiagente (MAS) para operaciones B2B críticas.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Nuestra Filosofía</h3>
                <p>
                  Desarrollamos con el principio <strong>Secure by design. Scalable by default.</strong> 
                  Cada línea de código, cada endpoint, cada interfaz está diseñada para soportar 
                  crecimiento exponencial sin sacrificar seguridad ni rendimiento.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Enfoque Vertical</h3>
                <p>
                  Nuestro dominio está en <strong>integración de plataformas Meta (WhatsApp, Instagram, TikTok)</strong> 
                  y automatizaciones operativas SaaS para Fintech, logística y servicios profesionales. 
                  Casos como OpsFlow AI y AON Pay ejemplifican nuestra capacidad de transformar 
                  procesos manuales en sistemas autónomos.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Metodología</h3>
                <p>
                  Trabajamos con <strong>TypeScript estricto, Zod para validación en tiempo de ejecución, 
                  arquitecturas serverless Edge-first</strong> y pruebas automatizadas desde el día cero. 
                  Nuestros sistemas están diseñados para evolucionar, no para quedar obsoletos.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-800/60">
                <p className="text-sm text-slate-400">
                  Para conocer más sobre cómo podemos transformar tus operaciones con ingeniería 
                  de alta precisión, agenda un diagnóstico técnico 100% gratuito.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 sm:p-8 border-t border-slate-800/50 flex justify-center">
            <button
              type="button"
              onClick={handleClose}
              className="px-8 py-3.5 text-base font-bold text-black bg-cyan-400 hover:bg-cyan-300 rounded-2xl transition-all duration-200 shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_40px_rgba(0,240,255,0.65)] transform hover:-translate-y-0.5 cursor-pointer min-h-[44px]"
            >
              Entendido, gracias
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}