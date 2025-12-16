import { FC } from "react";
import * as m from "motion/react-m";
import { type LucideIcon } from "@/lib/icons";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { fadeInUpDeep } from "@/lib/motion-variants";

interface TimelineItemProps {
  year: string;
  title: string;
  institution: string;
  description: string;
  icon?: LucideIcon | null;
  color?: string;
  index: number;
  isLast: boolean;
}

/**
 * Individual timeline item component.
 * Client Component - requires animations.
 * Optimized with LazyMotion (m component).
 */
const TimelineItem: FC<TimelineItemProps> = ({
  year,
  title,
  institution,
  description,
  icon: Icon,
  color,
  index,
  isLast,
}) => {
  // Convert hex color to rgba with opacity
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const bgColor10 = color && color.startsWith("#")
    ? hexToRgba(color, 0.1)
    : undefined;
  const bgColor15 = color && color.startsWith("#")
    ? hexToRgba(color, 0.15)
    : undefined;

  return (
    <m.div
      variants={fadeInUpDeep}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
      className="relative"
    >
      {/* Timeline Line */}
      {!isLast && (
        <div
          className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-ink-black/10 dark:from-white/10 to-transparent"
          style={{ height: "calc(100% + 2rem)" }}
        />
      )}

      <Card className="relative bg-pearl-white dark:bg-[#1a1a1a] rounded-[2rem] border border-ink-black/5 dark:border-white/10 hover:border-ink-black/10 dark:hover:border-white/20 shadow-soft hover:shadow-medium transition-smooth group p-0">
        <CardContent className="p-6 lg:p-8">
          {/* Icon */}
          {Icon && (
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-smooth group-hover:scale-110"
              style={{
                backgroundColor: bgColor15,
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

          {/* Year Badge */}
          <div
            className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3"
            style={{
              backgroundColor: bgColor15,
              color: color || undefined,
            }}
          >
            {year}
          </div>

          {/* Title */}
          <h3 className="font-['Space_Grotesk'] text-xl lg:text-2xl text-ink-black dark:text-white mb-2 tracking-tight">
            {title}
          </h3>

          {/* Institution */}
          <div className="text-base font-medium text-ink-black/70 dark:text-white/70 mb-3">
            {institution}
          </div>

          {/* Description */}
          <p className="text-sm lg:text-base text-ink-black/60 dark:text-white/60 leading-relaxed">
            {description}
          </p>
        </CardContent>
      </Card>
    </m.div>
  );
};

export default TimelineItem;

