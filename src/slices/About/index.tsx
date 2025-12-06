import { FC, Suspense } from "react";
import dynamic from "next/dynamic";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import SectionHeader from "./components/section-header";
import HighlightsList from "./components/highlights-list";
import AboutButton from "./components/about-button";

// Lazy load timeline component since it's not visible initially
const Timeline = dynamic(() => import("./components/timeline"), {
  ssr: true,
  loading: () => (
    <div className="relative space-y-8">
      <div className="bg-pearl-white dark:bg-[#1a1a1a] rounded-[2rem] p-6 lg:p-8 min-h-[200px] animate-pulse" />
    </div>
  ),
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
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative py-24 lg:py-32 bg-white dark:bg-[#0a0a0a] overflow-hidden"
      id="acerca"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
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
            <Suspense
              fallback={
                <div className="relative space-y-8">
                  <div className="bg-pearl-white dark:bg-[#1a1a1a] rounded-[2rem] p-6 lg:p-8 min-h-[200px] animate-pulse" />
                </div>
              }
            >
              <Timeline milestones={milestones} />
            </Suspense>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;
