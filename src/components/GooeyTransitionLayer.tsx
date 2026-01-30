'use client';

import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

interface GooeyTransitionLayerProps {
  color?: string;
}

// Custom event for triggering transitions
declare global {
  interface WindowEventMap {
    'gooeyTransition': CustomEvent<{ targetId: string }>;
  }
}

export default function GooeyTransitionLayer({
  color = 'var(--background)'
}: GooeyTransitionLayerProps) {
  const layerRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const triggerTransition = useCallback((targetId: string) => {
    if (isAnimating.current || !layerRef.current || !blobsRef.current) return;

    isAnimating.current = true;
    const layer = layerRef.current;
    const blobs = blobsRef.current;

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
      },
    });

    // Gooey blob wipe in
    tl.set(layer, { display: 'block' })
      .fromTo(
        blobs.children,
        {
          scale: 0,
          opacity: 1,
        },
        {
          scale: 3,
          opacity: 1,
          duration: 0.5,
          stagger: {
            each: 0.05,
            from: 'random',
          },
          ease: 'power2.in',
        }
      )
      .to(layer, {
        backgroundColor: color,
        duration: 0.1,
      })
      .add(() => {
        // Scroll to target
        const target = document.getElementById(targetId);
        if (target) {
          window.scrollTo({
            top: target.offsetTop,
            behavior: 'auto',
          });
        }
      })
      // Gooey blob wipe out
      .to(
        blobs.children,
        {
          scale: 0,
          opacity: 0,
          duration: 0.4,
          stagger: {
            each: 0.03,
            from: 'random',
          },
          ease: 'power2.out',
        },
        '+=0.1'
      )
      .set(layer, { display: 'none' });
  }, [color]);

  useEffect(() => {
    const handleTransition = (e: CustomEvent<{ targetId: string }>) => {
      triggerTransition(e.detail.targetId);
    };

    window.addEventListener('gooeyTransition', handleTransition as EventListener);

    return () => {
      window.removeEventListener('gooeyTransition', handleTransition as EventListener);
    };
  }, [triggerTransition]);

  // Fixed blob positions to avoid hydration mismatch
  // (Math.random() produces different values on server vs client)
  const blobs = [
    { id: 0, x: 10, y: 15, size: 200 },
    { id: 1, x: 85, y: 25, size: 280 },
    { id: 2, x: 30, y: 70, size: 220 },
    { id: 3, x: 70, y: 10, size: 180 },
    { id: 4, x: 50, y: 50, size: 300 },
    { id: 5, x: 20, y: 85, size: 250 },
    { id: 6, x: 90, y: 60, size: 190 },
    { id: 7, x: 40, y: 30, size: 270 },
    { id: 8, x: 60, y: 90, size: 210 },
    { id: 9, x: 5, y: 45, size: 240 },
    { id: 10, x: 75, y: 80, size: 260 },
    { id: 11, x: 45, y: 5, size: 230 },
  ];

  return (
    <>
      {/* SVG filter for gooey effect */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="gooey-transition-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -12"
              result="goo"
            />
          </filter>
        </defs>
      </svg>

      <div
        ref={layerRef}
        className="fixed inset-0 z-[200] pointer-events-none"
        style={{ display: 'none' }}
        aria-hidden="true"
      >
        <div
          ref={blobsRef}
          className="absolute inset-0"
          style={{ filter: 'url(#gooey-transition-filter)' }}
        >
          {blobs.map((blob) => (
            <div
              key={blob.id}
              className="absolute rounded-full"
              style={{
                left: `${blob.x}%`,
                top: `${blob.y}%`,
                width: blob.size,
                height: blob.size,
                backgroundColor: color,
                transform: 'scale(0) translate(-50%, -50%)',
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}

// Helper function to trigger transition from anywhere
export function triggerGooeyTransition(targetId: string) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('gooeyTransition', { detail: { targetId } })
    );
  }
}
