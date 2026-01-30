'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';

interface FloatingBadge {
  text: string;
  position: { top?: string; bottom?: string; left?: string; right?: string };
}

const floatingBadges: FloatingBadge[] = [
  { text: "AUTONOMOUS INTELLIGENCE", position: { top: '15%', left: '8%' } },
  { text: "ENTERPRISE CONTROL", position: { bottom: '20%', left: '5%' } },
  { text: "AGENT GOVERNANCE", position: { top: '25%', right: '6%' } },
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const linesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<(HTMLDivElement | null)[]>([]);

  const lines = ['Governing', 'autonomous', 'AI agents'];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        gsap.set([...linesRef.current, subtitleRef.current, ctaRef.current, ...badgesRef.current], {
          opacity: 1, y: 0,
        });
        return;
      }

      const tl = gsap.timeline({ delay: 0.2 });

      linesRef.current.forEach((line, index) => {
        if (line) {
          tl.fromTo(line, { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, index * 0.1);
        }
      });

      if (subtitleRef.current) {
        tl.fromTo(subtitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5');
      }

      if (ctaRef.current) {
        tl.fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4');
      }

      badgesRef.current.forEach((badge, index) => {
        if (badge) {
          tl.fromTo(badge, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }, 0.6 + index * 0.1);
        }
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Background with image */}
      <div className="absolute inset-0" style={{ backgroundImage: "url('/images/hero-bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-[#1a2535]/70" />
      
      {/* Floating pill badges */}
      {floatingBadges.map((badge, index) => (
        <div key={index} ref={(el) => { badgesRef.current[index] = el; }} className="absolute z-20 hidden lg:block" style={{ ...badge.position, opacity: 0 }}>
          <div className="px-5 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[10px] font-medium tracking-[0.2em] uppercase">
            {badge.text}
          </div>
        </div>
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20 w-full text-center py-20">
        <h1 className="font-serif font-light text-[clamp(3.5rem,14vw,11rem)] leading-[0.9] tracking-[-0.03em] text-white mb-10 md:mb-14">
          {lines.map((line, index) => (
            <span key={index} ref={(el) => { linesRef.current[index] = el; }} className="block" style={{ opacity: 0 }}>
              {line}
            </span>
          ))}
        </h1>

        <p ref={subtitleRef} className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-2xl mx-auto mb-12 md:mb-16 leading-relaxed font-light" style={{ opacity: 0 }}>
          We help enterprises govern autonomous<br className="hidden md:block" />AI agents at scale.
        </p>

        <div ref={ctaRef} style={{ opacity: 0 }}>
          <Link href="#about" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#D4D9A0] text-[#1a1a1a] text-sm font-medium tracking-[0.1em] uppercase hover:scale-105 transition-transform duration-300">
            <span>KNOW MORE</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="mt-0.5">
              <path d="M6 2L6 10M6 10L2 6M6 10L10 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
