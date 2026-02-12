'use client'

import { useState, useEffect, useCallback } from 'react'
import * as m from 'motion/react-m'
import { Content } from '@prismicio/client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import ConferenceCard from './conference-card'
import { fadeInUpDeep, DURATION, EASE } from '@/lib/motion-variants'
import { cn } from '@/lib/utils'

interface ConferenceCarouselProps {
  conferences: Content.ConferencesSliceDefaultPrimaryConferencesItem[]
}

export default function ConferenceCarousel({ conferences }: ConferenceCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return

    // Unified function to update status
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap())
    }

    // 1. Synchronize immediately upon mounting
    onSelect()

    // 2. Listen for key events (select = slide change, reInit = resized/loaded)
    api.on('select', onSelect)
    api.on('reInit', onSelect)

    // 3. CLEANUP
    return () => {
      api.off('select', onSelect)
      api.off('reInit', onSelect)
    }
  }, [api])

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index)
    },
    [api]
  )

  if (!conferences.length) return null

  return (
    <m.div
      variants={fadeInUpDeep}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: DURATION.DEFAULT, ease: EASE }}
      className="relative mx-auto w-full max-w-5xl"
    >
      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {conferences.map((conference, index) => (
            <CarouselItem key={index} className="basis-full">
              <div className="h-full p-1">
                <ConferenceCard conference={conference} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="mt-8 flex items-center justify-center gap-4 lg:mt-12">
          <CarouselPrevious
            className="border-ink-black/10 hover:text-steel-blue static h-12 w-12 translate-y-0 hover:bg-white dark:border-white/10 dark:hover:bg-white/10"
            variant="outline"
          />

          {/* Indicadores (Dots) */}
          <div className="flex items-center gap-3 px-4">
            {conferences.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                data-active={index === current}
                className={cn(
                  'focus:ring-steel-blue h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2',
                  index === current
                    ? 'bg-steel-blue w-8' // Active state
                    : 'bg-ink-black/20 hover:bg-ink-black/40 w-2 dark:bg-white/20' // Inactive state
                )}
                aria-label={`Ir a conferencia ${index + 1}`}
                aria-current={index === current}
              />
            ))}
          </div>

          <CarouselNext
            className="border-ink-black/10 hover:text-steel-blue static h-12 w-12 translate-y-0 hover:bg-white dark:border-white/10 dark:hover:bg-white/10"
            variant="outline"
          />
        </div>
      </Carousel>
    </m.div>
  )
}
