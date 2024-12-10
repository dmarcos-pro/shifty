import * as React from "react"

import { cn } from "@lib/utils"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg p-10 border border-white bg-white hover:border-blue-500 dark:border-gray-700 dark:bg-gray-700 hover:dark:border-gray-300 shadow-xl",
      className,
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    // className={cn("", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("table mx-auto font-bold text-blue-800 dark:text-blue-300", className)} {...props} />
))
CardTitle.displayName = "CardTitle"

const CardTag = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "p-6 rounded border border-blue-100 dark:bg-gray-700",
      className,
    )}
    {...props}
  />
))
CardTag.displayName = "CardTag"

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("mt-2 px-5", className)} {...props} />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
))
CardFooter.displayName = "CardFooter"

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTag,
  CardTitle,
}
