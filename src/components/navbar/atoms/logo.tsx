"use client";

import { motion } from "motion/react";
import { memo } from "react";

interface LogoProps {
  websiteName: string;
  href?: string;
}

export const Logo = memo(function Logo({ websiteName, href = "#home" }: LogoProps) {
  return (
    <motion.a
      href={href}
      className="relative z-10"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Go to home"
    >
      <span className="font-['Space_Grotesk'] font-medium text-lg sm:text-xl tracking-tight text-[#0F0F0F] dark:text-white">
        {websiteName}
      </span>
    </motion.a>
  );
});

