'use client'

import { m } from 'framer-motion'
import { Content } from '@prismicio/client'
import { FooterCTA } from './molecules/footer-cta'
import { ContactInfo } from './molecules/contact-info'
import { FooterLinksGrid } from './molecules/footer-links-grid'
import { FooterBottom } from './molecules/footer-bottom'
import { staggerContainerSlow } from '@/lib/motion-variants'

interface FooterClientProps {
  settings: Content.SettingsDocument
}

export default function FooterClient({ settings }: FooterClientProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="contact" className="relative overflow-hidden bg-[#0F0F0F] text-white">
      {/* Top Accent Line */}
      <div className="from-steel-blue via-deep-sage to-mango-gold h-1 w-full bg-gradient-to-r" />

      <m.div
        variants={staggerContainerSlow}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-100px' }}
        className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12"
      >
        {/* Main Content */}
        <div className="py-16 lg:py-24">
          <div className="mb-16 grid gap-16 lg:grid-cols-2 lg:gap-24">
            <FooterCTA heading={settings.data.heading} description={settings.data.description} />
            <ContactInfo contacts={settings.data.contact} />
          </div>

          <FooterLinksGrid
            services={settings.data.services}
            navigation={settings.data.navigation}
          />
        </div>

        {/* Bottom Bar */}
        <FooterBottom
          websiteName={settings.data.website_name}
          currentYear={currentYear}
          socialMedia={settings.data.social_media}
        />
      </m.div>
    </footer>
  )
}
