import { FC, Suspense } from "react";
import dynamic from "next/dynamic";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import SectionHeader from "./components/section-header";

// Lazy load carousel component since it's not visible initially
const ConferenceCarousel = dynamic(
  () => import("./components/conference-carousel"),
  {
    ssr: true,
    loading: () => (
      <div className="relative overflow-hidden rounded-[2.5rem] bg-white dark:bg-[#1a1a1a] shadow-strong min-h-[400px] flex items-center justify-center">
        <div className="text-ink-black/40 dark:text-white/40">Cargando...</div>
      </div>
    ),
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
    <section
      className="relative py-24 lg:py-32 bg-soft-beige dark:bg-ink-black overflow-hidden"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <SectionHeader
          tag={slice.primary.tag || ""}
          heading={slice.primary.heading || ""}
          description={slice.primary.description || ""}
        />

        {/* Carousel - Lazy loaded */}
        <Suspense
          fallback={
            <div className="relative overflow-hidden rounded-[2.5rem] bg-white dark:bg-[#1a1a1a] shadow-strong min-h-[400px] flex items-center justify-center">
              <div className="text-ink-black/40 dark:text-white/40">
                Cargando conferencias...
              </div>
            </div>
          }
        >
          <ConferenceCarousel conferences={conferences} />
        </Suspense>
      </div>
    </section>
  );
};

export default Conferences;
