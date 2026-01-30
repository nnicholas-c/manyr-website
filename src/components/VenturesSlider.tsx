'use client';

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';

interface Venture {
  id: string;
  title: string;
  description: string;
  category?: string;
}

interface VenturesSliderProps {
  ventures: Venture[];
}

export default function VenturesSlider({ ventures }: VenturesSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const totalSlides = ventures.length;
  const cardWidth = 420; // Card width + gap
  const visibleCards = typeof window !== 'undefined' ? (window.innerWidth > 1024 ? 3 : window.innerWidth > 768 ? 2 : 1) : 3;

  const goToSlide = (index: number) => {
    const maxIndex = Math.max(0, totalSlides - visibleCards);
    const clampedIndex = Math.max(0, Math.min(index, maxIndex));
    setCurrentIndex(clampedIndex);

    if (trackRef.current) {
      gsap.to(trackRef.current, {
        x: -clampedIndex * cardWidth,
        duration: 0.6,
        ease: 'power2.out',
      });
    }
  };

  const handlePrev = () => {
    goToSlide(currentIndex - 1);
  };

  const handleNext = () => {
    goToSlide(currentIndex + 1);
  };

  // Mouse drag functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startX.current = e.pageX - (trackRef.current?.offsetLeft || 0);
    scrollLeft.current = currentIndex * cardWidth;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (trackRef.current?.offsetLeft || 0);
    const walk = (x - startX.current) * 1.5;

    if (trackRef.current) {
      gsap.set(trackRef.current, {
        x: -scrollLeft.current + walk,
      });
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setIsDragging(false);

    const x = e.pageX - (trackRef.current?.offsetLeft || 0);
    const walk = x - startX.current;

    if (Math.abs(walk) > 100) {
      if (walk > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    } else {
      goToSlide(currentIndex);
    }
  };

  // Touch functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    startX.current = e.touches[0].pageX;
    scrollLeft.current = currentIndex * cardWidth;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX;
    const walk = (x - startX.current) * 1.5;

    if (trackRef.current) {
      gsap.set(trackRef.current, {
        x: -scrollLeft.current + walk,
      });
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setIsDragging(false);

    const x = e.changedTouches[0].pageX;
    const walk = x - startX.current;

    if (Math.abs(walk) > 50) {
      if (walk > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    } else {
      goToSlide(currentIndex);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    const slider = sliderRef.current;
    slider?.addEventListener('keydown', handleKeyDown);

    return () => {
      slider?.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex]);

  // Format counter display
  const formatNumber = (num: number) => String(num).padStart(3, '0');

  return (
    <div className="relative">
      {/* Header with counter and navigation */}
      <div className="flex items-center justify-between mb-10 md:mb-14">
        <div className="flex items-baseline gap-2">
          <span className="font-serif text-4xl md:text-5xl tabular-nums">
            {formatNumber(currentIndex + 1)}
          </span>
          <span className="text-[var(--foreground-muted)] text-lg">/</span>
          <span className="text-[var(--foreground-muted)] text-lg tabular-nums">
            {formatNumber(totalSlides)}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="w-12 h-12 flex items-center justify-center border border-[var(--accent-primary)]/30 rounded-full transition-all duration-300 hover:bg-[var(--accent-primary)]/10 hover:border-[var(--accent-primary)]/50 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous slide"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex >= totalSlides - visibleCards}
            className="w-12 h-12 flex items-center justify-center border border-[var(--accent-primary)]/30 rounded-full transition-all duration-300 hover:bg-[var(--accent-primary)]/10 hover:border-[var(--accent-primary)]/50 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next slide"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Slider container */}
      <div
        ref={sliderRef}
        className="overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        tabIndex={0}
        role="region"
        aria-label="Ventures slider"
        aria-roledescription="carousel"
      >
        <div
          ref={trackRef}
          className="flex gap-6"
          style={{ transform: 'translateX(0)' }}
        >
          {ventures.map((venture, index) => (
            <div
              key={venture.id}
              className={`flex-shrink-0 w-[380px] md:w-[400px] transition-opacity duration-300 ${
                index >= currentIndex && index < currentIndex + visibleCards
                  ? 'opacity-100'
                  : 'opacity-40'
              }`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${totalSlides}`}
            >
              <div className="bg-[#0d1a28]/60 backdrop-blur-md border border-[var(--accent-primary)]/20 rounded-2xl p-8 md:p-10 h-full">
                {venture.category && (
                  <span className="text-xs font-medium text-[var(--accent-primary)] uppercase tracking-wider mb-4 block">
                    {venture.category}
                  </span>
                )}
                <h3 className="font-serif text-2xl md:text-3xl font-light text-[var(--foreground)] mb-4 tracking-tight">
                  {venture.title}
                </h3>
                <p className="text-sm md:text-base text-[var(--foreground-muted)] leading-relaxed">
                  {venture.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Discover all link */}
      <div className="mt-10 md:mt-14">
        <a
          href="#ventures"
          className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.15em] uppercase text-[var(--accent-primary)] hover:opacity-70 transition-opacity duration-300"
        >
          <span>DISCOVER ALL VENTURES</span>
          <span>→</span>
        </a>
      </div>
    </div>
  );
}
