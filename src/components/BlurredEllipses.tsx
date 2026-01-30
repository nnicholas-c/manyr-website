'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface Ellipse {
  color: string;
  size: number;
  x: string;
  y: string;
  parallaxStrength?: number;
}

interface BlurredEllipsesProps {
  ellipses?: Ellipse[];
  className?: string;
}

// Default ellipses matching anima.ai style - larger, corner-positioned, vibrant colors
const defaultEllipses: Ellipse[] = [
  // Top left - large yellow/cream
  { color: 'var(--ellipse-yellow)', size: 1200, x: '-30%', y: '-25%', parallaxStrength: 0.03 },
  // Top right - lavender
  { color: 'var(--ellipse-lavender)', size: 900, x: '75%', y: '-15%', parallaxStrength: 0.035 },
  // Bottom right - peach
  { color: 'var(--ellipse-peach)', size: 1000, x: '80%', y: '65%', parallaxStrength: 0.04 },
  // Bottom left - sage green
  { color: 'var(--ellipse-sage)', size: 800, x: '-20%', y: '70%', parallaxStrength: 0.05 },
];

function ParallaxEllipse({ ellipse, index }: { ellipse: Ellipse; index: number }) {
  const { scrollY } = useScroll();
  
  const rawY = useTransform(
    scrollY,
    [0, 3000],
    [0, -(ellipse.parallaxStrength || 0.05) * 600]
  );
  
  // Smooth spring animation for parallax
  const y = useSpring(rawY, { stiffness: 30, damping: 30 });

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: ellipse.size,
        height: ellipse.size,
        left: ellipse.x,
        top: ellipse.y,
        background: ellipse.color,
        filter: 'blur(100px)',
        opacity: 0.85,
        y,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.85, scale: 1 }}
      transition={{
        duration: 1.8,
        delay: index * 0.15,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    />
  );
}

export default function BlurredEllipses({ ellipses = defaultEllipses, className = '' }: BlurredEllipsesProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {ellipses.map((ellipse, index) => (
        <ParallaxEllipse key={index} ellipse={ellipse} index={index} />
      ))}
    </div>
  );
}
