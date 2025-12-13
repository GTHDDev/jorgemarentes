/**
 * Shared motion variants for Hero components.
 * Reduces code duplication and ensures consistent animations.
 */

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export const fadeInScale = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
};

export const slideInRight = {
  initial: { opacity: 0, scale: 0.95, x: 50 },
  animate: { opacity: 1, scale: 1, x: 0 },
};

export const transitionDefaults = {
  duration: 0.5,
  ease: [0.4, 0.0, 0.2, 1] as const,
};

export const transitionFast = {
  duration: 0.3,
  ease: "easeOut" as const,
};

export const transitionSlow = {
  duration: 0.8,
  ease: [0.4, 0.0, 0.2, 1] as const,
};

// Animation delays for staggered animations
export const delays = {
  badge: 0.2,
  heading: 0.3,
  description: 0.4,
  links: 0.5,
  stats: 0.6,
  image: 0.2,
  scrollIndicator: 1.2,
};

// Hover variants for interactive elements
export const hoverScale = {
  scale: 1.02,
  y: -2,
};

export const tapScale = {
  scale: 0.98,
};
