'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import * as m from 'motion/react-m'
import { Icons } from '@/lib/icons'
import { tapScale } from '@/lib/motion-variants'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="h-10 w-10" />

  const isDark = theme === 'dark'

  return (
    <m.button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      whileTap={tapScale}
      className="bg-ink-black/5 hover:bg-ink-black/10 relative flex h-10 w-10 items-center justify-center rounded-full transition-colors dark:bg-white/10 dark:hover:bg-white/20"
      aria-label="Cambiar tema"
    >
      <div className="relative h-5 w-5">
        <m.div
          initial={false}
          animate={{ rotate: isDark ? 90 : 0, scale: isDark ? 0 : 1 }}
          className="absolute inset-0"
        >
          <Icons.Sun className="text-ink-black h-5 w-5" />
        </m.div>
        <m.div
          initial={false}
          animate={{ rotate: isDark ? 0 : -90, scale: isDark ? 1 : 0 }}
          className="absolute inset-0"
        >
          <Icons.Moon className="h-5 w-5 text-white" />
        </m.div>
      </div>
    </m.button>
  )
}
