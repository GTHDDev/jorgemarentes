"use client";

import { FC, memo } from "react";
import * as m from "motion/react-m";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { fadeInUp } from "@/lib/motion-variants";

interface ServiceCardProps {
  title: string;
  description: string;
  Icon?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color?: string;
  index: number;
}

const ServiceCard: FC<ServiceCardProps> = ({ title, description, Icon, color, index }) => {
  return (
    <m.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.01 }}
      className="h-full"
    >
      <Card
        className={cn(
          "group relative h-full bg-[#FAFAFA] dark:bg-[#1a1a1a] rounded-[2rem] border-0",
          "border border-[#0F0F0F]/5 dark:border-white/10 hover:border-[#0F0F0F]/10 dark:hover:border-white/20",
          "shadow-soft hover:shadow-medium transition-all duration-500 cursor-pointer overflow-hidden",
          "p-8 lg:p-10 flex flex-col gap-0"
        )}
      >
        <CardHeader className="p-0 space-y-0 mb-6 block">
          {/* Icon */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110"
            style={{
              backgroundColor: color ? `${color}15` : undefined,
            }}
          >
            {Icon && (
              <Icon
                className="w-8 h-8 transition-transform duration-500 group-hover:rotate-6"
                style={{ color }}
              />
            )}
          </div>
          <CardTitle className="font-['Space_Grotesk'] text-2xl lg:text-3xl text-[#0F0F0F] dark:text-white tracking-tight">
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <p className="text-base lg:text-lg text-[#0F0F0F]/60 dark:text-white/60 leading-relaxed">
            {description}
          </p>
        </CardContent>

        {/* Hover Gradient */}
        <div
          className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none"
          style={{
            background: color
              ? `linear-gradient(135deg, ${color} 0%, transparent 100%)`
              : undefined,
          }}
        />
      </Card>
    </m.div>
  );
};

export default memo(ServiceCard);
