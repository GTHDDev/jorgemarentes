import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Content, isFilled } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { Skeleton } from '@/components/ui/skeleton'
import { Bounded } from '@/components/bounded'
import SectionHeader from './components/section-header'

const CarouselSkeleton = () => (
  <div className="mx-auto grid min-h-[500px] w-full max-w-5xl animate-pulse overflow-hidden rounded-[2.5rem] border border-black/5 bg-gray-100 lg:grid-cols-2 dark:bg-[#1a1a1a]">
    <div className="h-full min-h-[300px] bg-gray-200 dark:bg-white/5" />
    <div className="space-y-6 p-12">
      <Skeleton className="h-10 w-3/4 rounded-lg" />
      <Skeleton className="h-6 w-1/2 rounded" />
      <Skeleton className="mt-8 h-12 w-40 rounded-full" />
    </div>
  </div>
)

// Lazy load del carrusel (interactividad cliente)
const ConferenceCarousel = dynamic(() => import('./components/conference-carousel'), {
  ssr: true, // SSR true para SEO del contenido inicial
  loading: () => <CarouselSkeleton />,
})

export type ConferencesProps = SliceComponentProps<Content.ConferencesSlice>

const Conferences = ({ slice }: ConferencesProps) => {
  const conferences = slice.primary.conferences || []

  if (conferences.length === 0) return null

  return (
    <Bounded
      className="bg-soft-beige dark:bg-[#0a0a0a]"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {isFilled.keyText(slice.primary.tag) &&
        isFilled.keyText(slice.primary.heading) &&
        isFilled.keyText(slice.primary.description) && (
          <SectionHeader
            tag={slice.primary.tag}
            heading={slice.primary.heading}
            description={slice.primary.description}
          />
        )}

      {isFilled.group(slice.primary.conferences) && (
        <Suspense fallback={<CarouselSkeleton />}>
          <ConferenceCarousel conferences={conferences} />
        </Suspense>
      )}
    </Bounded>
  )
}

export default Conferences
