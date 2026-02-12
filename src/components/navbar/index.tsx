'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import * as m from 'motion/react-m'
import { Content } from '@prismicio/client'
import { Logo } from './atoms/logo'
import { DesktopNav } from './molecules/desktop-nav'
import { MobileNav } from './molecules/mobile-nav'
import { MobileNavHeader } from './molecules/mobile-nav-header'
import { slideDown, DURATION, EASE } from '@/lib/motion-variants'
import { cn } from '@/lib/utils'

interface NavbarProps {
  settings: Content.SettingsDocument
}

export function Navbar({ settings }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const shouldShowBackground = isScrolled || isMobileMenuOpen

  return (
    <m.nav
      variants={slideDown}
      initial="hidden"
      animate="visible"
      transition={{ duration: DURATION.DEFAULT, ease: EASE }}
      className={cn(
        'fixed left-0 right-0 top-0 z-50 border-b transition-all duration-300',
        shouldShowBackground
          ? 'border-ink-black/5 bg-white/90 py-3 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-[#0F0F0F]/90'
          : 'border-transparent bg-transparent py-5 lg:py-6'
      )}
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          <Logo websiteName={settings.data.website_name || 'Jorge Marentes'} />

          {/* Desktop */}
          <DesktopNav navigation={settings.data.navigation} />

          {/* Mobile: Header (Toggle + Theme) */}
          <MobileNavHeader
            isMenuOpen={isMobileMenuOpen}
            onToggleMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>

        {/* Mobile */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <MobileNav
              navigation={settings.data.navigation}
              onClose={() => setIsMobileMenuOpen(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </m.nav>
  )
}
