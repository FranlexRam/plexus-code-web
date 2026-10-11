// src/components/ProcessSteps.tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Activity, Code2, Rocket } from "lucide-react";

export default function ProcessSteps() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Scale based on scroll progress
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  // Laser circle guide
  const dotY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  const steps = [
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

// Sub-component with local physical sensors
  const StepItem = ({ step, index }: { 
    step: typeof steps[0]; 
    index: number; 
  }) => {
    // Local physical sensor for exact DOM measurement
    const itemRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ 
      target: itemRef, 
      offset: ["start center", "end center"] 
    });
    
    // Instant trigger mapping (first 20% of contact)
    const cardOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
    const cardY = useTransform(scrollYProgress, [0, 0.2], [50, 0]);
    const iconBg = useTransform(scrollYProgress, [0, 0.2], ["#0f172a", "#06b6d4"]); // slate-900 to cyan-500
    const iconBorder = useTransform(scrollYProgress, [0, 0.2], ["#334155", "#22d3ee"]); // slate-700 to cyan-400
    const iconColor = useTransform(scrollYProgress, [0, 0.2], ["#64748b", "#ffffff"]); // slate-500 to white
    
    return (
      <div ref={itemRef} className="relative mb-12 md:mb-16 last:mb-0">
        {/* Icon Node - Perfectly centered on the 1px bar (ALWAYS VISIBLE) */}
        <motion.div 
          className="absolute -left-[70px] md:-left-[96px] top-12 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-xl z-30 border-2 bg-slate-900"
          style={{ 
            backgroundColor: iconBg,
            borderColor: iconBorder, 
            color: iconColor,
          }}
        >
          <step.icon className="w-7 h-7 md:w-8 md:h-8" />
        </motion.div>
        
        {/* Glass Card Content (with opacity animation) */}
        <motion.div 
          className="glass-card rounded-2xl p-8 md:p-12 border border-slate-800 bg-slate-900/30 backdrop-blur-sm relative"
          style={{ opacity: cardOpacity, y: cardY }}
        >
          {/* Giant Watermark Number in Background */}
          <span className="absolute top-0 right-4 md:top-auto md:bottom-2 md:right-8 text-[120px] md:text-[180px] font-black text-slate-600/40 leading-none select-none pointer-events-none z-0">
            {index + 1}
          </span>
          
          {/* Content Container (above watermark) */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="flex flex-col">
              {/* Step Indicator */}
              <div className="flex items-center gap-3 mb-3">
                <motion.div 
                  className="w-3 h-3 rounded-full bg-cyan-400"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2, delay: index * 0.5 }}
                />
                <span className="text-sm md:text-base font-bold tracking-widest uppercase text-cyan-400">
                  {step.label}
                </span>
              </div>
            
            {/* Step Title */}
            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-6 tracking-tight">
              {step.title}
            </h3>
            
            {/* Step Description */}
            <p className="text-base md:text-lg text-slate-300 leading-relaxed mb-8">
              {step.description}
            </p>
            
            {/* Key Points */}
            <div className="space-y-3">
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
            </div> {/* Close left column */}
            
            {/* Right Column - Future 3D Art */}
            <div className="hidden md:flex relative justify-center items-center w-full min-h-[250px]">
              {/* Empty placeholder for 3D artwork */}
            </div>
          </div> {/* Close grid container */}
        </motion.div>
      </div>
    );
  };

  

  return (
    <section className="relative max-w-5xl mx-auto py-24 px-4 text-slate-300">
      
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
        
        {/* Base Track - Continuous Height */}
        <div className="absolute left-6 md:left-12 top-0 bottom-0 w-1 bg-slate-800/50 rounded-full z-0" />
        
        {/* Animated Progress Bar - Scales with scroll */}
        <motion.div 
          className="absolute left-6 md:left-12 top-0 bottom-0 w-1 bg-cyan-500 origin-top rounded-full z-10"
          style={{ scaleY }}
        />

        {/* Laser Circle Guide */}
        <motion.div 
          className="absolute left-[22px] md:left-[46px] w-4 h-4 bg-cyan-500 border-4 border-slate-900 rounded-full z-30 shadow-[0_0_15px_#06b6d4] -mt-2"
          style={{ top: dotY }}
        />

        {/* Steps Container */}
        <div className="flex flex-col w-full pl-20 md:pl-28">
          {steps.map((step, index) => (
            <StepItem 
              key={index} 
              step={step} 
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Footer Section - Using translation */}
      <p className="mt-20 text-center text-slate-400 font-medium max-w-2xl mx-auto px-4">
        {t.process.footer}
      </p>

    </section>
  );
}