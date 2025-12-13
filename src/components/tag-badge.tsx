import { FC, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * Badge variants using CVA for consistency across the app.
 * Supports both inline badges (tags) and special purpose badges (types).
 */
const badgeVariants = cva("inline-flex items-center gap-2 rounded-full px-4 py-2", {
  variants: {
    variant: {
      // Default section tag variant (used in About, Conferences, Services)
      tag: "bg-white/60 dark:bg-white/5 backdrop-blur-sm text-ink-black/70 dark:text-white/70 border border-ink-black/5 dark:border-white/10 shadow-soft",
      
      // Hero specialization badge variant
      specialization: "bg-white/80 dark:bg-white/10 backdrop-blur-sm text-ink-black/70 dark:text-white/70 border border-ink-black/5 dark:border-white/10 shadow-soft",
      
      // Conference type badge variant (for overlay)
      type: "bg-mango-gold text-ink-black shadow-soft border-transparent",
      
      // Outline variant for future use
      outline: "border border-ink-black/20 dark:border-white/20 text-ink-black dark:text-white",
      
      // Highlight variant for featured/important
      highlight: "bg-steel-blue/10 dark:bg-steel-blue/20 text-steel-blue border border-steel-blue/30 dark:border-steel-blue/40",
    },
    size: {
      sm: "px-3 py-1.5 text-xs gap-1.5",
      md: "px-4 py-2 text-sm gap-2",
      lg: "px-5 py-2.5 text-base gap-2.5",
    },
  },
  defaultVariants: {
    variant: "tag",
    size: "md",
  },
});

type BadgeVariantType = "tag" | "specialization" | "type" | "outline" | "highlight";
type BadgeUIVariantType = "tag" | "type" | "outline" | "highlight" | "default" | "secondary" | "destructive";

export interface TagBadgeProps extends Omit<VariantProps<typeof badgeVariants>, "variant"> {
  variant?: BadgeVariantType;
  /** Badge content - can be string or ReactNode for flexibility */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Pulse animation for attention (used in hero badges) */
  pulse?: boolean;
}

/**
 * Maps TagBadge variants to Badge UI variants
 */
function mapVariantToUI(variant: BadgeVariantType | undefined): BadgeUIVariantType {
  if (!variant || variant === "specialization") {
    return "tag";
  }
  return variant as BadgeUIVariantType;
}

/**
 * TagBadge Component - Flexible badge component for tags and labels.
 * 
 * Supports multiple variants and sizes for consistent styling across slices.
 * Can be used as a Server Component (default) or wrapped in Client Component
 * for animations via MotionBadge.
 * 
 * @example
 * // Simple tag (default)
 * <TagBadge>Backend Developer</TagBadge>
 * 
 * // With icon
 * <TagBadge icon={<IconComponent />}>Featured</TagBadge>
 * 
 * // Custom variant and size
 * <TagBadge variant="type" size="lg">Conference</TagBadge>
 * 
 * // With pulse animation (use MotionBadge instead for client-side)
 * <TagBadge pulse>New</TagBadge>
 */
const TagBadge: FC<TagBadgeProps> = ({
  children,
  variant = "tag",
  size = "md",
  pulse = false,
  className,
}) => {
  const badgeVariant = mapVariantToUI(variant);

  return (
    <Badge
      variant={badgeVariant}
      className={cn(
        badgeVariants({ variant, size }),
        pulse && "animate-pulse",
        className
      )}
    >
      {children}
    </Badge>
  );
};

export default TagBadge;

