'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Section } from '@/components';

export default function Mission() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <Section 
      id="mission" 
      number="003" 
      title="Make autonomy deployable."
      background="alt"
    >
      <div ref={ref} className="grid lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left column - main narrative */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-xl md:text-2xl text-[var(--foreground)] leading-relaxed mb-8">
            AI is crossing a threshold. We&apos;re moving from systems that assist to 
            systems that act.
          </p>
          <p className="text-lg text-[var(--foreground-muted)] leading-relaxed">
            Agents now execute multi-step workflows across tools, databases, and internal 
            systems with minimal human oversight. This shift unlocks extraordinary 
            productivity—but also creates a profound accountability gap.
          </p>
        </motion.div>

        {/* Right column - the why */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-lg text-[var(--foreground-muted)] leading-relaxed mb-8">
            When an agent can modify code, access sensitive data, or trigger irreversible 
            operations—who is responsible? How do you audit what happened? How do you 
            prevent what shouldn&apos;t?
          </p>
          <p className="text-lg text-[var(--foreground-muted)] leading-relaxed">
            Manyr exists to close that gap. We believe autonomy should be deployable—not 
            because organizations blindly trust AI, but because they have the governance 
            infrastructure to use it safely.
          </p>
        </motion.div>
      </div>
    </Section>
  );
}
