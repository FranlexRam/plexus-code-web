// src/components/ContactModal.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  contactSchema,
  NAME_REGEX,
  PHONE_REGEX,
  STRICT_EMAIL_REGEX,
  MALICIOUS_PATTERNS,
  sanitizeInput,
} from "@/lib/validation";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { language, t } = useLanguage();
  const modalText = language === "en" ? t.modal : t.modal;

  const [mounted, setMounted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    country: "Venezuela",
    topic: "saas",
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      const timer = setTimeout(() => setAnimating(true), 20);
      return () => clearTimeout(timer);
    } else {
      setAnimating(false);
      const timer = setTimeout(() => {
        setMounted(false);
        setSubmitted(false);
        setErrors({});
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!mounted) return null;

  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors };

    if (field === "name") {
      if (!NAME_REGEX.test(value) || MALICIOUS_PATTERNS.test(value)) {
        newErrors.name = modalText.errors.name;
      } else {
        delete newErrors.name;
      }
    }

    if (field === "company") {
      if (value.trim().length < 2 || MALICIOUS_PATTERNS.test(value)) {
        newErrors.company = modalText.errors.company;
      } else {
        delete newErrors.company;
      }
    }

    if (field === "email") {
      if (!STRICT_EMAIL_REGEX.test(value)) {
        newErrors.email = modalText.errors.email;
      } else {
        delete newErrors.email;
      }
    }

    if (field === "phone") {
      if (!PHONE_REGEX.test(value)) {
        newErrors.phone = modalText.errors.phone;
      } else {
        delete newErrors.phone;
      }
    }

    if (field === "message") {
      if (value.trim().length < 10 || MALICIOUS_PATTERNS.test(value)) {
        newErrors.message = modalText.errors.message;
      } else {
        delete newErrors.message;
      }
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const sanitized = {
      country: sanitizeInput(formData.country),
      topic: formData.topic,
      name: sanitizeInput(formData.name),
      company: sanitizeInput(formData.company),
      email: formData.email.trim().toLowerCase(),
      phone: sanitizeInput(formData.phone),
      message: sanitizeInput(formData.message),
    };

    const result = contactSchema.safeParse(sanitized);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      const issues = result.error?.issues || result.error?.errors || [];
      
      issues.forEach((err) => {
        const key = String(err.path[0]);
        const errorDictionary = modalText.errors as Record<string, string>;
        fieldErrors[key] = errorDictionary[key] || err.message;
      });

      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sanitized),
      });

      if (response.ok) {
        setSubmitted(true);
        setErrors({});
      } else {
        setErrors({ server: modalText.errors.server });
      }
    } catch {
      setErrors({ server: modalText.errors.server });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300 ease-out ${
          animating ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Contenedor Modal 3D */}
      <div
        style={{ perspective: "1400px" }}
        className="relative w-full max-w-3xl z-10 my-auto"
      >
        <div
          className={`w-full bg-[#0b111e] text-slate-100 rounded-3xl border border-cyan-500/30 p-6 sm:p-10 md:p-12 shadow-[0_30px_70px_-15px_rgba(0,240,255,0.3)] transition-all duration-300 ease-out transform ${
            animating
              ? "opacity-100 translate-y-0 scale-100 rotate-x-0"
              : "opacity-0 translate-y-14 scale-95 -rotate-x-12"
          }`}
        >
          {/* Botón Cerrar */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-6 right-6 sm:top-8 sm:right-8 p-3 rounded-2xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Cerrar modal"
          >
            <X className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          {/* Header */}
          <div className="mb-8 space-y-3">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 p-2 flex items-center justify-center shadow-lg">
                <Image
                  src="/logo.png"
                  alt="Plexus Code Logo"
                  width={36}
                  height={36}
                  style={{ width: "auto", height: "auto" }}
                  className="object-contain"
                />
              </div>
              <h2
                id="contact-modal-title"
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white"
              >
                {modalText.title}
              </h2>
            </div>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-xl">
              {modalText.subtitle}
            </p>
          </div>

          {/* Estado Enviado */}
          {submitted ? (
            <div className="py-12 text-center space-y-5">
              <div className="w-20 h-20 rounded-full bg-cyan-950 border border-cyan-400 flex items-center justify-center text-cyan-400 mx-auto shadow-[0_0_35px_rgba(0,240,255,0.5)]">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">{modalText.successTitle}</h3>
              <p className="text-base text-slate-300 max-w-md mx-auto leading-relaxed">
                {modalText.successMsg}
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-base text-cyan-400 underline hover:text-cyan-300 font-mono pt-4 block mx-auto cursor-pointer"
              >
                {modalText.sendAnother}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5 sm:space-y-6">
              
              {/* Country & Topic */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label htmlFor="country" className="block text-xs sm:text-sm font-semibold uppercase text-slate-300 mb-2">
                    {modalText.countryLabel}
                  </label>
                  <select
                    id="country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-slate-900/95 border border-slate-700/90 rounded-2xl px-4 py-3.5 sm:py-4 text-base text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all cursor-pointer min-h-[44px]"
                  >
                    <option value="Venezuela">Venezuela</option>
                    <option value="United States">United States</option>
                    <option value="Spain">España / Spain</option>
                    <option value="Brazil">Brasil / Brazil</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Chile">Chile</option>
                    <option value="Mexico">México</option>
                    <option value="Other">Other Global Region</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="topic" className="block text-xs sm:text-sm font-semibold uppercase text-slate-300 mb-2">
                    {modalText.topicLabel}
                  </label>
                  <select
                    id="topic"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full bg-slate-900/95 border border-slate-700/90 rounded-2xl px-4 py-3.5 sm:py-4 text-base text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all cursor-pointer min-h-[44px]"
                  >
                    <option value="saas">{modalText.topics.saas}</option>
                    <option value="ai">{modalText.topics.ai}</option>
                    <option value="security">{modalText.topics.security}</option>
                    <option value="data">{modalText.topics.data}</option>
                  </select>
                </div>
              </div>

              {/* Name & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label htmlFor="name" className="block text-xs sm:text-sm font-semibold uppercase text-slate-300 mb-2">
                    {modalText.nameLabel} <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      validateField("name", e.target.value);
                    }}
                    placeholder={modalText.namePlaceholder}
                    className={`w-full bg-slate-900/90 border rounded-2xl px-4 py-3.5 sm:py-4 text-base text-white placeholder-slate-500 focus:outline-none transition-all shadow-inner min-h-[44px] ${
                      errors.name
                        ? "border-red-500 focus:ring-2 focus:ring-red-500/30"
                        : "border-slate-700/90 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
                    }`}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="company" className="block text-xs sm:text-sm font-semibold uppercase text-slate-300 mb-2">
                    {modalText.companyLabel} <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    id="company"
                    type="text"
                    required
                    aria-invalid={Boolean(errors.company)}
                    aria-describedby={errors.company ? "company-error" : undefined}
                    value={formData.company}
                    onChange={(e) => {
                      setFormData({ ...formData, company: e.target.value });
                      validateField("company", e.target.value);
                    }}
                    placeholder={modalText.companyPlaceholder}
                    className={`w-full bg-slate-900/90 border rounded-2xl px-4 py-3.5 sm:py-4 text-base text-white placeholder-slate-500 focus:outline-none transition-all shadow-inner min-h-[44px] ${
                      errors.company
                        ? "border-red-500 focus:ring-2 focus:ring-red-500/30"
                        : "border-slate-700/90 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
                    }`}
                  />
                  {errors.company && (
                    <p id="company-error" className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.company}
                    </p>
                  )}
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-semibold uppercase text-slate-300 mb-2">
                    {modalText.emailLabel} <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      validateField("email", e.target.value);
                    }}
                    placeholder={modalText.emailPlaceholder}
                    className={`w-full bg-slate-900/90 border rounded-2xl px-4 py-3.5 sm:py-4 text-base text-white placeholder-slate-500 focus:outline-none transition-all shadow-inner min-h-[44px] ${
                      errors.email
                        ? "border-red-500 focus:ring-2 focus:ring-red-500/30"
                        : "border-slate-700/90 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
                    }`}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs sm:text-sm font-semibold uppercase text-slate-300 mb-2">
                    {modalText.phoneLabel} <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      validateField("phone", e.target.value);
                    }}
                    placeholder={modalText.phonePlaceholder}
                    className={`w-full bg-slate-900/90 border rounded-2xl px-4 py-3.5 sm:py-4 text-base text-white placeholder-slate-500 focus:outline-none transition-all shadow-inner min-h-[44px] ${
                      errors.phone
                        ? "border-red-500 focus:ring-2 focus:ring-red-500/30"
                        : "border-slate-700/90 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
                    }`}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Textarea Mensaje */}
              <div>
                <label htmlFor="message" className="block text-xs sm:text-sm font-semibold uppercase text-slate-300 mb-2">
                  {modalText.messageLabel} <span className="text-cyan-400">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    validateField("message", e.target.value);
                  }}
                  placeholder={modalText.messagePlaceholder}
                  className={`w-full min-h-[140px] resize-y bg-slate-900/90 border rounded-2xl p-4 text-base text-white placeholder-slate-500 focus:outline-none transition-all shadow-inner ${
                    errors.message
                      ? "border-red-500 focus:ring-2 focus:ring-red-500/30"
                      : "border-slate-700/90 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
                  }`}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.message}
                  </p>
                )}
              </div>

              {errors.server && (
                <div className="p-4 bg-red-950/60 border border-red-500/40 rounded-xl text-sm text-red-200">
                  {errors.server}
                </div>
              )}

              {/* Botón de Envío */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 sm:py-5 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 text-black font-extrabold text-base sm:text-lg rounded-2xl transition-all duration-200 shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:shadow-[0_0_45px_rgba(0,240,255,0.65)] cursor-pointer flex items-center justify-center gap-3 transform hover:-translate-y-0.5 min-h-[48px]"
                >
                  <Send className="w-5 h-5" />
                  {isSubmitting ? "PROCESSING..." : modalText.submit}
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}