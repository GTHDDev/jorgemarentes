"use client";

import { FC, memo } from "react";
import * as m from "motion/react-m";
import { PrismicNextImage } from "@prismicio/next";
import { Content } from "@prismicio/client";
import { fadeInScale, transitionSlow } from "@/lib/motion-variants";

interface AboutHeroImageProps {
  picture: Content.AboutHeroSliceDefaultPrimary["picture"];
}

/**
 * About hero image component - optimized for LCP and bundle size.
 * Uses LazyMotion (m component) and optimized image settings.
 * - Priority loading for LCP
 * - WebP/AVIF format support (via Next.js Image Optimization)
 * - Proper sizing for responsive images
 */
const AboutHeroImage: FC<AboutHeroImageProps> = ({ picture }) => {
  if (!picture) return null;

  return (
    <m.div
      variants={fadeInScale}
      initial="initial"
      animate="animate"
      transition={{ ...transitionSlow, delay: 0.2 }}
      className="relative"
    >
      <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0 rounded-[2.5rem] overflow-hidden shadow-strong">
        <PrismicNextImage
          field={picture}
          className="w-full h-full object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
          loading="eager"
          fill
          fetchPriority="high"
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-black/30 via-transparent to-transparent dark:from-ink-black/60" />
      </div>
    </m.div>
  );
};

// Memoize to prevent unnecessary re-renders when parent updates
export default memo(AboutHeroImage);

