import React from "react";
import { cn } from "@/lib/utils";
import { NeuCard } from "./NeuCard";
import { NeuButton } from "./NeuButton";
import { Loader2, AlertCircle, Inbox, CheckCircle2 } from "lucide-react";

export type StateType = "empty" | "loading" | "error" | "success";

export interface StateCardProps {
  type: StateType;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const StateCard: React.FC<StateCardProps> = ({
  type,
  title,
  description,
  actionLabel,
  onAction,
  className,
}) => {
  const config = {
    empty: {
      icon: (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/images/aura/aura-empty-state.png"
          alt="Aura duduk tenang"
          className="w-14 h-14 object-contain"
        />
      ),
      badgeColor: "bg-brand-100 text-brand-800",
      btnVariant: "secondary" as const,
    },
    loading: {
      icon: <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />,
      badgeColor: "bg-brand-100 text-brand-800",
      btnVariant: "ghost" as const,
    },
    error: {
      icon: <AlertCircle className="w-8 h-8 text-rose-500" />,
      badgeColor: "bg-rose-100 text-rose-800",
      btnVariant: "danger" as const,
    },
    success: {
      icon: <CheckCircle2 className="w-8 h-8 text-teal-600" />,
      badgeColor: "bg-teal-100 text-teal-800",
      btnVariant: "primary" as const,
    },
  };

  const current = config[type];

  return (
    <NeuCard
      variant="raised-sm"
      className={cn("p-6 text-center space-y-4 max-w-md mx-auto my-4", className)}
    >
      <div className="w-14 h-14 rounded-2xl bg-surface-inset shadow-neu-inset mx-auto flex items-center justify-center">
        {current.icon}
      </div>
      <div className="space-y-1.5">
        <h3 className="text-base font-bold text-brand-900">{title}</h3>
        <p className="text-xs text-text-muted leading-relaxed max-w-sm mx-auto">
          {description}
        </p>
      </div>
      {actionLabel && onAction && (
        <div className="pt-2">
          <NeuButton
            size="sm"
            variant={current.btnVariant}
            onClick={onAction}
            className="shadow-neu-raised-sm"
          >
            {actionLabel}
          </NeuButton>
        </div>
      )}
    </NeuCard>
  );
};
