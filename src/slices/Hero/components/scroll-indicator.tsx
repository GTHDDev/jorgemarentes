"use client";

import { FC, memo, useEffect, useRef } from "react";
import { useAnimate } from "motion/react";

/**
 * Scroll indicator component - animated scroll hint.
 * Optimized with useAnimate hook (2.3kb mini version) instead of motion component.
 * This reduces bundle size significantly while maintaining performance.
 */
const ScrollIndicator: FC = () => {
  const [scope, animate] = useAnimate();
  const bounceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scope.current || !bounceRef.current) return;

    // Animate opacity fade in
    const fadeIn = animate(
      scope.current,
      { opacity: 1 },
      { delay: 1.2, duration: 0.5 }
    );

    // Animate scroll bounce using selector within scope
    const bounceAnimation = animate(
      ".scroll-bounce",
      { y: [0, 8, 0] },
      {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }
    );

    return () => {
      fadeIn.stop();
      bounceAnimation.stop();
    };
  }, [scope, animate]);

  return (
    <div
      ref={scope}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
      style={{ opacity: 0, willChange: "opacity" }}
    >
      <div
        ref={bounceRef}
        className="scroll-bounce w-6 h-10 border-2 border-ink-black/20 dark:border-white/20 rounded-full p-1"
        style={{ willChange: "transform" }}
      >
        <div
          className="w-1.5 h-1.5 bg-steel-blue rounded-full mx-auto"
          style={{ willChange: "transform" }}
        />
      </div>
    </div>
  );
};

export default memo(ScrollIndicator);
