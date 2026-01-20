"use client";

import { FC, useState, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { Content } from "@prismicio/client";
import TimelineList from "./timeline-list";

// Lazy load modal - only loads when a timeline item is clicked
const CvModalLazy = dynamic(
  () => import("./cv-modal"),
  {
    ssr: false,
  }
);

interface TimelineWrapperProps {
  timeline: Content.TimelineSliceDefaultPrimaryTimelineItem[];
}

/**
 * Timeline wrapper component for state management.
 * Client Component - manages modal state and interactions.
 */
const TimelineWrapper: FC<TimelineWrapperProps> = ({ timeline }) => {
  const [selectedItem, setSelectedItem] = useState<Content.TimelineSliceDefaultPrimaryTimelineItem | null>(null);

  const handleItemClick = useCallback((item: Content.TimelineSliceDefaultPrimaryTimelineItem) => {
    setSelectedItem(item);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedItem(null);
  }, []);

  const isModalOpen = useMemo(() => !!selectedItem, [selectedItem]);

  return (
    <>
      <TimelineList timeline={timeline} onItemClick={handleItemClick} />

      {/* Modal - Only renders when selectedItem exists */}
      {selectedItem && (
        <CvModalLazy
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={selectedItem.title || ""}
          year={selectedItem.year || ""}
          institution={selectedItem.institution || ""}
          description={selectedItem.description || ""}
        />
      )}
    </>
  );
};

export default TimelineWrapper;
