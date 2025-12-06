"use client";

import { memo } from "react";
import { Content } from "@prismicio/client";
import { NavLink } from "../atoms/nav-link";
import { CTAButton } from "../atoms/cta-button";
import { ThemeToggle } from "../atoms/theme-toggle";

interface DesktopNavProps {
  navigation: Content.SettingsDocumentData["navigation"];
}

export const DesktopNav = memo(function DesktopNav({ navigation }: DesktopNavProps) {
  const getHref = (label: string | null | undefined) => {
    if (!label) return "#";
    return label.startsWith("#") ? label : `#${label.toLowerCase().replace(/\s+/g, "-")}`;
  };

  return (
    <div className="hidden lg:flex items-center gap-2">
      {navigation.map((link) => (
        <NavLink
          key={link.label}
          label={link.label || ""}
          href={getHref(link.label)}
        />
      ))}

      {/* Theme Toggle */}
      <div className="ml-2 mr-2">
        <ThemeToggle />
      </div>

      <CTAButton href="#contact" label="Agendar una sesión" className="ml-2" />
    </div>
  );
});

