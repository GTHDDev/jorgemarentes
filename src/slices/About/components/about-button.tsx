"use client";

import { FC } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { PrismicNextLink } from "@prismicio/next";
import { Button } from "@/components/ui/button";
import { Content } from "@prismicio/client";

interface AboutButtonProps {
  button: string;
  buttonLink: Content.AboutSliceDefaultPrimary["button_link"];
}

/**
 * Button component with animations.
 * Client Component - requires framer motion for animations.
 */
const AboutButton: FC<AboutButtonProps> = ({ button, buttonLink }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-block"
    >
      <PrismicNextLink field={buttonLink}>
        <Button variant="default" size="lg">
          {button}
          <ArrowRight className="w-5 h-5" />
        </Button>
      </PrismicNextLink>
    </motion.div>
  );
};

export default AboutButton;

