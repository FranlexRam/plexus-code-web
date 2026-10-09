// src/app/page.tsx
"use client";

import { useState } from "react";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesBento from "@/components/ServicesBento";
import SuccessStories from "@/components/SuccessStories";
import TechStack from "@/components/TechStack";
import CtaBanner from "@/components/CtaBanner";
import ContactTerminal from "@/components/ContactTerminal";
import ContactModal from "@/components/ContactModal";
import Footer from "@/components/Footer";

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <LanguageProvider>
      <main className="relative min-h-screen bg-[#06090f] text-slate-100 selection:bg-cyan-400 selection:text-black overflow-x-clip">
        <Navbar onOpenContact={() => setIsContactOpen(true)} />
        <Hero onOpenContact={() => setIsContactOpen(true)} />
        <ServicesBento />
        <SuccessStories />
        <TechStack />
        <CtaBanner />
        <ContactTerminal />
        <Footer />
        <ContactModal
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
        />
      </main>
    </LanguageProvider>
  );
}