import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, Variants } from 'framer-motion';
import Container from '../ui/Container';
import HeroCard from '../hero/HeroCard';

// --- Icons for Hero Cards ---
const IconHandClick = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
     <path d="M4.5 12.5l5 5 10-10" opacity="0.5"/>
     <path d="M12 21a9 9 0 1 0-9-9c0 4.97 4.03 9 9 9z" />
     <path d="M12 7v4" />
     <path d="M12 15h.01" strokeWidth="2.5"/>
  </svg>
);

const IconChart = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 3v18h18" />
    <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
  </svg>
);

const IconRocket = () => (
   <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 9l1.5 1.5" opacity="0.5" />
      <path d="M15 5.5l3 3" opacity="0.5" />
   </svg>
);

const IconPuzzle = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M19.439 15.424c-1.356 0-2.316-.96-2.316-2.316V10.74c0-1.356.96-2.316 2.316-2.316h.669a2.316 2.316 0 0 0 2.316-2.316V5.439A2.316 2.316 0 0 0 20.108 3.123h-6.265c-1.356 0-2.316.96-2.316 2.316v2.368c0 1.356-.96 2.316-2.316 2.316H6.843a2.316 2.316 0 0 0-2.316 2.316v.669c0 1.356.96 2.316 2.316 2.316h2.368c1.356 0 2.316.96 2.316 2.316v6.265a2.316 2.316 0 0 0 2.316 2.316h6.265a2.316 2.316 0 0 0 2.316-2.316v-.669c0-1.356-.96-2.316-2.316-2.316h-2.369z" />
  </svg>
);

const PixelIconArrowRight = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 6h2v2h2v2h2v4h-2v2h-2v2h-2v-2h2v-2h-2v-2H6v-2h10V8h-2V6z"/>
  </svg>
);

