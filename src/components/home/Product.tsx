'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SpotRiskAnimation, BuildGuardrailsAnimation, ScaleConfidenceAnimation } from './ProductAnimations';

gsap.registerPlugin(ScrollTrigger);

// Animation components mapped by step index
const stepAnimations = [
  SpotRiskAnimation,
  BuildGuardrailsAnimation,
  ScaleConfidenceAnimation,
];

interface Step {
  title: string;
  description: string;
  gradient: string;
  icon: string;
}

const steps: Step[] = [
  {
    title: 'Spot the risk',
    description: 'We monitor agent actions in real-time, detecting policy violations before they escalate.',
    gradient: 'linear-gradient(135deg, rgba(34, 211, 238, 0.1) 0%, rgba(20, 184, 166, 0.15) 100%)',
    icon: '◎',
  },
  {
    title: 'Build guardrails',
    description: 'We build governance rules from the ground up—defining boundaries, permissions, and escalation paths for every agent.',
    gradient: 'linear-gradient(135deg, rgba(167, 139, 250, 0.1) 0%, rgba(99, 102, 241, 0.15) 100%)',
    icon: '⬡',
  },
  {
    title: 'Scale with confidence',
    description: 'We bring autonomous AI to production with the right controls, compliance, and oversight.',
    gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(34, 211, 238, 0.15) 100%)',
    icon: '◇',
  },
];

export default function Product() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) return;

      // Header animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Steps animation with stagger
      if (stepsRef.current) {
        const stepElements = stepsRef.current.querySelectorAll('.step-item');
        stepElements.forEach((step) => {
          const textEl = step.querySelector('.step-text');
          const imageEl = step.querySelector('.step-image');
          
          gsap.fromTo(
            textEl,
            { opacity: 0, x: -40 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: step,
                start: 'top 75%',
              },
            }
          );

          gsap.fromTo(
            imageEl,
            { opacity: 0, x: 40 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              delay: 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: step,
                start: 'top 75%',
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="product"
      className="relative bg-[var(--background)] py-24 lg:py-32"
    >
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[1000px] h-[1000px] rounded-full" style={{ background: 'var(--ellipse-cyan)', filter: 'blur(200px)', top: '20%', left: '-20%', opacity: 0.5 }} />
      </div>

      <div className="relative z-10 max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div ref={headerRef} className="flex justify-between items-start mb-20 lg:mb-28">
          <h2 className="heading-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] tracking-[-0.02em] text-[var(--foreground)]">
            How we work
          </h2>
          <span className="text-xs font-mono tracking-[0.2em] text-[var(--accent-primary)] uppercase hidden md:block">
            003/ &nbsp;&nbsp; PRODUCT
          </span>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="space-y-20 lg:space-y-0">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="step-item grid lg:grid-cols-2 gap-12 lg:gap-20 items-center border-t border-[var(--border)] py-16 lg:py-20"
            >
              {/* Text content */}
              <div className="step-text" style={{ opacity: 0 }}>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-[var(--accent-primary)] text-2xl">{step.icon}</span>
                  <span className="text-xs font-mono tracking-wider text-[var(--foreground-subtle)]">
                    00{index + 1}
                  </span>
                </div>
                <h3 className="heading-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-[-0.02em] text-[var(--foreground)] mb-6">
                  {step.title}
                </h3>
                <p className="text-[var(--foreground-muted)] text-base md:text-lg leading-relaxed max-w-lg">
                  {step.description}
                </p>
              </div>

              {/* Animated visual */}
              <div 
                className="step-image relative aspect-[4/3] rounded-2xl overflow-hidden border border-[var(--border)]" 
                style={{ opacity: 0 }}
              >
                {(() => {
                  const AnimationComponent = stepAnimations[index];
                  return <AnimationComponent />;
                })()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
