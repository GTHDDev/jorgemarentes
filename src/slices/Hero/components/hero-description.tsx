'use client'

import { m } from 'framer-motion'
import { cn } from '@/lib/utils'
import { fadeInUp, DURATION, EASE } from '@/lib/motion-variants'

interface HeroDescriptionProps {
  children: React.ReactNode
  align?: 'left' | 'center'
  className?: string
  delay?: number
}

export default function HeroDescription({
  children,
  align = 'left',
  className,
  delay = 0.1,
}: HeroDescriptionProps) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
  }

  return (
    <m.p
      variants={fadeInUp}
      transition={{ duration: DURATION.DEFAULT, ease: EASE, delay }}
      className={cn(
        // Base styles
        'text-ink-black/60 text-pretty text-lg leading-relaxed sm:text-xl lg:text-2xl dark:text-white/60',
        alignClasses[align],
        className
      )}
    >
      {children}
    </m.p>
  )
}
