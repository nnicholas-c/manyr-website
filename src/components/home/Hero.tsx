'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Dynamic import for Three.js scene (no SSR)
const Hero3DScene = dynamic(() => import('../three/Hero3DScene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-b from-[#1a2535] to-[#0a1520]" />
  ),
});

gsap.registerPlugin(ScrollTrigger);

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
  const pinnedRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<(HTMLDivElement | null)[]>([]);
  const hudRef = useRef<HTMLDivElement>(null);
  
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showHud, setShowHud] = useState(false);

  const lines = ['Governing', 'autonomous', 'AI agents'];

  // Memoized scroll handler
  const handleScrollProgress = useCallback((progress: number) => {
    setScrollProgress(progress);
    setShowHud(progress > 0.3);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        gsap.set([...linesRef.current, subtitleRef.current, ctaRef.current, ...badgesRef.current], {
          opacity: 1, y: 0,
        });
        return;
      }

      // Initial text animation
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

      // Pinned scroll trigger for 3D transformation
      if (heroRef.current && pinnedRef.current) {
        ScrollTrigger.create({
          trigger: heroRef.current,
          start: 'top top',
          end: '+=200%', // 2x viewport height of scrolling while pinned
          pin: pinnedRef.current,
          scrub: 0.5,
          onUpdate: (self) => {
            handleScrollProgress(self.progress);
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [handleScrollProgress]);

  return (
    <section ref={heroRef} className="relative" style={{ height: '300vh' }}>
      {/* Pinned container */}
      <div ref={pinnedRef} className="relative h-[100svh] w-full overflow-hidden">
        {/* Three.js Canvas Background */}
        <Hero3DScene 
          progress={scrollProgress} 
          className="absolute inset-0 z-0"
        />
        
        {/* Dark gradient overlay for text readability */}
        <div 
          className="absolute inset-0 z-[1] pointer-events-none transition-opacity duration-500"
          style={{
            background: `linear-gradient(to bottom, 
              rgba(26, 37, 53, ${0.6 - scrollProgress * 0.3}) 0%, 
              rgba(10, 21, 32, ${0.5 - scrollProgress * 0.2}) 50%,
              rgba(10, 21, 32, ${0.7}) 100%
            )`,
          }}
        />

        {/* HUD overlay elements */}
        <div 
          ref={hudRef}
          className="absolute inset-0 z-[2] pointer-events-none transition-opacity duration-700"
          style={{ opacity: showHud ? 1 : 0 }}
        >
          {/* Corner brackets */}
          <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-[#4a8a9a]/50" />
          <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-[#4a8a9a]/50" />
          <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-[#4a8a9a]/50" />
          <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-[#4a8a9a]/50" />
          
          {/* Targeting reticle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#4a8a9a" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.5" />
              <line x1="50" y1="5" x2="50" y2="25" stroke="#4a8a9a" strokeWidth="0.5" opacity="0.7" />
              <line x1="50" y1="75" x2="50" y2="95" stroke="#4a8a9a" strokeWidth="0.5" opacity="0.7" />
              <line x1="5" y1="50" x2="25" y2="50" stroke="#4a8a9a" strokeWidth="0.5" opacity="0.7" />
              <line x1="75" y1="50" x2="95" y2="50" stroke="#4a8a9a" strokeWidth="0.5" opacity="0.7" />
            </svg>
          </div>
          
          {/* Status indicators */}
          <div className="absolute bottom-12 left-12 text-[10px] font-mono text-[#4a8a9a]/70 tracking-wider">
            <div>STATUS: ACTIVE</div>
            <div>MODE: GOVERNANCE</div>
            <div>PROGRESS: {Math.round(scrollProgress * 100)}%</div>
          </div>
          
          <div className="absolute top-12 right-12 text-[10px] font-mono text-[#4a8a9a]/70 tracking-wider text-right">
            <div>SYS: ONLINE</div>
            <div>AGENTS: MONITORED</div>
          </div>
        </div>

        {/* Floating pill badges */}
        {floatingBadges.map((badge, index) => (
          <div 
            key={index} 
            ref={(el) => { badgesRef.current[index] = el; }} 
            className="absolute z-20 hidden lg:block transition-opacity duration-500" 
            style={{ 
              ...badge.position, 
              opacity: scrollProgress > 0.5 ? 0 : 1 - scrollProgress,
            }}
          >
            <div className="px-5 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[10px] font-medium tracking-[0.2em] uppercase">
              {badge.text}
            </div>
          </div>
        ))}

        {/* Main content */}
        <div 
          className="relative z-10 max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20 w-full text-center h-full flex flex-col items-center justify-center transition-opacity duration-500"
          style={{ opacity: Math.max(0, 1 - scrollProgress * 2) }}
        >
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
        
        {/* Scroll indicator */}
        <div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 transition-opacity duration-500"
          style={{ opacity: scrollProgress < 0.1 ? 1 : 0 }}
        >
          <span className="text-[10px] font-mono text-white/50 tracking-[0.2em] uppercase">Scroll to explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
}
