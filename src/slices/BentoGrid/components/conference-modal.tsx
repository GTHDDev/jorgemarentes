'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence } from 'framer-motion'
import * as m from 'motion/react-m'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import { Content, isFilled } from '@prismicio/client'
import { Icons } from '@/lib/icons'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { scaleIn, fadeIn, DURATION, EASE } from '@/lib/motion-variants'

interface ConferenceModalProps {
  isOpen: boolean
  onClose: () => void
  item: Content.BentoGridSliceDefaultPrimaryConferencesItem | null
  onPrevious: () => void
  onNext: () => void
  hasPrevious: boolean
  hasNext: boolean
}

export function ConferenceModal({
  isOpen,
  onClose,
  item,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
}: ConferenceModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  // Keyboard Navigation & Lock Scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          if (hasPrevious) onPrevious()
          break
        case 'ArrowRight':
          if (hasNext) onNext()
          break
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose, onPrevious, onNext, hasPrevious, hasNext])

  if (!mounted || !item) return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <m.div
            variants={fadeIn}
            initial="initial"
            animate="animate"
            exit="exit"
            className="bg-ink-black/90 fixed inset-0 z-[9999] backdrop-blur-md dark:bg-black/95"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Layout */}
          <div className="pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <m.div
              variants={scaleIn}
              initial="initial"
              animate="animate"
              exit={{ opacity: 0, scale: 0.95, transition: { duration: DURATION.FAST } }}
              transition={{ duration: DURATION.DEFAULT, ease: EASE }}
              className="pointer-events-auto relative w-full max-w-6xl"
              role="dialog"
              aria-modal="true"
            >
              {/* Close Button (Floating) */}
              <button
                onClick={onClose}
                className="absolute -top-14 right-0 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 lg:-right-14"
                aria-label="Cerrar"
              >
                <Icons.X className="h-6 w-6" />
              </button>

              {/* Navigation Arrows (Floating Side) */}
              {hasPrevious && (
                <button
                  onClick={onPrevious}
                  className="absolute left-0 top-1/2 z-50 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 lg:-left-20 lg:flex"
                  aria-label="Anterior"
                >
                  <Icons.ChevronLeft className="h-8 w-8" />
                </button>
              )}
              {hasNext && (
                <button
                  onClick={onNext}
                  className="absolute right-0 top-1/2 z-50 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 lg:-right-20 lg:flex"
                  aria-label="Siguiente"
                >
                  <Icons.ChevronRight className="h-8 w-8" />
                </button>
              )}

              {/* Card Container */}
              <div className="shadow-strong flex max-h-[85vh] flex-col overflow-hidden rounded-[2.5rem] bg-white lg:h-[600px] lg:flex-row dark:bg-[#1a1a1a]">
                {/* Media Column */}
                <div className="bg-ink-black relative h-64 w-full shrink-0 lg:h-full lg:w-3/5">
                  <PrismicNextImage
                    field={item.conference_image}
                    className="h-full w-full object-cover"
                    fallbackAlt=""
                  />
                  {/* Overlay Gradient on Image */}
                  <div className="from-ink-black/60 absolute inset-0 bg-gradient-to-t to-transparent lg:bg-gradient-to-r" />
                </div>

                {/* Content Column */}
                <div className="flex w-full flex-col overflow-y-auto p-8 lg:w-2/5 lg:p-12">
                  {item.tag && (
                    <div className="mb-6">
                      <Badge
                        variant="highlight"
                        className="bg-steel-blue border-transparent text-white"
                      >
                        {item.tag}
                      </Badge>
                    </div>
                  )}

                  <h2 className="font-space text-ink-black mb-6 text-balance text-3xl leading-tight tracking-tight lg:text-4xl dark:text-white">
                    {item.title}
                  </h2>

                  {/* Meta Data */}
                  <div className="border-ink-black/10 mb-8 flex flex-col gap-3 border-b pb-8 dark:border-white/10">
                    <div className="text-ink-black/70 flex items-center gap-3 dark:text-white/70">
                      <Icons.Calendar className="text-steel-blue h-5 w-5" />
                      <span className="font-medium">{item.date}</span>
                    </div>
                    <div className="text-ink-black/70 flex items-center gap-3 dark:text-white/70">
                      <Icons.MapPin className="text-steel-blue h-5 w-5" />
                      <span className="font-medium">{item.location}</span>
                    </div>
                  </div>

                  <div className="prose dark:prose-invert text-ink-black/80 mb-8 flex-grow leading-relaxed dark:text-white/80">
                    <p>{item.description}</p>
                  </div>

                  {/* Action Button */}
                  {isFilled.link(item.conference_link) && (
                    <div className="mt-auto pt-4">
                      <Button asChild size="lg" className="shadow-medium group w-full rounded-full">
                        <PrismicNextLink field={item.conference_link}>
                          Ver Detalles del Evento
                          <Icons.ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </PrismicNextLink>
                      </Button>
                    </div>
                  )}

                  {/* Mobile Navigation Controls (Bottom) */}
                  <div className="border-ink-black/5 mt-6 flex justify-between border-t pt-4 lg:hidden dark:border-white/5">
                    <Button
                      variant="ghost"
                      onClick={onPrevious}
                      disabled={!hasPrevious}
                      className="text-ink-black/60 text-sm dark:text-white/60"
                    >
                      <Icons.ChevronLeft className="mr-1 h-4 w-4" /> Anterior
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={onNext}
                      disabled={!hasNext}
                      className="text-ink-black/60 text-sm dark:text-white/60"
                    >
                      Siguiente <Icons.ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}
