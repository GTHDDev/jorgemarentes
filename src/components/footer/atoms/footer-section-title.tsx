import { memo } from "react";

interface FooterSectionTitleProps {
  title: string;
}

export const FooterSectionTitle = memo(function FooterSectionTitle({
  title,
}: FooterSectionTitleProps) {
  return <h4 className="font-medium text-white mb-4">{title}</h4>;
});

