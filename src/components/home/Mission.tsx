'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '@/components';

gsap.registerPlugin(ScrollTrigger);

export default function Mission() {
  const contentRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        gsap.set([statementRef.current, columnsRef.current], {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
        });
        return;
      }

      // Large statement with dramatic blur-to-sharp reveal
      if (statementRef.current) {
        gsap.fromTo(
          statementRef.current,
          {
            opacity: 0,
            y: 60,
            filter: 'blur(15px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: statementRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Supporting columns with stagger
      if (columnsRef.current) {
        const columns = columnsRef.current.children;
        gsap.fromTo(
          columns,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: columnsRef.current,
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
      id="mission"
      number="002"
      title="Mission"
      background="alt"
      ellipses={[
        { color: 'var(--ellipse-lavender)', size: 1000, x: '-20%', y: '-15%', parallaxStrength: 0.03 },
        { color: 'var(--ellipse-mint)', size: 800, x: '85%', y: '40%', parallaxStrength: 0.04 },
        { color: 'var(--ellipse-sky)', size: 650, x: '30%', y: '80%', parallaxStrength: 0.035 },
      ]}
    >
      <div ref={contentRef} className="max-w-5xl">
        {/* Large statement */}
        <div ref={statementRef} className="mb-16 md:mb-20" style={{ opacity: 0 }}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-[var(--foreground)] leading-tight font-light tracking-tight">
            We co-build with teams deploying autonomous AI—rolling up our sleeves to
            make autonomy deployable, not because organizations blindly trust AI, but
            because they have the infrastructure to use it safely.
          </h2>
        </div>

        {/* Supporting paragraphs */}
        <div ref={columnsRef} className="grid md:grid-cols-2 gap-12 md:gap-16">
          <div className="space-y-6" style={{ opacity: 0 }}>
            <p className="text-base md:text-lg text-[var(--foreground-muted)] leading-relaxed">
              When an agent can modify code, access sensitive data, or trigger irreversible
              operations—who is responsible? How do you audit what happened? How do you
              prevent what shouldn&apos;t?
            </p>
            <p className="text-base md:text-lg text-[var(--foreground-muted)] leading-relaxed">
              These aren&apos;t hypothetical questions. They&apos;re the blockers preventing
              organizations from deploying the autonomous systems that could transform their
              operations.
            </p>
          </div>

          <div className="space-y-6" style={{ opacity: 0 }}>
            <p className="text-base md:text-lg text-[var(--foreground-muted)] leading-relaxed">
              We exist to close that gap—to provide the governance infrastructure that makes
              autonomy deployable at scale.
            </p>
            <p className="text-base md:text-lg text-[var(--foreground-muted)] leading-relaxed">
              A vendor-neutral control plane. Real-time policy enforcement. Tamper-evident
              audit trails. Built for enterprises that need both velocity and accountability.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
