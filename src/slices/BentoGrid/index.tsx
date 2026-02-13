import { FC } from 'react'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { Bounded } from '@/components/bounded'
import { isFilled } from '@prismicio/client'
import { ConferenceGrid } from './components/conferences-grid'
import { ServicesGrid } from './components/services-grid'

/**
 * Props for `BentoGrid`.
 */
export type BentoGridProps = SliceComponentProps<Content.BentoGridSlice>

/**
 * Component for "BentoGrid" Slices.
 */
const BentoGrid: FC<BentoGridProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-white dark:bg-[#0a0a0a]"
    >
      {/* Variation: Conferences (Default) */}
      {slice.variation === 'default' && isFilled.group(slice.primary.conferences) && (
        <ConferenceGrid items={slice.primary.conferences} />
      )}

      {/* Variation: Services */}
      {slice.variation === 'services' && isFilled.group(slice.primary.services) && (
        <ServicesGrid servicesItems={slice.primary.services} />
      )}
    </Bounded>
  )
}

export default BentoGrid
