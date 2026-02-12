import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Content, isFilled } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { Skeleton } from '@/components/ui/skeleton'
import { Bounded } from '@/components/bounded'
import HighlightCarousel from './components/highlight-carousel'

// Header Lazy Load
const SectionHeader = dynamic(() => import('./components/section-header'), {
  ssr: true,
  loading: () => (
    <div className="mx-auto mb-12 max-w-[1440px] px-6 sm:px-8 lg:px-12">
      <Skeleton className="mb-6 h-8 w-32 rounded-full" />
      <Skeleton className="h-16 w-3/4 rounded-lg" />
    </div>
  ),
})

// HighlightCarousel Skeleton
const CarouselSkeleton = () => (
  <div className="relative overflow-hidden py-8">
    <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
      <div className="flex gap-6 overflow-hidden">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-[280px] w-[340px] flex-shrink-0 rounded-[2rem] border border-black/5 bg-gray-100 sm:w-[380px] dark:border-white/10 dark:bg-white/5"
          />
        ))}
      </div>
    </div>
  </div>
)

export type HighlightsCarouselProps = SliceComponentProps<Content.HighlightsCarouselSlice>

const HighlightsCarousel = ({ slice }: HighlightsCarouselProps) => {
  const highlights = slice.primary.highligths || []

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative overflow-hidden bg-white py-16 lg:py-24 dark:bg-[#0a0a0a]"
      aria-labelledby="highlights-heading"
    >
      {isFilled.keyText(slice.primary.tag) && isFilled.keyText(slice.primary.heading) && (
        <SectionHeader tag={slice.primary.tag || ''} heading={slice.primary.heading || ''} />
      )}

      {isFilled.group(slice.primary.highligths) && (
        <Suspense fallback={<CarouselSkeleton />}>
          <HighlightCarousel highlights={highlights} />
        </Suspense>
      )}
    </Bounded>
  )
}

export default HighlightsCarousel
