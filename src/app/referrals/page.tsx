"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  PhoneCall,
  UserCheck,
  ShieldAlert,
  Building,
  HeartHandshake,
  CheckCircle2,
  Lock,
  ArrowRight,
  LifeBuoy,
} from "lucide-react";
import { NeuCard } from "@/components/ui/NeuCard";
import { NeuButton } from "@/components/ui/NeuButton";
import { NeuTextarea } from "@/components/ui/NeuInput";
import { Badge } from "@/components/ui/Badge";
import { useApp } from "@/context/AppContext";

const companionTypes = [
  {
    id: "guru_bk",
    title: "Guru Bimbingan Konseling (BK)",
    desc: "Pendampingan terkait tantangan belajar di sekolah, interaksi dengan teman, atau pilihan masa depan.",
    icon: Building,
    badge: "Lingkungan Sekolah",
  },
  {
    id: "konselor_sebaya",
    title: "Konselor Sebaya (PIK-R / Forum Genre)",
    desc: "Teman sebaya seusiamu yang terlatih untuk mendengarkan curahan hati tanpa rasa canggung atau menghakimi.",
    icon: HeartHandshake,
    badge: "Komunitas Remaja",
  },
  {
    id: "psikolog",
    title: "Psikolog Klinis / Puskesmas",
    desc: "Tenaga profesional kesehatan mental untuk evaluasi psikologis mendalam dan pendampingan terapeutik.",
    icon: UserCheck,
    badge: "Layanan Kesehatan",
  },
  {
    id: "uptd_ppa",
    title: "Layanan Perlindungan Remaja (UPTD PPA)",
    desc: "Bantuan dan advokasi hukum serta perlindungan aman bagi korban kekerasan fisik, verbal, atau pelecehan.",
    icon: ShieldAlert,
    badge: "Perlindungan Resmi",
  },
];

