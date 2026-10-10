// src/context/LanguageContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, translations } from "@/lib/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.es;
}

const defaultContextValue: LanguageContextType = {
  language: "es",
  setLanguage: () => {},
  t: translations.es,
};

const LanguageContext = createContext<LanguageContextType>(defaultContextValue);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("es");

  // Actualizar el atributo <html lang> dinámicamente para SEO
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
      
      // También actualizar el título de la página basado en el idioma
      // Aunque el título principal está en metadata, esto mantiene actualización en tiempo real
      const langTitles = {
        es: "Plexus Code | Software B2B & Inteligencia Artificial",
        en: "Plexus Code | B2B Software & Artificial Intelligence", 
        pt: "Plexus Code | Software B2B & Inteligência Artificial"
      };
      
      document.title = langTitles[language] || langTitles.es;
    }
  }, [language]);

  const value = {
    language,
    setLanguage,
    t: translations[language] || translations.es,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  return context || defaultContextValue;
}