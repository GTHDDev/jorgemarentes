"use client";

import { FC, memo } from "react";
import { Content } from "@prismicio/client";
import { Icons } from "@/lib/icons";
import ServiceCard from "./service-card";

interface ServicesGridProps {
  services: Content.ServicesSlice["primary"]["services"];
}

const icons: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Brain: Icons.Brain,
  Users: Icons.Users,
  Heart: Icons.Heart,
  Sparkles: Icons.Sparkles,
};

const ServicesGrid: FC<ServicesGridProps> = ({ services }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
      {services.map((service, index) => {
        const iconName = service.icon;
        // @ts-ignore - Indexing with string from CMS
        const Icon = iconName ? icons[iconName] : undefined;
        const color = service.color || undefined;

        return (
          <ServiceCard
            key={index}
            index={index}
            title={service.title || ""}
            description={service.description || ""}
            Icon={Icon}
            color={color}
          />
        );
      })}
    </div>
  );
};

export default memo(ServicesGrid);
