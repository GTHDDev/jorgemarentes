"use client";

import { FC, memo } from "react";
import * as m from "motion/react-m";
import { fadeInUpDeep, transitionDefaults } from "@/lib/motion-variants";

interface AboutHeroDescriptionProps {
  description: string | null | undefined;
}

/**
 * About hero description component.
 * Optimized with LazyMotion (m component).
 */
const AboutHeroDescription: FC<AboutHeroDescriptionProps> = ({ description }) => {
  if (!description) return null;

  return (
    <m.div
      variants={fadeInUpDeep}
      initial="initial"
      animate="animate"
      transition={transitionDefaults}
      className="space-y-4"
    >
      <p className="text-lg lg:text-xl text-ink-black/80 dark:text-white/80 leading-relaxed">
        {description}
      </p>
    </m.div>
  );
};

export default memo(AboutHeroDescription);

