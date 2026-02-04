'use client'

import * as m from 'motion/react-m'
import { type LucideIcon } from '@/lib/icons'
import { slideInLeft, DURATION, EASE } from '@/lib/motion-variants'

interface HighlightItemProps {
  title: string
  description: string
  icon?: LucideIcon
  color?: string
}

export default function HighlightItem({
  title,
  description,
  icon: Icon,
  color,
}: HighlightItemProps) {
  // Simple helper for opacity (inline to avoid external dependencies)
  const getBgColor = (hex?: string) => {
    if (!hex?.startsWith('#')) return undefined
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, 0.1)`
  }

  return (
    <m.div
      variants={slideInLeft}
      transition={{ duration: DURATION.DEFAULT, ease: EASE }}
      className="flex items-start gap-4 rounded-xl p-2 transition-colors hover:bg-black/5 dark:hover:bg-white/5"
    >
      {Icon && (
        <div
          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl"
          style={{ backgroundColor: getBgColor(color) }}
        >
          <Icon className="h-6 w-6" style={{ color: color || 'currentColor' }} />
        </div>
      )}
      <div>
        <div className="text-ink-black mb-1 font-medium dark:text-white">{title}</div>
        <div className="text-ink-black/60 text-pretty text-sm dark:text-white/60">
          {description}
        </div>
      </div>
    </m.div>
  )
}
