"use client";

import { memo } from "react";
import * as m from "motion/react-m";
import { type LucideIcon } from "@/lib/icons";
import { PrismicNextLink } from "@prismicio/next";
import { LinkField } from "@prismicio/client";
import { hoverLiftLarge, tapScale } from "@/lib/motion-variants";

interface SocialIconProps {
  icon: LucideIcon;
  field: LinkField;
  label?: string;
}

export const SocialIcon = memo(function SocialIcon({
  icon: Icon,
  field,
  label,
}: SocialIconProps) {
  return (
    <m.div
      whileHover={hoverLiftLarge}
      whileTap={tapScale}
    >
      <PrismicNextLink
        field={field}
        className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors duration-300"
        aria-label={label || "Social media link"}
      >
        <Icon className="w-5 h-5 text-white/60" />
      </PrismicNextLink>
    </m.div>
  );
});

