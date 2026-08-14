// src/components/LanguageSelector.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Language } from "@/lib/translations";
import { ChevronDown } from "lucide-react";

const languages: { code: Language; label: string; flag: string }[] = [
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "pt", label: "Português", flag: "🇧🇷" },
];

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Botón Activo */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-cyan-500/25 hover:border-cyan-400 text-xs font-mono text-slate-200 transition-all shadow-[0_0_10px_rgba(0,240,255,0.1)]"
        aria-label="Seleccionar idioma"
      >
        <span className="text-base leading-none">{currentLang.flag}</span>
        <span className="uppercase font-semibold">{currentLang.code}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-cyan-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Menú Desplegable */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 glass-panel rounded-xl border border-cyan-500/30 bg-slate-950/95 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-1.5 z-50 overflow-hidden">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-mono text-left transition-colors ${
                language === lang.code
                  ? "bg-cyan-500/20 text-cyan-300 font-bold border-l-2 border-cyan-400"
                  : "text-slate-300 hover:bg-slate-900/80 hover:text-cyan-400"
              }`}
            >
              <span className="text-base leading-none">{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}