const PixelIconChevronDown = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 8h2v2h2v2h2v-2h2v-2h2V8h-2v2h-2v2h-2v2h-2v-2H8V8H6z"/>
  </svg>
);

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Refined Parallax Configuration
  const yBg1 = useTransform(scrollY, [0, 1200], [0, 150]); 
  const rotateBg1 = useTransform(scrollY, [0, 1200], [0, 240]);
  const opacityBg1 = useTransform(scrollY, [0, 800], [0.6, 0]); 
  const scaleBg1 = useTransform(scrollY, [0, 1200], [1, 0.9]);

  const yBg2 = useTransform(scrollY, [0, 1200], [0, -250]); 
  const scaleBg2 = useTransform(scrollY, [0, 1200], [1, 1.2]);
  const rotateBg2 = useTransform(scrollY, [0, 1200], [0, -120]);
  const opacityBg2 = useTransform(scrollY, [0, 800], [0.4, 0]); 

  const contentY = useTransform(scrollY, [0, 1000], [0, 180]);
  const contentOpacity = useTransform(scrollY, [200, 900], [1, 0]);
  
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 150], [1, 0]);
  const scrollIndicatorY = useTransform(scrollY, [0, 150], [0, 50]);

  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / innerWidth;
      const y = (e.clientY - innerHeight / 2) / innerHeight;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const moveX1 = useTransform(mouseX, (x) => x * 60);
  const moveX2 = useTransform(mouseX, (x) => x * -50);

  const textVariants: Variants = {
    hidden: { y: "110%" },
    visible: { 
      y: 0,
      transition: { 
        duration: 1.2, 
        ease: [0.19, 1.0, 0.22, 1.0] 
      }
    }
  };

  return (
    <section id="home" ref={containerRef} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-void z-0">
      {/* Abstract Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        
        {/* Blob 1 */}
        <motion.div 
          style={{ y: yBg1, rotate: rotateBg1, scale: scaleBg1, opacity: opacityBg1, x: moveX1 }} 
          className="absolute inset-0 flex items-center justify-center origin-center"
        >
          <motion.div 
            className="w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-brand-600/10 rounded-full mix-blend-screen filter blur-[100px] absolute -top-[10%] -left-[10%]"
            animate={{ 
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
        </motion.div>

        {/* Blob 2 */}
        <motion.div 
          style={{ y: yBg2, rotate: rotateBg2, scale: scaleBg2, opacity: opacityBg2, x: moveX2 }}
          className="absolute inset-0 flex items-center justify-center origin-center"
        >
          <motion.div 
            className="w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-brand-500/5 rounded-full mix-blend-screen filter blur-[80px] absolute bottom-[10%] right-[5%]"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2] 
            }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
        </motion.div>
        
        {/* Noise Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>
      
      <Container className="relative z-10 w-full pointer-events-none">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[60vh]">
            
            {/* LEFT: Main Content (7 cols) */}
            <motion.div 
              style={{ y: contentY, opacity: contentOpacity }}
              className="lg:col-span-7 flex flex-col items-start justify-center pointer-events-auto"
            >
                {/* Main Headline */}
                <h1 className="w-full font-display font-medium text-5xl md:text-7xl lg:text-8xl leading-[0.9] md:leading-[0.85] tracking-tighter text-cream mb-6">
                    <div className="overflow-hidden">
                    <motion.div initial="hidden" animate="visible" variants={textVariants} transition={{ delay: 0.1 }}>
                        THE
                    </motion.div>
                    </div>
                    <div className="overflow-hidden">
                    <motion.div 
                        initial="hidden" animate="visible" variants={textVariants} transition={{ delay: 0.2 }}
                        className="text-transparent bg-clip-text bg-gradient-to-r from-cream via-cream to-brand-500/80"
                    >
                        SPESSOLV
                    </motion.div>
                    </div>
                    <div className="overflow-hidden">
                    <motion.div initial="hidden" animate="visible" variants={textVariants} transition={{ delay: 0.3 }}>
                        STANDARD.
                    </motion.div>
                    </div>
                </h1>

                {/* Architectural Divider */}
                <div className="w-full relative h-px bg-cream/10 my-8 overflow-hidden">
                    <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-50"
                    />
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="absolute -top-3 right-0 bg-void pl-4"
                    >
                        <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
                        <span className="font-serif italic text-xs text-brand-500 tracking-wide lowercase">make it ez</span>
                        </div>
                    </motion.div>
                </div>

                {/* Subheadline & CTA */}
                <div className="w-full flex flex-col gap-8 items-start">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="text-lg md:text-xl text-cream/70 leading-relaxed font-serif max-w-xl"
                    >
                        We distill chaos into clarity. Where elite engineering meets strategic foresight to build platforms that define the future.
                    </motion.p>
                    
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 1 }}
                    >
                        <a 
                        href="#contact" 
                        className="group relative inline-flex items-center gap-4 px-10 py-5 bg-cream text-void rounded-full text-lg font-medium overflow-hidden transition-all hover:pr-12"
                        >
                        <span className="relative z-10 font-bold">Start a Project</span>
                        <div className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                            <PixelIconArrowRight />
                        </div>
                        <div className="absolute inset-0 bg-brand-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out"></div>
                        </a>
                    </motion.div>
                </div>
            </motion.div>

            {/* RIGHT: Visual Illustration (5 cols) */}
            <motion.div 
                style={{ y: contentY, opacity: contentOpacity }}
                className="lg:col-span-5 hidden lg:flex flex-col items-end justify-center pointer-events-auto relative h-[600px]"
            >
                 {/* Atmospheric Glow for Illustration */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-[80px] pointer-events-none mix-blend-screen"></div>

                 {/* Floating Cards Stack - Futuristic Composition */}
                 <div className="relative z-10 flex flex-col gap-6 transform rotate-y-12 rotate-x-6 perspective-1000">
                    {/* Card 1: Make it EZ (UI) - Cyan/Blue */}
                    <HeroCard 
                        icon={<IconHandClick />} 
                        title="Make it EZ" 
                        gradient="from-cyan-500 to-blue-600"
                        delay={0.6}
                        xOffset={0}
                    />

                    {/* Card 2: Analisis Data - Purple/Violet */}
                    <HeroCard 
                        icon={<IconChart />} 
                        title="Analisis Data" 
                        gradient="from-purple-500 to-violet-600"
                        delay={0.7}
                        xOffset={40}
                    />

                    {/* Card 3: Mempercepat Pekerjaan - Pink/Rose */}
                    <HeroCard 
                        icon={<IconRocket />} 
                        title="Mempercepat Pekerjaan" 
                        gradient="from-pink-500 to-rose-600"
                        delay={0.8}
                        xOffset={20}
                    />

                    {/* Card 4: Solusi - Blue/Indigo */}
                    <HeroCard 
                        icon={<IconPuzzle />} 
                        title="Solusi" 
                        gradient="from-blue-500 to-indigo-600"
                        delay={0.9}
                        xOffset={60}
                    />
                 </div>
            </motion.div>
        </div>
      </Container>
      
      {/* Scroll indicator */}
      <motion.div 
        style={{ opacity: scrollIndicatorOpacity, y: scrollIndicatorY }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4 pointer-events-none"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-cream/50">Scroll</span>
        <div className="text-cream/50">
            <PixelIconChevronDown />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;