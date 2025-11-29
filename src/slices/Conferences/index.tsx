"use client";
import { FC, useRef, useState } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { motion, useInView } from "motion/react";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Play
} from "lucide-react";
import {
  PrismicNextImage,
  PrismicNextLink
} from "@prismicio/next";

/**
 * Props for `Conferences`.
 */
export type ConferencesProps = SliceComponentProps<Content.ConferencesSlice>;

/**
 * Component for "Conferences" Slices.
 */
const Conferences: FC<ConferencesProps> = ({ slice }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const conferences = slice.primary.conferences

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? conferences.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === conferences.length - 1 ? 0 : prev + 1
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };

  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-32 bg-soft-beige dark:bg-ink-black overflow-hidden"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-white/5 backdrop-blur-sm rounded-full mb-6">
            <span className="text-sm font-medium text-ink-black/70 dark:text-white/70">
              {slice.primary.tag}
            </span>
          </div>
          <h2 className="font-['Space_Grotesk'] text-4xl sm:text-5xl lg:text-6xl tracking-tight text-ink-black dark:text-white mb-6">
            {slice.primary.heading}
          </h2>
          <p className="text-lg lg:text-xl text-ink-black/60 dark:text-white/60 leading-relaxed">
            {slice.primary.description}
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
          role="region"
          aria-roledescription="carousel"
          aria-label="Conference presentations"
        >
          <div className="relative overflow-hidden rounded-[2.5rem]">
            {/* Carousel Track */}
            <div className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {conferences.map((conference, index) => (
                <div
                  key={index}
                  className="min-w-full"
                  aria-hidden={index !== currentIndex}
                >
                  <div className="grid lg:grid-cols-2 gap-0 h-full bg-white dark:bg-[#1a1a1a] shadow-strong rounded-[2.5rem] overflow-hidden">
                    {/* Image Side */}
                    <div className="relative aspect-[4/3] lg:aspect-auto">
                      <PrismicNextImage
                        field={conference.image}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-black/40 via-transparent to-transparent" />

                      {/* Play Button Overlay */}
                      <motion.button
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-strong hover:scale-110 transition-transform duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Play video"
                      >
                        <Play className="w-8 h-8 text-steel-blue ml-1" fill="currentColor" />
                      </motion.button>

                      {/* Type Badge */}
                      <div className="absolute top-6 left-6 px-4 py-2 bg-mango-gold text-ink-black text-sm font-medium rounded-full">
                        {conference.type}
                      </div>
                    </div>

                    {/* Content Side */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <h3 className="font-['Space_Grotesk'] text-3xl lg:text-4xl text-ink-black dark:text-white mb-6 tracking-tight">
                        {conference.title}
                      </h3>

                      <div className="space-y-3 mb-8">
                        <div className="flex items-start gap-3 text-ink-black/70 dark:text-white/70">
                          <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-steel-blue" />
                          <div>
                            <div className="font-medium text-ink-black dark:text-white mb-1">
                              {conference.event}
                            </div>
                            <div className="text-sm">{conference.location}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-ink-black/70 dark:text-white/70">
                          <Calendar className="w-5 h-5 flex-shrink-0 text-steel-blue" />
                          <span>{conference.date}</span>
                        </div>
                      </div>

                      <motion.button
                        className="bg-ink-black dark:bg-white text-white dark:text-ink-black rounded-full font-medium self-start hover:bg-deep-sage dark:hover:bg-soft-beige transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <PrismicNextLink
                          field={conference.conference_link}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full"
                        >
                          <Play className="w-4 h-4" />
                          Ver Evento
                        </PrismicNextLink>
                      </motion.button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrevious}
              onKeyDown={(e) => handleKeyDown(e, handlePrevious)}
              className="w-12 h-12 bg-white dark:bg-[#1a1a1a] rounded-full flex items-center justify-center shadow-soft hover:shadow-medium transition-all duration-300 hover:bg-pearl-white dark:hover:bg-[#2a2a2a] disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Previous conference"
            >
              <ChevronLeft className="w-6 h-6 text-ink-black dark:text-white" />
            </button>

            {/* Indicators */}
            <div className="flex items-center gap-2">
              {conferences.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`transition-all duration-300 rounded-full ${index === currentIndex
                    ? "w-8 h-2 bg-steel-blue"
                    : "w-2 h-2 bg-ink-black/20 dark:bg-white/20 hover:bg-ink-black/40 dark:hover:bg-white/40"
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === currentIndex}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              onKeyDown={(e) => handleKeyDown(e, handleNext)}
              className="w-12 h-12 bg-white dark:bg-[#1a1a1a] rounded-full flex items-center justify-center shadow-soft hover:shadow-medium transition-all duration-300 hover:bg-pearl-white dark:hover:bg-[#2a2a2a] disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Next conference"
            >
              <ChevronRight className="w-6 h-6 text-ink-black dark:text-white" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Conferences;
