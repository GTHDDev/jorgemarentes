import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';
import React from 'react';

// Mock PrismicNext components to simple elements without JSX
vi.mock('@prismicio/next', () => ({
  PrismicNextImage: (props: any) => {
    const { field, ...rest } = props;
    return React.createElement('img', { 'data-testid': 'prismic-image', alt: field?.alt || '', ...rest });
  },
  PrismicNextLink: (props: any) => {
    const { field, children, ...rest } = props;
    const href = field?.url || '#';
    return React.createElement('a', { 'data-testid': 'prismic-link', href, ...rest }, children);
  },
}));

// Mock motion to no-op components that render children (no JSX)
vi.mock('motion/react', async (orig) => {
  const actual: any = await (orig as any)();
  // Render real HTML elements for motion components, e.g., motion.a -> <a />
  const elementFactory = (tag: any) => (props: any) =>
    React.createElement(tag, props, props.children);
  const motion = new Proxy({}, {
    get: (_: any, tag: any) => elementFactory(tag),
  });
  return {
    ...actual,
    motion,
    useInView: () => true,
    useMotionValue: () => ({ set: () => {} }),
    useSpring: () => ({ on: () => () => {} }),
  };
});
