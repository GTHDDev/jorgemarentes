import { FooterSectionTitle } from '../atoms/footer-section-title'
import { FooterLink } from '../atoms/footer-link'

interface FooterLinksSectionProps {
  title: string
  links: Array<{ label: string; href?: string }>
}

export function FooterLinksSection({ title, links }: FooterLinksSectionProps) {
  if (links.length === 0) return null

  return (
    <div>
      <FooterSectionTitle title={title} />
      <ul className="space-y-4">
        {links.map((link, index) => (
          <li key={index}>
            <FooterLink label={link.label} />
          </li>
        ))}
      </ul>
    </div>
  )
}
