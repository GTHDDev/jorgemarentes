import { Content } from '@prismicio/client'
import { FooterSectionTitle } from '../atoms/footer-section-title'
import { FooterLink } from '../atoms/footer-link'

interface NavigationSectionProps {
  navigation: Content.SettingsDocumentData['navigation']
}

export function NavigationSection({ navigation }: NavigationSectionProps) {
  if (navigation.length === 0) return null

  return (
    <div>
      <FooterSectionTitle title="Navegación" />
      <ul className="space-y-4">
        {navigation.map(({ link, label }, index) => (
          <li key={index}>
            <FooterLink label={label || ''} field={link} />
          </li>
        ))}
      </ul>
    </div>
  )
}
