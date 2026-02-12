'use client'

import * as m from 'motion/react-m'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { fadeInUp, DURATION, EASE } from '@/lib/motion-variants'

interface HeroBadgeProps {
  children: React.ReactNode

  // Style options
  variant?: 'default' | 'secondary' | 'outline' | 'highlight'
  size?: 'sm' | 'md' | 'lg'
  className?: string

  // Accessories
  icon?: React.ReactNode

  showDot?: boolean
  pulsing?: boolean

  // Framer Motion
  delay?: number
  centered?: boolean
}

export default function HeroBadge({
  children,
  variant = 'default',
  size = 'md',
  className,
  icon,
  showDot = false,
  pulsing = false,
  delay = 0,
  centered = false,
}: HeroBadgeProps) {
  if (!children) return null

  return (
    <m.div
      variants={fadeInUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: DURATION.DEFAULT, ease: EASE, delay }}
      className={cn('mb-6 flex w-full', centered ? 'justify-center' : '')}
    >
      <Badge
        variant={variant}
        size={size}
        className={cn('inline-flex items-center gap-2', className)}
      >
        {pulsing && (
          <span className="relative mr-1 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
          </span>
        )}

        {!pulsing && showDot && <span className="bg-steel-blue mr-1 h-2 w-2 rounded-full" />}

        {icon}

        <span>{children}</span>
      </Badge>
    </m.div>
  )
}
