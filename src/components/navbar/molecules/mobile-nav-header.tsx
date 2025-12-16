"use client";

import { memo } from "react";
import { ThemeToggle } from "../atoms/theme-toggle";
import { MobileMenuButton } from "./mobile-menu-button";

interface MobileNavHeaderProps {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
}

export const MobileNavHeader = memo(function MobileNavHeader({
  isMenuOpen,
  onToggleMenu,
}: MobileNavHeaderProps) {
  return (
    <div className="flex lg:hidden items-center gap-3">
      <ThemeToggle />
      <MobileMenuButton isOpen={isMenuOpen} onToggle={onToggleMenu} />
    </div>
  );
});

