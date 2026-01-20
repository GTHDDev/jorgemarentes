import { memo } from "react";
import { Content } from "@prismicio/client";
import { FooterSectionTitle } from "../atoms/footer-section-title";
import { FooterLink } from "../atoms/footer-link";

interface ServicesSectionProps {
  services: Content.SettingsDocumentData["services"];
}

export const ServicesSection = memo(function ServicesSection({
  services,
}: ServicesSectionProps) {
  if (services.length === 0) {
    return null;
  }

  return (
    <div>
      <FooterSectionTitle title="Servicios" />
      <ul className="space-y-3">
        {services.map(({ service }, index) => (
          <li key={service || index}>
            <FooterLink label={service || ""} href="#servicios" />
          </li>
        ))}
      </ul>
    </div>
  );
});

