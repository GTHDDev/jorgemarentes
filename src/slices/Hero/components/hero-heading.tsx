'use client'

import * as m from 'motion/react-m'
import { cn } from '@/lib/utils'
import { fadeInUp, DURATION, EASE } from '@/lib/motion-variants'

interface HeroHeadingProps {
  children: React.ReactNode
  subtitle?: string | null
  size?: 'default' | 'large' | 'medium'
  align?: 'left' | 'center'
  className?: string
  as?: 'h1' | 'h2'
}

export default function HeroHeading({
  children,
  subtitle,
  size = 'default',
  align = 'left',
  className,
  as: Component = 'h1',
}: HeroHeadingProps) {
  const sizeClasses = {
    large: 'text-5xl sm:text-6xl lg:text-7xl xl:text-display-lg',
    default: 'text-4xl sm:text-5xl lg:text-6xl',
    medium: 'text-3xl sm:text-4xl lg:text-5xl',
  }

  const alignClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
  }

  return (
    <m.div
      variants={fadeInUp}
      transition={{ duration: DURATION.DEFAULT, ease: EASE }}
      className={cn('space-y-2', alignClasses[align], className)}
    >
      <Component
        className={cn(
          'font-space text-ink-black text-balance font-medium tracking-tight dark:text-white',
          sizeClasses[size]
        )}
      >
        {children}
        {subtitle && <span className="text-steel-blue ml-2 inline-block md:ml-3">{subtitle}</span>}
      </Component>
    </m.div>
  )
}
