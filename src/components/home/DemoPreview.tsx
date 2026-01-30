'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section, Button } from '@/components';

gsap.registerPlugin(ScrollTrigger);

export default function DemoPreview() {
  const contentRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const decisionRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        gsap.set([introRef.current, cardRef.current, decisionRef.current], {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          scale: 1,
        });
        return;
      }

      // Intro text
      if (introRef.current) {
        gsap.fromTo(
          introRef.current,
          {
            opacity: 0,
            y: 40,
            filter: 'blur(10px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: introRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Preview card
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          {
            opacity: 0,
            y: 60,
            filter: 'blur(8px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Decision chip pop
      if (decisionRef.current) {
        gsap.fromTo(
          decisionRef.current,
          {
            opacity: 0,
            scale: 0.8,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: decisionRef.current,
              start: 'top 85%',
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
      id="demo-preview"
      number="004"
      title="Demo"
      background="alt"
      ellipses={[
        { color: 'var(--ellipse-sage)', size: 950, x: '-20%', y: '-25%', parallaxStrength: 0.03 },
        { color: 'var(--ellipse-peach)', size: 800, x: '75%', y: '55%', parallaxStrength: 0.04 },
        { color: 'var(--ellipse-lavender)', size: 600, x: '90%', y: '-15%', parallaxStrength: 0.035 },
      ]}
    >
      <div ref={contentRef}>
        {/* Intro text */}
        <div ref={introRef} className="max-w-3xl mb-12 md:mb-16" style={{ opacity: 0 }}>
          <p className="text-lg md:text-xl text-[var(--foreground-muted)] leading-relaxed">
            See how Manyr evaluates agent actions in real-time. Configure policies, submit
            actions, and observe decisions with full audit logging.
          </p>
        </div>

        {/* Minimal preview card */}
        <div
          ref={cardRef}
          className="bg-white/40 backdrop-blur-sm border border-[var(--border)] rounded-2xl overflow-hidden"
          style={{ opacity: 0 }}
        >
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
            {/* Input */}
            <div className="p-8 md:p-10">
              <p className="text-xs font-medium text-[var(--foreground-muted)] uppercase tracking-wider mb-4">
                Input
              </p>
              <p className="text-base md:text-lg font-light mb-3">Agent request</p>
              <p className="text-sm text-[var(--foreground-muted)]">
                Claude wants to read{' '}
                <code className="bg-[var(--background-alt)] px-2 py-1 rounded text-xs">
                  /etc/passwd
                </code>
              </p>
            </div>

            {/* Policy */}
            <div className="p-8 md:p-10">
              <p className="text-xs font-medium text-[var(--foreground-muted)] uppercase tracking-wider mb-4">
                Policy
              </p>
              <p className="text-base md:text-lg font-light mb-3">Evaluation</p>
              <p className="text-sm text-[var(--foreground-muted)]">
                Rule matched: Block access to system paths
              </p>
            </div>

            {/* Output */}
            <div className="p-8 md:p-10">
              <p className="text-xs font-medium text-[var(--foreground-muted)] uppercase tracking-wider mb-4">
                Output
              </p>
              <p className="text-base md:text-lg font-light mb-4">Decision</p>
              <span
                ref={decisionRef}
                className="inline-block px-4 py-2 bg-[#FFEBEE] text-[#C62828] text-xs font-semibold uppercase tracking-wider rounded-full"
                style={{ opacity: 0 }}
              >
                DENY
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="border-t border-[var(--border)] p-8 md:p-10 text-center bg-white/20">
            <Button href="/demo" variant="secondary" className="group">
              <span>TRY THE PLAYGROUND</span>
              <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">
                →
              </span>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
