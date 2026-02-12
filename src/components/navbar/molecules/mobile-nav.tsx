'use client'

import { m } from 'framer-motion'
import { Content } from '@prismicio/client'
import { NavLink } from '../atoms/nav-link'
import { Button } from '@/components/ui/button'
import { DURATION, EASE } from '@/lib/motion-variants'
import Link from 'next/link'

interface MobileNavProps {
  navigation: Content.SettingsDocumentData['navigation']
  onClose: () => void
}

// Variantes locales para el menú (o podrías importar expandVertical)
const menuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: { duration: DURATION.DEFAULT, ease: EASE },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: DURATION.FAST, ease: EASE },
  },
}

export function MobileNav({ navigation, onClose }: MobileNavProps) {
  return (
    <m.div
      variants={menuVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="border-ink-black/5 mt-2 overflow-hidden border-t lg:hidden dark:border-white/5"
    >
      <div className="flex flex-col gap-2 py-6">
        {navigation.map((item, i) => (
          <NavLink
            key={i}
            label={item.label || ''}
            href={item.link}
            onClick={onClose}
            className="hover:bg-ink-black/5 block rounded-xl px-4 py-3 text-lg font-medium dark:hover:bg-white/5"
          />
        ))}

        <div className="mt-4 px-4">
          <Button asChild variant="primary" className="w-full justify-center" onClick={onClose}>
            <Link href="/contact">Agendar Cita</Link>
          </Button>
        </div>
      </div>
    </m.div>
  )
}
