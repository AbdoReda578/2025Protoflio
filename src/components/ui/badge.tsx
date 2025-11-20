import { type HTMLAttributes } from "react"
import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-all hover:scale-105",
  {
    variants: {
      variant: {
        default: "bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/30 hover:bg-accent-cyan/30 hover:glow-cyan",
        secondary: "bg-accent-purple/20 text-accent-purple border border-accent-purple/30 hover:bg-accent-purple/30 hover:glow-purple",
        outline: "border border-text-muted text-text-muted hover:border-accent-cyan hover:text-accent-cyan",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }