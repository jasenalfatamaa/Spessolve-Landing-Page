import React from 'react';
import Container from './ui/Container';

const PixelIconArrowUpRight = () => (
  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 6h10v10h-2V8h-2v2h-2v2h-2v2H8v-2h2v-2h2V8H8V6z"/>
  </svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-void pt-20 md:pt-32 pb-12 border-t border-white/5 text-white relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-brand-500/50 to-transparent opacity-50"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-500/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2"></div>

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 md:mb-24 relative z-10">
          
          {/* Brand Column - Full width on tablet, half on desktop */}
          <div className="md:col-span-2 lg:col-span-6 flex flex-col justify-between h-full">
            <div className="mb-8 lg:mb-0">
              <a href="#" className="inline-block group mb-6 md:mb-8">
                  <span className="font-display text-4xl md:text-5xl font-bold tracking-tighter text-white">
                  SPESSOLV<span className="text-brand-500 transition-transform duration-300 group-hover:scale-110 inline-block">.</span>
                  </span>
              </a>
              <p className="text-brand-500 text-sm font-mono lowercase mb-4 tracking-widest">
                make it ez
              </p>
              <p className="text-gray-400 text-lg leading-relaxed max-w-sm font-light">
                Architects of the Digital Vanguard. Constructing the infrastructure for tomorrow's market leaders.
              </p>
            </div>
          </div>

          {/* Contact Column */}
           <div className="md:col-span-1 lg:col-span-3">
            <h4 className="font-mono text-xs text-brand-500 uppercase tracking-widest mb-6 md:mb-8">Inquiries</h4>
            
            <a 
              href="mailto:hello@spessolv.com" 
              className="block text-2xl md:text-3xl font-display font-medium text-white hover:text-brand-500 transition-colors duration-300 mb-6 md:mb-8 break-words"
            >
              hello@spessolv.com
            </a>
            
            <address className="not-italic text-gray-500 space-y-2 text-sm">
              <p className="text-white font-medium">Headquarters</p>
              <p>420 Montgomery St.<br />San Francisco, CA 94104</p>
            </address>
          </div>

          {/* Socials / Connect */}
          <div className="md:col-span-1 lg:col-span-3">
            <h4 className="font-mono text-xs text-brand-500 uppercase tracking-widest mb-6 md:mb-8">Network</h4>
            <ul className="space-y-4">
              {[
                { name: 'Twitter / X', href: '#' },
                { name: 'Instagram', href: '#' },
                { name: 'LinkedIn', href: '#' },
                { name: 'GitHub', href: '#' }
              ].map((social) => (
                <li key={social.name}>
                  <a 
                    href={social.href} 
                    className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <span className="text-sm tracking-wide">{social.name}</span>
                    <div className="text-brand-500 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300">
                        <PixelIconArrowUpRight />
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-[10px] text-gray-600 font-mono uppercase tracking-widest">
          <p className="mb-4 md:mb-0 text-center md:text-left">&copy; {new Date().getFullYear()} SPESSOLV. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-brand-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-500 transition-colors">Terms of Service</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;