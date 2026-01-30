'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface NavItem {
  label: string;
  href: string;
  number?: string;
}

const navItems: NavItem[] = [
  { label: 'ABOUT', href: '/#about', number: '001' },
  { label: 'MISSION', href: '/#mission', number: '002' },
  { label: 'PRODUCT', href: '/#product', number: '003' },
  { label: 'USE CASES', href: '/#ventures', number: '004' },
  { label: 'DOCS', href: '/docs', number: '005' },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
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
          scrolled ? 'backdrop-blur-xl bg-[var(--background)]/80' : ''
        }`}
      >
        <nav className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20 py-5 flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-[var(--foreground)] text-lg md:text-xl font-serif font-light tracking-wide hover:text-[var(--accent-primary)] transition-colors duration-300"
            aria-label="Manyr Home"
          >
            manyr
          </Link>
          
          {/* Desktop Nav - pill style */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Menu toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="px-5 py-2.5 rounded-full bg-[var(--pill-bg)] border border-[var(--pill-border)] text-[var(--foreground)] text-xs font-medium tracking-[0.15em] uppercase hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-all duration-300"
            >
              {isMenuOpen ? 'CLOSE' : 'MENU'}
            </button>
            
            {/* Nav items in pills */}
            {navItems.slice(0, 3).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-5 py-2.5 rounded-full bg-[var(--pill-bg)] border border-[var(--pill-border)] text-[var(--foreground)] text-xs font-medium tracking-[0.15em] uppercase hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-all duration-300"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Contact button */}
          <Link
            href="/contact"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--accent-tertiary)] text-[var(--background)] text-xs font-medium tracking-[0.15em] uppercase hover:scale-105 transition-all duration-300"
          >
            <span>CONTACT</span>
            <span className="text-base leading-none">+</span>
          </Link>
        </nav>
      </header>

      {/* Full-screen Gooey Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="menu-overlay"
            className="fixed inset-0 z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Background with gooey clip-path */}
            <motion.div 
              className="absolute inset-0 bg-[var(--background)]"
              initial={{ clipPath: 'circle(0% at 100% 0%)' }}
              animate={{ clipPath: 'circle(150% at 100% 0%)' }}
              exit={{ clipPath: 'circle(0% at 100% 0%)' }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            >
              {/* Background ellipses */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                <motion.div
                  className="absolute w-[1000px] h-[1000px] rounded-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.5, scale: 1 }}
                  transition={{ delay: 0.3, duration: 1 }}
                  style={{
                    background: 'var(--ellipse-violet)',
                    filter: 'blur(150px)',
                    top: '-30%',
                    right: '-20%',
                  }}
                />
                <motion.div
                  className="absolute w-[800px] h-[800px] rounded-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.4, scale: 1 }}
                  transition={{ delay: 0.4, duration: 1 }}
                  style={{
                    background: 'var(--ellipse-cyan)',
                    filter: 'blur(150px)',
                    bottom: '-20%',
                    left: '-20%',
                  }}
                />
                <motion.div
                  className="absolute w-[600px] h-[600px] rounded-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.3, scale: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  style={{
                    background: 'var(--ellipse-teal)',
                    filter: 'blur(120px)',
                    top: '40%',
                    left: '30%',
                  }}
                />
              </div>
            </motion.div>

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
                  className="px-5 py-2.5 rounded-full bg-[var(--pill-bg)] border border-[var(--pill-border)] text-[var(--foreground)] text-xs font-medium tracking-[0.15em] uppercase hover:border-[var(--accent-primary)] transition-all duration-300"
                  aria-label="Close menu"
                >
                  CLOSE
                </button>
              </div>

              {/* Nav Items - Large editorial text */}
              <div className="flex-1 flex items-center max-w-[90rem] mx-auto w-full px-6 md:px-12 lg:px-20">
                <nav className="w-full" role="navigation" aria-label="Main navigation">
                  <ul className="space-y-2 md:space-y-3">
                    {navItems.map((item, index) => (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
                        transition={{ 
                          duration: 0.6, 
                          delay: 0.2 + index * 0.08,
                          ease: [0.25, 0.1, 0.25, 1],
                        }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="group flex items-baseline gap-6"
                        >
                          <span className="text-[var(--foreground-subtle)] text-xs font-mono tracking-wider">
                            {item.number}/
                          </span>
                          <span className="font-serif font-light text-[clamp(2.5rem,8vw,5.5rem)] tracking-[-0.02em] text-[var(--foreground)] group-hover:text-[var(--accent-primary)] transition-colors duration-300">
                            {item.label}
                          </span>
                        </Link>
                      </motion.li>
                    ))}
                    <motion.li
                      initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
                      transition={{ 
                        duration: 0.6, 
                        delay: 0.2 + navItems.length * 0.08,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                    >
                      <Link
                        href="/contact"
                        onClick={() => setIsMenuOpen(false)}
                        className="group flex items-baseline gap-6"
                      >
                        <span className="text-[var(--foreground-subtle)] text-xs font-mono tracking-wider">
                          006/
                        </span>
                        <span className="font-serif font-light text-[clamp(2.5rem,8vw,5.5rem)] tracking-[-0.02em] text-[var(--foreground)] group-hover:text-[var(--accent-primary)] transition-colors duration-300">
                          CONTACT
                        </span>
                      </Link>
                    </motion.li>
                  </ul>
                </nav>
              </div>

              {/* Footer info */}
              <motion.div 
                className="max-w-[90rem] mx-auto w-full px-6 md:px-12 lg:px-20 py-8 flex items-center justify-between border-t border-[var(--border)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <span className="text-[var(--foreground-subtle)] text-xs font-mono tracking-wider">
                  AGENT FIREWALL
                </span>
                <span className="text-[var(--foreground-subtle)] text-xs font-mono tracking-wider">
                  © 2024 MANYR
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
