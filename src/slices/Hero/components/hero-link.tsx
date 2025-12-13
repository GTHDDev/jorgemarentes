"use client";

import { FC, ReactNode, memo } from "react";
import * as m from "motion/react-m";
import { PrismicNextLink } from "@prismicio/next";
import { Content } from "@prismicio/client";
import { fadeInUp, transitionFast, hoverScale, tapScale } from "./motion-variants";

interface HeroLinkProps {
  href: Content.HeroSliceDefaultPrimary["link"] | Content.HeroSliceDefaultPrimary["schedule_link"];
  children: ReactNode;
  variant?: "primary" | "secondary";
  icon?: ReactNode;
  delay?: number;
}

/**
 * Hero link component - reusable link with animations.
 * Optimized with LazyMotion (m component) and shared variants.
 */
const HeroLink: FC<HeroLinkProps> = ({
  href,
  children,
  variant = "secondary",
  icon,
  delay = 0.5,
}) => {
  const isPrimary = variant === "primary";

  return (
    <m.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      transition={{ ...transitionFast, delay }}
      whileHover={hoverScale}
      whileTap={tapScale}
      className="inline-block"
      style={{ willChange: "transform" }}
    >
      <PrismicNextLink
        field={href}
        className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium transition-all duration-300 ${isPrimary
          ? "bg-steel-blue text-white shadow-medium hover:shadow-strong group"
          : "bg-white dark:bg-white/10 border-2 border-ink-black/10 dark:border-white/20 text-ink-black dark:text-white hover:bg-soft-beige dark:hover:bg-white/20 hover:border-ink-black/20 dark:hover:border-white/30"
          }`}
      >
        {icon}
        {children}
        {isPrimary && (
          <svg
            className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        )}
      </PrismicNextLink>
    </m.div>
  );
};

export default memo(HeroLink);
