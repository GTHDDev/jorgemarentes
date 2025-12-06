"use client";

import { Menu, X } from "lucide-react";
import { motion } from "motion/react";
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
    <motion.button
      onClick={onToggle}
      className="p-2 text-[#0F0F0F] dark:text-white"
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle menu"
      aria-expanded={isOpen}
    >
      {isOpen ? <X size={24} /> : <Menu size={24} />}
    </motion.button>
  );
});

