import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Conferences from './index';
import mocks from './mocks.json';
import type { Content } from '@prismicio/client';

// Transform mocks.json entry into Content.ConferencesSlice expected by the component
function toSlice(mock: any): Content.ConferencesSlice {
  const conferences = (mock.primary.conferences.value as any[]).map((g: any) => {
    const get = (key: string) => g.value.find((x: any) => x[0] === key)?.[1]?.value;
    return {
      title: get('title'),
      event: get('event'),
      date: get('date'),
      image: g.value.find((x: any) => x[0] === 'image')?.[1],
      type: get('type'),
      location: get('location'),
      conference_link: g.value.find((x: any) => x[0] === 'conference_link')?.[1]?.value ?? null,
    };
  });

  return {
    slice_type: 'conferences',
    variation: mock.variation || 'default',
    primary: {
      tag: mock.primary.tag.value,
      heading: mock.primary.heading.value,
      description: mock.primary.description.value,
      conferences,
    },
    items: [],
    id: 'conferences-test-id',
    version: 'slicer-1',
  } as any;
}

const slice = toSlice((mocks as any)[0]);

// Helper to render component once
function renderComp(s: any = slice) {
  return render(<Conferences slice={s} />);
}

function getVisibleSlideTitle(): string | null {
  const visible = document.querySelector('div.min-w-full[aria-hidden="false"]');
  const h3 = visible?.querySelector('h3');
  return h3?.textContent?.trim() ?? null;
}

function getCurrentIndicatorIndex(): number {
  const indicators = Array.from(document.querySelectorAll('button[aria-label^="Go to slide "]')) as HTMLButtonElement[];
  return indicators.findIndex((b) => b.getAttribute('aria-current') === 'true');
}

describe('Conferences slice', () => {
  it('renders header tag, heading and description', () => {
    renderComp();
    expect(screen.getByText(slice.primary.tag)).toBeInTheDocument();
    expect(screen.getByText(slice.primary.heading)).toBeInTheDocument();
    expect(screen.getByText(slice.primary.description)).toBeInTheDocument();
  });

  it('renders first conference card with its title and details visible', () => {
    renderComp();
    const first = slice.primary.conferences[0];
    // Title and details from the first slide should be present initially
    expect(screen.getByRole('heading', { name: first.title })).toBeInTheDocument();
    expect(screen.getByText(first.event)).toBeInTheDocument();
    expect(screen.getByText(first.location)).toBeInTheDocument();
    expect(screen.getByText(first.date)).toBeInTheDocument();
    // Type badge overlay
    expect(screen.getByText(first.type)).toBeInTheDocument();
    // Multiple images may be rendered (all slides mounted); just assert at least one exists
    expect(screen.getAllByTestId('prismic-image').length).toBeGreaterThan(0);
  });

  it('has carousel region with appropriate aria attributes', () => {
    renderComp();
    const region = screen.getByRole('region', { name: 'Conference presentations' });
    expect(region).toHaveAttribute('aria-roledescription', 'carousel');
  });

  it('navigates to next and previous slides using buttons', async () => {
    renderComp();
    const nextBtn = screen.getByRole('button', { name: 'Next conference' });
    const prevBtn = screen.getByRole('button', { name: 'Previous conference' });

    const total = slice.primary.conferences.length;
    const initial = getCurrentIndicatorIndex();
    expect(initial).toBeGreaterThanOrEqual(0);

    // Click next -> index advances by 1 (wraps)
    fireEvent.click(nextBtn);
    await waitFor(() => {
      const curr = getCurrentIndicatorIndex();
      expect(curr).toBe((initial + 1) % total);
    });

    // Click previous -> returns to initial
    fireEvent.click(prevBtn);
    await waitFor(() => {
      expect(getCurrentIndicatorIndex()).toBe(initial);
    });
  });

  it('navigates via indicator buttons', () => {
    renderComp();
    const indicators = screen.getAllByRole('button', { name: /Go to slide/ });
    expect(indicators.length).toBe(slice.primary.conferences.length);

    // Jump to last slide using its indicator
    fireEvent.click(indicators[indicators.length - 1]);
    expect(screen.getByRole('heading', { name: slice.primary.conferences[indicators.length - 1].title })).toBeInTheDocument();
  });

  it('supports keyboard activation on navigation controls', async () => {
    renderComp();
    const nextBtn = screen.getByRole('button', { name: 'Next conference' });

    const total = slice.primary.conferences.length;
    const initial = getCurrentIndicatorIndex();

    // Press Enter -> advances by 1
    fireEvent.keyDown(nextBtn, { key: 'Enter', code: 'Enter' });
    await waitFor(() => {
      expect(getCurrentIndicatorIndex()).toBe((initial + 1) % total);
    });

    // Press Space -> advances by 2 from initial
    fireEvent.keyDown(nextBtn, { key: ' ', code: 'Space' });
    await waitFor(() => {
      expect(getCurrentIndicatorIndex()).toBe((initial + 2) % total);
    });
  });

  it('renders CTA link inside action button when conference_link is provided', () => {
    renderComp();
    const anchors = screen.getAllByTestId('prismic-link');
    // There should be at least one anchor that links out (not '#') if any conference has a link
    const external = anchors.find((a) => {
      const href = a.getAttribute('href') || '';
      return href.startsWith('http');
    });
    if (slice.primary.conferences.some((c: any) => !!c.conference_link)) {
      expect(external).toBeTruthy();
    }
  });

  it('sets slice data attributes on section element', () => {
    renderComp();
    const section = document.querySelector('section[data-slice-type][data-slice-variation]') as HTMLElement;
    expect(section).toBeTruthy();
    expect(section.getAttribute('data-slice-type')).toBe(slice.slice_type);
    expect(section.getAttribute('data-slice-variation')).toBe(slice.variation);
  });
});
