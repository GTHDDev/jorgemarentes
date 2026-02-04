'use client'

import { ReactNode } from 'react'
import * as m from 'motion/react-m'
import { PrismicNextLink } from '@prismicio/next'
import { Content } from '@prismicio/client'
import { Button } from '@/components/ui/button'
import { fadeInUp, DURATION, EASE } from '@/lib/motion-variants'
import { ChevronRightIcon } from '@radix-ui/react-icons'

interface HeroLinkProps {
  href: Content.HeroSliceDefaultPrimary['link'] | Content.HeroSliceDefaultPrimary['schedule_link']
  children: ReactNode
  variant?: 'primary' | 'outline'
  icon?: ReactNode
  delay?: number
}

function HeroLink({ href, children, variant = 'outline', icon, delay = 0.5 }: HeroLinkProps) {
  return (
    <m.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      transition={{
        duration: DURATION.DEFAULT,
        ease: EASE,
        delay,
      }}
    >
      <Button variant={variant === 'primary' ? 'accent' : 'outline'} size="lg" asChild>
        <PrismicNextLink field={href}>
          {icon}
          {children}
          {variant === 'primary' && (
            <ChevronRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          )}
        </PrismicNextLink>
      </Button>
    </m.div>
  )
}

export default HeroLink
