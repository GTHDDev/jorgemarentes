'use client'

import { PrismicNextLink } from '@prismicio/next'
import { LinkField } from '@prismicio/client'
import { cn } from '@/lib/utils'

interface FooterLinkProps {
  label: string
  field?: LinkField
  className?: string
}

export function FooterLink({ label, field, className }: FooterLinkProps) {
  const baseClasses = cn(
    'text-base text-white/60 hover:text-white transition-colors duration-300 block w-fit',
    className
  )

  if (field) {
    return (
      <PrismicNextLink field={field} className={baseClasses}>
        {label}
      </PrismicNextLink>
    )
  }

  return <p className={cn(baseClasses, 'cursor-default hover:text-white/60')}>{label}</p>
}
