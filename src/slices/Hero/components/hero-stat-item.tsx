'use client'

import { NumberTicker } from '@/components/ui/number-ticker'
import * as m from 'motion/react-m'
import { fadeInUp } from '@/lib/motion-variants'

interface HeroStatItemProps {
  stat: number
  description: string
}

export default function HeroStatItem({ stat, description }: HeroStatItemProps) {
  return (
    <m.div variants={fadeInUp}>
      <div className="flex flex-col">
        <NumberTicker
          value={stat}
          delay={0.5}
          className="font-space text-ink-black text-3xl font-medium tracking-tight sm:text-4xl dark:text-white"
        />
        <span className="text-ink-black/60 mt-1 text-sm font-medium dark:text-white/60">
          {description}
        </span>
      </div>
    </m.div>
  )
}
