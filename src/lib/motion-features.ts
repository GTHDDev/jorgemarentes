/**
 * Motion features for lazy loading.
 * This allows us to reduce initial bundle size from 34kb to 4.6kb,
 * then load animation features asynchronously after initial render.
 */

import { domAnimation } from "motion/react";

// Export features for async loading
// This will be loaded after initial render, improving LCP
const loadFeatures = () => Promise.resolve(domAnimation);

export default loadFeatures;
