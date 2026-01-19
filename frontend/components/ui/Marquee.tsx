import React from 'react';
import { motion } from 'framer-motion';

const Marquee: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden bg-void py-12 md:py-20 border-t border-b border-white/5 flex items-center select-none">
      {/* Gradient fade masks for elegance */}
      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-void to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-void to-transparent z-10"></div>

      <div className="flex whitespace-nowrap">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-12 md:gap-24 opacity-20"
        >
          {/* Duplicated content for seamless loop */}
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              <div className="flex items-center gap-12 md:gap-24">
                <span className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.5)]">
                  MAKE IT EZ
                </span>
                <div className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-brand-500/50"></div>
              </div>
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Marquee;