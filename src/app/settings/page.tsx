"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  RotateCcw,
  KeyRound,
  CheckCircle2,
  AlertTriangle,
  Lock,
  User,
  Database,
} from "lucide-react";
import { NeuCard } from "@/components/ui/NeuCard";
import { NeuButton } from "@/components/ui/NeuButton";
import { NeuInput } from "@/components/ui/NeuInput";
import { Badge } from "@/components/ui/Badge";
import { useApp } from "@/context/AppContext";

export default function SettingsPage() {
  const {
    userName,
    setUserName,
    userAgeRange,
    setUserAgeRange,
    isAiConfigured,
    checkAiConfiguration,
    allowAiTransmission,
    setAllowAiTransmission,
    resetAllSessionData,
  } = useApp();

  const [inputName, setInputName] = useState(userName);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputName.trim()) {
      setUserName(inputName.trim());
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    }
  };

  const handleReset = () => {
    if (
      confirm(
        "Apakah kamu yakin ingin mereset seluruh data sesi (catatan, progres modul, kontak, dan tiket simulasi)?"
      )
    ) {
      resetAllSessionData();
      setInputName("Alex");
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto py-2">
      {/* Header */}
      <div className="space-y-1 border-b border-border-subtle/80 pb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
          Pusat Kontrol Privasi
        </span>
        <h1 className="text-2xl font-extrabold text-brand-900 tracking-tight">
          Pengaturan & privasi
        </h1>
        <p className="text-xs text-text-muted">
          Kelola identitas samaran, status layanan AI, dan kontrol penyimpanan data.
        </p>
      </div>

      {/* 1. AI API Configuration Status Card */}
      <NeuCard variant="raised" className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-brand-700" />
            <h2 className="text-sm font-bold text-brand-900">Status Konfigurasi AI Backend</h2>
          </div>
          {isAiConfigured ? (
            <Badge variant="active" dot size="sm">
              AI Aktif
            </Badge>
          ) : (
            <Badge variant="warning" dot size="sm">
              API Belum Dikonfigurasi
            </Badge>
          )}
        </div>

        <p className="text-xs text-text-muted leading-relaxed">
          {isAiConfigured
            ? "Server terhubung ke Google Gemini API dengan semantic embeddings RAG dan filter kedaruratan nasional."
            : "Kunci API (GEMINI_API_KEY) belum terpasang di file .env.local server. Safe Story AI saat ini menampilkan kutipan terverifikasi langsung dari basis pengetahuan lokal."}
        </p>

        <div className="pt-2 flex items-center justify-between border-t border-border-subtle/70">
          <span className="text-[11px] text-text-subtle">
            Model target: <code>gemini-flash-lite-latest</code> (Google Gen AI SDK Resmi)
          </span>
          <NeuButton size="sm" variant="secondary" onClick={() => checkAiConfiguration()}>
            Periksa ulang status
          </NeuButton>
        </div>
      </NeuCard>

      {/* 2. Pseudonym & Profile Form */}
      <NeuCard variant="raised" className="p-5 space-y-4">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-brand-700" />
          <h2 className="text-sm font-bold text-brand-900">Identitas Samaran (Sesi Lokal)</h2>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <NeuInput
              label="Nama Samaran"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              helperText="Digunakan untuk menyapa di dashboard."
            />

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted">
                Rentang Usia
              </label>
              <select
                value={userAgeRange}
                onChange={(e) => setUserAgeRange(e.target.value)}
                className="w-full px-4 py-3 text-sm rounded-xl bg-surface-inset shadow-neu-inset text-text-main border border-border-subtle focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="15-17 tahun">15–17 tahun (SMA / SMK)</option>
                <option value="18-21 tahun">18–21 tahun (Awal Kuliah / Kerja)</option>
                <option value="22-24 tahun">22–24 tahun (Dewasa Muda)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            {saveSuccess && (
              <span className="text-xs text-teal-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Profil samaran diperbarui
              </span>
            )}
            <div className="ml-auto">
              <NeuButton type="submit" size="sm" variant="primary">
                Simpan perubahan
              </NeuButton>
            </div>
          </div>
        </form>
      </NeuCard>

      {/* 3. External AI Data Transmission Consent */}
      <NeuCard variant="raised" className="p-5 space-y-3">
        <div className="flex items-center gap-2">
          <Lock className="w-5 h-5 text-brand-700" />
          <h2 className="text-sm font-bold text-brand-900">Persetujuan Transmisi Teks AI</h2>
        </div>

        <p className="text-xs text-text-muted leading-relaxed">
          Ketika kamu mengirim pesan di Cerita AI, teks disanitasi dari data pribadi (nomor telepon, email, NIK) sebelum diteruskan ke model AI.
        </p>

        <label className="flex items-center gap-3 p-3 rounded-xl bg-surface-inset border border-border-subtle/80 cursor-pointer">
          <input
            type="checkbox"
            checked={allowAiTransmission}
            onChange={(e) => setAllowAiTransmission(e.target.checked)}
            className="w-4 h-4 rounded text-brand-700"
          />
          <div className="text-xs space-y-0.5">
            <span className="font-semibold text-brand-900 block">
              Izinkan pemrosesan teks oleh model AI pihak ketiga
            </span>
            <span className="text-text-muted block">
              Jika dinonaktifkan, chat hanya akan menampilkan kutipan materi terverifikasi tanpa generasi teks eksternal.
            </span>
          </div>
        </label>
      </NeuCard>

      {/* 4. Reset & Data Clearance */}
      <NeuCard variant="raised" className="p-5 space-y-3 border-red-200">
        <div className="flex items-center gap-2 text-rose-700">
          <Database className="w-5 h-5" />
          <h2 className="text-sm font-bold">Hapus Seluruh Data Sesi</h2>
        </div>

        <p className="text-xs text-text-muted leading-relaxed">
          Tindakan ini akan mengosongkan seluruh catatan pribadi, progres ruang belajar, kontak tambahan pada peta dukungan, dan tiket simulasi rujukan.
        </p>

        <div className="pt-1 flex items-center justify-between">
          {resetSuccess ? (
            <span className="text-xs text-teal-700 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Seluruh data sesi telah dibersihkan
            </span>
          ) : (
            <span className="text-[11px] text-text-muted">Data di browser akan hilang seketika.</span>
          )}

          <NeuButton
            variant="danger"
            size="sm"
            onClick={handleReset}
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Hapus dan reset sesi
          </NeuButton>
        </div>
      </NeuCard>
    </div>
  );
}
