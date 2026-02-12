'use client'

import { PrismicNextLink } from '@prismicio/next'
import { LinkField } from '@prismicio/client'
import { cn } from '@/lib/utils'

interface NavLinkProps {
  label: string
  href: LinkField
  className?: string
  onClick?: () => void
}

export function NavLink({ label, href, className, onClick }: NavLinkProps) {
  return (
    <PrismicNextLink
      field={href}
      onClick={onClick}
      className={cn(
        'text-ink-black/70 hover:text-ink-black group relative text-sm font-medium transition-colors dark:text-white/70 dark:hover:text-white',
        className
      )}
    >
      {label}
      <span className="bg-steel-blue absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full" />
    </PrismicNextLink>
  )
}
