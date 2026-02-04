'use client'

import * as m from 'motion/react-m'
import { Content } from '@prismicio/client'
import AboutHeroHighlightItem from './about-hero-highlight-item'
import { staggerContainer } from '@/lib/motion-variants'

interface AboutHeroHighlightsProps {
  highlights: Content.HeroSliceAboutPrimaryHighlightsItem[]
}

export default function AboutHeroHighlights({ highlights }: AboutHeroHighlightsProps) {
  return (
    <m.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="border-ink-black/5 flex flex-wrap items-center gap-6 border-t pt-6 dark:border-white/10"
    >
      {highlights.map((highlight, index) => (
        <AboutHeroHighlightItem
          key={`${highlight.title}-${index}`}
          highlight={highlight}
          index={index}
        />
      ))}
    </m.div>
  )
}
