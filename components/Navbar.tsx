'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { MagneticButton } from './ui/MagneticButton';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 mix-blend-difference text-white flex justify-between items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-2xl font-bold tracking-tighter uppercase font-mono"
      >
        Digital<span className="text-[#00FF41]">Nest</span>
      </motion.div>

      <div className="hidden md:flex gap-8 items-center font-medium">
        {['Sobre', 'Serviços', 'Projetos'].map((item, i) => (
          <MagneticButton key={i}>
            <a
              href={`#${item.toLowerCase()}`}
              className="hover:text-[#00FF41] transition-colors uppercase text-sm tracking-widest"
            >
              {item}
            </a>
          </MagneticButton>
        ))}
        <MagneticButton className="border border-white/20 px-6 py-2 rounded-full hover:bg-[#00FF41] hover:text-black hover:border-[#00FF41] transition-all">
          <a href="#contato">Fale Conosco</a>
        </MagneticButton>
      </div>

      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-lg p-6 flex flex-col gap-4 md:hidden"
        >
          {['Sobre', 'Serviços', 'Projetos', 'Contato'].map((item, i) => (
            <a
              key={i}
              href={`#${item.toLowerCase()}`}
              className="text-xl uppercase tracking-widest hover:text-[#00FF41] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </a>
          ))}
        </motion.div>
      )}
    </nav>
  );
};
