import { Bounded } from '@/components/bounded'
import { Content, isFilled } from '@prismicio/client'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import { SliceComponentProps } from '@prismicio/react'
import { Suspense } from 'react'

// Client Components
import ServicesHeader from './components/services-header'
import ServicesCTA from './components/services-cta'

// Lazy loading of the grid to optimize the initial bundle
const ServicesGrid = dynamic(() => import('./components/services-grid'), {
  ssr: true,
  loading: () => (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 lg:gap-8">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-pearl-white border-ink-black/5 h-[300px] rounded-[2rem] border p-8 lg:p-10 dark:border-white/10 dark:bg-[#1a1a1a]"
        >
          <Skeleton className="mb-6 h-16 w-16 rounded-2xl" />
          <Skeleton className="mb-4 h-8 w-3/4" />
          <Skeleton className="mb-2 h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      ))}
    </div>
  ),
})

export type ServicesProps = SliceComponentProps<Content.ServicesSlice>

const Services = ({ slice }: ServicesProps) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-white dark:bg-[#0a0a0a]"
    >
      {/* Header */}
      {isFilled.keyText(slice.primary.tag) &&
        isFilled.keyText(slice.primary.heading) &&
        isFilled.keyText(slice.primary.description) && (
          <ServicesHeader
            tag={slice.primary.tag}
            heading={slice.primary.heading}
            description={slice.primary.description}
          />
        )}

      {/* Grid with Suspense (although dynamic already handles loading, this is double security) */}
      {isFilled.group(slice.primary.services) && (
        <Suspense>
          <ServicesGrid services={slice.primary.services} />
        </Suspense>
      )}

      {/* CTA */}
      {isFilled.keyText(slice.primary.services_button) &&
        isFilled.link(slice.primary.button_link) && (
          <ServicesCTA
            buttonText={slice.primary.services_button}
            link={slice.primary.button_link}
          />
        )}
    </Bounded>
  )
}

export default Services
