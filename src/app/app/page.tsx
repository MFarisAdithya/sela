"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { greetingFor } from "@/lib/copy";
import { AuraAvatar } from "@/components/ui/AuraMascot";
import { RuangRasaSection } from "@/components/ruang-rasa/RuangRasaSection";

export default function AppDashboardPage() {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState("Selamat datang");

  const displayName = user?.displayName || "Kawan";

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
              Kelola paket
            </span>
          </Link>
        </div>
      </div>

      {/* 2. Ruang Rasa Mood Check-in with 8 Teman Rasa Characters */}
      <RuangRasaSection />
    </div>
  );
}
