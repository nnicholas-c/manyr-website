'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Step {
  title: string;
  description: string;
  gradient: string;
}

const steps: Step[] = [
  {
    title: 'Spot the risk',
    description: 'We monitor agent actions in real-time, detecting policy violations before they escalate.',
    gradient: 'linear-gradient(135deg, #2a3a4a 0%, #1a2a3a 50%, #3a4a5a 100%)',
  },
  {
    title: 'Build guardrails',
    description: 'We build governance rules from the ground up—defining boundaries, permissions, and escalation paths for every agent.',
    gradient: 'linear-gradient(135deg, #4a3a5a 0%, #3a2a4a 50%, #5a4a6a 100%)',
  },
  {
    title: 'Scale with confidence',
    description: 'We bring autonomous AI to production with the right controls, compliance, and oversight.',
    gradient: 'linear-gradient(135deg, #3a4a3a 0%, #2a3a2a 50%, #4a5a4a 100%)',
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
      className="relative bg-white py-24 lg:py-32"
    >
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div ref={headerRef} className="flex justify-between items-start mb-20 lg:mb-28">
          <h2 className="heading-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] tracking-[-0.02em] text-[#1a1a1a]">
            How we work
          </h2>
          <span className="text-xs font-medium tracking-[0.2em] text-[#666] uppercase hidden md:block">
            002/ &nbsp;&nbsp; MISSION
          </span>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="space-y-20 lg:space-y-0">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="step-item grid lg:grid-cols-2 gap-12 lg:gap-20 items-center border-t border-[#e5e5e5] py-16 lg:py-20"
            >
              {/* Text content */}
              <div className="step-text" style={{ opacity: 0 }}>
                <h3 className="heading-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-[-0.02em] text-[#1a1a1a] mb-6">
                  {step.title}
                </h3>
                <p className="text-[#666] text-base md:text-lg leading-relaxed max-w-lg">
                  {step.description}
                </p>
              </div>

              {/* Abstract visual */}
              <div 
                className="step-image relative aspect-[4/3] rounded-lg overflow-hidden" 
                style={{ opacity: 0, background: step.gradient }}
              >
                {/* Grid pattern overlay */}
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '30px 30px',
                  }}
                />
                {/* Abstract blobs */}
                <div 
                  className="absolute w-32 h-32 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
                    top: '20%',
                    left: '20%',
                    filter: 'blur(20px)',
                  }}
                />
                <div 
                  className="absolute w-24 h-24 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
                    bottom: '30%',
                    right: '25%',
                    filter: 'blur(15px)',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
