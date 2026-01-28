
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import Container from './ui/Container';

interface NavbarProps {
  onNavigate: (view: 'home' | 'projects') => void;
  currentView: 'home' | 'projects';
}

const navLinks = [
  { name: 'Home', view: 'home', href: '#', label: 'Home' },
  { name: 'About', view: 'home', href: '#about', label: 'About' },
  { name: 'Services', view: 'home', href: '#services', label: 'Services' },
  { name: 'Work', view: 'home', href: '#work', label: 'Work' },
  { name: 'Process', view: 'home', href: '#process', label: 'Process' },
  { name: 'Projects', view: 'projects', href: '/projects', label: 'Projects' },
];

const PixelIconMenu = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 6h20v2H2V6zm0 5h20v2H2v-2zm0 5h20v2H2v-2z" />
  </svg>
);

const PixelIconClose = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 5h2v2h2v2h2v2h2V9h2V7h2v2h-2v2h-2v2h2v2h2v2h-2v-2h-2v-2h-2v2H9v2H7v-2H5v-2h2v-2H5V5z" />
  </svg>
);

const PixelIconArrowRight = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 6h2v2h2v2h2v4h-2v2h-2v2h-2v-2h2v-2h-2v-2H6v-2h10V8h-2V6z" />
  </svg>
);

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView }) => {
  const [isHidden, setIsHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollY } = useScroll();
  const [lastY, setLastY] = useState(0);
  const isManualScrolling = React.useRef(false); // Lock to prevent scroll spy interference

  // Scroll Behavior: Hide on Down, Show on Up - DISABLED per user request (sticky header)
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsHidden(false); // Force visible
    setLastY(latest);
  });

  // Scroll Spy: Track active section based on scroll position
  useEffect(() => {
    const handleScrollSpy = () => {
      // Skip updates if manually scrolling (clicked a link)
      if (isManualScrolling.current) return;

      // If on projects view, that is the active section
      if (currentView === 'projects') {
        setActiveSection('projects');
        return;
      }

      const scrollPos = window.scrollY + 100; // Minimal buffer for active state detection

      // All sections on Home page to track, in reverse visual order (bottom-up)
      const sections = ['contact', 'process', 'work', 'services', 'about'];

      let found = 'home'; // Default to home

      for (const id of sections) {
        const element = document.getElementById(id);
        if (element) {
          if (scrollPos >= element.offsetTop) {
            found = id;
            break; // Stop at the first match (deepest section found)
          }
        }
      }

      // Force 'home' if strictly at the top
      if (window.scrollY < 100) {
        found = 'home';
      }

      setActiveSection(found);
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy(); // Initial check

    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [currentView]);

  // Lock Body Scroll when Mobile Menu is Open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Safe wrapper for history.pushState to avoid SecurityError in sandboxed environments
  const updateURL = (url: string) => {
    try {
      window.history.pushState(null, '', url);
    } catch (e) {
      console.debug('URL update suppressed');
    }
  };

  const handleNavigation = (view: 'home' | 'projects', href: string) => {
    setMobileMenuOpen(false);

    // Optimistic active section update & Lock Spy
    isManualScrolling.current = true;

    // Unlock after scroll animation completes (approx 1000ms)
    setTimeout(() => {
      isManualScrolling.current = false;
    }, 1000);

    if (view === 'projects') {
      setActiveSection('projects');
    } else {
      const target = href.replace('#', '');
      setActiveSection(target === '' ? 'home' : target);
    }

    // Handle cross-page navigation logic
    // Handle cross-page navigation logic
    if (view === 'projects') {
      // 1. Scroll to top FIRST immediately
      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo(0, 0);
      document.documentElement.style.scrollBehavior = 'smooth';

      // 2. DELAY the state update slightly
      // This forces the "slide" animation to calculate start/end positions ONLY after we are safely at Y=0
      // Eliminating the vertical delta completely
      setTimeout(() => {
        updateURL('/projects');
        onNavigate('projects');
      }, 50);

      return;
    }

    // Switch from Projects to Home if needed
    if (currentView !== 'home') {
      onNavigate('home');
      updateURL(href === '#' ? '/' : href);
      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo(0, 0);

      // Allow home page to mount then scroll to target ID
      setTimeout(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
        const targetId = href.replace('#', '');
        if (targetId) {
          const elem = document.getElementById(targetId);
          if (elem) elem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else {
      // Smooth scroll on same page
      updateURL(href === '#' ? '/' : href);
      const targetId = href.replace('#', '');
      if (targetId) {
        const elem = document.getElementById(targetId);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleNavClick = (e: React.MouseEvent, link: typeof navLinks[0]) => {
    e.preventDefault();
    handleNavigation(link.view as 'home' | 'projects', link.href);
  };

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: '-100%', opacity: 0 },
        }}
        initial="visible"
        animate={isHidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className="fixed top-0 left-0 w-full z-[99999] py-4 bg-void/90 backdrop-blur-md border-b border-brand-500/10 pointer-events-auto"
      >
        <Container>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); handleNavigation('home', '#'); }}
              className="group flex items-baseline gap-2 cursor-pointer z-[100000] select-none"
            >
              <span className="font-display text-2xl font-bold tracking-tight text-cream">
                SPESSOLVE
              </span>
              <span className="hidden sm:inline-block font-serif italic text-xs text-brand-500">
                make it ez
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => {
                let isActive = false;
                if (currentView === 'projects') {
                  isActive = link.name === 'Projects';
                } else {
                  if (link.name === 'Projects') isActive = false;
                  else if (link.href === '#') isActive = activeSection === 'home';
                  else isActive = activeSection === link.href.replace('#', '');
                }

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    className={`relative text-sm tracking-wide font-medium transition-colors duration-300 font-serif cursor-pointer py-1 px-1 ${isActive ? 'text-brand-500' : 'text-cream/80 hover:text-brand-500'
                      }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-brand-500"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </a>
                );
              })}

              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleNavigation('home', '#contact'); }}
                className="ml-4 px-6 py-2 bg-brand-500 hover:bg-brand-300 text-void font-bold text-sm rounded-full transition-colors duration-300"
              >
                Contact
              </a>
            </div>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden z-[100000] text-cream p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <PixelIconClose /> : <PixelIconMenu />}
            </button>
          </div>
        </Container>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[99998] bg-void flex flex-col pt-32 px-6 lg:hidden"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link, idx) => {
                let isActive = false;
                if (currentView === 'projects') isActive = link.name === 'Projects';
                else if (link.name === 'Projects') isActive = false;
                else if (link.href === '#') isActive = activeSection === 'home';
                else isActive = activeSection === link.href.replace('#', '');

                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                    className={`text-3xl font-serif font-medium ${isActive ? 'text-brand-500' : 'text-cream'
                      }`}
                  >
                    {link.name}
                  </motion.a>
                );
              })}
              <div className="pt-8 border-t border-cream/10 mt-4">
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); handleNavigation('home', '#contact'); }}
                  className="flex items-center justify-between w-full p-6 bg-brand-500 text-void rounded-xl font-bold text-xl"
                >
                  <span>Start a Project</span>
                  <PixelIconArrowRight />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
