"use client";

import { FC, memo } from "react";
import MotionBadge from "@/components/motion-badge";
import { heroDelays as delays } from "@/lib/motion-variants";

interface HeroBadgeProps {
  specialization: string | null | undefined;
}

/**
 * Hero badge component - displays specialization tag.
 * Uses MotionBadge for smooth entrance animation.
 * Specialized variant for hero section context.
 */
const HeroBadge: FC<HeroBadgeProps> = ({ specialization }) => {
  if (!specialization) return null;

  return (
    <MotionBadge
      variant="specialization"
      size="md"
      animation="fadeInUp"
      delay={delays.badge}
      whileHover
    >
      <span className="w-2 h-2 bg-steel-blue rounded-full animate-pulse" />
      {specialization}
    </MotionBadge>
  );
};

export default memo(HeroBadge);
