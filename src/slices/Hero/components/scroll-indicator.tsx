'use client'

import * as m from 'motion/react-m'

export default function ScrollIndicator() {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 lg:block"
    >
      <div className="border-ink-black/20 h-10 w-6 rounded-full border-2 p-1 dark:border-white/20">
        <m.div
          animate={{
            y: [0, 12, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="bg-steel-blue mx-auto h-1.5 w-1.5 rounded-full"
        />
      </div>
    </m.div>
  )
}
