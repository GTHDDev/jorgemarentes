'use client'

import { ThemeToggle } from '../atoms/theme-toggle'
import { MobileMenuButton } from './mobile-menu-button'

interface MobileNavHeaderProps {
  isMenuOpen: boolean
  onToggleMenu: () => void
}

export function MobileNavHeader({ isMenuOpen, onToggleMenu }: MobileNavHeaderProps) {
  return (
    <div className="flex items-center gap-3 lg:hidden">
      <ThemeToggle />
      <MobileMenuButton isOpen={isMenuOpen} onToggle={onToggleMenu} />
    </div>
  )
}
