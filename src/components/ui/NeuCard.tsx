import React from "react";
import { cn } from "@/lib/utils";

export interface NeuCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "raised" | "raised-sm" | "raised-lg" | "inset" | "flat";
  interactive?: boolean;
}

export const NeuCard = React.forwardRef<HTMLDivElement, NeuCardProps>(
  (
    {
      className,
      variant = "raised",
      interactive = false,
      children,
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      raised: "bg-surface shadow-neu-raised border border-border-subtle",
      "raised-sm": "bg-surface shadow-neu-raised-sm border border-border-subtle",
      "raised-lg": "bg-surface shadow-neu-raised-lg border border-border-subtle",
      inset: "bg-surface-inset shadow-neu-inset border border-border-subtle/70",
      flat: "bg-surface border border-border-subtle shadow-sm",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl transition-all duration-200",
          variantClasses[variant],
          interactive &&
            "cursor-pointer hover:-translate-y-0.5 hover:shadow-neu-raised-lg hover:border-brand-300 active:translate-y-0 active:shadow-neu-pressed",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

NeuCard.displayName = "NeuCard";
