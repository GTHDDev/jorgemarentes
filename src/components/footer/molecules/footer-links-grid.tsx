'use client'

import { m } from 'framer-motion'
import { Content } from '@prismicio/client'
import { ServicesSection } from './services-section'
import { NavigationSection } from './navigation-section'
import { fadeInUp, DURATION, EASE } from '@/lib/motion-variants'

interface FooterLinksGridProps {
  services: Content.SettingsDocumentData['services']
  navigation: Content.SettingsDocumentData['navigation']
}

export function FooterLinksGrid({ services, navigation }: FooterLinksGridProps) {
  const hasContent = services.length > 0 || navigation.length > 0
  if (!hasContent) return null

  return (
    <m.div
      variants={fadeInUp}
      transition={{ duration: DURATION.DEFAULT, ease: EASE, delay: 0.2 }}
      className="grid grid-cols-2 gap-8 border-t border-white/10 py-12 lg:gap-12"
    >
      <ServicesSection services={services} />
      <NavigationSection navigation={navigation} />
    </m.div>
  )
}
