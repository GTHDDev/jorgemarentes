/**
 * Shared motion variants.
 * Reduces code duplication and ensures consistent animations across the application.
 */

// Fade Up Animations
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

// Deep Fade Up (longer distance) - used in Services
export const fadeInUpDeep = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

// Simple Fade
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

// Fade In with Scale
export const fadeInScale = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
};

// Slide In From Right
export const slideInRight = {
  initial: { opacity: 0, scale: 0.95, x: 50 },
  animate: { opacity: 1, scale: 1, x: 0 },
};

// Transitions
export const transitionDefaults = {
  duration: 0.5,
  ease: [0.4, 0.0, 0.2, 1] as const,
};

export const transitionSlow = {
  duration: 0.8,
  ease: [0.4, 0.0, 0.2, 1] as const,
};

export const transitionFast = {
  duration: 0.3,
  ease: "easeOut" as const,
};

// Animation delays for staggered animations (Hero specific but can be reused)
export const heroDelays = {
  badge: 0.2,
  heading: 0.3,
  description: 0.4,
  links: 0.5,
  stats: 0.6,
  image: 0.2,
  scrollIndicator: 1.2,
};

// Hover Animations
export const hoverLift = {
  scale: 1.02,
  y: -2,
};

export const hoverExpand = {
  scale: 1.05,
};

// Tap Animations
export const tapScale = {
  scale: 0.95,
};

export const tapScaleSubtle = {
  scale: 0.98,
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};
