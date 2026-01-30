'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section, VenturesSlider } from '@/components';

gsap.registerPlugin(ScrollTrigger);

const ventures = [
  {
    id: 'devops',
    title: 'DevOps & Infrastructure',
    description:
      'Agents executing IaC changes, deployments, or cluster operations with guardrails for production environments.',
    category: 'Infrastructure',
  },
  {
    id: 'security',
    title: 'Security Operations',
    description:
      'Automated incident response accessing logs, configs, or running scripts with constrained scope and approval workflows.',
    category: 'Security',
  },
  {
    id: 'research',
    title: 'Research & Development',
    description:
      'Biotech, pharma, or research agents handling proprietary data with strict boundaries and compliance-grade audit trails.',
    category: 'R&D',
  },
  {
    id: 'data',
    title: 'Data Platform Operations',
    description:
      'Agents managing pipelines, warehouses, and analytics with data governance constraints and approval gates.',
    category: 'Data',
  },
  {
    id: 'it',
    title: 'Internal IT Automation',
    description:
      'Admin agents with privileged access to systems, requiring human-in-the-loop approval for high-risk changes.',
    category: 'IT',
  },
  {
    id: 'finance',
    title: 'Finance & Ops',
    description:
      'Autonomous copilots executing transactions or operational tasks with escalation workflows and full traceability.',
    category: 'Finance',
  },
];

export default function UseCases() {
  const contentRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        gsap.set([introRef.current], {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
        });
        return;
      }

      // Intro animation
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
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section
      id="ventures"
      number="006"
      title="Ventures"
      background="alt"
      ellipses={[
        { color: 'var(--ellipse-sky)', size: 1000, x: '-15%', y: '-10%', parallaxStrength: 0.03 },
        { color: 'var(--ellipse-rose)', size: 850, x: '80%', y: '60%', parallaxStrength: 0.04 },
        { color: 'var(--ellipse-yellow)', size: 700, x: '95%', y: '-25%', parallaxStrength: 0.035 },
      ]}
    >
      <div ref={contentRef}>
        {/* Intro */}
        <div ref={introRef} className="max-w-3xl mb-16 md:mb-20" style={{ opacity: 0 }}>
          <p className="text-lg md:text-xl text-[var(--foreground-muted)] leading-relaxed">
            We work with teams building autonomous systems across high-stakes environments—where
            the cost of an uncontrolled action is too high to ignore.
          </p>
        </div>

        {/* Ventures slider - anima.ai style horizontal scroll with counter */}
        <VenturesSlider ventures={ventures} />
      </div>
    </Section>
  );
}
