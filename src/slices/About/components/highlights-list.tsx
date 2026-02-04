'use client'

import * as m from 'motion/react-m'
import { Content } from '@prismicio/client'
import HighlightItem from './highlight-item'
import { Icons, type LucideIcon } from '@/lib/icons'
import { staggerContainer } from '@/lib/motion-variants'

interface HighlightsListProps {
  highlights: Content.AboutSliceDefaultPrimaryHighlightsItem[]
}

const icons: Record<string, LucideIcon> = {
  Award: Icons.Award,
  FileText: Icons.FileText,
  GraduationCap: Icons.GraduationCap,
}

export default function HighlightsList({ highlights }: HighlightsListProps) {
  if (!highlights?.length) return null

  return (
    <m.div
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-50px' }}
      className="space-y-4 pt-4"
    >
      {highlights.map((highlight, index) => {
        const iconName = highlight.icon || 'Award'
        const Icon = icons[iconName]
        const color = highlight.color || undefined

        return (
          <HighlightItem
            key={index}
            title={highlight.title || ''}
            description={highlight.description || ''}
            icon={Icon}
            color={color}
          />
        )
      })}
    </m.div>
  )
}
