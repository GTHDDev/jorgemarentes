import { FC, Suspense } from "react";
import { Bounded } from "@/components/bounded";
import { Content } from "@prismicio/client";
import SectionHeader from "./components/section-header";
import { SliceComponentProps } from "@prismicio/react";
import { Skeleton } from "@/components/ui/skeleton";
import MotionProvider from "@/components/providers/motion-provider";
import TimelineWrapper from "./components/timeline-wrapper";


// Skeleton fallback for timeline
const TimelineSkeleton = () => (
  <div className="relative py-24 lg:py-32 bg-[#F3EDE7] dark:bg-[#0F0F0F] overflow-hidden">
    <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
      <div className="max-w-3xl mb-16">
        <Skeleton className="h-8 w-32 rounded-full mb-6 bg-gray-200 dark:bg-gray-800" />
        <Skeleton className="h-16 w-3/4 rounded-lg mb-6 bg-gray-200 dark:bg-gray-800" />
        <Skeleton className="h-6 w-full rounded bg-gray-200 dark:bg-gray-800" />
      </div>
      <div className="relative">
        <div className="space-y-12 lg:space-y-16">
          {[1, 2, 3].map((i) => (
            <div key={i} className="relative grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <Skeleton className="w-12 h-12 rounded-full absolute left-6 lg:left-1/2 top-8 bg-gray-200 dark:bg-gray-800" />
              <div className="ml-20 lg:ml-0">
                <Skeleton className="w-full rounded-[2rem] p-6 lg:p-8 h-48 bg-gray-200 dark:bg-gray-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

/**
 * Props for `Timeline`.
 */
export type TimelineProps = SliceComponentProps<Content.TimelineSlice>;

/**
 * Component for "Timeline" Slices.
 * Server Component - optimized for Next.js SSR.
 */
const Timeline: FC<TimelineProps> = ({ slice }) => {
  const timeline = slice.primary.timeline || [];

  if (timeline.length === 0) {
    return null;
  }

  return (
    <MotionProvider>
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="relative py-24 lg:py-32 bg-[#F3EDE7] dark:bg-[#0F0F0F] overflow-hidden"
        aria-labelledby="timeline-heading"
      >
        <Bounded className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
          {/* Section Header */}
          <SectionHeader
            tag={slice.primary.tag || ""}
            heading={slice.primary.heading || ""}
            description={slice.primary.description || ""}
          />

          {/* Timeline List - Lazy loaded with Suspense */}
          <Suspense fallback={<TimelineSkeleton />}>
            <TimelineWrapper timeline={timeline} />
          </Suspense>
        </Bounded>
      </section>
    </MotionProvider>
  );
};

export default Timeline;
