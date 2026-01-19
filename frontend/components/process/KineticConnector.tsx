import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface KineticConnectorProps {
  isActive: boolean;
  isHovered: boolean;
  isEven: boolean;
}

const KineticConnector: React.FC<KineticConnectorProps> = ({ isActive, isHovered, isEven }) => {
    // Determine path state
    const isEngaged = isActive || isHovered;

    return (
        <div className={`absolute top-[2.5rem] ${isEven ? 'right-[40px] md:right-[50%]' : 'left-[40px] md:left-[50%]'} w-[80px] md:w-[120px] h-[40px] hidden sm:block overflow-visible pointer-events-none z-0`}>
            <svg 
              width="100%" 
              height="100%" 
              viewBox="0 0 120 40" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className={`${isEven ? 'scale-x-[-1]' : ''} overflow-visible`}
            >
                {/* 1. Base Structural Trace (Static) */}
                <path 
                    d="M0 20 H120" 
                    stroke="rgba(255,255,255,0.03)" 
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                />

                {/* 2. Soft Ambient Afterglow (Visible on hover or active) */}
                <motion.path 
                    d="M0 20 H120" 
                    stroke="url(#energyGradient)" 
                    strokeWidth="4"
                    strokeLinecap="round"
                    animate={{ 
                        opacity: isActive ? 0.4 : (isHovered ? 0.15 : 0),
                        scaleY: isActive ? 1.5 : 1
                    }}
                    transition={{ duration: 0.4 }}
                    className="blur-[4px]"
                />

                {/* 3. Primary Energy Surge (The "Wipe") */}
                <motion.path 
                    d="M0 20 H120" 
                    stroke="url(#energyGradient)" 
                    strokeWidth={isActive ? 2.5 : 1.5}
                    strokeLinecap="round"
                    strokeDasharray="120"
                    initial={{ strokeDashoffset: 120 }}
                    animate={{ 
                        strokeDashoffset: isEngaged ? 0 : 120,
                        opacity: isEngaged ? 1 : 0
                    }}
                    transition={{ 
                      duration: 0.5, 
                      ease: [0.22, 1, 0.36, 1], // Liquid cubic bezier
                    }}
                    vectorEffect="non-scaling-stroke"
                />

                {/* 4. Travelling Spark Pulse (Only when active) */}
                <AnimatePresence>
                  {isActive && (
                    <motion.path 
                      d="M0 20 H120"
                      stroke="rgba(255,255,255,0.9)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray="8, 112"
                      initial={{ strokeDashoffset: 120, opacity: 0 }}
                      animate={{ 
                        strokeDashoffset: -120, 
                        opacity: [0, 1, 0] 
                      }}
                      transition={{ 
                        duration: 1.8, 
                        repeat: Infinity, 
                        ease: "linear" 
                      }}
                      className="drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                    />
                  )}
                </AnimatePresence>
            </svg>
        </div>
    );
}

export default KineticConnector;