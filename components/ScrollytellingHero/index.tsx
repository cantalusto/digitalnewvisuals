'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles, Share2, Rocket, Monitor, Code2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ScrollytellingHeroProps {
  onComplete?: () => void;
}

// Pre-generated matrix pattern (deterministic to avoid hydration mismatch)
const MATRIX_PATTERN = '10110100101101001011010010110100101101001011010010110100101101001011010010110100101101001011010010110100101101001011010010110100101101001011010010110100101101001011010010110100101101001011010010110100101101001011010010110100101101001011010010110100101101001011010010110100101101001011010010110100101101001011010010110100101101001011010010110100101101001011010010110100';

// Flying words for Hero reveal
const HERO_ITEMS = [
  'Code', 'Design', 'Growth', 'Nest', 'Web', 'App',
  'UI/UX', 'SEO', 'React', 'Digital', 'Scale', 'Future',
  'Brand', 'Ideas', 'Motion', '3D',
];

// Cube Face Component
const CubeFace = ({ rotate, color }: { rotate: string; color: string }) => {
  return (
    <div
      className="absolute w-full h-full backface-hidden flex items-center justify-center overflow-hidden transition-all duration-500"
      style={{ transform: rotate }}
    >
      {/* Wireframe Layer */}
      <div className={`wireframe-face absolute inset-0 border-2 ${color} opacity-0 bg-transparent z-20`} />

      {/* Solid Layer (Development Phase) */}
      <div className="solid-face absolute inset-0 bg-gray-900 opacity-0 z-10 flex flex-col items-center justify-center transition-opacity border border-[#00FF41]/20">
        {/* Matrix Code Effect Background */}
        <div className="matrix-effect absolute inset-0 p-2 font-mono text-[10px] leading-3 opacity-0 overflow-hidden text-[#00FF41]/30 select-none break-all">
          {MATRIX_PATTERN.split('').map((char, i) => (
            <span key={i} style={{ opacity: i % 3 === 0 ? 1 : 0.3 }}>
              {char}
            </span>
          ))}
        </div>

        {/* Center Icon */}
        <div className="relative z-30">
          <Code2 className="w-12 h-12 text-[#00FF41] opacity-50" />
        </div>
      </div>
    </div>
  );
};

