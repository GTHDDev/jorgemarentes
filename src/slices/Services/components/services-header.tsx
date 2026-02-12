'use client'

import * as m from 'motion/react-m'
import { fadeInUp, DURATION, EASE } from '@/lib/motion-variants'
import { Badge } from '@/components/ui/badge'

interface ServicesHeaderProps {
  tag: string | null
  heading: string | null
  description: string | null
}

export default function ServicesHeader({ tag, heading, description }: ServicesHeaderProps) {
  return (
    <m.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-100px' }}
      variants={fadeInUp}
      transition={{ duration: DURATION.DEFAULT, ease: EASE }}
      className="mb-16 max-w-3xl lg:mb-20"
    >
      <div className="mb-6">
        <Badge variant="default" size="md">
          {tag}
        </Badge>
      </div>

      <h2 className="font-space text-ink-black mb-6 text-balance text-4xl tracking-tight sm:text-5xl lg:text-6xl dark:text-white">
        {heading}
      </h2>

      <p className="text-ink-black/60 text-pretty text-lg leading-relaxed lg:text-xl dark:text-white/60">
        {description}
      </p>
    </m.div>
  )
}
