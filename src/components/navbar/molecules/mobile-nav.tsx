"use client";

import { memo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Content } from "@prismicio/client";
import { NavLink } from "../atoms/nav-link";
import { CTAButton } from "../atoms/cta-button";

interface MobileNavProps {
  isOpen: boolean;
  navigation: Content.SettingsDocumentData["navigation"];
  onClose: () => void;
}

export const MobileNav = memo(function MobileNav({
  isOpen,
  navigation,
  onClose,
}: MobileNavProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden overflow-hidden"
        >
          <div className="pt-4 pb-6 space-y-2">
            {navigation.map((link, index) => {
              const getHref = (label: string | null | undefined) => {
                if (!label) return "#";
                return label.startsWith("#") ? label : `#${label.toLowerCase().replace(/\s+/g, "-")}`;
              };

              return (
                <NavLink
                  key={link.label}
                  label={link.label || ""}
                  href={getHref(link.label)}
                  onClick={onClose}
                  className="block px-4 py-3 hover:bg-[#F3EDE7] dark:hover:bg-white/5 rounded-lg"
                  delay={index * 0.1}
                />
              );
            })}
            <CTAButton
              href="#contact"
              label="Agendar una sesión"
              onClick={onClose}
              className="block mx-4 mt-4 text-center"
              delay={navigation.length * 0.1}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

