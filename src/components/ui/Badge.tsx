import { type HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "brand";

const variantMap: Record<BadgeVariant, string> = {
  default: "bg-white/[0.06] text-ink-200 border-white/10",
  success: "bg-success/10 text-success border-success/30",
  warning: "bg-warning/10 text-warning border-warning/30",
  danger: "bg-danger/10 text-danger border-danger/30",
  brand: "bg-brand-gradient-soft text-cyan-300 border-brand-blue/30",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ variant = "default", className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        variantMap[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
