'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '@/components';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    title: 'Observe',
    description: 'We intercept agent tool calls and normalize them into structured "action intents"—capturing what the agent wants to do, to which resource, with what parameters.',
  },
  {
    title: 'Decide',
    description: 'A hybrid evaluation engine processes the action: fast deterministic rules first, risk scoring second, optional LLM judge for ambiguous cases. Sub-100ms latency.',
  },
  {
    title: 'Enforce',
    description: 'Execute the decision—allow, deny, or constrain the action—and log everything to a tamper-evident audit trail with full lineage and cryptographic integrity.',
  },
];

const decisions = [
  { label: 'ALLOW', bg: '#E8F5E9', color: '#2E7D32' },
  { label: 'DENY', bg: '#FFEBEE', color: '#C62828' },
  { label: 'APPROVE', bg: '#FFF3E0', color: '#E65100' },
  { label: 'CONSTRAIN', bg: '#E3F2FD', color: '#1565C0' },
];

export default function Product() {
  const contentRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const decisionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        gsap.set([introRef.current, cardsRef.current?.children, decisionsRef.current], {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          scale: 1,
        });
        return;
      }

      // Intro text with blur reveal
      if (introRef.current) {
        gsap.fromTo(
          introRef.current,
          {
            opacity: 0,
            y: 40,
            filter: 'blur(12px)',
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

      // Capability cards with stagger
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 60,
            filter: 'blur(10px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Decision chips with scale and fade
      if (decisionsRef.current) {
        const chips = decisionsRef.current.querySelectorAll('.decision-chip');
        gsap.fromTo(
          chips,
          {
            opacity: 0,
            scale: 0.8,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: decisionsRef.current,
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
      id="product"
      number="003"
      title="The firewall"
      ellipses={[
        { color: 'var(--ellipse-rose)', size: 850, x: '-15%', y: '20%', parallaxStrength: 0.035 },
        { color: 'var(--ellipse-sky)', size: 900, x: '90%', y: '-10%', parallaxStrength: 0.03 },
        { color: 'var(--ellipse-yellow)', size: 700, x: '50%', y: '75%', parallaxStrength: 0.04 },
      ]}
    >
      <div ref={contentRef}>
        {/* Intro text */}
        <div ref={introRef} className="max-w-3xl mb-16 md:mb-24" style={{ opacity: 0 }}>
          <p className="text-xl md:text-2xl text-[var(--foreground)] leading-relaxed font-light">
            We sit between your agents and the tools they use—a vendor-neutral control
            plane that intercepts, evaluates, and enforces policy at the moment of action.
          </p>
        </div>

        {/* Capabilities grid */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 md:gap-8">
          {capabilities.map((capability, index) => (
            <div
              key={capability.title}
              className="bg-white/40 backdrop-blur-sm border border-[var(--border)] rounded-2xl p-8 md:p-10"
              style={{ opacity: 0 }}
            >
              <div className="mb-6">
                <span className="text-xs font-medium text-[var(--foreground-muted)] uppercase tracking-wider">
                  Step {index + 1}
                </span>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-light mb-4 tracking-tight">
                {capability.title}
              </h3>
              <p className="text-sm md:text-base text-[var(--foreground-muted)] leading-relaxed">
                {capability.description}
              </p>
            </div>
          ))}
        </div>

        {/* Decision types */}
        <div ref={decisionsRef} className="mt-20 md:mt-28 text-center">
          <p className="text-xs font-medium text-[var(--foreground-muted)] uppercase tracking-wider mb-8">
            Four possible outcomes
          </p>
          <div className="inline-flex flex-wrap justify-center gap-3 md:gap-4">
            {decisions.map((decision) => (
              <span
                key={decision.label}
                className="decision-chip px-5 py-2.5 text-[10px] md:text-xs font-semibold tracking-[0.15em] rounded-full"
                style={{ backgroundColor: decision.bg, color: decision.color, opacity: 0 }}
              >
                {decision.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
