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
    primary: 'bg-[#1C1C1C] text-[#F6F3EE] border border-[#1C1C1C]',
    secondary: 'bg-transparent text-[#1C1C1C] border border-[rgba(28,28,28,0.2)]',
  };

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  const hoverAnimation = {
    primary: {
      backgroundColor: '#3a3a3a',
      scale: 1.02,
    },
    secondary: {
      backgroundColor: 'rgba(232, 228, 222, 0.5)',
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
