"use client";

import React, { useState } from "react";
import { BookOpen, ChevronDown, ChevronUp, ExternalLink, ShieldCheck } from "lucide-react";
import { RetrievedSource } from "@/types/knowledge";
import { Badge } from "@/components/ui/Badge";

interface SourceCitationProps {
  sources: RetrievedSource[];
}

export const SourceCitation: React.FC<SourceCitationProps> = ({ sources }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (!sources || sources.length === 0) return null;

  return (
    <div className="mt-3 pt-2.5 border-t border-border-subtle/80 space-y-2 text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-[11px] font-semibold text-brand-700 hover:text-brand-900 transition-colors focus:outline-none"
      >
        <BookOpen className="w-3.5 h-3.5 text-brand-600" />
        <span>{sources.length} Rujukan Terverifikasi Digunakan</span>
        {isOpen ? <ChevronUp className="w-3 h-3 text-text-muted" /> : <ChevronDown className="w-3 h-3 text-text-muted" />}
      </button>

      {isOpen && (
        <div className="space-y-2 pt-1 animate-in fade-in duration-150">
          {sources.map((src) => (
            <div
              key={src.id}
              className="p-3 rounded-xl bg-surface-inset/90 border border-border-subtle/80 text-[11px] text-text-muted space-y-1.5"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-bold text-brand-900 leading-snug">
                  {src.title}
                </span>
                <Badge variant={src.review_status === "verified_expert" ? "verified" : "info"} size="sm">
                  {src.review_status === "verified_expert" ? "Resmi Terverifikasi" : "Protokol Standar"}
                </Badge>
              </div>

              <div className="text-[10px] text-text-subtle space-y-0.5">
                <p>
                  <strong>Organisasi/Penerbit:</strong> {src.author_or_organization} ({src.publication_date})
                </p>
                <p>
                  <strong>Bagian Materi:</strong> {src.material_section}
                </p>
              </div>

              {src.snippet && (
                <p className="text-[10px] text-text-muted italic bg-brand-50/50 p-2 rounded-lg border border-brand-100/60 leading-relaxed">
                  &ldquo;{src.snippet}&rdquo;
                </p>
              )}

              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] font-medium text-text-subtle">
                  Relevansi Semantik: {Math.round(src.score * 100)}%
                </span>

                {src.url && (
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] font-semibold text-brand-700 hover:text-brand-900 hover:underline"
                  >
                    <span>Kunjungi Sumber</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
