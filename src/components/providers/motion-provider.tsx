"use client";

import { FC, ReactNode } from "react";
import { LazyMotion } from "motion/react";
import loadFeatures from "@/lib/motion-features";

interface MotionProviderProps {
  children: ReactNode;
}

/**
 * Motion provider wrapper for lazy loading animation features.
 * Reduces initial bundle size from 34kb to 4.6kb, then loads
 * animation features asynchronously after initial render.
 */
const MotionProvider: FC<MotionProviderProps> = ({ children }) => {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
};

export default MotionProvider;
