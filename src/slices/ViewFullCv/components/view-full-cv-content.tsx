"use client";

import { FC, memo } from "react";
import * as m from "motion/react-m"
import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { Icons } from "@/lib/icons";
import AnimationLazyLoad from "@/components/animation-lazy-load";
import { viewFullCvCard, viewFullCvTransition, hoverLift, tapScale } from "@/lib/motion-variants";

interface ViewFullCvContentProps {
  slice: Content.ViewFullCvSlice;
}

/**
 * Client component for the ViewFullCv card and CTA.
 * Uses AnimationLazyLoad to animate only when in view and avoid hydration mismatch.
 */
const ViewFullCvContent: FC<ViewFullCvContentProps> = ({ slice }) => {
  return (
    <AnimationLazyLoad
      variants={viewFullCvCard}
      transition={viewFullCvTransition}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-gradient-to-br from-[#4A6FA5] to-[#3B5F52] rounded-[2.5rem] p-12 lg:p-16 shadow-strong relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute top-10 right-10 w-40 h-40 border-2 border-white rounded-full" />
          <div className="absolute bottom-10 left-10 w-60 h-60 border-2 border-white rounded-full" />
        </div>

        <div className="relative z-10 text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4">
            <Icons.FileText className="w-10 h-10 text-white" aria-hidden="true" />
          </div>

          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            {slice.primary.heading}
          </h2>

          <p className="text-lg lg:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            {slice.primary.description}
          </p>

          <m.div whileHover={hoverLift} whileTap={tapScale} className="mt-6">
            <PrismicNextLink
              field={slice.primary.download_button}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-steel-blue rounded-full font-medium shadow-strong hover:shadow-medium transition-all duration-300"
              target="_blank"
              aria-label="View curriculum vitae in PDF"
            >
              <Icons.Download className="w-5 h-5" aria-hidden="true" />
              {slice.primary.button_text}
            </PrismicNextLink>
          </m.div>
        </div>
      </div>
    </AnimationLazyLoad>
  );
};

export default memo(ViewFullCvContent);
