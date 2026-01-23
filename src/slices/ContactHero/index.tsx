"use client";
import { Bounded } from "@/components/bounded";
import { Content } from "@prismicio/client";
import { FC } from "react";
import { fadeIn, hoverLiftLarge, staggerItemFadeInUp, tapScale } from "@/lib/motion-variants";
import { Icons, type LucideIcon } from "@/lib/icons";
import { motion } from "motion/react";
import { PrismicNextLink } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";

const iconMap: Record<string, LucideIcon> = {
  Linkedin: Icons.Linkedin,
  Youtube: Icons.Youtube,
  Facebook: Icons.Facebook,
  Instagram: Icons.Instagram,
  TikTok: Icons.Music, // Using Music icon as TikTok icon (closest available in lucide-react)
};

/**
 * Props for `ContactHero`.
 */
export type ContactHeroProps = SliceComponentProps<Content.ContactHeroSlice>;

/**
 * Component for "ContactHero" Slices.
 */
const ContactHero: FC<ContactHeroProps> = ({ slice }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F3EDE7] via-[#FAFAFA] to-white dark:from-[#1a1a1a] dark:via-ink-black dark:to-[#0a0a0a] opacity-60" />

      <div className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <motion.div variants={fadeIn}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-white/10 backdrop-blur-sm rounded-full border border-ink-black/5 dark:border-white/10 shadow-soft mb-6">
              <Icons.MessageCircle className="w-4 h-4 text-steel-blue" />
              <span className="text-sm font-medium text-ink-black/70 dark:text-white/70">
                {slice.primary.tag}
              </span>
            </div>

            <h1
              id="contact-hero-title"
              className="font-['Space_Grotesk'] text-5xl sm:text-6xl lg:text-7xl xl:text-display-lg tracking-tight text-ink-black dark:text-white"
            >
              {slice.primary.heading}
            </h1>
          </motion.div>

          <motion.p
            variants={staggerItemFadeInUp}
            className="text-lg sm:text-xl lg:text-2xl text-ink-black/60 dark:text-white/60 leading-relaxed max-w-2xl mx-auto"
          >
            {slice.primary.description}
          </motion.p>

          {/* Social Links Section */}
          <motion.div
            variants={fadeIn}
            className="pt-8"
          >
            <motion.p
              variants={fadeIn}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-base text-ink-black/60 dark:text-white/60 mb-6"
            >
              {slice.primary.socials_heading}
            </motion.p>

            <motion.div
              variants={fadeIn}
              initial="initial"
              animate="animate"
              className="flex flex-wrap items-center justify-center gap-4"
            >
              {slice.primary.socials.map(({ social_link, icon }, index) => {
                const iconName = icon;
                const Icon = iconName ? iconMap[iconName] : null;

                if (!Icon || !social_link) {
                  return null;
                }

                return (
                  <motion.div
                    whileHover={hoverLiftLarge}
                    whileTap={tapScale}
                    key={index}
                  >
                    <PrismicNextLink
                      field={social_link}
                      aria-label="Social media link"
                      className="group w-14 h-14 bg-white/80 dark:bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-steel-blue dark:hover:bg-steel-blue border border-ink-black/5 dark:border-white/10 transition-all duration-300 shadow-soft hover:shadow-medium"
                    >
                      <Icon className="w-6 h-6 text-ink-black dark:text-white group-hover:text-white transition-colors duration-300" />
                    </PrismicNextLink>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </Bounded>
  );
};

export default ContactHero;
