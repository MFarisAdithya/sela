"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SelaMarkProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  variant?: "gradient" | "monochrome" | "white";
  className?: string;
}

/**
 * Official SELA Abstract Leaf & Wave Mark
 * Uses the official SELA PNG mark with crisp rendering and variant adaptations.
 */
export const SelaMark: React.FC<SelaMarkProps> = ({
  size = 36,
  variant = "gradient",
  className,
  ...props
}) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={cn("relative shrink-0 flex items-center justify-center select-none overflow-hidden", className)}
      {...props}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/sela-logo.png"
        alt="SELA Logo Mark"
        width={size}
        height={size}
        className={cn(
          "w-full h-full object-contain pointer-events-none drop-shadow-sm transition-transform duration-200",
          variant === "white" && "brightness-0 invert",
          variant === "monochrome" && "filter brightness-50 contrast-150"
        )}
        loading="eager"
      />
    </div>
  );
};

interface SelaLogoProps {
  layout?: "horizontal" | "vertical" | "mark-only";
  size?: "sm" | "md" | "lg" | "xl";
  showTagline?: boolean;
  taglineText?: string;
  showAiSuffix?: boolean;
  variant?: "gradient" | "monochrome" | "white";
  className?: string;
}

/**
 * Complete SELA.AI Brand Logo Component
 * Supports Horizontal, Vertical, and App Icon displays.
 */
export const SelaLogo: React.FC<SelaLogoProps> = ({
  layout = "horizontal",
  size = "md",
  showTagline = false,
  taglineText = "From Unspoken Problems to Prepared Conversations",
  showAiSuffix = true,
  variant = "gradient",
  className,
}) => {
  const markSizes = {
    sm: 26,
    md: 34,
    lg: 44,
    xl: 64,
  };

  const textSizes = {
    sm: "text-lg tracking-tight",
    md: "text-xl sm:text-2xl tracking-tight",
    lg: "text-2xl sm:text-3xl tracking-tight",
    xl: "text-4xl sm:text-5xl tracking-tighter",
  };

  const taglineSizes = {
    sm: "text-[10px]",
    md: "text-xs",
    lg: "text-sm",
    xl: "text-base",
  };

  const markSize = markSizes[size];

  if (layout === "mark-only") {
    return <SelaMark size={markSize} variant={variant} className={className} />;
  }

  if (layout === "vertical") {
    return (
      <div className={cn("inline-flex flex-col items-center text-center select-none", className)}>
        <SelaMark size={markSize} variant={variant} />
        <div className="mt-2 flex flex-col items-center">
          <span
            className={cn(
              "font-bold font-sans lowercase text-brand-900 leading-none flex items-center",
              variant === "white" && "text-white",
              textSizes[size]
            )}
          >
            sela
            {showAiSuffix && (
              <span className={cn(variant === "white" ? "text-[#6FB1FF]" : "text-[#2457A7]", "font-extrabold")}>
                .ai
              </span>
            )}
          </span>
          {showTagline && (
            <span
              className={cn(
                "text-text-muted mt-1 font-normal tracking-normal leading-tight font-sans max-w-xs",
                variant === "white" && "text-white/80",
                taglineSizes[size]
              )}
            >
              {taglineText}
            </span>
          )}
        </div>
      </div>
    );
  }

  // Horizontal layout (default)
  return (
    <div className={cn("inline-flex items-center gap-2.5 select-none", className)}>
      <SelaMark size={markSize} variant={variant} />
      <div className="flex flex-col leading-none">
        <span
          className={cn(
            "font-extrabold font-sans lowercase text-brand-900 leading-none tracking-tight flex items-center",
            variant === "white" && "text-white",
            textSizes[size]
          )}
        >
          sela
          {showAiSuffix && (
            <span className={cn(variant === "white" ? "text-[#6FB1FF]" : "text-[#2457A7]", "font-black")}>
              .ai
            </span>
          )}
        </span>
        {showTagline && (
          <span
            className={cn(
              "text-text-muted text-[11px] sm:text-xs font-normal mt-0.5 tracking-tight font-sans max-w-[180px] sm:max-w-xs truncate hidden sm:inline-block",
              variant === "white" && "text-white/80",
              taglineSizes[size]
            )}
          >
            {taglineText}
          </span>
        )}
      </div>
    </div>
  );
};

/**
 * Neumorphic SELA App Icon Squircle
 * Replicates the "Ikon Aplikasi" badge from the SELA brand board with official PNG mark.
 */
export const SelaAppIcon: React.FC<{
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  theme?: "light" | "dark";
}> = ({ size = "md", className, theme = "light" }) => {
  const containerSizes = {
    sm: "w-10 h-10 rounded-xl",
    md: "w-14 h-14 rounded-2xl",
    lg: "w-20 h-20 rounded-3xl",
    xl: "w-28 h-28 rounded-[2rem]",
  };

  const markSizes = {
    sm: 26,
    md: 38,
    lg: 56,
    xl: 76,
  };

  const isDark = theme === "dark";

  return (
    <div
      className={cn(
        "flex items-center justify-center transition-all duration-200 shrink-0",
        containerSizes[size],
        isDark
          ? "bg-brand-900 text-white shadow-neu-raised border border-brand-800"
          : "bg-surface shadow-neu-raised border border-white/80",
        className
      )}
    >
      <SelaMark size={markSizes[size]} variant={isDark ? "white" : "gradient"} />
    </div>
  );
};
