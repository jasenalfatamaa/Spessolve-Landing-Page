import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';

interface ProjectsPageProps {
  onBack: () => void;
}

// --- Icons ---

const PixelIconArrowLeft = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 6H8v2H6v2H4v4h2v2h2v2h2v-2H8v-2h2v-2h8v-2h-8V8h2V6z"/>
  </svg>
);

const PixelIconArrowUpRight = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 6h10v10h-2V8h-2v2h-2v2h-2v2H8v-2h2v-2h2V8H8V6z"/>
  </svg>
);

const PixelIconClose = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 5h2v2h2v2h2v2h2V9h2V7h2v2h-2v2h-2v2h2v2h2v2h-2v-2h-2v-2h-2v2H9v2H7v-2H5v-2h2v-2H5V5z"/>
  </svg>
);

// --- Data ---

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  testimonial?: string;
  clientRole?: string;
  impact?: string;
  year: string;
  image: string;
}

export const allProjects: Project[] = [
  {
    id: 1,
    title: 'Nebula Finance',
    category: 'Fintech / Web3',
    description: 'High-frequency trading engine processing $2.4B in volume.',
    fullDescription: "Nebula needed a trading engine capable of handling institutional-grade volume without the latency typical of decentralized exchanges. We engineered a hybrid off-chain matching engine with on-chain settlement, reducing trade execution time by 94%. The system architecture was designed to be fault-tolerant, ensuring 99.99% uptime during periods of extreme market volatility.",
    technologies: ["Rust", "Solana", "React", "Node.js", "WebSockets"],
    testimonial: "SPESSOLV didn't just build a platform; they built the backbone of our entire operation. Their engineering rigor is unmatched in the Web3 space.",
    clientRole: "CTO, Nebula Finance",
    impact: "$2.4B Volume",
    year: "2023",
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Velocite',
    category: 'Automotive',
    description: 'WebGL-powered 3D configurator for luxury EVs.',
    fullDescription: "For Velocite's flagship EV launch, we created a browser-based 3D configurator that pushes the limits of WebGL. Users can customize every aspect of the vehicle in real-time with ray-traced lighting and physically based rendering (PBR) materials. The experience loads in under 2 seconds on mobile devices.",
    technologies: ["Three.js", "WebGL", "Vue.js", "AWS"],
    testimonial: "The visual fidelity SPESSOLV achieved in a web browser is simply impossible. They turned our website into our best showroom.",
    clientRole: "VP Marketing, Velocite",
    impact: "+200% Leads",
    year: "2023",
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2670&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Aura Health',
    category: 'Wellness',
    description: 'Bio-feedback algorithms serving 1M+ daily users.',
    fullDescription: "Aura Health required a personalized recommendation engine that could adapt to user biometrics in real-time. We developed proprietary algorithms analyzing heart rate variability (HRV) and sleep patterns to curate custom wellness content.",
    technologies: ["Python", "TensorFlow", "React Native", "GCP"],
    impact: "1M+ Daily Users",
    year: "2022",
    image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=2670&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Orbital AI',
    category: 'Enterprise SaaS',
    description: 'Data visualization suite reducing operational costs by 30%.',
    fullDescription: "We transformed petabytes of complex logistics data into an intuitive visual command center. Orbital AI allows supply chain managers to predict bottlenecks before they happen, reducing operational costs by 30% through real-time foresight.",
    technologies: ["D3.js", "WebGL", "Angular", "Go"],
    testimonial: "Complex data became clear actionable insight. SPESSOLV's design thinking saved us millions in the first quarter alone.",
    clientRole: "Director of Ops, Orbital",
    impact: "-30% OpEx",
    year: "2022",
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Kinetic',
    category: 'Sports Tech',
    description: 'Real-time biomechanics tracking for Olympic athletes.',
    fullDescription: "Working with elite coaches, we built a computer vision system that analyzes athlete movement from standard video feeds. The system provides biomechanical feedback on joint angles and velocity in real-time.",
    technologies: ["Computer Vision", "Python", "iOS", "CoreML"],
    impact: "98% Accuracy",
    year: "2024",
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2670&auto=format&fit=crop',
  },
  {
    id: 6,
    title: 'Vanguard',
    category: 'Cybersecurity',
    description: 'Zero-trust architecture for government defense systems.',
    fullDescription: "Security without compromise. We architected a zero-trust communication protocol for Vanguard's defense clients utilizing end-to-end encryption with ephemeral keys.",
    technologies: ["Rust", "C++", "Assembly", "Linux"],
    impact: "Grade A Sec",
    year: "2021",
    image: 'https://images.unsplash.com/photo-1558494949-ef526b01201b?q=80&w=2670&auto=format&fit=crop',
  }
];

// --- Components ---

