'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section, Button } from '@/components';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const contentRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        gsap.set([statementRef.current, ctaRef.current, detailsRef.current], {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
        });
        return;
      }

      // Statement with blur reveal
      if (statementRef.current) {
        gsap.fromTo(
          statementRef.current,
          {
            opacity: 0,
            y: 50,
            filter: 'blur(12px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: statementRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // CTA fade in
      if (ctaRef.current) {
        gsap.fromTo(
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
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Contact details
      if (detailsRef.current) {
        const items = detailsRef.current.children;
        gsap.fromTo(
          items,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: detailsRef.current,
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
      id="contact"
      number="007"
      title="Contact"
      ellipses={[
        { color: 'var(--ellipse-lavender)', size: 950, x: '-20%', y: '30%', parallaxStrength: 0.03 },
        { color: 'var(--ellipse-yellow)', size: 850, x: '80%', y: '-15%', parallaxStrength: 0.04 },
        { color: 'var(--ellipse-peach)', size: 700, x: '50%', y: '90%', parallaxStrength: 0.035 },
      ]}
    >
      <div ref={contentRef} className="max-w-4xl mx-auto">
        {/* Large statement */}
        <div ref={statementRef} className="text-center mb-12 md:mb-16" style={{ opacity: 0 }}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-[var(--foreground)] font-light leading-tight tracking-tight mb-8">
            We&apos;re building the governance infrastructure for autonomous AI.
          </h2>
          <p className="text-base md:text-lg text-[var(--foreground-muted)] leading-relaxed max-w-2xl mx-auto">
            If you&apos;re deploying agents that touch sensitive systems, we&apos;d love to hear
            about your challenges. Reach out to explore early pilots or just to learn more.
          </p>
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="text-center" style={{ opacity: 0 }}>
          <Button href="/contact" variant="secondary" className="group">
            <span>GET IN TOUCH</span>
            <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">
              →
            </span>
          </Button>
        </div>

        {/* Contact details */}
        <div ref={detailsRef} className="mt-16 md:mt-20 grid md:grid-cols-2 gap-8 text-center md:text-left">
          <div style={{ opacity: 0 }}>
            <p className="text-xs font-medium text-[var(--foreground-muted)] uppercase tracking-wider mb-2">
              Email
            </p>
            <a
              href="mailto:hello@manyr.ai"
              className="text-base md:text-lg text-[var(--foreground)] hover:opacity-60 transition-opacity"
            >
              hello@manyr.ai
            </a>
          </div>
          <div style={{ opacity: 0 }}>
            <p className="text-xs font-medium text-[var(--foreground-muted)] uppercase tracking-wider mb-2">
              LinkedIn
            </p>
            <a
              href="https://linkedin.com/company/manyr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base md:text-lg text-[var(--foreground)] hover:opacity-60 transition-opacity"
            >
              linkedin.com/company/manyr
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
