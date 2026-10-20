"use client";

import React from "react";
import Link from "next/link";
import {
  MessageSquareHeart,
  PenLine,
  GraduationCap,
  Users,
  Sparkles,
  ArrowRight,
  Smile,
  Meh,
  Frown,
  Heart,
  TrendingUp,
} from "lucide-react";
import { NeuCard } from "@/components/ui/NeuCard";
import { NeuButton } from "@/components/ui/NeuButton";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useApp } from "@/context/AppContext";

const moodOptions = [
  { id: "sangat-sedih", label: "Sangat Sedih", icon: Frown, color: "text-rose-500", bg: "bg-rose-50" },
  { id: "sedih", label: "Sedih", icon: Frown, color: "text-amber-600", bg: "bg-amber-50" },
  { id: "biasa", label: "Biasa Saja", icon: Meh, color: "text-slate-600", bg: "bg-slate-50" },
  { id: "senang", label: "Senang", icon: Smile, color: "text-teal-600", bg: "bg-teal-50" },
  { id: "sangat-senang", label: "Bersemangat", icon: Sparkles, color: "text-brand-600", bg: "bg-brand-50" },
];

const moodRecommendations: Record<string, { advice: string; ctaText: string; ctaHref: string }> = {
  "sangat-sedih": {
    advice: "Wajar merasa berat hari ini. Kamu tidak harus memikul semuanya sekaligus. Ambil jeda 5 menit untuk bernapas perlahan, atau tuangkan uneg-unegmu di Jurnal Reflektif.",
    ctaText: "Tulis di Jurnal Reflektif",
    ctaHref: "/journal",
  },
  "sedih": {
    advice: "Perasaanmu valid dan berhak didengarkan. Jika kamu butuh tempat yang aman untuk mengurai apa yang terasa mengganjal, Safe Story AI siap menemani.",
    ctaText: "Mulai Safe Story AI",
    ctaHref: "/safe-story",
  },
  "biasa": {
    advice: "Hari yang tenang adalah kesempatan baik untuk merawat diri. Kamu bisa mengeksplorasi modul komunikasi asertif atau memeriksa peta orang terpercayamu.",
    ctaText: "Buka Ruang Belajar",
    ctaHref: "/learning",
  },
  "senang": {
    advice: "Senang mendengar energimu hari ini! Pertahankan ritme ini dan catat satu hal kecil yang membuatmu bersyukur agar tetap teringat di hari lain.",
    ctaText: "Catat Hal Baik di Jurnal",
    ctaHref: "/journal",
  },
  "sangat-senang": {
    advice: "Energi positifmu luar biasa! Ini saat yang tepat untuk menyelesaikan langkah bertumbuh mingguanmu atau menyapa teman terdekat.",
    ctaText: "Cek Rencana Bertumbuh",
    ctaHref: "/growth-plan",
  },
};

