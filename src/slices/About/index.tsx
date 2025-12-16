import { FC, Suspense } from "react";
import dynamic from "next/dynamic";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Skeleton } from "@/components/ui/skeleton";
import MotionProvider from "@/components/providers/motion-provider";
import SectionHeader from "./components/section-header";
import HighlightsList from "./components/highlights-list";
import AboutButton from "./components/about-button";
import { Bounded } from "@/components/bounded";

// Skeleton for the Timeline to provide a better loading experience
const TimelineSkeleton = () => (
  <div className="space-y-8">
    {[1, 2, 3].map((i) => (
      <div key={i} className="relative">
        <Skeleton className="h-[200px] w-full rounded-[2rem] bg-gray-200 dark:bg-gray-800" />
      </div>
    ))}
  </div>
);

// Lazy load timeline component since it's not visible initially
const Timeline = dynamic(() => import("./components/timeline"), {
  ssr: true,
  loading: () => <TimelineSkeleton />,
});

/**
 * Props for `About`.
 */
export type AboutProps = SliceComponentProps<Content.AboutSlice>;

/**
 * Component for "About" Slices.
 * Server Component - optimized for Next.js SSR.
 */
const About: FC<AboutProps> = ({ slice }) => {
  const highlights = slice.primary.highlights || [];
  const milestones = slice.primary.milestones || [];

  return (
    <MotionProvider>
      <Bounded
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="bg-white dark:bg-[#0a0a0a]"
        id="acerca"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Header */}
          <div className="space-y-8">
            <SectionHeader
              tag={slice.primary.tag || ""}
              heading={slice.primary.heading || ""}
              description={slice.primary.description || ""}
            />

            {highlights.length > 0 && (
              <HighlightsList highlights={highlights} />
            )}

            {slice.primary.button && slice.primary.button_link && (
              <div className="pt-4">
                <AboutButton
                  button={slice.primary.button}
                  buttonLink={slice.primary.button_link}
                />
              </div>
            )}
          </div>

          {/* Right Column - Timeline */}
          {milestones.length > 0 && (
            <Suspense fallback={<TimelineSkeleton />}>
              <Timeline milestones={milestones} />
            </Suspense>
          )}
        </div>
      </Bounded>
    </MotionProvider>
  );
};

export default About;
