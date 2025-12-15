import { FC, Suspense } from "react";
import dynamic from "next/dynamic";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import {
  HeroBadge,
  HeroHeading,
  HeroDescription,
  HeroLinks,
  HeroStats,
  ScrollIndicator,
} from "./components";
import MotionProvider from "@/components/providers/motion-provider";

// Lazy load the hero image with optimized loading strategy
const HeroImage = dynamic(() => import("./components/hero-image"), {
  ssr: true,
  loading: () => (
    <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-strong bg-pearl-white dark:bg-[#1a1a1a] animate-pulse" />
  ),
});

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 * Server Component - optimized for Next.js SSR with lazy loading and caching.
 * Note: Server Components are automatically memoized by Next.js, so React.memo is not needed.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  const {
    specialization = "",
    heading = "",
    subheading = "",
    introduction = "",
    schedule_link,
    schedule_button = "",
    link,
    link_button = "",
    image,
    stats = [],
  } = slice.primary;

  return (
    <MotionProvider>
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-pearl-white dark:bg-ink-black"
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-soft-beige via-pearl-white to-white dark:from-[#1a1a1a] dark:via-ink-black dark:to-[#0a0a0a] opacity-60" />

        <div className="relative max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-24 lg:py-32 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-8 lg:space-y-10 max-w-2xl">
              <div className="space-y-4">
                <HeroBadge specialization={specialization} />
              </div>

              <HeroHeading heading={heading} subheading={subheading} />

              <HeroDescription introduction={introduction} />

              {/* Links section */}
              <HeroLinks
                scheduleLink={schedule_link}
                scheduleButton={schedule_button}
                link={link}
                linkButton={link_button}
              />

              {/* Stats */}
              <HeroStats stats={stats} />
            </div>

            {/* Right Column - Hero Image */}
            <Suspense
              fallback={
                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-strong bg-pearl-white dark:bg-[#1a1a1a] animate-pulse" />
              }
            >
              <HeroImage image={image} />
            </Suspense>
          </div>
        </div>

        {/* Scroll Indicator */}
        <ScrollIndicator />
      </section>
    </MotionProvider>
  );
};

export default Hero;