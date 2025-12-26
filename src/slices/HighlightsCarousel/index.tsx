import { FC, Suspense } from "react";
import dynamic from "next/dynamic";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Skeleton } from "@/components/ui/skeleton";
import MotionProvider from "@/components/providers/motion-provider";
import Carousel from "./components/carousel";

// Lazy load section header to avoid hydration mismatch
const SectionHeader = dynamic(
  () => import("./components/section-header"),
  {
    ssr: true,
    loading: () => (
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F3EDE7] dark:bg-white/5 rounded-full mb-6">
          <Skeleton className="h-6 w-32 rounded-full bg-gray-200 dark:bg-gray-800" />
        </div>
        <Skeleton className="h-16 w-3/4 rounded-lg bg-gray-200 dark:bg-gray-800" />
      </div>
    ),
  }
);

// Skeleton fallback for carousel
const CarouselSkeleton = () => (
  <div className="relative py-16 lg:py-24 bg-white dark:bg-[#0a0a0a] overflow-hidden">
    <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
      <div className="mb-12">
        <Skeleton className="h-8 w-32 rounded-full mb-6 bg-gray-200 dark:bg-gray-800" />
        <Skeleton className="h-16 w-3/4 rounded-lg bg-gray-200 dark:bg-gray-800" />
      </div>
      <div className="relative overflow-hidden">
        <div className="flex gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[340px] sm:w-[380px] bg-[#FAFAFA] dark:bg-[#1a1a1a] rounded-[2rem] p-8 border border-[#0F0F0F]/5 dark:border-white/10"
            >
              <Skeleton className="w-14 h-14 rounded-2xl mb-6 bg-gray-200 dark:bg-gray-800" />
              <Skeleton className="h-8 w-3/4 rounded-lg mb-3 bg-gray-200 dark:bg-gray-800" />
              <Skeleton className="h-4 w-full rounded bg-gray-200 dark:bg-gray-800 mb-2" />
              <Skeleton className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-800" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

/**
 * Props for `HighlightsCarousel`.
 */
export type HighlightsCarouselProps =
  SliceComponentProps<Content.HighlightsCarouselSlice>;

/**
 * Component for "HighlightsCarousel" Slices.
 * Server Component - optimized for Next.js SSR.
 */
const HighlightsCarousel: FC<HighlightsCarouselProps> = ({ slice }) => {
  const highlights = slice.primary.highligths || [];

  if (highlights.length === 0) {
    return null;
  }

  return (
    <MotionProvider>
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="relative py-16 lg:py-24 bg-white dark:bg-[#0a0a0a] overflow-hidden"
        aria-labelledby="highlights-heading"
      >
        {/* Section Header */}
        <SectionHeader
          tag={slice.primary.tag || ""}
          heading={slice.primary.heading || ""}
        />

        {/* Carousel - Lazy loaded with Suspense */}
        <Suspense fallback={<CarouselSkeleton />}>
          <Carousel highlights={highlights} />
        </Suspense>
      </section>
    </MotionProvider>
  );
};

export default HighlightsCarousel;
