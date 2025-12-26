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

  return (
    <div>
      <FooterSectionTitle title="Navegación" />
      <ul className="space-y-3">
        {navigation.map(({ link, label }) => (
          <li key={label}>
            <FooterLink label={label || ""} field={link} />
          </li>
        ))}
      </ul>
    </div>
  );
});

