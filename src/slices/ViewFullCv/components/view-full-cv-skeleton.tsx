import { Skeleton } from "@/components/ui/skeleton";

/**
 * Skeleton fallback for ViewFullCv while the main content loads.
 * Matches the card layout for a smooth loading experience.
 */
export function ViewFullCvSkeleton() {
  return (
    <section
      className="relative py-16 lg:py-24 bg-white dark:bg-[#0a0a0a]"
      aria-busy="true"
      aria-label="Loading curriculum section"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#4A6FA5]/20 to-[#3B5F52]/20 dark:from-[#4A6FA5]/10 dark:to-[#3B5F52]/10 rounded-[2.5rem] p-12 lg:p-16 relative overflow-hidden">
            {/* Decorative circles placeholder */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
              <div className="absolute top-10 right-10 w-40 h-40 border-2 border-[#4A6FA5]/30 rounded-full" />
              <div className="absolute bottom-10 left-10 w-60 h-60 border-2 border-[#3B5F52]/30 rounded-full" />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-6 text-center">
              <Skeleton
                className="w-20 h-20 rounded-full bg-white/30 dark:bg-white/10"
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
                className="h-12 w-48 rounded-full mt-2 bg-white/30 dark:bg-white/10"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
