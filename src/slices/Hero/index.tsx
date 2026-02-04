import { FC, Suspense } from 'react'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import {
  HeroBadge,
  HeroHeading,
  HeroDescription,
  HeroLinks,
  HeroStats,
  ScrollIndicator,
  HeroImage,
  AboutHeroHighlights,
  ContactSocials,
} from './components'
import { Skeleton } from '@/components/ui/skeleton'
import { Bounded } from '@/components/bounded'
import { isFilled } from '@prismicio/client'
import { ContactLayout } from './components/contact-layout'
import { Icons } from '@/lib/icons'

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>

/**
 * Component for "Hero" Slices.
 * Server Component - optimized for Next.js SSR with lazy loading and caching.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  return (
    <>
      {slice.variation === 'default' && (
        <Bounded
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          className="bg-pearl-white dark:bg-ink-black"
        >
          {/* Background Gradient */}
          <div className="from-soft-beige via-pearl-white dark:via-ink-black pointer-events-none absolute inset-0 bg-gradient-to-br to-white opacity-60 dark:from-[#1a1a1a] dark:to-[#0a0a0a]" />

          <div className="relative grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left Column - Text Content */}
            <div className="max-w-2xl space-y-8 lg:space-y-10">
              <div className="space-y-4">
                {isFilled.keyText(slice.primary.specialization) && (
                  <HeroBadge variant="default" showDot={true} centered={false}>
                    {slice.primary.specialization}
                  </HeroBadge>
                )}
              </div>

              {isFilled.keyText(slice.primary.heading) && (
                <HeroHeading size="large" align="left" subtitle={slice.primary.subheading}>
                  {slice.primary.heading}
                </HeroHeading>
              )}
              {isFilled.keyText(slice.primary.introduction) && (
                <HeroDescription align="left" className="max-w-xl">
                  {slice.primary.introduction}
                </HeroDescription>
              )}

              {/* Links section */}
              {isFilled.keyText(slice.primary.schedule_button) &&
                isFilled.keyText(slice.primary.link_button) &&
                isFilled.link(slice.primary.schedule_link) &&
                isFilled.link(slice.primary.link) && (
                  <HeroLinks
                    scheduleLink={slice.primary.schedule_link}
                    scheduleButton={slice.primary.schedule_button}
                    link={slice.primary.link}
                    linkButton={slice.primary.link_button}
                  />
                )}

              {/* Stats */}
              {isFilled.group(slice.primary.stats) && <HeroStats stats={slice.primary.stats} />}
            </div>

            {/* Right Column - Hero Image */}
            <Suspense
              fallback={
                <Skeleton className="shadow-strong bg-pearl-white relative aspect-[4/5] overflow-hidden rounded-[2.5rem] dark:bg-[#1a1a1a]" />
              }
            >
              {isFilled.image(slice.primary.image) && <HeroImage image={slice.primary.image} />}
            </Suspense>
          </div>

          {/* Scroll Indicator */}
          <ScrollIndicator />
        </Bounded>
      )}

      {slice.variation === 'about' && (
        <Bounded
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          className="bg-pearl-white dark:bg-ink-black relative overflow-hidden"
        >
          {/* Background Gradient */}
          <div className="from-soft-beige via-pearl-white dark:via-ink-black pointer-events-none absolute inset-0 bg-gradient-to-br to-white opacity-60 dark:from-[#1a1a1a] dark:to-[#0a0a0a]" />

          <div className="relative grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="order-2 flex justify-center lg:order-1 lg:justify-start">
              <Suspense
                fallback={
                  <Skeleton className="shadow-strong bg-pearl-white relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2.5rem] dark:bg-[#1a1a1a]" />
                }
              >
                {isFilled.image(slice.primary.profile_picture) && (
                  <HeroImage
                    image={slice.primary.profile_picture}
                    className="mx-auto max-w-md lg:mx-0"
                  />
                )}
              </Suspense>
            </div>

            {/* Right Column - Text Content */}
            <div className="order-1 space-y-8 lg:order-2">
              <div className="space-y-6">
                {isFilled.keyText(slice.primary.badge) && (
                  <HeroBadge variant="secondary" centered={false}>
                    {slice.primary.badge}
                  </HeroBadge>
                )}

                {isFilled.keyText(slice.primary.name) && (
                  <HeroHeading size="default" align="left">
                    {slice.primary.name}
                  </HeroHeading>
                )}
              </div>

              {isFilled.keyText(slice.primary.description) && (
                <HeroDescription align="left" className="text-ink-black/80 dark:text-white/80">
                  {slice.primary.description}
                </HeroDescription>
              )}

              {isFilled.group(slice.primary.highlights) && (
                <AboutHeroHighlights highlights={slice.primary.highlights} />
              )}
            </div>
          </div>
        </Bounded>
      )}

      {slice.variation === 'contact' && (
        <Bounded
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          className="bg-pearl-white dark:bg-ink-black"
        >
          {/* Background Gradient */}
          <div className="dark:via-ink-black pointer-events-none absolute inset-0 bg-gradient-to-br from-[#F3EDE7] via-[#FAFAFA] to-white opacity-60 dark:from-[#1a1a1a] dark:to-[#0a0a0a]" />

          <div className="relative mx-auto w-full max-w-4xl px-6 sm:px-8 lg:px-12">
            {/* Use Client Wrapper for animations */}
            <ContactLayout>
              {/* Animated Badge */}
              {isFilled.keyText(slice.primary.badge) && (
                <HeroBadge
                  variant="default"
                  centered={true}
                  icon={<Icons.MessageCircle className="text-steel-blue h-4 w-4" />}
                  className="border-ink-black/5 text-ink-black [&_svg]:text-steel-blue border bg-white/80 pl-3 pr-4 backdrop-blur-sm dark:border-white/10 dark:bg-white/10 dark:text-white"
                >
                  {slice.primary.badge}
                </HeroBadge>
              )}

              {isFilled.keyText(slice.primary.heading) && (
                <HeroHeading size="default" align="center">
                  {slice.primary.heading}
                </HeroHeading>
              )}

              {isFilled.keyText(slice.primary.description) && (
                <HeroDescription align="center" className="max-w-2xl">
                  {slice.primary.description}
                </HeroDescription>
              )}

              {isFilled.keyText(slice.primary.heading) && isFilled.group(slice.primary.socials) && (
                <ContactSocials
                  heading={slice.primary.social_heading}
                  socials={slice.primary.socials}
                />
              )}
            </ContactLayout>
          </div>
        </Bounded>
      )}
    </>
  )
}

export default Hero
