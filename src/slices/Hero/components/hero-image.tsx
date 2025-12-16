"use client";

import { FC, memo } from "react";
import * as m from "motion/react-m";
import { PrismicNextImage } from "@prismicio/next";
import { Content } from "@prismicio/client";
import { slideInRight, transitionSlow, heroDelays as delays } from "@/lib/motion-variants";

interface HeroImageProps {
  image: Content.HeroSliceDefaultPrimary["image"];
}

/**
 * Hero image component - optimized for LCP and bundle size.
 * Uses LazyMotion (m component) and optimized image settings.
 * - Priority loading for LCP
 * - WebP/AVIF format support (via Next.js Image Optimization)
 * - Proper sizing for responsive images
 * - Reduced animation delay for faster LCP
 */
const HeroImage: FC<HeroImageProps> = ({ image }) => {
  if (!image) return null;

  return (
    <m.div
      variants={slideInRight}
      initial="initial"
      animate="animate"
      transition={{ ...transitionSlow, delay: delays.image }}
      className="relative"
    >
      <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-strong">
        <PrismicNextImage
          field={image}
          className="w-full h-full object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
          loading="eager"
          fill
          fetchPriority="high"
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-black/20 via-transparent to-transparent dark:from-ink-black/60" />
      </div>
    </m.div>
  );
};

// Memoize to prevent unnecessary re-renders when parent updates
export default memo(HeroImage);
