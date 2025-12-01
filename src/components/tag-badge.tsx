import { FC } from "react";
import { Badge } from "@/components/ui/badge";

interface TagBadgeProps {
  tag: string;
}

/**
 * Badge component for displaying section tags.
 * Server Component - no client-side interactivity needed.
 * Uses shadcn/ui Badge component with custom 'tag' variant.
 */
const TagBadge: FC<TagBadgeProps> = ({ tag }) => {
  return (
    <Badge variant="tag" className="px-4 py-2">
      {tag}
    </Badge>
  );
};

export default TagBadge;

