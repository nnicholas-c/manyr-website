'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '@/components';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const contentRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        gsap.set([leftColRef.current, rightColRef.current], {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
        });
        return;
      }

      // Left column animation
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current,
          {
            opacity: 0,
            y: 50,
            filter: 'blur(10px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: leftColRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Right column items with stagger
      if (rightColRef.current) {
        const items = rightColRef.current.children;
        gsap.fromTo(
          items,
          {
            opacity: 0,
            y: 40,
            filter: 'blur(8px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.7,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: rightColRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section
      id="about"
      number="001"
      title="About"
      ellipses={[
        { color: 'var(--ellipse-yellow)', size: 900, x: '-25%', y: '-20%', parallaxStrength: 0.03 },
        { color: 'var(--ellipse-peach)', size: 750, x: '80%', y: '50%', parallaxStrength: 0.04 },
        { color: 'var(--ellipse-cream)', size: 600, x: '60%', y: '-30%', parallaxStrength: 0.035 },
      ]}
    >
      <div ref={contentRef} className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* Left side - Primary messaging */}
        <div ref={leftColRef} style={{ opacity: 0 }}>
          <h2 className="text-2xl md:text-3xl text-[var(--foreground)] leading-relaxed mb-8 font-light">
            We are a governance layer for autonomous AI systems.
          </h2>
          <p className="text-base md:text-lg text-[var(--foreground-muted)] leading-relaxed">
            AI agents are moving from tools that assist to systems that act—executing
            multi-step workflows across databases, APIs, and internal systems with minimal
            human oversight.
          </p>
        </div>

        {/* Right side - Arrow statements */}
        <div ref={rightColRef} className="space-y-6">
          <div style={{ opacity: 0 }}>
            <p className="text-base md:text-lg text-[var(--foreground)] leading-relaxed mb-2">
              → We don&apos;t just monitor
            </p>
            <p className="text-sm md:text-base text-[var(--foreground-muted)] leading-relaxed pl-6">
              We intercept every agent action at the execution boundary and make real-time
              decisions: allow, deny, approve, or constrain.
            </p>
          </div>

          <div style={{ opacity: 0 }}>
            <p className="text-base md:text-lg text-[var(--foreground)] leading-relaxed mb-2">
              → We don&apos;t slow you down
            </p>
            <p className="text-sm md:text-base text-[var(--foreground-muted)] leading-relaxed pl-6">
              Our hybrid evaluation engine resolves most actions in under 5ms using
              deterministic rules, with optional LLM judges for ambiguous cases.
            </p>
          </div>

          <div style={{ opacity: 0 }}>
            <p className="text-base md:text-lg text-[var(--foreground)] leading-relaxed mb-2">
              → We work at the boundary
            </p>
            <p className="text-sm md:text-base text-[var(--foreground-muted)] leading-relaxed pl-6">
              We sit between your agents and the tools they use, creating a
              vendor-neutral control plane with tamper-evident audit trails.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
