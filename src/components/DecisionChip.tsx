'use client';

import { motion } from 'framer-motion';

type DecisionType = 'allow' | 'deny' | 'approve' | 'constrain';

interface DecisionChipProps {
  decision: DecisionType;
  className?: string;
}

const decisionConfig: Record<DecisionType, { label: string; bg: string; border: string; color: string }> = {
  allow: { label: 'Allow', bg: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.4)', color: '#34d399' },
  deny: { label: 'Deny', bg: 'rgba(239, 68, 68, 0.15)', border: 'rgba(239, 68, 68, 0.4)', color: '#f87171' },
  approve: { label: 'Require Approval', bg: 'rgba(251, 191, 36, 0.15)', border: 'rgba(251, 191, 36, 0.4)', color: '#fbbf24' },
  constrain: { label: 'Constrain', bg: 'rgba(34, 211, 238, 0.15)', border: 'rgba(34, 211, 238, 0.4)', color: '#22d3ee' },
};

export default function DecisionChip({ decision, className = '' }: DecisionChipProps) {
  const config = decisionConfig[decision];

  return (
    <motion.span
      className={`
        inline-flex items-center
        px-4 py-2
        text-xs font-semibold uppercase tracking-wider
        rounded-full
        border
        ${className}
      `}
      style={{ backgroundColor: config.bg, borderColor: config.border, color: config.color }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {config.label}
    </motion.span>
  );
}

export type { DecisionType };
