"use client";

import { FC, memo, useMemo } from "react";
import * as m from "motion/react-m";
import { Content } from "@prismicio/client";
import HeroStatItem from "./hero-stat-item";
import { fadeInUp, transitionFast, delays } from "./motion-variants";

interface HeroStatsProps {
  stats: Content.HeroSliceDefaultPrimaryStatsItem[];
}

/**
 * Hero stats container component.
 * Optimized with LazyMotion (m component) and shared variants.
 */
const HeroStats: FC<HeroStatsProps> = ({ stats }) => {
  const validStats = useMemo(
    () =>
      stats?.filter(
        (item) => item.stat !== null && item.stat !== undefined
      ) || [],
    [stats]
  );

  if (!validStats.length) return null;

  return (
    <m.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      transition={{ ...transitionFast, delay: delays.stats }}
      className="flex items-center gap-8 pt-6 border-t border-ink-black/5 dark:border-white/10"
    >
      {validStats.map((item, idx) => (
        <HeroStatItem
          key={`${item.stat}-${idx}`}
          stat={Number(item.stat) || 0}
          description={item.description || ""}
        />
      ))}
    </m.div>
  );
};

export default memo(HeroStats);
