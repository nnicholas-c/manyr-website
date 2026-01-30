'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

const footerLinks = [
  { label: 'FAQ', href: '/docs#faq' },
  { label: 'DOCS', href: '/docs' },
  { label: 'LEGALS', href: '/docs#privacy' },
  { label: 'LINKEDIN', href: 'https://linkedin.com' },
];

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <footer ref={ref} className="relative overflow-hidden">
      {/* Blurred ellipses - cyber theme */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute w-[700px] h-[700px] rounded-full"
          style={{
            background: 'var(--ellipse-cyan)',
            filter: 'blur(150px)',
            opacity: 0.5,
            top: '-40%',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.5 } : { opacity: 0 }}
          transition={{ duration: 1.2 }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'var(--ellipse-violet)',
            filter: 'blur(150px)',
            opacity: 0.4,
            bottom: '-30%',
            left: '-10%',
          }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.4 } : { opacity: 0 }}
          transition={{ duration: 1.2, delay: 0.1 }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: 'var(--ellipse-teal)',
            filter: 'blur(150px)',
            opacity: 0.4,
            bottom: '-20%',
            right: '-10%',
          }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.4 } : { opacity: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        />
      </div>

      {/* "Have a seat!" CTA section - cyber style large text */}
      <div className="relative z-10 border-b border-[var(--accent-primary)]/20">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-32 lg:py-40 text-center">
          <motion.h2
            className="heading-display text-[clamp(3rem,10vw,8rem)] mb-10 text-[var(--foreground)]"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Have a seat!
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 text-xs font-medium tracking-[0.2em] uppercase text-[var(--accent-primary)] hover:opacity-70 transition-opacity duration-400"
            >
              <span>CONTACT US</span>
              <motion.span
                className="inline-block"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Footer links - minimal dark */}
      <div className="relative z-10 bg-[#0a1520]">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <motion.div 
              className="flex flex-wrap items-center gap-6 md:gap-8"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-[var(--foreground-muted)] hover:text-[var(--accent-primary)] transition-colors duration-300 tracking-[0.1em]"
                  {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {link.label}
                </Link>
              ))}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link 
                href="/" 
                className="text-xs font-medium tracking-[0.25em] text-[var(--accent-primary)] opacity-50 hover:opacity-100 transition-opacity duration-300"
              >
                000
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
