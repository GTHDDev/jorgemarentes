"use client";

import { FC } from "react";
import * as m from "motion/react-m";
import { ArrowRight } from "lucide-react";
import { PrismicNextLink } from "@prismicio/next";
import { Button } from "@/components/ui/button";
import { Content } from "@prismicio/client";
import { hoverLift, tapScale } from "@/lib/motion-variants";

interface AboutButtonProps {
  button: string;
  buttonLink: Content.AboutSliceDefaultPrimary["button_link"];
}

/**
 * Button component with animations.
 * Client Component - requires framer motion for animations.
 * Optimized with LazyMotion (m component).
 */
const AboutButton: FC<AboutButtonProps> = ({ button, buttonLink }) => {
  return (
    <m.div
      whileHover={hoverLift}
      whileTap={tapScale}
      className="inline-block"
    >
      <PrismicNextLink field={buttonLink}>
        <Button variant="default" size="lg">
          {button}
          <ArrowRight className="w-5 h-5" />
        </Button>
      </PrismicNextLink>
    </m.div>
  );
};

export default AboutButton;

