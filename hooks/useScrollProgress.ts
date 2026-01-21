'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseScrollProgressOptions {
  target?: React.RefObject<HTMLElement>;
  start?: string;
  end?: string;
}

export function useScrollProgress(options: UseScrollProgressOptions = {}) {
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  const { target, start = 'top top', end = 'bottom bottom' } = options;

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: target?.current || document.body,
      start,
      end,
      scrub: true,
      onUpdate: (self) => {
        progressRef.current = self.progress;
        setProgress(self.progress);
      },
    });

    triggerRef.current = trigger;

    return () => {
      trigger.kill();
    };
  }, [target, start, end]);

  const getPhase = useCallback((progress: number) => {
    if (progress < 0.1) return 1; // Opening
    if (progress < 0.35) return 2; // Design
    if (progress < 0.65) return 3; // Development
    if (progress < 0.9) return 4; // Marketing
    return 5; // Landing
  }, []);

  return {
    progress,
    progressRef,
    phase: getPhase(progress),
    trigger: triggerRef.current,
  };
}
