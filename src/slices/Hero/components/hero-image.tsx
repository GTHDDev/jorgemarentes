'use client'

import * as m from 'motion/react-m'
import { PrismicNextImage } from '@prismicio/next'
import { Content } from '@prismicio/client'
import { slideInRight, DURATION, EASE, HERO_DELAYS } from '@/lib/motion-variants'
import { cn } from '@/lib/utils'

interface HeroImageProps {
  image: Content.HeroSliceDefaultPrimary['image']
  className?: string
}

/**
 * HeroImage Component
 * * Performance Note:
 * The animation is managed by 'm.figure' to allow tree-shaking via LazyMotion.
 */
function HeroImage({ image, className }: HeroImageProps) {
  return (
    <m.figure
      initial="initial"
      animate="animate"
      variants={slideInRight}
      transition={{
        duration: DURATION.SLOW,
        ease: EASE,
        delay: HERO_DELAYS.image,
      }}
      className={cn('relative z-0 select-none', className)}
    >
      {/* 2. Aspect Ratio Wrapper 
        Avoid Layout Shift (CLS) by reserving the exact space before loading the image.
      */}
      <div className="shadow-strong bg-muted/20 relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem]">
        <PrismicNextImage
          field={image}
          className="h-auto w-full object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          fetchPriority="high"
          preload
          quality={85}
        />

        {/* 5. Decorative Gradient Overlay */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
          aria-hidden="true"
        />
      </div>
    </m.figure>
  )
}

export default HeroImage