export function ScrollytellingHero({ onComplete }: ScrollytellingHeroProps) {
  const mainRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const finalContentRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [showHeroAnimation, setShowHeroAnimation] = useState(false);

  useEffect(() => {
    if (!mainRef.current || !cubeRef.current || !dotRef.current || !particlesRef.current) return;

    const ctx = gsap.context(() => {
      // Timeline Setup
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          pin: '.sticky-stage',
          onUpdate: (self) => {
            // Show hero animation when reaching phase 4
            if (self.progress >= 0.85 && !showHeroAnimation) {
              setShowHeroAnimation(true);
            }
            if (self.progress >= 0.98 && !isComplete) {
              setIsComplete(true);
              onComplete?.();
            }
          },
        },
      });

      // --- PHASE 0 to 1: Idea (Dot) to Design (Wireframe) ---
      tl.to(
        dotRef.current,
        {
          scale: 30,
          opacity: 0,
          duration: 2,
          ease: 'power2.inOut',
        },
        'start'
      );

      tl.to('.intro-text', { opacity: 0, scale: 0.8, duration: 1 }, 'start');

      // Wireframe appears
      tl.fromTo(
        cubeRef.current,
        { scale: 0, rotationX: 0, rotationY: 0, opacity: 0 },
        { scale: 1, rotationX: 25, rotationY: 45, opacity: 1, duration: 3, ease: 'back.out(1.7)' },
        '-=1.5'
      );

      tl.to('.wireframe-face', { opacity: 1, duration: 1 }, '-=2');

      // Text Phase 1: Design
      tl.fromTo('.text-design', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, '-=1');

      // --- PHASE 1 to 2: Design to Development (Solid + Matrix) ---
      tl.to(
        cubeRef.current,
        {
          rotationX: 180,
          rotationY: 225,
          duration: 4,
          ease: 'power1.inOut',
        },
        'phase2'
      );

      tl.to('.text-design', { opacity: 0, y: -50, duration: 1 }, 'phase2');
      tl.fromTo('.text-dev', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, 'phase2+=1');

      // Fade in solid faces with code background
      tl.to('.solid-face', { opacity: 0.95, duration: 2 }, 'phase2+=0.5');
      tl.to('.matrix-effect', { opacity: 0.4, duration: 1 }, 'phase2+=1');

      // --- PHASE 2 to 3: Marketing (Expansion) ---
      tl.to('.scene-bg', { backgroundColor: '#0a0a0a', duration: 3 }, 'phase3');

      tl.to(
        cubeRef.current,
        {
          rotationX: 360,
          rotationY: 360,
          scale: 1.2,
          duration: 4,
          ease: 'none',
        },
        'phase3'
      );

      tl.to('.text-dev', { opacity: 0, y: -50, duration: 1 }, 'phase3');
      tl.fromTo('.text-marketing', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, 'phase3+=1');

      // Particles/Icons orbit/expand
      tl.fromTo(
        particlesRef.current?.children || [],
        { scale: 0, opacity: 0, x: 0, y: 0 },
        {
          scale: 1,
          opacity: 1,
          x: (i: number) => (i % 2 === 0 ? 300 : -300) * (Math.random() + 0.5),
          y: (i: number) => (i < 2 ? -200 : 200) * (Math.random() + 0.5),
          duration: 3,
          stagger: 0.2,
        },
        'phase3'
      );

      // --- PHASE 3 to 4: Landing (Explosion) ---
      tl.to('.text-marketing', { opacity: 0, scale: 2, duration: 1 }, 'phase4');

      // Cube explodes towards camera
      tl.to(
        cubeRef.current,
        {
          scale: 30,
          opacity: 0,
          rotationZ: 180,
          duration: 3,
          ease: 'power4.in',
        },
        'phase4'
      );

      tl.to(
        particlesRef.current?.children || [],
        {
          scale: 0,
          opacity: 0,
          duration: 1,
        },
        'phase4'
      );

      // Reveal final content (Hero)
      tl.fromTo(
        finalContentRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 2 },
        'phase4+=1'
      );
    }, mainRef);

    return () => {
      ctx.revert();
    };
  }, [onComplete, isComplete, showHeroAnimation]);

  return (
    <div className="font-sans text-white overflow-hidden bg-black">
      {/* MAIN SCROLL CONTAINER - 500vh for scroll distance */}
      <div ref={mainRef} className="relative w-full h-[500vh]">
        {/* STICKY STAGE: The "Canvas" that stays fixed */}
        <div className="sticky-stage fixed top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center perspective-1000">
          {/* Dynamic Background */}
          <div className="scene-bg absolute inset-0 bg-black transition-colors duration-1000 z-0" />

          {/* Grid decoration */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] z-0 pointer-events-none" />

          {/* Intro Text (Phase 0) */}
          <div className="intro-text absolute z-20 text-center px-4">
            <div className="relative">
              {/* Dark backdrop */}
              <div className="absolute inset-0 -inset-x-8 -inset-y-4 bg-black/70 blur-xl rounded-3xl" />
              <h1 className="relative text-4xl md:text-6xl font-light tracking-wide mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
                Tudo começa com um{' '}
                <span className="text-[#00FF41] font-semibold animate-pulse drop-shadow-[0_0_20px_rgba(0,255,65,0.5)]">pensamento</span>...
              </h1>
            </div>
            <div className="flex flex-col items-center mt-8 opacity-50 animate-bounce">
              <span className="text-xs tracking-widest uppercase mb-2">Scroll para criar</span>
              <ChevronDown />
            </div>
          </div>

          {/* Floating Text Layers (Phase 1, 2, 3) - Positioned at bottom for better visibility */}
          <div className="absolute z-30 w-full bottom-24 md:bottom-32 text-center pointer-events-none px-4">
            {/* Design Phase Text */}
            <div className="text-design absolute w-full left-0 opacity-0 transform translate-y-12">
              <div className="inline-block relative px-8 py-6">
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-2xl" />
                <div className="relative">
                  <span className="block text-sm md:text-base uppercase tracking-[0.3em] text-[#00FF41] mb-2 font-mono">Design</span>
                  <h2 className="text-4xl md:text-6xl font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
                    Nós trazemos a <span className="text-[#00FF41] drop-shadow-[0_0_30px_rgba(0,255,65,0.6)]">Forma.</span>
                  </h2>
                </div>
              </div>
            </div>

            {/* Development Phase Text */}
            <div className="text-dev absolute w-full left-0 opacity-0 transform translate-y-12">
              <div className="inline-block relative px-8 py-6">
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-2xl" />
                <div className="relative">
                  <span className="block text-sm md:text-base uppercase tracking-[0.3em] text-[#00FF41] mb-2 font-mono">Desenvolvimento</span>
                  <h2 className="text-4xl md:text-6xl font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
                    Nós construímos a <span className="text-[#00FF41] drop-shadow-[0_0_30px_rgba(0,255,65,0.6)]">Fundação.</span>
                  </h2>
                </div>
              </div>
            </div>

            {/* Marketing Phase Text */}
            <div className="text-marketing absolute w-full left-0 opacity-0 transform translate-y-12">
              <div className="inline-block relative px-8 py-6">
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-2xl" />
                <div className="relative">
                  <span className="block text-sm md:text-base uppercase tracking-[0.3em] text-[#00FF41] mb-2 font-mono">Marketing</span>
                  <h2 className="text-4xl md:text-6xl font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
                    E fazemos o mundo <span className="text-[#00FF41] drop-shadow-[0_0_30px_rgba(0,255,65,0.6)]">Ver.</span>
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* The Initial Dot (Phase 0) */}
          <div
            ref={dotRef}
            className="absolute z-10 w-4 h-4 bg-[#00FF41] rounded-full shadow-[0_0_20px_5px_rgba(0,255,65,0.5)] animate-pulse"
          />

          {/* The 3D Cube Container */}
          <div className="relative z-10 w-64 h-64 preserve-3d">
            <div ref={cubeRef} className="w-full h-full preserve-3d relative opacity-0">
              {/* CUBE FACES */}
              <CubeFace rotate="rotateY(0deg) translateZ(8rem)" color="border-[#00FF41]" />
              <CubeFace rotate="rotateY(90deg) translateZ(8rem)" color="border-[#00FF41]" />
              <CubeFace rotate="rotateY(180deg) translateZ(8rem)" color="border-[#00FF41]" />
              <CubeFace rotate="rotateY(-90deg) translateZ(8rem)" color="border-[#00FF41]" />
              <CubeFace rotate="rotateX(90deg) translateZ(8rem)" color="border-[#00FF41]" />
              <CubeFace rotate="rotateX(-90deg) translateZ(8rem)" color="border-[#00FF41]" />
            </div>
          </div>

          {/* Marketing Particles (Phase 3) */}
          <div
            ref={particlesRef}
            className="absolute inset-0 pointer-events-none flex items-center justify-center z-10"
          >
            <div className="absolute p-4 bg-[#00FF41]/20 rounded-full backdrop-blur-md border border-[#00FF41]/50">
              <Sparkles className="w-8 h-8 text-[#00FF41]" />
            </div>
            <div className="absolute p-4 bg-emerald-600/20 rounded-full backdrop-blur-md border border-emerald-400/50">
              <Share2 className="w-8 h-8 text-emerald-400" />
            </div>
            <div className="absolute p-4 bg-lime-600/20 rounded-full backdrop-blur-md border border-lime-400/50">
              <Rocket className="w-8 h-8 text-lime-400" />
            </div>
            <div className="absolute p-4 bg-teal-600/20 rounded-full backdrop-blur-md border border-teal-400/50">
              <Monitor className="w-8 h-8 text-teal-400" />
            </div>
          </div>

          {/* ========== FINAL HERO CONTENT (Phase 4 Reveal) ========== */}
          <div
            ref={finalContentRef}
            className="absolute inset-0 z-40 opacity-0 bg-[#050505]"
          >
            {/* Flying Words Grid */}
            {showHeroAnimation && (
              <div
                className="absolute inset-0 grid grid-cols-4 grid-rows-4 place-items-center"
                style={{
                  perspective: '1000px',
                  transformStyle: 'preserve-3d',
                }}
              >
                {HERO_ITEMS.map((text, i) => {
                  const isSpecial = text === 'Digital' || text === 'Nest' || text === 'Growth';
                  const delay = i * 0.15;

                  return (
                    <motion.div
                      key={i}
                      initial={{
                        z: -1500,
                        opacity: 0,
                        filter: 'blur(20px)',
                      }}
                      animate={{
                        z: [-1500, 0, 800],
                        opacity: [0, 1, 0],
                        filter: ['blur(20px)', 'blur(0px)', 'blur(15px)'],
                      }}
                      transition={{
                        duration: 2.5,
                        delay: delay,
                        ease: [0.25, 0.1, 0.25, 1],
                        times: [0, 0.4, 1],
                      }}
                      className={`text-[4vmin] font-light uppercase tracking-widest font-mono ${
                        isSpecial
                          ? 'text-[#00FF41] font-bold'
                          : 'text-white/30'
                      }`}
                      style={{
                        transformStyle: 'preserve-3d',
                        textShadow: isSpecial ? '0 0 15px rgba(0,255,65, 0.5)' : 'none',
                      }}
                    >
                      {text}
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Main DIGITALNEST Title */}
            {showHeroAnimation && (
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{
                  perspective: '1000px',
                  transformStyle: 'preserve-3d',
                }}
              >
                <motion.div
                  initial={{
                    z: -2000,
                    opacity: 0,
                    scale: 0.5,
                    filter: 'blur(30px)',
                  }}
                  animate={{
                    z: 0,
                    opacity: 1,
                    scale: 1,
                    filter: 'blur(0px)',
                  }}
                  transition={{
                    duration: 2,
                    delay: 1.5,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="text-center mix-blend-difference text-white"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-4">
                    DIGITAL<span className="text-transparent stroke-text">NEST</span>
                  </h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3, duration: 0.8 }}
                    className="text-lg md:text-2xl font-light tracking-widest uppercase"
                  >
                    "Se você me viu, seu cliente também pode te ver."
                  </motion.p>
                </motion.div>
              </div>
            )}

            {/* Scroll indicator */}
            {showHeroAnimation && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 4 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50"
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
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScrollytellingHero;
