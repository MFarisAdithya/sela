"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  MessageSquareHeart,
  MessageCircle,
  Users,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  PhoneCall,
  Sparkles,
  Lock,
  Plus,
  Compass,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useApp } from "@/context/AppContext";
import { greetingFor } from "@/lib/copy";

export default function AppDashboardPage() {
  const { user } = useAuth();
  const { currentMood, setCurrentMood } = useApp();
  const [greeting, setGreeting] = useState("Hai");
  const [stepDismissed, setStepDismissed] = useState(false);

  const displayName = user?.displayName || "Kawan";

  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(greetingFor(hour));
  }, []);

  const coreActions = [
    {
      title: "Guided Story",
      subtitle: "Susun Ceritaku",
      desc: "Uraikan apa yang mengganjal lewat pertanyaan bertahap tanpa paksaan.",
      href: "/safe-story",
      icon: MessageSquareHeart,
      badge: "Langkah 1",
      badgeColor: "bg-[#EBF3FF] text-[#2457A7]",
    },
    {
      title: "Kartu Cerita",
      subtitle: "Rapikan Catatan",
      desc: "Lihat dan kelola draf ringkasan cerita yang siap dibagikan.",
      href: "/journal",
      icon: Compass,
      badge: "Langkah 2",
      badgeColor: "bg-[#EBF3FF] text-[#2457A7]",
    },
    {
      title: "Practice Talk",
      subtitle: "Latihan Bicara",
      desc: "Simulasikan percakapan dengan teman atau guru BK sebelum bicara sungguhan.",
      href: "/dashboard",
      icon: MessageCircle,
      badge: "Langkah 3",
      badgeColor: "bg-[#EBF3FF] text-[#2457A7]",
    },
    {
      title: "Support Pathway",
      subtitle: "Cari Dukungan",
      desc: "Temukan pilihan bantuan nyata dan checklist persiapan bicara tanpa biaya.",
      href: "/support",
      icon: Users,
      badge: "Langkah 4",
      badgeColor: "bg-[#E6F4EA] text-[#1F7A65]",
    },
  ];

  return (
    <div className="space-y-8 py-2 animate-in fade-in duration-150 text-[#17365D]">
      {/* 1. Header Greeting & Status Paket */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-border-subtle/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#17365D]">
            {greeting}, {displayName}
          </h1>
          <p className="mt-1 text-sm text-[#17365D]/75">
            Ruang tenang untuk merapikan pikiran dan menyiapkan langkahmu berikutnya.
          </p>
        </div>

        {/* Plan Status Pill */}
        <div className="flex items-center gap-3">
          <Link
            href="/app/paket"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7FAFF] border border-[#CCE1FF] text-xs font-semibold text-[#17365D] hover:border-[#2457A7] transition-colors shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#1F7A65]" />
            <span>Paket {user?.plan === "premium" ? "Premium Aktif" : "Free"}</span>
            <span className="text-[11px] text-[#2457A7] font-bold">Kelola →</span>
          </Link>
        </div>
      </div>

      {/* 2. Rekomendasi Langkah Kecil (Dapat Ditutup) */}
      {!stepDismissed && (
        <div className="p-4 sm:p-5 rounded-3xl bg-[#F7FAFF] border border-[#CCE1FF] shadow-sm flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-2xl bg-[#EBF3FF] text-[#2457A7] flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <h2 className="text-sm font-bold text-[#17365D]">
                Rekomendasi Langkah Hari Ini:
              </h2>
              <p className="text-xs sm:text-sm text-[#17365D]/80 leading-relaxed">
                Luangkan 3 menit untuk menguraikan situasi yang sedang kamu pikirkan melalui <strong>Guided Story</strong>, atau simpan satu kalimat pembuka di <strong>Practice Talk</strong>.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setStepDismissed(true)}
            className="text-xs text-[#17365D]/50 hover:text-[#17365D] p-1 shrink-0"
            aria-label="Tutup rekomendasi"
          >
            ✕
          </button>
        </div>
      )}

      {/* 3. Empat Aksi Inti (Four-Pillar Experience) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-[#17365D]">Alur Navigasi Bantuan</h2>
            <p className="text-xs text-[#17365D]/70">Pilih tahapan yang paling sesuai dengan kesiapanmu.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {coreActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                href={action.href}
                className="p-6 rounded-3xl bg-[#F7FAFF] border border-[#CCE1FF] shadow-[5px_5px_14px_rgba(164,188,224,0.3),-5px_-5px_14px_rgba(255,255,255,0.9)] hover:border-[#2457A7] transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-[#E3EEFF] text-[#2457A7] flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${action.badgeColor}`}>
                      {action.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#17365D] mb-1">
                    {action.subtitle}
                  </h3>
                  <p className="text-xs text-[#2457A7] font-semibold uppercase tracking-wider mb-2">
                    {action.title}
                  </p>
                  <p className="text-xs sm:text-sm text-[#17365D]/75 leading-relaxed">
                    {action.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#CCE1FF]/50 flex items-center justify-between text-xs font-semibold text-[#2457A7]">
                  <span>Mulai langkah ini</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 4. Fitur Refleksi Pendukung */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border-subtle/80">
        <Link
          href="/journal"
          className="p-4 rounded-2xl bg-white border border-[#CCE1FF] hover:border-[#2457A7] transition-all flex items-center gap-3 text-xs text-[#17365D]"
        >
          <BookOpen className="w-4 h-4 text-[#2457A7] shrink-0" />
          <div>
            <div className="font-bold">Jurnal Reflektif</div>
            <div className="text-[11px] text-[#17365D]/65">Catatan pribadi tersimpan lokal</div>
          </div>
        </Link>

        <Link
          href="/learning"
          className="p-4 rounded-2xl bg-white border border-[#CCE1FF] hover:border-[#2457A7] transition-all flex items-center gap-3 text-xs text-[#17365D]"
        >
          <BookOpen className="w-4 h-4 text-[#2457A7] shrink-0" />
          <div>
            <div className="font-bold">Ruang Belajar</div>
            <div className="text-[11px] text-[#17365D]/65">Modul keterampilan hidup &amp; regulasi</div>
          </div>
        </Link>

        <Link
          href="/growth-plan"
          className="p-4 rounded-2xl bg-white border border-[#CCE1FF] hover:border-[#2457A7] transition-all flex items-center gap-3 text-xs text-[#17365D]"
        >
          <Sparkles className="w-4 h-4 text-[#2457A7] shrink-0" />
          <div>
            <div className="font-bold">Rencana Langkah</div>
            <div className="text-[11px] text-[#17365D]/65">Target kecil sukarela tanpa beban</div>
          </div>
        </Link>
      </div>

      {/* 5. Emergency Helpline Footer Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#EBF3FF] border border-[#CCE1FF] text-xs text-[#17365D]/85 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <PhoneCall className="w-4 h-4 text-[#2457A7] shrink-0" />
          <span>
            Sedang dalam krisis mendesak? Hubungi Hotline Kemenkes <strong>119 ext 8 (SEJIWA)</strong> atau <strong>SAPA 129</strong>. Bebas pulsa 24 jam.
          </span>
        </div>
        <Link
          href="/support"
          className="text-xs font-bold text-[#2457A7] hover:underline whitespace-nowrap"
        >
          Lihat Jalur Bantuan →
        </Link>
      </div>
    </div>
  );
}
