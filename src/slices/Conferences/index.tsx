import { FC, Suspense } from "react";
import dynamic from "next/dynamic";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Skeleton } from "@/components/ui/skeleton";
import MotionProvider from "@/components/providers/motion-provider";
import SectionHeader from "./components/section-header";

// Skeleton fallback that mimics a conference card
const CarouselSkeleton = () => (
  <div className="relative overflow-hidden rounded-[2.5rem] bg-white dark:bg-[#1a1a1a] shadow-strong min-h-[500px] border-none">
    <div className="grid lg:grid-cols-2 gap-0 h-full">
      {/* Image Skeleton */}
      <div className="relative aspect-[4/3] lg:aspect-auto h-full min-h-[300px] lg:min-h-[500px]">
        <Skeleton className="w-full h-full absolute inset-0 rounded-none bg-gray-200 dark:bg-gray-800" />
      </div>

      {/* Content Skeleton */}
      <div className="p-8 lg:p-12 flex flex-col justify-center space-y-6">
        <Skeleton className="h-10 w-3/4 rounded-lg bg-gray-200 dark:bg-gray-800" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-1/2 rounded bg-gray-200 dark:bg-gray-800" />
          <Skeleton className="h-6 w-1/3 rounded bg-gray-200 dark:bg-gray-800" />
        </div>
        <Skeleton className="h-12 w-40 rounded-full mt-4 bg-gray-200 dark:bg-gray-800" />
      </div>
    </div>
  </div>
);

// Lazy load carousel component since it's not visible initially
const ConferenceCarousel = dynamic(
  () => import("./components/conference-carousel"),
  {
    ssr: true,
    loading: () => <CarouselSkeleton />,
  }
);

/**
 * Props for `Conferences`.
 */
export type ConferencesProps = SliceComponentProps<Content.ConferencesSlice>;

/**
 * Component for "Conferences" Slices.
 * Server Component - optimized for Next.js SSR.
 */
const Conferences: FC<ConferencesProps> = ({ slice }) => {
  const conferences = slice.primary.conferences || [];

  if (conferences.length === 0) {
    return null;
  }

  return (
    <MotionProvider>
      <section
        className="relative py-24 lg:py-32 bg-soft-beige dark:bg-ink-black overflow-hidden"
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        id="conferencias"
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
          {/* Section Header */}
          <SectionHeader
            tag={slice.primary.tag || ""}
            heading={slice.primary.heading || ""}
            description={slice.primary.description || ""}
          />

          {/* Carousel - Lazy loaded */}
          <Suspense fallback={<CarouselSkeleton />}>
            <ConferenceCarousel conferences={conferences} />
          </Suspense>
        </div>
      </section>
    </MotionProvider>
  );
};

export default Conferences;
