'use client'

import * as m from 'motion/react-m'
import { Content } from '@prismicio/client'
import { Icons } from '@/lib/icons'
import { staggerContainer } from '@/lib/motion-variants'
import ServiceCard from '@/components/ui/service-card'

interface ServicesGridProps {
  services: Content.ServicesSlice['primary']['services']
}

const ICON_MAP: Record<
  string,
  React.ComponentType<{ className?: string; style?: React.CSSProperties }>
> = {
  Brain: Icons.Brain,
  Users: Icons.Users,
  Heart: Icons.Heart,
  Sparkles: Icons.Sparkles,
}

export default function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <m.div
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-100px' }}
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 lg:gap-8"
    >
      {services.map((service, index) => {
        const iconName = service.icon || 'Sparkles'
        const IconComponent = ICON_MAP[iconName] || Icons.Sparkles

        return (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
            icon={IconComponent}
            color={service.color}
            size="large"
          />
        )
      })}
    </m.div>
  )
}
