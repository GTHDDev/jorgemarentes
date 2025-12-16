"use client";

import { memo } from "react";
import * as m from "motion/react-m";
import { Icons, type LucideIcon } from "@/lib/icons";
import { Content } from "@prismicio/client";
import { ContactItem } from "../atoms/contact-item";
import { fadeInUp, transitionDefaults } from "@/lib/motion-variants";

interface ContactInfoProps {
  contacts: Content.SettingsDocumentData["contact"];
}

// Map Prismic icon names to Lucide icons
const iconMap: Record<string, LucideIcon> = {
  Phone: Icons.Phone,
  Mail: Icons.Mail,
  MapPin: Icons.MapPin,
};

export const ContactInfo = memo(function ContactInfo({
  contacts,
}: ContactInfoProps) {
  const contactItems = contacts
    .map((contact) => {
      const contactValue = contact.contact;
      const contactType = contact.type;
      const iconName = contact.icon;

      if (!contactValue) return null;

      // Get icon from Prismic field
      const Icon = iconName ? iconMap[iconName] : null;

      if (!Icon) return null;

      return {
        icon: Icon,
        label: contactType || "Contact",
        value: contactValue,
      };
    })
    .filter((item): item is { icon: LucideIcon; label: string; value: string } => item !== null);

  if (contactItems.length === 0) {
    return null;
  }

  return (
    <m.div
      variants={fadeInUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      transition={{ ...transitionDefaults, delay: 0.1, duration: 0.6 }}
      className="space-y-6"
    >
      <h3 className="font-['Space_Grotesk'] text-2xl tracking-tight mb-6">
        Contacto
      </h3>

      <div className="space-y-4">
        {contactItems.map((item, index) => (
          <ContactItem
            key={index}
            icon={item.icon}
            label={item.label}
            value={item.value}
          />
        ))}
      </div>
    </m.div>
  );
});

