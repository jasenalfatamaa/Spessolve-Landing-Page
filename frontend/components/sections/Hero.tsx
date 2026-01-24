import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, Variants } from 'framer-motion';
import Container from '../ui/Container';
import HeroCard from '../hero/HeroCard';

// --- Professional Pixel-Style Icons for Hero Cards ---

const PixelIconEasy = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 11h2v2h2v2h2v-2h2v-2h2V9h-2V7h-2v2h-2v2H9V9H7v2zM5 5h14v2H5V5zm0 12h14v2H5v-2z" />
  </svg>
);

const PixelIconData = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 16h4v4H4v-4zm6-6h4v10h-4V10zm6-6h4v16h-4V4z" />
  </svg>
);

const PixelIconSpeed = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 2h2v2h2v2h2v2h-2v2h-2v2h2v2h-2v2h-2v2h-2v2h-2v-2h-2v-2H7v-2H5v-2h2v-2h2V8h2V6h2V4h2V2z" />
  </svg>
);

const PixelIconSolution = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 4h4v4H4V4zm12 0h4v4h-4V4zm-6 6h4v4h-4v-4zm-6 6h4v4H4v-4zm12 0h4v4h-4v-4z" />
  </svg>
);

const PixelIconArrowRight = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 6h2v2h2v2h2v4h-2v2h-2v2h-2v-2h2v-2h-2v-2H6v-2h10V8h-2V6z" />
  </svg>
);

const SimpleArrowDown = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

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
    <section id="home" ref={containerRef} className="relative min-h-screen flex items-center justify-center pt-28 md:pt-36 pb-20 md:pb-32 overflow-hidden bg-void z-0">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: yBg1, rotate: rotateBg1, scale: scaleBg1, opacity: opacityBg1, x: moveX1 }}
          className="absolute inset-0 flex items-center justify-center origin-center"
        >
          <motion.div
            className="w-[70vw] h-[70vw] md:w-[50vw] md:h-[50vw] max-w-[800px] max-h-[800px] bg-brand-600/10 rounded-full mix-blend-screen filter blur-[60px] md:blur-[100px] absolute -top-[10%] -left-[10%]"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
        </motion.div>

        <motion.div
          style={{ y: yBg2, rotate: rotateBg2, scale: scaleBg2, opacity: opacityBg2, x: moveX2 }}
          className="absolute inset-0 flex items-center justify-center origin-center"
        >
          <motion.div
            className="w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] max-w-[600px] max-h-[600px] bg-brand-500/5 rounded-full mix-blend-screen filter blur-[50px] md:blur-[80px] absolute bottom-[10%] right-[5%]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
        </motion.div>

        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <Container className="relative z-10 w-full pointer-events-none">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start lg:items-center min-h-[70vh]">
          <motion.div
            style={{ y: contentY, opacity: contentOpacity }}
            className="lg:col-span-7 flex flex-col items-start justify-center pointer-events-auto text-left"
          >
            <h1 className="w-full font-display font-medium text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1] md:leading-[0.85] tracking-tighter text-cream mb-6">
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
                  SPESSOLVE
                </motion.div>
              </div>
              <div className="overflow-hidden">
                <motion.div initial="hidden" animate="visible" variants={textVariants} transition={{ delay: 0.3 }}>
                  STANDARD.
                </motion.div>
              </div>
            </h1>

            <div className="w-full relative h-px bg-cream/10 my-6 md:my-8 overflow-hidden">
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
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-brand-500 animate-pulse"></div>
                  <span className="font-serif italic text-[10px] md:text-xs text-brand-500 tracking-wide lowercase">make it ez</span>
                </div>
              </motion.div>
            </div>

            <div className="w-full flex flex-col gap-6 md:gap-8 items-start">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-base md:text-xl text-cream/70 leading-relaxed font-serif max-w-xl"
              >
                We transform complexity into EZ Solutions through a structured, efficient, and user-friendly technology approach to support business needs.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="w-full sm:w-auto"
              >
                <a
                  href="#contact"
                  className="group relative inline-flex items-center justify-center gap-4 w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-cream text-void rounded-full text-base md:text-lg font-medium overflow-hidden transition-all hover:pr-12"
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

          {/* Right Side Cards Container - Optimized for mobile visibility */}
          <motion.div
            style={{ y: contentY, opacity: contentOpacity }}
            className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center pointer-events-auto relative min-h-[400px] md:min-h-[500px] lg:h-[600px] mt-16 lg:mt-0 w-full"
          >
            {/* Glowing Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] aspect-square bg-gradient-to-tr from-brand-500/20 via-brand-600/10 to-brand-700/5 rounded-full blur-[70px] md:blur-[100px] pointer-events-none mix-blend-screen"></div>

            <div className="relative z-10 flex flex-col gap-5 md:gap-7 transform lg:rotate-y-12 lg:rotate-x-6 perspective-1000 w-full max-w-md lg:max-w-none items-center lg:items-end px-4 md:px-0">
              <HeroCard
                icon={<PixelIconEasy />}
                title="Make it EZ"
                gradient="from-brand-500 to-brand-300"
                delay={0.6}
                xOffset={0}
              />

              <HeroCard
                icon={<PixelIconData />}
                title="Data Analysis"
                gradient="from-muted to-brand-700"
                delay={0.7}
                xOffset={30}
              />

              <HeroCard
                icon={<PixelIconSpeed />}
                title="Optimization"
                gradient="from-brand-400 to-brand-600"
                delay={0.8}
                xOffset={15}
              />

              <HeroCard
                icon={<PixelIconSolution />}
                title="Solution"
                gradient="from-cream/60 to-brand-500"
                delay={0.9}
                xOffset={45}
              />
            </div>
          </motion.div>
        </div>
      </Container>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 md:gap-4 pointer-events-none"
      >
        <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-cream/50">Scroll</span>
        <div className="text-cream/50">
          <SimpleArrowDown />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;