import React from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';

const clients = [
  { name: "Acme Corp", industry: "Fintech" },
  { name: "GlobalTech", industry: "SaaS" },
  { name: "Nebula", industry: "Aerospace" },
  { name: "Velocity", industry: "Automotive" },
  { name: "Circle", industry: "Web3" },
  { name: "FoxRun", industry: "Venture Capital" },
  { name: "Starlight", industry: "Media" },
  { name: "Onyx", industry: "Luxury" },
  { name: "Apex", industry: "Health" },
  { name: "Zenith", industry: "Logistics" },
  { name: "Horizon", industry: "Energy" },
  { name: "Vertex", industry: "AI" }
];

const Clients: React.FC = () => {
  return (
    <section className="py-32 bg-surface relative border-t border-white/5">
      <Container>
        <div className="flex flex-col items-center text-center mb-20">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-brand-500 uppercase tracking-[0.2em] text-xs font-bold mb-4 block"
            >
                Partnerships
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-3xl md:text-4xl font-medium text-white max-w-2xl"
            >
                Trusted by growing brands worldwide
            </motion.h2>
        </div>

        {/* Grid Layout with Thin Borders */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-white/5 border border-white/5">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
              className="aspect-[3/2] flex items-center justify-center p-8 bg-surface border border-white/5 -ml-px -mt-px group hover:bg-white/[0.02] transition-colors duration-500 relative overflow-hidden"
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/0 via-brand-500/0 to-brand-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Logo Text (simulating logo) */}
              <span className="font-display text-xl md:text-2xl font-bold text-gray-600 group-hover:text-white transition-colors duration-300 tracking-tight z-10 cursor-default">
                {client.name}
              </span>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
            <p className="text-gray-500 text-sm">
                Join 500+ companies building the future with SPESSOLV. <a href="#contact" className="text-white border-b border-brand-500 pb-0.5 hover:text-brand-500 transition-colors">Start a project</a>
            </p>
        </div>
      </Container>
    </section>
  );
};

export default Clients;