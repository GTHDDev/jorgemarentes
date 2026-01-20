"use client";

import { FC, memo, useMemo } from "react";
import { Content } from "@prismicio/client";
import { Icons } from "@/lib/icons";

interface HighlightCardProps {
  highlight: Content.HighlightsCarouselSliceDefaultPrimaryHighligthsItem;
  index: number;
}

const icons: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Award: Icons.Award,
  Users: Icons.Users,
  Heart: Icons.Heart,
  Sparkles: Icons.Sparkles,
  BookOpen: Icons.BookOpen,
  Target: Icons.Target,
};

/**
 * Individual highlight card component.
 * Client Component - memoized for performance optimization.
 */
const HighlightCard: FC<HighlightCardProps> = ({ highlight, index }) => {
  const { title, description, icon, color } = highlight;

  const Icon = useMemo(() => {
    const iconName = icon;
    return iconName ? icons[iconName] : undefined;
  }, [icon]);

  if (!Icon) return null;

  return (
    <div
      className="flex-shrink-0 w-[340px] sm:w-[380px]"
      role="article"
      aria-label={`${title}: ${description}`}
      aria-posinset={index + 1}
    >
      <div className="bg-[#FAFAFA] dark:bg-[#1a1a1a] rounded-[2rem] p-8 border border-[#0F0F0F]/5 dark:border-white/10 hover:border-[#0F0F0F]/10 dark:hover:border-white/20 shadow-soft hover:shadow-medium transition-all duration-500 h-full">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
          style={{ backgroundColor: color ? `${color}15` : undefined }}
          aria-hidden="true"
        >
          <Icon
            className="w-7 h-7"
            style={{ color: color ?? undefined }}
            aria-hidden="true"
          />
        </div>

        <h3 className="font-['Space_Grotesk'] text-xl lg:text-2xl text-[#0F0F0F] dark:text-white mb-3 tracking-tight">
          {title}
        </h3>

        <p className="text-base text-[#0F0F0F]/60 dark:text-white/60 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default memo(HighlightCard);