export default function ReferralsPage() {
  const { userName, referralTickets, addReferralTicket } = useApp();

  const [selectedRole, setSelectedRole] = useState("konselor_sebaya");
  const [shareName, setShareName] = useState(true);
  const [shareAge, setShareAge] = useState(true);
  const [shareSummary, setShareSummary] = useState(true);
  const [userNote, setUserNote] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [latestTicketId, setLatestTicketId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedCompanion = companionTypes.find((c) => c.id === selectedRole)?.title || "Konselor Sebaya";

    const sharedFields = [];
    if (shareName) sharedFields.push(`Nama Samaran: ${userName || "Alex"}`);
    if (shareAge) sharedFields.push("Rentang Usia: 18–21 tahun");
    if (shareSummary) sharedFields.push("Ringkasan Kebutuhan Emosi");

    addReferralTicket({
      targetRole: selectedCompanion,
      sharedFields,
      summaryNote: userNote.trim() || "Membutuhkan teman bicara untuk penguatan emosional dan arahan.",
    });

    const ticketCode = "TKT-" + Math.floor(1000 + Math.random() * 9000);
    setLatestTicketId(ticketCode);
    setIsSuccess(true);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-300 pb-8">
      {/* Header Banner */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700">
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Layanan Human-in-the-Loop</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-900 tracking-tight">
          Hubungi Pendamping Manusia
        </h1>
        <p className="text-xs sm:text-sm text-text-muted">
          AI adalah jembatan awal. Jika kamu memerlukan ruang dengar yang lebih dalam, kamu dapat terhubung dengan pendamping manusia terpercaya.
        </p>
      </div>

      {/* Prototype Status Disclaimer */}
      <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-300 text-amber-950 space-y-1.5 shadow-sm">
        <div className="flex items-center gap-2">
          <Badge variant="prototype" size="sm">
            Simulasi Alur Rujukan
          </Badge>
          <span className="text-xs font-bold text-amber-900">
            Penafian Prototipe Kompetisi
          </span>
        </div>
        <p className="text-xs leading-relaxed text-amber-900/90">
          Formulir ini merupakan simulasi arsitektur rujukan etis. Data tidak dikirim ke pihak luar secara nyata tanpa kesepakatan integrasi resmi (MOU) dengan instansi terkait di wilayah Anda.
        </p>
      </div>

      {isSuccess ? (
        /* Success Confirmation Card */
        <NeuCard variant="raised" className="p-6 sm:p-8 text-center space-y-5 bg-surface animate-in zoom-in-95">
          <div className="w-14 h-14 mx-auto rounded-3xl bg-teal-100 text-teal-800 flex items-center justify-center shadow-neu-inset">
            <CheckCircle2 className="w-8 h-8 text-teal-600" />
          </div>

          <div className="space-y-2">
            <Badge variant="success" size="md">
              Tiket Rujukan Dibuat (Simulasi)
            </Badge>
            <h2 className="text-xl font-bold text-brand-900">
              Permintaan Pendampingan Diterima
            </h2>
            <p className="text-xs text-text-muted max-w-md mx-auto leading-relaxed">
              Kode Tiket: <strong className="text-brand-900 font-mono text-sm">{latestTicketId}</strong>
              <br />
              Pendamping yang kamu pilih akan menerima ringkasan izin yang kamu setujui. Catatan lengkap chat privatmu tidak pernah dikirimkan secara mentah.
            </p>
          </div>

          <div className="pt-2 flex justify-center gap-3">
            <NeuButton
              variant="secondary"
              size="sm"
              onClick={() => {
                setIsSuccess(false);
                setUserNote("");
              }}
            >
              Buat Tiket Baru
            </NeuButton>

            <Link href="/dashboard">
              <NeuButton variant="primary" size="sm">
                Kembali ke Beranda
              </NeuButton>
            </Link>
          </div>
        </NeuCard>
      ) : (
        /* Referral Request Form */
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Choose Companion Type */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold text-brand-900 uppercase tracking-wider px-1">
              1. Pilih Jenis Pendamping yang Kamu Butuhkan
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {companionTypes.map((comp) => {
                const Icon = comp.icon;
                const isSelected = selectedRole === comp.id;

                return (
                  <div
                    key={comp.id}
                    onClick={() => setSelectedRole(comp.id)}
                    className={`p-4 rounded-2xl cursor-pointer transition-all duration-150 flex flex-col justify-between space-y-3 ${
                      isSelected
                        ? "bg-brand-100/90 shadow-neu-inset border-2 border-brand-500"
                        : "bg-surface shadow-neu-raised-sm hover:shadow-neu-raised border border-border-subtle hover:-translate-y-0.5"
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                            isSelected ? "bg-brand-600 text-white" : "bg-surface-inset text-brand-700"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <Badge variant="info" size="sm">
                          {comp.badge}
                        </Badge>
                      </div>

                      <h3 className="text-sm font-bold text-brand-900 leading-tight">
                        {comp.title}
                      </h3>
                      <p className="text-xs text-text-muted leading-relaxed">
                        {comp.desc}
                      </p>
                    </div>

                    <div className="text-[11px] font-semibold text-brand-700 pt-1">
                      {isSelected ? "✓ Pilihan Aktif" : "Pilih Opsi Ini"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 2: Granular Data Sharing Consent */}
          <NeuCard variant="raised-sm" className="p-5 space-y-4 bg-surface">
            <div className="space-y-1">
              <h2 className="text-xs font-bold text-brand-900 uppercase tracking-wider flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-brand-600" />
                <span>2. Kontrol Informasi yang Ingin Kamu Bagikan</span>
              </h2>
              <p className="text-[11px] text-text-muted leading-relaxed">
                Kamu memegang kendali penuh. Kami tidak membagikan riwayat chat pribadimu secara otomatis.
              </p>
            </div>

            <div className="space-y-2.5 bg-surface-inset p-3.5 rounded-xl border border-border-subtle/80">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={shareName}
                  onChange={(e) => setShareName(e.target.checked)}
                  className="w-4 h-4 rounded text-brand-700 focus:ring-brand-500"
                />
                <span className="text-xs text-text-main">
                  Bagikan nama panggilan samaran (<strong>{userName || "Alex"}</strong>)
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={shareAge}
                  onChange={(e) => setShareAge(e.target.checked)}
                  className="w-4 h-4 rounded text-brand-700 focus:ring-brand-500"
                />
                <span className="text-xs text-text-main">
                  Bagikan rentang usia umum (<strong>18–21 tahun</strong>)
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={shareSummary}
                  onChange={(e) => setShareSummary(e.target.checked)}
                  className="w-4 h-4 rounded text-brand-700 focus:ring-brand-500"
                />
                <span className="text-xs text-text-main">
                  Bagikan ringkasan topik umum (misal: butuh penguatan komunikasi / resiliensi)
                </span>
              </label>
            </div>

            <NeuTextarea
              label="Pesan Tambahan untuk Pendamping (Opsional)"
              placeholder="Ceritakan secara singkat apa yang ingin kamu diskusikan saat bertemu nanti..."
              rows={3}
              value={userNote}
              onChange={(e) => setUserNote(e.target.value)}
            />
          </NeuCard>

          {/* Action Submit */}
          <div className="pt-2">
            <NeuButton
              type="submit"
              size="lg"
              variant="primary"
              className="w-full text-base shadow-neu-raised"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Kirim Permintaan Pendampingan
            </NeuButton>
          </div>
        </form>
      )}

      {/* Emergency Crisis Notice */}
      <div className="p-4 rounded-xl bg-surface-inset shadow-neu-inset text-xs text-text-muted space-y-1 text-center">
        <span className="font-semibold text-brand-900 block">
          Dalam Kondisi Krisis Darurat?
        </span>
        <p className="text-[11px]">
          Jika kamu atau seseorang berada dalam ancaman keselamatan fisik mendesak, segera hubungi <strong>112 / 119 ext 8</strong> atau datangi fasilitas kesehatan terdekat.
        </p>
      </div>
    </div>
  );
}
