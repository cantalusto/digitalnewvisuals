'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Code, Palette, Rocket, Zap, X, Check, ArrowRight, Sparkles } from 'lucide-react';

// Dados detalhados dos serviços
const services = [
  {
    id: 'web-dev',
    title: 'Web Dev',
    desc: 'Sites ultrarresponsivos e rápidos.',
    icon: Code,
    color: '#00FF41',
    fullTitle: 'Desenvolvimento Web',
    tagline: 'Código que performa. Design que converte.',
    description: 'Criamos experiências web que não apenas impressionam visualmente, mas também entregam resultados. Cada linha de código é otimizada para velocidade, SEO e conversão.',
    benefits: [
      'Sites até 3x mais rápidos que a média do mercado',
      'SEO técnico avançado integrado desde o início',
      'Design responsivo pixel-perfect em todos dispositivos',
      'Código limpo e escalável para crescer com você',
    ],
    features: [
      { title: 'Next.js & React', desc: 'Tecnologias de ponta para máxima performance' },
      { title: 'Animações Fluidas', desc: 'Microinterações que encantam seus usuários' },
      { title: 'CMS Integrado', desc: 'Edite seu conteúdo sem precisar de desenvolvedor' },
      { title: 'Analytics Avançado', desc: 'Dados em tempo real sobre seu público' },
    ],
    stats: [
      { value: '99', label: 'PageSpeed Score' },
      { value: '< 1s', label: 'Load Time' },
      { value: '100%', label: 'Responsivo' },
    ],
  },
  {
    id: 'design',
    title: 'UI/UX Design',
    desc: 'Interfaces que contam histórias.',
    icon: Palette,
    color: '#FF6B6B',
    fullTitle: 'UI/UX Design',
    tagline: 'Design que conecta. Experiências que marcam.',
    description: 'Transformamos ideias complexas em interfaces intuitivas e memoráveis. Nosso processo de design é centrado no usuário, garantindo que cada interação seja natural e prazerosa.',
    benefits: [
      'Aumento médio de 40% na taxa de conversão',
      'Redução de 60% no tempo de onboarding',
      'Design system completo e documentado',
      'Testes de usabilidade incluídos',
    ],
    features: [
      { title: 'Research & Discovery', desc: 'Entendemos seu público antes de desenhar' },
      { title: 'Wireframes & Protótipos', desc: 'Validação rápida antes do desenvolvimento' },
      { title: 'Design System', desc: 'Componentes reutilizáveis e consistentes' },
      { title: 'Handoff Perfeito', desc: 'Documentação completa para desenvolvedores' },
    ],
    stats: [
      { value: '+40%', label: 'Conversão' },
      { value: '5/5', label: 'Satisfação' },
      { value: '< 3s', label: 'Decisão UX' },
    ],
  },
  {
    id: 'marketing',
    title: 'Marketing',
    desc: 'Estratégias de crescimento agressivo.',
    icon: Rocket,
    color: '#845EF7',
    fullTitle: 'Marketing Digital',
    tagline: 'Crescimento real. Resultados mensuráveis.',
    description: 'Desenvolvemos estratégias de marketing digital baseadas em dados que geram crescimento sustentável. De tráfego pago a SEO orgânico, cada centavo investido é rastreado e otimizado.',
    benefits: [
      'ROI médio de 300% em campanhas',
      'Estratégias personalizadas para seu nicho',
      'Relatórios transparentes e detalhados',
      'Otimização contínua baseada em dados',
    ],
    features: [
      { title: 'Google & Meta Ads', desc: 'Campanhas que convertem, não só impressionam' },
      { title: 'SEO Orgânico', desc: 'Tráfego qualificado que não para de crescer' },
      { title: 'Email Marketing', desc: 'Automações que nutrem e convertem leads' },
      { title: 'Social Media', desc: 'Conteúdo estratégico que engaja' },
    ],
    stats: [
      { value: '300%', label: 'ROI Médio' },
      { value: '+50k', label: 'Leads/mês' },
      { value: '24/7', label: 'Monitoramento' },
    ],
  },
  {
    id: 'branding',
    title: 'Branding',
    desc: 'Identidades visuais inesquecíveis.',
    icon: Zap,
    color: '#FFA94D',
    fullTitle: 'Branding & Identidade',
    tagline: 'Marcas que inspiram. Identidades que perduram.',
    description: 'Construímos marcas que vão além do logo. Criamos identidades visuais completas que comunicam os valores da sua empresa e criam conexões emocionais com seu público.',
    benefits: [
      'Identidade visual única e memorável',
      'Manual de marca completo e detalhado',
      'Aplicações em todos os pontos de contato',
      'Posicionamento estratégico de mercado',
    ],
    features: [
      { title: 'Logo & Símbolo', desc: 'Marca visual que representa sua essência' },
      { title: 'Paleta & Tipografia', desc: 'Sistema visual coeso e flexível' },
      { title: 'Tom de Voz', desc: 'Personalidade consistente em toda comunicação' },
      { title: 'Brand Guidelines', desc: 'Manual completo para uso correto da marca' },
    ],
    stats: [
      { value: '100%', label: 'Original' },
      { value: '∞', label: 'Escalável' },
      { value: '+5 anos', label: 'Durabilidade' },
    ],
  },
];

