'use client';

import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';
import BlurredEllipses from './BlurredEllipses';

interface SectionProps {
  id?: string;
  number?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  background?: 'default' | 'alt';
  showEllipses?: boolean;
}

export default function Section({
  id,
  number,
  title,
  subtitle,
  children,
  className = '',
  background = 'default',
  showEllipses = false,
}: SectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      id={id}
      className={`relative py-24 md:py-32 lg:py-40 overflow-hidden ${
        background === 'alt' ? 'bg-[var(--background-alt)]' : ''
      } ${className}`}
    >
      {showEllipses && (
        <BlurredEllipses 
          ellipses={[
            { color: 'var(--ellipse-yellow)', size: 600, x: '80%', y: '-10%', parallaxStrength: 0.03 },
            { color: 'var(--ellipse-lavender)', size: 500, x: '-15%', y: '70%', parallaxStrength: 0.04 },
          ]}
        />
      )}
      
      <div className="relative z-10 max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20">
        {(number || title) && (
          <div className="mb-16 md:mb-24">
            {number && (
              <motion.span 
                className="section-number block mb-6"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 0.7 } : { opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {number}/
              </motion.span>
            )}
            {title && (
              <motion.h2 
                className="heading-display text-[clamp(2.5rem,6vw,5rem)] max-w-5xl"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {title}
              </motion.h2>
            )}
            {subtitle && (
              <motion.p
                className="mt-8 text-lg md:text-xl text-[var(--foreground-muted)] max-w-2xl leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        )}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
