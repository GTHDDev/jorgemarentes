'use client'

import { m } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { fadeInUp, DURATION, EASE } from '@/lib/motion-variants'
import { ArrowRightIcon } from 'lucide-react'
import { PrismicNextLink } from '@prismicio/next'
import { LinkField } from '@prismicio/client'

interface ServicesCTAProps {
  buttonText: string | null
  link?: LinkField
}

export default function ServicesCTA({ buttonText, link }: ServicesCTAProps) {
  return (
    <m.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-50px' }}
      variants={fadeInUp}
      transition={{ duration: DURATION.DEFAULT, ease: EASE, delay: 0.2 }}
      className="mt-16 text-center"
    >
      <Button
        asChild
        size="lg"
        className="shadow-medium hover:shadow-strong rounded-full px-8 py-6 text-base"
      >
        <PrismicNextLink field={link}>
          {buttonText}
          <ArrowRightIcon className="ml-2 h-5 w-5" />
        </PrismicNextLink>
      </Button>
    </m.div>
  )
}
