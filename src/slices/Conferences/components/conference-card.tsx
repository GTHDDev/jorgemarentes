"use client";

import { FC } from "react";
import * as m from "motion/react-m";
import { Calendar, MapPin, Play } from "lucide-react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { Content } from "@prismicio/client";
import TagBadge from "@/components/tag-badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { hoverExpand, tapScale } from "@/lib/motion-variants";

interface ConferenceCardProps {
  conference: Content.ConferencesSliceDefaultPrimaryConferencesItem;
  index: number;
  isActive: boolean;
}

/**
 * Individual conference card component.
 * Client Component - requires interactivity for play button and animations.
 * Optimized with LazyMotion (m component).
 */
const ConferenceCard: FC<ConferenceCardProps> = ({
  conference,
  index,
  isActive,
}) => {
  const handlePlayClick = () => {
    // Handle play button click if needed
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handlePlayClick();
    }
  };

  return (
    <div
      className="min-w-full"
      aria-hidden={!isActive}
      role="group"
      aria-roledescription="slide"
      aria-label={`Conference ${index + 1}`}
    >
      <Card className="grid lg:grid-cols-2 gap-0 h-full bg-white dark:bg-[#1a1a1a] shadow-strong rounded-[2.5rem] overflow-hidden border-none p-0">
        {/* Image Side */}
        <div className="relative aspect-[4/3] lg:aspect-auto">
          <PrismicNextImage
            field={conference.image}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-black/40 via-transparent to-transparent" />

          {/* Play Button Overlay */}
          <m.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            whileHover={hoverExpand}
            whileTap={tapScale}
          >
            <Button
              variant="play"
              size="play"
              onClick={handlePlayClick}
              onKeyDown={handleKeyDown}
              aria-label={`Play video for ${conference.title}`}
              tabIndex={isActive ? 0 : -1}
              className="flex items-center justify-center"
            >
              <Play className="w-8 h-8 ml-1" fill="currentColor" aria-hidden="true" />
            </Button>
          </m.div>

          {/* Type Badge */}
          <TagBadge
            variant="type"
            size="md"
            className="absolute top-6 left-6"
          >
            {conference.type}
          </TagBadge>
        </div>

        {/* Content Side */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <h3 className="font-['Space_Grotesk'] text-3xl lg:text-4xl text-ink-black dark:text-white mb-6 tracking-tight">
            {conference.title}
          </h3>

          <div className="space-y-3 mb-8">
            <div className="flex items-start gap-3 text-ink-black/70 dark:text-white/70">
              <MapPin
                className="w-5 h-5 mt-0.5 flex-shrink-0 text-steel-blue"
                aria-hidden="true"
              />
              <div>
                <div className="font-medium text-ink-black dark:text-white mb-1">
                  {conference.event}
                </div>
                <div className="text-sm">{conference.location}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-ink-black/70 dark:text-white/70">
              <Calendar
                className="w-5 h-5 flex-shrink-0 text-steel-blue"
                aria-hidden="true"
              />
              <span>{conference.date}</span>
            </div>
          </div>

          <m.div
            whileHover={hoverExpand}
            whileTap={tapScale}
            className="self-start"
          >
            <PrismicNextLink field={conference.conference_link}>
              <Button
                variant="default"
                aria-label={`View event: ${conference.title}`}
                tabIndex={isActive ? 0 : -1}
              >
                <Play className="w-4 h-4" aria-hidden="true" />
                Ver Evento
              </Button>
            </PrismicNextLink>
          </m.div>
        </div>
      </Card>
    </div>
  );
};

export default ConferenceCard;

