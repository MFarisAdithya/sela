"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Cpu,
  Trash2,
  AlertTriangle,
  Info,
  CheckCircle2,
  Lock,
  RotateCcw,
  ExternalLink,
} from "lucide-react";
import { NeuCard } from "@/components/ui/NeuCard";
import { NeuButton } from "@/components/ui/NeuButton";
import { NeuModal } from "@/components/ui/NeuModal";
import { Badge } from "@/components/ui/Badge";
import { useApp } from "@/context/AppContext";

export default function SettingsPage() {
  const router = useRouter();
  const { isAiActive, setIsAiActive, resetAllSessionData, userName } = useApp();

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [resetSuccessMessage, setResetSuccessMessage] = useState(false);

  const handleReset = () => {
    resetAllSessionData();
    setIsResetModalOpen(false);
    setResetSuccessMessage(true);
    setTimeout(() => {
      router.push("/onboarding");
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-300 pb-8">
      {/* Header Banner */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Tata Kelola & Keamanan</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-900 tracking-tight">
          Privasi & Pengaturan
        </h1>
        <p className="text-xs sm:text-sm text-text-muted">
          Pusat kendali mode AI, transparansi penyimpanan data, dan pembersihan sesi.
        </p>
      </div>

      {resetSuccessMessage && (
        <div className="p-4 rounded-2xl bg-teal-50 border border-teal-300 text-teal-900 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
          <span>Semua data sesi berhasil dibersihkan! Mengalihkan ke halaman awal...</span>
        </div>
      )}

      {/* AI Engine Mode Toggle Card */}
      <NeuCard variant="raised" className="p-5 sm:p-6 space-y-5 bg-surface">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-subtle/80 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-brand-900">
                Mode Operasi AI (Safe Story)
              </h2>
              {isAiActive ? (
                <Badge variant="active" size="sm" dot>
                  AI Aktif (Cloud)
                </Badge>
              ) : (
                <Badge variant="demo" size="sm" dot>
                  Mode Demo (Lokal)
                </Badge>
              )}
            </div>
            <p className="text-xs text-text-muted mt-0.5">
              Pemisahan tegas mode simulasi aturan lokal dengan model AI generatif cloud.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-surface-inset p-1 rounded-xl border border-border-subtle self-start sm:self-auto">
            <button
              onClick={() => setIsAiActive(false)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                !isAiActive
                  ? "bg-surface shadow-neu-raised-sm text-brand-900 border border-brand-200"
                  : "text-text-muted hover:text-brand-900"
              }`}
            >
              Mode DEMO
            </button>
            <button
              onClick={() => setIsAiActive(true)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                isAiActive
                  ? "bg-brand-600 text-white shadow-sm font-bold"
                  : "text-text-muted hover:text-brand-900"
              }`}
            >
              AI AKTIF
            </button>
          </div>
        </div>

        {/* Mode Descriptions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div
            className={`p-4 rounded-xl border transition-all ${
              !isAiActive
                ? "bg-brand-50/80 border-brand-300 shadow-neu-inset"
                : "bg-surface-inset border-border-subtle/60 text-text-muted"
            }`}
          >
            <div className="flex items-center gap-1.5 font-bold text-brand-900 mb-1">
              <Cpu className="w-4 h-4 text-brand-600" />
              <span>Mode Demo (Simulasi Lokal)</span>
            </div>
            <p className="leading-relaxed text-[11px]">
              100% berjalan di peramban lokal tanpa koneksi API eksternal. Menggunakan aturan pencocokan RAG deterministik. Aman untuk presentasi kompetisi luring.
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border transition-all ${
              isAiActive
                ? "bg-emerald-50/80 border-emerald-300 shadow-neu-inset"
                : "bg-surface-inset border-border-subtle/60 text-text-muted"
            }`}
          >
            <div className="flex items-center gap-1.5 font-bold text-emerald-950 mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Mode AI Aktif (Cloud LLM)</span>
            </div>
            <p className="leading-relaxed text-[11px]">
              Menghubungkan Safe Story ke OpenAI API server-side dengan basis data RAG. Mengharuskan konfigurasi <code>OPENAI_API_KEY</code> di server.
            </p>
          </div>
        </div>
      </NeuCard>

      {/* Data Storage & Retention Transparency Card */}
      <NeuCard variant="raised-sm" className="p-5 space-y-4 bg-surface">
        <h2 className="text-xs font-bold text-brand-900 uppercase tracking-wider flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-brand-600" />
          <span>Penyimpanan Data Sesi</span>
        </h2>

        <div className="space-y-2 text-xs text-text-main leading-relaxed">
          <p>
            Platform Fathercare AI prototipe dirancang dengan prinsip <strong>Zero Server Persistence</strong> untuk konten sensitif:
          </p>
          <ul className="list-disc list-inside space-y-1 text-text-muted pl-1 text-[11px]">
            <li>Tulisan jurnal dan riwayat percakapan tidak disimpan di database server.</li>
            <li>Nama samaran saat ini: <strong>{userName || "Alex"}</strong>.</li>
            <li>Menutup tab atau jendela browser akan mengosongkan sesi aktif secara otomatis.</li>
          </ul>
        </div>

        {/* Clear Data Action */}
        <div className="pt-2 border-t border-border-subtle/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-text-muted">
            Ingin menghapus semua riwayat catatan dan kembali ke awal?
          </span>
          <NeuButton
            size="sm"
            variant="danger"
            onClick={() => setIsResetModalOpen(true)}
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Reset Semua Data Sesi
          </NeuButton>
        </div>
      </NeuCard>

      {/* Verified Support Hotlines Notice */}
      <NeuCard variant="inset" className="p-5 space-y-3 bg-surface-inset/80 border border-border-subtle/80">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <h3 className="text-xs font-bold text-brand-900 uppercase tracking-wider">
            Layanan Bantuan Resmi & Darurat (Terverifikasi Nasional)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="p-3 rounded-xl bg-surface border border-border-subtle/80 space-y-0.5">
            <span className="font-bold text-brand-900 block">Kemenkes Sejiwa</span>
            <span className="text-text-muted text-[11px]">Hotline Konseling Kesehatan Jiwa</span>
            <span className="font-mono font-bold text-brand-700 block">119 Ext 8</span>
          </div>

          <div className="p-3 rounded-xl bg-surface border border-border-subtle/80 space-y-0.5">
            <span className="font-bold text-brand-900 block">Sahabat Perempuan & Anak (SAPA)</span>
            <span className="text-text-muted text-[11px]">Layanan Kekerasan & Perlindungan KemenPPPA</span>
            <span className="font-mono font-bold text-brand-700 block">129 / WhatsApp 08111-129-129</span>
          </div>
        </div>

        <p className="text-[10px] text-text-muted text-center pt-1">
          Fathercare AI &bull; Inovasi Genre InnovAItion AI Challenge &bull; ADUJAKNAS 2026
        </p>
      </NeuCard>

      {/* Modal: Konfirmasi Reset Sesi */}
      <NeuModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        title="Reset Seluruh Data Sesi?"
        description="Tindakan ini akan mengosongkan jurnal, progres modul belajar, kontak peta dukungan, dan mengembalikan Anda ke halaman pembuka."
        footer={
          <>
            <NeuButton
              variant="secondary"
              size="sm"
              onClick={() => setIsResetModalOpen(false)}
            >
              Batal
            </NeuButton>
            <NeuButton
              variant="danger"
              size="sm"
              onClick={handleReset}
            >
              Ya, Reset Sesi
            </NeuButton>
          </>
        }
      >
        <p className="text-xs text-text-muted leading-relaxed">
          Semua catatan yang tersimpan di browser Anda akan dibersihkan seketika. Tindakan ini tidak dapat dibatalkan.
        </p>
      </NeuModal>
    </div>
  );
}
