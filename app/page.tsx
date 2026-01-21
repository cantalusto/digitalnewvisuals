'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  useSmoothScroll();

  return (
    <div className="bg-black min-h-screen cursor-none selection:bg-[#00FF41] selection:text-black">
      {/* Custom Cursor */}
      <CustomCursor cursorX={cursorX} cursorY={cursorY} />

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
