'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code, Palette, Terminal } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
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

// SVG icon components for process steps
const SearchIcon = ({ stroke = 'currentColor' }: { stroke?: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const TargetIcon = ({ stroke = 'currentColor' }: { stroke?: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const PenToolIcon = ({ stroke = 'currentColor' }: { stroke?: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 19 7-7 3 3-7 7-3-3z" />
    <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
    <path d="m2 2 7.586 7.586" />
    <circle cx="11" cy="11" r="2" />
  </svg>
);

const TerminalIcon = ({ stroke = 'currentColor' }: { stroke?: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" x2="20" y1="19" y2="19" />
  </svg>
);

const RocketIcon = ({ stroke = 'currentColor' }: { stroke?: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

// Dados do processo de trabalho
const processSteps = [
  {
    number: '01',
    title: 'Discovery',
    shortTitle: 'Discovery',
    icon: SearchIcon,
    description: 'Entendemos seu negócio, objetivos e público-alvo para criar a base do projeto.',
    deliverables: ['Briefing completo', 'Análise de mercado', 'Definição de personas', 'Benchmark competitivo'],
  },
  {
    number: '02',
    title: 'Estratégia',
    shortTitle: 'Estratégia',
    icon: TargetIcon,
    description: 'Planejamos cada passo do projeto com precisão cirúrgica.',
    deliverables: ['Roadmap do projeto', 'Arquitetura de informação', 'Wireframes', 'Cronograma'],
  },
  {
    number: '03',
    title: 'Design',
    shortTitle: 'Design',
    icon: PenToolIcon,
    description: 'Criamos a identidade visual e interfaces que encantam.',
    deliverables: ['Design System', 'UI/UX Design', 'Protótipos interativos', 'Brand guidelines'],
  },
  {
    number: '04',
    title: 'Desenvolvimento',
    shortTitle: 'Dev',
    icon: TerminalIcon,
    description: 'Transformamos design em código limpo e performático.',
    deliverables: ['Frontend responsivo', 'Backend escalável', 'Integrações API', 'Testes automatizados'],
  },
  {
    number: '05',
    title: 'Lançamento',
    shortTitle: 'Launch',
    icon: RocketIcon,
    description: 'Deploy, testes finais e acompanhamento pós-lançamento.',
    deliverables: ['Deploy em produção', 'Testes de performance', 'Monitoramento', 'Suporte contínuo'],
  },
];

// Componente ProcessSection
const ProcessSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const orbitPathRef = useRef<SVGPathElement>(null);
  const nodeRefs = useRef<(SVGGElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const orbitRadius = isMobile ? 100 : 150;
  const svgSize = isMobile ? 340 : 460;
  const centerX = svgSize / 2;
  const centerY = svgSize / 2;

  const getPointPos = (index: number) => {
    const angle = ((2 * Math.PI) / processSteps.length) * index - Math.PI / 2;
    return {
      x: centerX + orbitRadius * Math.cos(angle),
      y: centerY + orbitRadius * Math.sin(angle),
      angle,
    };
  };

  // Get label position: pushed outward from center along the node's angle
  const getLabelPos = (index: number, nodeR: number) => {
    const { angle } = getPointPos(index);
    const labelDist = orbitRadius + nodeR + 16;
    return {
      x: centerX + labelDist * Math.cos(angle),
      y: centerY + labelDist * Math.sin(angle),
    };
  };

  const buildOrbitPath = () => {
    const points = processSteps.map((_, i) => getPointPos(i));
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      d += ` L ${points[i].x} ${points[i].y}`;
    }
    d += ' Z';
    return d;
  };

  // Build progress path — open polyline from node 0 to the active node
  const buildProgressPath = () => {
    if (activeStep === 0) return '';
    const points = processSteps.map((_, i) => getPointPos(i));
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i <= activeStep; i++) {
      d += ` L ${points[i].x} ${points[i].y}`;
    }
    return d;
  };

  // Entrance + scroll + exit animations via GSAP
  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    // --- Entrance animation timeline ---
    const enterTl = gsap.timeline({ paused: true });

    // 1. Header slides down
    if (headerRef.current) {
      enterTl.fromTo(
        headerRef.current,
        { opacity: 0, y: -40 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        0
      );
    }

    // 2. Orbit path draws itself
    if (orbitPathRef.current) {
      const pathLength = orbitPathRef.current.getTotalLength();
      gsap.set(orbitPathRef.current, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });
      enterTl.to(
        orbitPathRef.current,
        { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut' },
        0.2
      );
    }

    // 3. Nodes pop in sequentially
    nodeRefs.current.forEach((node, i) => {
      if (!node) return;
      gsap.set(node, { opacity: 0, scale: 0, transformOrigin: 'center center' });
      enterTl.to(
        node,
        { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' },
        0.4 + i * 0.12
      );
    });

    // 4. Content panel slides in
    if (contentRef.current) {
      enterTl.fromTo(
        contentRef.current,
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' },
        0.8
      );
    }

    // --- ScrollTrigger: entrance trigger ---
    ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        setHasEntered(true);
        enterTl.play();
      },
    });

    // Scroll area: first 85% is for stepping, last 15% is for exit animation
    const totalStepRange = 0.85;

    // --- ScrollTrigger: pin + step control + exit ---
    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${(processSteps.length + 1) * 100}%`,
      pin: pin,
      scrub: 0.5,
      onUpdate: (self) => {
        setScrollProgress(self.progress);

        // Steps advance within the first 85% of scroll
        if (self.progress <= totalStepRange) {
          const stepProgress = self.progress / totalStepRange;
          const step = Math.min(
            Math.floor(stepProgress * processSteps.length),
            processSteps.length - 1
          );
          setActiveStep(step);
        }

        // Exit animation: last 15% — scale down, fade out, blur
        const exitProgress = Math.max(0, (self.progress - totalStepRange) / (1 - totalStepRange));
        if (pin) {
          if (exitProgress > 0) {
            const scale = 1 - exitProgress * 0.15;
            const opacity = 1 - exitProgress;
            const blur = exitProgress * 20;
            pin.style.transform = `scale(${scale})`;
            pin.style.opacity = `${opacity}`;
            pin.style.filter = `blur(${blur}px)`;
          } else {
            pin.style.transform = '';
            pin.style.opacity = hasEntered ? '1' : '0';
            pin.style.filter = '';
          }
        }
      },
    });

    return () => {
      enterTl.kill();
      st.kill();
    };
  }, [isMobile, orbitRadius, centerX, centerY, hasEntered]); // eslint-disable-line react-hooks/exhaustive-deps

  const currentStep = processSteps[activeStep];
  const isLastStep = activeStep === processSteps.length - 1;
  const closingPathRef = useRef<SVGPathElement>(null);
  const celebrationRef = useRef<SVGGElement>(null);
  const glowRingRef = useRef<SVGPathElement>(null);
  const celebrationRan = useRef(false);

  // Build closing segment: from last node back to first node
  const buildClosingPath = () => {
    const lastPos = getPointPos(processSteps.length - 1);
    const firstPos = getPointPos(0);
    return `M ${lastPos.x} ${lastPos.y} L ${firstPos.x} ${firstPos.y}`;
  };

  // Calculate closing path length for animation
  const closingPathLengthCalc = () => {
    const lastPos = getPointPos(processSteps.length - 1);
    const firstPos = getPointPos(0);
    return Math.sqrt(Math.pow(firstPos.x - lastPos.x, 2) + Math.pow(firstPos.y - lastPos.y, 2));
  };
  const closingPathLength = closingPathLengthCalc();

  // GSAP celebration animation when reaching last step
  useEffect(() => {
    if (!isLastStep || celebrationRan.current) return;
    celebrationRan.current = true;

    const tl = gsap.timeline();

    // 1. Animate closing path drawing
    if (closingPathRef.current) {
      const len = closingPathLength;
      gsap.set(closingPathRef.current, { strokeDasharray: len, strokeDashoffset: len });
      tl.to(closingPathRef.current, { strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut' }, 0);
    }

    // 2. Glow ring pulses
    if (glowRingRef.current) {
      tl.fromTo(glowRingRef.current,
        { opacity: 0 },
        { opacity: 0.6, duration: 0.5, ease: 'power2.in' },
        0.4
      );
      tl.to(glowRingRef.current, { opacity: 0.2, duration: 1.5, ease: 'power2.out', yoyo: true, repeat: 2 }, 0.9);
    }

    // 3. Burst particles
    if (celebrationRef.current) {
      const particles = celebrationRef.current.querySelectorAll('.burst-particle');
      particles.forEach((p, i) => {
        tl.fromTo(p,
          { opacity: 0, scale: 0, transformOrigin: 'center center' },
          { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(3)' },
          0.6 + i * 0.06
        );
        tl.to(p,
          { opacity: 0, scale: 0.5, duration: 0.6, ease: 'power2.in' },
          1.2 + i * 0.04
        );
      });
    }

    return () => { tl.kill(); };
  }, [isLastStep, closingPathLength]); // eslint-disable-line react-hooks/exhaustive-deps

  // Reset celebration flag when leaving last step
  useEffect(() => {
    if (!isLastStep) {
      celebrationRan.current = false;
    }
  }, [isLastStep]);

  return (
    <div ref={sectionRef} style={{ height: `${(processSteps.length + 1) * 100}vh` }}>
      <div
        ref={pinRef}
        className="h-screen bg-black flex flex-col md:flex-row items-center justify-center px-4 md:px-6 overflow-hidden relative"
        style={{ opacity: hasEntered ? 1 : 0, willChange: 'transform, opacity, filter' }}
      >
        {/* Section header */}
        <div ref={headerRef} className="absolute top-8 left-0 right-0 z-10 text-center" style={{ opacity: 0 }}>
          <span className="text-sm uppercase tracking-[0.3em] text-gray-500">
            Nosso Processo
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-2">
            Como <span className="text-[#00FF41]">Trabalhamos</span>
          </h2>
        </div>

        {/* Orbital SVG */}
        <div ref={svgContainerRef} className="relative flex-shrink-0 mt-24 md:mt-0">
          <svg
            width={svgSize}
            height={svgSize}
            viewBox={`0 0 ${svgSize} ${svgSize}`}
            className="select-none"
          >
            {/* === Layer 1: Lines (behind everything) === */}
            {/* Orbit ring (background) — draws itself on entrance */}
            <path
              ref={orbitPathRef}
              d={buildOrbitPath()}
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />

            {/* Progress line — green, segment-based, follows active step */}
            {activeStep > 0 && (
              <path
                d={buildProgressPath()}
                fill="none"
                stroke="#00FF41"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-700 ease-in-out"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(0,255,65,0.4))',
                }}
              />
            )}

            {/* Celebration: closing segment from last node back to first when on last step */}
            {isLastStep && (
              <path
                ref={closingPathRef}
                d={buildClosingPath()}
                fill="none"
                stroke="#00FF41"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  filter: 'drop-shadow(0 0 12px rgba(0,255,65,0.6))',
                }}
              />
            )}

            {/* === Layer 2: Nodes (on top of lines) === */}
            {/* Celebration: burst particles + glow ring when orbit completes */}
            {isLastStep && (
              <>
                <path
                  ref={glowRingRef}
                  d={buildOrbitPath()}
                  fill="none"
                  stroke="#00FF41"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  opacity="0"
                  style={{ filter: 'drop-shadow(0 0 16px rgba(0,255,65,0.8)) drop-shadow(0 0 4px rgba(0,255,65,1))' }}
                />
                <g ref={celebrationRef}>
                  {Array.from({ length: 12 }).map((_, pi) => {
                    const burstAngle = (2 * Math.PI / 12) * pi;
                    const burstR = orbitRadius + 40;
                    const bx = centerX + burstR * Math.cos(burstAngle);
                    const by = centerY + burstR * Math.sin(burstAngle);
                    return (
                      <circle
                        key={`burst-${pi}`}
                        className="burst-particle"
                        cx={bx}
                        cy={by}
                        r="3"
                        fill="#00FF41"
                        opacity="0"
                        style={{ filter: 'drop-shadow(0 0 6px rgba(0,255,65,0.8))' }}
                      />
                    );
                  })}
                </g>
              </>
            )}

            {processSteps.map((step, i) => {
              const pos = getPointPos(i);
              const isActive = i === activeStep;
              const isPast = i < activeStep;
              const IconComponent = step.icon;
              const nodeR = isActive ? 28 : 22;

              return (
                <g
                  key={i}
                  ref={(el) => { nodeRefs.current[i] = el; }}
                  onClick={() => setActiveStep(i)}
                  className="cursor-pointer"
                  style={{ opacity: 0 }}
                >
                  {/* Outer pulse rings for active */}
                  {isActive && (
                    <>
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={42}
                        fill="none"
                        stroke="rgba(0,255,65,0.15)"
                        strokeWidth="1"
                        className="animate-ping"
                        style={{ animationDuration: '2s' }}
                      />
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={36}
                        fill="rgba(0,255,65,0.08)"
                      />
                    </>
                  )}

                  {/* Background fill to cover lines behind the node */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={nodeR + 2}
                    fill="#000000"
                    stroke="none"
                  />

                  {/* Node circle */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={nodeR}
                    fill={isActive ? '#00FF41' : isPast ? 'rgba(0,255,65,0.15)' : 'rgba(255,255,255,0.04)'}
                    stroke={isActive ? '#00FF41' : isPast ? 'rgba(0,255,65,0.6)' : 'rgba(255,255,255,0.12)'}
                    strokeWidth={isActive ? 2.5 : 1}
                    className="transition-all duration-500"
                    style={isActive ? {
                      filter: 'drop-shadow(0 0 16px rgba(0,255,65,0.7)) drop-shadow(0 0 4px rgba(0,255,65,0.9))',
                    } : isPast ? {
                      filter: 'drop-shadow(0 0 4px rgba(0,255,65,0.2))',
                    } : {}}
                  />

                  {/* SVG Icon centered in node */}
                  <foreignObject
                    x={pos.x - 8}
                    y={pos.y - 8}
                    width={16}
                    height={16}
                    className="pointer-events-none"
                  >
                    <div className="flex items-center justify-center w-full h-full">
                      <IconComponent
                        stroke={isActive ? '#000000' : isPast ? '#00FF41' : 'rgba(255,255,255,0.35)'}
                      />
                    </div>
                  </foreignObject>

                  {/* Short title positioned outward from center */}
                  {(() => {
                    const labelPos = getLabelPos(i, nodeR);
                    return (
                      <text
                        x={labelPos.x}
                        y={labelPos.y}
                        textAnchor="middle"
                        dominantBaseline="central"
                        className="pointer-events-none select-none transition-all duration-500"
                        fill={isActive ? '#00FF41' : isPast ? 'rgba(0,255,65,0.7)' : 'rgba(255,255,255,0.25)'}
                        fontSize={isMobile ? '7' : '8'}
                        fontWeight="600"
                        style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}
                      >
                        {step.shortTitle}
                      </text>
                    );
                  })()}
                </g>
              );
            })}

            {/* Center content (desktop only) */}
            <foreignObject
              x={centerX - 80}
              y={centerY - 50}
              width={160}
              height={100}
              className="hidden md:block pointer-events-none"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, scale: 0.85, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 1.1, filter: 'blur(8px)' }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center justify-center h-full text-center"
                >
                  <span className="text-[#00FF41] font-mono text-xs tracking-widest mb-1">
                    ETAPA {currentStep.number}
                  </span>
                  <span className="text-white font-bold text-base leading-tight">
                    {currentStep.title}
                  </span>
                </motion.div>
              </AnimatePresence>
            </foreignObject>
          </svg>
        </div>

        {/* Content panel */}
        <div ref={contentRef} className="md:ml-12 mt-6 md:mt-0 max-w-md w-full" style={{ opacity: 0 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Mobile step indicator */}
              <div className="md:hidden mb-3">
                <span className="text-[#00FF41] font-mono text-sm tracking-widest">
                  ETAPA {currentStep.number}
                </span>
              </div>

              <h3 className="text-2xl md:text-4xl font-bold mb-3 text-white">
                {currentStep.title}
              </h3>

              <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6">
                {currentStep.description}
              </p>

              {/* Deliverables */}
              <div className="space-y-2.5">
                <span className="text-xs uppercase tracking-[0.2em] text-gray-600 block mb-3">
                  Entregáveis
                </span>
                {currentStep.deliverables.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.08, ease: 'easeOut' }}
                    className="flex items-center gap-3 text-sm text-gray-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00FF41] flex-shrink-0 shadow-[0_0_6px_rgba(0,255,65,0.6)]" />
                    {item}
                  </motion.div>
                ))}
              </div>

              {/* Step dots indicator */}
              <div className="flex gap-2 mt-8">
                {processSteps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === activeStep
                        ? 'w-8 bg-[#00FF41] shadow-[0_0_8px_rgba(0,255,65,0.5)]'
                        : i < activeStep
                          ? 'w-3 bg-[#00FF41]/40'
                          : 'w-3 bg-white/10'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

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

      {/* ========== BLOCO 2: PROCESSO DE TRABALHO ORBITAL ========== */}
      <ProcessSection />

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
