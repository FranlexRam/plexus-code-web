// src/components/Footer.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Send, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-[#04060c] border-t border-slate-800 pt-16 sm:pt-24 pb-12 sm:pb-16 text-slate-300 font-sans mt-24 sm:mt-32 overflow-hidden">
      <div className="w-full px-4 sm:px-8 lg:px-14 xl:px-20">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 sm:gap-10 pb-12 sm:pb-16 border-b border-slate-800">
          
          {/* Brand & Redes */}
          <div className="sm:col-span-2 space-y-5 sm:space-y-6">
            <Link href="/" className="flex items-center gap-3 sm:gap-4 group">
              <div className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-900/90 border border-slate-800 group-hover:border-cyan-400 transition-all p-2 shadow-lg">
                <Image
                  src="/logo.png"
                  alt="Plexus Code Logo"
                  width={48}
                  height={48}
                  className="object-contain w-full h-full"
                />
              </div>
              <span className="font-extrabold tracking-tight text-white text-2xl sm:text-3xl">
                PLEXUS<span className="text-cyan-400">CODE</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-sm">
              AI-Powered Software Engineering & Defensive Cybersecurity Architectures. Secure by design. Scalable by default.
            </p>

            <div className="flex items-center gap-4 pt-1">
              <a
                href="https://www.linkedin.com/company/plexus-code/"
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-cyan-400 transition-all duration-200 transform hover:scale-110 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z"/>
                </svg>
              </a>

              <a
                href="#"
                className="text-white hover:text-cyan-400 transition-all duration-200 transform hover:scale-110 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              <a
                href="#"
                className="text-white hover:text-cyan-400 transition-all duration-200 transform hover:scale-110 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="TikTok"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/>
                </svg>
              </a>

              <a
                href="mailto:contact@plexuscode.com"
                className="text-white hover:text-cyan-400 transition-all duration-200 transform hover:scale-110 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Email"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
            {/* TODO: Insertar URLs de Instagram y TikTok cuando estén listas */}
          </div>

          {/* Soluciones */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-white text-base font-bold uppercase tracking-wider">
              {t.footer.solutionsHeading}
            </h4>
            <ul className="space-y-2.5 text-sm sm:text-base">
              <li><Link href="#services" className="hover:text-cyan-400 transition-colors">{t.footer.solution1}</Link></li>
              <li><Link href="#services" className="hover:text-cyan-400 transition-colors">{t.footer.solution2}</Link></li>
              <li><Link href="#services" className="hover:text-cyan-400 transition-colors">{t.footer.solution3}</Link></li>
              <li><Link href="#services" className="hover:text-cyan-400 transition-colors">{t.footer.solution4}</Link></li>
            </ul>
          </div>

          {/* Tecnologías */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-white text-base font-bold uppercase tracking-wider">
              {t.footer.technologiesHeading}
            </h4>
            <ul className="space-y-2.5 text-sm sm:text-base">
              <li><Link href="#stack" className="hover:text-cyan-400 transition-colors">{t.footer.tech1}</Link></li>
              <li><Link href="#stack" className="hover:text-cyan-400 transition-colors">{t.footer.tech2}</Link></li>
              <li><Link href="#stack" className="hover:text-cyan-400 transition-colors">{t.footer.tech3}</Link></li>
              <li><Link href="#stack" className="hover:text-cyan-400 transition-colors">{t.footer.tech4}</Link></li>
            </ul>
          </div>

          {/* Firma */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-white text-base font-bold uppercase tracking-wider">
              {t.footer.signatureHeading}
            </h4>
            <ul className="space-y-2.5 text-sm sm:text-base">
              <li><Link href="#services" className="hover:text-cyan-400 transition-colors">{t.footer.signature1}</Link></li>
              <li><Link href="#contact" className="hover:text-cyan-400 transition-colors">{t.footer.signature2}</Link></li>
              <li><a href="mailto:contact@plexuscode.com" className="hover:text-cyan-400 transition-colors">{t.footer.signature3}</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-2 space-y-3 sm:space-y-4">
            <h4 className="text-white text-base font-bold uppercase tracking-wider">
              {t.footer.newsletterHeading}
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t.footer.newsletterDescription}
            </p>
            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder="tu@empresa.com"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors min-h-[44px]"
              />
              <button
                type="button"
                className="p-3.5 bg-cyan-400 hover:bg-cyan-300 text-black font-bold rounded-xl transition-colors shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
                aria-label="Suscribir"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 sm:pt-12 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-slate-500 gap-4 text-center sm:text-left">
<div>
             {t.footer.copyright}
           </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-semibold">
<Link href="/privacy" className="hover:text-slate-300 transition-colors">{t.footer.privacy}</Link>
              <span className="text-slate-800">|</span>
              <Link href="/terms" className="hover:text-slate-300 transition-colors">{t.footer.terms}</Link>
              <span className="text-slate-800">|</span>
              <Link href="#contact" className="hover:text-slate-300 transition-colors">{t.footer.zeroTrustPolicies}</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}