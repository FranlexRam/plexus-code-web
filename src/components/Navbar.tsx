// src/components/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-[#06090f]/95 backdrop-blur-md border-b border-slate-800">
      <nav className="w-full px-8 sm:px-14 lg:px-20 h-24 flex items-center justify-between">
        
        {/* Brand con Logo Grande */}
        <Link href="/" className="flex items-center gap-4 group shrink-0">
          <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-900/90 border border-slate-800 group-hover:border-cyan-400 transition-all p-2 shadow-lg group-hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]">
            <Image
              src="/logo.png"
              alt="Plexus Code Logo"
              width={48}
              height={48}
              className="object-contain w-full h-full group-hover:scale-105 transition-transform"
              priority
            />
          </div>
          <span className="font-extrabold tracking-tight text-white text-2xl sm:text-3xl">
            PLEXUS<span className="text-cyan-400">CODE</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10 text-lg font-semibold text-slate-200">
          <Link href="/" className="hover:text-cyan-400 transition-colors">
            {t.nav.home}
          </Link>
          <Link href="#services" className="hover:text-cyan-400 transition-colors">
            {t.nav.solutions}
          </Link>
          <Link href="#services" className="hover:text-cyan-400 transition-colors">
            {t.nav.services}
          </Link>
          <Link href="#stack" className="hover:text-cyan-400 transition-colors">
            {t.nav.work}
          </Link>
          <Link href="#contact" className="hover:text-cyan-400 transition-colors">
            {t.nav.about}
          </Link>
        </div>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-6 shrink-0">
          <LanguageSelector />
          <Link
            href="#contact"
            className="px-8 py-3.5 text-base sm:text-lg font-bold text-black bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all duration-200 shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.65)] transform hover:-translate-y-0.5"
          >
            {t.nav.cta}
          </Link>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-3 lg:hidden">
          <LanguageSelector />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 rounded-xl text-slate-200 hover:text-white border border-slate-800"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden w-full bg-[#080c14] border-b border-slate-800 px-8 py-8 flex flex-col gap-5 text-left">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="text-slate-100 hover:text-cyan-400 py-2 text-lg font-semibold"
          >
            {t.nav.home}
          </Link>
          <Link
            href="#services"
            onClick={() => setIsOpen(false)}
            className="text-slate-100 hover:text-cyan-400 py-2 text-lg font-semibold"
          >
            {t.nav.solutions}
          </Link>
          <Link
            href="#services"
            onClick={() => setIsOpen(false)}
            className="text-slate-100 hover:text-cyan-400 py-2 text-lg font-semibold"
          >
            {t.nav.services}
          </Link>
          <Link
            href="#stack"
            onClick={() => setIsOpen(false)}
            className="text-slate-100 hover:text-cyan-400 py-2 text-lg font-semibold"
          >
            {t.nav.work}
          </Link>
          <Link
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="text-slate-100 hover:text-cyan-400 py-2 text-lg font-semibold"
          >
            {t.nav.about}
          </Link>
          <Link
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="mt-3 py-4 text-center text-base font-bold text-black bg-cyan-400 rounded-xl"
          >
            {t.nav.cta}
          </Link>
        </div>
      )}
    </header>
  );
}