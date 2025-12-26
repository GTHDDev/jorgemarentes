"use client";

import { FC, ReactNode, memo } from "react";
import * as m from "motion/react-m";
import { fadeInUpDeep, transitionDefaults } from "@/lib/motion-variants";

export const animationLazyLoadViewport = {
  once: true,
  margin: "-100px",
} as const;

interface AnimationLazyLoadProps {
  children: ReactNode;
  className?: string;
  variants?: { initial: object; animate: object };
  transition?: object;
  viewport?: { once?: boolean; margin?: string };
}

/**
 * Wraps children in a motion container that animates only when in view.
 * Uses initial={false} to avoid hydration mismatch. No SSR animation styles.
 */
const AnimationLazyLoad: FC<AnimationLazyLoadProps> = ({
  children,
  className,
  variants = fadeInUpDeep,
  transition = transitionDefaults,
  viewport = animationLazyLoadViewport,
}) => {
  return (
    <m.div
      variants={variants}
      initial={false}
      whileInView="animate"
      viewport={viewport}
      transition={transition}
      className={className}
    >
      {children}
    </m.div>
  );
};

export default memo(AnimationLazyLoad);
