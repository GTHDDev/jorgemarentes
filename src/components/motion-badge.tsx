"use client";

import { FC, ReactNode } from "react";
import * as m from "motion/react-m";
import { cva, type VariantProps } from "class-variance-authority";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ValueAnimationTransition } from "motion/react";

/**
 * Motion badge variants - same as TagBadge but with animation support
 */
const motionBadgeVariants = cva("inline-flex items-center gap-2 rounded-full px-4 py-2", {
  variants: {
    variant: {
      tag: "bg-white/60 dark:bg-white/5 backdrop-blur-sm text-ink-black/70 dark:text-white/70 border border-ink-black/5 dark:border-white/10 shadow-soft",
      specialization: "bg-white/80 dark:bg-white/10 backdrop-blur-sm text-ink-black/70 dark:text-white/70 border border-ink-black/5 dark:border-white/10 shadow-soft",
      type: "bg-mango-gold text-ink-black shadow-soft border-transparent",
      outline: "border border-ink-black/20 dark:border-white/20 text-ink-black dark:text-white",
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

/**
 * Animation variants for different badge entrance animations
 */
export const badgeAnimations = {
  fadeInUp: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 },
  },
} as const;

export type BadgeAnimationType = keyof typeof badgeAnimations;
type BadgeVariantType = "tag" | "specialization" | "type" | "outline" | "highlight";
type BadgeUIVariantType = "tag" | "type" | "outline" | "highlight" | "default" | "secondary" | "destructive";

export interface MotionBadgeProps extends Omit<VariantProps<typeof motionBadgeVariants>, "variant"> {
  variant?: BadgeVariantType;
  children: ReactNode;
  className?: string;
  /** Animation type - defaults to 'fadeInUp' */
  animation?: BadgeAnimationType;
  /** Delay in seconds - for staggered animations */
  delay?: number;
  /** Custom transition configuration */
  transition?: ValueAnimationTransition<Record<string, unknown>>;
  /** Hover scale effect */
  whileHover?: boolean;
  /** Pulse animation for attention */
  pulse?: boolean;
}

/**
 * Maps MotionBadge variants to Badge UI variants
 */
function mapVariantToUI(variant: BadgeVariantType | undefined): BadgeUIVariantType {
  if (!variant || variant === "specialization") {
    return "tag";
  }
  return variant as BadgeUIVariantType;
}

/**
 * MotionBadge Component - Badge with Framer Motion animations.
 * 
 * Extends TagBadge with smooth entrance animations and hover effects.
 * Useful for headers, CTAs, and other prominent elements.
 * 
 * @example
 * // Simple fade in up
 * <MotionBadge variant="specialization" delay={0.2}>
 *   Backend Developer
 * </MotionBadge>
 * 
 * // With icon and custom animation
 * <MotionBadge 
 *   variant="highlight" 
 *   animation="scaleIn" 
 *   icon={<StarIcon />}
 * >
 *   Featured
 * </MotionBadge>
 */
const MotionBadge: FC<MotionBadgeProps> = ({
  children,
  variant = "tag",
  size = "md",
  animation = "fadeInUp",
  delay = 0,
  transition = {},
  whileHover = false,
  pulse = false,
  className,
}) => {
  const animationVariant = badgeAnimations[animation];
  const badgeVariant = mapVariantToUI(variant);
  
  const defaultTransition: ValueAnimationTransition<Record<string, unknown>> = {
    duration: 0.5,
    ease: "easeOut",
    ...transition,
  };

  return (
    <m.div
      variants={animationVariant}
      initial="initial"
      animate="animate"
      transition={{ ...defaultTransition, delay }}
      whileHover={whileHover ? { scale: 1.05, y: -2 } : undefined}
      className="inline-block"
    >
      <Badge
        variant={badgeVariant}
        className={cn(
          motionBadgeVariants({ variant, size }),
          pulse && "animate-pulse",
          className
        )}
      >
        {children}
      </Badge>
    </m.div>
  );
};

export default MotionBadge;
