import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';

const PixelIconTarget = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 2h2v5h-2V2zm0 15h2v5h-2v-5zm9-6v2h-5v-2h5zM4 11v2H9v-2H4zm8-4h-2v2h-2v2H6v2h2v2h2v2h2v-2h2v-2h2v-2h-2v-2h-2v-2z" />
  </svg>
);

const PixelIconPen = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 2h4v4h-2v2h-2v2H8v12H4v-4h12V8h2V6h-2V4h-2V2zM6 18v2h2v-2H6z" />
  </svg>
);

const PixelIconCode = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 8H4v8h2v-2h2v-2H6v2zm12 0h2v8h-2v-2h-2v-2h2v2z" />
  </svg>
);

const pillars = [
  {
    icon: <PixelIconTarget />,
    title: "Strategic Foresight",
    description: "We don't guess. We map the territory. Every line of code begins with a deep understanding of your business mechanics and market trajectory."
  },
  {
    icon: <PixelIconPen />,
    title: "Clarity-Driven Design",
    description: "Design with purpose. We create clear, intuitive interfaces that simplify complexity and make digital experiences effortless to use."
  },
  {
    icon: <PixelIconCode />,
    title: "Future-Proof Engineering",
    description: "Built to scale. We deploy fortress-grade architecture designed to handle exponential growth, ensuring your platform performs flawlessly under pressure."
  }
];

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax for the abstract background blob
  const yBlob = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Parallax for the main image (slower movement relative to scroll)
  const yImg = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  // Smooth background color transition:
  // Starts at Surface (#121212) -> Dips to Darker (#050505) for the Image Break -> Returns to Surface (#121212)
  const backgroundColor = useTransform(
    scrollYProgress,
    [0.2, 0.5, 0.8],
    ["#121212", "#050505", "#121212"]
  );

  return (
    <motion.section
      ref={containerRef}
      id="about"
      className="py-32 relative overflow-hidden"
      style={{ backgroundColor }}
    >
      {/* Background Decoration */}
      <motion.div
        style={{ y: yBlob }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2"
      ></motion.div>

      <Container>
        {/* Manifesto Section - Asymmetrical Layout */}
        <div className="flex flex-col lg:flex-row gap-16 mb-32 relative z-10">
          <div className="lg:w-1/2">
            <SectionHeading
              subtitle="Our DNA"
              title="Architects of the Digital Vanguard."
            />
          </div>
          <div className="lg:w-1/2 lg:pt-24">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-display font-light leading-relaxed text-gray-200 mb-8"
            >
              SPESSOLVE is built on a simple belief: great technology should make things <span className="text-brand-500">easier</span> , <span className="text-brand-500">not harder</span>.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-400 leading-relaxed space-y-6"
            >
              <p>
                In a world full of digital complexity, we believe clarity is the real advantage.
                This belief shapes everything we do <span className="text-brand-500 font-medium font-mono lowercase">make it ez</span>.
              </p>
              <p>
                To us, Make It EZ means simplifying complexity.
                We take on the technical burden behind the scenes, so you can stay focused on your business.
                Through a structured and efficient approach, we streamline the software lifecycle,
                removing friction, confusion, and unnecessary complexity.
              </p>
              <p>
                We see simplicity not as a compromise, but as the highest standard of quality.
                Every solution we build is designed to be intuitive, reliable, and high-performing —
                delivering clarity where others deliver confusion.
              </p>
              <p>
                <span className="text-brand-500 font-medium font-mono">SPESSOLVE</span> bridges the gap between ideas and execution.
                By combining disciplined engineering with a strong understanding of business needs,
                we create solutions that don’t just work — they make progress feel EZ.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Image Break - Full Width Parallax */}
        <div className="relative w-full h-[60vh] rounded-3xl overflow-hidden mb-32 group">
          <div className="absolute inset-0 bg-black/40 z-10 transition-opacity duration-500 group-hover:opacity-20"></div>
          <motion.div style={{ y: yImg }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop"
              alt="Architecture of digital space"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
          <div className="absolute bottom-8 right-8 z-20 text-right">
            <p className="text-white font-display text-3xl md:text-4xl font-medium tracking-tight">The Convergence</p>
            <div className="flex justify-end gap-3 mt-2">
              <span className="text-brand-500 text-xs font-bold tracking-widest uppercase">Strategy</span>
              <span className="text-brand-500 text-xs font-bold tracking-widest uppercase">•</span>
              <span className="text-brand-500 text-xs font-bold tracking-widest uppercase">Design</span>
              <span className="text-brand-500 text-xs font-bold tracking-widest uppercase">•</span>
              <span className="text-brand-500 text-xs font-bold tracking-widest uppercase">Tech</span>
            </div>
          </div>
        </div>

        {/* The Three Pillars - Minimalist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative group"
            >
              <div className="absolute -left-6 top-0 bottom-0 w-[1px] bg-white/10 group-hover:bg-brand-500/50 transition-colors duration-500"></div>

              <div className="mb-6 text-gray-500 group-hover:text-brand-500 transition-colors duration-300">
                {pillar.icon}
              </div>
              <h3 className="text-2xl font-display font-medium text-white mb-4">{pillar.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

      </Container>
    </motion.section>
  );
};

export default About;