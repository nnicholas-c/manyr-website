'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';

interface NavItem {
  label: string;
  href: string;
  number?: string;
}

const navItems: NavItem[] = [
  { label: 'THE PRODUCT', href: '/#product', number: '001' },
  { label: 'MISSION', href: '/#mission', number: '002' },
  { label: 'HOW IT WORKS', href: '/docs', number: '003' },
  { label: 'USE CASES', href: '/#ventures', number: '004' },
  { label: 'DEMO', href: '/demo', number: '005' },
  { label: 'CONTACT', href: '/contact', number: '006' },
];

interface GooeyMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GooeyMenu({ isOpen, onClose }: GooeyMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const bgRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';

      // Animate menu open with gooey effect
      const tl = gsap.timeline();

      // Background with gooey blob animation
      tl.fromTo(
        bgRef.current,
        {
          clipPath: 'circle(0% at 100% 0%)',
          opacity: 1,
        },
        {
          clipPath: 'circle(150% at 100% 0%)',
          duration: 0.8,
          ease: 'power3.inOut',
        }
      );

      // Stagger menu items with blur reveal
      tl.fromTo(
        itemsRef.current,
        {
          opacity: 0,
          y: 60,
          filter: 'blur(20px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
        },
        '-=0.3'
      );
    } else {
      document.body.style.overflow = '';

      // Animate menu close
      const tl = gsap.timeline();

      tl.to(itemsRef.current.reverse(), {
        opacity: 0,
        y: -30,
        filter: 'blur(10px)',
        duration: 0.3,
        stagger: 0.04,
        ease: 'power2.in',
      });

      tl.to(
        bgRef.current,
        {
          clipPath: 'circle(0% at 100% 0%)',
          duration: 0.5,
          ease: 'power3.inOut',
        },
        '-=0.1'
      );
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isMounted]);

  if (!isMounted) return null;

  return (
    <>
      {/* SVG filter for gooey effect */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="gooey-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Menu overlay */}
      <div
        ref={containerRef}
        className={`fixed inset-0 z-[100] ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-modal={isOpen}
        role="dialog"
        aria-label="Navigation menu"
      >
        {/* Gooey background */}
        <div
          ref={bgRef}
          className="absolute inset-0 bg-[#0a1520]"
          style={{
            clipPath: 'circle(0% at 100% 0%)',
            filter: 'url(#gooey-filter)',
          }}
        >
          {/* Background ellipses - cyber theme */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div
              className="absolute w-[1000px] h-[1000px] rounded-full"
              style={{
                background: 'var(--ellipse-cyan)',
                filter: 'blur(150px)',
                opacity: 0.6,
                top: '-30%',
                right: '-20%',
              }}
            />
            <div
              className="absolute w-[800px] h-[800px] rounded-full"
              style={{
                background: 'var(--ellipse-violet)',
                filter: 'blur(150px)',
                opacity: 0.5,
                bottom: '-20%',
                left: '-20%',
              }}
            />
            <div
              className="absolute w-[600px] h-[600px] rounded-full"
              style={{
                background: 'var(--ellipse-teal)',
                filter: 'blur(120px)',
                opacity: 0.4,
                top: '40%',
                left: '30%',
              }}
            />
          </div>
          
          {/* HUD grid overlay */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(rgba(34, 211, 238, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        {/* Menu content */}
        <div className="relative h-full flex flex-col">
          {/* Header */}
          <div className="max-w-[90rem] mx-auto w-full px-6 md:px-12 lg:px-20 py-6 flex items-center justify-between">
            <Link
              href="/"
              onClick={onClose}
              className="text-xs font-medium tracking-[0.25em] text-[var(--accent-primary)] opacity-60 hover:opacity-100 transition-opacity duration-300"
            >
              000
            </Link>
            <button
              onClick={onClose}
              className="text-xs font-medium tracking-[0.2em] text-[var(--foreground)] opacity-60 hover:opacity-100 transition-opacity duration-300 uppercase"
              aria-label="Close menu"
            >
              CLOSE
            </button>
          </div>

          {/* Nav Items */}
          <div className="flex-1 flex items-center max-w-[90rem] mx-auto w-full px-6 md:px-12 lg:px-20">
            <nav className="w-full" role="navigation" aria-label="Main navigation">
              <ul className="space-y-1 md:space-y-2">
                {navItems.map((item, index) => (
                  <li
                    key={item.href}
                    ref={(el) => { itemsRef.current[index] = el; }}
                    style={{ opacity: 0 }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group flex items-baseline gap-4 md:gap-6"
                    >
                      <span className="text-xs text-[var(--accent-primary)] font-medium tracking-wider opacity-50 group-hover:opacity-100 transition-opacity">
                        {item.number}
                      </span>
                      <span className="heading-display text-[clamp(2rem,6vw,5rem)] tracking-[-0.03em] text-[var(--foreground)] group-hover:text-[var(--accent-primary)] group-hover:opacity-70 transition-all duration-400">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Footer */}
          <div className="max-w-[90rem] mx-auto w-full px-6 md:px-12 lg:px-20 py-8 flex items-center justify-between text-xs text-[var(--foreground-muted)] tracking-wide">
            <span className="text-[var(--accent-primary)]">Manyr</span>
            <a
              href="mailto:hello@manyr.ai"
              className="hover:text-[var(--accent-primary)] transition-colors"
            >
              hello@manyr.ai
            </a>
            <span>© 2026</span>
          </div>
        </div>
      </div>
    </>
  );
}
