"use client";

import { FC, memo } from "react";
import * as m from "motion/react-m";
import { Content } from "@prismicio/client";
import AboutHeroHighlightItem from "./about-hero-highlight-item";
import { staggerContainer } from "@/lib/motion-variants";

interface AboutHeroHighlightsProps {
  highlights: Content.AboutHeroSliceDefaultPrimaryHighligthsItem[];
}

/**
 * Highlights list component.
 * Optimized with LazyMotion (m component).
 * Uses staggerContainer for smooth sequential animations.
 */
const AboutHeroHighlights: FC<AboutHeroHighlightsProps> = ({ highlights }) => {
  if (!highlights || highlights.length === 0) return null;

  return (
    <m.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex flex-wrap items-center gap-6 pt-6 border-t border-ink-black/5 dark:border-white/10"
    >
      {highlights.map((highlight, index) => (
        <AboutHeroHighlightItem
          key={`${highlight.title}-${index}`}
          highlight={highlight}
          index={index}
        />
      ))}
    </m.div>
  );
};

export default memo(AboutHeroHighlights);

