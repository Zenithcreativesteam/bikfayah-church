'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface RevealOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
  className?: string;
  once?: boolean;
}

export default function RevealOnScroll({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  once = true,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-60px' });

  const initial = {
    opacity: 0,
    y: direction === 'up' ? 28 : 0,
    x: direction === 'left' ? -28 : direction === 'right' ? 28 : 0,
  };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
