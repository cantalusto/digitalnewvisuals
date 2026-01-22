'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Hero3DProps {
  onAnimationComplete?: () => void;
}

const ITEMS = [
  'Code', 'Design', 'Growth', 'Nest', 'Web', 'App',
  'UI/UX', 'SEO', 'React', 'Digital', 'Scale', 'Future',
  'Brand', 'Ideas', 'Motion', '3D',
];

export const Hero3D = ({ onAnimationComplete }: Hero3DProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const welcomeRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !stickyRef.current || !titleRef.current) return;

    const ctx = gsap.context(() => {
      // Main timeline controlled by scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          pin: stickyRef.current,
          onUpdate: (self) => {
            if (self.progress >= 0.95 && !isComplete) {
              setIsComplete(true);
              onAnimationComplete?.();
            }
          },
        },
      });

      // Welcome message fades out at the start
      if (welcomeRef.current) {
        tl.fromTo(
          welcomeRef.current,
          { opacity: 1, scale: 1, filter: 'blur(0px)' },
          { opacity: 0, scale: 1.2, filter: 'blur(10px)', duration: 0.3, ease: 'power2.in' },
          0
        );
      }

      // Animate each flying word
      itemsRef.current.forEach((item, i) => {
        if (!item) return;

        const isSpecial = ITEMS[i] === 'Digital' || ITEMS[i] === 'Nest' || ITEMS[i] === 'Growth';
        const startTime = i * 0.08; // Stagger

        // Words fly from back to front, then past the camera
        tl.fromTo(
          item,
          {
            z: -1500,
            opacity: 0,
            filter: 'blur(20px)',
          },
          {
            z: 800,
            opacity: 0,
            filter: 'blur(15px)',
            duration: 1.5,
            ease: 'power2.inOut',
            keyframes: {
              '0%': { z: -1500, opacity: 0, filter: 'blur(20px)' },
              '40%': { z: 0, opacity: 1, filter: 'blur(0px)' },
              '100%': { z: 800, opacity: 0, filter: 'blur(15px)' },
            },
          },
          startTime
        );
      });

      // Main title animation - comes in after words start flying
      tl.fromTo(
        titleRef.current,
        {
          z: -2000,
          opacity: 0,
          scale: 0.5,
          filter: 'blur(30px)',
        },
        {
          z: 0,
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.5,
          ease: 'power2.out',
        },
        0.8 // Start after some words have passed
      );

      // Subtitle fades in
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.3'
        );
      }

      // Scroll indicator appears at the end
      if (scrollIndicatorRef.current) {
        tl.fromTo(
          scrollIndicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3 },
          '-=0.2'
        );
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [onAnimationComplete, isComplete]);

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      {/* Sticky container */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden bg-[#050505]"
      >
        {/* 3D Grid Container for flying words */}
        <div
          className="absolute inset-0 grid grid-cols-4 grid-rows-4 place-items-center"
          style={{
            perspective: '1000px',
            transformStyle: 'preserve-3d',
          }}
        >
          {ITEMS.map((text, i) => {
            const isSpecial = text === 'Digital' || text === 'Nest' || text === 'Growth';

            return (
              <div
                key={i}
                ref={(el) => { itemsRef.current[i] = el; }}
                className={`text-[4vmin] font-light uppercase tracking-widest font-mono ${
                  isSpecial
                    ? 'text-[#00FF41] font-bold'
                    : 'text-white/30'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  textShadow: isSpecial ? '0 0 15px rgba(0,255,65, 0.5)' : 'none',
                  opacity: 0,
                }}
              >
                {text}
              </div>
            );
          })}
        </div>

        {/* Main Title */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            perspective: '1000px',
            transformStyle: 'preserve-3d',
          }}
        >
          <div
            ref={titleRef}
            className="text-center mix-blend-difference text-white"
            style={{
              transformStyle: 'preserve-3d',
              opacity: 0,
            }}
          >
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-4">
              DIGITAL<span className="text-transparent stroke-text">NEST</span>
            </h1>
            <p
              ref={subtitleRef}
              className="text-lg md:text-2xl font-light tracking-widest uppercase"
              style={{ opacity: 0 }}
            >
              "Se você me viu, seu cliente também pode te ver."
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50"
          style={{ opacity: 0 }}
        >
          <div className="flex flex-col items-center gap-2 text-white/50">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
            >
              <motion.div className="w-1 h-2 bg-[#00FF41] rounded-full" />
            </motion.div>
            <span className="text-xs uppercase tracking-widest">Scroll</span>
          </div>
        </div>

        {/* Mensagem de boas-vindas - animada com scroll */}
        <div
          ref={welcomeRef}
          className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none"
        >
          <div className="text-center">
            <h2 className="text-2xl md:text-4xl font-light text-white/80 tracking-widest uppercase mb-4">
              Bem-vindo
            </h2>
            <p className="text-sm md:text-base text-white/50 tracking-wider">
              Uma experiência interativa aguarda você
            </p>
          </div>
        </div>

        {/* Initial scroll hint - shows before scrolling */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 scroll-hint">
          <div className="flex flex-col items-center gap-2 text-white/50 animate-pulse">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
            >
              <motion.div className="w-1 h-2 bg-[#00FF41] rounded-full" />
            </motion.div>
            <span className="text-xs uppercase tracking-widest">Scroll para começar</span>
          </div>
        </div>
      </div>
    </div>
  );
};
