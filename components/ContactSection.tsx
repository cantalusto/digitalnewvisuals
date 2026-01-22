'use client';

import { MagneticButton } from './ui/MagneticButton';

export const ContactSection = () => {
  return (
    <section
      id="contato"
      className="bg-black text-white min-h-screen flex flex-col justify-between pt-20 md:pt-32 pb-8 md:pb-12 px-4 md:px-6"
    >
      <div className="max-w-5xl mx-auto w-full">
        <h2 className="text-3xl md:text-8xl font-black uppercase leading-[0.95] mb-8 md:mb-12">
          Tem uma ideia? <br />
          <span className="text-gray-600">Vamos criar.</span>
        </h2>

        <form className="space-y-6 md:space-y-8 mt-8 md:mt-12 w-full max-w-2xl">
          <div className="relative group">
            <input
              type="text"
              placeholder="Seu Nome"
              className="w-full bg-transparent border-b border-white/20 py-3 md:py-4 text-lg md:text-2xl focus:outline-none focus:border-[#00FF41] transition-colors placeholder:text-gray-700"
            />
          </div>
          <div className="relative group">
            <input
              type="email"
              placeholder="Seu Email"
              className="w-full bg-transparent border-b border-white/20 py-3 md:py-4 text-lg md:text-2xl focus:outline-none focus:border-[#00FF41] transition-colors placeholder:text-gray-700"
            />
          </div>
          <div className="relative group">
            <textarea
              placeholder="Fale sobre seu projeto"
              rows={3}
              className="w-full bg-transparent border-b border-white/20 py-3 md:py-4 text-lg md:text-2xl focus:outline-none focus:border-[#00FF41] transition-colors placeholder:text-gray-700 resize-none"
            />
          </div>

          <MagneticButton className="inline-block mt-6 md:mt-8">
            <span className="bg-white text-black text-base md:text-xl font-bold px-8 py-4 md:px-12 md:py-6 rounded-full hover:bg-[#00FF41] transition-colors duration-300 inline-block">
              Enviar Mensagem
            </span>
          </MagneticButton>
        </form>
      </div>

      <div className="w-full flex flex-col md:flex-row justify-between items-center md:items-end gap-4 md:gap-0 border-t border-white/10 pt-6 md:pt-8 mt-16 md:mt-24 text-gray-500 text-xs md:text-sm uppercase">
        <div>&copy; 2026 DigitalNest Agency</div>
        <div className="flex gap-4 md:gap-6">
          <a href="#" className="hover:text-[#00FF41] transition-colors">
            Instagram
          </a>
          <a href="#" className="hover:text-[#00FF41] transition-colors">
            LinkedIn
          </a>
          <a href="#" className="hover:text-[#00FF41] transition-colors">
            Twitter
          </a>
        </div>
      </div>
    </section>
  );
};
