// src/components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "@/context/LanguageContext";

interface NavbarProps {
  onOpenContact?: () => void;
}

export default function Navbar({ onOpenContact }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  // Bloquear scroll de la página cuando el menú móvil está abierto
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

  // Cerrar menú móvil si se redimensiona a pantalla de escritorio
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-[#06090f]/95 backdrop-blur-md border-b border-slate-800">
      <nav 
        aria-label="Navegación principal"
        className="w-full px-4 sm:px-8 lg:px-14 xl:px-20 h-20 sm:h-24 flex items-center justify-between"
      >
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 sm:gap-4 group shrink-0" aria-label="Ir al inicio de Plexus Code">
          <div className="relative flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-slate-900/90 border border-slate-800 group-hover:border-cyan-400 transition-all p-2 shadow-lg group-hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]">
            <Image
              src="/logo.png"
              alt="Plexus Code Logo"
              width={48}
              height={48}
              className="object-contain w-full h-full group-hover:scale-105 transition-transform"
              priority
            />
          </div>
          <span className="font-extrabold tracking-tight text-white text-xl sm:text-2xl lg:text-3xl">
            PLEXUS<span className="text-cyan-400">CODE</span>
          </span>
        </Link>

        {/* Desktop Links & CTA (Visible en pantallas >= 992px / lg) */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm xl:text-base font-semibold text-slate-200">
          <Link href="/" className="hover:text-cyan-400 transition-colors py-2">
            {t.nav.home}
          </Link>
          <Link href="#services" className="hover:text-cyan-400 transition-colors py-2">
            {t.nav.solutions}
          </Link>
          <Link href="#services" className="hover:text-cyan-400 transition-colors py-2">
            {t.nav.services}
          </Link>
          <Link href="#stack" className="hover:text-cyan-400 transition-colors py-2">
            {t.nav.work}
          </Link>
          <Link href="#contact" className="hover:text-cyan-400 transition-colors py-2">
            {t.nav.about}
          </Link>

          {/* Botón Hablemos */}
          <button
            type="button"
            onClick={onOpenContact}
            className="ml-2 px-6 xl:px-8 py-3 xl:py-3.5 text-sm xl:text-base font-bold text-black bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all duration-200 shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.65)] transform hover:-translate-y-0.5 cursor-pointer min-h-[44px]"
          >
            {t.nav.cta}
          </button>
        </div>

        {/* Selector de idioma en Desktop */}
        <div className="hidden lg:flex items-center shrink-0">
          <LanguageSelector />
        </div>

        {/* Controles para Móviles y Tablets (< 992px) */}
        <div className="flex items-center gap-2 sm:gap-3 lg:hidden">
          <LanguageSelector />
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            className="p-3 rounded-xl text-slate-200 hover:text-white border border-slate-800 bg-slate-900/60 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Drawer Móvil Desplegable con Animación */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-x-0 top-20 sm:top-24 bottom-0 bg-[#06090f]/98 backdrop-blur-xl border-b border-slate-800 px-6 sm:px-10 py-8 flex flex-col justify-between overflow-y-auto z-50 animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <div className="flex flex-col gap-4 text-left">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-slate-100 hover:text-cyan-400 py-3 text-xl font-bold border-b border-slate-800/60"
            >
              {t.nav.home}
            </Link>
            <Link
              href="#services"
              onClick={() => setIsOpen(false)}
              className="text-slate-100 hover:text-cyan-400 py-3 text-xl font-bold border-b border-slate-800/60"
            >
              {t.nav.solutions}
            </Link>
            <Link
              href="#services"
              onClick={() => setIsOpen(false)}
              className="text-slate-100 hover:text-cyan-400 py-3 text-xl font-bold border-b border-slate-800/60"
            >
              {t.nav.services}
            </Link>
            <Link
              href="#stack"
              onClick={() => setIsOpen(false)}
              className="text-slate-100 hover:text-cyan-400 py-3 text-xl font-bold border-b border-slate-800/60"
            >
              {t.nav.work}
            </Link>
            <Link
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="text-slate-100 hover:text-cyan-400 py-3 text-xl font-bold border-b border-slate-800/60"
            >
              {t.nav.about}
            </Link>
          </div>

          <div className="pt-8">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onOpenContact?.();
              }}
              className="w-full py-4 text-center text-lg font-bold text-black bg-cyan-400 hover:bg-cyan-300 rounded-2xl shadow-lg transition-all min-h-[48px]"
            >
              {t.nav.cta}
            </button>
            <p className="text-center text-xs text-slate-500 mt-4 font-mono">
              PLEXUS CODE • SECURE BY DESIGN
            </p>
          </div>
        </div>
      )}
    </header>
  );
}