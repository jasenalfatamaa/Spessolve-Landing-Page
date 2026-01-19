import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Randomize speed for a more organic feel
        const diff = Math.random() * 10;
        return Math.min(prev + diff, 100);
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        onComplete();
      }, 800);
    }
  }, [progress, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-void flex items-center justify-center"
      initial={{ y: 0 }}
      exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="w-full max-w-md px-6">
        <div className="flex justify-between items-end mb-4">
          <motion.span 
            className="font-display text-2xl font-bold tracking-tighter text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            SPESSOLV<span className="text-brand-500">.</span>
          </motion.span>
          <span className="font-mono text-xs text-brand-500">
            {Math.round(progress)}%
          </span>
        </div>
        
        <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-brand-500"
            style={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
        
        <div className="mt-4 flex justify-between text-[10px] tracking-widest text-gray-600">
          <span className="uppercase">Loading Experience</span>
          <span className="lowercase text-brand-500/80 font-medium">make it ez</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Preloader;