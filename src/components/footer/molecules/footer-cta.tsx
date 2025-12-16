"use client";

import { memo } from "react";
import * as m from "motion/react-m";
import { fadeInUp, transitionDefaults } from "@/lib/motion-variants";

interface FooterCTAProps {
  heading: string | null | undefined;
  description: string | null | undefined;
}

export const FooterCTA = memo(function FooterCTA({
  heading,
  description,
}: FooterCTAProps) {
  if (!heading && !description) {
    return null;
  }

  return (
    <m.div
      variants={fadeInUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      transition={{ ...transitionDefaults, duration: 0.6 }}
      className="space-y-6"
    >
      {heading && (
        <h2 className="font-['Space_Grotesk'] text-4xl sm:text-5xl lg:text-6xl tracking-tight">
          {heading}
        </h2>
      )}
      {description && (
        <p className="text-lg lg:text-xl text-white/60 leading-relaxed max-w-xl">
          {description}
        </p>
      )}
    </m.div>
  );
});

