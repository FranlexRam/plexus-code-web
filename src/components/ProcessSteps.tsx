// src/components/ProcessSteps.tsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Activity, Code2, Rocket } from "lucide-react";

type StepType = {
  number: string;
  title: string;
  description: string;
  label: string;
  keyPoints: string[];
  icon: React.ElementType;
};

// Sub-component extraído al exterior para evitar el re-render loop y mejorar rendimiento
const StepItem = ({ step, index }: { step: StepType; index: number }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ 
    target: itemRef, 
    offset: ["start center", "end center"] 
  });
  
  const cardOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const cardY = useTransform(scrollYProgress, [0, 0.2], [50, 0]);
  const iconBg = useTransform(scrollYProgress, [0, 0.2], ["#0f172a", "#06b6d4"]);
  const iconBorder = useTransform(scrollYProgress, [0, 0.2], ["#334155", "#22d3ee"]);
  const iconColor = useTransform(scrollYProgress, [0, 0.2], ["#64748b", "#ffffff"]);
  
  return (
    <div ref={itemRef} className="relative mb-12 md:mb-16 last:mb-0 w-full">
      {/* Icon Node - Alineación matemática perfecta en eje absoluto */}
      <motion.div
        className="absolute left-6 sm:left-10 md:left-16 -translate-x-1/2 top-12 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center rounded-xl z-30 border-2 bg-slate-900"
        style={{ backgroundColor: iconBg, borderColor: iconBorder, color: iconColor }}
      >
        <step.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
      </motion.div>

      {/* GLASS CARD - w-full removido, usando margin-left para liberar el eje de la línea */}
      <motion.div
        className="glass-card rounded-2xl p-6 sm:p-8 md:p-12 border border-slate-800 bg-slate-900/30 backdrop-blur-sm relative overflow-hidden ml-16 sm:ml-24 md:ml-36"
        style={{ opacity: cardOpacity, y: cardY }}
      >
        {/* Watermark (Oculto en móvil) */}
        <span className="hidden md:block absolute top-4 right-8 text-8xl md:text-9xl font-black text-white/3 select-none pointer-events-none">
          {index + 1}
        </span>

        {/* Grid Container */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 md:gap-12 items-center">

          {/* Left Column - Texto */}
          <div className="flex flex-col w-full">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
              {step.title}
            </h3>
            <p className="text-base md:text-lg text-slate-300 leading-relaxed mb-8">
              {step.description}
            </p>

            {/* Key Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {step.keyPoints.map((keyPoint, keyIndex) => (
                <div key={keyIndex} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-xs font-bold shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span className="text-base md:text-lg text-slate-300">
                    {keyPoint}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - 3D Art */}
          <div className="hidden md:flex relative justify-center items-center w-full min-h-[250px]">
            <div className="absolute inset-0 bg-cyan-500/20 blur-[100px] rounded-full scale-150 z-0" />
            <motion.div
              className="relative z-10 w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 flex justify-center items-center mx-auto mt-8 lg:mt-0"
              animate={{ y: [-15, 5, -15] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: index * 0.4 }}
            >
              <Image
                src={`/paso-${index + 1}.png`}
                alt={`Ilustración del Paso ${index + 1}`}
                width={400}
                height={400}
                className="object-contain drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]"
                priority={index === 0}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function ProcessSteps() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const dotY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  const steps: StepType[] = [
    { 
      number: "01", 
      title: t.process.step1, 
      description: t.process.step1Desc,
      label: t.process.step1Label,
      keyPoints: [t.process.keyPoint1, t.process.keyPoint4, t.process.keyPoint7],
      icon: Activity
    },
    { 
      number: "02", 
      title: t.process.step2, 
      description: t.process.step2Desc,
      label: t.process.step2Label,
      keyPoints: [t.process.keyPoint2, t.process.keyPoint5, t.process.keyPoint8],
      icon: Code2
    },
    { 
      number: "03", 
      title: t.process.step3, 
      description: t.process.step3Desc,
      label: t.process.step3Label,
      keyPoints: [t.process.keyPoint3, t.process.keyPoint6, t.process.keyPoint9],
      icon: Rocket
    },
  ];

  return (
    <section className="relative max-w-6xl mx-auto py-24 px-4 sm:px-6 md:px-8 overflow-x-hidden text-slate-300">
      
      {/* Header */}
      <div className="text-center mb-16">
        <span className="inline-block text-xs md:text-sm font-mono text-cyan-400 uppercase tracking-widest mb-3 px-4 py-1.5 border border-cyan-400/20 rounded-full bg-cyan-400/5">
          {t.process.badge}
        </span>
        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
          {t.process.title}
        </h2>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          {t.process.subtitle}
        </p>
      </div>

      {/* Scroll Container */}
      <div ref={containerRef} className="relative mt-20">
        
        {/* Base Track */}
        <div className="absolute left-6 sm:left-10 md:left-16 -translate-x-1/2 top-0 bottom-0 w-1 bg-slate-800/50 rounded-full z-0" />
        
        {/* Animated Progress Bar */}
        <motion.div 
          className="absolute left-6 sm:left-10 md:left-16 -translate-x-1/2 top-0 bottom-0 w-1 bg-cyan-500 origin-top rounded-full z-10"
          style={{ scaleY }}
        />

        {/* Laser Circle Guide */}
        <motion.div 
          className="absolute left-6 sm:left-10 md:left-16 -translate-x-1/2 w-4 h-4 bg-cyan-500 border-4 border-slate-900 rounded-full z-30 shadow-[0_0_15px_#06b6d4] -mt-2"
          style={{ top: dotY }}
        />

        {/* Steps Container - Padding izquierdo removido para sincronizar ejes */}
        <div className="flex flex-col w-full max-w-full pr-4 sm:pr-8 md:pr-0">
          {steps.map((step, index) => (
            <StepItem 
              key={index} 
              step={step} 
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <p className="mt-20 text-center text-slate-400 font-medium max-w-2xl mx-auto px-4">
        {t.process.footer}
      </p>

    </section>
  );
}