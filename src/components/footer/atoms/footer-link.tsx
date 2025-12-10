"use client";

import { memo } from "react";
import { PrismicNextLink } from "@prismicio/next";
import { LinkField } from "@prismicio/client";

interface FooterLinkProps {
  label: string;
  href?: string;
  field?: LinkField;
}

export const FooterLink = memo(function FooterLink({
  label,
  href,
  field,
}: FooterLinkProps) {
  const baseClasses =
    "text-sm text-white/60 hover:text-white transition-colors duration-300";

  if (field) {
    return (
      <PrismicNextLink field={field} className={baseClasses}>
        {label}
      </PrismicNextLink>
    );
  }

  const getHref = () => {
    if (href) return href;
    if (label.startsWith("#")) return label;
    return `#${label.toLowerCase().replace(/\s+/g, "-")}`;
  };

  return (
    <a href={getHref()} className={baseClasses}>
      {label}
    </a>
  );
});

