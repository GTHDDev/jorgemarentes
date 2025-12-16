"use client";

import { FC, memo } from "react";
import * as m from "motion/react-m";
import TagBadge from "@/components/tag-badge";
import { fadeInUp, transitionDefaults } from "@/lib/motion-variants";

interface ServicesHeaderProps {
  tag: string | null;
  heading: string | null;
  description: string | null;
}

const ServicesHeader: FC<ServicesHeaderProps> = ({ tag, heading, description }) => {
  return (
    <m.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      transition={transitionDefaults}
      className="max-w-3xl mb-16 lg:mb-20"
    >
      <div className="mb-6">
        <TagBadge variant="tag" size="md">
          {tag}
        </TagBadge>
      </div>
      <h2 className="font-['Space_Grotesk'] text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#0F0F0F] dark:text-white mb-6">
        {heading}
      </h2>
      <p className="text-lg lg:text-xl text-[#0F0F0F]/60 dark:text-white/60 leading-relaxed">
        {description}
      </p>
    </m.div>
  );
};

export default memo(ServicesHeader);
