import React from 'react';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import ServiceCard from '../services/ServiceCard';

const PixelIconMonitor = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 4h20v12H2V4zm2 2v8h16V6H4zm4 14h8v2H8v-2z"/>
  </svg>
);

const PixelIconPhone = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 2h12v20H6V2zm2 2v14h8V4H8zm2 16h4v-2h-4v2z"/>
  </svg>
);

const PixelIconLayers = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 4h20v4H2V4zm2 2v2h16V6H4zm-2 6h20v4H2v-4zm2 2v2h16v-2H4zm-2 6h20v4H2v-4zm2 2v2h16v-2H4z"/>
  </svg>
);

const PixelIconCommand = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
     <path d="M4 4h4v4H4V4zm12 0h4v4h-4V4zm0 12h4v4h-4v-4zM4 16h4v4H4v-4z M10 4h4v16h-4V4z M4 10h16v4H4v-4z"/>
  </svg>
);

const services = [
  {
    icon: <PixelIconMonitor />,
    title: 'Immersive Experience Design',
    description: 'We don\'t just design screens; we choreograph interactions. By fusing behavioral psychology with high-fidelity motion, we create products that feel like an extension of the user.'
  },
  {
    icon: <PixelIconPhone />,
    title: 'High-Velocity Engineering',
    description: 'Code that moves at the speed of thought. We utilize next-gen frameworks to build web and mobile applications that offer native-level performance and instant responsiveness.'
  },
  {
    icon: <PixelIconLayers />,
    title: 'Enterprise Ecosystems',
    description: 'Robust architecture for complex demands. We build secure, scalable SaaS platforms capable of processing massive data loads while maintaining zero-latency reliability.'
  },
  {
    icon: <PixelIconCommand />,
    title: 'Brand Architecture',
    description: 'Strategy that visualizes the future. We decode market signals to construct a visual and verbal identity that positions your brand as the undisputed category leader.'
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-32 bg-void relative overflow-hidden">
      
      {/* Structural Typographic Accent */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-90 hidden lg:flex items-center gap-4 opacity-10 pointer-events-none">
        <div className="w-24 h-[1px] bg-white"></div>
        <span className="font-mono text-sm tracking-[0.5em] text-white whitespace-nowrap uppercase">
          system operational // make it ez
        </span>
        <div className="w-24 h-[1px] bg-white"></div>
      </div>

      <Container>
        <SectionHeading 
          subtitle="Capabilities" 
          title="Digital Architecture" 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Services;