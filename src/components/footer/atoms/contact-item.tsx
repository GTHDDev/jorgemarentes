"use client";

import { memo } from "react";
import { type LucideIcon } from "@/lib/icons";

interface ContactItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export const ContactItem = memo(function ContactItem({
  icon: Icon,
  label,
  value,

}: ContactItemProps) {
  const content = (
    <>
      <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors duration-300">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <span className="block text-sm text-white/50 mb-1">{label}</span>
        <p className="text-white/80">{value}</p>
      </div>
    </>
  );

  const baseClasses = "flex items-start gap-4 text-white/70 hover:text-white transition-colors duration-300 group";


  return <div className={baseClasses}>{content}</div>;
});

