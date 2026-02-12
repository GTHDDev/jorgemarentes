'use client'

import { Icons } from '@/lib/icons'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import { Content } from '@prismicio/client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface ConferenceCardProps {
  conference: Content.ConferencesSliceDefaultPrimaryConferencesItem
}

export default function ConferenceCard({ conference }: ConferenceCardProps) {
  return (
    <Card className="shadow-strong group grid h-full gap-0 overflow-hidden rounded-[2.5rem] border-none bg-white p-0 lg:grid-cols-2 dark:bg-[#1a1a1a]">
      {/* Image Side */}
      <div className="relative aspect-[4/3] h-full min-h-[300px] lg:aspect-auto">
        <PrismicNextImage
          field={conference.image}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          quality={80}
          loading="lazy"
        />
        <div className="from-ink-black/60 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-80" />

        {/* Type Badge */}
        <div className="absolute left-6 top-6 z-10">
          <Badge variant="highlight" size="md">
            {conference.type || 'Conferencia'}
          </Badge>
        </div>
      </div>

      {/* Content Side */}
      <div className="relative flex h-full flex-col justify-center p-8 lg:p-12">
        <h3 className="font-space text-ink-black mb-6 text-balance text-2xl tracking-tight lg:text-3xl xl:text-4xl dark:text-white">
          {conference.title}
        </h3>

        <div className="mb-8 space-y-4">
          <div className="text-ink-black/70 flex items-start gap-3 dark:text-white/70">
            <Icons.MapPin className="text-steel-blue mt-1 h-5 w-5 flex-shrink-0" />
            <div>
              <div className="text-ink-black font-medium dark:text-white">{conference.event}</div>
              <div className="text-sm opacity-80">{conference.location}</div>
            </div>
          </div>

          <div className="text-ink-black/70 flex items-center gap-3 dark:text-white/70">
            <Icons.Calendar className="text-steel-blue h-5 w-5 flex-shrink-0" />
            <span className="font-medium">{conference.date}</span>
          </div>
        </div>

        <div className="mt-auto self-start">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="group-hover:bg-steel-blue group-hover:border-steel-blue rounded-full px-8 transition-all duration-300 group-hover:text-white"
          >
            <PrismicNextLink field={conference.conference_link}>
              <Icons.Play className="mr-2 h-4 w-4" />
              Ver Evento
            </PrismicNextLink>
          </Button>
        </div>
      </div>
    </Card>
  )
}
