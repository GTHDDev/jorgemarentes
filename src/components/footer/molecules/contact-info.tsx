"use client";

import { memo } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, LucideIcon } from "lucide-react";
import { Content } from "@prismicio/client";
import { ContactItem } from "../atoms/contact-item";

interface ContactInfoProps {
  contacts: Content.SettingsDocumentData["contact"];
}

// Map Prismic icon names to Lucide icons
const iconMap: Record<string, LucideIcon> = {
  Phone,
  Mail,
  MapPin,
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

      return {
        icon: Icon,
        label: contactType || "Contact",
        value: contactValue,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  if (contactItems.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
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
    </motion.div>
  );
});

