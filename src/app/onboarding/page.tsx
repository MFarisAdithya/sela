"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ShieldCheck, CheckSquare, Square, AlertCircle } from "lucide-react";
import { NeuCard } from "@/components/ui/NeuCard";
import { NeuButton } from "@/components/ui/NeuButton";
import { Badge } from "@/components/ui/Badge";
import { useApp } from "@/context/AppContext";

export default function OnboardingPage() {
  const router = useRouter();
  const { setHasConsented, userName, setUserName } = useApp();
  const [agreeNonClinical, setAgreeNonClinical] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [inputName, setInputName] = useState(userName);

  const canProceed = agreeNonClinical && agreePrivacy;

  const handleProceed = () => {
    if (!canProceed) return;
    setHasConsented(true);
    if (inputName.trim()) setUserName(inputName.trim());
    router.push("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto py-6 space-y-6 text-center animate-in fade-in duration-200">
      <div className="space-y-2">
        <Badge variant="verified" size="sm">
          Persetujuan Bertingkat
        </Badge>
        <h1 className="text-2xl font-extrabold text-brand-900 tracking-tight">
          Sebelum kita mulai
        </h1>
        <p className="text-xs text-text-muted leading-relaxed">
          FATHERCARE AI adalah asisten refleksi dan edukasi awal nonklinis. Mohon baca dan centang persetujuan di bawah ini.
        </p>
      </div>

      {/* Name Input */}
      <NeuCard variant="raised-sm" className="p-4 text-left space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted">
          Nama Panggilan / Samaran
        </label>
        <input
          type="text"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          placeholder="Contoh: Alex"
          className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-surface-inset shadow-neu-inset text-text-main border border-border-subtle focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        <span className="text-[10px] text-text-muted block">
          Identitas samaran menjaga kerahasiaanmu selama menggunakan aplikasi.
        </span>
      </NeuCard>

      {/* Consent Checkboxes */}
      <NeuCard variant="raised" className="p-4 sm:p-5 text-left space-y-3 bg-surface">
        <button
          type="button"
          role="checkbox"
          aria-checked={agreeNonClinical}
          onClick={() => setAgreeNonClinical(!agreeNonClinical)}
          className="w-full text-left flex items-start gap-3 cursor-pointer p-2 rounded-xl hover:bg-brand-50/50 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <div className="mt-0.5 text-brand-700 shrink-0">
            {agreeNonClinical ? (
              <CheckSquare className="w-5 h-5 text-teal-600 fill-teal-100" />
            ) : (
              <Square className="w-5 h-5 text-text-muted" />
            )}
          </div>
          <div className="space-y-0.5 text-xs text-text-muted">
            <strong className="text-brand-900 font-semibold block">
              1. Batasan Nonklinis & Bukan Diagnosis
            </strong>
            <p className="leading-relaxed">
              Saya memahami bahwa AI ini bukan psikolog, psikiater, atau layanan gawat darurat klinis.
            </p>
          </div>
        </button>

        <button
          type="button"
          role="checkbox"
          aria-checked={agreePrivacy}
          onClick={() => setAgreePrivacy(!agreePrivacy)}
          className="w-full text-left flex items-start gap-3 cursor-pointer p-2 rounded-xl hover:bg-brand-50/50 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <div className="mt-0.5 text-brand-700 shrink-0">
            {agreePrivacy ? (
              <CheckSquare className="w-5 h-5 text-teal-600 fill-teal-100" />
            ) : (
              <Square className="w-5 h-5 text-text-muted" />
            )}
          </div>
          <div className="space-y-0.5 text-xs text-text-muted">
            <strong className="text-brand-900 font-semibold block">
              2. Privasi & Penyimpanan Sesi
            </strong>
            <p className="leading-relaxed">
              Saya memahami data catatan dan obrolan berada di memori peramban ini dan saya berhak berhenti atau menghapusnya kapan saja.
            </p>
          </div>
        </button>
      </NeuCard>

      {/* Proceed Button */}
      <div className="space-y-3 pt-1">
        <NeuButton
          size="lg"
          variant="primary"
          onClick={handleProceed}
          disabled={!canProceed}
          className="w-full text-sm shadow-neu-raised"
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Masuk ke Dashboard
        </NeuButton>

        <Link href="/" className="block text-xs text-text-muted hover:text-brand-900">
          ← Kembali ke halaman awal
        </Link>
      </div>
    </div>
  );
}
