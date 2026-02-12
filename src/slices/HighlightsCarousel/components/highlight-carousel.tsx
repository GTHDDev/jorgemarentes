'use client'

import * as m from 'motion/react-m'
import { Content } from '@prismicio/client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import HighlightCard from './highlight-card'
import { fadeInUpDeep, DURATION, EASE, fadeIn } from '@/lib/motion-variants'

interface HighlightCarouselProps {
  highlights: Content.HighlightsCarouselSliceDefaultPrimaryHighligthsItem[]
}

export default function HighlightCarousel({ highlights }: HighlightCarouselProps) {
  return (
    <div className="relative">
      {/* Wrapper for the full carousel entrance animation */}
      <m.div
        variants={fadeInUpDeep}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: DURATION.SLOW, ease: EASE, delay: 0.2 }}
      >
        <Carousel
          opts={{
            align: 'start',
            loop: true,
            dragFree: true,
          }}
          className="w-full"
        >
          {/* -ml-6 compensates for padding-left of items for the gap */}
          <CarouselContent className="-ml-6 py-4">
            {highlights.map((highlight, index) => (
              <CarouselItem
                key={index}
                // We define the width here using flex-basis
                // mobile: ~85% screen, md: 380px fixed
                className="basis-[85%] pl-6 sm:basis-[380px]"
              >
                <div className="h-full">
                  <HighlightCard highlight={highlight} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Controls */}
          <div className="hidden lg:block">
            <CarouselPrevious className="border-ink-black/10 left-4 bg-white/80 backdrop-blur-sm" />
            <CarouselNext className="border-ink-black/10 right-4 bg-white/80 backdrop-blur-sm" />
          </div>
        </Carousel>
      </m.div>

      {/* Instrucciones de UX */}
      <m.div
        variants={fadeIn}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: DURATION.DEFAULT, ease: EASE, delay: 0.4 }}
        className="mt-8 text-center"
      >
        <p className="text-ink-black/50 text-sm font-medium dark:text-white/50">
          Desliza para explorar los servicios
        </p>
      </m.div>

      {/* Gradient Overlays (Opcional: para suavizar bordes) */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-12 bg-gradient-to-r from-white to-transparent sm:w-24 dark:from-[#0a0a0a]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-12 bg-gradient-to-l from-white to-transparent sm:w-24 dark:from-[#0a0a0a]"
        aria-hidden="true"
      />
    </div>
  )
}
