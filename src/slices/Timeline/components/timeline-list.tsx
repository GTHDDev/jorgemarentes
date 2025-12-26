"use client";

import { FC, useRef } from "react";
import { useInView } from "motion/react";
import { Content } from "@prismicio/client";
import TimelineItem from "./timeline-item";

interface TimelineListProps {
  timeline: Content.TimelineSliceDefaultPrimaryTimelineItem[];
  onItemClick: (item: Content.TimelineSliceDefaultPrimaryTimelineItem) => void;
}

/**
 * Timeline list component with scroll detection.
 * Client Component - requires scroll detection for animations.
 */
const TimelineList: FC<TimelineListProps> = ({ timeline, onItemClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (timeline.length === 0) {
    return null;
  }

  return (
    <div ref={ref} className="relative">
      {/* Central Line */}
      <div
        className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#4A6FA5]/20 via-[#3B5F52]/20 to-[#F2B544]/20 dark:from-[#4A6FA5]/10 dark:via-[#3B5F52]/10 dark:to-[#F2B544]/10"
        aria-hidden="true"
      />

      <div className="space-y-12 lg:space-y-16" role="list" aria-label="Timeline items">
        {timeline.map((item, index) => (
          <TimelineItem
            key={index}
            item={item}
            index={index}
            isInView={isInView}
            onItemClick={onItemClick}
          />
        ))}
      </div>
    </div>
  );
};

export default TimelineList;
