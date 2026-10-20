import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "demo"
    | "active"
    | "verified"
    | "prototype"
    | "info"
    | "success"
    | "warning"
    | "danger";
  size?: "sm" | "md";
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "info",
  size = "sm",
  dot = false,
  children,
  ...props
}) => {
  const variantStyles = {
    demo: "bg-amber-100/90 text-amber-900 border border-amber-300/80 shadow-sm",
    active: "bg-emerald-100/90 text-emerald-900 border border-emerald-300/80 shadow-sm",
    verified: "bg-blue-100/90 text-brand-900 border border-brand-300/80 shadow-sm",
    prototype: "bg-slate-200/90 text-slate-800 border border-slate-300/80 shadow-sm",
    info: "bg-brand-100/80 text-brand-900 border border-brand-200 shadow-sm",
    success: "bg-teal-100/80 text-teal-900 border border-teal-300/80 shadow-sm",
    warning: "bg-amber-100/80 text-amber-900 border border-amber-300/80 shadow-sm",
    danger: "bg-rose-100/80 text-rose-900 border border-rose-300/80 shadow-sm",
  };

  const dotColors = {
    demo: "bg-amber-500",
    active: "bg-emerald-500 animate-pulse",
    verified: "bg-brand-600",
    prototype: "bg-slate-500",
    info: "bg-brand-500",
    success: "bg-teal-600",
    warning: "bg-amber-500",
    danger: "bg-rose-600",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-[11px] font-semibold rounded-md gap-1.5",
    md: "px-2.5 py-1 text-xs font-semibold rounded-lg gap-2",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center tracking-wide uppercase transition-colors select-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn("w-1.5 h-1.5 rounded-full shrink-0", dotColors[variant])}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
};
