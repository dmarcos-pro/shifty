import { cn } from "@lib/utils"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

const buttonVariants = cva(
  "rounded-full border border-4 border-blue cursor-pointer text-sm inline-flex items-center justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-20",
  {
    variants: {
      variant: {
        default:
          "bg-blue text-white hover:bg-transparent hover:text-gray-900 hover:dark:text-gray-200 transition",
        outline:
          "hover:text-white hover:bg-blue transition",
        fullDark:
          " hover:bg-blue-900 text-white",
        outlineDark:
          "border-white text-white transition hover:bg-white hover:text-blue-950",
        outlineLight:
          "border-gray-300 dark:border-gray-400 text-gray-400 transition hover:border-blue hover:text-blue hover:dark:text-white hover:dark:border-white",
        green:
          "border-green text-green-800 hover:bg-green hover:text-white dark:text-green-400 dark:border-green-400 hover:dark:bg-green-400 hover:dark:text-green",
      },
      size: {
        default: "py-3 px-5",
        sm: "py-2 px-3 border-2",
        lg: "py-4 px-8",
        icon: "h-10 w-10 border-2",
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
