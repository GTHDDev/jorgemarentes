"use client";

import { FC, memo } from "react";
import * as m from "motion/react-m";
import TagBadge from "@/components/tag-badge";
import { fadeInUpDeep, staggerContainer, transitionDefaults } from "@/lib/motion-variants";

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
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="max-w-3xl mb-12 lg:mb-16"
    >
      <m.div variants={fadeInUpDeep} transition={transitionDefaults} className="mb-6">
        <TagBadge variant="tag" size="md">
          {tag}
        </TagBadge>
      </m.div>

      <m.h2
        variants={fadeInUpDeep}
        transition={transitionDefaults}
        className="font-['Space_Grotesk'] text-4xl sm:text-5xl lg:text-6xl tracking-tight text-ink-black dark:text-white mb-6"
      >
        {heading}
      </m.h2>

      <m.p
        variants={fadeInUpDeep}
        transition={transitionDefaults}
        className="text-lg lg:text-xl text-ink-black/60 dark:text-white/60 leading-relaxed"
      >
        {description}
      </m.p>
    </m.div>
  );
};

export default memo(SectionHeader);
