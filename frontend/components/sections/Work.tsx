import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import { allProjects, ProjectModal, Project } from '../ProjectsPage';
import ProjectCard from '../work/ProjectCard';

interface WorkProps {
  onViewAll?: () => void;
}

const PixelIconArrowUpRight = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 6h10v10h-2V8h-2v2h-2v2h-2v2H8v-2h2v-2h2V8H8V6z"/>
  </svg>
);

const Work: React.FC<WorkProps> = ({ onViewAll }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Take first 4 projects for Home page display
  const featuredProjects = allProjects.slice(0, 4);

  return (
    <section id="work" className="py-32 bg-surface">
      <Container>
        <SectionHeading 
          subtitle="Selected Work" 
          title="Engineered for impact." 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-16">
          {featuredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <button 
            onClick={onViewAll}
            className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-gray-400 hover:text-brand-500 transition-colors group"
          >
            View Full Portfolio 
            <div className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                <PixelIconArrowUpRight />
            </div>
          </button>
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
    </section>
  );
};

export default Work;