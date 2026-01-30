'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  ariaLabel?: string;
}

export default function Button({
  variant = 'primary',
  href,
  onClick,
  children,
  className = '',
  type = 'button',
  disabled = false,
  ariaLabel,
}: ButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center gap-2.5
    px-7 py-4 md:px-8 md:py-[1.125rem]
    text-sm font-medium tracking-wide uppercase
    rounded-lg
    transition-all duration-300 ease-out
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variantStyles = {
    primary: 'bg-[var(--accent-primary)] text-[#0a1520] border border-[var(--accent-primary)] font-semibold',
    secondary: 'bg-transparent text-[var(--foreground)] border border-[var(--accent-primary)]/30 hover:border-[var(--accent-primary)]/60',
  };

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  const hoverAnimation = {
    primary: {
      backgroundColor: '#06b6d4',
      scale: 1.02,
    },
    secondary: {
      backgroundColor: 'rgba(34, 211, 238, 0.1)',
      scale: 1.02,
    },
  };

  if (href) {
    return (
      <motion.div
        whileHover={hoverAnimation[variant]}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className="inline-block"
      >
        <Link href={href} className={combinedStyles} aria-label={ariaLabel}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={combinedStyles}
      disabled={disabled}
      whileHover={disabled ? undefined : hoverAnimation[variant]}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.2 }}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  );
}
