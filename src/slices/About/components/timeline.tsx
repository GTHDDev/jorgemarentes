'use client'

import * as m from 'motion/react-m'
import { Content } from '@prismicio/client'
import TimelineItem from './timeline-item'
import { Icons, type LucideIcon } from '@/lib/icons'
import { staggerContainer } from '@/lib/motion-variants'

interface TimelineProps {
  milestones: Content.AboutSliceDefaultPrimaryMilestonesItem[]
}

const icons: Record<string, LucideIcon> = {
  Award: Icons.Award,
  FileText: Icons.FileText,
  GraduationCap: Icons.GraduationCap,
}

export default function Timeline({ milestones }: TimelineProps) {
  if (!milestones?.length) return null

  return (
    <m.div
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-100px' }}
      className="relative pl-4 lg:pl-0"
    >
      <div className="space-y-8">
        {milestones.map((milestone, index) => {
          const Icon = milestone.icon ? icons[milestone.icon] : undefined

          return (
            <TimelineItem
              key={index}
              index={index}
              isLast={index === milestones.length - 1}
              year={milestone.year}
              title={milestone.title}
              institution={milestone.institution}
              description={milestone.description}
              color={milestone.color}
              icon={Icon}
            />
          )
        })}
      </div>
    </m.div>
  )
}
