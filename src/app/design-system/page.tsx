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
import { SelaLogo, SelaMark, SelaAppIcon } from "@/components/ui/SelaLogo";

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
            SELA 2026
          </Badge>
          <Badge variant="demo" size="sm">
            Ruang untuk dirimu
          </Badge>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-900 tracking-tight">
          Sistem Desain & Identitas SELA
        </h1>
        <p className="text-sm text-text-muted leading-relaxed">
          Daftar komponen dasar untuk tombol, kartu, input, dan dialog sistem SELA (&ldquo;Ruang untuk dirimu.&rdquo;).
        </p>
        <div className="pt-2 flex items-center gap-3">
          <Link href="/">
            <NeuButton size="sm" variant="secondary">
              ← Halaman awal
            </NeuButton>
          </Link>
          <span className="text-xs text-text-muted">
            Ukuran layar: 320, 375, 390, 768, 1024, 1440 px
          </span>
        </div>
      </div>

      {/* 0. Identitas Brand SELA */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-brand-900 flex items-center gap-2">
          <span>0. Identitas Visual SELA (&ldquo;Ruang untuk dirimu.&rdquo;)</span>
        </h2>
        <NeuCard variant="raised" className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
            {/* Logo Horizontal */}
            <div className="p-4 rounded-2xl bg-surface-inset flex flex-col items-center justify-center space-y-2 border border-border-subtle/80">
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-subtle">
                Logo Horizontal
              </span>
              <SelaLogo layout="horizontal" size="lg" showTagline={true} />
            </div>

            {/* Logo Vertikal */}
            <div className="p-4 rounded-2xl bg-surface-inset flex flex-col items-center justify-center space-y-2 border border-border-subtle/80">
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-subtle">
                Logo Vertikal
              </span>
              <SelaLogo layout="vertical" size="md" showTagline={true} />
            </div>

            {/* Ikon Aplikasi */}
            <div className="p-4 rounded-2xl bg-surface-inset flex flex-col items-center justify-center space-y-2 border border-border-subtle/80">
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-subtle">
                Ikon Aplikasi (Terang & Gelap)
              </span>
              <div className="flex items-center gap-3">
                <SelaAppIcon size="md" theme="light" />
                <SelaAppIcon size="md" theme="dark" />
              </div>
            </div>
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            Simbol abstrak daun dan gelombang melambangkan ruang refleksi yang menenangkan dan proses pertumbuhan personal yang alami.
          </p>
        </NeuCard>
      </section>

      {/* 1. Color Palette Tokens */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-brand-900 flex items-center gap-2">
          <span>1. Palet Warna Resmi SELA</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <NeuCard variant="raised-sm" className="p-3 space-y-1">
            <div className="h-10 rounded-xl bg-[#17365D]" />
            <div className="text-xs font-bold text-brand-900">Navy Utama</div>
            <div className="text-[11px] text-text-muted">#17365D (Teks Utama)</div>
          </NeuCard>

          <NeuCard variant="raised-sm" className="p-3 space-y-1">
            <div className="h-10 rounded-xl bg-[#2457A7]" />
            <div className="text-xs font-bold text-brand-900">Biru Primer</div>
            <div className="text-[11px] text-text-muted">#2457A7 (Brand Utama)</div>
          </NeuCard>

          <NeuCard variant="raised-sm" className="p-3 space-y-1">
            <div className="h-10 rounded-xl bg-[#6FB1FF]" />
            <div className="text-xs font-bold text-brand-900">Biru Aksen</div>
            <div className="text-[11px] text-text-muted">#6FB1FF (Aksen Sekunder)</div>
          </NeuCard>

          <NeuCard variant="raised-sm" className="p-3 space-y-1">
            <div className="h-10 rounded-xl bg-[#E3EEFF] border border-border-subtle" />
            <div className="text-xs font-bold text-brand-900">Biru Latar</div>
            <div className="text-[11px] text-text-muted">#E3EEFF (Background)</div>
          </NeuCard>

          <NeuCard variant="raised-sm" className="p-3 space-y-1">
            <div className="h-10 rounded-xl bg-[#F7FAFF] border border-border-subtle" />
            <div className="text-xs font-bold text-brand-900">Putih Kebiruan</div>
            <div className="text-[11px] text-text-muted">#F7FAFF (Surface Card)</div>
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
              Mulai bercerita
            </NeuButton>

            <NeuButton variant="secondary" leftIcon={<Sparkles className="w-4 h-4 text-brand-600" />}>
              Simpan catatan
            </NeuButton>

            <NeuButton variant="inset">
              Pilihan terpilih
            </NeuButton>

            <NeuButton variant="danger" leftIcon={<Trash2 className="w-4 h-4" />}>
              Hapus
            </NeuButton>

            <NeuButton variant="ghost">
              Lewati
            </NeuButton>

            <NeuButton variant="primary" isLoading>
              Memproses
            </NeuButton>
          </div>
          <p className="text-xs text-text-muted">
            Target sentuh minimal 44 piksel pada layar ponsel.
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
              label="Nama samaran"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              helperText="Digunakan untuk menyapa di dashboard selama sesi ini."
            />
            <NeuInput
              label="Email (opsional)"
              defaultValue="contoh@domain"
              error="Format email belum sesuai."
            />
          </div>

          <NeuTextarea
            label="Catatan pribadi"
            rows={3}
            value={textareaVal}
            onChange={(e) => setTextareaVal(e.target.value)}
            helperText="Tersimpan di browser selama sesi ini."
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
            Aktif / Terhubung
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
              label="Kemajuan modul (2 dari 5)"
              showPercentage
            />
            <ProgressBar
              value={75}
              label="Target minggu ini"
              showPercentage
            />
          </div>

          <div className="flex flex-col items-center justify-center text-center p-3">
            <CircularProgress value={67} subtitle="Selesai" />
            <p className="text-xs text-text-muted mt-2">
              Indikator progres target pribadi tanpa batas waktu kaku.
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
            Buka dialog konfirmasi
          </NeuButton>

          <NeuButton
            variant="secondary"
            onClick={() =>
              setToastConfig({
                type: "success",
                title: "Data sesi dihapus",
                message: "Catatan dan preferensi lokal berhasil dibersihkan.",
              })
            }
          >
            Picu toast sukses
          </NeuButton>

          <NeuButton
            variant="secondary"
            onClick={() =>
              setToastConfig({
                type: "warning",
                title: "Mode demo aktif",
                message: "Respons disimulasikan dari materi lokal.",
              })
            }
          >
            Picu toast peringatan
          </NeuButton>
        </NeuCard>

        {/* Modal Instance */}
        <NeuModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Kirim teks ke layanan AI?"
          description="Teks kamu akan diproses untuk memberikan respons reflektif."
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
                    title: "Teks dikirim",
                    message: "Permintaan sedang diproses.",
                  });
                }}
              >
                Setuju dan kirim
              </NeuButton>
            </>
          }
        >
          <div className="p-3 rounded-xl bg-surface-inset shadow-neu-inset text-xs text-text-muted space-y-2">
            <p>
              AI ini bukan psikolog atau konselor klinis dan tidak menggantikan bantuan profesional.
            </p>
          </div>
        </NeuModal>
      </section>

      {/* 8. UI States (Empty, Loading, Error, Success) */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-brand-900">
          8. Penanganan State UI
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StateCard
            type="empty"
            title="Belum ada catatan"
            description="Belum ada catatan refleksi yang tersimpan di sesi ini."
            actionLabel="Tulis catatan"
            onAction={() => alert("Membuka catatan")}
          />

          <StateCard
            type="error"
            title="Gagal memuat respons"
            description="Tidak dapat terhubung ke server. Kamu tetap bisa membaca materi di Ruang Belajar."
            actionLabel="Coba lagi"
            onAction={() => alert("Mencoba ulang")}
          />
        </div>
      </section>
    </div>
  );
}
