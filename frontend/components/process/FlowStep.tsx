import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import KineticConnector from './KineticConnector';
import { IconChevronDown } from './ProcessIcons';

interface FlowStepProps {
  step: {
    id: string;
    title: string;
    subtitle: string;
    description: string;
  };
  index: number;
  isEven: boolean;
  isLast: boolean;
  isActive: boolean;
  onActivate: (id: string) => void;
  onVisibilityChange: (id: string, isVisible: boolean) => void;
  isScrolling: boolean;
}

const FlowStep: React.FC<FlowStepProps> = ({ step, index, isEven, isLast, isActive, onActivate, onVisibilityChange, isScrolling }) => {
  // Sensor Ref dipindahkan ke container utama untuk pembacaan "Container Step"
  const sensorRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // LOGIC UPDATE: MANUAL SENSOR
  // Menggunakan native scroll listener dan getBoundingClientRect untuk kontrol penuh.
  useEffect(() => {
    const checkVisibility = () => {
      if (!sensorRef.current) return;

      const rect = sensorRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Hitung batas zona buta (20% dari atas sesuai request)
      // Area 0% - 20% dari atas viewport adalah "Blind Zone" (Inactive Zone)
      const blindZoneLimit = viewportHeight * 0.20;

      // Logic Visibility:
      // 1. Container Top harus DI BAWAH garis 20% (rect.top > blindZoneLimit)
      // 2. Container Top harus DI ATAS garis bawah layar (rect.top < viewportHeight)
      // Jika masuk ke area 0-20% teratas, isVisible menjadi false -> step ini non-aktif -> step berikutnya ambil alih.
      const isVisible = rect.top > blindZoneLimit && rect.top < viewportHeight;

      // Kita kirim status ke parent
      onVisibilityChange(step.id, isVisible);
    };

    // Pasang listener
    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });

    // Cek awal saat mount
    checkVisibility();

    return () => {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, [step.id, onVisibilityChange]);

  const handleManualClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onActivate(step.id);
  };

  const cardVariants = {
    idle: {
      scale: 0.98,
      opacity: 0.5,
      backgroundColor: 'rgba(15, 46, 31, 0.2)',
      borderColor: 'rgba(255, 255, 255, 0.05)',
      y: 0,
      boxShadow: '0 0 0 rgba(0,0,0,0)'
    },
    active: {
      scale: 1,
      opacity: 1,
      backgroundColor: 'rgba(15, 46, 31, 0.98)',
      borderColor: 'rgba(133, 169, 71, 0.8)',
      boxShadow: '0 25px 60px -12px rgba(133, 169, 71, 0.4)',
      y: 0
    },
    hover: {
      scale: 1.05,
      y: -10,
      borderColor: 'rgba(133, 169, 71, 0.8)',
      backgroundColor: 'rgba(20, 60, 45, 0.98)',
      boxShadow: '0 40px 80px -20px rgba(133, 169, 71, 0.4)'
    }
  };

  const currentVariant = isActive
    ? "active"
    : (isHovered && !isScrolling ? "hover" : "idle");

  return (
    <div
      ref={sensorRef} // Ref dipindah ke container utama sesuai instruksi
      id={`process-step-${step.id}`}
      className="relative w-full mb-12 md:mb-20 transform-gpu z-10"
    >
      <KineticConnector isActive={isActive} isHovered={isHovered && !isScrolling} isEven={isEven} />

      {/* HUB BUTTON */}
      <div className="absolute left-5 md:left-1/2 top-0 md:top-[2.5rem] -translate-x-1/2 -translate-y-1/2 z-40">
        <motion.button
          className="relative w-12 h-12 rounded-full border flex items-center justify-center bg-void cursor-pointer shadow-xl outline-none overflow-hidden"
          onClick={handleManualClick}
          animate={{
            scale: isActive ? 1.3 : (isHovered && !isScrolling ? 1.25 : 1),
            borderColor: (isActive || (isHovered && !isScrolling)) ? '#85A947' : 'rgba(255,255,255,0.1)',
            boxShadow: (isActive || (isHovered && !isScrolling)) ? '0 0 40px rgba(133,169,71,0.6)' : 'none',
            backgroundColor: isActive ? 'rgba(133, 169, 71, 0.15)' : 'rgba(18, 53, 36, 1)'
          }}
          whileHover={{ scale: isScrolling ? 1 : 1.35 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <span className={`font-serif text-sm font-bold tracking-tighter transition-colors duration-300 relative z-10 ${isActive ? 'text-white' : 'text-cream/30'}`}>
            {step.id}
          </span>
          {(isActive || (isHovered && !isScrolling)) && (
            <motion.div
              className="absolute inset-0 rounded-full border border-brand-500/50"
              animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
            />
          )}
        </motion.button>
      </div>

      <div className="md:grid md:grid-cols-2 w-full">
        <div className={`flex items-center ${isEven ? 'md:justify-end md:pr-[120px]' : 'md:col-start-2 md:pl-[120px]'}`}>

          {/* CONTENT CARD */}
          <div
            onClick={handleManualClick}
            onMouseEnter={() => !isScrolling && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`relative z-10 w-full max-w-md cursor-pointer ml-16 md:ml-0 p-3 transition-all duration-300 ${isHovered && !isScrolling ? 'z-20' : ''} ${isScrolling ? 'pointer-events-none' : 'pointer-events-auto active:scale-[0.98]'}`}
            style={{ willChange: 'transform' }}
          >
            <motion.div
              animate={currentVariant}
              variants={cardVariants}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden rounded-2xl border backdrop-blur-md will-change-transform relative shadow-2xl"
              style={{ backfaceVisibility: 'hidden' }}
            >
              {/* Hover Gloss Effect (Glass Sweep) */}
              <AnimatePresence>
                {isHovered && !isScrolling && (
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 z-0 pointer-events-none"
                  />
                )}
              </AnimatePresence>

              {/* Active Gradient Glow */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gradient-to-br from-brand-500/15 via-transparent to-transparent z-0 pointer-events-none"
                  />
                )}
              </AnimatePresence>

              <div className="px-8 py-6 border-b border-white/5 relative z-10">
                <div className="flex justify-between items-center pointer-events-none">
                  <div>
                    <motion.span
                      animate={{ color: (isActive || (isHovered && !isScrolling)) ? '#85A947' : 'rgba(239, 227, 194, 0.3)' }}
                      className={`block font-sans text-[10px] font-bold uppercase tracking-[0.3em] mb-1.5`}
                    >
                      Phase {step.id}
                    </motion.span>
                    <motion.h3
                      animate={{ color: (isActive || (isHovered && !isScrolling)) ? '#ffffff' : 'rgba(255, 255, 255, 0.5)' }}
                      className={`font-serif text-xl md:text-2xl font-bold tracking-tight transition-colors duration-500`}
                    >
                      {step.title}
                    </motion.h3>
                  </div>
                  <motion.div
                    animate={{
                      rotate: isActive ? 180 : 0,
                      scale: (isActive || (isHovered && !isScrolling)) ? 1.25 : 1,
                      color: (isActive || (isHovered && !isScrolling)) ? '#85A947' : 'rgba(255,255,255,0.2)'
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <IconChevronDown />
                  </motion.div>
                </div>
              </div>

              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    key={`content-${step.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                    className="overflow-hidden relative z-10"
                  >
                    <div className="px-8 py-7 bg-white/[0.02]">
                      <p className="font-sans text-brand-500 font-bold text-sm tracking-[0.1em] mb-3 uppercase">
                        {step.subtitle}
                      </p>
                      <p className="font-sans text-cream/70 leading-relaxed text-sm md:text-base font-light">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowStep;