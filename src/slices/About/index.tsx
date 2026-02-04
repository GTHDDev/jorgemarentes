'use client'

import { FC, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Content, isFilled } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { Skeleton } from '@/components/ui/skeleton'
import { Bounded } from '@/components/bounded'
import SectionHeader from './components/section-header'
import HighlightsList from './components/highlights-list'
import AboutButton from './components/about-button'

const TimelineSkeleton = () => (
  <div className="space-y-8">
    {[1, 2, 3].map((i) => (
      <div key={i} className="relative">
        <Skeleton className="h-[240px] w-full rounded-[2rem] bg-gray-100 dark:bg-gray-800/50" />
      </div>
    ))}
  </div>
)

const Timeline = dynamic(() => import('./components/timeline'), {
  ssr: true,
  loading: () => <TimelineSkeleton />,
})

export type AboutProps = SliceComponentProps<Content.AboutSlice>

const About: FC<AboutProps> = ({ slice }) => {
  const highlights = slice.primary.highlights || []
  const milestones = slice.primary.milestones || []

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-white dark:bg-[#0a0a0a]"
    >
      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Left Column - Header & Highlights */}
        <div className="sticky top-24 space-y-8">
          {isFilled.keyText(slice.primary.tag) &&
            isFilled.keyText(slice.primary.heading) &&
            isFilled.keyText(slice.primary.description) && (
              <SectionHeader
                tag={slice.primary.tag}
                heading={slice.primary.heading}
                description={slice.primary.description}
              />
            )}

          {isFilled.group(slice.primary.highlights) && <HighlightsList highlights={highlights} />}

          {isFilled.keyText(slice.primary.button) && isFilled.link(slice.primary.button_link) && (
            <div className="pt-4">
              <AboutButton button={slice.primary.button} buttonLink={slice.primary.button_link} />
            </div>
          )}
        </div>

        {/* Right Column - Timeline */}
        {isFilled.group(slice.primary.milestones) && (
          <Suspense fallback={<TimelineSkeleton />}>
            <Timeline milestones={milestones} />
          </Suspense>
        )}
      </div>
    </Bounded>
  )
}

export default About
