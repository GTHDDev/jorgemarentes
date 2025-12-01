"use client";

import { FC } from "react";
import { motion } from "motion/react";
import TagBadge from "@/components/tag-badge";

interface SectionHeaderProps {
  tag: string;
  heading: string;
  description: string;
}

/**
 * Animation variants following the Hero component pattern.
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.4, 0.0, 0.2, 1] as [number, number, number, number],
    },
  },
} as const;

/**
 * Section header component with animations.
 * Client Component - requires framer motion for animations.
 */
const SectionHeader: FC<SectionHeaderProps> = ({ tag, heading, description }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="max-w-3xl mb-12 lg:mb-16"
    >
      <motion.div variants={itemVariants} className="mb-6">
        <TagBadge tag={tag} />
      </motion.div>

      <motion.h2
        variants={itemVariants}
        className="font-['Space_Grotesk'] text-4xl sm:text-5xl lg:text-6xl tracking-tight text-ink-black dark:text-white mb-6"
      >
        {heading}
      </motion.h2>

      <motion.p
        variants={itemVariants}
        className="text-lg lg:text-xl text-ink-black/60 dark:text-white/60 leading-relaxed"
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

export default SectionHeader;

