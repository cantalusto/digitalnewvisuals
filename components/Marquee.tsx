'use client';

import { motion } from 'framer-motion';

export const Marquee = () => {
  return (
    <div className="bg-[#00FF41] py-4 overflow-hidden flex whitespace-nowrap border-y border-black">
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
        className="flex gap-12 text-black font-black text-6xl md:text-8xl uppercase tracking-tighter"
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
