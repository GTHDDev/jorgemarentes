'use client'

import * as m from 'motion/react-m'
import { PrismicNextImage } from '@prismicio/next'
import { Content } from '@prismicio/client'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { fadeInUp, hoverLift, tapScale, DURATION, EASE } from '@/lib/motion-variants'
import { Icons } from '@/lib/icons'

interface ConferenceGridCardProps {
  item: Content.BentoGridSliceDefaultPrimaryConferencesItem
  onClick: () => void
  index: number
}

export function ConferenceGridCard({ item, onClick, index }: ConferenceGridCardProps) {
  const isLarge = item.size === 'L'

  return (
    <m.div
      layout
      variants={fadeInUp}
      transition={{ duration: DURATION.DEFAULT, ease: EASE, delay: index * 0.05 }}
      whileHover={hoverLift}
      whileTap={tapScale}
      className={cn(
        'group relative h-full min-h-[300px] w-full cursor-pointer',
        isLarge ? 'md:col-span-2 md:row-span-2' : 'col-span-1'
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
      aria-label={`Ver detalles de ${item.title}`}
    >
      <Card className="bg-ink-black shadow-soft hover:shadow-medium relative h-full w-full overflow-hidden rounded-[2rem] border-0">
        {/* Background Image */}
        <div className="absolute inset-0 h-full w-full">
          <PrismicNextImage
            field={item.conference_image}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            sizes={isLarge ? '(max-width: 768px) 100vw, 800px' : '(max-width: 768px) 100vw, 400px'}
            fallbackAlt=""
            loading="lazy"
            quality={80}
          />

          {/* Gradient Overlay (Darker at bottom) */}
          <div className="from-ink-black/90 via-ink-black/40 absolute inset-0 bg-gradient-to-t to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90" />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
          {/* Top Tag & Action */}
          <div className="absolute left-6 right-6 top-6 flex items-start justify-between">
            {item.tag && (
              <Badge variant="highlight" className="bg-steel-blue border-transparent text-white">
                {item.tag}
              </Badge>
            )}

            {item.conference_link && (
              <div className="flex h-10 w-10 translate-y-2 transform items-center justify-center rounded-full bg-white/20 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <Icons.ExternalLink className="h-5 w-5 text-white" />
              </div>
            )}
          </div>

          {/* Text Content */}
          <div className="space-y-3">
            <h3
              className={cn(
                'font-space font-medium leading-tight tracking-tight text-white',
                isLarge ? 'text-2xl lg:text-3xl' : 'text-xl lg:text-2xl'
              )}
            >
              {item.title}
            </h3>

            <p className="line-clamp-2 text-pretty text-sm leading-relaxed text-white/80">
              {item.description}
            </p>

            {/* Meta Info Footer */}
            <div className="mt-2 flex items-center gap-4 border-t border-white/10 pt-3 text-xs font-medium text-white/70">
              <div className="flex items-center gap-1.5">
                <Icons.Calendar className="h-3.5 w-3.5" />
                <span>{item.date}</span>
              </div>
              <div className="hidden h-1 w-1 rounded-full bg-white/30 sm:block" />
              <div className="flex items-center gap-1.5">
                <Icons.MapPin className="h-3.5 w-3.5" />
                <span className="max-w-[150px] truncate">{item.location}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </m.div>
  )
}
