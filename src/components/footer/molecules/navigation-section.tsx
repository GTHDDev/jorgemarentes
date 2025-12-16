import { memo } from "react";
import { Content } from "@prismicio/client";
import { FooterSectionTitle } from "../atoms/footer-section-title";
import { FooterLink } from "../atoms/footer-link";

interface NavigationSectionProps {
  navigation: Content.SettingsDocumentData["navigation"];
}

export const NavigationSection = memo(function NavigationSection({
  navigation,
}: NavigationSectionProps) {
  if (navigation.length === 0) {
    return null;
  }

  const getHref = (label: string | null | undefined) => {
    if (!label) return "#";
    return label.startsWith("#") ? label : `#${label.toLowerCase().replace(/\s+/g, "-")}`;
  };

  return (
    <div>
      <FooterSectionTitle title="Navegación" />
      <ul className="space-y-3">
        {navigation.map((link) => (
          <li key={link.label}>
            <FooterLink label={link.label || ""} href={getHref(link.label)} />
          </li>
        ))}
      </ul>
    </div>
  );
});

