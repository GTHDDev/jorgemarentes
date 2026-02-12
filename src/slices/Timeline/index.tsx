import { Suspense } from 'react'
import { Content, isFilled } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { Skeleton } from '@/components/ui/skeleton'
import { Bounded } from '@/components/bounded'
import SectionHeader from './components/section-header'
import TimelineWrapper from './components/timeline-wrapper'

const TimelineSkeleton = () => (
  <div className="mt-12 space-y-16">
    {[1, 2, 3].map((i) => (
      <div key={i} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <div className={`hidden lg:block ${i % 2 === 0 ? 'col-start-2' : 'col-start-1'}`} />
        <Skeleton className="h-64 w-full rounded-[2rem] bg-gray-100 dark:bg-white/5" />
      </div>
    ))}
  </div>
)

export type TimelineProps = SliceComponentProps<Content.TimelineSlice>

const Timeline = ({ slice }: TimelineProps) => {
  const timeline = slice.primary.timeline || []

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-soft-beige overflow-hidden dark:bg-[#0a0a0a]"
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

      {isFilled.group(slice.primary.timeline) && (
        <Suspense fallback={<TimelineSkeleton />}>
          <TimelineWrapper timeline={timeline} />
        </Suspense>
      )}
    </Bounded>
  )
}

export default Timeline
