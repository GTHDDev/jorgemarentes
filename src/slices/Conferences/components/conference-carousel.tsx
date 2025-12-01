"use client";

import { FC, useState, useCallback } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Content } from "@prismicio/client";
import { Button } from "@/components/ui/button";
import ConferenceCard from "./conference-card";

interface ConferenceCarouselProps {
  conferences: Content.ConferencesSliceDefaultPrimaryConferencesItem[];
}

/**
 * Carousel component for displaying conference cards.
 * Client Component - requires state management for carousel navigation.
 */
const ConferenceCarousel: FC<ConferenceCarouselProps> = ({ conferences }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? conferences.length - 1 : prev - 1));
  }, [conferences.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === conferences.length - 1 ? 0 : prev + 1
    );
  }, [conferences.length]);

  const handleGoToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, action: () => void) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        action();
      }
    },
    []
  );

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0.0, 0.2, 1] as [number, number, number, number],
      },
    },
  } as const;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative"
      role="region"
      aria-roledescription="carousel"
      aria-label="Conference presentations"
    >
      <div className="relative overflow-hidden rounded-[2.5rem]">
        {/* Carousel Track */}
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ 
            transform: `translateX(-${currentIndex * 100}%)`,
            transitionTimingFunction: 'var(--transition-smooth)'
          }}
          aria-live="polite"
          aria-atomic="true"
          id="carousel-track"
        >
          {conferences.map((conference, index) => (
            <ConferenceCard
              key={index}
              conference={conference}
              index={index}
              isActive={index === currentIndex}
            />
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-4 mt-8" role="group" aria-label="Carousel navigation">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevious}
          onKeyDown={(e) => handleKeyDown(e, handlePrevious)}
          className="w-12 h-12 bg-white dark:bg-[#1a1a1a] hover:bg-pearl-white dark:hover:bg-[#2a2a2a] shadow-soft hover:shadow-medium"
          aria-label="Previous conference"
          aria-controls="carousel-track"
          tabIndex={0}
        >
          <ChevronLeft
            className="w-6 h-6 text-ink-black dark:text-white"
            aria-hidden="true"
          />
        </Button>

        {/* Indicators */}
        <div
          className="flex items-center gap-2"
          role="tablist"
          aria-label="Slide indicators"
        >
          {conferences.map((_, index) => (
            <button
              key={index}
              onClick={() => handleGoToSlide(index)}
              onKeyDown={(e) => handleKeyDown(e, () => handleGoToSlide(index))}
              className={`transition-smooth rounded-full focus:outline-none focus:ring-2 focus:ring-steel-blue focus:ring-offset-2 ${
                index === currentIndex
                  ? "w-8 h-2 bg-steel-blue"
                  : "w-2 h-2 bg-ink-black/20 dark:bg-white/20 hover:bg-ink-black/40 dark:hover:bg-white/40"
              }`}
              aria-label={`Go to slide ${index + 1} of ${conferences.length}`}
              aria-current={index === currentIndex}
              role="tab"
              tabIndex={index === currentIndex ? 0 : -1}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          onKeyDown={(e) => handleKeyDown(e, handleNext)}
          className="w-12 h-12 bg-white dark:bg-[#1a1a1a] hover:bg-pearl-white dark:hover:bg-[#2a2a2a] shadow-soft hover:shadow-medium"
          aria-label="Next conference"
          aria-controls="carousel-track"
          tabIndex={0}
        >
          <ChevronRight
            className="w-6 h-6 text-ink-black dark:text-white"
            aria-hidden="true"
          />
        </Button>
      </div>
    </motion.div>
  );
};

export default ConferenceCarousel;

