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
          "bg-blue border-blue text-white hover:bg-transparent hover:text-deepblue hover:dark:text-white",
        outline:
          "border text-gray-400 border-gray-400 hover:text-white hover:border-white transition",
        small:
          "font-bold border-green-mint bg-green-mint text-green hover:bg-white hover:text-green-mint",
      },
      size: {
        default: "px-6 py-4 border-4",
        sm: "py-3 px-6",
        lg: "rounded-md px-8 py-3",
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
      <>
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
      </>
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
