'use client'

import * as m from 'motion/react-m'
import { Content } from '@prismicio/client'
import { fadeInUpDeep } from '@/lib/motion-variants'

interface AboutHeroHighlightItemProps {
  highlight: Content.HeroSliceAboutPrimaryHighlightsItem
  index: number
}

export default function AboutHeroHighlightItem({ highlight, index }: AboutHeroHighlightItemProps) {
  const { title, description, color } = highlight

  if (!title) return null

  return (
    <>
      {index > 0 && (
        <div className="bg-ink-black/10 h-12 w-px dark:bg-white/10" aria-hidden="true" />
      )}
      <m.div variants={fadeInUpDeep}>
        <div
          className="font-space text-2xl font-medium tracking-tight sm:text-3xl"
          style={color ? { color } : undefined}
        >
          {title}
        </div>
        <div className="text-ink-black/60 mt-1 text-sm font-medium dark:text-white/60">
          {description}
        </div>
      </m.div>
    </>
  )
}
