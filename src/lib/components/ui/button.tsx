import { cn } from "@lib/utils"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

const buttonVariants = cva(
  "rounded-full border cursor-pointer inline-flex items-center justify-center whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "text-sm border-blue-dark bg-blue-dark text-white hover:bg-transparent hover:text-blue-dark dark:border-blue-light dark:bg-blue-light dark:text-blue-dark hover:dark:bg-transparent hover:dark:text-white",
        outline:
          "border text-gray-400 border-gray-400 hover:text-white hover:border-white transition",
      },
      size: {
        default: "px-6 py-4 border-3",
        sm: "px-3 py-2",
        lg: "rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <div>
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
      </div>
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
