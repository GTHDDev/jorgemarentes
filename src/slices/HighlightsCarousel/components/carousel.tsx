"use client";

import { FC, useState, useCallback, useMemo, useRef } from "react";
import * as m from "motion/react-m";
import { Content } from "@prismicio/client";
import HighlightCard from "./highlight-card";
import { carouselContainer, carouselHint, carouselTransitionSlow, highlightsCarouselDelays } from "@/lib/motion-variants";

interface CarouselProps {
  highlights: Content.HighlightsCarouselSliceDefaultPrimaryHighligthsItem[];
}

/**
 * Carousel component for displaying highlight cards with infinite scroll animation.
 * Client Component - requires state management for pause on hover/focus.
 * Optimized with LazyMotion (m component) and React hooks for performance.
 */
const Carousel: FC<CarouselProps> = ({ highlights }) => {
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Duplicate highlights for seamless infinite scroll
  const duplicatedHighlights = useMemo(() => [...highlights, ...highlights], [highlights]);

  // Calculate total width for animation
  // Mobile: 340px, Desktop: 380px (using desktop for animation calculation)
  const cardWidth = 380; // sm:w-[380px]
  const gap = 24; // gap-6 = 1.5rem = 24px
  const totalWidth = useMemo(() => {
    return highlights.length * (cardWidth + gap);
  }, [highlights.length]);

  const handleMouseEnter = useCallback(() => {
    setIsPaused(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsPaused(false);
  }, []);

  const handleFocus = useCallback(() => {
    setIsPaused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsPaused(false);
  }, []);

  return (
    <>
      <m.div
        ref={containerRef}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={carouselContainer}
        transition={{ ...carouselTransitionSlow, delay: highlightsCarouselDelays?.carousel ?? 0.2 }}
        className="relative"
        role="region"
        aria-roledescription="carousel"
        aria-label="Practice highlights"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <div className="overflow-hidden" aria-live="polite" aria-atomic="false">
          <m.div
            className="flex gap-6"
            animate={{
              x: isPaused ? undefined : [0, -totalWidth],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
            style={{ willChange: "transform" }}
          >
            {duplicatedHighlights.map((highlight, index) => (
              <HighlightCard
                key={`${index}-${highlight.title || index}`}
                highlight={highlight}
                index={index % highlights.length}
              />
            ))}
          </m.div>
        </div>

        {/* Gradient Overlays */}
        <div
          className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-[#0a0a0a] to-transparent pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-[#0a0a0a] to-transparent pointer-events-none"
          aria-hidden="true"
        />
      </m.div>

      <m.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={carouselHint}
        transition={{ ...carouselTransitionSlow, delay: highlightsCarouselDelays?.hint ?? 0.4 }}
        className="text-center mt-8"
      >
        <p className="text-sm text-[#0F0F0F]/50 dark:text-white/50">
          Hover para pausar • Scroll para ver más
        </p>
      </m.div>
    </>
  );
};

export default Carousel;
