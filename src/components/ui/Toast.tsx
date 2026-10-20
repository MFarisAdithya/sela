"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from "lucide-react";
import { NeuCard } from "./NeuCard";

export type ToastType = "success" | "warning" | "danger" | "info";

export interface ToastProps {
  id?: string;
  type?: ToastType;
  title: string;
  message?: string;
  duration?: number;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  type = "info",
  title,
  message,
  duration = 4000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!isVisible) return null;

  const iconMap = {
    success: <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
    danger: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />,
    info: <Info className="w-5 h-5 text-brand-600 shrink-0" />,
  };

  const borderMap = {
    success: "border-teal-200/80 bg-teal-50/40",
    warning: "border-amber-200/80 bg-amber-50/40",
    danger: "border-rose-200/80 bg-rose-50/40",
    info: "border-brand-200/80 bg-brand-50/40",
  };

  return (
    <div className="fixed bottom-20 right-4 z-50 max-w-sm w-full animate-in slide-in-from-bottom-4 duration-200">
      <NeuCard
        variant="raised"
        className={cn("p-4 flex items-start gap-3 border shadow-lg", borderMap[type])}
      >
        {iconMap[type]}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-brand-900 leading-tight">
            {title}
          </h4>
          {message && (
            <p className="text-xs text-text-muted mt-1 leading-relaxed">
              {message}
            </p>
          )}
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            if (onClose) onClose();
          }}
          className="text-text-muted hover:text-brand-900 p-1 rounded-lg transition-colors"
          aria-label="Tutup notifikasi"
        >
          <X className="w-4 h-4" />
        </button>
      </NeuCard>
    </div>
  );
};
