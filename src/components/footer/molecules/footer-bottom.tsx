import { SocialLinks } from './social-links'
import { Content } from '@prismicio/client'

interface FooterBottomProps {
  websiteName: string | null | undefined
  currentYear: number
  socialMedia: Content.SettingsDocumentData['social_media']
}

export function FooterBottom({ websiteName, currentYear, socialMedia }: FooterBottomProps) {
  return (
    <div className="border-t border-white/10 py-8">
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="text-sm font-medium text-white/40">
          © {currentYear} {websiteName || 'Todos los derechos reservados'}
        </div>
        <SocialLinks socialMedia={socialMedia} />
      </div>
    </div>
  )
}
