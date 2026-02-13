'use client'

import { ReactNode } from 'react'
import { m } from 'framer-motion'
import { staggerContainerSlow } from '@/lib/motion-variants'

interface ContactLayoutProps {
  children: ReactNode
}

export function ContactLayout({ children }: ContactLayoutProps) {
  return (
    <m.div
      variants={staggerContainerSlow}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-100px' }}
      className="space-y-8 text-center"
    >
      {children}
    </m.div>
  )
}
