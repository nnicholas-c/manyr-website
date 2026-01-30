'use client';

import { ReactNode, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BlurredEllipses from './BlurredEllipses';

gsap.registerPlugin(ScrollTrigger);

interface Ellipse {
  color: string;
  size: number;
  x: string;
  y: string;
  parallaxStrength?: number;
}

interface SectionProps {
  id?: string;
  number?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  background?: 'default' | 'alt';
  showEllipses?: boolean;
  ellipses?: Ellipse[];
}

// Default ellipse configurations for each background type
const defaultEllipsesConfig: Ellipse[] = [
  { color: 'var(--ellipse-yellow)', size: 700, x: '85%', y: '-15%', parallaxStrength: 0.03 },
  { color: 'var(--ellipse-lavender)', size: 600, x: '-20%', y: '60%', parallaxStrength: 0.04 },
];

const altEllipsesConfig: Ellipse[] = [
  { color: 'var(--ellipse-sage)', size: 750, x: '-15%', y: '-10%', parallaxStrength: 0.035 },
  { color: 'var(--ellipse-peach)', size: 650, x: '80%', y: '65%', parallaxStrength: 0.04 },
];

export default function Section({
  id,
  number,
  title,
  subtitle,
  children,
  className = '',
  background = 'default',
  showEllipses = true,
  ellipses,
}: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Use provided ellipses or default based on background
  const ellipseConfig = ellipses || (background === 'alt' ? altEllipsesConfig : defaultEllipsesConfig);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Check for reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        // Just show everything without animation
        gsap.set([numberRef.current, titleRef.current, subtitleRef.current, contentRef.current], {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
        });
        return;
      }

      // Create scroll-triggered timeline for each section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 30%',
          toggleActions: 'play none none none',
        },
      });

      // Section number fades in first
      if (numberRef.current) {
        tl.fromTo(
          numberRef.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          }
        );
      }

      // Title reveals with blur-to-sharp effect
      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          {
            opacity: 0,
            y: 60,
            filter: 'blur(15px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.9,
            ease: 'power2.out',
          },
          '-=0.3'
        );
      }

      // Subtitle fades in
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          {
            opacity: 0,
            y: 30,
            filter: 'blur(8px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.7,
            ease: 'power2.out',
          },
          '-=0.5'
        );
      }

      // Content area fades and rises
      if (contentRef.current) {
        tl.fromTo(
          contentRef.current,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.4'
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative py-24 md:py-32 lg:py-40 overflow-hidden ${
        background === 'alt' ? 'bg-[var(--background-alt)]' : ''
      } ${className}`}
    >
      {showEllipses && <BlurredEllipses ellipses={ellipseConfig} />}

      <div className="relative z-10 max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20">
        {(number || title) && (
          <div className="mb-16 md:mb-24">
            {number && (
              <span
                ref={numberRef}
                className="section-number block mb-6"
                style={{ opacity: 0 }}
              >
                {number}/
              </span>
            )}
            {title && (
              <h2
                ref={titleRef}
                className="heading-display text-[clamp(2.5rem,6vw,5rem)] max-w-5xl"
                style={{ opacity: 0 }}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                ref={subtitleRef}
                className="mt-8 text-lg md:text-xl text-[var(--foreground-muted)] max-w-2xl leading-relaxed"
                style={{ opacity: 0 }}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}
        <div ref={contentRef} style={{ opacity: 0 }}>
          {children}
        </div>
      </div>
    </section>
  );
}
