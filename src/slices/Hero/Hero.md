# Hero Slice Documentation

## Overview

The Hero slice is the most visually prominent section at the top of the website. Its purpose is to introduce the user, showcase their specialization, and provide quick access to key actions and statistics. It is built for flexibility, high performance, and visual impact, using modular React components and optimized loading strategies.

---

## Main Features

- **Specialization Badge (HeroBadge)**: An animated badge highlighting the user's main expertise.
- **Heading & Subheading (HeroHeading)**: Large, clear text for name/title and a supporting subtitle.
- **Introduction (HeroDescription)**: A brief description or bio.
- **Action Links (HeroLinks)**: Buttons for key actions (e.g., schedule meeting, external link).
- **Stats (HeroStats)**: Key metrics or achievements displayed in a visually appealing way.
- **Hero Image (HeroImage)**: Prominent profile or thematic image, loaded efficiently (LCP).
- **Scroll Indicator (ScrollIndicator)**: Visual cue to encourage users to explore further.

---

## Component Structure

The Hero slice is composed of several modular components, all imported and assembled in `src/slices/Hero/index.tsx`.

| Component | Description |
|-----------|-------------|
| HeroBadge | Displays the specialization with animation. |
| HeroHeading | Renders the main heading and subheading. |
| HeroDescription | Shows the introduction text/bio. |
| HeroLinks | Contains action buttons (scheduleLink, link). |
| HeroStats | Displays a list of key statistics. |
| HeroImage | Responsible for loading the main image with LCP optimization. |
| ScrollIndicator | Animated scroll indicator. |
| MotionProvider | Wraps the section to enable Framer Motion animations. |

## How It Works (Prismic CMS Integration)

The content for the Hero slice is sourced from Prismic CMS. The main component extracts necessary fields (e.g., specialization, heading, image, stats) from the CMS slice data.

## Example Usage (TSX)

```tsx
<HeroBadge specialization={specialization} />
<HeroHeading heading={heading} subheading={subheading} />
<HeroDescription introduction={introduction} />

<HeroLinks 
  scheduleLink={schedule_link} 
  scheduleButton={schedule_button} 
  link={link} 
  linkButton={link_button} 
/>

<HeroStats stats={stats} />

<Suspense fallback={<LoadingImage />}>
  <HeroImage image={image} />
</Suspense>

<ScrollIndicator />
```

---

## Performance & Optimization

The slice incorporates several modern optimization techniques to ensure high performance scores:

- **LCP Preloading**: The main image (HeroImage) uses `loading="eager"` and `priority` to guarantee preload of the Largest Contentful Paint resource.
- **Lazy Loading**: Resources like the main image are dynamically loaded (Suspense in the example) to ensure faster initial rendering.
- **Server Components**: Most components are server-rendered for improved SEO and reduced Main Thread work.
- **Memoization (memo)**: Components are memoized to prevent unnecessary re-renders when parent properties update.

---

## Testing

Each modular component is designed to be testable in isolation using standard React testing libraries.

### Example Test

```tsx
import { render } from '@testing-library/react';
import HeroBadge from './hero-badge';

test('renders specialization badge', () => {
  const { getByText } = render(
    <HeroBadge specialization="Frontend Developer" />
  );
  expect(getByText('Frontend Developer')).toBeInTheDocument();
});
```

---

## Related Files

- `src/slices/Hero/index.tsx` – The main Hero slice component.
- `src/slices/Hero/components/` – Folder containing all modular components (HeroBadge, HeroImage, etc.).
- `src/slices/Hero/model.json` – Slice model definition for CMS integration.
- `src/slices/index.ts` – Registration and reference for dynamic loading in the slice zone.

---
