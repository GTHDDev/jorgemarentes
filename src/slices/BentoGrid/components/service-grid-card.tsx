'use client'

import { useMemo } from 'react'
import * as m from 'motion/react-m'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { fadeInUp, hoverLift, tapScale, DURATION, EASE } from '@/lib/motion-variants'
import { ColorField, KeyTextField, SelectField } from '@prismicio/client'

interface ServiceGridCardProps {
  title: KeyTextField
  description: KeyTextField
  icon?: React.ElementType
  color?: ColorField
  tag?: KeyTextField
  size?: SelectField
  className?: string
  delay?: number
}

export default function ServiceGridCard({
  title,
  description,
  icon: Icon,
  color = '#4A6FA5', // Fallback color (Steel Blue)
  tag,
  size = 'M',
  className,
  delay = 0,
}: ServiceGridCardProps) {
  const isLarge = size === 'L'

  const styles = useMemo(
    () => ({
      background: color ? `${color}15` : undefined,
      text: color || undefined,
    }),
    [color]
  )

  return (
    <m.div
      variants={fadeInUp}
      transition={{ duration: DURATION.DEFAULT, ease: EASE, delay }}
      whileHover={hoverLift}
      whileTap={tapScale}
      className={cn('h-full w-full', isLarge ? 'md:col-span-2' : 'col-span-1', className)}
    >
      <Card
        className={cn(
          'group relative flex h-full flex-col overflow-hidden rounded-[2rem] border transition-all duration-500',
          // Colors & Borders match Figma
          'bg-[#FAFAFA] dark:bg-[#1a1a1a]',
          'border-[#0F0F0F]/5 dark:border-white/10',
          'hover:border-[#0F0F0F]/10 dark:hover:border-white/20',
          'shadow-soft hover:shadow-medium',
          'p-8 lg:p-10'
        )}
      >
        <CardHeader className="mb-6 block w-full space-y-0 p-0">
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
              'font-space font-medium tracking-tight text-[#0F0F0F] transition-colors dark:text-white',
              isLarge ? 'text-2xl lg:text-3xl' : 'text-xl lg:text-2xl'
            )}
          >
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent className="mt-auto p-0">
          <p
            className={cn(
              'text-pretty leading-relaxed text-[#0F0F0F]/60 dark:text-white/60',
              isLarge ? 'text-base lg:text-lg' : 'text-sm lg:text-base'
            )}
          >
            {description}
          </p>
        </CardContent>
      </Card>
    </m.div>
  )
}
