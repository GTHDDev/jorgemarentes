import { FC, Suspense } from "react";
import dynamic from "next/dynamic";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ServicesHeader,
  ServicesCTA,
} from "./components";
import MotionProvider from "@/components/providers/motion-provider";

// Lazy load the services grid
const ServicesGrid = dynamic(() => import("./components/services-grid"), {
  ssr: true,
  loading: () => (
    <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="h-[300px] rounded-[2rem] p-8 lg:p-10 bg-[#FAFAFA] dark:bg-[#1a1a1a] border border-[#0F0F0F]/5 dark:border-white/10"
        >
          <Skeleton className="w-16 h-16 rounded-2xl mb-6" />
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      ))}
    </div>
  ),
});

/**
 * Props for `Services`.
 */
export type ServicesProps = SliceComponentProps<Content.ServicesSlice>;

/**
 * Component for "Services" Slices.
 * Server Component - optimized for Next.js SSR with lazy loading.
 */
const Services: FC<ServicesProps> = ({ slice }) => {
  return (
    <MotionProvider>
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="relative py-24 lg:py-32 bg-white dark:bg-[#0a0a0a] overflow-hidden"
        id="servicios"
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
          {/* Section Header */}
          <ServicesHeader
            tag={slice.primary.tag}
            heading={slice.primary.heading}
            description={slice.primary.description}
          />

          {/* Services Grid */}
          <Suspense
            fallback={
              <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-[300px] rounded-[2rem] p-8 lg:p-10 bg-[#FAFAFA] dark:bg-[#1a1a1a] border border-[#0F0F0F]/5 dark:border-white/10"
                  >
                    <Skeleton className="w-16 h-16 rounded-2xl mb-6" />
                    <Skeleton className="h-8 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                ))}
              </div>
            }
          >
            <ServicesGrid services={slice.primary.services} />
          </Suspense>

          {/* CTA Button */}
          <ServicesCTA
            buttonText={slice.primary.services_button}
            link="#contacto"
          />
        </div>
      </section>
    </MotionProvider>
  );
};

export default Services;
