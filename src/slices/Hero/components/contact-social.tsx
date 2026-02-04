'use client'

import * as m from 'motion/react-m'
import { PrismicNextLink } from '@prismicio/next'
import { Content } from '@prismicio/client'
import { Icons, type LucideIcon } from '@/lib/icons'
import { staggerContainer, fadeInUp, hoverLift, tapScale } from '@/lib/motion-variants'

const iconMap: Record<string, LucideIcon> = {
  Linkedin: Icons.Linkedin,
  Youtube: Icons.Youtube,
  Facebook: Icons.Facebook,
  Instagram: Icons.Instagram,
  TikTok: Icons.Music,
}

interface ContactSocialsProps {
  heading: string | null
  socials: Content.HeroSliceContactPrimarySocialsItem[]
}

export default function ContactSocial({ heading, socials }: ContactSocialsProps) {
  return (
    <m.div variants={fadeInUp} className="space-y-6 pt-8">
      {heading && (
        <p className="text-ink-black/60 text-base font-medium dark:text-white/60">{heading}</p>
      )}

      <m.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        {socials.map((item, index) => {
          const iconName = item.icon
          const Icon = iconName ? iconMap[iconName] : null

          if (!Icon || !item.social_link) return null

          return (
            <m.div key={index} variants={fadeInUp} whileHover={hoverLift} whileTap={tapScale}>
              <PrismicNextLink
                field={item.social_link}
                className="hover:bg-steel-blue dark:hover:bg-steel-blue border-ink-black/5 shadow-soft hover:shadow-medium group flex h-14 w-14 items-center justify-center rounded-2xl border bg-white/80 backdrop-blur-sm transition-colors duration-300 dark:border-white/10 dark:bg-white/10"
                aria-label={`Visitar ${iconName}`}
              >
                <Icon className="text-ink-black h-6 w-6 transition-colors duration-300 group-hover:text-white dark:text-white" />
              </PrismicNextLink>
            </m.div>
          )
        })}
      </m.div>
    </m.div>
  )
}
