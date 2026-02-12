'use client'

import { m } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { fadeInUpDeep, DURATION, EASE } from '@/lib/motion-variants'

interface SectionHeaderProps {
  tag: string
  heading: string
  description: string
}

export default function SectionHeader({ tag, heading, description }: SectionHeaderProps) {
  return (
    <m.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-100px' }}
      variants={fadeInUpDeep}
      transition={{ duration: DURATION.DEFAULT, ease: EASE }}
      className="mb-16 max-w-3xl lg:mb-20"
    >
      {tag && (
        <div className="mb-6">
          <Badge variant="secondary" size="md">
            {tag}
          </Badge>
        </div>
      )}

      {heading && (
        <h2 className="font-space text-ink-black mb-6 text-balance text-4xl tracking-tight sm:text-5xl lg:text-6xl dark:text-white">
          {heading}
        </h2>
      )}

      {description && (
        <p className="text-ink-black/60 text-pretty text-lg leading-relaxed lg:text-xl dark:text-white/60">
          {description}
        </p>
      )}
    </m.div>
  )
}
