'use client';

import { motion, MotionValue } from 'framer-motion';

interface CustomCursorProps {
  cursorX: MotionValue<number>;
  cursorY: MotionValue<number>;
}

export const CustomCursor = ({ cursorX, cursorY }: CustomCursorProps) => {
  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 bg-white rounded-full mix-blend-difference pointer-events-none z-[9999]"
      style={{ x: cursorX, y: cursorY }}
    />
  );
};
