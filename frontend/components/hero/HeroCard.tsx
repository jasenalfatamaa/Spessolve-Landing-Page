import React from 'react';
import { motion } from 'framer-motion';

interface HeroCardProps {
  icon: React.ReactNode;
  title: string;
  gradient: string;
  delay: number;
  xOffset: number;
}

const HeroCard: React.FC<HeroCardProps> = ({ icon, title, gradient, delay, xOffset }) => (
    <motion.div
        initial={{ opacity: 0, x: 50, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
        className="relative group"
        style={{ marginLeft: `${xOffset}px` }}
    >
        {/* Continuous Floating Animation */}
        <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: delay * 2 }}
            className="relative flex items-center gap-5 p-4 pr-10 rounded-2xl border border-white/5 bg-[#0f0f1a]/90 backdrop-blur-xl shadow-2xl overflow-hidden min-w-[260px]"
        >
             {/* Neon Glow Border Effect on Hover */}
             <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/5"></div>
             
             {/* Bottom Line Accent */}
             <div className={`absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r ${gradient} opacity-80`}></div>

             {/* Icon Box */}
             <div className={`relative p-3 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-[0_0_20px_rgba(0,0,0,0.3)] z-10`}>
                {icon}
                {/* Internal glow */}
                <div className="absolute inset-0 rounded-xl bg-white/20 blur-md opacity-50 mix-blend-overlay"></div>
             </div>
             
             {/* Text */}
             <div className="z-10 flex flex-col">
                <h4 className="text-white font-sans text-base font-bold tracking-wide">{title}</h4>
             </div>
             
             {/* Background Sheen */}
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>
        </motion.div>
    </motion.div>
);

export default HeroCard;