import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface ServiceCardProps {
  service: Service;
  index: number;
}

const PixelIconArrowRight = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 6h2v2h2v2h2v4h-2v2h-2v2h-2v-2h2v-2h-2v-2H6v-2h10V8h-2V6z" />
  </svg>
);

const PixelIconArrowUpRight = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 6h10v10h-2V8h-2v2h-2v2h-2v2H8v-2h2v-2h2V8H8V6z" />
  </svg>
);

const PixelIconCommand = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4h4v4H4V4zm12 0h4v4h-4V4zm0 12h4v4h-4v-4zM4 16h4v4H4v-4z M10 4h4v16h-4V4z M4 10h16v4H4v-4z" />
  </svg>
);

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => setOpacity(1);
  const handleBlur = () => setOpacity(0);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleFocus}
      onMouseLeave={handleBlur}
      className="group relative h-[400px] perspective-1000"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="w-full h-full relative transition-all duration-700"
        initial={false}
        whileHover={{ rotateY: 180 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }} // Cubic bezier for premium feel
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* FRONT FACE */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl border border-white/10 bg-surface/50 backdrop-blur-sm p-8 flex flex-col justify-between overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Spotlight Effect */}
          <div
            className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
            style={{
              opacity,
              background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(133, 169, 71, 0.15), transparent 40%)`,
            }}
          />

          {/* Content */}
          <div className="relative z-10">
            <div className="p-4 bg-white/5 rounded-2xl text-brand-500 w-fit mb-8 group-hover:bg-brand-500 group-hover:text-void transition-colors duration-500">
              {service.icon}
            </div>
            <h3 className="text-3xl font-display font-medium text-white max-w-[80%] leading-tight">
              {service.title}
            </h3>
          </div>

          <div className="relative z-10 flex items-center justify-between mt-auto">
            <div className="h-[1px] w-full bg-white/10 mr-4 group-hover:bg-brand-500/50 transition-colors duration-500"></div>
            <div className="p-2 rounded-full border border-white/10 text-gray-400 group-hover:border-brand-500 group-hover:text-brand-500 transition-colors duration-500">
              <PixelIconArrowRight />
            </div>
          </div>
        </div>

        {/* BACK FACE */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl border border-brand-500/50 bg-void p-8 flex flex-col justify-center overflow-hidden shadow-[0_0_50px_-12px_rgba(133,169,71,0.2)]"
          style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
        >
          {/* Inner Glow */}
          <div className="absolute inset-0 bg-brand-500/5 mix-blend-overlay"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-brand-500">{service.icon}</span>
              <h3 className="text-xl font-display font-bold text-white leading-tight">
                {service.title}
              </h3>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              {service.description}
            </p>
          </div>

          {/* Decorative Corner */}
          <div className="absolute bottom-0 right-0 p-8 opacity-10 text-brand-500">
            <PixelIconCommand />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ServiceCard;