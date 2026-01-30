'use client';

import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

export default function Card({ children, className = '', hover = false, delay = 0 }: CardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className={`
        bg-white/70 backdrop-blur-sm
        border border-[rgba(28,28,28,0.06)]
        rounded-2xl
        p-7 md:p-9
        ${hover ? 'cursor-pointer' : ''}
        ${className}
      `}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={hover ? { 
        y: -4,
        boxShadow: '0 20px 40px -15px rgba(28, 28, 28, 0.08)',
        borderColor: 'rgba(28, 28, 28, 0.12)',
        transition: { duration: 0.3, ease: 'easeOut' },
      } : undefined}
    >
      {children}
    </motion.div>
  );
}
