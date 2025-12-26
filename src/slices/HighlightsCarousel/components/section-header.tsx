"use client";

import { FC, memo } from "react";
import * as m from "motion/react-m";
import { carouselHeader, transitionDefaults } from "@/lib/motion-variants";

interface SectionHeaderProps {
  tag: string;
  heading: string;
}

/**
 * Section header component with animations.
 * Client Component - requires framer motion for animations.
 * Optimized with LazyMotion (m component).
 */
const SectionHeader: FC<SectionHeaderProps> = ({ tag, heading }) => {
  return (
    <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 mb-12">
      <m.div
        variants={carouselHeader}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        transition={transitionDefaults}
        style={{ willChange: "opacity, transform" }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F3EDE7] dark:bg-white/5 rounded-full mb-6">
          <span className="text-sm font-medium text-[#0F0F0F]/70 dark:text-white/70">
            {tag}
          </span>
        </div>
        <h2
          id="highlights-heading"
          className="font-['Space_Grotesk'] text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#0F0F0F] dark:text-white"
        >
          {heading}
        </h2>
      </m.div>
    </div>
  );
};

export default memo(SectionHeader);
