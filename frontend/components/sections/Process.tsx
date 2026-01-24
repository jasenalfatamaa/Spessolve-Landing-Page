import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from 'framer-motion';
import Container from '../ui/Container';
import {
  IconQuill,
  PixelIconChevronDown,
  IconReact,
  IconTS,
  IconNext,
  IconTailwind,
  IconNode,
  IconPython,
  IconPostgres,
  IconDocker,
  IconVite,
  IconVitest,
  IconFastAPI,
  IconFlask,
  IconGitHub
} from '../process/ProcessIcons';
import TechIcon from '../process/TechIcon';
import FlowStep from '../process/FlowStep';

// --- Data ---
const steps = [
  { id: '01', title: 'The Prologue', subtitle: 'Discovery & Analysis', description: 'Every great story begins with understanding the setting. We immerse ourselves in your ecosystem to map out latency, bottlenecks, and growth vectors. No assumptions—only truth.' },
  { id: '02', title: 'The Blueprint', subtitle: 'Architecture & Strategy', description: 'We define a clear system structure and development strategy, including the selected technologies and user workflows.' },
  { id: '03', title: 'The Draft', subtitle: 'Prototyping & UX', description: 'Visualizing the characters. We render high-fidelity interactive models. This phase validates the experience before we commit to the final manuscript.' },
  { id: '04', title: 'The Creation', subtitle: 'Development & Build', description: 'Bringing the story to life. We deploy robust, scalable code using atomic design principles. Our engineers write self-documenting systems designed for the long haul.' },
  { id: '05', title: 'The Release', subtitle: 'Launch & Optimization', description: 'The grand premiere. We monitor real-time metrics, iterate based on audience feedback, and ensure your platform performs flawlessly on the world stage.' },
];

const technologies = [
  { name: "React", slug: "react", icon: <IconReact /> },
  { name: "TypeScript", slug: "typescript", icon: <IconTS /> },
  { name: "Next.js", slug: "nextdotjs", icon: <IconNext /> },
  { name: "Tailwind", slug: "tailwindcss", icon: <IconTailwind /> },
  { name: "Node.js", slug: "nodedotjs", icon: <IconNode /> },
  { name: "Python", slug: "python", icon: <IconPython /> },
  { name: "PostgreSQL", slug: "postgresql", icon: <IconPostgres /> },
  { name: "Docker", slug: "docker", icon: <IconDocker /> },
  { name: "Vite", slug: "vite", icon: <IconVite /> },
  { name: "Vitest", slug: "vitest", icon: <IconVitest /> },
  { name: "FastAPI", slug: "fastapi", icon: <IconFastAPI /> },
  { name: "Flask", slug: "flask", icon: <IconFlask /> },
  { name: "GitHub", slug: "github", icon: <IconGitHub /> }
];

const Process: React.FC = () => {
  const [activeStepId, setActiveStepId] = useState('01');
  const [visibleSteps, setVisibleSteps] = useState<Set<string>>(new Set());
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollLock = useRef(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", () => {
    if (!isScrolling) setIsScrolling(true);
    if (scrollTimeout.current) window.clearTimeout(scrollTimeout.current);
    scrollTimeout.current = window.setTimeout(() => {
      setIsScrolling(false);
    }, 150);
  });

  // Handler untuk mengupdate set visibleSteps dari child components
  const handleVisibilityChange = useCallback((id: string, isVisible: boolean) => {
    setVisibleSteps(prev => {
      const newSet = new Set(prev);
      if (isVisible) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return newSet;
    });
  }, []);

  // Logic Utama: Tentukan Active Step berdasarkan Priority
  // Logic Utama: Tentukan Active Step berdasarkan Priority
  useEffect(() => {
    // Jika sedang di-lock oleh manual click atau sedang scrolling, jangan ubah otomatis untuk mencegah layout shift
    if (scrollLock.current || isScrolling) return;

    // Ambil daftar step yang sedang terlihat
    const visibleArray = Array.from(visibleSteps).sort();

    // Rule:
    // 1. Jika hanya 1 yang terlihat, dia yang aktif.
    // 2. Jika > 1 yang terlihat, yang "paling atas" (urutan ID terkecil) yang aktif.
    if (visibleArray.length > 0) {
      const topMostVisibleStep = visibleArray[0];
      setActiveStepId(prev => prev !== topMostVisibleStep ? topMostVisibleStep : prev);
    }
  }, [visibleSteps, isScrolling]);

  const handleManualActivate = useCallback((id: string) => {
    setActiveStepId(id);
    scrollLock.current = true;
    const element = document.getElementById(`process-step-${id}`);
    if (element) {
      const viewportCenter = window.innerHeight / 2;
      const elementRect = element.getBoundingClientRect();
      const elementTop = elementRect.top + window.pageYOffset;
      const targetY = elementTop - viewportCenter + 60;

      window.scrollTo({ top: targetY, behavior: 'smooth' });

      setTimeout(() => {
        scrollLock.current = false;
      }, 800);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const dotY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="process"
      className={`bg-void relative overflow-hidden py-32 border-t border-white/5 transition-opacity duration-300`}
    >
      {/* Global SVG Definitions */}
      <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
        <defs>
          <linearGradient id="energyGradient" x1="0" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#85A947" />
            <stop offset="1" stopColor="#3E7B27" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute inset-0 bg-gradient-to-b from-void via-surface to-void opacity-90 pointer-events-none"></div>

      <Container className="mb-32 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8 text-brand-500"
          >
            <IconQuill />
            <span className="font-sans text-xs font-bold uppercase tracking-[0.4em]">Methodology</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-5xl md:text-7xl font-medium text-white mb-8 tracking-tight"
          >
            Workflow <span className="italic text-brand-500">Distilled.</span>
          </motion.h2>

          {/* New Scroll to Explore text with delayed animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.2, // 0.2s after the tagline fades in
              duration: 0.6,
              ease: "easeOut"
            }}
            className="flex flex-col items-center gap-2 mb-16"
          >
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-cream/40">
              Scroll to Explore
            </span>
            <div className="text-brand-500/40 animate-bounce">
              <PixelIconChevronDown />
            </div>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-10 max-w-5xl px-4">
            {technologies.map((tech, i) => (
              <TechIcon key={tech.slug} tech={tech} index={i} />
            ))}
          </div>
        </div>
      </Container>

      <Container className="relative">
        <div ref={containerRef} className="relative pt-12 pb-40">
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/5 md:-translate-x-1/2 z-0"></div>

          <motion.div
            className="absolute left-5 md:left-1/2 top-0 w-[1px] bg-brand-500 md:-translate-x-1/2 z-0 origin-top shadow-[0_0_20px_#85A947]"
            style={{ height: "100%", scaleY: scaleY }}
          />

          <motion.div
            className="absolute left-5 md:left-1/2 top-0 w-3 h-3 rounded-full bg-brand-500 md:-translate-x-1/2 z-20 shadow-[0_0_15px_#85A947]"
            style={{ top: dotY }}
          >
            <div className="absolute inset-0 rounded-full bg-brand-500 animate-ping opacity-50"></div>
          </motion.div>

          <div className="relative z-10 flex flex-col">
            {steps.map((step, index) => (
              <FlowStep
                key={step.id}
                step={step}
                index={index}
                isEven={index % 2 === 0}
                isLast={index === steps.length - 1}
                isActive={activeStepId === step.id}
                isScrolling={isScrolling}
                onActivate={handleManualActivate}
                onVisibilityChange={handleVisibilityChange}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Process;