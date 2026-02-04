'use client'

import { FC, memo, useMemo } from 'react'
import * as m from 'motion/react-m'
import { Content } from '@prismicio/client'
import { Icons } from '@/lib/icons'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { fadeInUpDeep, hoverLift, tapScale, DURATION, EASE } from '@/lib/motion-variants'
import { cn } from '@/lib/utils'

const icons: Record<
  string,
  React.ComponentType<{ className?: string; style?: React.CSSProperties }>
> = {
  Award: Icons.Award,
  BookOpen: Icons.BookOpen,
  GraduationCap: Icons.GraduationCap,
  Briefcase: Icons.Briefcase,
}

interface TimelineItemProps {
  item: Content.TimelineSliceDefaultPrimaryTimelineItem
  index: number
  isInView: boolean
  onItemClick: (item: Content.TimelineSliceDefaultPrimaryTimelineItem) => void
}

const TimelineItem: FC<TimelineItemProps> = ({ item, index, isInView, onItemClick }) => {
  const isEven = useMemo(() => index % 2 === 0, [index])
  const color = item.color || '#4A6FA5'

  const Icon = useMemo(() => {
    return icons[item.icon as keyof typeof icons] || Icons.BookOpen
  }, [item.icon])

  return (
    <m.div
      variants={fadeInUpDeep}
      initial="initial"
      animate={isInView ? 'animate' : 'initial'}
      transition={{
        duration: DURATION.SLOW,
        ease: EASE,
        delay: 0.2 + (index % 5) * 0.15,
      }}
      className={cn(
        'relative grid items-center gap-8 lg:grid-cols-2 lg:gap-16',
        !isEven && 'lg:flex-row-reverse'
      )}
    >
      {/* Timeline Dot Central */}
      <div
        className="absolute left-6 top-8 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-4 border-[#F3EDE7] shadow-sm transition-transform duration-500 hover:scale-125 lg:left-1/2 dark:border-[#0F0F0F]"
        style={{ backgroundColor: color }}
      >
        <Icon className="h-6 w-6 text-white" />
      </div>

      <div
        className={cn(
          'ml-20 lg:col-span-1 lg:ml-0',
          isEven ? 'lg:col-start-1 lg:pr-12 lg:text-right' : 'lg:col-start-2 lg:pl-12'
        )}
      >
        <m.button
          onClick={() => onItemClick(item)}
          className="group w-full cursor-pointer border-none bg-transparent p-0 text-left"
          whileHover={hoverLift}
          whileTap={tapScale}
        >
          <Card className="border-ink-black/5 hover:border-ink-black/10 shadow-soft hover:shadow-medium overflow-hidden rounded-[2rem] border bg-white py-0 transition-all duration-500 dark:border-white/10 dark:bg-[#1a1a1a] dark:hover:border-white/20">
            <CardHeader className="block space-y-0 p-8 pb-0">
              <div
                className={cn(
                  'mb-4 inline-block rounded-full px-4 py-2 text-sm font-medium',
                  isEven ? 'lg:float-right lg:ml-4' : 'lg:float-left lg:mr-4'
                )}
                style={{
                  backgroundColor: `${color}1A`,
                  color: color,
                }}
              >
                {item.year}
              </div>

              <div className="clear-both lg:hidden" />

              <CardTitle className="font-space text-ink-black group-hover:text-steel-blue mb-3 text-2xl tracking-tight transition-colors lg:text-3xl dark:text-white">
                {item.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="p-8 pt-0">
              <div className="text-ink-black/70 mb-4 font-medium dark:text-white/70">
                {item.institution}
              </div>
              <p className="text-ink-black/60 line-clamp-2 text-pretty text-sm leading-relaxed lg:text-base dark:text-white/60">
                {item.description}
              </p>

              <div className="text-steel-blue mt-4 text-sm font-medium group-hover:underline">
                Ver detalles →
              </div>
            </CardContent>
          </Card>
        </m.button>
      </div>

      <div className="hidden lg:col-span-1 lg:block" />
    </m.div>
  )
}

export default memo(TimelineItem)
