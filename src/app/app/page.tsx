"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  MessageSquareHeart,
  MessageCircle,
  Users,
  BookOpen,
  PhoneCall,
  Sparkles,
  Compass,
  Check,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useApp } from "@/context/AppContext";
import { greetingFor } from "@/lib/copy";
import { AURA_EXPRESSIONS, AuraAvatar } from "@/components/ui/AuraMascot";
import { cn } from "@/lib/utils";

export default function AppDashboardPage() {
  const { user } = useAuth();
  const { storyCards, activeStoryCard } = useApp();
  const [greeting, setGreeting] = useState("Selamat datang");
  const [selectedExpId, setSelectedExpId] = useState<string>("tenang");

  const displayName = user?.displayName || "Kawan";
  const featuredCard = activeStoryCard || storyCards[0];
  const currentExp = AURA_EXPRESSIONS.find((e) => e.id === selectedExpId) || AURA_EXPRESSIONS[3];

  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(greetingFor(hour));
  }, []);

  const coreActions = [
    {
      code: "01",
      title: "Guided Story",
      subtitle: "Uraikan cerita",
      desc: "Jawab pertanyaan santai untuk merapikan uneg-uneg di kepala.",
      href: "/safe-story",
      icon: MessageSquareHeart,
      auraImg: "/images/aura/aura-chat-assistant.png",
    },
    {
      code: "02",
      title: "Kartu Cerita",
      subtitle: "Pegangan bicara",
      desc: "Lihat dan edit draf ringkasan 4 kuadran sebelum mulai bicara.",
      href: "/journal",
      icon: Compass,
      auraImg: "/images/aura/aura-panduan-langkah.png",
    },
    {
      code: "03",
      title: "Practice Talk",
      subtitle: "Simulasi obrolan",
      desc: "Latih kalimat pembukamu bareng peran orang tua, dosen, atau teman.",
      href: "/dashboard",
      icon: MessageCircle,
      auraImg: "/images/aura/aura-practice-talk.png",
    },
    {
      code: "04",
      title: "Support Pathway",
      subtitle: "Jalur bantuan nyata",
      desc: "Daftar kontak darurat, panduan Puskesmas BPJS, dan checklist bicara.",
      href: "/support",
      icon: Users,
      auraImg: "/images/aura/aura-rencana-dukungan.png",
    },
  ];

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

      {/* 2. Featured Cotton Story Card on the Desk */}
      {featuredCard && (
        <div className="cotton-sheet border-t-2 border-t-[#1E56A0] border border-[#9AC0EB] overflow-hidden">
          <div className="px-5 py-3 bg-[#F4F9FF] border-b border-[#C6DCF5] flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <span className="font-mono-num text-xs font-semibold px-2 py-0.5 rounded bg-[#DCEAFB] text-[#1E56A0] border border-[#9AC0EB]">
                KARTU AKTIF
              </span>
              <span className="text-xs font-semibold text-[#102542]">
                {featuredCard.title} ({featuredCard.targetPerson})
              </span>
            </div>
            <span className="settled-stamp">
              <Check className="w-3.5 h-3.5" />
              <span>Tersimpan di meja</span>
            </span>
          </div>

          <div className="p-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-8 space-y-2">
              <div className="text-xs text-[#516B8C]">Kalimat pembuka peganganmu:</div>
              <p className="text-sm font-medium text-[#102542] bg-[#E8F1FC]/70 p-3 rounded-lg border border-[#C6DCF5]">
                &ldquo;{featuredCard.openingLine}&rdquo;
              </p>
            </div>
            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-2">
              <Link
                href="/dashboard"
                className="letterpress-primary w-full inline-flex items-center justify-center py-2.5 px-4 text-xs"
              >
                Latih di Practice Talk
              </Link>
              <Link
                href="/journal"
                className="letterpress-cotton w-full inline-flex items-center justify-center py-2 px-4 text-xs"
              >
                Lihat semua kartu ({storyCards.length})
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 3. Empat Tahap Persiapan Bicara — Ruled Cotton Grid */}
      <div>
        <div className="mb-3">
          <h2 className="font-display-serif text-xl font-medium text-[#102542]">
            Empat tahap persiapan bicara
          </h2>
          <p className="text-xs text-[#516B8C]">
            Pilih tahap yang paling sesuai dengan kebutuhanmu hari ini.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {coreActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.code}
                href={action.href}
                className="cotton-sheet rounded-2xl p-4 hover:border-[#2E63D6] transition-colors flex flex-col justify-between group"
              >
                <div>
                  <div className="w-full h-28 rounded-xl overflow-hidden bg-[#EAF3FF] border border-[#BFD8F5] mb-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={action.auraImg}
                      alt={action.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono-num text-xs font-bold px-2 py-0.5 rounded bg-[#D6E9FF] text-[#2E63D6]">
                      Tahap {action.code}
                    </span>
                    <span className="text-[11px] font-medium text-[#516B8C]">
                      {action.subtitle}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <Icon className="w-4 h-4 text-[#2E63D6]" />
                    <h3 className="text-sm font-bold text-[#102542]">{action.title}</h3>
                  </div>
                  <p className="text-xs text-[#2B4566] leading-relaxed">
                    {action.desc}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-[#E8F1FC] text-xs font-semibold text-[#2E63D6] group-hover:underline">
                  Buka {action.title}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 4. Fitur Refleksi Pendukung */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/journal"
          className="cotton-sheet p-4 border border-[#9AC0EB] hover:bg-[#F4F9FF] transition-colors flex items-center gap-3 text-xs text-[#102542]"
        >
          <BookOpen className="w-4 h-4 text-[#1E56A0] shrink-0" />
          <div>
            <div className="font-bold">Jurnal Reflektif</div>
            <div className="text-[11px] text-[#516B8C]">Catatan pribadi di perangkatmu</div>
          </div>
        </Link>

        <Link
          href="/learning"
          className="cotton-sheet p-4 border border-[#9AC0EB] hover:bg-[#F4F9FF] transition-colors flex items-center gap-3 text-xs text-[#102542]"
        >
          <BookOpen className="w-4 h-4 text-[#1E56A0] shrink-0" />
          <div>
            <div className="font-bold">Ruang Belajar</div>
            <div className="text-[11px] text-[#516B8C]">Materi kelola emosi dan konflik</div>
          </div>
        </Link>

        <Link
          href="/growth-plan"
          className="cotton-sheet p-4 border border-[#9AC0EB] hover:bg-[#F4F9FF] transition-colors flex items-center gap-3 text-xs text-[#102542]"
        >
          <Sparkles className="w-4 h-4 text-[#1E56A0] shrink-0" />
          <div>
            <div className="font-bold">Rencana Langkah</div>
            <div className="text-[11px] text-[#516B8C]">Target kecil sesuai kesiapanmu</div>
          </div>
        </Link>
      </div>

      {/* 5. Emergency Helpline Footer Banner */}
      <div className="cotton-sheet p-4 border border-[#9AC0EB] text-xs text-[#2B4566] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <PhoneCall className="w-4 h-4 text-[#1A6B5A] shrink-0" />
          <span>
            Butuh bantuan darurat? Hubungi <strong>SEJIWA 119 ext 8</strong> atau <strong>SAPA 129</strong> (bebas pulsa 24 jam).
          </span>
        </div>
        <Link
          href="/support"
          className="text-xs font-semibold text-[#1E56A0] hover:underline whitespace-nowrap"
        >
          Lihat daftar kontak darurat
        </Link>
      </div>
    </div>
  );
}
