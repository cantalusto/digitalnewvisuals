'use client';

import { MagneticButton } from './ui/MagneticButton';

export const ContactSection = () => {
  return (
    <section
      id="contato"
      className="bg-black text-white min-h-screen flex flex-col justify-between pt-32 pb-12 px-6"
    >
      <div className="max-w-5xl mx-auto w-full">
        <h2 className="text-5xl md:text-8xl font-black uppercase leading-[0.9] mb-12">
          Tem uma ideia? <br />
          <span className="text-gray-600">Vamos criar.</span>
        </h2>

        <form className="space-y-8 mt-12 w-full max-w-2xl">
          <div className="relative group">
            <input
              type="text"
              placeholder="Seu Nome"
              className="w-full bg-transparent border-b border-white/20 py-4 text-2xl focus:outline-none focus:border-[#00FF41] transition-colors placeholder:text-gray-700"
            />
          </div>
          <div className="relative group">
            <input
              type="email"
              placeholder="Seu Email"
              className="w-full bg-transparent border-b border-white/20 py-4 text-2xl focus:outline-none focus:border-[#00FF41] transition-colors placeholder:text-gray-700"
            />
          </div>
          <div className="relative group">
            <textarea
              placeholder="Fale sobre seu projeto"
              rows={4}
              className="w-full bg-transparent border-b border-white/20 py-4 text-2xl focus:outline-none focus:border-[#00FF41] transition-colors placeholder:text-gray-700 resize-none"
            />
          </div>

          <MagneticButton className="inline-block mt-8">
            <span className="bg-white text-black text-xl font-bold px-12 py-6 rounded-full hover:bg-[#00FF41] transition-colors duration-300 inline-block">
              Enviar Mensagem
            </span>
          </MagneticButton>
        </form>
      </div>

      <div className="w-full flex justify-between items-end border-t border-white/10 pt-8 mt-24 text-gray-500 text-sm uppercase">
        <div>&copy; 2026 DigitalNest Agency</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-[#00FF41]">
            Instagram
          </a>
          <a href="#" className="hover:text-[#00FF41]">
            LinkedIn
          </a>
          <a href="#" className="hover:text-[#00FF41]">
            Twitter
          </a>
        </div>
      </div>
    </section>
  );
};
