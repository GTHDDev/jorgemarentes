'use client'

import * as m from 'motion/react-m'
import { Icons, type LucideIcon } from '@/lib/icons'
import { Content } from '@prismicio/client'
import { ContactItem } from '../atoms/contact-item'
import { fadeInUp, DURATION, EASE } from '@/lib/motion-variants'

interface ContactInfoProps {
  contacts: Content.SettingsDocumentData['contact']
}

const iconMap: Record<string, LucideIcon> = {
  Phone: Icons.Phone,
  Mail: Icons.Mail,
  MapPin: Icons.MapPin,
}

export function ContactInfo({ contacts }: ContactInfoProps) {
  return (
    <m.div
      variants={fadeInUp}
      transition={{ duration: DURATION.DEFAULT, ease: EASE, delay: 0.1 }}
      className="space-y-8"
    >
      <div className="space-y-6">
        {contacts.map((contact, index) => {
          const Icon = contact.icon ? iconMap[contact.icon] : null
          if (!contact.contact || !Icon) return null

          return (
            <ContactItem
              key={index}
              icon={Icon}
              label={contact.type || 'Contacto'}
              value={contact.contact}
            />
          )
        })}
      </div>
    </m.div>
  )
}
