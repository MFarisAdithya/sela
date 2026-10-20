import React from "react";
import { cn } from "@/lib/utils";

interface SelaMarkProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  variant?: "gradient" | "monochrome" | "white";
  className?: string;
}

/**
 * SELA Abstract Leaf & Wave Mark
 * Symbol of personal reflection, calm, and organic growth.
 */
export const SelaMark: React.FC<SelaMarkProps> = ({
  size = 36,
  variant = "gradient",
  className,
  ...props
}) => {
  const uniqueId = React.useId().replace(/:/g, "_");

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0 transition-transform duration-200", className)}
      aria-label="SELA Logo Mark"
      {...props}
    >
      <defs>
        {/* Main Outer Wave / Leaf Gradient */}
        <linearGradient
          id={`sela-grad-outer-${uniqueId}`}
          x1="18"
          y1="90"
          x2="65"
          y2="20"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#17365D" />
          <stop offset="45%" stopColor="#2457A7" />
          <stop offset="100%" stopColor="#6FB1FF" />
        </linearGradient>

        {/* Inner Wave / Petal Gradient with Lighter Glow */}
        <linearGradient
          id={`sela-grad-inner-${uniqueId}`}
          x1="30"
          y1="82"
          x2="85"
          y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#1E4B94" />
          <stop offset="50%" stopColor="#4A93F5" />
          <stop offset="100%" stopColor="#8AC4FF" />
        </linearGradient>

        {/* Floating Seed / Leaf Bud Gradient */}
        <linearGradient
          id={`sela-grad-bud-${uniqueId}`}
          x1="70"
          y1="32"
          x2="88"
          y2="10"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#2457A7" />
          <stop offset="100%" stopColor="#6FB1FF" />
        </linearGradient>
      </defs>

      {/* Primary Sweeping Wave/Leaf (Bottom Left to Top Right crest) */}
      <path
        d="M26 80 C 14 62, 16 38, 38 22 C 32 36, 36 54, 52 64 C 62 70, 70 72, 73 70 C 65 82, 45 88, 26 80 Z"
        fill={
          variant === "white"
            ? "#FFFFFF"
            : variant === "monochrome"
            ? "#17365D"
            : `url(#sela-grad-outer-${uniqueId})`
        }
      />

      {/* Secondary Ascending Wave/Leaf (Back Crest) */}
      <path
        d="M38 22 C 48 30, 64 42, 69 56 C 74 66, 70 76, 62 82 C 78 74, 82 52, 72 38 C 64 26, 50 18, 38 22 Z"
        fill={
          variant === "white"
            ? "rgba(255, 255, 255, 0.85)"
            : variant === "monochrome"
            ? "#2457A7"
            : `url(#sela-grad-inner-${uniqueId})`
        }
      />

      {/* Floating Bud / Droplet Leaf (Top Right) */}
      <path
        d="M74 24 C 71 16, 76 9, 84 8 C 89 15, 87 23, 79 26 C 77 27, 75 26, 74 24 Z"
        fill={
          variant === "white"
            ? "#FFFFFF"
            : variant === "monochrome"
            ? "#17365D"
            : `url(#sela-grad-bud-${uniqueId})`
        }
      />
    </svg>
  );
};

interface SelaLogoProps {
  layout?: "horizontal" | "vertical" | "mark-only";
  size?: "sm" | "md" | "lg" | "xl";
  showTagline?: boolean;
  variant?: "gradient" | "monochrome" | "white";
  className?: string;
}

/**
 * Complete SELA Brand Logo Component
 * Supports Horizontal, Vertical, and App Icon displays.
 */
export const SelaLogo: React.FC<SelaLogoProps> = ({
  layout = "horizontal",
  size = "md",
  showTagline = false,
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
      <div className={cn("inline-flex flex-col items-center text-center", className)}>
        <SelaMark size={markSize} variant={variant} />
        <div className="mt-2 flex flex-col items-center">
          <span
            className={cn(
              "font-bold font-sans lowercase text-brand-900 leading-none",
              variant === "white" && "text-white",
              textSizes[size]
            )}
          >
            sela
          </span>
          {showTagline && (
            <span
              className={cn(
                "text-text-muted mt-1 font-normal tracking-normal leading-tight",
                variant === "white" && "text-white/80",
                taglineSizes[size]
              )}
            >
              Ruang untuk dirimu.
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
            "font-extrabold font-sans lowercase text-brand-900 leading-none tracking-tight",
            variant === "white" && "text-white",
            textSizes[size]
          )}
        >
          sela
        </span>
        {showTagline && (
          <span
            className={cn(
              "text-text-muted text-[11px] sm:text-xs font-normal mt-0.5 tracking-tight",
              variant === "white" && "text-white/80",
              taglineSizes[size]
            )}
          >
            Ruang untuk dirimu.
          </span>
        )}
      </div>
    </div>
  );
};

/**
 * Neumorphic SELA App Icon Squircle
 * Replicates the "Ikon Aplikasi" badge from the SELA brand board.
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
    sm: 24,
    md: 34,
    lg: 48,
    xl: 68,
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
