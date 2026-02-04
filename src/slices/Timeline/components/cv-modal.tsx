'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence } from 'framer-motion'
import * as m from 'motion/react-m'
import { Icons } from '@/lib/icons'
import { scaleIn, fadeIn, DURATION, EASE } from '@/lib/motion-variants'
import { KeyTextField } from '@prismicio/client'

export interface CvModalProps {
  isOpen: boolean
  onClose: () => void
  title: KeyTextField
  year: KeyTextField
  institution: KeyTextField
  description: KeyTextField
}

export default function CvModal({
  isOpen,
  onClose,
  title,
  year,
  institution,
  description,
}: CvModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  // Lock Scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  if (!mounted) return null

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
            className="bg-ink-black/60 fixed inset-0 z-[9999] backdrop-blur-sm dark:bg-black/80"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div className="pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <m.div
              variants={scaleIn}
              initial="initial"
              animate="animate"
              exit={{ opacity: 0, scale: 0.95, transition: { duration: DURATION.FAST } }}
              transition={{ duration: DURATION.DEFAULT, ease: EASE }}
              className="shadow-strong pointer-events-auto relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-[2.5rem] bg-white dark:bg-[#1a1a1a]"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              {/* Close Button */}
              <div className="absolute right-6 top-6 z-10">
                <button
                  onClick={onClose}
                  className="bg-ink-black/5 hover:bg-ink-black/10 flex h-10 w-10 items-center justify-center rounded-full transition-colors dark:bg-white/10 dark:hover:bg-white/20"
                  aria-label="Cerrar modal"
                >
                  <Icons.X className="text-ink-black h-5 w-5 dark:text-white" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto p-8 lg:p-12">
                <div className="bg-steel-blue/10 text-steel-blue mb-6 inline-block rounded-full px-4 py-1.5 text-sm font-bold">
                  {year}
                </div>

                <h2
                  id="modal-title"
                  className="font-space text-ink-black mb-2 text-balance text-3xl tracking-tight lg:text-4xl dark:text-white"
                >
                  {title}
                </h2>

                <div className="text-ink-black/60 mb-8 text-xl font-medium dark:text-white/60">
                  {institution}
                </div>

                <div className="prose prose-lg dark:prose-invert text-ink-black/80 max-w-none text-pretty leading-relaxed dark:text-white/80">
                  <p>{description}</p>
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
