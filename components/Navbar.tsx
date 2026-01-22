'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { MagneticButton } from './ui/MagneticButton';

const navItems = ['Sobre', 'Serviços', 'Projetos'];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      // Mostra a navbar após scrollar 100vh (altura da viewport)
      const scrollThreshold = window.innerHeight;
      setIsVisible(window.scrollY > scrollThreshold);

      // Mostra o logo apenas quando chegar na seção "Sobre"
      const sobreSection = document.getElementById('sobre');
      if (sobreSection) {
        const sobreTop = sobreSection.getBoundingClientRect().top;
        setShowLogo(sobreTop <= 100);
      }

      // Detecta qual seção está ativa
      const sections = ['sobre', 'serviços', 'projetos', 'contato'];
      let currentSection = '';

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          // Considera a seção ativa se ela estiver visível na parte superior da tela
          if (rect.top <= 150 && rect.bottom >= 150) {
            currentSection = sectionId;
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Verifica estado inicial

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 w-full z-50 px-6 py-6 mix-blend-difference text-white flex justify-between items-center"
        >
          <div className="w-48">
            <AnimatePresence>
              {showLogo && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl font-bold tracking-tighter uppercase font-mono"
                >
                  Digital<span className="text-[#00FF41]">Nest</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="hidden md:flex gap-8 items-center font-medium">
            {navItems.map((item, i) => {
              const isActive = activeSection === item.toLowerCase();
              return (
                <MagneticButton key={i}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className={`relative uppercase text-sm tracking-widest transition-colors ${
                      isActive ? 'text-[#00FF41]' : 'hover:text-[#00FF41]'
                    }`}
                  >
                    {item}
                    {/* Indicador ativo */}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#00FF41]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </MagneticButton>
              );
            })}
            <MagneticButton
              className={`border px-6 py-2 rounded-full transition-all ${
                activeSection === 'contato'
                  ? 'bg-[#00FF41] text-black border-[#00FF41]'
                  : 'border-white/20 hover:bg-[#00FF41] hover:text-black hover:border-[#00FF41]'
              }`}
            >
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
              {['Sobre', 'Serviços', 'Projetos', 'Contato'].map((item, i) => {
                const isActive = activeSection === item.toLowerCase();
                return (
                  <a
                    key={i}
                    href={`#${item.toLowerCase()}`}
                    className={`text-xl uppercase tracking-widest transition-colors ${
                      isActive ? 'text-[#00FF41]' : 'hover:text-[#00FF41]'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {isActive && <span className="mr-2">→</span>}
                    {item}
                  </a>
                );
              })}
            </motion.div>
          )}
        </motion.nav>
      )}
    </AnimatePresence>
  );
};
