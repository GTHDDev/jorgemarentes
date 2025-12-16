"use client";

import { Icons } from "@/lib/icons";
import * as m from "motion/react-m";
import { memo } from "react";

interface MobileMenuButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const MobileMenuButton = memo(function MobileMenuButton({
  isOpen,
  onToggle,
}: MobileMenuButtonProps) {
  return (
    <m.button
      onClick={onToggle}
      className="p-2 text-[#0F0F0F] dark:text-white"
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle menu"
      aria-expanded={isOpen}
    >
      {isOpen ? <Icons.X size={24} /> : <Icons.Menu size={24} />}
    </m.button>
  );
});

