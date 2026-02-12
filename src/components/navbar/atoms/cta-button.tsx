'use client'

import { motion } from 'motion/react'
import { memo } from 'react'

interface CTAButtonProps {
  href: string
  label: string
  onClick?: () => void
  className?: string
  delay?: number
}

export const CTAButton = memo(function CTAButton({
  href,
  label,
  onClick,
  className = '',
  delay = 0,
}: CTAButtonProps) {
  const baseClasses =
    'px-6 py-2.5 bg-steel-blue text-white rounded-full text-sm font-medium hover:bg-deep-sage transition-all duration-300'

  const content = (
    <motion.a
      href={href}
      className={`${baseClasses} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      aria-label={label}
    >
      {label}
    </motion.a>
  )

  if (delay > 0) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay }}
      >
        {content}
      </motion.div>
    )
  }

  return content
})
