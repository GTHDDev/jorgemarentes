"use client";

import { FC, lazy, Suspense } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import MotionProvider from "@/components/providers/motion-provider";
import { ViewFullCvSkeleton } from "./components/view-full-cv-skeleton";

const ViewFullCvContent = lazy(() => import("./components/view-full-cv-content"));

/**
 * Props for `ViewFullCv`.
 */
export type ViewFullCvProps = SliceComponentProps<Content.ViewFullCvSlice>;

/**
 * Component for "ViewFullCv" Slices.
 * Uses Suspense + React.lazy (no next/dynamic). AnimationLazyLoad in content for scroll-triggered animation.
 */
const ViewFullCv: FC<ViewFullCvProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative py-16 lg:py-24 bg-white dark:bg-[#0a0a0a]"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        <MotionProvider>
          <Suspense fallback={<ViewFullCvSkeleton />}>
            <ViewFullCvContent slice={slice} />
          </Suspense>
        </MotionProvider>
      </div>
    </section>
  );
};

export default ViewFullCv;
