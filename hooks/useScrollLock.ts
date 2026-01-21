'use client';

import { useEffect, useState, useCallback } from 'react';

export const useScrollLock = (duration: number = 3000) => {
  const [isLocked, setIsLocked] = useState(true);
  const [animationProgress, setAnimationProgress] = useState(0);

  const unlock = useCallback(() => {
    setIsLocked(false);
    document.body.style.overflow = 'auto';
  }, []);

  useEffect(() => {
    // Lock scroll on mount
    document.body.style.overflow = 'hidden';

    // Track wheel events to simulate animation progress
    let accumulatedScroll = 0;
    const maxScroll = 1000; // Total "virtual" scroll needed to complete animation

    const handleWheel = (e: WheelEvent) => {
      if (!isLocked) return;

      e.preventDefault();
      accumulatedScroll += Math.abs(e.deltaY);

      const progress = Math.min(accumulatedScroll / maxScroll, 1);
      setAnimationProgress(progress);

      if (progress >= 1) {
        unlock();
      }
    };

    // Also handle touch for mobile
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (!isLocked) return;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isLocked) return;

      e.preventDefault();
      const touchY = e.touches[0].clientY;
      const deltaY = Math.abs(touchStartY - touchY);
      accumulatedScroll += deltaY;
      touchStartY = touchY;

      const progress = Math.min(accumulatedScroll / maxScroll, 1);
      setAnimationProgress(progress);

      if (progress >= 1) {
        unlock();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isLocked, unlock]);

  return { isLocked, animationProgress, unlock };
};
