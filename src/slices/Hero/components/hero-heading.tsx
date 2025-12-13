"use client";

import { FC, memo } from "react";
import * as m from "motion/react-m";
import { fadeInUp, transitionDefaults, delays } from "./motion-variants";

interface HeroHeadingProps {
  heading: string | null | undefined;
  subheading: string | null | undefined;
}

/**
 * Hero heading component - displays main title and subheading.
 * Optimized with LazyMotion (m component) and shared variants.
 */
const HeroHeading: FC<HeroHeadingProps> = ({ heading, subheading }) => {
  if (!heading) return null;

  return (
    <m.h1
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      transition={{ ...transitionDefaults, delay: delays.heading }}
      className="font-['Space_Grotesk'] text-5xl sm:text-6xl lg:text-7xl xl:text-display-lg tracking-tight text-ink-black dark:text-white"
    >
      {heading}{" "}
      <span className="text-steel-blue inline-block">
        {subheading}
      </span>
    </m.h1>
  );
};

export default memo(HeroHeading);
