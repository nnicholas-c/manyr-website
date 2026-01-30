'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const pointsRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        gsap.set([headingRef.current, pointsRef.current, descRef.current, ctaRef.current], { opacity: 1, y: 0 });
        return;
      }

      if (headingRef.current) {
        gsap.fromTo(headingRef.current, { opacity: 0, y: 60, filter: 'blur(10px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power2.out', scrollTrigger: { trigger: headingRef.current, start: 'top 80%' } });
      }

      if (pointsRef.current) {
        const items = pointsRef.current.children;
        gsap.fromTo(items, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: pointsRef.current, start: 'top 75%' } });
      }

      if (descRef.current) {
        gsap.fromTo(descRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: descRef.current, start: 'top 80%' } });
      }

      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: ctaRef.current, start: 'top 85%' } });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative min-h-screen overflow-hidden bg-[var(--background-alt)]">
      {/* Background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[800px] h-[800px] rounded-full" style={{ background: 'var(--ellipse-violet)', filter: 'blur(150px)', top: '-20%', right: '-15%' }} />
        <div className="absolute w-[600px] h-[600px] rounded-full" style={{ background: 'var(--ellipse-cyan)', filter: 'blur(120px)', bottom: '-10%', left: '-10%' }} />
      </div>

      <div className="relative z-10 max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20 py-24 lg:py-32">
        {/* Chapter number */}
        <div className="mb-16 lg:mb-24">
          <span className="text-xs font-mono tracking-[0.2em] text-[var(--accent-primary)] uppercase">001/ &nbsp;&nbsp; ABOUT</span>
        </div>

        <div className="max-w-2xl">
          <h2 ref={headingRef} className="font-serif font-light text-[clamp(2.5rem,6vw,5rem)] leading-[1.1] tracking-[-0.02em] text-[var(--foreground)] mb-12" style={{ opacity: 0 }}>
            We are your partner
          </h2>

          <p className="text-[var(--foreground-muted)] text-lg md:text-xl leading-relaxed mb-8">
            We&apos;re building the governance layer for autonomous AI. That means:
          </p>

          <div ref={pointsRef} className="space-y-4 mb-10">
            <p className="text-[var(--foreground)] text-base md:text-lg flex items-start gap-3" style={{ opacity: 0 }}>
              <span className="text-[var(--accent-primary)]">→</span> We don&apos;t just monitor, we govern
            </p>
            <p className="text-[var(--foreground)] text-base md:text-lg flex items-start gap-3" style={{ opacity: 0 }}>
              <span className="text-[var(--accent-primary)]">→</span> We don&apos;t block agents, we guide them
            </p>
            <p className="text-[var(--foreground)] text-base md:text-lg flex items-start gap-3" style={{ opacity: 0 }}>
              <span className="text-[var(--accent-primary)]">→</span> We work alongside your AI to turn autonomy into accountability
            </p>
          </div>

          <p ref={descRef} className="text-[var(--foreground-muted)] text-base md:text-lg leading-relaxed mb-10" style={{ opacity: 0 }}>
            Whether you&apos;re deploying agents across your enterprise or scaling AI operations, we&apos;re here to ensure control, compliance, and confidence.
          </p>

          <div ref={ctaRef} style={{ opacity: 0 }}>
            <Link href="/docs" className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-[var(--accent-tertiary)] text-[var(--background)] text-xs font-medium tracking-[0.15em] uppercase hover:scale-105 transition-transform duration-300">
              <span>READ MORE ABOUT US</span>
              <span className="text-base">+</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
