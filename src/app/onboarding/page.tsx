"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Lock,
  MessageSquareHeart,
  MessageCircle,
  Users,
  BookOpen,
} from "lucide-react";
import { SelaLogo } from "@/components/ui/SelaLogo";
import { useAuth } from "@/context/AuthContext";
import { useApp } from "@/context/AppContext";

export default function OnboardingPage() {
  const router = useRouter();
  const { user, updateProfile, updateConsent } = useAuth();
  const { setUserName } = useApp();

  const [step, setStep] = useState(1);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [nickname, setNickname] = useState(user?.displayName || "Alex");
  const [aiConsent, setAiConsent] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const goals = [
    { id: "story", label: "Menyusun cerita yang kusut di kepala", icon: MessageSquareHeart },
    { id: "practice", label: "Berlatih sebelum bicara dengan seseorang", icon: MessageCircle },
    { id: "support", label: "Mencari opsi bantuan nyata yang aman", icon: Users },
    { id: "learn", label: "Belajar keterampilan mengelola emosi & hidup", icon: BookOpen },
  ];

  const handleFinish = async () => {
    setIsSubmitting(true);
    const finalName = nickname.trim() || "Kawan";
    setUserName(finalName);

    try {
      sessionStorage.setItem("sela:nickname", finalName);
      sessionStorage.setItem("sela_chat_consent", "true");
    } catch {
      // safe fallback
    }

    if (user) {
      await updateProfile({
        displayName: finalName,
        onboardingCompleted: true,
      });
      await updateConsent({
        aiProcessingConsent: aiConsent,
      });
    }

    setIsSubmitting(false);
    window.location.href = "/app";
  };

  return (
    <div className="min-h-screen bg-[#E8F1FC] flex flex-col justify-center py-10 sm:py-16 px-4 sm:px-6 lg:px-8 text-[#102542]">
      <div className="max-w-xl mx-auto w-full">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-block mb-3" aria-label="SELA.AI Beranda">
            <SelaLogo layout="horizontal" size="md" showTagline={false} showAiSuffix={true} />
          </Link>
          <div className="flex items-center justify-center gap-1.5 mt-2">
            {[1, 2, 3, 4].map((s) => (
              <span
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  s === step ? "w-8 bg-[#1E56A0]" : s < step ? "w-3 bg-[#6BA8FF]" : "w-3 bg-[#BFD8F5]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Multi-Step Card */}
        <div className="bg-[#FAFDFE] p-6 sm:p-10 rounded-3xl border border-[#BFD8F5] shadow-[0_20px_50px_rgba(46,99,214,0.12)]">
          {/* STEP 1: Selamat Datang & Orientasi — Aura Memandu */}
          {step === 1 && (
            <div className="space-y-6 text-center animate-in fade-in duration-200">
              <span className="font-mono-num text-[11px] font-semibold text-[#1E56A0] px-3 py-1 rounded-full bg-[#DCEAFB] border border-[#BFD8F5]">
                Langkah 1 dari 4 — Aura Memandu
              </span>

              {/* Aura Memandu Illustration */}
              <div className="flex flex-col items-center justify-center relative pt-2">
                <div className="absolute w-44 h-44 rounded-full bg-gradient-to-tr from-[#6BA8FF]/20 via-[#D6E9FF]/40 to-transparent blur-xl -z-10" />
                <img
                  src="/images/aura/aura-memandu.png"
                  alt="Aura memegang papan kecil checklist dan menunjuk ke langkah berikutnya"
                  className="w-48 sm:w-56 h-auto object-contain drop-shadow-[0_12px_24px_rgba(30,86,160,0.16)] animate-in fade-in"
                />
                <div className="mt-2.5 px-3.5 py-1.5 rounded-full bg-[#FAFDFE] border border-[#BFD8F5] text-xs font-semibold text-[#1E56A0] shadow-sm">
                  &ldquo;Hai! Aku Aura, teman memandumu di SELA.AI&rdquo;
                </div>
              </div>

              <div>
                <h1 className="font-serif-display text-2xl sm:text-3xl font-medium tracking-tight text-[#102542] leading-snug">
                  Kamu tidak harus langsung tahu harus mulai dari mana.
                </h1>
                <p className="mt-2 text-xs sm:text-sm text-[#35527A] leading-relaxed max-w-md mx-auto">
                  SELA.AI hadir sebagai ruang jeda yang tenang bersama Aura. Di sini, kamu boleh berhenti sejenak, mengurai apa yang terasa mengganjal, dan menyiapkan kata-kata sebelum bicara.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="letterpress-primary w-full inline-flex items-center justify-center rounded-full py-3.5 px-6 text-sm font-semibold transition-all shadow-md"
                >
                  Lanjut: Batasan &amp; Keamanan SELA.AI
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Batasan AI & Kejujuran Layanan */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="text-center">
                <span className="font-mono-num text-[11px] font-semibold text-[#1E56A0] px-3 py-1 rounded-full bg-[#DCEAFB] border border-[#BFD8F5]">
                  Langkah 2 dari 4
                </span>
                <h2 className="font-serif-display text-2xl sm:text-3xl font-medium tracking-tight text-[#102542] mt-3">
                  Tiga Batasan Penting SELA.AI
                </h2>
                <p className="text-xs text-[#35527A] mt-1">
                  Transparansi dan rasa amanmu adalah prioritas utama kami.
                </p>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-[#35527A]">
                <div className="p-4 rounded-2xl bg-[#F4F8FF] border border-[#BFD8F5] flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#1E56A0] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#102542]">Bukan Pengganti Psikolog/Dokter</strong>
                    SELA.AI tidak membuat diagnosis medis atau meresepkan terapi. Kami adalah alat bantu refleksi mandiri.
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#F4F8FF] border border-[#BFD8F5] flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-[#1E56A0] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#102542]">Mitra Latihan, Bukan Pengganti Manusia</strong>
                    Simulasi latihan ini tidak menggantikan kehangatan percakapan nyata dengan manusia tepercaya.
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#F4F8FF] border border-[#BFD8F5] flex items-start gap-3">
                  <Lock className="w-5 h-5 text-[#1A6B5A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#102542]">Bantuan Keselamatan Bebas Akses</strong>
                    Informasi bantuan, nomor darurat, dan kontak rujukan tidak akan pernah dikunci di balik biaya.
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-3 rounded-full border border-[#BFD8F5] text-xs font-semibold text-[#35527A] hover:bg-[#FAFDFE] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-1 inline" /> Kembali
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="letterpress-primary flex-1 inline-flex items-center justify-center rounded-full py-3.5 px-4 text-sm font-semibold transition-all shadow-md"
                >
                  Saya Paham, Lanjut
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Pilihan Tujuan Utama (Opsional) — Aura Memandu */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Mini Aura Guide Header */}
              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#F4F8FF] border border-[#BFD8F5]">
                <img
                  src="/images/aura/aura-memandu.png"
                  alt="Aura memandu pilihan tujuan"
                  className="w-16 sm:w-20 h-16 sm:h-20 object-contain shrink-0 drop-shadow-sm"
                />
                <div className="min-w-0 flex-1">
                  <span className="block text-xs font-bold text-[#1E56A0]">
                    Panduan Aura
                  </span>
                  <p className="text-xs text-[#35527A] leading-tight mt-0.5">
                    Pilih langkah yang paling nyaman untukmu hari ini. Pilihan ini opsional dan boleh kamu lewati kapan saja.
                  </p>
                </div>
              </div>

              <div className="text-center">
                <span className="font-mono-num text-[11px] font-semibold text-[#1E56A0] px-3 py-1 rounded-full bg-[#DCEAFB] border border-[#BFD8F5]">
                  Langkah 3 dari 4 — Pemilihan Tujuan
                </span>
                <h2 className="font-serif-display text-2xl sm:text-3xl font-medium tracking-tight text-[#102542] mt-2">
                  Apa yang paling ingin kamu lakukan hari ini?
                </h2>
              </div>

              <div className="space-y-2.5">
                {goals.map((g) => {
                  const Icon = g.icon;
                  const isSelected = selectedGoal === g.id;
                  return (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setSelectedGoal(isSelected ? null : g.id)}
                      className={`w-full p-3.5 rounded-2xl border text-left flex items-center gap-3.5 transition-all ${
                        isSelected
                          ? "bg-[#E8F1FC] border-[#1E56A0] shadow-sm font-medium"
                          : "bg-[#FAFDFE] border-[#BFD8F5] hover:border-[#1E56A0]/50"
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          isSelected ? "bg-[#1E56A0] text-white" : "bg-[#DCEAFB] text-[#1E56A0]"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs sm:text-sm text-[#102542] leading-snug">{g.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-3 rounded-full border border-[#BFD8F5] text-xs font-semibold text-[#35527A] hover:bg-[#FAFDFE] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-1 inline" /> Kembali
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="letterpress-primary flex-1 inline-flex items-center justify-center rounded-full py-3.5 px-4 text-sm font-semibold transition-all shadow-md"
                >
                  {selectedGoal ? "Lanjut dengan Pilihan Ini" : "Lewati & Lanjut"}
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Nama Panggilan & Izin AI — Preferensi Pengguna */}
          {step === 4 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Mini Aura Guide Header */}
              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#F4F8FF] border border-[#BFD8F5]">
                <img
                  src="/images/aura/aura-memandu.png"
                  alt="Aura memandu preferensi nama"
                  className="w-16 sm:w-20 h-16 sm:h-20 object-contain shrink-0 drop-shadow-sm"
                />
                <div className="min-w-0 flex-1">
                  <span className="block text-xs font-bold text-[#1E56A0]">
                    Satu Langkah Terakhir!
                  </span>
                  <p className="text-xs text-[#35527A] leading-tight mt-0.5">
                    Beri tahu Aura nama sapaan ternyamanmu agar kita bisa saling menyapa dengan hangat di SELA.AI.
                  </p>
                </div>
              </div>

              <div className="text-center">
                <span className="font-mono-num text-[11px] font-semibold text-[#1E56A0] px-3 py-1 rounded-full bg-[#DCEAFB] border border-[#BFD8F5]">
                  Langkah 4 dari 4 — Preferensi Sapaan
                </span>
                <h2 className="font-serif-display text-2xl sm:text-3xl font-medium tracking-tight text-[#102542] mt-2">
                  Mau Dipanggil Siapa?
                </h2>
                <p className="text-xs text-[#35527A] mt-1">
                  Boleh nama samaran atau nama panggilan apa pun.
                </p>
              </div>

              <div>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="Contoh: Alex atau Kawan"
                  className="w-full rounded-2xl bg-[#FAFDFE] border border-[#BFD8F5] px-4 py-3.5 text-base text-[#102542] placeholder:text-[#516B8C]/60 focus:outline-none focus:ring-2 focus:ring-[#1E56A0] focus:border-transparent transition-all shadow-sm text-center font-semibold"
                />
              </div>

              {/* Explicit Consent Checkbox */}
              <div className="p-4 rounded-2xl bg-[#F4F8FF] border border-[#BFD8F5] text-xs text-[#35527A]">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={aiConsent}
                    onChange={(e) => setAiConsent(e.target.checked)}
                    className="mt-0.5 rounded text-[#1E56A0] focus:ring-[#1E56A0]"
                  />
                  <span>
                    Saya memahami batas layanan nonklinis dan menyetujui pemrosesan cerita latihan secara aman bersama Aura di SELA.AI.
                  </span>
                </label>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-5 py-3 rounded-full border border-[#BFD8F5] text-xs font-semibold text-[#35527A] hover:bg-[#FAFDFE] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-1 inline" /> Kembali
                </button>
                <button
                  type="button"
                  onClick={handleFinish}
                  disabled={isSubmitting}
                  className="letterpress-primary flex-1 inline-flex items-center justify-center rounded-full py-3.5 px-4 text-sm font-semibold transition-all shadow-md disabled:opacity-50"
                >
                  {isSubmitting ? "Menyiapkan Ruangmu..." : "Mulai Masuk ke SELA.AI"}
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
