'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Section } from '@/components';

const useCases = [
  {
    title: 'DevOps & Infrastructure',
    description: 'Agents executing IaC changes, deployments, or cluster operations need guardrails for production environments.',
  },
  {
    title: 'Security Operations',
    description: 'Automated incident response accessing logs, configs, or running scripts with constrained scope.',
  },
  {
    title: 'Research & Development',
    description: 'Biotech, pharma, or research agents handling proprietary data with strict boundaries and compliance.',
  },
];

export default function UseCases() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <Section 
      id="use-cases" 
      number="004" 
      title="Who we work with"
      subtitle="We work with teams building autonomous systems across high-stakes environments—where the cost of an uncontrolled action is too high to ignore."
      background="alt"
      showEllipses
    >
      <div ref={ref} className="grid md:grid-cols-3 gap-8 lg:gap-12">
        {useCases.map((useCase, index) => (
          <motion.div
            key={index}
            className="group"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.15,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <h3 className="font-serif text-2xl md:text-3xl font-light mb-4 tracking-tight">
              {useCase.title}
            </h3>
            <p className="text-[var(--foreground-muted)] leading-relaxed">
              {useCase.description}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
