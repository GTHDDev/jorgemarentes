import { Content } from "@prismicio/client";

export const getHref = (label: string | null | undefined) => {
  if (!label) return "#";
  return label.startsWith("#") ? label : `#${label.toLowerCase().replace(/\s+/g, "-")}`;
};
