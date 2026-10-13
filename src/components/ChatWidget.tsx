// src/components/ChatWidget.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, Mic, MessageSquareText, ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [chatMode, setChatMode] = useState<'selection' | 'text' | 'voice'>('selection');
  const { t } = useLanguage();

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setShowTooltip(false);
  };

  return (
    <>
      {/* 1. TOOLTIP FLOTANTE (Bienvenida) */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
            className="fixed bottom-24 right-6 sm:right-8 z-40 w-64 bg-slate-900 border border-cyan-500/30 p-4 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
            <button 
              onClick={() => setShowTooltip(false)}
              className="absolute top-2 right-2 text-slate-500 hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-slate-950 border border-slate-800 flex-shrink-0 flex items-center justify-center p-1">
                <Image src="/paso-1.png" width={24} height={24} alt="Cyrus AI" className="object-contain drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]" />
              </div>
              <p className="text-xs text-slate-200 mt-1 leading-relaxed pr-2">
                {t.chatWidget.tooltip}
              </p>
            </div>
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-slate-900 border-b border-r border-cyan-500/30 transform rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. BOTÓN FLOTANTE PRINCIPAL */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleChat}
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all duration-300 group"
            aria-label={t.chatWidget.ariaLabel}
          >
            <Bot className="w-6 h-6 sm:w-8 sm:h-8" />
            
            <span className="absolute top-0 right-0 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-slate-900"></span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* 3. MODAL CENTRAL */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleChat}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[85vh] sm:h-[75vh] min-h-[450px] sm:min-h-[600px] max-h-[800px]"
            >
              
              {/* Cabecera dinámica */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-slate-950 border-b border-slate-800">
                <div className="flex items-center gap-3 sm:gap-4">
                  {chatMode !== 'selection' && (
                    <button 
                      onClick={() => setChatMode('selection')}
                      className="p-1 sm:p-1.5 mr-1 sm:mr-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                  )}
                  
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-slate-800 rounded-full border border-cyan-500/30 flex items-center justify-center overflow-hidden shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                    <div className="w-7 h-7 sm:w-10 sm:h-10 relative">
                      <Image 
                        src="/paso-1.png" 
                        alt="AI Avatar" 
                        fill
                        className="object-contain drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base sm:text-lg tracking-tight">{t.chatWidget.botName}</h3>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]"></span>
                      <span className="text-[10px] sm:text-xs text-slate-400 font-mono">{t.chatWidget.status}</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={toggleChat}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              {/* VISTAS INTERNAS SEGÚN EL ESTADO */}
              
              {/* VISTA A: Selección de Modalidad */}
              {chatMode === 'selection' && (
                <div className="flex flex-col items-center justify-center flex-1 p-6 sm:p-8 bg-slate-900/50">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 mb-6 sm:mb-8 relative drop-shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                    <Image src="/paso-1.png" fill alt="AI" className="object-contain animate-float" />
                  </div>
                  <h4 className="text-xl sm:text-2xl text-white font-extrabold mb-6 sm:mb-8 text-center">{t.chatWidget.selectionTitle}</h4>
                  
                  <div className="w-full max-w-md space-y-3 sm:space-y-4">
                    <button 
                      onClick={() => setChatMode('text')} 
                      className="w-full flex items-center p-4 sm:p-5 bg-slate-800/40 border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800/80 rounded-xl transition-all group"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cyan-950 border border-cyan-500/30 flex items-center justify-center mr-4 sm:mr-5 group-hover:scale-110 transition-transform shrink-0">
                        <MessageSquareText className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400"/>
                      </div>
                      <span className="text-base sm:text-lg text-slate-200 font-medium">{t.chatWidget.optionText}</span>
                    </button>
                    
                    <button 
                      onClick={() => setChatMode('voice')} 
                      className="w-full flex items-center p-4 sm:p-5 bg-slate-800/40 border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800/80 rounded-xl transition-all group"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cyan-950 border border-cyan-500/30 flex items-center justify-center mr-4 sm:mr-5 group-hover:scale-110 transition-transform shrink-0">
                        <Mic className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400"/>
                      </div>
                      <span className="text-base sm:text-lg text-slate-200 font-medium">{t.chatWidget.optionVoice}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* VISTA B: Chat por Texto */}
              {chatMode === 'text' && (
                <>
                  <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-900/50 space-y-4 sm:space-y-6">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-800 border border-cyan-500/20 flex-shrink-0 flex items-center justify-center relative">
                        <div className="w-5 h-5 sm:w-7 sm:h-7 relative">
                           <Image src="/paso-1.png" alt="AI" fill className="object-contain" />
                        </div>
                      </div>
                      <div className="bg-slate-800 border border-slate-700 text-slate-200 text-sm sm:text-base p-4 sm:p-5 rounded-2xl rounded-tl-sm max-w-[85%] leading-relaxed shadow-sm">
                        Hola. Soy el asistente autónomo de Plexus Code. Estoy aquí para analizar tu negocio y diseñar una arquitectura de software a tu medida. ¿En qué te puedo ayudar hoy?
                      </div>
                    </div>
                  </div>

                  <div className="p-3 sm:p-6 bg-slate-950 border-t border-slate-800">
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder={t.chatWidget.inputPlaceholder} 
                        disabled
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 sm:py-4 pl-4 sm:pl-5 pr-12 sm:pr-14 text-sm sm:text-base text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors disabled:opacity-50"
                      />
                      <button 
                        disabled
                        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-2 text-cyan-500 hover:text-cyan-400 disabled:text-slate-600 transition-colors"
                      >
                        <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                    <div className="text-center mt-2 sm:mt-3">
                      <span className="text-[9px] sm:text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                        {t.chatWidget.connecting}
                      </span>
                    </div>
                  </div>
                </>
              )}

              {/* VISTA C: Asistencia por Voz (En construcción) */}
              {chatMode === 'voice' && (
                <div className="flex flex-col items-center justify-center flex-1 p-6 sm:p-8 bg-slate-900/50 text-center">
                   <div className="relative mb-6 sm:mb-8">
                     <div className="absolute inset-0 bg-cyan-500/20 rounded-full animate-ping scale-150"></div>
                     <div className="w-20 h-20 sm:w-24 sm:h-24 bg-cyan-950 border border-cyan-400 rounded-full flex items-center justify-center relative z-10 shadow-[0_0_30px_rgba(6,182,212,0.5)]">
                       <Mic className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400" />
                     </div>
                   </div>
                   <h4 className="text-lg sm:text-xl text-white font-bold mb-2">Módulo de Voz</h4>
                   <p className="text-sm sm:text-base text-slate-400">Esta función está en desarrollo para la próxima fase (F3-03).</p>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}