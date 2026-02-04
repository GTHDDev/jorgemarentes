'use client'

import * as m from 'motion/react-m'
import { Badge } from '@/components/ui/badge'
import { fadeInUpDeep, DURATION, EASE } from '@/lib/motion-variants'

interface SectionHeaderProps {
  tag: string
  heading: string
}

export default function SectionHeader({ tag, heading }: SectionHeaderProps) {
  return (
    <div className="mx-auto mb-12 max-w-[1440px] px-6 sm:px-8 lg:px-12">
      <m.div
        variants={fadeInUpDeep}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: DURATION.DEFAULT, ease: EASE }}
      >
        <div className="mb-6">
          <Badge variant="secondary" size="md">
            {tag}
          </Badge>
        </div>

        <h2
          id="highlights-heading"
          className="font-space text-ink-black text-balance text-4xl tracking-tight sm:text-5xl lg:text-6xl dark:text-white"
        >
          {heading}
        </h2>
      </m.div>
    </div>
  )
}
