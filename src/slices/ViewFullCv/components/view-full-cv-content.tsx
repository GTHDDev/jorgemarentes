'use client'

import * as m from 'motion/react-m'
import { Content } from '@prismicio/client'
import { PrismicNextLink } from '@prismicio/next'
import { Icons } from '@/lib/icons'
import { Button } from '@/components/ui/button'
import { fadeInUpDeep, hoverLift, tapScale, DURATION, EASE } from '@/lib/motion-variants'

interface ViewFullCvContentProps {
  slice: Content.ViewFullCvSlice
}

export default function ViewFullCvContent({ slice }: ViewFullCvContentProps) {
  return (
    <m.div
      variants={fadeInUpDeep}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: DURATION.DEFAULT, ease: EASE }}
      className="mx-auto max-w-4xl"
    >
      <div className="from-steel-blue to-deep-sage shadow-strong relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br p-12 lg:p-16">
        {/* Background Pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute right-10 top-10 h-40 w-40 rounded-full border-2 border-white" />
          <div className="absolute bottom-10 left-10 h-60 w-60 rounded-full border-2 border-white" />
        </div>

        <div className="relative z-10 space-y-8 text-center">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/20 shadow-sm backdrop-blur-sm">
            <Icons.FileText className="h-10 w-10 text-white" aria-hidden="true" />
          </div>

          <h2 className="font-space text-balance text-3xl tracking-tight text-white sm:text-4xl lg:text-5xl">
            {slice.primary.heading}
          </h2>

          <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-white/90 lg:text-xl">
            {slice.primary.description}
          </p>

          <m.div whileHover={hoverLift} whileTap={tapScale} className="pt-2">
            <Button
              asChild
              size="lg"
              className="text-steel-blue h-auto rounded-full border-0 bg-white px-8 py-6 text-base shadow-lg hover:bg-white/90 hover:shadow-xl"
            >
              <PrismicNextLink
                field={slice.primary.download_button}
                target="_blank"
                aria-label="Descargar curriculum vitae en PDF"
              >
                <Icons.Download className="mr-2 h-5 w-5" aria-hidden="true" />
                {slice.primary.button_text || 'Descargar CV'}
              </PrismicNextLink>
            </Button>
          </m.div>
        </div>
      </div>
    </m.div>
  )
}
