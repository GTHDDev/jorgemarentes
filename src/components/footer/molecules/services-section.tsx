import { Content } from '@prismicio/client'
import { FooterSectionTitle } from '../atoms/footer-section-title'
import { FooterLink } from '../atoms/footer-link'

interface ServicesSectionProps {
  services: Content.SettingsDocumentData['services']
}

export function ServicesSection({ services }: ServicesSectionProps) {
  if (services.length === 0) return null

  return (
    <div>
      <FooterSectionTitle title="Servicios" />
      <ul className="space-y-4">
        {services.map(({ service }, index) => (
          <li key={index}>
            <FooterLink label={service || ''} />
          </li>
        ))}
      </ul>
    </div>
  )
}
