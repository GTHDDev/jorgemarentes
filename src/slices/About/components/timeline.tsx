"use client";

import { FC } from "react";
import * as m from "motion/react-m";
import { Content } from "@prismicio/client";
import TimelineItem from "./timeline-item";
import { Award, FileText, GraduationCap, LucideIcon } from "lucide-react";
import { slideInRight, transitionDefaults } from "@/lib/motion-variants";

interface TimelineProps {
  milestones: Content.AboutSliceDefaultPrimaryMilestonesItem[];
}

const icons: Record<string, LucideIcon> = {
  Award,
  FileText,
  GraduationCap,
};

/**
 * Timeline component for displaying milestones.
 * Client Component - requires animations.
 * Optimized with LazyMotion (m component).
 */
const Timeline: FC<TimelineProps> = ({ milestones }) => {
  return (
    <m.div
      variants={slideInRight}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ ...transitionDefaults, delay: 0.2 }}
      className="relative"
    >
      <div className="space-y-8">
        {milestones.map((milestone, index) => {
          const iconName = milestone.icon;
          const Icon = iconName ? icons[iconName] : null;
          const color = milestone.color || undefined;

          return (
            <TimelineItem
              key={milestone.year || index}
              year={milestone.year || ""}
              title={milestone.title || ""}
              institution={milestone.institution || ""}
              description={milestone.description || ""}
              icon={Icon}
              color={color}
              index={index}
              isLast={index === milestones.length - 1}
            />
          );
        })}
      </div>
    </m.div>
  );
};

export default Timeline;

