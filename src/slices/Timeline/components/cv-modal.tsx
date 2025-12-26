"use client";

import { FC, useEffect, useCallback, memo } from "react";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { Icons } from "@/lib/icons";
import { modalBackdrop, modalContent, modalTransition } from "@/lib/motion-variants";

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  year: string;
  institution: string;
  description: string;
}

/**
 * CV Modal component with animations and accessibility.
 * Client Component - requires interactivity and animations.
 * Optimized with LazyMotion (m component).
 */
const CvModal: FC<CvModalProps> = ({
  isOpen,
  onClose,
  title,
  year,
  institution,
  description,
}) => {
  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Focus trap - focus on modal when opened
  useEffect(() => {
    if (isOpen) {
      const focusableElements = document.querySelectorAll(
        '[data-modal="cv-modal"] button, [data-modal="cv-modal"] a, [data-modal="cv-modal"] [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      firstElement?.focus();
    }
  }, [isOpen]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  const handleCloseClick = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleCloseClick();
      }
    },
    [handleCloseClick]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <m.div
            variants={modalBackdrop}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={modalTransition}
            className="fixed inset-0 bg-[#0F0F0F]/60 dark:bg-black/80 backdrop-blur-sm z-50"
            onClick={handleBackdropClick}
            aria-hidden="true"
            style={{ willChange: "opacity" }}
          />

          {/* Modal */}
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <m.div
              variants={modalContent}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={modalTransition}
              className="relative w-full max-w-4xl bg-white dark:bg-[#1a1a1a] rounded-[2.5rem] shadow-strong overflow-hidden pointer-events-auto"
              data-modal="cv-modal"
              style={{ willChange: "opacity, transform" }}
            >
              {/* Close Button */}
              <button
                onClick={handleCloseClick}
                onKeyDown={handleKeyDown}
                className="absolute top-6 right-6 z-10 w-12 h-12 bg-[#0F0F0F] dark:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#0F0F0F]/80 dark:hover:bg-white/30 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#4A6FA5] focus:ring-offset-2"
                aria-label="Close modal"
                tabIndex={0}
              >
                <Icons.X className="w-6 h-6 text-white" aria-hidden="true" />
              </button>

              <div className="max-h-[85vh] overflow-y-auto">
                {/* Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center max-w-2xl mx-auto">
                  <div className="inline-block px-4 py-2 bg-[#4A6FA5]/10 text-[#4A6FA5] text-sm font-medium rounded-full mb-4 w-fit">
                    {year}
                  </div>

                  <h2
                    id="modal-title"
                    className="font-['Space_Grotesk'] text-3xl lg:text-4xl text-[#0F0F0F] dark:text-white mb-4 tracking-tight"
                  >
                    {title}
                  </h2>

                  <div className="text-lg font-medium text-[#0F0F0F]/70 dark:text-white/70 mb-6">
                    {institution}
                  </div>

                  <p className="text-base lg:text-lg text-[#0F0F0F]/60 dark:text-white/60 leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            </m.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default memo(CvModal);
