'use client'

import { useMemo } from 'react'
import { Content } from '@prismicio/client'
import { Icons } from '@/lib/icons'
import { cn } from '@/lib/utils'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

interface HighlightCardProps {
  highlight: Content.HighlightsCarouselSliceDefaultPrimaryHighligthsItem
}

const iconMap = { ...Icons }

export default function HighlightCard({ highlight }: HighlightCardProps) {
  const { title, description, icon, color } = highlight

  const Icon = useMemo(() => {
    return icon && iconMap[icon as keyof typeof Icons]
      ? iconMap[icon as keyof typeof Icons]
      : Icons.Sparkles
  }, [icon])

  const styles = useMemo(
    () => ({
      background: color ? `${color}15` : undefined,
      text: color || undefined,
    }),
    [color]
  )

  return (
    <Card
      className={cn(
        'flex h-full flex-col items-start rounded-[2rem] border-0 text-left transition-all duration-500',
        // Styles overrides para coincidir con tu diseño
        'bg-pearl-white dark:bg-[#1a1a1a]',
        'border-ink-black/5 border dark:border-white/10',
        'hover:border-ink-black/10 dark:hover:border-white/20',
        'shadow-soft hover:shadow-medium',
        // Reset Flex gap default de Shadcn
        'gap-0'
      )}
    >
      <CardHeader className="block w-full space-y-0 p-8 pb-4">
        <div
          className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-500 hover:scale-110"
          style={{ backgroundColor: styles.background }}
        >
          <Icon
            className="h-7 w-7 transition-transform duration-500 hover:rotate-6"
            style={{ color: styles.text }}
          />
        </div>

        <CardTitle className="font-space text-ink-black text-xl font-medium tracking-tight lg:text-2xl dark:text-white">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="mt-auto p-8 pt-0">
        <p className="text-ink-black/60 text-pretty text-base leading-relaxed dark:text-white/60">
          {description}
        </p>
      </CardContent>

      {/* Decorative Gradient */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 transition-opacity duration-500 hover:opacity-5"
        style={{
          background: color ? `linear-gradient(135deg, ${color} 0%, transparent 100%)` : undefined,
        }}
        aria-hidden="true"
      />
    </Card>
  )
}
