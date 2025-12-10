"use client";

import { memo } from "react";
import { motion } from "motion/react";
import { Content } from "@prismicio/client";
import { ServicesSection } from "./services-section";
import { NavigationSection } from "./navigation-section";

interface FooterLinksGridProps {
  services: Content.SettingsDocumentData["services"];
  navigation: Content.SettingsDocumentData["navigation"];
}

export const FooterLinksGrid = memo(function FooterLinksGrid({
  services,
  navigation,
}: FooterLinksGridProps) {
  const hasContent = services.length > 0 || navigation.length > 0;

  if (!hasContent) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12 py-12 border-t border-white/10"
    >
      {services.length > 0 && <ServicesSection services={services} />}
      {navigation.length > 0 && <NavigationSection navigation={navigation} />}
    </motion.div>
  );
});