export default function DashboardPage() {
  const { userName, currentMood, setCurrentMood, completedModules } = useApp();

  const activeMoodInfo = currentMood ? moodRecommendations[currentMood] : moodRecommendations["biasa"];

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Selamat datang kembali</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-900 tracking-tight">
            Hai, {userName || "Alex"}! 👋
          </h1>
          <p className="text-xs sm:text-sm text-text-muted">
            Bagaimana perasaanmu saat ini? Semua yang kamu rasakan berharga.
          </p>
        </div>

        <Link href="/referrals">
          <NeuButton size="sm" variant="secondary" leftIcon={<Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" />}>
            Bantuan Pendamping
          </NeuButton>
        </Link>
      </div>

      {/* Mood Check-In Card */}
      <NeuCard variant="raised" className="p-5 sm:p-6 space-y-5 bg-surface">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-brand-900 uppercase tracking-wider">
            Check-in Emosi Harian
          </h2>
          <span className="text-[11px] text-text-muted">Bisa diperbarui kapan saja</span>
        </div>

        {/* 5 Mood Selector Buttons */}
        <div className="grid grid-cols-5 gap-2 sm:gap-4">
          {moodOptions.map((mood) => {
            const Icon = mood.icon;
            const isSelected = currentMood === mood.id;

            return (
              <button
                key={mood.id}
                onClick={() => setCurrentMood(mood.id)}
                className={`flex flex-col items-center justify-center p-2.5 sm:p-4 rounded-2xl transition-all duration-150 min-h-[72px] sm:min-h-[88px] ${
                  isSelected
                    ? "bg-brand-100/90 shadow-neu-inset border-2 border-brand-500 scale-[1.02]"
                    : "bg-surface shadow-neu-raised-sm hover:shadow-neu-raised border border-border-subtle/80 hover:-translate-y-0.5"
                }`}
                aria-pressed={isSelected}
              >
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center ${mood.bg} ${mood.color} mb-1 sm:mb-2 shadow-sm`}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-text-main text-center leading-tight">
                  {mood.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Contextual Gentle Step Advice */}
        {activeMoodInfo && (
          <div className="p-4 rounded-xl bg-surface-inset shadow-neu-inset border border-border-subtle/80 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-brand-900">
                Langkah Kecil untuk Dirimu Hari Ini:
              </span>
              <Badge variant="info" size="sm">
                Rekomendasi Lembut
              </Badge>
            </div>
            <p className="text-xs text-text-main leading-relaxed">
              {activeMoodInfo.advice}
            </p>
            <div className="pt-1">
              <Link href={activeMoodInfo.ctaHref}>
                <NeuButton size="sm" variant="secondary" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  {activeMoodInfo.ctaText}
                </NeuButton>
              </Link>
            </div>
          </div>
        )}
      </NeuCard>

      {/* 4 Core Action Cards (2x2 Grid) */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold text-brand-900 uppercase tracking-wider px-1">
          Akses Cepat Pendampingan
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Card 1: Safe Story AI */}
          <Link href="/safe-story" className="group">
            <NeuCard variant="raised-sm" interactive className="p-5 h-full space-y-3 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center shadow-neu-inset">
                  <MessageSquareHeart className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-brand-900 group-hover:text-brand-700 transition-colors">
                  Cerita Sekarang (Safe Story AI)
                </h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  Ngobrol dengan AI reflektif yang aman, empatik, dan bebas penilaian untuk mengurai pikiranmu.
                </p>
              </div>
              <div className="flex items-center text-xs font-semibold text-brand-700 pt-2">
                <span>Buka Percakapan</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </NeuCard>
          </Link>

          {/* Card 2: Jurnal Reflektif */}
          <Link href="/journal" className="group">
            <NeuCard variant="raised-sm" interactive className="p-5 h-full space-y-3 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center shadow-neu-inset">
                  <PenLine className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-brand-900 group-hover:text-brand-700 transition-colors">
                  Jurnal Reflektif
                </h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  Tuliskan perasaan, rasa syukur, atau peristiwa harianmu secara privat di perangkatmu.
                </p>
              </div>
              <div className="flex items-center text-xs font-semibold text-brand-700 pt-2">
                <span>Tulis Jurnal</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </NeuCard>
          </Link>

          {/* Card 3: Ruang Belajar */}
          <Link href="/learning" className="group">
            <NeuCard variant="raised-sm" interactive className="p-5 h-full space-y-3 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-800 flex items-center justify-center shadow-neu-inset">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-brand-900 group-hover:text-brand-700 transition-colors">
                  Ruang Belajar & Modul
                </h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  Pelajari modul pengembangan diri, komunikasi asertif, resiliensi, dan kesiapan masa depan.
                </p>
              </div>
              <div className="flex items-center text-xs font-semibold text-brand-700 pt-2">
                <span>Jelajahi Modul ({completedModules.length}/5 Selesai)</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </NeuCard>
          </Link>

          {/* Card 4: Peta Dukungan */}
          <Link href="/support" className="group">
            <NeuCard variant="raised-sm" interactive className="p-5 h-full space-y-3 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shadow-neu-inset">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-brand-900 group-hover:text-brand-700 transition-colors">
                  Peta Dukungan Sosial
                </h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  Kenali orang-orang di sekitarmu yang bisa menjadi support system aman saat kamu butuh teman bicara.
                </p>
              </div>
              <div className="flex items-center text-xs font-semibold text-brand-700 pt-2">
                <span>Lihat Support System</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </NeuCard>
          </Link>
        </div>
      </div>

      {/* Featured Weekly Growth Teaser */}
      <NeuCard variant="raised-sm" className="p-5 bg-gradient-to-r from-surface to-brand-50/50 border border-brand-200/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Badge variant="verified" size="sm">
                Target Bertumbuh
              </Badge>
              <span className="text-xs text-text-muted">Minggu ke-2</span>
            </div>
            <h3 className="text-sm font-bold text-brand-900">
              Bangun Rasa Percaya Diri & Ketangguhan Emosional
            </h3>
            <p className="text-xs text-text-muted">
              Kamu telah menyelesaikan 2 dari 4 target mingguan. Langkah kecilmu hari ini sangat berarti!
            </p>
          </div>

          <div className="shrink-0">
            <Link href="/growth-plan">
              <NeuButton size="sm" variant="primary" rightIcon={<TrendingUp className="w-3.5 h-3.5" />}>
                Lihat Rencana Bertumbuh
              </NeuButton>
            </Link>
          </div>
        </div>
      </NeuCard>
    </div>
  );
}
