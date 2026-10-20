"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Shield, HeartHandshake, ArrowRight, Info, CheckCircle2 } from "lucide-react";
import { NeuCard } from "@/components/ui/NeuCard";
import { NeuButton } from "@/components/ui/NeuButton";
import { NeuInput } from "@/components/ui/NeuInput";
import { NeuModal } from "@/components/ui/NeuModal";
import { Badge } from "@/components/ui/Badge";
import { useApp } from "@/context/AppContext";

export default function OnboardingPage() {
  const router = useRouter();
  const { userName, setUserName, setHasConsented } = useApp();

  const [localName, setLocalName] = useState(userName || "Alex");
  const [ageRange, setAgeRange] = useState("18–21 tahun");
  const [consentAiLimit, setConsentAiLimit] = useState(false);
  const [consentDataControl, setConsentDataControl] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  const canProceed = consentAiLimit && consentDataControl;

  const handleContinue = () => {
    if (!canProceed) return;
    setUserName(localName.trim() || "Alex");
    setHasConsented(true);
    router.push("/dashboard");
  };

  return (
    <div className="max-w-2xl mx-auto py-4 sm:py-8 space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header Profile Greeting */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 mx-auto rounded-3xl bg-surface shadow-neu-raised flex items-center justify-center border border-white/80">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center text-white">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>

        <div className="space-y-1">
          <Badge variant="info" size="sm">
            Langkah Awal
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-900 tracking-tight">
            Hai! Aku Fathercare AI
          </h1>
          <p className="text-sm text-text-muted max-w-lg mx-auto leading-relaxed">
            Aku di sini sebagai teman dan pendamping awal yang siap mendengarkan, membantu refleksi, dan mendukung langkah kecilmu.
          </p>
        </div>
      </div>

      {/* Profile Setup Box */}
      <NeuCard variant="raised-sm" className="p-5 sm:p-6 space-y-4 bg-surface">
        <h2 className="text-xs font-bold text-brand-900 uppercase tracking-wider flex items-center gap-1.5">
          <HeartHandshake className="w-4 h-4 text-brand-600" />
          <span>Nama Panggilan & Rentang Usia (Opsional)</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NeuInput
            label="Nama Panggilan / Samaran"
            placeholder="Contoh: Alex"
            value={localName}
            onChange={(e) => setLocalName(e.target.value)}
            helperText="Kamu bebas menggunakan nama samaran apa pun."
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted">
              Rentang Usia
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["15–17 thn", "18–21 thn", "22–24 thn"].map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => setAgeRange(range)}
                  className={`py-3 px-2 text-xs font-medium rounded-xl border transition-all text-center ${
                    ageRange === range
                      ? "bg-brand-100 text-brand-900 font-bold border-brand-300 shadow-neu-inset"
                      : "bg-surface-inset text-text-muted border-border-subtle/80 hover:text-brand-900"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
            <p className="text-xs text-text-muted">Untuk penyesuaian gaya bahasa modul.</p>
          </div>
        </div>
      </NeuCard>

      {/* 3 Core Ethical Principles */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold text-brand-900 uppercase tracking-wider px-1">
          Batas Layanan & Etika AI
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <NeuCard variant="raised-sm" className="p-4 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-blue-100 text-brand-700 flex items-center justify-center font-bold text-xs">
              1
            </div>
            <h3 className="text-xs font-bold text-brand-900">Bukan Dokter/Psikolog</h3>
            <p className="text-[11px] text-text-muted leading-relaxed">
              AI tidak memberikan diagnosis medis atau menetapkan label kejiwaan.
            </p>
          </NeuCard>

          <NeuCard variant="raised-sm" className="p-4 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs">
              2
            </div>
            <h3 className="text-xs font-bold text-brand-900">Privasi Tanpa Rekam Permanen</h3>
            <p className="text-[11px] text-text-muted leading-relaxed">
              Chat & jurnal berada di sesi browser Anda. Data tidak disimpan permanen di server.
            </p>
          </NeuCard>

          <NeuCard variant="raised-sm" className="p-4 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
              3
            </div>
            <h3 className="text-xs font-bold text-brand-900">Penghubung Manusia</h3>
            <p className="text-[11px] text-text-muted leading-relaxed">
              Jika butuh penanganan mendalam, sistem memfasilitasi kontak ke konselor nyata.
            </p>
          </NeuCard>
        </div>
      </div>

      {/* Explicit Consent Checkboxes */}
      <NeuCard variant="inset" className="p-5 space-y-3 bg-surface-inset/80">
        <span className="text-xs font-bold text-brand-900 uppercase tracking-wider block">
          Persetujuan Penggunaan (Wajib Dicentang)
        </span>

        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={consentAiLimit}
            onChange={(e) => setConsentAiLimit(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded text-brand-700 border-border-subtle focus:ring-brand-500 cursor-pointer"
          />
          <span className="text-xs text-text-main leading-relaxed select-none group-hover:text-brand-900">
            Saya memahami bahwa Fathercare AI adalah asisten refleksi awal dan edukasi, bukan layanan klinis darurat atau pengganti bantuan profesional.
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={consentDataControl}
            onChange={(e) => setConsentDataControl(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded text-brand-700 border-border-subtle focus:ring-brand-500 cursor-pointer"
          />
          <span className="text-xs text-text-main leading-relaxed select-none group-hover:text-brand-900">
            Saya mengerti bahwa saya memegang kendali penuh atas data sesi saya dan dapat menghapusnya kapan saja.
          </span>
        </label>
      </NeuCard>

      {/* Action Buttons */}
      <div className="space-y-3 pt-2">
        <NeuButton
          size="lg"
          variant="primary"
          disabled={!canProceed}
          onClick={handleContinue}
          className="w-full text-base shadow-neu-raised"
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Saya Mengerti, Lanjutkan ke Beranda
        </NeuButton>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setIsPrivacyModalOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs text-brand-700 hover:text-brand-900 underline underline-offset-4 py-1"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Baca Ringkasan Kebijakan Privasi & Batasan AI</span>
          </button>
        </div>
      </div>

      {/* Privacy Summary Modal */}
      <NeuModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
        title="Kebijakan Privasi & Batasan Fathercare AI"
        description="Prinsip perlindungan privasi remaja berbasis Privacy by Design (NIST AI RMF & UNICEF Guidance)."
        footer={
          <NeuButton
            variant="primary"
            size="sm"
            onClick={() => setIsPrivacyModalOpen(false)}
          >
            Tutup
          </NeuButton>
        }
      >
        <div className="space-y-3 text-xs leading-relaxed text-text-muted">
          <p>
            <strong>1. Minimalisasi Data:</strong> Kami tidak meminta nomor KTP/NIK, nama keluarga, lokasi presisi GPS, nomor rekening, atau kontak pribadi Anda untuk menggunakan platform ini.
          </p>
          <p>
            <strong>2. Tanpa Database Server Percakapan:</strong> Pada versi prototipe ini, percakapan Anda dengan AI dan tulisan jurnal Anda hanya disimpan secara temporer di memori browser Anda (session storage). Menutup browser atau menekan tombol reset akan menghapus data tersebut.
          </p>
          <p>
            <strong>3. Persetujuan Transmisi:</strong> Jika Anda mengaktifkan mode AI Cloud (OpenAI), sistem akan meminta konfirmasi izin eksplisit sebelum teks dikirimkan ke model pemrosesan bahasa alami.
          </p>
          <p>
            <strong>4. Batasan Deteksi:</strong> Filter keamanan adalah lapisan bantuan simulasi awal dan tidak menjamin 100% deteksi krisis. Jika dalam kondisi bahaya segera, selalu hubungi nomor darurat atau orang dewasa terpercaya di lingkungan Anda.
          </p>
        </div>
      </NeuModal>
    </div>
  );
}
