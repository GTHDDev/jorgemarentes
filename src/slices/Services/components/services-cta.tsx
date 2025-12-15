"use client";

import { FC, memo } from "react";
import * as m from "motion/react-m";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fadeInUp, transitionDefaults } from "@/lib/motion-variants";

interface ServicesCTAProps {
  buttonText: string | null;
  link?: string;
}

const ServicesCTA: FC<ServicesCTAProps> = ({ buttonText, link = "#contacto" }) => {
  return (
    <m.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      transition={{ ...transitionDefaults, delay: 0.5 }}
      className="text-center mt-16"
    >
      <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
        <a
          href={link}
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
            "rounded-full px-8 py-4 h-auto text-base font-medium shadow-medium hover:shadow-strong transition-all duration-300 bg-[#0F0F0F] dark:bg-white text-white dark:text-[#0F0F0F]"
          )}
        >
          {buttonText}
          <ArrowRight className="w-5 h-5" />
        </a>
      </m.div>
    </m.div>
  );
};

export default memo(ServicesCTA);
