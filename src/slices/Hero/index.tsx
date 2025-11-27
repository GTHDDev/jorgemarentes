"use client";
import { motion } from 'motion/react'
import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import { ArrowRightIcon, CalendarIcon } from '@radix-ui/react-icons';
import { NumberTicker } from '@/components/ui/number-ticker';


/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-pearl-white dark:bg-ink-black"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-soft-beige via-pearl-white to-white dark:from-[#1a1a1a] dark:via-ink-black dark:to-[#0a0a0a] opacity-60" />

      <div className="relative max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-24 lg:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8 lg:space-y-10 max-w-2xl"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-white/10 backdrop-blur-sm rounded-full border border-ink-black/5 dark:border-white/10 shadow-soft">
                <span className="w-2 h-2 bg-steel-blue rounded-full animate-pulse" />
                <span className="text-sm font-medium text-ink-black/70 dark:text-white/70">
                  {slice.primary.specialization}
                </span>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-['Space_Grotesk'] text-5xl sm:text-6xl lg:text-7xl xl:text-display-lg tracking-tight text-ink-black dark:text-white"
            >
              {slice.primary.heading}{" "}
              <span className="text-steel-blue inline-block">
                {slice.primary.subheading}
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl lg:text-2xl text-ink-black/60 dark:text-white/60 leading-relaxed max-w-xl"
            >
              {slice.primary.introduction}
            </motion.p>

            {/* Links section */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block"
              >
                <PrismicNextLink
                  field={slice.primary.schedule_link}
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-steel-blue text-white rounded-full font-medium shadow-medium hover:shadow-strong transition-all duration-300"
                  aria-label="Agendar cita"
                >
                  <CalendarIcon className="w-5 h-5" />
                  {slice.primary.schedule_button}
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </PrismicNextLink>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block"
              >
                <PrismicNextLink
                  field={slice.primary.link}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-white/10 border-2 border-ink-black/10 dark:border-white/20 text-ink-black dark:text-white rounded-full font-medium hover:bg-soft-beige dark:hover:bg-white/20 hover:border-ink-black/20 dark:hover:border-white/30 transition-all duration-300"
                >
                  {slice.primary.link_button}
                </PrismicNextLink>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-8 pt-6 border-t border-ink-black/5 dark:border-white/10"
            >
              {slice.primary.stats.map((item, idx) => (
                <div key={idx}>
                  <NumberTicker
                    value={Number(item.stat)}
                    delay={0.5}
                    direction='up'
                    className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-medium text-ink-black dark:text-white"
                  />
                  <div className="text-sm text-ink-black/60 dark:text-white/60 mt-1">
                    {item.description}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.4, 0.0, 0.2, 1], delay: 0.4 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-strong">
              <PrismicNextImage
                field={slice.primary.image}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-black/20 via-transparent to-transparent dark:from-ink-black/60" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-ink-black/20 dark:border-white/20 rounded-full p-1"
        >
          <motion.div className="w-1.5 h-1.5 bg-steel-blue rounded-full mx-auto" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
