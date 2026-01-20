"use client";

import { memo } from "react";
import { motion } from "motion/react";
import { slideInLeft, transitionDefaults } from "@/lib/motion-variants";
import { LinkField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";

interface NavLinkProps {
  label: string;
  onClick?: () => void;
  className?: string;
  delay?: number;
  href: LinkField
}

export const NavLink = memo(function NavLink({
  label,
  onClick,
  className = "",
  delay = 0,
  href,
}: NavLinkProps) {
  const baseClasses =
    "px-4 py-2 text-sm font-medium text-ink-black/70 dark:text-white/70 hover:text-ink-black dark:hover:text-white transition-colors duration-300";

  const content = (
    <PrismicNextLink
      field={href}
      className={`${baseClasses} ${className}`}
      onClick={onClick}
      aria-label={`Navigate to ${label}`}
    >
      {label}
    </PrismicNextLink>
  );

  if (delay > 0) {
    return (
      <motion.div
        variants={slideInLeft}
        initial="initial"
        animate="animate"
        transition={{ ...transitionDefaults, delay }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
});

