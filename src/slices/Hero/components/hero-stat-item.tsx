"use client";

import { FC, memo } from "react";
import { NumberTicker } from "@/components/ui/number-ticker";

interface HeroStatItemProps {
  stat: number;
  description: string;
}

/**
 * Individual stat item component.
 * Client Component - requires number ticker animation.
 * Memoized to prevent unnecessary re-renders.
 */
const HeroStatItem: FC<HeroStatItemProps> = ({ stat, description }) => {
  return (
    <div>
      <NumberTicker
        value={stat}
        delay={0.5}
        direction="up"
        className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-medium text-ink-black dark:text-white"
      />
      <div className="text-sm text-ink-black/60 dark:text-white/60 mt-1">
        {description}
      </div>
    </div>
  );
};

export default memo(HeroStatItem);
