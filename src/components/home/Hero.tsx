'use client';

import { motion, type Variants } from 'framer-motion';
import { BlurredEllipses, Button } from '@/components';

// Large animated headline like anima.ai - "Growing nature-inspired companies"
function AnimatedHeadline() {
  // Split into lines for dramatic stacking effect
  const lines = ['Governing', 'AI agents'];
  
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
      },
    },
  };

  const lineAnimation: Variants = {
    hidden: { 
      opacity: 0, 
      y: 80,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.h1
      className="heading-display text-[clamp(3.5rem,12vw,10rem)] leading-[0.95] tracking-[-0.04em]"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {lines.map((line, index) => (
        <motion.span
          key={index}
          className="block overflow-hidden"
          variants={lineAnimation}
        >
          <span className="block">{line}</span>
        </motion.span>
      ))}
    </motion.h1>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden pt-32 pb-12">
      <BlurredEllipses
        ellipses={[
          { color: 'var(--ellipse-yellow)', size: 900, x: '-20%', y: '-15%', parallaxStrength: 0.03 },
          { color: 'var(--ellipse-lavender)', size: 700, x: '75%', y: '50%', parallaxStrength: 0.05 },
          { color: 'var(--ellipse-sage)', size: 500, x: '10%', y: '80%', parallaxStrength: 0.04 },
        ]}
      />

      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20 w-full">
        <AnimatedHeadline />

        {/* Subheadline - positioned like anima.ai */}
        <motion.div
          className="mt-12 md:mt-16 max-w-xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-lg md:text-xl text-[var(--foreground-muted)] leading-relaxed">
            We build the control plane for autonomous AI systems. Authorize, audit, 
            and constrain every action your agents take.
          </p>
        </motion.div>

        {/* CTA - minimal like anima.ai */}
        <motion.div
          className="mt-10 md:mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <Button href="/demo" variant="secondary" className="group">
            <span>KNOW MORE</span>
            <motion.span
              className="inline-block ml-2"
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
            >
              →
            </motion.span>
          </Button>
        </motion.div>
      </div>

      {/* Section indicator at bottom left - anima.ai style */}
      <motion.div
        className="relative z-10 max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <div className="section-number">001/ ABOUT</div>
      </motion.div>
    </section>
  );
}
