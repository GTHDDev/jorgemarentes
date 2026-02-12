'use client'

import * as m from 'motion/react-m'
import { Icons } from '@/lib/icons'
import { tapScale } from '@/lib/motion-variants'

interface MobileMenuButtonProps {
  isOpen: boolean
  onToggle: () => void
}

export function MobileMenuButton({ isOpen, onToggle }: MobileMenuButtonProps) {
  return (
    <m.button
      onClick={onToggle}
      whileTap={tapScale}
      className="text-ink-black -mr-2 p-2 dark:text-white"
      aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
    >
      {isOpen ? <Icons.X className="h-6 w-6" /> : <Icons.Menu className="h-6 w-6" />}
    </m.button>
  )
}
