import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Services from './index';
import mocks from './mocks.json';
import type { Content } from '@prismicio/client';

// Build a slice object compatible with the component's expected props
function toSlice(mock: any): Content.ServicesSlice {
  const services = (mock.primary.services.value as any[]).map((g: any) => {
    const get = (key: string) => g.value.find((x: any) => x[0] === key)?.[1]?.value;
    return {
      icon: get('icon'),
      title: get('title'),
      description: get('description'),
      color: get('color'),
    };
  });

  return {
    slice_type: 'services',
    variation: mock.variation || 'default',
    primary: {
      tag: mock.primary.tag.value,
      heading: mock.primary.heading.value,
      description: mock.primary.description.value,
      services,
      services_button: mock.primary.services_button.value,
    },
    items: [],
    id: 'services-test-id',
    version: 'slicer-1',
  } as any;
}

const slice = toSlice((mocks as any)[0]);

describe('Services slice', () => {
  it('renders header tag, heading, and description', () => {
    render(<Services slice={slice as any} />);
    expect(screen.getByText(slice.primary.tag)).toBeInTheDocument();
    expect(screen.getByText(slice.primary.heading)).toBeInTheDocument();
    expect(screen.getByText(slice.primary.description)).toBeInTheDocument();
  });

  it('renders one card per service with title and description', () => {
    render(<Services slice={slice as any} />);
    slice.primary.services.forEach((s) => {
      expect(screen.getByText(s.title)).toBeInTheDocument();
      expect(screen.getByText(s.description)).toBeInTheDocument();
    });
  });

  it('applies background color style to icon container based on service color', () => {
    render(<Services slice={slice as any} />);
    // Icon containers are the first div inside each card with class "w-16 h-16..."
    const iconContainers = document.querySelectorAll('div.w-16.h-16');
    expect(iconContainers.length).toBe(slice.primary.services.length);

    slice.primary.services.forEach((s, idx) => {
      const el = iconContainers[idx] as HTMLElement;
      const bg = el.style.backgroundColor;
      if (s.color) {
        // jsdom normalizes the color to rgba; we just assert it is non-empty and roughly rgba(...)
        expect(bg).toMatch(/^rgba?\(/);
      } else {
        expect(bg).toBe('');
      }
    });
  });

  it('does not render an icon when the icon name is missing for a service', () => {
    const mod = structuredClone(slice) as any;
    // Remove icon for the first service
    mod.primary.services = mod.primary.services.map((s: any, i: number) => (i === 0 ? { ...s, icon: undefined } : s));

    render(<Services slice={mod} />);

    // For the first card, the icon container should have no child svg (lucide-react renders svg)
    const firstIconContainer = document.querySelectorAll('div.w-16.h-16')[0] as HTMLElement;
    // ensure it exists
    expect(firstIconContainer).toBeTruthy();
    const svg = firstIconContainer.querySelector('svg');
    expect(svg).toBeNull();
  });

  it('renders CTA button with correct label and href', () => {
    render(<Services slice={slice as any} />);
    const link = screen.getByRole('link', { name: slice.primary.services_button });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#contact');
  });

  it('sets slice data attributes on the section element', () => {
    render(<Services slice={slice as any} />);
    const section = document.querySelector('section[data-slice-type][data-slice-variation]') as HTMLElement;
    expect(section).toBeTruthy();
    expect(section.getAttribute('data-slice-type')).toBe(slice.slice_type);
    expect(section.getAttribute('data-slice-variation')).toBe(slice.variation);
  });
});
