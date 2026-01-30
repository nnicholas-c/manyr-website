'use client';

import { useState, useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { Section, Button } from '@/components';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const fieldVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5, 
        delay: 0.3 + i * 0.1,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    }),
  };

  return (
    <Section id="contact" number="007" title="Have a seat.">
      <div ref={ref} className="grid md:grid-cols-2 gap-12 md:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-lg md:text-xl text-[#4A4A4A] leading-relaxed mb-6">
            Ready to bring governance to your AI agents? We&apos;re working with 
            forward-thinking teams building the next generation of autonomous systems.
          </p>
          <p className="text-lg md:text-xl text-[#4A4A4A] leading-relaxed">
            Tell us about your use case, and let&apos;s explore how Manyr can help 
            you deploy autonomy safely.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {submitted ? (
            <motion.div 
              className="bg-[#E8F5E9] border border-[#2E7D32]/20 rounded-2xl p-8 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.div 
                className="text-4xl mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
              >
                ✓
              </motion.div>
              <h3 className="font-serif text-2xl mb-2">Thanks for reaching out</h3>
              <p className="text-[#4A4A4A]">We&apos;ll be in touch soon.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <motion.div
                custom={0}
                variants={fieldVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
              >
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  required
                  placeholder="Your name"
                  className="w-full"
                />
              </motion.div>
              <motion.div
                custom={1}
                variants={fieldVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
              >
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  required
                  placeholder="you@company.com"
                  className="w-full"
                />
              </motion.div>
              <motion.div
                custom={2}
                variants={fieldVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
              >
                <label htmlFor="company" className="block text-sm font-medium mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  value={formState.company}
                  onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                  placeholder="Your company"
                  className="w-full"
                />
              </motion.div>
              <motion.div
                custom={3}
                variants={fieldVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
              >
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  rows={4}
                  placeholder="Tell us about your use case..."
                  className="w-full resize-none"
                />
              </motion.div>
              <motion.div
                custom={4}
                variants={fieldVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
              >
                <Button type="submit" variant="primary" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? 'Sending...' : 'Send message'}
                  {!isSubmitting && <span aria-hidden="true">→</span>}
                </Button>
              </motion.div>
            </form>
          )}
        </motion.div>
      </div>
    </Section>
  );
}
