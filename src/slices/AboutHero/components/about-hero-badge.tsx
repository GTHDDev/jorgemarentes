"use client";

import { FC, memo } from "react";
import * as m from "motion/react-m";
import TagBadge from "@/components/tag-badge";
import { fadeInUpDeep, transitionDefaults } from "@/lib/motion-variants";

interface AboutHeroBadgeProps {
  tag: string | null | undefined;
}

/**
 * About hero badge component - displays tag.
 * Uses TagBadge for consistent styling.
 * Optimized with LazyMotion (m component).
 */
const AboutHeroBadge: FC<AboutHeroBadgeProps> = ({ tag }) => {
  if (!tag) return null;

  return (
    <m.div
      variants={fadeInUpDeep}
      initial="initial"
      animate="animate"
      transition={transitionDefaults}
      className="mb-6"
    >
      <TagBadge variant="tag" size="md">
        {tag}
      </TagBadge>
    </m.div>
  );
};

export default memo(AboutHeroBadge);

