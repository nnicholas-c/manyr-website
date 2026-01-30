'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { BlurredEllipses, Button } from '@/components';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const linesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const sectionIndicatorRef = useRef<HTMLDivElement>(null);

  const lines = ['Governing', 'autonomous', 'AI agents'];
  const pillars = [
    "→ Technology's power to transform work",
    "→ Autonomy's need for accountability",
    "→ Enterprise's demand for control",
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Check for reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        gsap.set([...linesRef.current, pillarsRef.current, ctaRef.current, sectionIndicatorRef.current], {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
        });
        return;
      }

      // Create master timeline
      const tl = gsap.timeline({ delay: 0.3 });

      // Headline lines reveal with blur-in effect - staggered
      linesRef.current.forEach((line, index) => {
        if (line) {
          tl.fromTo(
            line,
            {
              opacity: 0,
              y: 80,
              filter: 'blur(20px)',
            },
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 1,
              ease: 'power2.out',
            },
            index * 0.15
          );
        }
      });

      // Pillar statements fade in with stagger
      if (pillarsRef.current) {
        const pillarItems = pillarsRef.current.children;
        tl.fromTo(
          pillarItems,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power2.out',
          },
          '-=0.3'
        );
      }

      // CTA buttons fade in
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.3'
        );
      }

      // Section indicator
      if (sectionIndicatorRef.current) {
        tl.fromTo(
          sectionIndicatorRef.current,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.2'
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden pt-32 pb-16 md:pb-20"
    >
      <BlurredEllipses
        ellipses={[
          { color: 'var(--ellipse-yellow)', size: 1100, x: '-25%', y: '-15%', parallaxStrength: 0.02 },
          { color: 'var(--ellipse-lavender)', size: 900, x: '70%', y: '-10%', parallaxStrength: 0.03 },
          { color: 'var(--ellipse-peach)', size: 800, x: '85%', y: '55%', parallaxStrength: 0.025 },
          { color: 'var(--ellipse-sage)', size: 700, x: '-10%', y: '65%', parallaxStrength: 0.035 },
          { color: 'var(--ellipse-mint)', size: 600, x: '40%', y: '80%', parallaxStrength: 0.04 },
        ]}
      />

      <div className="relative z-10 max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20 w-full">
        <div className="max-w-5xl">
          {/* Animated headline */}
          <h1 className="heading-display text-[clamp(3rem,10vw,8rem)] leading-[1.05] tracking-[-0.03em] mb-16 md:mb-20">
            {lines.map((line, index) => (
              <span
                key={index}
                ref={(el) => { linesRef.current[index] = el; }}
                className="block"
                style={{ opacity: 0 }}
              >
                {line}
              </span>
            ))}
          </h1>

          {/* Three pillar statements */}
          <div ref={pillarsRef} className="space-y-4 md:space-y-5 mb-12 md:mb-16">
            {pillars.map((pillar, index) => (
              <p
                key={index}
                className="text-base md:text-lg text-[var(--foreground)] leading-relaxed"
                style={{ opacity: 0 }}
              >
                {pillar}
              </p>
            ))}
          </div>

          {/* CTA */}
          <div ref={ctaRef} className="flex flex-wrap gap-4" style={{ opacity: 0 }}>
            <Button href="/demo" variant="secondary" className="group">
              <span>DISCOVER</span>
              <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">
                →
              </span>
            </Button>
          </div>
        </div>

        {/* Section indicator */}
        <div ref={sectionIndicatorRef} className="mt-20 md:mt-28" style={{ opacity: 0 }}>
          <div className="section-number">001/ ABOUT</div>
        </div>
      </div>
    </section>
  );
}
