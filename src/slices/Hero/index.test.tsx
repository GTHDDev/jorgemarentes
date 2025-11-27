import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import Hero from './index';
import mocks from './mocks.json';
import type { Content } from '@prismicio/client';

// Build a slice object compatible with the component's expected props
function toSlice(mock: any): Content.HeroSlice {
  return {
    slice_type: 'hero',
    variation: mock.variation || 'default',
    primary: {
      heading: mock.primary.heading.value,
      subheading: mock.primary.subheading.value,
      introduction: mock.primary.introduction.value,
      specialization: mock.primary.specialization.value,
      schedule_button: mock.primary.schedule_button.value,
      schedule_link: mock.primary.schedule_link.value,
      link_button: mock.primary.link_button.value,
      link: mock.primary.link.value,
      image: mock.primary.image,
      stats: mock.primary.stats.value.map((g: any) => ({
        stat: Number(g.value.find((x: any) => x[0] === 'stat')[1].value),
        description: g.value.find((x: any) => x[0] === 'description')[1].value,
      })),
    },
    items: [],
    id: 'test-id',
    version: 'slicer-1',
  } as any;
}

const slice = toSlice((mocks as any)[0]);

describe('Hero slice', () => {
  it('renders headings and subheading', () => {
    render(<Hero slice={slice as any} />);
    expect(screen.getByText((t) => t.includes(slice.primary.heading))).toBeInTheDocument();
    expect(screen.getByText((t) => t.includes(slice.primary.subheading))).toBeInTheDocument();
  });

  it('renders specialization pill and introduction', () => {
    render(<Hero slice={slice as any} />);
    expect(screen.getByText(slice.primary.specialization)).toBeInTheDocument();
    expect(screen.getByText((t) => t.includes(slice.primary.introduction))).toBeInTheDocument();
  });

  it('renders schedule link with calendar icon and button label', () => {
    render(<Hero slice={slice as any} />);
    const links = screen.getAllByTestId('prismic-link');
    const schedule = links.find((a) => a.getAttribute('href') === slice.primary.schedule_link.url);
    expect(schedule).toBeTruthy();
    expect(within(schedule!).getByText(slice.primary.schedule_button)).toBeInTheDocument();
  });

  it('renders secondary link with label', () => {
    render(<Hero slice={slice as any} />);
    const link = screen.getAllByTestId('prismic-link').find((a) => a.getAttribute('href') === slice.primary.link.url);
    expect(link).toBeTruthy();
    expect(within(link!).getByText(slice.primary.link_button)).toBeInTheDocument();
  });

  it('renders stats using NumberTicker with correct descriptions', () => {
    render(<Hero slice={slice as any} />);
    slice.primary.stats.forEach((s) => {
      expect(screen.getByText(s.description)).toBeInTheDocument();
    });
  });

  it('renders hero image', () => {
    render(<Hero slice={slice as any} />);
    expect(screen.getByTestId('prismic-image')).toBeInTheDocument();
  });
});
