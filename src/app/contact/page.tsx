'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BlurredEllipses, Button } from '@/components';

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-20 pb-16 relative flex items-center">
      <BlurredEllipses
        ellipses={[
          { color: '#F5EFE0', size: 600, x: '-10%', y: '20%', parallaxStrength: 0.08 },
          { color: '#EDE8F5', size: 500, x: '70%', y: '10%', parallaxStrength: 0.1 },
          { color: '#FDF6E3', size: 400, x: '80%', y: '60%', parallaxStrength: 0.06 },
          { color: '#E8EDE5', size: 350, x: '20%', y: '70%', parallaxStrength: 0.12 },
        ]}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-number block mb-4">005/</span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light mb-8">
              Have a seat.
            </h1>
            <div className="space-y-6 text-lg text-[#4A4A4A] leading-relaxed">
              <p>
                We&apos;re building the governance infrastructure for autonomous AI. 
                If you&apos;re deploying agents that touch sensitive systems, we&apos;d 
                love to hear about your challenges.
              </p>
              <p>
                We&apos;re currently working with a small group of design partners 
                on early pilots. Whether you&apos;re ready to explore integration or 
                just want to learn more, reach out.
              </p>
            </div>

            {/* Contact info */}
            <div className="mt-12 space-y-4">
              <div className="flex items-center gap-3 text-[#4A4A4A]">
                <span className="w-8 h-8 flex items-center justify-center bg-[#FAF9F6] rounded-full text-sm">
                  @
                </span>
                <span>hello@manyr.ai</span>
              </div>
              <div className="flex items-center gap-3 text-[#4A4A4A]">
                <span className="w-8 h-8 flex items-center justify-center bg-[#FAF9F6] rounded-full text-sm">
                  in
                </span>
                <span>linkedin.com/company/manyr</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="bg-white/70 backdrop-blur-sm border border-[rgba(28,28,28,0.08)] rounded-3xl p-8 md:p-10">
              {submitted ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="w-16 h-16 bg-[#E8F5E9] rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-[#2E7D32]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="font-serif text-3xl mb-3">Message sent</h2>
                  <p className="text-[#4A4A4A]">
                    Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name <span className="text-[#C62828]">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      required
                      placeholder="Your name"
                      className="w-full bg-white/80"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Work email <span className="text-[#C62828]">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      required
                      placeholder="you@company.com"
                      className="w-full bg-white/80"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      value={formState.company}
                      onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                      placeholder="Your company name"
                      className="w-full bg-white/80"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      How can we help?
                    </label>
                    <textarea
                      id="message"
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      rows={4}
                      placeholder="Tell us about your use case, challenges, or questions..."
                      className="w-full resize-none bg-white/80"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    className="w-full !py-4"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <>
                        Send message
                        <span aria-hidden="true">→</span>
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-[#4A4A4A] text-center">
                    We respect your privacy. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
