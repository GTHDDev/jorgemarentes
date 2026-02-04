'use client'

import { FC } from 'react'
import * as m from 'motion/react-m'
import { type LucideIcon } from '@/lib/icons'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { fadeInUpDeep, DURATION, EASE } from '@/lib/motion-variants'
import { ColorField, KeyTextField } from '@prismicio/client'

interface TimelineItemProps {
  year: KeyTextField
  title: KeyTextField
  institution: KeyTextField
  description: KeyTextField
  icon?: LucideIcon | null
  color?: ColorField
  index: number
  isLast: boolean
}

const TimelineItem: FC<TimelineItemProps> = ({
  year,
  title,
  institution,
  description,
  icon: Icon,
  color,
  index,
  isLast,
}) => {
  const safeColor = color ?? '#4A6FA5'

  return (
    <m.div
      variants={fadeInUpDeep}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: DURATION.DEFAULT, delay: 0.3 + index * 0.15, ease: EASE }}
      className="relative"
    >
      {!isLast && (
        <div
          className="from-ink-black/10 absolute bottom-0 left-6 top-16 w-0.5 bg-gradient-to-b to-transparent dark:from-white/10"
          style={{ height: 'calc(100% + 2rem)' }}
          aria-hidden="true"
        />
      )}

      <Card className="bg-pearl-white border-ink-black/5 hover:border-ink-black/10 shadow-soft hover:shadow-medium group relative overflow-hidden rounded-[2rem] border transition-all duration-500 dark:border-white/10 dark:bg-[#1a1a1a] dark:hover:border-white/20">
        <CardHeader className="block space-y-2 p-6 pb-0 lg:p-8">
          {Icon && (
            <div
              className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110"
              style={{
                backgroundColor: `${safeColor}26`,
              }}
            >
              <Icon className="h-6 w-6" style={{ color: safeColor }} aria-hidden="true" />
            </div>
          )}

          <div
            className="mb-1 inline-block rounded-full px-3 py-1 text-xs font-medium"
            style={{
              backgroundColor: `${safeColor}26`,
              color: safeColor,
            }}
          >
            {year}
          </div>

          <CardTitle className="font-space text-ink-black mb-1 text-xl tracking-tight lg:text-2xl dark:text-white">
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 pt-0 lg:p-8 lg:pt-2">
          <div className="text-ink-black/70 mb-3 text-base font-medium dark:text-white/70">
            {institution}
          </div>

          <p className="text-ink-black/60 text-sm leading-relaxed lg:text-base dark:text-white/60">
            {description}
          </p>
        </CardContent>
      </Card>
    </m.div>
  )
}

export default TimelineItem
