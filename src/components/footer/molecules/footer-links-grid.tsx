"use client";

import { memo } from "react";
import * as m from "motion/react-m";
import { Content } from "@prismicio/client";
import { ServicesSection } from "./services-section";
import { NavigationSection } from "./navigation-section";
import { fadeInUp, transitionDefaults } from "@/lib/motion-variants";

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
    <m.div
      variants={fadeInUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      transition={{ ...transitionDefaults, delay: 0.2 }}
      className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12 py-12 border-t border-white/10"
    >
      {services.length > 0 && <ServicesSection services={services} />}
      {navigation.length > 0 && <NavigationSection navigation={navigation} />}
    </m.div>
  );
});

