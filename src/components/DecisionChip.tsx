'use client';

import { motion } from 'framer-motion';

type DecisionType = 'allow' | 'deny' | 'approve' | 'constrain';

interface DecisionChipProps {
  decision: DecisionType;
  className?: string;
}

const decisionConfig: Record<DecisionType, { label: string; bg: string; color: string }> = {
  allow: { label: 'Allow', bg: '#E8F5E9', color: '#2E7D32' },
  deny: { label: 'Deny', bg: '#FFEBEE', color: '#C62828' },
  approve: { label: 'Require Approval', bg: '#FFF3E0', color: '#E65100' },
  constrain: { label: 'Constrain', bg: '#E3F2FD', color: '#1565C0' },
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
        ${className}
      `}
      style={{ backgroundColor: config.bg, color: config.color }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {config.label}
    </motion.span>
  );
}

export type { DecisionType };
