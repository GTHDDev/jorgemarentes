"use client";

import { FC, memo } from "react";
import * as m from "motion/react-m";
import { fadeInUp, transitionDefaults, heroDelays as delays } from "@/lib/motion-variants";

interface HeroDescriptionProps {
  introduction: string | null | undefined;
}

/**
 * Hero description component - displays introduction text.
 * Optimized with LazyMotion (m component) and shared variants.
 */
const HeroDescription: FC<HeroDescriptionProps> = ({ introduction }) => {
  if (!introduction) return null;

  return (
    <m.p
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      transition={{ ...transitionDefaults, delay: delays.description }}
      className="text-lg sm:text-xl lg:text-2xl text-ink-black/60 dark:text-white/60 leading-relaxed max-w-xl"
    >
      {introduction}
    </m.p>
  );
};

export default memo(HeroDescription);
