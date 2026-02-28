'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const { cursorX, cursorY } = useCustomCursor();
  const [isMobile, setIsMobile] = useState(true);
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);
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

  // Animação de entrada do vídeo
  useEffect(() => {
    if (!videoRef.current) return;
    gsap.fromTo(
      videoRef.current,
      { opacity: 0, scale: 1.15 },
      { opacity: 1, scale: 1, duration: 1.8, ease: 'power2.out', delay: 0.2 }
    );
  }, []);

  // Fade out do vídeo quando chega na seção Sobre
  useEffect(() => {
    if (!videoRef.current) return;
    const aboutSection = document.getElementById('sobre');
    if (!aboutSection) return;

    const trigger = ScrollTrigger.create({
      trigger: aboutSection,
      start: 'top 90%',
      end: 'top 30%',
      scrub: true,
      onUpdate: (self) => {
        if (!videoRef.current) return;
        const p = self.progress;
        videoRef.current.style.opacity = String(1 - p);
        videoRef.current.style.filter = `blur(${p * 8}px)`;
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <div className={`bg-black min-h-screen selection:bg-[#00FF41] selection:text-black film-grain ${mounted && !isMobile ? 'cursor-none' : ''}`}>
      {/* Vídeo de fundo fixo — visível do hero até o sobre */}
      <div
        ref={videoRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ opacity: 0 }}
      >
        <video
          className="h-full w-full object-cover"
          src="/homevid.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Custom Cursor - apenas desktop */}
      {mounted && !isMobile && <CustomCursor cursorX={cursorX} cursorY={cursorY} />}

      <Navbar />

      <main className="relative z-[1]">
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
