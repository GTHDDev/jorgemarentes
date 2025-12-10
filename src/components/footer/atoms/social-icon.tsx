"use client";

import { memo } from "react";
import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";
import { PrismicNextLink } from "@prismicio/next";
import { LinkField } from "@prismicio/client";

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
    <motion.div
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <PrismicNextLink
        field={field}
        className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors duration-300"
        aria-label={label || "Social media link"}
      >
        <Icon className="w-5 h-5 text-white/60" />
      </PrismicNextLink>
    </motion.div>
  );
});

