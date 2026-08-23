// src/app/page.tsx
"use client";

import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesBento from "@/components/ServicesBento";
import TechStack from "@/components/TechStack";
import CtaBanner from "@/components/CtaBanner";
import ContactTerminal from "@/components/ContactTerminal";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <LanguageProvider>
      <main className="relative min-h-screen bg-[#06090f] text-slate-100 selection:bg-cyan-400 selection:text-black">
        <Navbar />
        <Hero />
        <ServicesBento />
        <TechStack />
        <CtaBanner />
        <ContactTerminal />
        <Footer />
      </main>
    </LanguageProvider>
  );
}