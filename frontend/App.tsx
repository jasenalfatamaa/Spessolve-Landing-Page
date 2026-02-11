import React, { useEffect, useState, Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';

// Lazy load components to reduce initial bundle size
const Navbar = lazy(() => import('./components/Navbar'));
const Hero = lazy(() => import('./components/sections/Hero'));
const About = lazy(() => import('./components/sections/About'));
const Services = lazy(() => import('./components/sections/Services'));
const Work = lazy(() => import('./components/sections/Work'));
const Process = lazy(() => import('./components/sections/Process'));
const Clients = lazy(() => import('./components/sections/Clients'));
const CTA = lazy(() => import('./components/sections/CTA'));
const Footer = lazy(() => import('./components/Footer'));
const ProjectsPage = lazy(() => import('./components/ProjectsPage'));
const Marquee = lazy(() => import('./components/ui/Marquee'));

import CustomCursor from './components/ui/CustomCursor';
import Preloader from './components/ui/Preloader';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'home' | 'projects'>('home');

  // Smooth scroll behavior fix
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const handleNavigate = (view: 'home' | 'projects') => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  return (
    // REMOVED overflow-x-hidden from here to prevent fixed element clipping contexts. 
    // Handled by body css in index.html.
    <div className="bg-void min-h-screen text-cream selection:bg-brand-500 selection:text-void md:cursor-none relative">
      <CustomCursor />

      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Render Navbar conditionally but ensure it mounts after loading to avoid initial animation glitches */}
      {!isLoading && (
        <Suspense fallback={<div className="bg-void min-h-screen" />}>
          <Navbar onNavigate={handleNavigate} currentView={currentView} />

          <main className="overflow-x-hidden"> {/* Moved overflow protection to main content wrapper */}
            {currentView === 'home' ? (
              <>
                <Hero />
                <About />
                <Marquee />
                <Services />
                <Work onViewAll={() => handleNavigate('projects')} />
                <Process />
                <Clients />
                <CTA />
              </>
            ) : (
              <ProjectsPage onBack={() => handleNavigate('home')} />
            )}
          </main>

          <Footer />
        </Suspense>
      )}
    </div>
  );
};

export default App;