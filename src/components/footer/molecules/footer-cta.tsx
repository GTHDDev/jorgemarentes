'use client'

import { m } from 'framer-motion'
import { fadeInUp, DURATION, EASE } from '@/lib/motion-variants'

interface FooterCTAProps {
  heading: string | null | undefined
  description: string | null | undefined
}

export function FooterCTA({ heading, description }: FooterCTAProps) {
  if (!heading && !description) return null

  return (
    <m.div
      variants={fadeInUp}
      transition={{ duration: DURATION.DEFAULT, ease: EASE }}
      className="space-y-6"
    >
      {heading && (
        <h2 className="font-space text-balance text-4xl tracking-tight sm:text-5xl lg:text-6xl">
          {heading}
        </h2>
      )}
      {description && (
        <p className="max-w-xl text-pretty text-lg leading-relaxed text-white/60 lg:text-xl">
          {description}
        </p>
      )}
    </m.div>
  )
}
