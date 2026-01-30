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

// Default ellipses matching anima.ai style - larger, corner-positioned, stronger colors
const defaultEllipses: Ellipse[] = [
  // Top left - large yellow
  { color: 'var(--ellipse-yellow)', size: 1000, x: '-25%', y: '-20%', parallaxStrength: 0.03 },
  // Bottom right - lavender
  { color: 'var(--ellipse-lavender)', size: 800, x: '70%', y: '60%', parallaxStrength: 0.04 },
  // Bottom left - sage green
  { color: 'var(--ellipse-sage)', size: 600, x: '-10%', y: '75%', parallaxStrength: 0.05 },
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
        filter: 'blur(120px)',
        opacity: 0.7,
        y,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.7, scale: 1 }}
      transition={{ 
        duration: 1.5, 
        delay: index * 0.2,
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
