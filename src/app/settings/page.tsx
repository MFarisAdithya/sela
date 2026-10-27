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
          Kelola identitas samaran, preferensi privasi, dan kontrol penyimpanan data.
        </p>
      </div>

      {/* 1. Pseudonym & Profile Form */}
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

      {/* 2. Data Privacy Consent */}
      <NeuCard variant="raised" className="p-5 space-y-3">
        <div className="flex items-center gap-2">
          <Lock className="w-5 h-5 text-brand-700" />
          <h2 className="text-sm font-bold text-brand-900">Preferensi Pemrosesan Teks</h2>
        </div>

        <p className="text-xs text-text-muted leading-relaxed">
          Ketika kamu mengirim pesan refleksi, teks disanitasi dari data pribadi (nomor telepon, email, NIK) secara otomatis demi menjaga privasimu.
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
              Izinkan pemrosesan teks refleksi secara otomatis
            </span>
            <span className="text-text-muted block">
              Jika dinonaktifkan, obrolan hanya akan menampilkan kutipan materi panduan dari basis pengetahuan lokal.
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
