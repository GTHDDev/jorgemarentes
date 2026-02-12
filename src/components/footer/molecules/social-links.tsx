'use client'

import { Icons, type LucideIcon } from '@/lib/icons'
import { Content } from '@prismicio/client'
import { SocialIcon } from '../atoms/social-icon'

interface SocialLinksProps {
  socialMedia: Content.SettingsDocumentData['social_media']
}

const iconMap: Record<string, LucideIcon> = {
  Linkedin: Icons.Linkedin,
  Youtube: Icons.Youtube,
  Facebook: Icons.Facebook,
  Instagram: Icons.Instagram,
  TikTok: Icons.Music,
}

export function SocialLinks({ socialMedia }: SocialLinksProps) {
  if (socialMedia.length === 0) return null

  return (
    <div className="flex items-center gap-3">
      {socialMedia.map((social, index) => {
        const Icon = social.icon ? iconMap[social.icon] : null
        if (!Icon || !social.link) return null

        return (
          <SocialIcon
            key={index}
            icon={Icon}
            field={social.link}
            label={social.icon || undefined}
          />
        )
      })}
    </div>
  )
}
