'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { m, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all backdrop-blur-sm',
  {
    variants: {
      variant: {
        default:
          'bg-white/80 dark:bg-white/10 border-ink-black/5 dark:border-white/10 text-ink-black/70 dark:text-white/70 shadow-soft',
        secondary:
          'bg-soft-beige dark:bg-white/5 border-transparent text-ink-black/70 dark:text-white/70',
        highlight: 'bg-mango-gold text-ink-black border-transparent shadow-soft',
        outline: 'border-ink-black/20 dark:border-white/20 text-ink-black dark:text-white',
      },
      size: {
        sm: 'px-3 py-1 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-5 py-2.5 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface BadgeProps
  extends Omit<HTMLMotionProps<'div'>, 'variant' | 'children'>, VariantProps<typeof badgeVariants> {
  children?: React.ReactNode
  showDot?: boolean
  dotColor?: string
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    { className, variant, size, showDot = false, dotColor = 'bg-steel-blue', children, ...props },
    ref
  ) => {
    return (
      <m.div ref={ref} className={cn(badgeVariants({ variant, size }), className)} {...props}>
        {showDot && (
          <span className={cn('h-2 w-2 animate-pulse rounded-full', dotColor)} aria-hidden="true" />
        )}
        {children}
      </m.div>
    )
  }
)

Badge.displayName = 'Badge'

export { Badge, badgeVariants }
