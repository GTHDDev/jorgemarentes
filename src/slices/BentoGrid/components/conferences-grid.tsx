'use client'

import { useState, useRef } from 'react'
import * as m from 'motion/react-m'
import { Content } from '@prismicio/client'
import { staggerContainer } from '@/lib/motion-variants'
import { ConferenceGridCard } from './conference-grid-card'
import { ConferenceModal } from './conference-modal'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination'

interface ConferenceGridProps {
  items: Content.BentoGridSliceDefaultPrimary['conferences']
}

const ITEMS_PER_PAGE = 9

export function ConferenceGrid({ items }: ConferenceGridProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const visibleItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    setSelectedIndex(null)
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleItemClick = (indexInPage: number) => {
    setSelectedIndex(indexInPage)
  }

  const handleCloseModal = () => setSelectedIndex(null)

  const handleNextItem = () => {
    if (selectedIndex === null) return
    if (selectedIndex < visibleItems.length - 1) {
      setSelectedIndex(selectedIndex + 1)
    }
  }

  const handlePrevItem = () => {
    if (selectedIndex === null) return
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1)
    }
  }

  const selectedItem = selectedIndex !== null ? visibleItems[selectedIndex] : null

  if (items.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="text-ink-black/60 text-lg dark:text-white/60">
          No se encontraron conferencias disponibles.
        </p>
      </div>
    )
  }

  return (
    <div ref={gridRef} className="space-y-12">
      {/* GRID */}
      <m.div
        key={currentPage}
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
      >
        {visibleItems.map((item, index) => (
          <ConferenceGridCard
            key={`${index}-${currentPage}`}
            index={index}
            item={item}
            onClick={() => handleItemClick(index)}
          />
        ))}
      </m.div>

      {/* PAGINATION */}
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
              // Lógica simple para mostrar elipsis si hay muchas páginas
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

      {/* MODAL (Portal) */}
      <ConferenceModal
        isOpen={!!selectedItem}
        onClose={handleCloseModal}
        item={selectedItem}
        onNext={handleNextItem}
        onPrevious={handlePrevItem}
        hasNext={selectedIndex !== null && selectedIndex < visibleItems.length - 1}
        hasPrevious={selectedIndex !== null && selectedIndex > 0}
      />
    </div>
  )
}
