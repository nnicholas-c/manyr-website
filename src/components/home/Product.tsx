'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Section } from '@/components';

const steps = [
  {
    title: 'Observe the action',
    description: 'We intercept agent tool calls and normalize them into structured "action intents"—what the agent wants to do, to which resource, with what parameters.',
  },
  {
    title: 'Evaluate in real-time',
    description: 'A hybrid evaluation engine processes the action: fast deterministic rules first, risk scoring second, optional LLM judge for ambiguous cases. Sub-100ms latency.',
  },
  {
    title: 'Enforce and record',
    description: 'Execute the decision—allow, deny, or constrain the action—and log everything to a tamper-evident audit trail with full lineage.',
  },
];

export default function Product() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <Section 
      id="product" 
      number="002" 
      title="How we work"
      subtitle="Manyr sits between your agents and the tools they use, enforcing policy at the moment of action."
    >
      <div ref={ref} className="space-y-0">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center py-12 md:py-16 border-b border-[var(--border)] last:border-0"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <div>
              <h3 className="font-serif text-3xl md:text-4xl font-light tracking-tight mb-4">
                {step.title}
              </h3>
            </div>
            <div>
              <p className="text-lg text-[var(--foreground-muted)] leading-relaxed">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Select UI - minimal visualization */}
      <motion.div
        className="mt-20 md:mt-28 text-center"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="inline-flex flex-wrap justify-center gap-4">
          {[
            { label: 'ALLOW', bg: '#E8F5E9', color: '#2E7D32' },
            { label: 'DENY', bg: '#FFEBEE', color: '#C62828' },
            { label: 'APPROVE', bg: '#FFF3E0', color: '#E65100' },
            { label: 'CONSTRAIN', bg: '#E3F2FD', color: '#1565C0' },
          ].map((decision, index) => (
            <motion.span
              key={decision.label}
              className="px-6 py-3 text-xs font-semibold tracking-[0.15em] rounded-full"
              style={{ backgroundColor: decision.bg, color: decision.color }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              {decision.label}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
