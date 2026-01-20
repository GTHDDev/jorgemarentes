"use client";

import { FC, memo } from "react";
import * as m from "motion/react-m";
import { fadeInUpDeep, transitionDefaults } from "@/lib/motion-variants";

interface AboutHeroHeadingProps {
  name: string | null | undefined;
}

/**
 * About hero heading component.
 * Optimized with LazyMotion (m component).
 */
const AboutHeroHeading: FC<AboutHeroHeadingProps> = ({ name }) => {
  if (!name) return null;

  return (
    <m.h1
      variants={fadeInUpDeep}
      initial="initial"
      animate="animate"
      transition={transitionDefaults}
      className="font-['Space_Grotesk'] text-4xl sm:text-5xl lg:text-6xl xl:text-display-lg tracking-tight text-ink-black dark:text-white"
    >
      {name}
    </m.h1>
  );
};

export default memo(AboutHeroHeading);

