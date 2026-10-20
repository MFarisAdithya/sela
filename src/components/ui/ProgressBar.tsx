import React from "react";
import { cn } from "@/lib/utils";

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 - 100
  max?: number;
  label?: string;
  showPercentage?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  showPercentage = false,
  className,
  ...props
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  return (
    <div className={cn("w-full space-y-1.5", className)} {...props}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center text-xs font-medium text-text-muted">
          {label && <span>{label}</span>}
          {showPercentage && <span className="font-semibold text-brand-900">{percentage}%</span>}
        </div>
      )}
      <div className="w-full h-3 rounded-full bg-surface-inset shadow-neu-inset overflow-hidden p-0.5 border border-border-subtle/80">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-700 transition-all duration-500 ease-out shadow-[0_1px_3px_rgba(36,87,167,0.4)]"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export interface CircularProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 - 100
  size?: number;
  strokeWidth?: number;
  subtitle?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  size = 110,
  strokeWidth = 9,
  subtitle,
  className,
  ...props
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round(value)));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className={cn("relative inline-flex flex-col items-center justify-center", className)}
      style={{ width: size, height: size }}
      {...props}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#EBF1FA"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="shadow-inner"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#blueGradient)"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
        <defs>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4C7EDB" />
            <stop offset="100%" stopColor="#2457A7" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-2xl font-bold tracking-tight text-brand-900">{percentage}%</span>
        {subtitle && <span className="text-[10px] text-text-muted mt-0.5">{subtitle}</span>}
      </div>
    </div>
  );
};
