'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code, Palette, Rocket, Zap } from 'lucide-react';

export const ServicesSection = () => {
  const targetRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-65%']);

  const services = [
    { title: 'Web Dev', desc: 'Sites ultrarresponsivos e rápidos.', icon: <Code size={48} /> },
    { title: 'UI/UX Design', desc: 'Interfaces que contam histórias.', icon: <Palette size={48} /> },
    { title: 'Marketing', desc: 'Estratégias de crescimento agressivo.', icon: <Rocket size={48} /> },
    { title: 'Branding', desc: 'Identidades visuais inesquecíveis.', icon: <Zap size={48} /> },
  ];

  return (
    <section ref={targetRef} id="serviços" className="relative h-[300vh] bg-[#0a0a0a]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="absolute top-10 left-10 text-white z-20">
          <h2 className="text-4xl font-bold uppercase text-[#00FF41]">
            Nossos <br /> Serviços
          </h2>
        </div>
        <motion.div style={{ x }} className="flex gap-10 pl-[20vw]">
          {services.map((service, i) => (
            <div
              key={i}
              className="group relative h-[60vh] w-[80vw] md:w-[40vw] flex-shrink-0 overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-800 hover:border-[#00FF41] transition-colors duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10" />
              <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                <span className="text-[20rem] font-bold text-neutral-800">{i + 1}</span>
              </div>
              <div className="relative z-20 h-full flex flex-col justify-end p-10">
                <div className="mb-6 text-[#00FF41]">{service.icon}</div>
                <h3 className="text-4xl font-bold text-white mb-4 uppercase">{service.title}</h3>
                <p className="text-xl text-gray-400">{service.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
