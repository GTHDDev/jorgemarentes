'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { HTMLMotionProps } from 'framer-motion'
import * as m from 'motion/react-m'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 outline-none',
  {
    variants: {
      variant: {
        primary:
          'bg-ink-black text-white dark:bg-white dark:text-ink-black hover:shadow-strong shadow-medium hover:bg-deep-sage dark:hover:bg-soft-beige',
        accent: 'bg-steel-blue text-white hover:bg-deep-sage shadow-medium hover:shadow-strong',
        outline:
          'bg-white dark:bg-white/10 border-2 border-ink-black/10 dark:border-white/20 text-ink-black dark:text-white hover:bg-soft-beige dark:hover:bg-white/20',
        icon: 'bg-ink-black dark:bg-white/20 backdrop-blur-sm text-white hover:bg-ink-black/80 dark:hover:bg-white/30',
        ghost: 'bg-white/20 backdrop-blur-sm text-white',
      },
      size: {
        default: 'px-8 py-4 text-base',
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
        icon: 'w-10 h-10 lg:w-12 lg:h-12 p-0',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
)

// Definimos las props de forma que si es asChild, no obligue a las props de Motion
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  // Añadimos props de motion opcionales para cuando NO es asChild
  whileHover?: HTMLMotionProps<'button'>['whileHover']
  whileTap?: HTMLMotionProps<'button'>['whileTap']
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, asChild = false, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, fullWidth, className }))}
          ref={ref}
          {...props}
        />
      )
    }

    return (
      <m.button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        {...(props as HTMLMotionProps<'button'>)}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
