"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Send,
  Trash2,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import { NeuButton } from "@/components/ui/NeuButton";
import { NeuCard } from "@/components/ui/NeuCard";
import { NeuInput, NeuTextarea } from "@/components/ui/NeuInput";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar, CircularProgress } from "@/components/ui/ProgressBar";
import { NeuModal } from "@/components/ui/NeuModal";
import { Toast, ToastType } from "@/components/ui/Toast";
import { StateCard, StateType } from "@/components/ui/StateCard";

export default function DesignSystemPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastConfig, setToastConfig] = useState<{
    type: ToastType;
    title: string;
    message: string;
  } | null>(null);
  const [inputVal, setInputVal] = useState("Alex Pratama");
  const [textareaVal, setTextareaVal] = useState(
    "Hari ini aku merasa agak cemas memikirkan ujian kelulusan, tapi aku mencoba mendengarkan saran dari teman."
  );

  return (
    <div className="space-y-10 py-4 max-w-4xl mx-auto">
      {/* Toast Alert Container if active */}
      {toastConfig && (
        <Toast
          type={toastConfig.type}
          title={toastConfig.title}
          message={toastConfig.message}
          onClose={() => setToastConfig(null)}
        />
      )}

      {/* Header Showcase */}
      <div className="space-y-2 border-b border-border-subtle/80 pb-6">
        <div className="flex items-center gap-2">
          <Badge variant="verified" size="sm" dot>
            Fase 1 Foundation
          </Badge>
          <Badge variant="demo" size="sm">
            Neumorphic Blue System
          </Badge>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-900 tracking-tight">
          Design System & UI Components Showcase
        </h1>
        <p className="text-sm text-text-muted leading-relaxed">
          Koleksi token visual, tombol, kontainer neumorphic, input form, dialog, dan komponen responsif yang dirancang khusus untuk platform FATHERCARE AI.
        </p>
        <div className="pt-2 flex items-center gap-3">
          <Link href="/">
            <NeuButton size="sm" variant="secondary">
              &larr; Ke Splash Screen
            </NeuButton>
          </Link>
          <span className="text-xs text-text-muted">
            Viewport responsif: 320, 375, 390, 768, 1024, 1440 px
          </span>
        </div>
      </div>

      {/* 1. Color Palette Tokens */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-brand-900 flex items-center gap-2">
          <span>1. Palet Warna Utama (Dominan Biru & Kontras Tinggi)</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <NeuCard variant="raised-sm" className="p-3 space-y-1">
            <div className="h-10 rounded-xl bg-[#17365D]" />
            <div className="text-xs font-bold text-brand-900">Primary 900</div>
            <div className="text-[11px] text-text-muted">#17365D (Navy Utama)</div>
          </NeuCard>

          <NeuCard variant="raised-sm" className="p-3 space-y-1">
            <div className="h-10 rounded-xl bg-[#2457A7]" />
            <div className="text-xs font-bold text-brand-900">Primary 700</div>
            <div className="text-[11px] text-text-muted">#2457A7 (Tombol Aksi)</div>
          </NeuCard>

          <NeuCard variant="raised-sm" className="p-3 space-y-1">
            <div className="h-10 rounded-xl bg-[#4C7EDB]" />
            <div className="text-xs font-bold text-brand-900">Primary 500</div>
            <div className="text-[11px] text-text-muted">#4C7EDB (Aksen Biru)</div>
          </NeuCard>

          <NeuCard variant="raised-sm" className="p-3 space-y-1">
            <div className="h-10 rounded-xl bg-[#E4EEFC] border border-brand-200" />
            <div className="text-xs font-bold text-brand-900">Primary 100</div>
            <div className="text-[11px] text-text-muted">#E4EEFC (Panel Muda)</div>
          </NeuCard>
        </div>
      </section>

      {/* 2. Neumorphic Buttons */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-brand-900">
          2. Tombol Neumorphic (NeuButton)
        </h2>
        <NeuCard variant="raised" className="p-5 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <NeuButton variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Primary Action
            </NeuButton>

            <NeuButton variant="secondary" leftIcon={<Sparkles className="w-4 h-4 text-brand-600" />}>
              Secondary Raised
            </NeuButton>

            <NeuButton variant="inset">
              Inset Button
            </NeuButton>

            <NeuButton variant="danger" leftIcon={<Trash2 className="w-4 h-4" />}>
              Hapus / Danger
            </NeuButton>

            <NeuButton variant="ghost">
              Ghost Link
            </NeuButton>

            <NeuButton variant="primary" isLoading>
              Memproses
            </NeuButton>
          </div>
          <p className="text-xs text-text-muted">
            Target sentuh minimal 44 piksel, dilengkapi efek hover halus dan transisi pressed yang responsif.
          </p>
        </NeuCard>
      </section>

      {/* 3. Neumorphic Cards */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-brand-900">
          3. Kartu Neumorphic (NeuCard)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <NeuCard variant="raised" className="p-5 space-y-2">
            <span className="text-xs font-bold text-brand-900 uppercase tracking-wider">
              Raised Default
            </span>
            <p className="text-xs text-text-muted">
              Bayangan ganda lembut (light top-left & dark bottom-right) memberikan efek terangkat alami.
            </p>
          </NeuCard>

          <NeuCard variant="inset" className="p-5 space-y-2">
            <span className="text-xs font-bold text-brand-900 uppercase tracking-wider">
              Inset (Cekung)
            </span>
            <p className="text-xs text-text-muted">
              Bayangan bagian dalam cocok untuk formulir, kolom input, atau area fokus reflektif.
            </p>
          </NeuCard>

          <NeuCard variant="raised" interactive className="p-5 space-y-2">
            <span className="text-xs font-bold text-brand-900 uppercase tracking-wider">
              Interactive Card
            </span>
            <p className="text-xs text-text-muted">
              Arahkan kursor atau sentuh untuk melihat efek translasi naik dan bayangan yang lebih dalam.
            </p>
          </NeuCard>
        </div>
      </section>

      {/* 4. Form Inputs & Controls */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-brand-900">
          4. Komponen Input & Form
        </h2>
        <NeuCard variant="raised" className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NeuInput
              label="Nama Samaran Pengguna"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              helperText="Identitas samaran menjaga privasimu selama sesi berlangsung."
            />
            <NeuInput
              label="Input dengan Validasi Error"
              defaultValue="teks@kurang-lengkap"
              error="Format email belum valid atau tidak diperlukan di prototype."
            />
          </div>

          <NeuTextarea
            label="Catatan Jurnal Reflektif"
            rows={3}
            value={textareaVal}
            onChange={(e) => setTextareaVal(e.target.value)}
            helperText="Catatan ini hanya tersimpan di memori browser perangkatmu."
          />
        </NeuCard>
      </section>

      {/* 5. Status Badges */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-brand-900">
          5. Indikator & Badges
        </h2>
        <NeuCard variant="raised-sm" className="p-4 flex flex-wrap items-center gap-3">
          <Badge variant="demo" dot>
            Mode Demo
          </Badge>
          <Badge variant="active" dot>
            AI Aktif (Cloud)
          </Badge>
          <Badge variant="verified">
            Sumber Terverifikasi
          </Badge>
          <Badge variant="prototype">
            Prototype Nonklinis
          </Badge>
          <Badge variant="success">
            Selesai 100%
          </Badge>
          <Badge variant="warning">
            Perlu Tinjauan
          </Badge>
          <Badge variant="danger">
            Protokol Darurat
          </Badge>
        </NeuCard>
      </section>

      {/* 6. Progress Indicators */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-brand-900">
          6. Indikator Progres Belajar & Rencana Bertumbuh
        </h2>
        <NeuCard variant="raised" className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <ProgressBar
              value={40}
              label="Modul Resiliensi Diselesaikan (2 dari 5)"
              showPercentage
            />
            <ProgressBar
              value={75}
              label="Langkah Bertumbuh Minggu Ini"
              showPercentage
            />
          </div>

          <div className="flex flex-col items-center justify-center text-center p-3">
            <CircularProgress value={67} subtitle="Target Terpenuhi" />
            <p className="text-xs text-text-muted mt-2">
              Progres sirkular rencana bertumbuh tanpa mekanisme hukuman streak.
            </p>
          </div>
        </NeuCard>
      </section>

      {/* 7. Modal & Toast Interactive Testers */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-brand-900">
          7. Dialog Aksesibel & Notifikasi Toast
        </h2>
        <NeuCard variant="raised" className="p-5 flex flex-wrap items-center gap-3">
          <NeuButton
            variant="secondary"
            onClick={() => setIsModalOpen(true)}
          >
            Buka Modal Konfirmasi
          </NeuButton>

          <NeuButton
            variant="secondary"
            onClick={() =>
              setToastConfig({
                type: "success",
                title: "Data Sesi Direset",
                message: "Semua riwayat dan preferensi lokal telah dibersihkan.",
              })
            }
          >
            Picu Toast Sukses
          </NeuButton>

          <NeuButton
            variant="secondary"
            onClick={() =>
              setToastConfig({
                type: "warning",
                title: "Mode Demo Aktif",
                message: "Kunci API belum diisi, respon disimulasikan dari basis pengetahuan lokal.",
              })
            }
          >
            Picu Toast Peringatan
          </NeuButton>
        </NeuCard>

        {/* Modal Instance */}
        <NeuModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Konfirmasi Pengiriman Teks AI"
          description="FATHERCARE AI mengedepankan prinsip persetujuan bertingkat sebelum mengirim data ke pihak ketiga."
          footer={
            <>
              <NeuButton
                variant="ghost"
                size="sm"
                onClick={() => setIsModalOpen(false)}
              >
                Batal
              </NeuButton>
              <NeuButton
                variant="primary"
                size="sm"
                onClick={() => {
                  setIsModalOpen(false);
                  setToastConfig({
                    type: "info",
                    title: "Persetujuan Diberikan",
                    message: "Teks refleksi diizinkan untuk diproses oleh sistem.",
                  });
                }}
              >
                Saya Setuju & Lanjutkan
              </NeuButton>
            </>
          }
        >
          <div className="p-3 rounded-xl bg-surface-inset shadow-neu-inset text-xs text-text-muted space-y-2">
            <p>
              Dengan melanjutkan, kamu memahami bahwa AI berperan sebagai pemandu refleksi awal dan bukan tenaga profesional pengganti psikolog.
            </p>
          </div>
        </NeuModal>
      </section>

      {/* 8. UI States (Empty, Loading, Error, Success) */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-brand-900">
          8. Penanganan State UI Lengkap
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StateCard
            type="empty"
            title="Belum Ada Jurnal Tersimpan"
            description="Kamu belum menulis jurnal refleksi hari ini. Luangkan 2 menit untuk menamai apa yang kamu rasakan."
            actionLabel="Mulai Menulis"
            onAction={() => alert("Navigasi ke Jurnal Reflektif")}
          />

          <StateCard
            type="error"
            title="Koneksi Terputus"
            description="Layanan AI eksternal tidak merespons. Sistem beralih ke materi terverifikasi di perangkatmu."
            actionLabel="Coba Lagi"
            onAction={() => alert("Mencoba ulang koneksi")}
          />
        </div>
      </section>
    </div>
  );
}
