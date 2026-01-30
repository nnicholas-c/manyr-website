'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '@/components';

gsap.registerPlugin(ScrollTrigger);

const principles = [
  {
    title: 'See intents, not content',
    description:
      'We evaluate action metadata without accessing payload content. Your sensitive data never leaves your infrastructure.',
  },
  {
    title: 'Customer-owned policies',
    description:
      'You define all policy rules. No hidden logic, no black-box decisions. Full transparency into why actions are allowed or denied.',
  },
  {
    title: 'Export everything',
    description:
      'Your audit logs belong to you. Export anytime or stream directly to your SIEM. No lock-in.',
  },
  {
    title: 'Built for compliance',
    description:
      'Regional deployment options, SOC 2-designed infrastructure, and tamper-evident audit trails for enterprise requirements.',
  },
];

export default function Trust() {
  const contentRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        gsap.set([introRef.current, gridRef.current?.children], {
          opacity: 1,
          y: 0,
          x: 0,
          filter: 'blur(0px)',
        });
        return;
      }

      // Intro statement with blur reveal
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

      // Principles with stagger from left
      if (gridRef.current) {
        const items = gridRef.current.children;
        gsap.fromTo(
          items,
          {
            opacity: 0,
            x: -30,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridRef.current,
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
      id="trust"
      number="005"
      title="Trust"
      ellipses={[
        { color: 'var(--ellipse-cream)', size: 900, x: '85%', y: '-20%', parallaxStrength: 0.03 },
        { color: 'var(--ellipse-sage)', size: 850, x: '-25%', y: '45%', parallaxStrength: 0.04 },
        { color: 'var(--ellipse-mint)', size: 650, x: '40%', y: '85%', parallaxStrength: 0.035 },
      ]}
    >
      <div ref={contentRef}>
        {/* Intro statement */}
        <div ref={introRef} className="max-w-3xl mb-16 md:mb-24" style={{ opacity: 0 }}>
          <h2 className="text-2xl md:text-3xl text-[var(--foreground)] leading-relaxed font-light mb-6">
            We are a control plane, not a data hoarder.
          </h2>
          <p className="text-base md:text-lg text-[var(--foreground-muted)] leading-relaxed">
            Manyr enforces policy and produces audit logs while minimizing exposure to your
            sensitive content. Built for enterprises that need both governance and privacy.
          </p>
        </div>

        {/* Principles grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 gap-8 md:gap-12">
          {principles.map((principle) => (
            <div
              key={principle.title}
              className="border-l-2 border-[var(--border-strong)] pl-6 md:pl-8"
              style={{ opacity: 0 }}
            >
              <h3 className="text-lg md:text-xl text-[var(--foreground)] font-medium mb-3">
                {principle.title}
              </h3>
              <p className="text-sm md:text-base text-[var(--foreground-muted)] leading-relaxed">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
