'use client'

import * as m from 'motion/react-m'
import { Badge } from '@/components/ui/badge'
import { fadeInUpDeep, staggerContainer, DURATION, EASE } from '@/lib/motion-variants'

interface SectionHeaderProps {
  tag: string
  heading: string
  description: string
}

export default function SectionHeader({ tag, heading, description }: SectionHeaderProps) {
  return (
    <m.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="mb-12 max-w-3xl lg:mb-16"
    >
      <m.div
        variants={fadeInUpDeep}
        transition={{ duration: DURATION.DEFAULT, ease: EASE }}
        className="mb-6"
      >
        <Badge variant="secondary" size="md">
          {tag}
        </Badge>
      </m.div>

      <m.h2
        variants={fadeInUpDeep}
        transition={{ duration: DURATION.DEFAULT, ease: EASE }}
        className="font-space text-ink-black mb-6 text-balance text-4xl tracking-tight sm:text-5xl lg:text-6xl dark:text-white"
      >
        {heading}
      </m.h2>

      <m.p
        variants={fadeInUpDeep}
        transition={{ duration: DURATION.DEFAULT, ease: EASE }}
        className="text-ink-black/60 text-pretty text-lg leading-relaxed lg:text-xl dark:text-white/60"
      >
        {description}
      </m.p>
    </m.div>
  )
}
