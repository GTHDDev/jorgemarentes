# Badge System Documentation

## Overview

The badge system has been refactored to be more flexible, reusable, and maintain visual consistency throughout the application. It consists of three main components:

1. **TagBadge** - Server component for static badges
2. **MotionBadge** - Client component with Framer Motion animations
3. **Badge UI** - Base shadcn/ui component with extended variants

---

## TagBadge Component

Reusable server component for static badges. Uses CVA for variant management.

### Props

```tsx
interface TagBadgeProps {
children: ReactNode; // Badge content (required)
variant?: BadgeVariantType; // 'tag' | 'specialization' | 'type' | 'outline' | 'highlight'
size?: 'sm' | 'md' | 'lg'; // Badge size (default: 'md')
pulse?: boolean; // CSS pulse animation (default: false)
className?: string; // Additional classes
}
```

### Variants

- **tag** - Default style for tags (used in About, Conferences, Services)
- Translucent white background with backdrop blur
- Dark text with low opacity
- Soft shadow

- **specialization** - For specialization badges (used in Hero)
- White background with higher opacity
- Similar to 'tag' but more prominent

- **type** - For type badges (used in Conferences)
- Mango-gold background
- Black text
- No border

- **outline** - For badges with only a border
- Transparent with border
- Useful for future variations

- **highlight** - For highlighted content
- Steel-blue tinted background
- For featured content

### Usage Examples

```tsx
// Simple badge
<TagBadge>Backend Developer</TagBadge>

// Conference type variant
<TagBadge variant="type" size="md">Talk</TagBadge>

// Highlight variant
<TagBadge variant="highlight" pulse>New Feature</TagBadge>
```

---

## MotionBadge Component

Client component that extends TagBadge with Framer Motion animations. ### Props (in addition to TagBadgeProps)

```tsx
interface MotionBadgeProps extends Omit<VariantProps<typeof motionBadgeVariants>, "variant"> {
variant?: BadgeVariantType; // Same variants as TagBadge
animation?: 'fadeInUp' | 'fadeIn' | 'scaleIn' | 'slideInLeft'; // Animation type
delay?: number; // Delay in seconds
transition?: ValueAnimationTransition<...>; // Framer Motion configuration
whileHover?: boolean; // Scale on hover (default: false)
pulse?: boolean; // CSS pulse animation
}
```

### Available Animations

- **fadeInUp** - Opacity + upward movement (default)
- **fadeIn** - Opacity change only
- **scaleIn** - Opacity + scaling
- **slideInLeft** - Opacity + movement from the left

### Usage Examples (MotionBadge)

```tsx
// Default animation (fadeInUp)
<MotionBadge variant="specialization" delay={0.2}>
Backend Developer
</MotionBadge>

// With custom animation
<MotionBadge
variant="highlight"
animation="scaleIn"
delay={0.3}
whileHover
>
Featured
</MotionBadge>

// With custom transition
<MotionBadge
animation="slideInLeft"
transition={{ duration: 0.8 }}
>
Custom Transition
</MotionBadge>
```

---

## Integration in Slices

### Hero Slice

- Uses `MotionBadge` for the specialization badge
- Located at: `src/slices/Hero/components/hero-badge.tsx`
- Animation: fadeInUp with synchronized delay

```tsx
<MotionBadge
variant="specialization"
size="md"
animation="fadeInUp"
delay={delays.badge}
whileHover
>
<span className="w-2 h-2 bg-steel-blue rounded-full animate-pulse" />
{specialization}
</MotionBadge>
```

### About Slice

- Uses `TagBadge` in the section header
- Located at: `src/slices/About/components/section-header.tsx`
- Variant: tag (default)

```tsx
<TagBadge variant="tag" size="md">
{tag}
</TagBadge>
```

### Conferences Slice

- **section-header**: Uses `TagBadge` for the main tag
- **conference-card**: Uses `TagBadge` with "type" variant for the type overlay
- Located at: `src/slices/Conferences/components/`

```tsx
// In section-header
<TagBadge variant="tag">{tag}</TagBadge>

// In conference-card
<TagBadge variant="type" size="md" className="absolute top-6">
``` left-6"> 
{conference.type}
</TagBadge>
```

### Services Slice

- Use `TagBadge` in section header
- Located in: `src/slices/Services/index.tsx`
- Variant: tag

```tsx
<TagBadge variant="tag" size="md"> 
{slice.primary.tag}
</TagBadge>
```

---

## Motion Variants Export

The `MotionBadge` component exposes the `badgeAnimations` object for reuse:

```tsx
export const badgeAnimations = { 
fadeInUp: { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } }, 
fadeIn: { initial: { opacity: 0 }, animate: { opacity: 1 } }, 
scaleIn: { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 } }, 
slideInLeft: { initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 } },
} as const;
```

You can reuse these animations in other components:

```tsx
import { badgeAnimations } from "@/components/motion-badge";

const MyComponent = () => { 
return ( 
<motion.div variants={badgeAnimations.fadeInUp}> 
Content 
</motion.div> 
);
};
```

---

## Design Tokens Used

### Colors

- **ink-black**: #0F0F0F (main text)
- **pearl-white**: #FFFFFF (light background)
- **soft-beige**: #F3EDE7 (neutral backgrounds)
- **mango-gold**: Type color (Conferences)
- **steel-blue**: Highlight color

### Effects

- **backdrop-blur-sm**: Soft blur for glassmorphism
- **shadow-soft**: Subtle shadow for depth
- **border-soft**: Borders with low opacity

---

## TypeScript Safety

Both components maintain complete type-safety:

```tsx
type BadgeVariantType = "tag" | "specialization" | "type" | "outline" | "highlight";
type BadgeAnimationType = keyof typeof badgeAnimations;
```

Variants are validated at compile time, preventing typos.

---

## Bundle Optimization

- **TagBadge**: Server Component (0 JavaScript bytes)
- **MotionBadge**: Client Component + LazyMotion (optimized for bundle)
- Framer Motion uses `motion/react-m` (lazy motion) to reduce size

---

## Migration Guide

If you have old code using direct `Badge`:

### Before

```tsx
import { Badge } from "@/components/ui/badge";

<Badge variant="tag">Tag</Badge>
```

### After

```tsx
import TagBadge from "@/components/tag-badge";

<TagBadge variant="tag">Tag</TagBadge>
```

Or if you need animations:

```tsx
import MotionBadge from "@/components/motion-badge";

<MotionBadge variant="tag" animation="fadeInUp"> 
Tag
</MotionBadge>
```

---

## Testing

Each component is testable:

```tsx
import { render } from '@testing-library/react';
import TagBadge from '@/components/tag-badge';

test('renders badge with content', () => { 
const { getByText } = render(<TagBadge>Test</TagBadge>); 
expect(getByText('Test')).toBeInTheDocument();
});
```

---

## Related Files

- `src/components/tag-badge.tsx` - Server component
- `src/components/motion-badge.tsx` - Client component with animations
- `src/components/ui/badge.tsx` - Base shadcn/ui (modified with extended variants)
- `src/slices/Hero/components/motion-variants.ts` - Shared variants (delays, transitions)
- `src/slices/Hero/components/motion-provider.tsx` - Optimization Provider

---
