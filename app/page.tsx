'use client';

import { useState, useEffect } from 'react';
import { useCustomCursor } from '@/hooks/useCustomCursor';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { CustomCursor } from '@/components/ui/CustomCursor';
import {
  Navbar,
  Hero3D,
  AboutSection,
  ServicesSection,
  ProjectsSection,
  Marquee,
  ContactSection,
} from '@/components';

export default function Home() {
  const { cursorX, cursorY } = useCustomCursor();
  const [isMobile, setIsMobile] = useState(true); // Assume mobile por padrão (SSR safe)
  const [mounted, setMounted] = useState(false);
  useSmoothScroll();

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(isTouchDevice || isSmallScreen);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className={`bg-black min-h-screen selection:bg-[#00FF41] selection:text-black ${mounted && !isMobile ? 'cursor-none' : ''}`}>
      {/* Custom Cursor - apenas desktop */}
      {mounted && !isMobile && <CustomCursor cursorX={cursorX} cursorY={cursorY} />}

      <Navbar />

      <main>
        <Hero3D />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <Marquee />
        <ContactSection />
      </main>
    </div>
  );
}
