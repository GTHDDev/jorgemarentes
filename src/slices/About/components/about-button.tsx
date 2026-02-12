'use client'

import * as m from 'motion/react-m'
import { PrismicNextLink } from '@prismicio/next'
import { Button } from '@/components/ui/button' // Componente global
import { Content } from '@prismicio/client'
import { fadeInUp, DURATION, EASE } from '@/lib/motion-variants'
import { ArrowRightIcon } from '@radix-ui/react-icons'

interface AboutButtonProps {
  button: string
  buttonLink: Content.AboutSliceDefaultPrimary['button_link']
}

export default function AboutButton({ button, buttonLink }: AboutButtonProps) {
  return (
    <m.div
      variants={fadeInUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      transition={{ duration: DURATION.DEFAULT, ease: EASE }}
    >
      <Button asChild size="lg" className="shadow-medium rounded-full">
        <PrismicNextLink field={buttonLink}>
          {button}
          <ArrowRightIcon className="ml-2 h-5 w-5" />
        </PrismicNextLink>
      </Button>
    </m.div>
  )
}
