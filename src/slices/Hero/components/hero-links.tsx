'use client'

import * as m from 'motion/react-m'
import { Content } from '@prismicio/client'
import { CalendarIcon } from '@radix-ui/react-icons'
import HeroLink from './hero-link'
import { staggerContainer, HERO_DELAYS } from '@/lib/motion-variants'

interface HeroLinksProps {
  scheduleLink: Content.HeroSliceDefaultPrimary['schedule_link']
  scheduleButton: string | null | undefined
  link: Content.HeroSliceDefaultPrimary['link']
  linkButton: string | null | undefined
}

function HeroLinks({ scheduleLink, scheduleButton, link, linkButton }: HeroLinksProps) {
  const hasSchedule = scheduleLink && scheduleButton
  const hasLink = link && linkButton

  return (
    <m.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      transition={{ delayChildren: HERO_DELAYS.actions }}
      className="flex flex-col gap-4 pt-6 sm:flex-row"
    >
      {hasSchedule && (
        <HeroLink href={scheduleLink} variant="primary" icon={<CalendarIcon className="h-5 w-5" />}>
          {scheduleButton}
        </HeroLink>
      )}

      {hasLink && (
        <HeroLink href={link} variant="outline">
          {linkButton}
        </HeroLink>
      )}
    </m.div>
  )
}

export default HeroLinks