export const ProjectModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        delay: 0.2 + i * 0.1,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
      }
    })
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-0 md:p-8">
      {/* Immersive Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        onClick={onClose}
        className="absolute inset-0 bg-void/90 backdrop-blur-2xl cursor-pointer"
      />

      {/* Architectural Modal Container */}
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full h-full md:max-w-6xl md:h-auto md:max-h-[90vh] bg-surface border-0 md:border md:border-white/10 rounded-none md:rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] flex flex-col md:flex-row transform-gpu"
      >
        {/* Close Interaction */}
        <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-50 w-12 h-12 bg-void/50 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10 hover:bg-brand-500 hover:text-void transition-all duration-300 active:scale-90"
        >
            <PixelIconClose />
        </button>

        {/* VISUAL PANE (Left) */}
        <div className="relative w-full md:w-1/2 h-[45vh] md:h-auto overflow-hidden">
            <motion.img 
                initial={{ scale: 1.2, filter: 'grayscale(1)' }}
                animate={{ scale: 1, filter: 'grayscale(0)' }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-surface via-surface/10 to-transparent"></div>
            
            <div className="absolute bottom-10 left-8 md:left-12 max-w-sm">
                 <motion.div 
                    custom={0} variants={contentVariants} initial="hidden" animate="visible"
                    className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-brand-500/30 bg-brand-500/10 backdrop-blur-md"
                 >
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse"></div>
                    <span className="text-brand-500 text-[10px] font-bold uppercase tracking-[0.2em]">{project.category}</span>
                 </motion.div>
                 
                 <motion.h2 
                    custom={1} variants={contentVariants} initial="hidden" animate="visible"
                    className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tighter leading-[0.9] mb-4"
                 >
                    {project.title}
                 </motion.h2>

                 <motion.div 
                    custom={2} variants={contentVariants} initial="hidden" animate="visible"
                    className="flex items-center gap-8 mt-6"
                 >
                    <div>
                        <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Impact</p>
                        <p className="text-xl font-display text-brand-500">{project.impact || 'N/A'}</p>
                    </div>
                    <div className="w-px h-8 bg-white/10"></div>
                    <div>
                        <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Timeline</p>
                        <p className="text-xl font-display text-white">{project.year}</p>
                    </div>
                 </motion.div>
            </div>
        </div>

        {/* NARRATIVE PANE (Right) */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center overflow-y-auto no-scrollbar bg-surface/50 backdrop-blur-lg">
            <div className="max-w-md">
                <motion.div custom={3} variants={contentVariants} initial="hidden" animate="visible" className="mb-10">
                    <h4 className="font-mono text-[10px] text-brand-500 uppercase tracking-[0.4em] mb-4">The Narrative</h4>
                    <p className="text-gray-300 text-base md:text-lg leading-relaxed font-light">
                        {project.fullDescription}
                    </p>
                </motion.div>

                {project.testimonial && (
                    <motion.div 
                        custom={4} variants={contentVariants} initial="hidden" animate="visible"
                        className="mb-10 relative p-6 md:p-8 rounded-2xl bg-void border border-white/5 shadow-inner"
                    >
                        <blockquote className="font-serif italic text-base md:text-lg text-cream/90 leading-relaxed mb-6">
                           "{project.testimonial}"
                        </blockquote>
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-px bg-brand-500"></div>
                            <span className="font-sans text-xs uppercase tracking-widest text-gray-500 font-bold">
                                {project.clientRole}
                            </span>
                        </div>
                    </motion.div>
                )}

                <motion.div custom={5} variants={contentVariants} initial="hidden" animate="visible" className="mb-10">
                    <h4 className="font-mono text-[10px] text-brand-500 uppercase tracking-[0.4em] mb-6">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                            <span key={tech} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] text-gray-400 font-mono tracking-wider hover:border-brand-500/50 hover:text-brand-500 transition-all duration-300 cursor-default">
                                {tech}
                            </span>
                        ))}
                    </div>
                </motion.div>

                <motion.div custom={6} variants={contentVariants} initial="hidden" animate="visible">
                    <button className="group relative w-full py-5 bg-brand-500 text-void font-bold uppercase tracking-[0.3em] text-[10px] rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(133,169,71,0.3)] active:scale-[0.98]">
                        <span className="relative z-10 flex items-center justify-center gap-3">
                            Explore Technical Docs <PixelIconArrowUpRight />
                        </span>
                        <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                    </button>
                </motion.div>
            </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- Main Page ---

const ProjectsPage: React.FC<ProjectsPageProps> = ({ onBack }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="bg-void min-h-screen pt-32 pb-20 relative overflow-x-hidden">
      <Container>
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-cream/60 hover:text-brand-500 transition-colors mb-12 focus:outline-none"
        >
          <div className="transition-transform group-hover:-translate-x-1">
             <PixelIconArrowLeft />
          </div>
          <span className="text-sm uppercase tracking-widest font-serif">Back to Home</span>
        </button>

        <SectionHeading title="All Projects" subtitle="Dossier" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-16">
          {allProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-6 bg-surface border border-white/5 transform-gpu shadow-xl">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-void/10 group-hover:bg-void/40 transition-colors duration-700" />
                
                {/* Visual indicator of detail availability */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.2em] translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        View Dossier
                    </div>
                </div>

                <div className="absolute top-4 right-4 w-10 h-10 bg-void/50 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                   <div className="text-brand-500">
                      <PixelIconArrowUpRight />
                   </div>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-display font-medium text-cream mb-2 group-hover:text-brand-500 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-cream/60 text-sm leading-relaxed max-w-sm">
                    {project.description}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] font-mono text-brand-500 uppercase tracking-widest font-bold">
                        {project.category}
                    </span>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                        {project.year}
                    </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>

      <AnimatePresence>
        {selectedProject && (
            <ProjectModal 
                project={selectedProject} 
                onClose={() => setSelectedProject(null)} 
            />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsPage;