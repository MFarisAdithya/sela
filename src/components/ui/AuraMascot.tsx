"use client";

import React from "react";
import { Heart, Sparkles, Sprout, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export const AURA_POSES = [
  { id: "halo", label: "Halo!", src: "/images/aura/aura-pose-halo.png", desc: "Menyapa dengan ramah" },
  { id: "mendukungmu", label: "Mendukungmu", src: "/images/aura/aura-pose-mendukungmu.png", desc: "Menemani dengan empati" },
  { id: "membantu", label: "Membantu", src: "/images/aura/aura-pose-membantu.png", desc: "Merapikan ceritamu" },
  { id: "semangat", label: "Semangat!", src: "/images/aura/aura-pose-semangat.png", desc: "Memberi keberanian bicara" },
  { id: "menemanimu", label: "Menemanimu", src: "/images/aura/aura-pose-menemanimu.png", desc: "Ruang jeda yang tenang" },
] as const;

export const AURA_EXPRESSIONS = [
  { id: "senang", label: "Senang", src: "/images/aura/aura-exp-senang.png", reply: "Ikut senang melihatmu hari ini! Yuk simpan energi baik ini atau lanjutkan langkah kecilmu." },
  { id: "antusias", label: "Antusias", src: "/images/aura/aura-exp-antusias.png", reply: "Semangatmu menular! Ini waktu yang pas kalau kamu mau latihan bicara di Practice Talk." },
  { id: "penasaran", label: "Penasaran", src: "/images/aura/aura-exp-penasaran.png", reply: "Lagi memikirkan sesuatu? Kita bisa urai bareng-bareng di Guided Story." },
  { id: "tenang", label: "Tenang", src: "/images/aura/aura-exp-tenang.png", reply: "Syukurlah kalau hatimu sedang teduh. Nikmati ruang tenangmu hari ini ya." },
  { id: "terkejut", label: "Kewalahan", src: "/images/aura/aura-exp-terkejut.png", reply: "Tarik napas pelan-pelan dulu ya. Kamu nggak harus menyelesaikan semuanya sekaligus." },
  { id: "menghibur", label: "Butuh Teman", src: "/images/aura/aura-exp-menghibur.png", reply: "Aura di sini menemanimu. Kalau ada yang mengganjal, tulis saja pelan-pelan tanpa takut dihakimi." },
] as const;

export const AURA_PRODUCT_CARDS = {
  "chat-assistant": {
    title: "Aura Mendengarkan",
    subtitle: "Teman Refleksi & Menyimak Empatik",
    desc: "Aura duduk menyimak dengan empati sambil membawa buku catatan kecil. Kamu boleh bercerita pelan-pelan tanpa harus merangkai semuanya sekaligus.",
    src: "/images/aura/aura-mendengarkan.png",
  },
  "panduan-langkah": {
    title: "Panduan Langkah",
    subtitle: "Susun Kartu Cerita Bertahap",
    desc: "Ikuti 4 langkah ringan bersama Aura untuk merumuskan situasi, perasaan, kebutuhan, dan kalimat pembuka.",
    src: "/images/aura/aura-memandu.png",
  },
  "kartu-cerita": {
    title: "Aura Membantu Merangkum",
    subtitle: "Kartu Cerita Pribadi 4 Pilar",
    desc: "Aura memegang kartu putih-biru 4 pilar. Cerita yang awalnya terasa rumit mulai tersusun menjadi lebih jelas.",
    src: "/images/aura/aura-merangkum-kartu.png",
  },
  "jurnal-reflektif": {
    title: "Aura Menulis",
    subtitle: "Jurnal Reflektif & Kontemplasi",
    desc: "Aura duduk tenang sambil menulis di jurnal kecil. Menuangkan pikiran dengan teduh dan tanpa tergesa-gesa.",
    src: "/images/aura/aura-menulis-jurnal.png",
  },
  progress: {
    title: "Progress & Pencapaian",
    subtitle: "Langkah Kecil yang Berarti",
    desc: "Pantau perkembangan keberanian bicaramu dan target langkah kecil harian tanpa tekanan.",
    src: "/images/aura/aura-progress.png",
  },
  "materi-edukasi": {
    title: "Aura Belajar",
    subtitle: "Ruang Belajar & Refleksi Mandiri",
    desc: "Aura membaca buku terbuka dengan bintang kecil di atas kepalanya. Hal-hal kecil tentang menghadapi orang lain dan memahami diri.",
    src: "/images/aura/aura-ruang-belajar.png",
  },
  "practice-talk": {
    title: "Aura Berlatih Berbicara",
    subtitle: "Simulasi Latihan Percakapan Terpandu",
    desc: "Aura menghadap dua gelembung percakapan dengan fokus hangat. Uji kalimatmu sebelum benar-benar berbicara dengan seseorang.",
    src: "/images/aura/aura-berlatih-bicara.png",
  },
  "rencana-dukungan": {
    title: "Aura Menunjukkan Jalan",
    subtitle: "Peta Jalur Dukungan Nyata",
    desc: "Aura memegang peta dengan jalur dan penanda lokasi. Membantu pengguna memahami pilihan untuk mencari dukungan di dunia nyata.",
    src: "/images/aura/aura-menunjukkan-jalan.png",
  },
} as const;

export type AuraProductKey = keyof typeof AURA_PRODUCT_CARDS;

export const AuraAvatar: React.FC<{
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}> = ({ size = "sm", className }) => {
  const dims = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-11 h-11",
    lg: "w-14 h-14",
  };
  return (
    <div
      className={cn(
        "relative rounded-full overflow-hidden border border-[#9AC0EB] bg-[#F4F8FF] shrink-0 shadow-sm flex items-center justify-center",
        dims[size],
        className
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/aura/aura-avatar.png"
        alt="Aura — Maskot SELA.AI"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export const AuraModuleHeader: React.FC<{
  productKey: AuraProductKey;
  eyebrow: string;
  title: string;
  description: string;
  rightSlot?: React.ReactNode;
}> = ({ productKey, eyebrow, title, description, rightSlot }) => {
  const card = AURA_PRODUCT_CARDS[productKey];
  return (
    <div className="cotton-sheet rounded-3xl p-4 sm:p-6 border border-[#BFD8F5] bg-gradient-to-r from-[#FAFDFE] via-[#F4F8FF] to-[#E8F2FF]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-[#BFD8F5] bg-[#FAFDFE] shrink-0 shadow-sm flex items-center justify-center p-1.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={card.src}
              alt={card.title}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <span className="font-mono-num text-[11px] font-semibold text-[#2E63D6] px-2.5 py-0.5 rounded-full bg-[#D6E9FF] border border-[#9AC0EB]">
              {eyebrow}
            </span>
            <h1 className="font-serif-display text-xl sm:text-3xl font-medium text-[#102542] tracking-tight mt-1.5">
              {title}
            </h1>
            <p className="text-xs sm:text-sm text-[#35527A] mt-0.5 max-w-xl">
              {description}
            </p>
          </div>
        </div>
        {rightSlot && <div className="shrink-0">{rightSlot}</div>}
      </div>
    </div>
  );
};

export const AuraShowcaseSection: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const traits = [
    { icon: Heart, label: "Ramah & menenangkan", color: "text-[#E15B8C] bg-[#FFE9F1]" },
    { icon: Sparkles, label: "Selalu mendukung", color: "text-[#D9822B] bg-[#FFD8BB]/60" },
    { icon: Sprout, label: "Simbol pertumbuhan", color: "text-[#0F6E56] bg-[#C7EAD9]/70" },
    { icon: ShieldCheck, label: "Memberikan rasa aman", color: "text-[#2E63D6] bg-[#D6E9FF]" },
  ];

  return (
    <div className="space-y-8">
      {/* Main Aura Introduction Card */}
      <div className="cotton-sheet rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#BFD8F5] bg-gradient-to-br from-[#F4F8FF] via-[#FAFDFE] to-[#D6E9FF]/60 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Aura Info & 4 Traits */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D6E9FF] border border-[#9AC0EB] text-xs font-semibold text-[#2E63D6] mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Maskot Pendamping SELA.AI</span>
              </div>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-medium text-[#102542] tracking-tight">
                Kenalan dengan <span className="italic text-[#2E63D6]">Aura</span>
              </h2>
              <p className="text-sm font-semibold text-[#2E63D6] mt-1">
                Si Cahaya Kecil dari SELA.AI
              </p>
              <p className="mt-3 text-sm sm:text-base text-[#35527A] leading-relaxed">
                Aura adalah teman yang selalu mendengarkan, mendampingi, dan memberi cahaya harapan untuk setiap langkah persiapan obrolanmu.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {traits.map((t, idx) => {
                const Icon = t.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-[#FAFDFE] border border-[#BFD8F5] shadow-sm"
                  >
                    <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center shrink-0", t.color)}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-[#102542]">{t.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: 5 Variasi Pose & 6 Ekspresi Wajah */}
          <div className="lg:col-span-7 space-y-4">
            {/* Variasi Pose */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAFDFE] border border-[#BFD8F5] shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-[#2E63D6] px-2.5 py-0.5 rounded-full bg-[#D6E9FF]">
                  Variasi Pose Aura
                </span>
                <span className="text-[11px] text-[#5B789E]">Menemani di setiap tahap</span>
              </div>
              <div className="grid grid-cols-5 gap-2 sm:gap-3">
                {AURA_POSES.map((pose) => (
                  <div key={pose.id} className="flex flex-col items-center text-center group">
                    <div className="w-full aspect-square rounded-2xl overflow-hidden bg-[#F4F8FF] border border-[#D6E9FF] p-1 group-hover:border-[#6BA8FF] transition-colors">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={pose.src}
                        alt={pose.label}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <span className="text-[11px] font-bold text-[#102542] mt-1.5">{pose.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ekspresi Wajah */}
            {!compact && (
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FAFDFE] border border-[#BFD8F5] shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-[#2E63D6] px-2.5 py-0.5 rounded-full bg-[#D6E9FF]">
                    Ekspresi Wajah Aura
                  </span>
                  <span className="text-[11px] text-[#5B789E]">Hangat, ekspresif, dan empatik</span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-2.5">
                  {AURA_EXPRESSIONS.map((exp) => (
                    <div key={exp.id} className="flex flex-col items-center text-center">
                      <div className="w-full aspect-square rounded-xl overflow-hidden bg-[#F4F8FF] border border-[#D6E9FF] p-1">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={exp.src}
                          alt={exp.label}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="text-[11px] font-semibold text-[#35527A] mt-1">{exp.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
