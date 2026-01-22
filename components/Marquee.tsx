'use client';

import { motion } from 'framer-motion';

export const Marquee = () => {
  return (
    <div className="bg-[#00FF41] py-3 md:py-4 overflow-hidden flex whitespace-nowrap border-y border-black">
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
        className="flex gap-6 md:gap-12 text-black font-black text-3xl md:text-8xl uppercase tracking-tighter"
      >
        {Array(10)
          .fill("Let's Build The Future • DigitalNest • ")
          .map((text, i) => (
            <span key={i}>{text}</span>
          ))}
      </motion.div>
    </div>
  );
};
