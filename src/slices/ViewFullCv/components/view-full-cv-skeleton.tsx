import { Skeleton } from '@/components/ui/skeleton'

/**
 * Skeleton fallback for ViewFullCv while the main content loads.
 * Matches the card layout for a smooth loading experience.
 */
export function ViewFullCvSkeleton() {
  return (
    <section
      className="relative bg-white py-16 lg:py-24 dark:bg-[#0a0a0a]"
      aria-busy="true"
      aria-label="Loading curriculum section"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="from-steel-blue/20 to-deep-sage/20 dark:from-steel-blue/10 dark:to-deep-sage/10 relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br p-12 lg:p-16">
            {/* Decorative circles placeholder */}
            <div className="pointer-events-none absolute inset-0 opacity-10" aria-hidden="true">
              <div className="border-steel-blue/30 absolute right-10 top-10 h-40 w-40 rounded-full border-2" />
              <div className="border-deep-sage/30 absolute bottom-10 left-10 h-60 w-60 rounded-full border-2" />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-6 text-center">
              <Skeleton
                className="h-20 w-20 rounded-full bg-white/30 dark:bg-white/10"
                aria-hidden="true"
              />

              <Skeleton
                className="h-10 w-3/4 max-w-md rounded-lg bg-white/30 dark:bg-white/10"
                aria-hidden="true"
              />

              <Skeleton
                className="h-6 w-full max-w-2xl rounded bg-white/20 dark:bg-white/10"
                aria-hidden="true"
              />
              <Skeleton
                className="h-6 w-5/6 max-w-2xl rounded bg-white/20 dark:bg-white/10"
                aria-hidden="true"
              />

              <Skeleton
                className="mt-2 h-12 w-48 rounded-full bg-white/30 dark:bg-white/10"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
