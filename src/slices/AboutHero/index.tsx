import { FC, Suspense } from "react";
import dynamic from "next/dynamic";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import {
  AboutHeroBadge,
  AboutHeroHeading,
  AboutHeroDescription,
  AboutHeroHighlights,
} from "./components";
import MotionProvider from "@/components/providers/motion-provider";
import { Bounded } from "@/components/bounded";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load the hero image with optimized loading strategy
const AboutHeroImage = dynamic(() => import("./components/about-hero-image"), {
  ssr: true,
  loading: () => (
    <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0 rounded-[2.5rem] overflow-hidden shadow-strong bg-pearl-white dark:bg-[#1a1a1a] animate-pulse" />
  ),
});

/**
 * Props for `AboutHero`.
 */
export type AboutHeroProps = SliceComponentProps<Content.AboutHeroSlice>;

/**
 * Component for "AboutHero" Slices.
 * Server Component - optimized for Next.js SSR with lazy loading and caching.
 * Note: Server Components are automatically memoized by Next.js, so React.memo is not needed.
 */
const AboutHero: FC<AboutHeroProps> = ({ slice }) => {
  const {
    tag = "",
    name = "",
    description = "",
    highligths = [],
    picture,
  } = slice.primary;

  return (
    <MotionProvider>
      <Bounded
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="bg-pearl-white dark:bg-ink-black"
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-soft-beige via-pearl-white to-white dark:from-[#1a1a1a] dark:via-ink-black dark:to-[#0a0a0a] opacity-60 pointer-events-none" />

        <div className="relative grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
          {/* Left Column - Image */}
          <div className="order-2 lg:order-1">
            <Suspense
              fallback={
                <Skeleton className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0 rounded-[2.5rem] overflow-hidden shadow-strong bg-pearl-white dark:bg-[#1a1a1a]" />
              }
            >
              <AboutHeroImage picture={picture} />
            </Suspense>
          </div>

          {/* Right Column - Text Content */}
          <div className="order-1 lg:order-2 space-y-6 lg:space-y-8">
            <div className="space-y-6">
              <AboutHeroBadge tag={tag} />
              <AboutHeroHeading name={name} />
            </div>

            <AboutHeroDescription description={description} />

            {/* Highlights */}
            {highligths.length > 0 && (
              <AboutHeroHighlights highlights={highligths} />
            )}
          </div>
        </div>
      </Bounded>
    </MotionProvider>
  );
};

export default AboutHero;
