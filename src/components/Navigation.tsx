'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'THE PRODUCT', href: '/#product' },
  { label: 'HOW IT WORKS', href: '/docs' },
  { label: 'USE CASES', href: '/#use-cases' },
  { label: 'DEMO', href: '/demo' },
  { label: 'CONTACT', href: '/contact' },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-[var(--background)]/90 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <nav className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20 py-6 flex items-center justify-between">
          <Link 
            href="/" 
            className="text-xs font-medium tracking-[0.25em] opacity-60 hover:opacity-100 transition-opacity duration-300"
            aria-label="Manyr Home"
          >
            000
          </Link>
          
          <button
            onClick={() => setIsMenuOpen(true)}
            className="text-xs font-medium tracking-[0.2em] opacity-60 hover:opacity-100 transition-opacity duration-300 uppercase"
            aria-expanded={isMenuOpen}
            aria-controls="menu-overlay"
          >
            MENU
          </button>
        </nav>
      </header>

      {/* Full-screen Menu Overlay - anima.ai style */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="menu-overlay"
            className="fixed inset-0 z-[100] bg-[var(--background)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Background ellipses - matching anima.ai */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
              <motion.div
                className="absolute w-[800px] h-[800px] rounded-full"
                style={{
                  background: 'var(--ellipse-lavender)',
                  filter: 'blur(150px)',
                  opacity: 0.6,
                  top: '-20%',
                  right: '-20%',
                }}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 0.6, scale: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
              <motion.div
                className="absolute w-[600px] h-[600px] rounded-full"
                style={{
                  background: 'var(--ellipse-yellow)',
                  filter: 'blur(150px)',
                  opacity: 0.5,
                  bottom: '-15%',
                  left: '-15%',
                }}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 0.5, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.1, ease: 'easeOut' }}
              />
            </div>

            <div className="relative h-full flex flex-col">
              {/* Header */}
              <div className="max-w-[90rem] mx-auto w-full px-6 md:px-12 lg:px-20 py-6 flex items-center justify-between">
                <Link 
                  href="/" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-xs font-medium tracking-[0.25em] opacity-60 hover:opacity-100 transition-opacity duration-300"
                >
                  000
                </Link>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-xs font-medium tracking-[0.2em] opacity-60 hover:opacity-100 transition-opacity duration-300 uppercase"
                  aria-label="Close menu"
                >
                  CLOSE
                </button>
              </div>

              {/* Nav Items - Large text like anima.ai */}
              <div className="flex-1 flex items-center max-w-[90rem] mx-auto w-full px-6 md:px-12 lg:px-20">
                <nav className="w-full" role="navigation" aria-label="Main navigation">
                  <ul className="space-y-2 md:space-y-4">
                    {navItems.map((item, index) => (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          duration: 0.7, 
                          delay: 0.2 + index * 0.1,
                          ease: [0.25, 0.1, 0.25, 1],
                        }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="group inline-block"
                        >
                          <span className="heading-display text-[clamp(2.5rem,8vw,6rem)] tracking-[-0.03em] group-hover:opacity-40 transition-opacity duration-400">
                            {item.label}
                          </span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* Footer */}
              <motion.div 
                className="max-w-[90rem] mx-auto w-full px-6 md:px-12 lg:px-20 py-8 flex items-center justify-between text-xs text-[var(--foreground-muted)] tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <span>Manyr</span>
                <span>© 2026</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
