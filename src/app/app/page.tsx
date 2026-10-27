"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { greetingFor } from "@/lib/copy";
import { AURA_EXPRESSIONS, AuraAvatar } from "@/components/ui/AuraMascot";
import { cn } from "@/lib/utils";

export default function AppDashboardPage() {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState("Selamat datang");
  const [selectedExpId, setSelectedExpId] = useState<string>("tenang");

  const displayName = user?.displayName || "Kawan";
  const currentExp = AURA_EXPRESSIONS.find((e) => e.id === selectedExpId) || AURA_EXPRESSIONS[3];

  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(greetingFor(hour));
  }, []);

  return (
    <div className="space-y-7 py-2 text-[#102542]">
      {/* 1. Header Greeting with Aura & Status Paket */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-[#C6DCF5]">
        <div className="flex items-center gap-3.5">
          <AuraAvatar size="lg" />
          <div>
            <span className="text-[11px] font-bold text-[#2E63D6] bg-[#D6E9FF] px-2.5 py-0.5 rounded-full">
              Aura · Temanmu di SELA.AI
            </span>
            <h1 className="font-serif-display text-2xl sm:text-3xl font-medium text-[#102542] mt-1">
              {greeting}, {displayName}.
            </h1>
            <p className="text-xs sm:text-sm text-[#2B4566]">
              Meja persiapan obrolan dan catatan reflektif pribadimu.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/app/paket"
            className="letterpress-cotton inline-flex items-center gap-2 px-3.5 py-2 text-xs rounded-xl"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#1E56A0]" />
            <span>
              {user?.plan === "premium" ? "SELA Supporter Aktif" : "Paket Gratis"}
            </span>
            <span className="text-[#1E56A0] font-semibold underline underline-offset-2 ml-1">
              Kelola kuota
            </span>
          </Link>
        </div>
      </div>

      {/* 1B. Interactive Mood Check-in with Aura's 6 Facial Expressions */}
      <div className="cotton-sheet rounded-2xl p-4 sm:p-5 border border-[#BFD8F5]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <span className="text-xs font-bold text-[#102542]">
            Bagaimana rasanya hari ini? Pilih ekspresi Aura yang paling pas:
          </span>
          <span className="text-[11px] text-[#5B789E]">Check-in suasana hati harian</span>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {AURA_EXPRESSIONS.map((exp) => {
            const isSelected = exp.id === selectedExpId;
            return (
              <button
                key={exp.id}
                type="button"
                onClick={() => setSelectedExpId(exp.id)}
                className={cn(
                  "flex flex-col items-center p-2 rounded-xl border transition-colors",
                  isSelected
                    ? "bg-[#D6E9FF] border-[#2E63D6] shadow-sm"
                    : "bg-[#F4F8FF] border-[#D6E9FF] hover:border-[#6BA8FF]"
                )}
              >
                <div className="w-11 h-11 rounded-lg overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={exp.src} alt={exp.label} className="w-full h-full object-contain" />
                </div>
                <span className={cn("text-[11px] mt-1 font-semibold", isSelected ? "text-[#2E63D6]" : "text-[#35527A]")}>
                  {exp.label}
                </span>
              </button>
            );
          })}
        </div>
        <div className="mt-3 p-3 rounded-xl bg-[#F4F8FF] border border-[#D6E9FF] flex items-center gap-2.5 text-xs text-[#102542]">
          <AuraAvatar size="xs" />
          <p className="leading-snug">
            <strong className="text-[#2E63D6]">Pesan Aura:</strong> {currentExp.reply}
          </p>
        </div>
      </div>
    </div>
  );
}
