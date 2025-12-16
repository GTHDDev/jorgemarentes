"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import HighlightItem from "./highlight-item";
import { Icons, type LucideIcon } from "@/lib/icons";

interface HighlightsListProps {
  highlights: Content.AboutSliceDefaultPrimaryHighlightsItem[];
}

const icons: Record<string, LucideIcon> = {
  Award: Icons.Award,
  FileText: Icons.FileText,
  GraduationCap: Icons.GraduationCap,
};

/**
 * Highlights list component.
 * Client Component - requires animations.
 */
const HighlightsList: FC<HighlightsListProps> = ({ highlights }) => {
  return (
    <div className="space-y-4">
      {highlights.map((highlight, index) => {
        const iconName = highlight.icon;
        const Icon = iconName ? icons[iconName] : null;
        const color = highlight.color || undefined;

        return (
          <HighlightItem
            key={index}
            title={highlight.title || ""}
            description={highlight.description || ""}
            icon={Icon}
            color={color}
            index={index}
          />
        );
      })}
    </div>
  );
};

export default HighlightsList;

