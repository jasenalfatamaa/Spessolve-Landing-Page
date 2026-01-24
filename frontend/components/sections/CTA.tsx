import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Container from '../ui/Container';

const PixelIconArrowRight = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 6h2v2h2v2h2v4h-2v2h-2v2h-2v-2h2v-2h-2v-2H6v-2h10V8h-2V6z" />
  </svg>
);

const CTA: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      id="contact"
      ref={containerRef}
      className="py-32 md:py-48 bg-white text-black relative overflow-hidden rounded-t-[3rem] md:rounded-t-[5rem] -mt-12 z-20"
    >
      {/* Abstract Texture */}
      <div className="absolute inset-0 opacity-40 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

      {/* Floating Background Elements */}
      <motion.div style={{ y }} className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[120px] pointer-events-none" />
      <motion.div style={{ y }} className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-black/10 bg-black/5 text-xs font-bold uppercase tracking-widest text-black/70">
              Start the conversation
            </span>
          </motion.div>

          {/* Emotional Headline */}
          <h2 className="font-display text-5xl md:text-8xl font-medium tracking-tighter mb-12 leading-[0.9]">
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                Ready to build
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                something <span className="italic text-brand-600">remarkable?</span>
              </motion.div>
            </div>
          </h2>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <a
              href="https://wa.me/6281909122001?text=Halo%20SPESSOLVE%2C%0ANama%3A%20%0AKebutuhan%3A%20%0ASaya%20ingin%20berdiskusi%20lebih%20lanjut%20terkait%20pengembangannya."
              className="group relative inline-flex items-center gap-4 px-12 py-6 bg-black text-white rounded-full text-xl md:text-2xl font-medium overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <span className="relative z-10">Start Your Project</span>
              <div className="relative z-10 bg-white/20 p-2 rounded-full transition-transform duration-300 group-hover:rotate-45">
                <PixelIconArrowRight />
              </div>

              {/* Fill effect on hover */}
              <div className="absolute inset-0 bg-brand-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out"></div>
            </a>
          </motion.div>

        </div>
      </Container>
    </section>
  );
};

export default CTA;