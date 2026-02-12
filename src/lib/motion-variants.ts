/**
 * CORE MOTION CONFIGURATION
 */

// -----------------------------------------------------------------------------
// 1. CONFIGURATION CONSTANTS
// -----------------------------------------------------------------------------

// Curva Bezier estándar para una sensación "premium" (Apple-like)
export const EASE = [0.25, 0.1, 0.25, 1] as const

export const DURATION = {
  FAST: 0.3,
  DEFAULT: 0.5,
  SLOW: 0.8,
}

// -----------------------------------------------------------------------------
// 2. ENTRY ANIMATIONS (Fade & Slide)
// -----------------------------------------------------------------------------

// Simple Fade
export const fadeIn = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: DURATION.DEFAULT, ease: EASE },
  },
  exit: { opacity: 0 },
}

// Standard Fade Up (The "Bread and Butter")
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.DEFAULT, ease: EASE },
  },
  exit: { opacity: 0, y: 10 },
}

// Deep Fade Up (For larger sections or cards)
export const fadeInUpDeep = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.SLOW, ease: EASE },
  },
}

// Slide In From Left (Sidebar, highlights)
export const slideInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.DEFAULT, ease: EASE },
  },
}

// Slide In From Right (Hero Images, Timelines)
export const slideInRight = {
  initial: {
    opacity: 0,
    x: 30,
    scale: 0.98, // Subtle scale for depth
  },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: DURATION.SLOW,
      ease: EASE,
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: DURATION.FAST,
      ease: EASE,
    },
  },
}

// Scale In (Modals, Badges)
export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.FAST, ease: 'easeOut' as const },
  },
}

// -----------------------------------------------------------------------------
// 3. ORCHESTRATION (Stagger)
// -----------------------------------------------------------------------------

// Standard Stagger (Grids, Lists)
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
}

// Slow Stagger (Hero sections, Features)
export const staggerContainerSlow = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

// -----------------------------------------------------------------------------
// 4. INTERACTIVE ANIMATIONS (Hover & Tap)
// -----------------------------------------------------------------------------

/**
 * Universal Tap Effect.
 * Use: whileTap={tapScale}
 */
export const tapScale = {
  scale: 0.95,
  transition: { duration: 0.1, ease: 'linear' as const },
}

/**
 * Standard Lift Effect.
 * Use: whileHover={hoverLift} (Buttons, small cards)
 */
export const hoverLift = {
  scale: 1.02,
  y: -2,
  transition: { duration: 0.2, ease: 'easeOut' as const },
}

/**
 * Expand/Zoom Effect.
 * Use: whileHover={hoverExpand} (Images, Featured Cards)
 */
export const hoverExpand = {
  scale: 1.05,
  transition: { duration: 0.4, ease: EASE },
}

// Compatibility export (Deprecated - prefer atomic exports above)
export const hoverAction = {
  hover: hoverLift,
  tap: tapScale,
}

// -----------------------------------------------------------------------------
// 5. SPECIFIC CONFIGURATIONS
// -----------------------------------------------------------------------------

// Hero Section Choreography Delays
export const HERO_DELAYS = {
  badge: 0.1,
  heading: 0.2,
  description: 0.3,
  actions: 0.4,
  image: 0.5,
  stats: 0.6,
}

// -----------------------------------------------------------------------------
// 6. UI SPECIFIC ANIMATIONS
// -----------------------------------------------------------------------------

/**
 * Slide Down (Navbar Entry)
 */
export const slideDown = {
  hidden: { y: ' -100%' },
  visible: {
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
}

/**
 * Expand Vertical (Mobile Menu Accordion)
 */
export const expandVertical = {
  hidden: { opacity: 0, height: 0, overflow: 'hidden' },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: { duration: DURATION.DEFAULT, ease: EASE },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: DURATION.FAST, ease: EASE },
  },
}
