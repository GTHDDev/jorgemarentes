"use client";

import { FC, useRef } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Brain, Users, Heart, Sparkles } from "lucide-react";
import { motion, useInView } from "motion/react";
import { ArrowRightIcon } from "@radix-ui/react-icons";

/**
 * Props for `Services`.
 */
export type ServicesProps = SliceComponentProps<Content.ServicesSlice>;

/**
 * Component for "Services" Slices.
 */
const Services: FC<ServicesProps> = ({ slice }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const icons: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
    Brain,
    Users,
    Heart,
    Sparkles,
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative py-24 lg:py-32 bg-white dark:bg-[#0a0a0a] overflow-hidden"
      ref={ref}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F3EDE7] dark:bg-white/5 rounded-full mb-6">
            <span className="text-sm font-medium text-ink-black/70 dark:text-white/70">
              {slice.primary.tag}
            </span>
          </div>
          <h2 className="font-['Space_Grotesk'] text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#0F0F0F] dark:text-white mb-6">
            {slice.primary.heading}
          </h2>
          <p className="text-lg lg:text-xl text-[#0F0F0F]/60 dark:text-white/60 leading-relaxed">
            {slice.primary.description}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
          {slice.primary.services.map((service, index) => {
            const iconName = service.icon;
            const Icon = iconName ? icons[iconName] : null;
            const color = service.color || undefined;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.01 }}
                className="group relative bg-[#FAFAFA] dark:bg-[#1a1a1a] rounded-[2rem] p-8 lg:p-10 border border-[#0F0F0F]/5 dark:border-white/10 hover:border-[#0F0F0F]/10 dark:hover:border-white/20 transition-all duration-500 shadow-soft hover:shadow-medium cursor-pointer"
              >
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
                {/* Content */}
                <h3 className="font-['Space_Grotesk'] text-2xl lg:text-3xl text-[#0F0F0F] dark:text-white mb-4 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-base lg:text-lg text-[#0F0F0F]/60 dark:text-white/60 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Hover Gradient */}
                <div
                  className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: color
                      ? `linear-gradient(135deg, ${color} 0%, transparent 100%)`
                      : undefined,
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#0F0F0F] dark:bg-white text-white dark:text-[#0F0F0F] rounded-full font-medium shadow-medium hover:shadow-strong transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {slice.primary.services_button}
            <ArrowRightIcon className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
