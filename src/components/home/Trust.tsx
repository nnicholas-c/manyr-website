'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Section } from '@/components';

export default function Trust() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <Section 
      id="trust" 
      number="006" 
      title="Control plane, not a data hoarder."
      subtitle="Manyr is a governance layer, not a data warehouse. We enforce policy and produce audit logs while minimizing our exposure to your sensitive content."
      background="alt"
    >
      <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        {[
          'Minimizes exposure to sensitive content',
          'Clear customer-visible policy rules',
          'Audit logs you can export',
          'Designed for enterprise governance',
        ].map((point, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ 
              duration: 0.7, 
              delay: index * 0.12,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <p className="text-lg text-[var(--foreground)] leading-relaxed">
              → {point}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
