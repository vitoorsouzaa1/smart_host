import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background transform hover:scale-105 active:scale-95",
  {
    variants: {
      variant: {
        default:
          'bg-blue-600 text-white shadow-lg hover:bg-blue-700 hover:shadow-xl',
        destructive:
          'bg-red-500 text-white shadow-lg hover:bg-red-600 hover:shadow-xl',
        outline:
          'border-2 border-blue-200 bg-background hover:bg-blue-50 hover:border-blue-400 shadow-sm hover:shadow-md',
        secondary:
          'bg-gray-100 text-gray-900 hover:bg-gray-200 shadow-sm hover:shadow-md',
        ghost: 'hover:bg-blue-50 hover:text-blue-600',
        link: 'text-blue-600 underline-offset-4 hover:underline hover:text-blue-700',
        gradient:
          'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700',
      },
      size: {
        default: 'h-10 px-6 py-2',
        sm: 'h-8 rounded-md px-4 text-xs',
        lg: 'h-12 rounded-lg px-8 text-base',
        xl: 'h-14 rounded-xl px-10 text-lg',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
