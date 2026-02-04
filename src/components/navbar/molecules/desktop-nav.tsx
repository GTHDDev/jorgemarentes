'use client'

import { Content } from '@prismicio/client'
import { NavLink } from '../atoms/nav-link'
import { ThemeToggle } from '../atoms/theme-toggle'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface DesktopNavProps {
  navigation: Content.SettingsDocumentData['navigation']
}

export function DesktopNav({ navigation }: DesktopNavProps) {
  return (
    <div className="hidden items-center gap-8 lg:flex">
      <div className="flex items-center gap-6">
        {navigation.map((item, i) => (
          <NavLink key={i} label={item.label || ''} href={item.link} />
        ))}
      </div>

      <div className="bg-ink-black/10 h-5 w-px dark:bg-white/10" aria-hidden="true" />

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Button asChild variant="primary" size="sm">
          <Link href="/contact">Agendar Cita</Link>
        </Button>
      </div>
    </div>
  )
}
