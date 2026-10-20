"use client";

import React, { useState } from "react";
import { BookOpen, ChevronDown, ChevronUp, ExternalLink, CheckCircle } from "lucide-react";
import { RetrievedSource } from "@/types/knowledge";
import { Badge } from "@/components/ui/Badge";

interface SourceCitationProps {
  sources: RetrievedSource[];
}

export const SourceCitation: React.FC<SourceCitationProps> = ({ sources }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!sources || sources.length === 0) return null;

  return (
    <div className="mt-3 pt-2.5 border-t border-border-subtle/80 space-y-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-[11px] font-semibold text-brand-700 hover:text-brand-900 transition-colors"
      >
        <BookOpen className="w-3.5 h-3.5" />
        <span>{sources.length} Rujukan Terverifikasi</span>
        {isOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>

      {isOpen && (
        <div className="space-y-2 pt-1 animate-in fade-in duration-150">
          {sources.map((src) => (
            <div
              key={src.id}
              className="p-2.5 rounded-xl bg-surface-inset/80 border border-border-subtle/80 text-[11px] text-text-muted space-y-1 text-left"
            >
              <div className="font-bold text-brand-900 flex items-center justify-between gap-2">
                <span>{src.title}</span>
                <Badge variant={src.review_status === "verified_expert" ? "verified" : "prototype"} size="sm">
                  {src.review_status === "verified_expert" ? "Resmi" : "Draf"}
                </Badge>
              </div>

              <p className="text-[10px] text-text-subtle font-medium">
                Penerbit/Sumber: {src.source_name}
              </p>

              <div className="text-[10px] text-brand-800 bg-brand-50/60 p-1.5 rounded-lg border border-brand-100">
                <strong>Referensi:</strong> {src.reference}
              </div>

              {src.snippet && (
                <p className="text-[10px] text-text-muted italic leading-relaxed pt-0.5">
                  &ldquo;{src.snippet}&rdquo;
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
