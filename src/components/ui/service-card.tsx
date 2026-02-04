'use client'

import { useMemo } from 'react'
import * as m from 'motion/react-m'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { fadeInUp, hoverLift, tapScale, DURATION, EASE } from '@/lib/motion-variants'
import { ColorField, KeyTextField } from '@prismicio/client'

interface ServiceCardProps {
  title: string | KeyTextField
  description: string | KeyTextField
  icon?: React.ElementType
  color?: string | ColorField
  tag?: string
  size?: 'default' | 'large'
  className?: string
  delay?: number
}

export default function ServiceCard({
  title,
  description,
  icon: Icon,
  color,
  tag,
  size = 'default',
  className,
  delay = 0,
}: ServiceCardProps) {
  const styles = useMemo(
    () => ({
      background: color ? `${color}15` : undefined,
      text: color || undefined,
    }),
    [color]
  )

  const isLarge = size === 'large'

  return (
    <m.div
      variants={fadeInUp}
      transition={{ duration: DURATION.DEFAULT, ease: EASE, delay }}
      whileHover={hoverLift}
      whileTap={tapScale}
      className={cn('h-full', className)}
    >
      <Card
        className={cn(
          'group relative h-full overflow-hidden rounded-[2rem] border-0 transition-all duration-500',
          // Backgrounds & Borders
          'bg-pearl-white dark:bg-[#1a1a1a]',
          'border-ink-black/5 border dark:border-white/10',
          'hover:border-ink-black/10 dark:hover:border-white/20',
          // Shadows
          'shadow-soft hover:shadow-medium',
          // Reset default shadcn padding/gap if needed
          'flex flex-col gap-0'
        )}
      >
        <CardHeader className="block w-full space-y-0 p-8 pb-0 lg:p-10">
          {/* Icon Container */}
          <div
            className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110 lg:h-16 lg:w-16"
            style={{ backgroundColor: styles.background }}
          >
            {Icon && (
              <Icon
                className="h-7 w-7 transition-transform duration-500 group-hover:rotate-6 lg:h-8 lg:w-8"
                style={{ color: styles.text }}
              />
            )}
          </div>

          {/* Tag */}
          {tag && (
            <div
              className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-medium"
              style={{
                backgroundColor: styles.background,
                color: styles.text,
              }}
            >
              {tag}
            </div>
          )}

          {/* Title */}
          <CardTitle
            className={cn(
              'font-space text-ink-black font-medium leading-tight tracking-tight transition-colors dark:text-white',
              isLarge ? 'text-2xl lg:text-3xl' : 'text-xl lg:text-2xl'
            )}
          >
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent className="mt-auto p-8 pt-4 lg:p-10">
          <p
            className={cn(
              'text-ink-black/60 text-pretty leading-relaxed dark:text-white/60',
              isLarge ? 'text-base lg:text-lg' : 'text-sm lg:text-base'
            )}
          >
            {description}
          </p>
        </CardContent>

        {/* Gradient Overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-10"
          style={{
            background: color
              ? `linear-gradient(135deg, ${color} 0%, transparent 100%)`
              : undefined,
          }}
          aria-hidden="true"
        />
      </Card>
    </m.div>
  )
}
