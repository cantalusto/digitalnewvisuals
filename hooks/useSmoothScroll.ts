'use client';

import { useEffect } from 'react';

export const useSmoothScroll = () => {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);
};
