import React from 'react';
import { motion } from 'framer-motion';

interface TechIconProps {
  tech: {
    name: string;
    slug: string;
    icon: React.ReactNode;
  };
  index: number;
}

const TechIcon: React.FC<TechIconProps> = ({ tech, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        delay: index * 0.08, 
        type: "spring", 
        stiffness: 150, 
        damping: 15 
      }}
      whileHover={{ 
        scale: 1.1, 
        y: -10,
        transition: { duration: 0.3 }
      }}
      className="group relative"
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.5
        }}
        className="absolute inset-0 bg-brand-500 rounded-2xl blur-3xl pointer-events-none group-hover:opacity-40 transition-opacity duration-500"
      />

      <div className="relative p-5 md:p-6 bg-surface/60 border border-white/10 rounded-[1.5rem] backdrop-blur-xl flex items-center justify-center w-18 h-18 md:w-24 md:h-24 shadow-2xl transition-all duration-500 group-hover:border-brand-500/50 group-hover:shadow-[0_20px_40px_-15px_rgba(133,169,71,0.4)] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/0 via-brand-500/0 to-brand-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10 w-8 h-8 md:w-10 md:h-10 transition-all duration-500 transform group-hover:scale-110 filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100">
          {tech.icon}
        </div>
      </div>

      <div className="absolute -top-14 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-none z-50">
        <div className="px-4 py-2 bg-void border border-brand-500/20 rounded-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] backdrop-blur-md">
           <span className="text-[10px] font-bold text-brand-500 uppercase tracking-[0.2em] whitespace-nowrap">
             {tech.name}
           </span>
           <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-void border-r border-b border-brand-500/20 rotate-45 -mt-1"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default TechIcon;