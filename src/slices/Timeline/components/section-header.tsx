"use client";

import { FC, memo } from "react";
import * as m from "motion/react-m";
import { timelineHeader, transitionDefaults } from "@/lib/motion-variants";
import TagBadge from "@/components/tag-badge";

interface SectionHeaderProps {
  tag: string;
  heading: string;
  description: string;
}

/**
 * Section header component with animations.
 * Client Component - requires framer motion for animations.
 * Optimized with LazyMotion (m component).
 */
const SectionHeader: FC<SectionHeaderProps> = ({ tag, heading, description }) => {
  return (
    <m.div
      variants={timelineHeader}
      initial={false}
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      transition={transitionDefaults}
      className="max-w-3xl mb-16"
    >
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-white/5 backdrop-blur-sm rounded-full mb-6">
        <TagBadge className="text-sm font-medium text-[#0F0F0F]/70 dark:text-white/70">
          {tag}
        </TagBadge>
      </div>
      <h2
        id="timeline-heading"
        className="font-['Space_Grotesk'] text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#0F0F0F] dark:text-white mb-6"
      >
        {heading}
      </h2>
      <p className="text-lg lg:text-xl text-[#0F0F0F]/60 dark:text-white/60 leading-relaxed">
        {description}
      </p>
    </m.div>
  );
};

export default memo(SectionHeader);
