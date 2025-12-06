"use client";

import { useState, useEffect, memo } from "react";
import { motion } from "motion/react";
import { Content } from "@prismicio/client";
import { Logo } from "./atoms/logo";
import { DesktopNav } from "./molecules/desktop-nav";
import { MobileNav } from "./molecules/mobile-nav";
import { MobileNavHeader } from "./molecules/mobile-nav-header";

interface NavbarProps {
  settings: Content.SettingsDocument;
}

export const Navbar = memo(function Navbar({ settings }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? "bg-white/80 dark:bg-[#0F0F0F]/80 backdrop-blur-xl border-b border-black/5 dark:border-white/10"
        : "bg-transparent"
        }`}
    >
      <nav className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-4 lg:py-6">
        <div className="flex items-center justify-between">
          <Logo websiteName={settings.data.website_name || "Website"} />

          <DesktopNav navigation={settings.data.navigation} />

          <MobileNavHeader
            isMenuOpen={isMobileMenuOpen}
            onToggleMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>

        <MobileNav
          isOpen={isMobileMenuOpen}
          navigation={settings.data.navigation}
          onClose={handleCloseMobileMenu}
        />
      </nav>
    </motion.nav>
  );
});

