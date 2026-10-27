"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ArrowRight, ShieldCheck, Sparkles, RotateCcw } from "lucide-react";
import { TEMAN_RASA_CHARACTERS, getAuraReflectionMessage } from "@/data/temanRasa";
import { TemanRasaAvatar } from "./TemanRasaAvatar";
import { AuraAvatar } from "@/components/ui/AuraMascot";
import { cn } from "@/lib/utils";

interface RuangRasaSectionProps {
  className?: string;
  onProceed?: (selectedEmotionIds: string[]) => void;
  onSkip?: () => void;
}

export const RuangRasaSection: React.FC<RuangRasaSectionProps> = ({
  className,
  onProceed,
  onSkip,
}) => {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Toggle selection for multi-select
  const toggleEmotion = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleEmotion(id);
    }
  };

  const handleReset = () => {
    setSelectedIds([]);
  };

  const handleContinue = () => {
    if (selectedIds.length === 0) return;

    try {
      sessionStorage.setItem("sela:checkin_emotions", JSON.stringify(selectedIds));
    } catch {
      // safe fallback
    }

    if (onProceed) {
      onProceed(selectedIds);
    } else {
      router.push("/safe-story");
    }
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    } else {
      router.push("/safe-story");
    }
  };

  return (
    <div
      className={cn(
        "cotton-sheet rounded-3xl p-6 sm:p-8 border border-[#BFD8F5] shadow-sm space-y-6 text-[#102542]",
        className
      )}
    >
      {/* A. Header Section */}
      <div className="space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCEAFB] border border-[#BFD8F5] text-[11px] font-semibold text-[#1E56A0] tracking-wider uppercase mb-1">
          <Sparkles className="w-3.5 h-3.5 text-[#2E63D6]" />
          <span>Check-in Suasana Hati</span>
        </div>
        <h2 className="font-serif-display text-2xl sm:text-3xl font-medium tracking-tight text-[#102542]">
          Ruang Rasa
        </h2>
        <p className="text-sm sm:text-base font-semibold text-[#1E56A0]">
          &ldquo;Kenali perasaanmu, tanpa harus menghakimi dirimu sendiri.&rdquo;
        </p>
        <p className="text-xs sm:text-sm text-[#35527A] leading-relaxed max-w-2xl">
          Setiap perasaan boleh hadir. Pilih satu atau beberapa yang paling menggambarkan keadaanmu hari ini bersama Teman Rasa.
        </p>
      </div>

      {/* B. Grid of 8 Teman Rasa Emotion Cards */}
      <div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
        role="group"
        aria-label="Pilihan delapan karakter Teman Rasa"
      >
        {TEMAN_RASA_CHARACTERS.map((char) => {
          const isSelected = selectedIds.includes(char.id);

          return (
            <div
              key={char.id}
              role="checkbox"
              aria-checked={isSelected}
              tabIndex={0}
              onClick={() => toggleEmotion(char.id)}
              onKeyDown={(e) => handleKeyDown(e, char.id)}
              className={cn(
                "group relative flex flex-col justify-between p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 cursor-pointer select-none",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E56A0] focus-visible:ring-offset-2",
                isSelected
                  ? "bg-[#EAF3FF] border-[#1E56A0] shadow-[0_6px_16px_rgba(30,86,160,0.12)] scale-[1.01]"
                  : "bg-[#FAFDFE] border-[#DCEAFB] hover:border-[#9AC0EB] hover:bg-[#F4F8FF] hover:shadow-sm"
              )}
            >
              {/* Checkmark Indicator in Top Right */}
              <div
                className={cn(
                  "absolute top-2.5 right-2.5 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200",
                  isSelected
                    ? "bg-[#1E56A0] text-white shadow-sm scale-100 opacity-100"
                    : "border border-[#BFD8F5] bg-white/70 text-transparent scale-90 opacity-40 group-hover:opacity-75"
                )}
                aria-hidden="true"
              >
                <Check className={cn("w-3 h-3 stroke-[3]", isSelected ? "text-white" : "text-transparent")} />
              </div>

              {/* Character Illustration / Avatar */}
              <div className="flex flex-col items-center pt-1 pb-2">
                <TemanRasaAvatar character={char} isSelected={isSelected} size="md" />
              </div>

              {/* Card Meta Content */}
              <div className="text-center space-y-1">
                <div className="flex items-center justify-center gap-1.5 flex-wrap">
                  <span className="font-bold text-sm text-[#102542] group-hover:text-[#1E56A0] transition-colors">
                    {char.name}
                  </span>
                </div>

                <span
                  className={cn(
                    "inline-block text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-full transition-colors",
                    char.theme.badgeBg,
                    char.theme.badgeText
                  )}
                >
                  {char.emotion}
                </span>

                <p className="text-[11px] text-[#516B8C] leading-snug line-clamp-3 pt-1">
                  {char.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* D. Selection Counter Bar */}
      <div className="flex items-center justify-between text-xs px-1">
        <span className="text-[#35527A] font-medium">
          {selectedIds.length === 0 ? (
            <span className="italic text-[#6E87A6]">
              Belum ada perasaan yang dipilih. Klik satu atau beberapa kartu di atas.
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 font-semibold text-[#1E56A0]">
              <span className="w-2 h-2 rounded-full bg-[#1E56A0] inline-block animate-pulse" />
              {selectedIds.length} perasaan dipilih
            </span>
          )}
        </span>

        {selectedIds.length > 0 && (
          <button
            type="button"
            onClick={handleReset}
            className="text-[11px] font-semibold text-[#516B8C] hover:text-[#1E56A0] inline-flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset pilihan</span>
          </button>
        )}
      </div>

      {/* E. Pesan Reflektif dari Aura Panel */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#F4F8FF] border border-[#BFD8F5] flex flex-col sm:flex-row items-start sm:items-center gap-3.5 shadow-sm transition-all duration-300">
        <div className="shrink-0 pt-0.5 sm:pt-0">
          <AuraAvatar size="sm" />
        </div>
        <div className="space-y-0.5 text-xs sm:text-sm text-[#102542]">
          <span className="font-bold text-[#1E56A0] block text-xs uppercase tracking-wider">
            Pesan Aura
          </span>
          <p className="leading-relaxed text-[#102542]/90">
            {getAuraReflectionMessage(selectedIds)}
          </p>
        </div>
      </div>

      {/* F. Action Buttons */}
      <div className="pt-2 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
        <button
          type="button"
          onClick={handleSkip}
          className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-[#BFD8F5] text-xs font-semibold text-[#35527A] hover:bg-white hover:text-[#102542] transition-colors text-center"
        >
          Lewati Dulu
        </button>

        <button
          type="button"
          onClick={handleContinue}
          disabled={selectedIds.length === 0}
          className={cn(
            "w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-md",
            selectedIds.length > 0
              ? "letterpress-primary cursor-pointer"
              : "bg-[#DCEAFB] text-[#6E87A6] border border-[#BFD8F5] cursor-not-allowed opacity-60"
          )}
          aria-disabled={selectedIds.length === 0}
        >
          <span>Lanjutkan Refleksi</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* G. Privacy & Reassurance Area */}
      <div className="pt-2 border-t border-[#BFD8F5]/60 flex items-center gap-2 text-[11px] text-[#516B8C]">
        <ShieldCheck className="w-4 h-4 text-[#1E56A0] shrink-0" />
        <span>
          Perasaanmu tidak harus selalu dijelaskan. Kamu boleh memilih untuk berbagi, melewati, atau berhenti kapan saja.
        </span>
      </div>
    </div>
  );
};
