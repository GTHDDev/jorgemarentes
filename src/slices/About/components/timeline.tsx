"use client";

import { FC } from "react";
import { motion } from "motion/react";
import { Content } from "@prismicio/client";
import TimelineItem from "./timeline-item";
import { Award, FileText, GraduationCap } from "lucide-react";

interface TimelineProps {
  milestones: Content.AboutSliceDefaultPrimaryMilestonesItem[];
}

const icons: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Award,
  FileText,
  GraduationCap,
};

/**
 * Timeline component for displaying milestones.
 * Client Component - requires animations.
 */
const Timeline: FC<TimelineProps> = ({ milestones }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.2 }}
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
    </motion.div>
  );
};

export default Timeline;

