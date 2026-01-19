import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../ProjectsPage';

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

const PixelIconArrowUpRight = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 6h10v10h-2V8h-2v2h-2v2h-2v2H8v-2h2v-2h2V8H8V6z"/>
  </svg>
);

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onClick }) => {
  // Determine if it should be wide based on index for the home page (1 and 4 are full)
  const isFull = index === 0 || index === 3;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      onClick={onClick}
      className={`relative group overflow-hidden rounded-2xl cursor-pointer ${
        isFull ? 'md:col-span-2 aspect-[16/9] md:aspect-[21/9]' : 'md:col-span-1 aspect-[4/3]'
      }`}
    >
      {/* Background Image with Zoom Effect */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80"></div>
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
        
        {/* Top Right Arrow Trigger */}
        <div className="absolute top-6 right-6 md:top-10 md:right-10 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-white hover:bg-white hover:text-black transition-colors">
            <PixelIconArrowUpRight />
          </div>
        </div>

        <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
          {/* Category Tag */}
          <div className="flex items-center gap-3 mb-3">
             <span className="text-brand-500 text-xs font-bold uppercase tracking-widest">{project.category}</span>
             <div className="h-[1px] w-8 bg-brand-500/50"></div>
          </div>

          {/* Title */}
          <h3 className={`font-display font-medium text-white mb-2 ${isFull ? 'text-3xl md:text-5xl' : 'text-2xl md:text-4xl'}`}>
            {project.title}
          </h3>

          {/* Impact Text Reveal */}
          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out">
            <div className="overflow-hidden">
              <div className="pt-4 flex flex-col md:flex-row md:items-end gap-6 justify-between border-t border-white/20 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                <p className="text-gray-300 text-sm md:text-base max-w-md leading-relaxed">
                  {project.description}
                </p>
                
                {project.impact && (
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Impact</span>
                    <span className="text-2xl font-display text-white">{project.impact}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;