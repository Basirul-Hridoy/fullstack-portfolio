import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva("group relative inline-flex items-center justify-center overflow-hidden rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50", {
  variants: {
    variant: {
      default: "bg-accent text-white shadow-[0_10px_35px_rgba(0,132,255,.18)] hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(0,132,255,.28)]",
      outline: "border border-accent/50 bg-white/[0.02] text-white hover:-translate-y-0.5 hover:bg-accent/10 hover:border-accent",
      secondary: "border border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08]",
      ghost: "text-muted hover:text-white",
    },
    size: {
      default: "px-6 py-3 text-sm",
      sm: "px-4 py-2 text-xs",
      lg: "px-7 py-3.5 text-sm",
      icon: "h-9 w-9",
    },
  },
  defaultVariants: { variant: "default", size: "default" },
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => (
  <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
));
Button.displayName = "Button";
export { Button, buttonVariants };
