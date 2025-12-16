"use client";

import { memo } from "react";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import { Content } from "@prismicio/client";
import { NavLink } from "../atoms/nav-link";
import { CTAButton } from "../atoms/cta-button";
import { getHref } from "../utils";
import { expandVertical } from "@/lib/motion-variants";

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
          variants={expandVertical}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="lg:hidden overflow-hidden"
        >
          <div className="mt-4 pt-4 pb-6 space-y-2 bg-transparent backdrop-blur-2xl rounded-2xl">
            {navigation.map((link, index) => (
              <NavLink
                key={link.label}
                label={link.label || ""}
                href={getHref(link.label)}
                onClick={onClose}
                className="block mx-4 px-4 py-3 text-base font-medium text-ink-black/70 dark:text-white/70 hover:text-ink-black dark:hover:text-white hover:bg-soft-beige dark:hover:bg-white/5 rounded-full transition-colors"
                delay={index * 0.1}
              />
            ))}
            <CTAButton
              href="#contact"
              label="Agendar una sesión"
              onClick={onClose}
              className="block mx-4 mt-4 px-6 py-3 bg-steel-blue text-white text-center rounded-full text-base font-medium"
              delay={navigation.length * 0.1}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

