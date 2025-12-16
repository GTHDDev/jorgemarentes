"use client";

import { FC } from "react";
import * as m from "motion/react-m";
import { type LucideIcon } from "@/lib/icons";
import { slideInLeft } from "@/lib/motion-variants";

interface HighlightItemProps {
  title: string;
  description: string;
  icon?: LucideIcon | null;
  color?: string;
  index: number;
}

/**
 * Individual highlight item component.
 * Client Component - requires animations.
 * Optimized with LazyMotion (m component).
 */
const HighlightItem: FC<HighlightItemProps> = ({
  title,
  description,
  icon: Icon,
  color,
  index,
}) => {
  // Convert hex color to rgba with 10% opacity
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const bgColor = color && color.startsWith("#")
    ? hexToRgba(color, 0.1)
    : undefined;

  return (
    <m.div
      variants={slideInLeft}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="flex items-start gap-4"
    >
      {Icon && (
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-smooth"
          style={{
            backgroundColor: bgColor,
          }}
        >
          <Icon
            className="w-6 h-6"
            style={{
              color: color || undefined,
            }}
          />
        </div>
      )}
      <div>
        <div className="font-medium text-ink-black dark:text-white mb-1">
          {title}
        </div>
        <div className="text-sm text-ink-black/60 dark:text-white/60">
          {description}
        </div>
      </div>
    </m.div>
  );
};

export default HighlightItem;

