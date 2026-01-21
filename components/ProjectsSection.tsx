'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const ProjectsSection = () => {
  const projects = [
    { name: 'Neon Future', cat: 'Web Design', color: 'bg-purple-900' },
    { name: 'Cyber Life', cat: 'App Dev', color: 'bg-blue-900' },
    { name: 'Green Energy', cat: 'Rebranding', color: 'bg-emerald-900' },
    { name: 'Dark Matter', cat: 'Marketing', color: 'bg-neutral-800' },
  ];

  return (
    <section id="projetos" className="bg-black text-white py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-6xl md:text-8xl font-black uppercase mb-24 tracking-tighter">
          Projetos <span className="text-[#00FF41]">*</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          {projects.map((proj, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`group relative aspect-[4/5] md:aspect-square ${
                i % 2 !== 0 ? 'md:mt-32' : ''
              }`}
            >
              <div
                className={`w-full h-full ${proj.color} rounded-lg overflow-hidden relative border border-white/10 group-hover:border-[#00FF41] transition-all duration-500`}
              >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30 mix-blend-overlay"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-4xl font-bold opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700">
                    {proj.name}
                  </h3>
                </div>
              </div>

              <div className="mt-6 flex justify-between items-center border-b border-white/20 pb-4 group-hover:border-[#00FF41] transition-colors">
                <div>
                  <h3 className="text-2xl font-bold uppercase">{proj.name}</h3>
                  <p className="text-sm text-gray-400 font-mono">{proj.cat}</p>
                </div>
                <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-[#00FF41] group-hover:text-black transition-all">
                  <ArrowRight className="-rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
