'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface CursorBlobProps {
  color?: string;
  size?: number;
  trailColor?: string;
}

export default function CursorBlob({
  color = 'var(--ellipse-lavender)',
  size = 400,
  trailColor = 'var(--ellipse-yellow)'
}: CursorBlobProps) {
  const blobRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const blobPos = useRef({ x: 0, y: 0 });
  const trailPos = useRef({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [supportsHover, setSupportsHover] = useState(true);

  // Check for hover support after mount to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    setSupportsHover(window.matchMedia('(hover: hover)').matches);
  }, []);

  useEffect(() => {
    if (!isMounted || !supportsHover) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.dataset.cursorHover
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.dataset.cursorHover
      ) {
        setIsHovering(false);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    // Animation loop with lerp for smooth follow
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const animate = () => {
      // Main blob follows faster
      blobPos.current.x = lerp(blobPos.current.x, mousePos.current.x, 0.15);
      blobPos.current.y = lerp(blobPos.current.y, mousePos.current.y, 0.15);

      // Trail follows slower for offset effect
      trailPos.current.x = lerp(trailPos.current.x, mousePos.current.x, 0.08);
      trailPos.current.y = lerp(trailPos.current.y, mousePos.current.y, 0.08);

      if (blobRef.current) {
        blobRef.current.style.transform = `translate(${blobPos.current.x - size / 2}px, ${blobPos.current.y - size / 2}px)`;
      }

      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${trailPos.current.x - (size * 0.7) / 2}px, ${trailPos.current.y - (size * 0.7) / 2}px)`;
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, [size, isVisible, isMounted, supportsHover]);

  // Scale animation on hover
  useEffect(() => {
    if (!blobRef.current) return;

    gsap.to(blobRef.current, {
      scale: isHovering ? 1.5 : 1,
      duration: 0.4,
      ease: 'power2.out',
    });
  }, [isHovering]);

  // Don't render until mounted and don't show on touch devices
  if (!isMounted || !supportsHover) {
    return null;
  }

  return (
    <>
      {/* Trail blob - follows slower */}
      <div
        ref={trailRef}
        className="cursor-blob-trail"
        style={{
          position: 'fixed',
          width: size * 0.7,
          height: size * 0.7,
          borderRadius: '50%',
          background: trailColor,
          filter: 'blur(80px)',
          opacity: isVisible ? 0.4 : 0,
          pointerEvents: 'none',
          zIndex: 9998,
          willChange: 'transform',
          transition: 'opacity 0.3s ease',
          mixBlendMode: 'normal',
        }}
        aria-hidden="true"
      />

      {/* Main blob - follows faster */}
      <div
        ref={blobRef}
        className="cursor-blob"
        style={{
          position: 'fixed',
          width: size,
          height: size,
          borderRadius: '50%',
          background: color,
          filter: 'blur(100px)',
          opacity: isVisible ? 0.5 : 0,
          pointerEvents: 'none',
          zIndex: 9999,
          willChange: 'transform',
          transition: 'opacity 0.3s ease',
          mixBlendMode: 'normal',
        }}
        aria-hidden="true"
      />
    </>
  );
}
