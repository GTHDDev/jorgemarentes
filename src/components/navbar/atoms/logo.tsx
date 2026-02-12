'use client'

import Link from 'next/link'
import * as m from 'motion/react-m'
import { tapScale } from '@/lib/motion-variants'

interface LogoProps {
  websiteName: string
}

export function Logo({ websiteName }: LogoProps) {
  return (
    <m.div whileTap={tapScale} className="relative z-50">
      <Link
        href="/"
        className="font-space text-ink-black text-lg font-medium tracking-tight sm:text-xl dark:text-white"
        aria-label="Volver al inicio"
      >
        {websiteName}
      </Link>
    </m.div>
  )
}
