'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const AboutSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const planetX = useTransform(scrollYProgress, [0, 1], ['-20%', '120%']);
  const planetRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section
      id="sobre"
      ref={containerRef}
      className="min-h-screen bg-black text-white relative flex flex-col items-center justify-center overflow-hidden py-24"
    >
      <div className="relative w-full max-w-7xl mx-auto flex flex-col items-center justify-center text-[15vw] md:text-[20vw] font-black leading-none tracking-tighter uppercase select-none">
        {/* Layer 1: Bottom Text */}
        <div className="relative z-10 text-white/90">SOBRE</div>

        {/* Layer 2: Planet - Moves between layers */}
        <motion.div
          style={{
            left: planetX,
            rotate: planetRotate,
            zIndex: 20,
          }}
          className="absolute top-1/2 -translate-y-1/2 w-[25vw] h-[25vw] rounded-full bg-gradient-to-br from-[#00FF41] to-black shadow-[0_0_100px_rgba(0,255,65,0.4)] border border-[#00FF41]/30 flex items-center justify-center backdrop-blur-sm"
        >
          <div className="w-[90%] h-[90%] rounded-full border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-50"></div>
            <div className="absolute top-4 left-4 w-4 h-4 bg-white rounded-full blur-[2px]"></div>
          </div>
        </motion.div>

        {/* Layer 3: Top Text */}
        <div className="relative z-30 text-transparent stroke-text-white">NÓS</div>
      </div>

      <div className="max-w-2xl text-center mt-12 px-6 relative z-40">
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-xl md:text-2xl font-light text-gray-400"
        >
          Somos arquitetos do caos organizado. Transformamos código e design em
          experiências digitais que prendem a atenção e convertem visitantes em fãs.
        </motion.p>
      </div>
    </section>
  );
};
