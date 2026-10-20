"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MessageSquareHeart,
  PenLine,
  GraduationCap,
  Users,
  ArrowRight,
  RotateCcw,
  Shield,
  Frown,
  Meh,
  Smile,
  HeartCrack,
  Sparkles,
} from "lucide-react";
import { NeuCard } from "@/components/ui/NeuCard";
import { NeuButton } from "@/components/ui/NeuButton";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

type MoodType = "sangat-sedih" | "sedih" | "biasa" | "senang" | "bersemangat";

interface MoodOption {
  id: MoodType;
  label: string;
  icon: React.ReactNode;
  note: string;
}

const moodOptions: MoodOption[] = [
  {
    id: "sangat-sedih",
    label: "Sangat sedih",
    icon: <HeartCrack className="w-5 h-5 text-rose-500" />,
    note: "Kamu boleh mengambil jeda. Tarik napas perlahan dan jangan memaksakan diri menyelesaikan semuanya hari ini.",
  },
  {
    id: "sedih",
    label: "Sedih / Lelah",
    icon: <Frown className="w-5 h-5 text-amber-600" />,
    note: "Perasaan lelah itu wajar. Pertimbangkan untuk beristirahat atau menuliskan apa yang terasa mengganjal.",
  },
  {
    id: "biasa",
    label: "Biasa saja",
    icon: <Meh className="w-5 h-5 text-brand-600" />,
    note: "Hari yang tenang. Kamu bisa membaca modul singkat atau menuliskan hal kecil yang kamu perhatikan hari ini.",
  },
  {
    id: "senang",
    label: "Cukup baik",
    icon: <Smile className="w-5 h-5 text-teal-600" />,
    note: "Senang mendengarnya. Kamu bisa memanfaatkan energi ini untuk latihan komunikasi atau menentukan rencana kecil.",
  },
  {
    id: "bersemangat",
    label: "Bersemangat",
    icon: <Sparkles className="w-5 h-5 text-indigo-600" />,
    note: "Energi yang baik. Ini waktu yang tepat untuk menyelesaikan satu langkah di rencana bertumbuh.",
  },
];

