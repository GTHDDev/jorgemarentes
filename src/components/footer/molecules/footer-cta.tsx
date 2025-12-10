"use client";

import { memo } from "react";
import { motion } from "motion/react";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
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
    </motion.div>
  );
});

