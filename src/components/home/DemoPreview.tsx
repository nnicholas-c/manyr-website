'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Section, Button } from '@/components';

export default function DemoPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <Section 
      id="demo-preview" 
      number="005" 
      title="See it in action"
    >
      <div ref={ref}>
        <motion.div
          className="bg-white/60 backdrop-blur-sm border border-[var(--border)] rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Minimal preview card */}
          <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-[var(--border)]">
            {/* Input */}
            <div className="p-8 md:p-10">
              <div className="section-number mb-6">Input</div>
              <p className="text-lg font-serif font-light mb-4">Agent Request</p>
              <p className="text-sm text-[var(--foreground-muted)]">
                Claude wants to read <code className="bg-[var(--background-alt)] px-2 py-0.5 rounded">/etc/passwd</code>
              </p>
            </div>

            {/* Policy */}
            <div className="p-8 md:p-10">
              <div className="section-number mb-6">Policy</div>
              <p className="text-lg font-serif font-light mb-4">Evaluation</p>
              <p className="text-sm text-[var(--foreground-muted)]">
                Rule matched: Block access to system paths
              </p>
            </div>

            {/* Output */}
            <div className="p-8 md:p-10">
              <div className="section-number mb-6">Output</div>
              <p className="text-lg font-serif font-light mb-4">Decision</p>
              <motion.span
                className="inline-block px-4 py-2 bg-[#FFEBEE] text-[#C62828] text-xs font-semibold uppercase tracking-wider rounded-full"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                DENY
              </motion.span>
            </div>
          </div>

          {/* CTA */}
          <div className="border-t border-[var(--border)] p-8 md:p-10 text-center">
            <Button href="/demo" variant="secondary" className="group">
              <span>TRY THE DEMO</span>
              <motion.span
                className="inline-block ml-2"
                whileHover={{ x: 4 }}
              >
                →
              </motion.span>
            </Button>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