// Componente do Card Expandido
const ExpandedCard = ({
  service,
  onClose
}: {
  service: typeof services[0];
  onClose: () => void;
}) => {
  const Icon = service.icon;

  return (
    <motion.div
      layoutId={`card-${service.id}`}
      className="fixed inset-0 z-[100] overflow-y-auto bg-[#0a0a0a]"
      initial={{ borderRadius: 24 }}
      animate={{ borderRadius: 0 }}
      exit={{ borderRadius: 24 }}
      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
    >
      {/* Botão Fechar */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ delay: 0.3 }}
        onClick={onClose}
        className="fixed top-4 right-4 md:top-6 md:right-6 z-[110] p-2 md:p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors"
      >
        <X size={20} className="md:w-6 md:h-6 text-white" />
      </motion.button>

      {/* Header com gradiente */}
      <div
        className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden"
        style={{
          background: `radial-gradient(ellipse at center, ${service.color}15 0%, transparent 70%)`
        }}
      >
        {/* Partículas animadas - menos no mobile */}
        <div className="absolute inset-0 hidden md:block">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                backgroundColor: service.color,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Ícone grande animado */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
          animate={{ opacity: 0.1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          className="absolute"
          style={{ color: service.color }}
        >
          <Icon className="w-[200px] h-[200px] md:w-[400px] md:h-[400px]" strokeWidth={0.5} />
        </motion.div>

        {/* Conteúdo do header */}
        <div className="relative z-10 text-center px-4 md:px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full mb-4 md:mb-6"
            style={{ backgroundColor: `${service.color}20`, border: `1px solid ${service.color}40` }}
          >
            <Icon size={14} className="md:w-[18px] md:h-[18px]" style={{ color: service.color }} />
            <span style={{ color: service.color }} className="text-xs md:text-sm font-medium uppercase tracking-wider">
              {service.title}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-3xl md:text-7xl font-black text-white mb-4 md:mb-6"
          >
            {service.fullTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-base md:text-2xl text-gray-400"
          >
            {service.tagline}
          </motion.p>
        </div>

        {/* Gradiente inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      </div>

      {/* Conteúdo Principal */}
      <div className="relative z-10 px-4 md:px-6 pb-16 md:pb-24 -mt-12 md:-mt-16">
        <div className="max-w-6xl mx-auto">

          {/* Descrição */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mb-12 md:mb-20"
          >
            <p className="text-base md:text-2xl text-gray-300 leading-relaxed max-w-3xl">
              {service.description}
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="grid grid-cols-3 gap-3 md:gap-6 mb-12 md:mb-20"
          >
            {service.stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                className="text-center p-3 md:p-6 rounded-xl md:rounded-2xl bg-white/5 border border-white/10"
              >
                <div
                  className="text-xl md:text-5xl font-black mb-1 md:mb-2"
                  style={{ color: service.color }}
                >
                  {stat.value}
                </div>
                <div className="text-gray-400 text-[10px] md:text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Por que contratar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mb-12 md:mb-20"
          >
            <h2 className="text-xl md:text-4xl font-bold text-white mb-6 md:mb-10 flex items-center gap-2 md:gap-4">
              <Sparkles size={20} className="md:w-6 md:h-6" style={{ color: service.color }} />
              Por que nos escolher?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {service.benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
                  className="flex items-start gap-3 md:gap-4 p-3 md:p-5 rounded-lg md:rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
                >
                  <div
                    className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${service.color}20` }}
                  >
                    <Check size={14} className="md:w-[18px] md:h-[18px]" style={{ color: service.color }} />
                  </div>
                  <span className="text-gray-300 text-sm md:text-lg">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mb-12 md:mb-20"
          >
            <h2 className="text-xl md:text-4xl font-bold text-white mb-6 md:mb-10">
              O que está incluído
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {service.features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 + i * 0.1, duration: 0.5 }}
                  className="group p-4 md:p-6 rounded-xl md:rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-white/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-3 md:gap-4">
                    <div
                      className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${service.color}20` }}
                    >
                      <ArrowRight size={18} className="md:w-6 md:h-6" style={{ color: service.color }} />
                    </div>
                    <div>
                      <h3 className="text-base md:text-xl font-bold text-white mb-1 md:mb-2">{feature.title}</h3>
                      <p className="text-gray-400 text-sm md:text-base">{feature.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="text-center"
          >
            <motion.a
              href="#contato"
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 md:gap-3 px-6 py-4 md:px-10 md:py-5 rounded-full text-black font-bold text-base md:text-lg transition-all"
              style={{ backgroundColor: service.color }}
            >
              Começar Projeto
              <ArrowRight size={18} className="md:w-5 md:h-5" />
            </motion.a>
            <p className="text-gray-500 mt-3 md:mt-4 text-xs md:text-sm">
              Resposta em até 24 horas
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export const ServicesSection = () => {
  const targetRef = useRef<HTMLElement>(null);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-65%']);

  return (
    <>
      <section ref={targetRef} id="serviços" className="relative h-[200vh] md:h-[300vh] bg-[#0a0a0a]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="absolute top-20 md:top-24 left-4 md:left-10 text-white z-20">
            <h2 className="text-2xl md:text-4xl font-bold uppercase text-[#00FF41]">
              Nossos <br /> Serviços
            </h2>
          </div>
          <motion.div style={{ x }} className="flex gap-4 md:gap-10 pl-[15vw] md:pl-[20vw]">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  layoutId={`card-${service.id}`}
                  onClick={() => setSelectedService(service)}
                  className="group relative h-[55vh] md:h-[60vh] w-[85vw] md:w-[40vw] flex-shrink-0 overflow-hidden rounded-2xl md:rounded-3xl bg-neutral-900 border border-neutral-800 hover:border-[#00FF41] transition-colors duration-500 cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                    <span className="text-[10rem] md:text-[20rem] font-bold text-neutral-800">{i + 1}</span>
                  </div>

                  {/* Glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at center, ${service.color}10 0%, transparent 70%)`
                    }}
                  />

                  <div className="relative z-20 h-full flex flex-col justify-end p-6 md:p-10">
                    <div className="mb-4 md:mb-6 text-[#00FF41]">
                      <Icon size={36} className="md:w-12 md:h-12" />
                    </div>
                    <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4 uppercase">{service.title}</h3>
                    <p className="text-base md:text-xl text-gray-400 mb-4 md:mb-6">{service.desc}</p>

                    {/* Botão Saiba Mais - sempre visível no mobile, hover no desktop */}
                    <div className="overflow-hidden">
                      <button
                        className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-[#00FF41] text-black font-bold rounded-full text-sm md:text-base
                                   opacity-100 md:opacity-0 md:group-hover:opacity-100 translate-y-0 md:translate-y-4 md:group-hover:translate-y-0
                                   transition-all duration-300 hover:scale-105 active:scale-95"
                      >
                        Saiba mais
                        <ArrowRight size={16} className="md:w-[18px] md:h-[18px]" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Card Expandido */}
      <AnimatePresence>
        {selectedService && (
          <ExpandedCard
            service={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};
