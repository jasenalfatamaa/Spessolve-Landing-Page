import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Services from './components/sections/Services';
import Work from './components/sections/Work';
import Process from './components/sections/Process';
import Clients from './components/sections/Clients';
import CTA from './components/sections/CTA';
import Footer from './components/Footer';
import ProjectsPage from './components/ProjectsPage';
import CustomCursor from './components/ui/CustomCursor';
import Preloader from './components/ui/Preloader';
import Marquee from './components/ui/Marquee';

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
        <>
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
        </>
      )}
    </div>
  );
};

export default App;