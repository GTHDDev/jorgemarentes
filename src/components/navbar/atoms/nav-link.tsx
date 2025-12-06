"use client";

import { memo } from "react";
import { motion } from "motion/react";

interface NavLinkProps {
  label: string;
  href: string;
  onClick?: () => void;
  className?: string;
  delay?: number;
}

export const NavLink = memo(function NavLink({
  label,
  href,
  onClick,
  className = "",
  delay = 0,
}: NavLinkProps) {
  const baseClasses =
    "px-4 py-2 text-sm font-medium text-[#0F0F0F]/70 dark:text-white/70 hover:text-[#0F0F0F] dark:hover:text-white transition-colors duration-300";

  const content = (
    <a
      href={href}
      className={`${baseClasses} ${className}`}
      onClick={onClick}
      aria-label={`Navigate to ${label}`}
    >
      {label}
    </a>
  );

  if (delay > 0) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
});

