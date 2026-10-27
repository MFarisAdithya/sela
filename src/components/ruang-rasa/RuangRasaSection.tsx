"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Lock, RotateCcw } from "lucide-react";
import { TEMAN_RASA_CHARACTERS, getAuraReflectionMessage } from "@/data/temanRasa";
import { TemanRasaAvatar } from "./TemanRasaAvatar";
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
        "rounded-[32px] p-6 sm:p-8 lg:p-9 bg-white border border-[#DCEAFB] shadow-[0_16px_48px_rgba(30,86,160,0.08)] space-y-6 text-[#102542] relative",
        className
      )}
    >
      {/* A. Header Section with Peeking Aura & Speech Bubble */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 relative">
        {/* Left: Titles & Eyebrow */}
        <div className="space-y-1.5 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3FF] border border-[#BFD8F5] text-[11px] font-semibold text-[#2563EB] tracking-wider uppercase mb-1">
            <span>Check-in Suasana Hati</span>
          </div>
          <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-[#102542]">
            Apa yang sedang kamu rasakan?
          </h2>
          <p className="text-xs sm:text-sm text-[#47668D] leading-relaxed">
            Setiap perasaan boleh hadir. Pilih satu atau beberapa yang paling menggambarkan keadaanmu hari ini.
          </p>
        </div>

        {/* Right: Peeking Aura Mascot + Speech Bubble */}
        <div className="flex items-end gap-2.5 self-end md:self-auto shrink-0 relative pt-2 sm:pt-0">
          {/* Aura Peeking Artwork */}
          <div className="relative w-24 h-16 sm:w-28 sm:h-20 shrink-0 select-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/teman-rasa/aura_peeking.png"
              alt="Aura mengintip ramah"
              className="w-full h-full object-contain filter drop-shadow-sm"
            />
          </div>

          {/* Speech Bubble */}
          <div className="relative bg-white/95 border border-[#BFD8F5] rounded-2xl p-2.5 sm:p-3 shadow-sm max-w-[190px] sm:max-w-[210px] text-[11px] sm:text-xs text-[#2B4566] leading-snug">
            {/* Speech Bubble Tail */}
            <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[8px] border-r-white z-10" />
            <div className="absolute top-1/2 -left-[9px] -translate-y-1/2 w-0 h-0 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent border-r-[9px] border-r-[#BFD8F5]" />
            <span>Nggak ada perasaan yang salah. Semua boleh kamu rasakan.</span>
          </div>
        </div>
      </div>

      {/* B. Grid of 8 Teman Rasa Emotion Cards */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
        role="group"
        aria-label="Pilihan delapan karakter Teman Rasa"
      >
        {TEMAN_RASA_CHARACTERS.map((char) => {
          const isSelected = selectedIds.includes(char.id);

          return (
            <button
              type="button"
              key={char.id}
              role="checkbox"
              aria-checked={isSelected}
              onClick={() => toggleEmotion(char.id)}
              onKeyDown={(e) => handleKeyDown(e, char.id)}
              className={cn(
                "group relative flex flex-col items-center justify-between p-3.5 sm:p-4 rounded-2xl border text-center select-none cursor-pointer",
                "transition-colors duration-100 active:scale-[0.97] active:duration-40",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2",
                isSelected
                  ? "bg-gradient-to-b from-[#EBF3FF] to-white border-[#2563EB] shadow-[0_4px_16px_rgba(37,99,235,0.18)] ring-2 ring-[#2563EB]/30"
                  : `bg-gradient-to-b ${char.theme.bgGradient} border-[#DCEAFB] hover:border-[#93C5FD] hover:shadow-xs`
              )}
            >
              {/* Checkbox circle in Top Right */}
              <div
                className={cn(
                  "absolute top-2.5 right-2.5 w-5 h-5 rounded-full flex items-center justify-center transition-colors duration-75",
                  isSelected
                    ? "bg-[#2563EB] text-white border border-[#2563EB] shadow-xs"
                    : "border border-[#BFD8F5] bg-white/90 text-transparent"
                )}
                aria-hidden="true"
              >
                <Check className={cn("w-3 h-3 stroke-[3]", isSelected ? "text-white" : "text-transparent")} />
              </div>

              {/* Character Illustration */}
              <div className="w-full flex items-center justify-center pt-2 pb-1">
                {char.imageSrc ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={char.imageSrc}
                    alt={char.name}
                    className="w-28 h-20 sm:w-32 sm:h-22 object-contain select-none transition-transform duration-100 group-hover:-translate-y-0.5"
                  />
                ) : (
                  <TemanRasaAvatar character={char} isSelected={isSelected} size="md" />
                )}
              </div>

              {/* Card Title & Subtitle */}
              <div className="text-center pt-1 pb-0.5 w-full">
                <h3 className="font-bold text-sm sm:text-base text-[#102542] group-hover:text-[#2563EB] transition-colors duration-75 leading-tight">
                  {char.name}
                </h3>
                <p className="text-[11px] sm:text-xs text-[#516B8C] mt-0.5 leading-tight">
                  {char.emotion}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* C. Bottom Section: Pesan Aura, Counter, Buttons & Privacy */}
      <div className="space-y-3 pt-2">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 sm:gap-4">
          {/* Pesan Aura Panel */}
          <div className="flex-1 rounded-2xl bg-[#EBF3FF] border border-[#BFD8F5] p-3 sm:p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm transition-colors duration-100">
            <div className="flex items-center gap-3 min-w-0">
              {/* Bottom Aura Avatar */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden shrink-0 shadow-sm border border-[#BFD8F5] bg-white flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/teman-rasa/aura_bottom.png"
                  alt="Aura"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 space-y-0.5">
                <span className="font-bold text-[#2563EB] block text-xs tracking-wider">
                  Pesan Sela
                </span>
                <p className="text-xs sm:text-[13px] text-[#102542]/90 leading-snug">
                  {getAuraReflectionMessage(selectedIds)}
                </p>
              </div>
            </div>

            {/* Selection Counter Pill */}
            <div className="shrink-0 self-end sm:self-center flex items-center gap-2">
              <span className="text-[11px] sm:text-xs font-semibold text-[#516B8C] bg-white/90 px-3 py-1 rounded-full border border-[#BFD8F5] shadow-xs">
                {selectedIds.length} perasaan dipilih
              </span>
              {selectedIds.length > 0 && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-[11px] font-semibold text-[#516B8C] hover:text-[#2563EB] inline-flex items-center gap-1 transition-colors duration-75 active:scale-95"
                  title="Reset pilihan"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0 justify-end">
            <button
              type="button"
              onClick={handleSkip}
              className="px-5 py-2.5 rounded-full border border-[#93C5FD] bg-white text-xs sm:text-sm font-semibold text-[#2563EB] hover:bg-[#F0F7FF] transition-colors duration-75 shadow-xs active:scale-95 cursor-pointer"
            >
              Lewati Dulu
            </button>

            <button
              type="button"
              onClick={handleContinue}
              disabled={selectedIds.length === 0}
              className={cn(
                "inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-75 shadow-sm active:scale-95",
                selectedIds.length > 0
                  ? "bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-[0_4px_12px_rgba(37,99,235,0.25)] cursor-pointer"
                  : "bg-[#BFDBFE] text-white cursor-not-allowed opacity-75"
              )}
            >
              <span>Lanjutkan Refleksi</span>
            </button>
          </div>
        </div>

        {/* Reassurance & Privacy Note */}
        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[#516B8C] pt-1">
          <Lock className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
          <span>
            Perasaanmu tidak harus selalu dijelaskan. Kamu boleh memilih untuk berbagi, melewati, atau berhenti kapan saja.
          </span>
        </div>
      </div>
    </div>
  );
};
