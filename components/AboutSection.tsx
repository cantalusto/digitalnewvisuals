'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Lightbulb, Shield, Zap, Users, Code, Palette, Terminal } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Número total de frames da animação
const TOTAL_FRAMES = 192;

// Gera array com paths das imagens
const getFramePath = (index: number) => {
  const paddedIndex = String(index).padStart(3, '0');
  const delay = index % 3 === 1 ? '041' : '042';
  return `/digitalanimation/frame_${paddedIndex}_delay-0.${delay}s.jpg`;
};

// Componente de contador animado
const AnimatedCounter = ({ value, suffix = '', duration = 2000 }: { value: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// Dados
const stats = [
  { value: 50, suffix: '+', label: 'Projetos Entregues' },
  { value: 30, suffix: '+', label: 'Clientes Satisfeitos' },
  { value: 4, suffix: '+', label: 'Anos de Experiência' },
  { value: 99, suffix: '%', label: 'Taxa de Satisfação' },
];

const valores = [
  {
    icon: Lightbulb,
    title: 'Inovação',
    description: 'Pensamos fora da caixa porque a caixa nos limita.',
  },
  {
    icon: Shield,
    title: 'Qualidade',
    description: 'Bom não é suficiente. Buscamos o excepcional.',
  },
  {
    icon: Zap,
    title: 'Agilidade',
    description: 'Velocidade com precisão. Entregamos no prazo, sempre.',
  },
  {
    icon: Users,
    title: 'Parceria',
    description: 'Seu projeto é nosso projeto. Crescemos juntos.',
  },
];

const timeline = [
  {
    year: '2023',
    title: 'O Início',
    subtitle: 'Onde tudo começou',
    description: 'Nascemos com uma ideia: fazer diferente. Uma agência que entende de código E de design. Começamos em uma garagem, com muito café e ainda mais ambição.',
    highlights: ['Primeira linha de código', 'Primeiro cliente', 'Muitas noites viradas'],
  },
  {
    year: '2024',
    title: 'Crescimento',
    subtitle: 'Expandindo horizontes',
    description: 'Primeiros grandes projetos entregues. Time expandindo, clientes multiplicando. Saímos da garagem e conquistamos nosso espaço.',
    highlights: ['10+ projetos entregues', 'Time de 3 pessoas', 'Primeiro projeto enterprise'],
  },
  {
    year: '2025',
    title: 'Consolidação',
    subtitle: 'Solidificando nossa presença',
    description: 'Expandimos nossa atuação e fortalecemos parcerias estratégicas. Nossa marca se tornou referência em soluções digitais inovadoras.',
    highlights: ['50+ projetos', '30+ clientes', 'Reconhecimento no mercado'],
  },
  {
    year: '2026',
    title: 'Hoje',
    subtitle: 'O presente é agora',
    description: 'Continuamos evoluindo e inovando. Cada dia é uma nova oportunidade de criar algo incrível. E isso é só o começo.',
    highlights: ['Novas tecnologias', 'Expansão internacional', 'O futuro é agora'],
  },
];

const equipe = [
  {
    name: 'Lucas Cantarelli',
    role: 'Lorem ipsum dolor',
    icon: Terminal,
    description: 'Visionário e hands-on. Transforma café em código.',
  },
  {
    name: 'Lucas Cantarelli',
    role: 'Lorem ipsum dolor',
    icon: Palette,
    description: 'Pixels perfeitos e experiências memoráveis.',
  },
  {
    name: 'Lucas Cantarelli',
    role: 'Full Stack Developer',
    icon: Code,
    description: 'Se existe API, ele integra. Se não existe, ele cria.',
  },
];

// Componente Timeline Fullscreen com Animação de Fundo
const TimelineSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const frameIndexRef = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configurar canvas para tela cheia
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();

    // Renderizar frame
    const renderFrame = (index: number) => {
      if (!ctx || !imagesRef.current[index]) return;

      const img = imagesRef.current[index];
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      // Cover behavior - centralizado
      const imgRatio = img.width / img.height;
      const canvasRatio = canvasWidth / canvasHeight;

      let drawWidth, drawHeight, drawX, drawY;

      if (imgRatio > canvasRatio) {
        drawHeight = canvasHeight;
        drawWidth = drawHeight * imgRatio;
        drawX = (canvasWidth - drawWidth) / 2;
        drawY = 0;
      } else {
        drawWidth = canvasWidth;
        drawHeight = drawWidth / imgRatio;
        drawX = 0;
        drawY = (canvasHeight - drawHeight) / 2;
      }

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    };

    // Pré-carregar imagens
    const loadImages = async () => {
      const images: HTMLImageElement[] = [];
      let loadedCount = 0;

      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = getFramePath(i);

        img.onload = () => {
          loadedCount++;
          if (loadedCount === TOTAL_FRAMES) {
            setIsLoaded(true);
            renderFrame(0);
          }
        };

        images.push(img);
      }

      imagesRef.current = images;
    };

    loadImages();

    // ScrollTrigger para controlar a animação e visibilidade do canvas
    ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3,
      onEnter: () => setIsActive(true),
      onLeave: () => setIsActive(false),
      onEnterBack: () => setIsActive(true),
      onLeaveBack: () => setIsActive(false),
      onUpdate: (self) => {
        const frameIndex = Math.min(
          Math.floor(self.progress * TOTAL_FRAMES),
          TOTAL_FRAMES - 1
        );
        if (frameIndex !== frameIndexRef.current) {
          frameIndexRef.current = frameIndex;
          renderFrame(frameIndex);
        }
      }
    });

    // Resize handler
    const handleResize = () => {
      updateCanvasSize();
      renderFrame(frameIndexRef.current);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative" style={{ height: `${timeline.length * 100}vh` }}>
      {/* Canvas FIXO no fundo - aparece apenas quando a timeline está ativa */}
      <div
        className={`fixed inset-0 w-full h-full overflow-hidden transition-opacity duration-500 pointer-events-none ${isActive && isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ zIndex: 40 }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />

        {/* Overlay escuro para legibilidade */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Header fixo */}
        <div className="absolute top-0 left-0 right-0 z-20 py-8 px-6">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <span className="text-sm uppercase tracking-[0.3em] text-gray-400">
              Nossa Jornada
            </span>
          </div>
        </div>
      </div>

      {/* Conteúdo das seções */}
      {timeline.map((item, i) => (
        <div
          key={i}
          className="h-screen flex items-center justify-center sticky top-0"
          style={{ zIndex: 50 }}
        >
          {/* Container Liquid Glass */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={{
              hidden: { opacity: 0, x: i % 2 === 0 ? -40 : 40, scale: 0.95 },
              visible: {
                opacity: 1,
                x: 0,
                scale: 1,
                transition: {
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                  staggerChildren: 0.1,
                }
              }
            }}
            className="relative z-10 text-center px-4 py-8 md:px-8 md:py-12 max-w-[95vw] md:max-w-3xl mx-auto rounded-2xl md:rounded-3xl
                       bg-white/5 backdrop-blur-xl border border-white/10
                       shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]"
          >
            {/* Reflexo superior (liquid glass effect) */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <div className="absolute inset-x-4 top-0 h-20 bg-gradient-to-b from-white/5 to-transparent rounded-t-3xl" />

            {/* Year badge */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 }
              }}
              className="inline-block mb-4 md:mb-6"
            >
              <span className="bg-[#00FF41] text-black px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-mono font-bold text-xl md:text-3xl
                             shadow-[0_0_30px_rgba(0,255,65,0.4)]">
                {item.year}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h3
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { opacity: 1, x: 0 }
              }}
              className="text-3xl md:text-7xl font-black mb-2 md:mb-4 tracking-tight text-white"
            >
              {item.title}
            </motion.h3>

            {/* Subtitle */}
            <motion.p
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 }
              }}
              className="text-[#00FF41] text-base md:text-2xl font-medium mb-4 md:mb-6"
            >
              {item.subtitle}
            </motion.p>

            {/* Description */}
            <motion.p
              variants={{
                hidden: { opacity: 0, x: -15 },
                visible: { opacity: 1, x: 0 }
              }}
              className="text-gray-300 text-sm md:text-xl leading-relaxed max-w-2xl mx-auto mb-6 md:mb-8"
            >
              {item.description}
            </motion.p>

            {/* Highlights */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -10 },
                visible: { opacity: 1, x: 0 }
              }}
              className="flex flex-wrap justify-center gap-2 md:gap-3"
            >
              {item.highlights.map((highlight, j) => (
                <span
                  key={j}
                  className="text-xs md:text-sm uppercase tracking-wider text-white
                             bg-white/10 backdrop-blur-md px-3 py-1.5 md:px-5 md:py-2 rounded-lg md:rounded-xl
                             border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                >
                  {highlight}
                </span>
              ))}
            </motion.div>

            {/* Brilho inferior */}
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export const AboutSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start end', 'end start'],
  });

  // Planeta com velocidade mais lenta
  const planetX = useTransform(heroProgress, [0.15, 0.85], ['-30%', '130%']);
  const planetRotate = useTransform(heroProgress, [0.15, 0.85], [0, 360]);
  const planetScale = useTransform(heroProgress, [0.15, 0.4, 0.6, 0.85], [0.8, 1.1, 1.1, 0.8]);

  // Parallax 3D para cada letra de "SOBRE"
  const sobreLetters = ['S', 'O', 'B', 'R', 'E'];
  const letterOffsets = [
    useTransform(heroProgress, [0, 0.5], [0, -60]),
    useTransform(heroProgress, [0, 0.5], [0, -40]),
    useTransform(heroProgress, [0, 0.5], [0, -20]),
    useTransform(heroProgress, [0, 0.5], [0, -50]),
    useTransform(heroProgress, [0, 0.5], [0, -30]),
  ];
  const letterScales = [
    useTransform(heroProgress, [0, 0.3], [1, 1.05]),
    useTransform(heroProgress, [0, 0.3], [1, 0.98]),
    useTransform(heroProgress, [0, 0.3], [1, 1.02]),
    useTransform(heroProgress, [0, 0.3], [1, 0.96]),
    useTransform(heroProgress, [0, 0.3], [1, 1.03]),
  ];

  return (
    <section
      id="sobre"
      ref={containerRef}
      className="bg-black text-white relative overflow-hidden"
    >
      {/* ========== BLOCO 1: HERO ========== */}
      <div ref={heroRef} className="min-h-screen flex flex-col items-center justify-center py-12 md:py-24">
        <div className="relative w-full max-w-7xl mx-auto flex flex-col items-center justify-center text-[18vw] md:text-[20vw] font-black leading-none tracking-tighter uppercase select-none">
          {/* Layer 1: "SOBRE" com Parallax 3D */}
          <div className="relative z-10 flex">
            {sobreLetters.map((letter, i) => (
              <motion.span
                key={i}
                style={{
                  y: letterOffsets[i],
                  scale: letterScales[i],
                }}
                className="text-white/90 inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Layer 2: Planet - Moves between layers */}
          <motion.div
            style={{
              left: planetX,
              rotate: planetRotate,
              scale: planetScale,
              zIndex: 20,
            }}
            className="absolute top-1/2 -translate-y-1/2 w-[35vw] h-[35vw] md:w-[25vw] md:h-[25vw] rounded-full bg-gradient-to-br from-[#00FF41] to-black shadow-[0_0_60px_rgba(0,255,65,0.4)] md:shadow-[0_0_100px_rgba(0,255,65,0.4)] border border-[#00FF41]/30 flex items-center justify-center backdrop-blur-sm"
          >
            <div className="w-[90%] h-[90%] rounded-full border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-50"></div>
              <div className="absolute top-2 left-2 md:top-4 md:left-4 w-2 h-2 md:w-4 md:h-4 bg-white rounded-full blur-[2px]"></div>
            </div>
          </motion.div>

          {/* Layer 3: Top Text */}
          <div className="relative z-30 text-transparent stroke-text-white">NÓS</div>
        </div>

        <div className="max-w-3xl text-center mt-8 md:mt-12 px-4 md:px-6 relative z-40">
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-base md:text-2xl font-light text-gray-400 leading-relaxed"
          >
            Não somos apenas uma agência. Somos{' '}
            <span className="text-white font-medium">arquitetos digitais</span> que transformam visões em realidade.
            Cada pixel, cada linha de código, cada interação é pensada para{' '}
            <span className="text-[#00FF41]">impactar</span>.
          </motion.p>
        </div>
      </div>

      {/* ========== BLOCO 2: ESTATÍSTICAS ========== */}
      <div className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-sm uppercase tracking-[0.3em] text-gray-500 mb-16"
          >
            Nossos Números
          </motion.h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl md:text-7xl font-black text-[#00FF41] mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm md:text-base text-gray-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ========== BLOCO 3: VALORES ========== */}
      <div className="py-24 px-6 bg-neutral-950">
        <div className="max-w-6xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-sm uppercase tracking-[0.3em] text-gray-500 mb-4"
          >
            O Que Nos Move
          </motion.h3>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-4xl md:text-5xl font-bold mb-16"
          >
            Nossos <span className="text-[#00FF41]">Valores</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valores.map((valor, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-2xl bg-neutral-900/50 border border-white/10 hover:border-[#00FF41] p-8 transition-all duration-500"
              >
                <div className="mb-6 text-[#00FF41] transition-transform duration-300 group-hover:scale-110">
                  <valor.icon size={40} strokeWidth={1.5} />
                </div>
                <h4 className="text-xl font-bold mb-3">{valor.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{valor.description}</p>

                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-[#00FF41]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ========== BLOCO 4: TIMELINE FULLSCREEN ========== */}
      <TimelineSection />

      {/* ========== BLOCO 5: EQUIPE ========== */}
      <div className="py-24 px-6 bg-neutral-950">
        <div className="max-w-6xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-sm uppercase tracking-[0.3em] text-gray-500 mb-4"
          >
            Quem Faz Acontecer
          </motion.h3>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-4xl md:text-5xl font-bold mb-16"
          >
            Nossa <span className="text-[#00FF41]">Equipe</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {equipe.map((membro, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-2xl bg-neutral-900/50 border border-white/10 hover:border-[#00FF41] overflow-hidden transition-all duration-500"
              >
                {/* Avatar placeholder */}
                <div className="h-48 bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center relative overflow-hidden">
                  <membro.icon
                    size={80}
                    strokeWidth={1}
                    className="text-white/20 group-hover:text-[#00FF41]/40 transition-colors duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent" />
                </div>

                {/* Info */}
                <div className="p-6">
                  <h4 className="text-xl font-bold mb-1">{membro.name}</h4>
                  <div className="text-[#00FF41] text-sm font-mono mb-3">{membro.role}</div>
                  <p className="text-gray-400 text-sm">{membro.description}</p>
                </div>

                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-[#00FF41]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
