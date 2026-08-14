// src/components/ContactTerminal.tsx
"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Send, CheckCircle2, Mail, ShieldCheck } from "lucide-react";

export default function ContactTerminal() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Custom Software & SaaS",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-28 sm:py-36 px-6 sm:px-8 w-full max-w-7xl mx-auto z-10">
      <div className="glass-card rounded-3xl p-8 sm:p-14 md:p-16 border border-cyan-500/20 bg-slate-950/60 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Columna Izquierda: Información (5 columnas) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-400 text-xs font-mono uppercase tracking-widest">
              <span>{t.contact.badge}</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {t.contact.title}
            </h2>
            
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              {t.contact.description}
            </p>

            <div className="pt-4 space-y-4 font-mono text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500">CORREO DIRECTO</div>
                  <div className="text-slate-200">contact@plexuscode.com</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500">GARANTÍA TÉCNICA</div>
                  <div className="text-slate-200">Secure by design. Scalable by default.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Formulario (7 columnas) */}
          <div className="lg:col-span-7 bg-slate-950/80 rounded-2xl p-6 sm:p-10 border border-slate-800">
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-cyan-950 border border-cyan-400 flex items-center justify-center text-cyan-400 mx-auto shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">{t.contact.successTitle}</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  {t.contact.successMsg}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-cyan-400 underline hover:text-cyan-300 mt-3 inline-block font-mono"
                >
                  {t.contact.reset}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1.5">
                      {t.contact.name}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ej. Franlex Ramírez"
                      className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1.5">
                      {t.contact.email}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="tu@empresa.com"
                      className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1.5">
                    {t.contact.message}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Detalles sobre el proyecto, arquitectura requerida o requerimientos de seguridad..."
                    className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs font-mono rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.35)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  {t.contact.submit}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}