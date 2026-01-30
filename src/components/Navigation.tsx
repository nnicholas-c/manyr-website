'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'THE STUDIO', href: '/#about' },
  { label: 'THE PRODUCT', href: '/#product' },
  { label: 'USE CASES', href: '/#use-cases' },
  { label: 'DOCS', href: '/docs' },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <nav className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20 py-5 flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-[var(--foreground)] text-lg md:text-xl font-serif font-light tracking-wide hover:opacity-70 transition-opacity duration-300"
            aria-label="Manyr Home"
          >
            manyr
          </Link>
          
          {/* Desktop Nav - anima.ai style horizontal */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Toggle button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="px-5 py-2.5 rounded-full bg-[var(--pill-bg)] border border-[var(--pill-border)] text-[var(--foreground)] text-xs font-medium tracking-[0.15em] uppercase hover:bg-[var(--accent-cream)] transition-all duration-300"
            >
              {isMenuOpen ? 'CLOSE' : 'MENU'}
            </button>
            
            {/* Nav items in pills */}
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-5 py-2.5 rounded-full bg-[var(--pill-bg)] border border-[var(--pill-border)] text-[var(--foreground)] text-xs font-medium tracking-[0.15em] uppercase hover:bg-[var(--accent-cream)] transition-all duration-300"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Contact button - pill with + */}
          <Link
            href="/contact"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--pill-bg)] border border-[var(--pill-border)] text-[var(--foreground)] text-xs font-medium tracking-[0.15em] uppercase hover:bg-[var(--accent-cream)] transition-all duration-300"
          >
            <span>CONTACT</span>
            <span className="text-base leading-none">+</span>
          </Link>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="menu-overlay"
            className="fixed inset-0 z-[100] bg-[var(--background)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="relative h-full flex flex-col">
              {/* Header */}
              <div className="max-w-[90rem] mx-auto w-full px-6 md:px-12 lg:px-20 py-5 flex items-center justify-between">
                <Link 
                  href="/" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-[var(--foreground)] text-lg md:text-xl font-serif font-light tracking-wide"
                >
                  manyr
                </Link>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="px-5 py-2.5 rounded-full bg-[var(--pill-bg)] border border-[var(--pill-border)] text-[var(--foreground)] text-xs font-medium tracking-[0.15em] uppercase hover:bg-[var(--accent-cream)] transition-all duration-300"
                  aria-label="Close menu"
                >
                  CLOSE
                </button>
              </div>

              {/* Nav Items - Large text */}
              <div className="flex-1 flex items-center max-w-[90rem] mx-auto w-full px-6 md:px-12 lg:px-20">
                <nav className="w-full" role="navigation" aria-label="Main navigation">
                  <ul className="space-y-3 md:space-y-4">
                    {navItems.map((item, index) => (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          duration: 0.6, 
                          delay: 0.15 + index * 0.08,
                          ease: [0.25, 0.1, 0.25, 1],
                        }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="group inline-block"
                        >
                          <span className="heading-display text-[clamp(2.5rem,8vw,5rem)] tracking-[-0.02em] group-hover:opacity-50 transition-opacity duration-300">
                            {item.label}
                          </span>
                        </Link>
                      </motion.li>
                    ))}
                    <motion.li
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: 0.15 + navItems.length * 0.08,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                    >
                      <Link
                        href="/contact"
                        onClick={() => setIsMenuOpen(false)}
                        className="group inline-block"
                      >
                        <span className="heading-display text-[clamp(2.5rem,8vw,5rem)] tracking-[-0.02em] group-hover:opacity-50 transition-opacity duration-300">
                          CONTACT
                        </span>
                      </Link>
                    </motion.li>
                  </ul>
                </nav>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