export default function DashboardPage() {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>("biasa");
  const [userName] = useState("Alex");

  const currentMoodObj = moodOptions.find((m) => m.id === selectedMood);

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-2">
      {/* Top Greeting & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border-subtle/80 pb-5">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
            Beranda Pengguna
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-900 tracking-tight mt-0.5">
            Apa kabar, {userName}?
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="demo" dot size="sm">
            Mode Demo
          </Badge>
          <span className="text-xs text-text-muted hidden sm:inline">
            Data tersimpan di sesi ini
          </span>
        </div>
      </div>

      {/* Mood Check-In Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-brand-900 uppercase tracking-wider">
              Check-in emosi
            </h2>
            <p className="text-xs text-text-muted mt-0.5">
              Pilih yang paling menggambarkan keadaanmu saat ini.
            </p>
          </div>
          {selectedMood && (
            <button
              onClick={() => setSelectedMood(null)}
              className="text-[11px] text-text-muted hover:text-brand-900 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* 5 Mood Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {moodOptions.map((mood) => {
            const isSelected = selectedMood === mood.id;
            return (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood.id)}
                className={cn(
                  "p-3 rounded-2xl flex flex-col items-center justify-center text-center gap-2 transition-all duration-150 min-h-[72px]",
                  "border focus:outline-none focus:ring-2 focus:ring-brand-500",
                  isSelected
                    ? "bg-brand-100/90 border-brand-400 shadow-neu-inset text-brand-900 font-semibold"
                    : "bg-surface border-border-subtle shadow-neu-raised-sm hover:shadow-neu-raised hover:border-brand-200 text-text-main"
                )}
                aria-pressed={isSelected}
              >
                <div className="p-1 rounded-xl bg-surface-inset shadow-neu-inset">
                  {mood.icon}
                </div>
                <span className="text-xs leading-tight">{mood.label}</span>
              </button>
            );
          })}
        </div>

        {/* Gentle Contextual Note based on selection */}
        {currentMoodObj && (
          <NeuCard variant="inset" className="p-4 flex items-start gap-3 bg-surface-inset/80">
            <div className="p-1.5 rounded-xl bg-surface shadow-neu-raised-sm shrink-0 mt-0.5">
              {currentMoodObj.icon}
            </div>
            <div className="space-y-0.5 text-left">
              <span className="text-xs font-bold text-brand-900">
                Langkah kecil yang bisa kamu ambil
              </span>
              <p className="text-xs text-text-muted leading-relaxed">
                {currentMoodObj.note}
              </p>
            </div>
          </NeuCard>
        )}
      </section>

      {/* Main Action Shortcuts - 4 Focused Functional Cards */}
      <section className="space-y-3">
        <h2 className="text-sm font-bold text-brand-900 uppercase tracking-wider">
          Pilihan tindakan
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Action 1: Safe Story */}
          <Link href="/safe-story" className="block group">
            <NeuCard
              variant="raised"
              interactive
              className="p-4 sm:p-5 h-full flex flex-col justify-between space-y-3 border border-border-subtle"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center shadow-neu-inset">
                  <MessageSquareHeart className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold text-brand-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Buka &rarr;
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-brand-900">Mulai bercerita</h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  Ruang refleksi awal berbasis materi terverifikasi untuk mengurai pikiranmu.
                </p>
              </div>
            </NeuCard>
          </Link>

          {/* Action 2: Reflection Journal */}
          <Link href="/journal" className="block group">
            <NeuCard
              variant="raised"
              interactive
              className="p-4 sm:p-5 h-full flex flex-col justify-between space-y-3 border border-border-subtle"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center shadow-neu-inset">
                  <PenLine className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold text-brand-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Buka &rarr;
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-brand-900">Catatan pribadi</h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  Tuliskan perasaan atau refleksi harianmu secara privat tanpa penilaian.
                </p>
              </div>
            </NeuCard>
          </Link>

          {/* Action 3: Ruang Belajar */}
          <Link href="/learning" className="block group">
            <NeuCard
              variant="raised"
              interactive
              className="p-4 sm:p-5 h-full flex flex-col justify-between space-y-3 border border-border-subtle"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shadow-neu-inset">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold text-brand-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Buka &rarr;
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-brand-900">Ruang belajar</h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  Modul singkat seputar komunikasi asertif, regulasi emosi, dan resiliensi.
                </p>
              </div>
            </NeuCard>
          </Link>

          {/* Action 4: Peta Dukungan */}
          <Link href="/support" className="block group">
            <NeuCard
              variant="raised"
              interactive
              className="p-4 sm:p-5 h-full flex flex-col justify-between space-y-3 border border-border-subtle"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shadow-neu-inset">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold text-brand-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Buka &rarr;
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-brand-900">Peta dukungan</h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  Petakan lingkaran orang terdekat yang dapat kamu ajak bicara saat membutuhkan.
                </p>
              </div>
            </NeuCard>
          </Link>
        </div>
      </section>

      {/* Safety Notice Footer Card */}
      <NeuCard variant="flat" className="p-4 bg-surface/60 border border-border-subtle/80 flex items-start gap-3">
        <Shield className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
        <div className="text-xs text-text-muted leading-relaxed">
          <strong className="text-brand-900 font-semibold">Pemberitahuan:</strong> Platform ini bukan layanan krisis atau pengganti konsultasi psikologis klinis. Jika kamu berada dalam situasi mendesak, silakan hubungi orang terpercaya atau{" "}
          <Link href="/referrals" className="text-brand-700 hover:text-brand-900 font-medium underline underline-offset-2">
            cari pendamping manusia
          </Link>.
        </div>
      </NeuCard>
    </div>
  );
}
