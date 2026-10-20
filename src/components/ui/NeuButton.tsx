import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface NeuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "inset";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const NeuButton = React.forwardRef<HTMLButtonElement, NeuButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "px-3 py-1.5 text-xs rounded-xl min-h-[38px] gap-1.5",
      md: "px-4 py-2.5 text-sm rounded-xl min-h-[44px] gap-2",
      lg: "px-6 py-3.5 text-base rounded-2xl min-h-[48px] gap-2.5",
    };

    const variantClasses = {
      primary:
        "bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-[4px_4px_12px_rgba(36,87,167,0.35),-2px_-2px_8px_rgba(255,255,255,0.4)] border border-white/20 hover:from-brand-500 hover:to-brand-700 active:shadow-[inset_2px_2px_5px_rgba(15,40,80,0.6)]",
      secondary:
        "bg-surface text-brand-900 shadow-neu-raised-sm border border-border-subtle hover:text-brand-700 hover:shadow-neu-raised active:shadow-neu-pressed",
      danger:
        "bg-white text-state-danger border border-red-200 shadow-neu-raised-sm hover:bg-red-50/50 hover:shadow-neu-raised active:shadow-neu-pressed",
      ghost:
        "bg-transparent text-text-muted hover:text-brand-900 hover:bg-brand-100/50 border border-transparent active:bg-brand-100",
      inset:
        "bg-surface-inset text-brand-900 shadow-neu-inset border border-border-subtle/80 hover:border-brand-300",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-150 select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:opacity-50 disabled:pointer-events-none disabled:shadow-none",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

NeuButton.displayName = "NeuButton";
