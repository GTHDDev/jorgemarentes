"use client";

import { memo } from "react";
import { Icons, type LucideIcon } from "@/lib/icons";
import { Content } from "@prismicio/client";
import { SocialIcon } from "../atoms/social-icon";

interface SocialLinksProps {
  socialMedia: Content.SettingsDocumentData["social_media"];
}

const iconMap: Record<string, LucideIcon> = {
  Linkedin: Icons.Linkedin,
  Youtube: Icons.Youtube,
  Facebook: Icons.Facebook,
  Instagram: Icons.Instagram,
  TikTok: Icons.Music, // Using Music icon as TikTok icon (closest available in lucide-react)
};

export const SocialLinks = memo(function SocialLinks({
  socialMedia,
}: SocialLinksProps) {
  if (socialMedia.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-4">
      {socialMedia.map((social, index) => {
        const iconName = social.icon;
        const Icon = iconName ? iconMap[iconName] : null;

        if (!Icon || !social.link) {
          return null;
        }

        return (
          <SocialIcon
            key={index}
            icon={Icon}
            field={social.link}
            label={iconName || undefined}
          />
        );
      })}
    </div>
  );
});

