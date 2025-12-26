"use client";

import { FC, memo, useMemo } from "react";
import * as m from "motion/react-m";
import { Content } from "@prismicio/client";
import { Icons } from "@/lib/icons";
import { timelineItem, timelineDelays, hoverLift, tapScale } from "@/lib/motion-variants";
import { transitionDefaults } from "@/lib/motion-variants";

const icons: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Award: Icons.Award,
  BookOpen: Icons.BookOpen,
  GraduationCap: Icons.GraduationCap,
  Briefcase: Icons.Briefcase,
};

interface TimelineItemProps {
  item: Content.TimelineSliceDefaultPrimaryTimelineItem;
  index: number;
  isInView: boolean;
  onItemClick: (item: Content.TimelineSliceDefaultPrimaryTimelineItem) => void;
}

/**
 * Individual timeline item component.
 * Client Component - memoized for performance optimization.
 * Optimized with LazyMotion (m component).
 */
const TimelineItem: FC<TimelineItemProps> = ({ item, index, isInView, onItemClick }) => {
  const isEven = useMemo(() => index % 2 === 0, [index]);

  const color = item.color || "#4A6FA5";

  const Icon = useMemo(() => {
    return icons[item.icon as keyof typeof icons];
  }, [item.icon]);

  if (!Icon) return null;

  const handleClick = () => {
    onItemClick(item);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <m.div
      variants={timelineItem}
      initial={false}
      animate={isInView ? "animate" : "initial"}
      transition={{
        ...transitionDefaults,
        delay: (timelineDelays?.itemBase ?? 0.2) + index * (timelineDelays?.itemStagger ?? 0.15),
      }}
      className={`relative grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${isEven ? "" : "lg:flex-row-reverse"
        }`}
    >
      {/* Timeline Dot */}
      <div
        className="absolute left-6 lg:left-1/2 top-8 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center z-10 border-4 border-[#F3EDE7] dark:border-[#0F0F0F] transition-transform duration-500 hover:scale-125"
        style={{ backgroundColor: color }}
        aria-hidden="true"
      >
        <Icon className="w-6 h-6 text-white" aria-hidden="true" />
      </div>

      {/* Content Card */}
      <div
        className={`lg:col-span-1 ${isEven
            ? "lg:col-start-1 lg:text-right lg:pr-12"
            : "lg:col-start-2 lg:pl-12"
          } ml-20 lg:ml-0`}
      >
        <m.button
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          className="w-full bg-white dark:bg-[#1a1a1a] rounded-[2rem] p-6 lg:p-8 border border-[#0F0F0F]/5 dark:border-white/10 hover:border-[#0F0F0F]/10 dark:hover:border-white/20 shadow-soft hover:shadow-medium transition-all duration-500 text-left group cursor-pointer"
          whileHover={hoverLift}
          whileTap={tapScale}
          aria-label={`View details about ${item.title}`}
          tabIndex={0}
        >
          {/* Year Badge */}
          <div
            className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 ${isEven ? "lg:float-right lg:ml-4" : "lg:float-left lg:mr-4"
              }`}
            style={{
              backgroundColor: `${color}15`,
              color: color,
            }}
          >
            {item.year}
          </div>

          {/* Title */}
          <h3 className="font-['Space_Grotesk'] text-2xl lg:text-3xl text-[#0F0F0F] dark:text-white mb-3 tracking-tight group-hover:text-[#4A6FA5] dark:group-hover:text-[#4A6FA5] transition-colors duration-300">
            {item.title}
          </h3>

          {/* Institution */}
          <div className="font-medium text-[#0F0F0F]/70 dark:text-white/70 mb-4">
            {item.institution}
          </div>

          {/* Description Preview */}
          <p className="text-sm lg:text-base text-[#0F0F0F]/60 dark:text-white/60 leading-relaxed line-clamp-2">
            {item.description}
          </p>

          {/* Click to Learn More */}
          <div className="mt-4 text-sm font-medium text-[#4A6FA5] group-hover:underline">
            Click para ver más →
          </div>
        </m.button>
      </div>

      {/* Spacer for alternating layout */}
      <div className="hidden lg:block lg:col-span-1" />
    </m.div>
  );
};

export default memo(TimelineItem);
