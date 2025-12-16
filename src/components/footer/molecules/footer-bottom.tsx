import { memo } from "react";
import { SocialLinks } from "./social-links";
import { Content } from "@prismicio/client";

interface FooterBottomProps {
  websiteName: string | null | undefined;
  currentYear: number;
  socialMedia: Content.SettingsDocumentData["social_media"];
}

export const FooterBottom = memo(function FooterBottom({
  websiteName,
  currentYear,
  socialMedia,
}: FooterBottomProps) {
  return (
    <div className="py-8 border-t border-white/10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Copyright */}
        <div className="text-sm text-white/50">
          © {currentYear} {websiteName || "Website"}
        </div>

        {/* Social Links */}
        <SocialLinks socialMedia={socialMedia} />
      </div>
    </div>
  );
});

