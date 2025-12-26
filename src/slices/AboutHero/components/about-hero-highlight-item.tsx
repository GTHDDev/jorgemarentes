"use client";

import { FC, memo } from "react";
import * as m from "motion/react-m";
import { Content } from "@prismicio/client";
import { fadeInUpDeep } from "@/lib/motion-variants";

interface AboutHeroHighlightItemProps {
  highlight: Content.AboutHeroSliceDefaultPrimaryHighligthsItem;
  index: number;
}

/**
 * Individual highlight item component.
 * Optimized with LazyMotion (m component).
 * Uses inline styles for dynamic colors since Tailwind doesn't support dynamic class names.
 */
const AboutHeroHighlightItem: FC<AboutHeroHighlightItemProps> = ({
  highlight,
  index,
}) => {
  const { title, description, color } = highlight;

  if (!title) return null;

  return (
    <>
      {index > 0 && (
        <div className="w-px h-12 bg-ink-black/10 dark:bg-white/10" />
      )}
      <m.div variants={fadeInUpDeep}>
        <div
          className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-medium"
          style={color ? { color } : undefined}
        >
          {title}
        </div>
        <div className="text-sm text-ink-black/60 dark:text-white/60 mt-1">
          {description}
        </div>
      </m.div>
    </>
  );
};

export default memo(AboutHeroHighlightItem);

