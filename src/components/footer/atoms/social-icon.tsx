'use client'

import * as m from 'motion/react-m'
import { type LucideIcon } from '@/lib/icons'
import { PrismicNextLink } from '@prismicio/next'
import { LinkField } from '@prismicio/client'
import { hoverLift, tapScale } from '@/lib/motion-variants'

interface SocialIconProps {
  icon: LucideIcon
  field: LinkField
  label?: string
}

export function SocialIcon({ icon: Icon, field, label }: SocialIconProps) {
  return (
    <m.div whileHover={hoverLift} whileTap={tapScale}>
      <PrismicNextLink
        field={field}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-white/5 transition-colors duration-300 hover:border-white/20 hover:bg-white/10"
        aria-label={label || 'Social media link'}
      >
        <Icon className="h-5 w-5 text-white/70" />
      </PrismicNextLink>
    </m.div>
  )
}
