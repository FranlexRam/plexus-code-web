// src/components/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, Menu, X } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pt-4 sm:pt-6">
      <nav className="w-full max-w-5xl glass-card rounded-2xl px-5 sm:px-6 py-3 flex items-center justify-between shadow-lg">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900 border border-slate-700/80 group-hover:border-cyan-400/50 transition-colors">
            <Shield className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="font-bold tracking-tight text-white text-base">
            PLEXUS<span className="text-cyan-400">CODE</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-7 text-xs font-medium text-slate-300">
          <Link href="#services" className="hover:text-cyan-400 transition-colors">
            {t.nav.services}
          </Link>
          <Link href="#stack" className="hover:text-cyan-400 transition-colors">
            {t.nav.stack}
          </Link>
          <Link href="#contact" className="hover:text-cyan-400 transition-colors">
            {t.nav.contact}
          </Link>
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSelector />
          <Link
            href="#contact"
            className="px-4 py-2 text-xs font-semibold text-black bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all duration-200"
          >
            {t.nav.cta}
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSelector />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white"
            aria-label="Abrir menú"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-4 right-4 glass-card bg-slate-950/95 rounded-2xl p-6 flex flex-col gap-4 text-center border border-slate-800 shadow-2xl">
          <Link
            href="#services"
            onClick={() => setIsOpen(false)}
            className="text-slate-300 hover:text-cyan-400 py-1.5 text-sm"
          >
            {t.nav.services}
          </Link>
          <Link
            href="#stack"
            onClick={() => setIsOpen(false)}
            className="text-slate-300 hover:text-cyan-400 py-1.5 text-sm"
          >
            {t.nav.stack}
          </Link>
          <Link
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="text-slate-300 hover:text-cyan-400 py-1.5 text-sm"
          >
            {t.nav.contact}
          </Link>
          <Link
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="mt-2 py-2.5 text-xs font-semibold text-black bg-cyan-400 rounded-xl"
          >
            {t.nav.cta}
          </Link>
        </div>
      )}
    </header>
  );
}