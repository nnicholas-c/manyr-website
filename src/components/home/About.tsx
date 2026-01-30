'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Section } from '@/components';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <Section 
      id="about" 
      number="001" 
      title="We are your partner"
      showEllipses
    >
      <div ref={ref} className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* Left side - Editorial text like anima.ai */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-xl md:text-2xl text-[var(--foreground-muted)] leading-relaxed mb-8">
            We&apos;re a governance layer for AI agents. That means:
          </p>
          <div className="space-y-4">
            {[
              "→ We don't just monitor, we enforce",
              "→ We don't slow down, we enable safely",
              "→ We work at the action boundary to make decisions in real-time",
            ].map((line, index) => (
              <motion.p
                key={index}
                className="text-xl md:text-2xl text-[var(--foreground)] leading-relaxed"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ 
                  duration: 0.7, 
                  delay: 0.3 + index * 0.15,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                {line}
              </motion.p>
            ))}
          </div>
          <motion.p
            className="mt-10 text-lg text-[var(--foreground-muted)] leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
          >
            Whether you&apos;re deploying coding agents, research assistants, or autonomous 
            workflows, we&apos;re here to help you ship with confidence.
          </motion.p>
        </motion.div>

        {/* Right side - The Select visualization */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="bg-white/60 backdrop-blur-sm border border-[var(--border)] rounded-2xl p-8 md:p-10">
            <div className="section-number mb-8">
              The Select Function
            </div>
            <div className="space-y-5">
              {[
                { label: 'Allow', color: '#E8F5E9', textColor: '#2E7D32', desc: 'Action proceeds normally' },
                { label: 'Deny', color: '#FFEBEE', textColor: '#C62828', desc: 'Action is blocked' },
                { label: 'Approve', color: '#FFF3E0', textColor: '#E65100', desc: 'Requires human review' },
                { label: 'Constrain', color: '#E3F2FD', textColor: '#1565C0', desc: 'Action is modified' },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className="flex items-center gap-5"
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.7 + index * 0.12,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  <span
                    className="px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full"
                    style={{ backgroundColor: item.color, color: item.textColor }}
                  >
                    {item.label}
                  </span>
                  <span className="text-sm text-[var(--foreground-muted)]">{item.desc}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
