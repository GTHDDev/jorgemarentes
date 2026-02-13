'use client'

import { useState, useRef } from 'react'
import * as m from 'motion/react-m'
import { Content } from '@prismicio/client'
import { Icons } from '@/lib/icons'
import { staggerContainer } from '@/lib/motion-variants'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination'
import ServiceGridCard from './service-grid-card'

const ICON_MAP: Record<string, React.ElementType> = {
  Brain: Icons.Brain,
  Users: Icons.Users,
  Heart: Icons.Heart,
  Sparkles: Icons.Sparkles,
  Flower: Icons.Flower,
  Wind: Icons.Wind,
  Shield: Icons.Shield,
  Zap: Icons.Zap,
  Target: Icons.Target,
  Compass: Icons.Compass,
  Lightbulb: Icons.Lightbulb,
  Activity: Icons.Activity,
  Sun: Icons.Sun,
  Moon: Icons.Moon,
  Eye: Icons.Eye,
}

interface ServicesGridProps {
  servicesItems: Content.BentoGridSliceServicesPrimaryServicesItem[]
}

const ITEMS_PER_PAGE = 6

export function ServicesGrid({ servicesItems }: ServicesGridProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const gridRef = useRef<HTMLDivElement>(null)

  const totalPages = Math.ceil(servicesItems.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const visibleItems = servicesItems.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  if (servicesItems.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="text-ink-black/60 text-lg dark:text-white/60">
          No se encontraron servicios disponibles.
        </p>
      </div>
    )
  }

  return (
    <div ref={gridRef} className="space-y-12">
      {/* Grid */}
      <m.div
        key={currentPage}
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
      >
        {visibleItems.map((item, index) => {
          const iconName = item.icon as string
          const IconComponent = ICON_MAP[iconName] || Icons.Sparkles

          return (
            <ServiceGridCard
              key={`${index}-${currentPage}`}
              title={item.heading}
              description={item.description}
              icon={IconComponent}
              color={item.icon_color}
              tag={item.tag}
              size={item.size}
              delay={index * 0.1}
            />
          )
        })}
      </m.div>

      {/* Pagination Shadcn */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage > 1) handlePageChange(currentPage - 1)
                }}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1
              if (
                totalPages > 5 &&
                Math.abs(page - currentPage) > 1 &&
                page !== 1 &&
                page !== totalPages
              ) {
                if (Math.abs(page - currentPage) === 2)
                  return (
                    <PaginationItem key={page}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )
                return null
              }

              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === page}
                    onClick={(e) => {
                      e.preventDefault()
                      handlePageChange(page)
                    }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            })}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage < totalPages) handlePageChange(currentPage + 1)
                }}
                className={
                  currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
