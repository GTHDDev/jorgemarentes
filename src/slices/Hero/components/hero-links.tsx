"use client";

import { FC, memo } from "react";
import * as m from "motion/react-m";
import { Content } from "@prismicio/client";
import { CalendarIcon } from "@radix-ui/react-icons";
import HeroLink from "./hero-link";
import { fadeIn, transitionFast, delays } from "./motion-variants";

interface HeroLinksProps {
  scheduleLink: Content.HeroSliceDefaultPrimary["schedule_link"];
  scheduleButton: string | null | undefined;
  link: Content.HeroSliceDefaultPrimary["link"];
  linkButton: string | null | undefined;
}

/**
 * Hero links container component.
 * Optimized with LazyMotion (m component) and shared variants.
 */
const HeroLinks: FC<HeroLinksProps> = ({
  scheduleLink,
  scheduleButton,
  link,
  linkButton,
}) => {
  if (!scheduleLink || !link || !scheduleButton || !linkButton) return null;

  return (
    <m.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      transition={{ ...transitionFast, delay: delays.links }}
      className="flex flex-col sm:flex-row gap-4 pt-4"
    >
      <HeroLink
        href={scheduleLink}
        variant="primary"
        icon={<CalendarIcon className="w-5 h-5" />}
        delay={delays.links}
      >
        {scheduleButton}
      </HeroLink>

      <HeroLink
        href={link}
        variant="secondary"
        delay={delays.links + 0.1}
      >
        {linkButton}
      </HeroLink>
    </m.div>
  );
};

export default memo(HeroLinks);
