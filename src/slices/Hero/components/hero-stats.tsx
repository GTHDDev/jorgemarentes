'use client'

import * as m from 'motion/react-m'
import { Content } from '@prismicio/client'
import HeroStatItem from './hero-stat-item'
import { staggerContainer, HERO_DELAYS } from '@/lib/motion-variants'

interface HeroStatsProps {
  stats: Content.HeroSliceDefaultPrimaryStatsItem[]
}

export default function HeroStats({ stats }: HeroStatsProps) {
  //inline validation
  const validStats = stats?.filter((s) => s.stat !== null && s.stat !== undefined)

  return (
    <m.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      transition={{ delayChildren: HERO_DELAYS.stats }}
      className="border-ink-black/10 flex flex-wrap items-center gap-x-12 gap-y-6 border-t pt-8 dark:border-white/10"
    >
      {validStats.map((item, idx) => (
        <HeroStatItem key={idx} stat={Number(item.stat)} description={item.description || ''} />
      ))}
    </m.div>
  )
}
