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
    <div className="min-h-screen bg-[#E3EEFF] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 text-[#17365D]">
      <div className="max-w-lg mx-auto w-full">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-3" aria-label="SELA.AI Beranda">
            <SelaLogo layout="horizontal" size="md" showTagline={false} showAiSuffix={true} />
          </Link>
          <div className="flex items-center justify-center gap-1.5 mt-2">
            {[1, 2, 3, 4].map((s) => (
              <span
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  s === step ? "w-8 bg-[#2457A7]" : s < step ? "w-3 bg-[#6FB1FF]" : "w-3 bg-[#CCE1FF]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Multi-Step Card */}
        <div className="bg-[#F7FAFF] p-6 sm:p-10 rounded-3xl border border-[#CCE1FF] shadow-[6px_6px_16px_rgba(164,188,224,0.35),-6px_-6px_16px_rgba(255,255,255,0.95)]">
          {/* STEP 1: Selamat Datang & Orientasi */}
          {step === 1 && (
            <div className="space-y-6 text-center animate-in fade-in duration-200">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#2457A7] px-3 py-1 rounded-full bg-[#EBF3FF]">
                Langkah 1 dari 4
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#17365D]">
                Kamu tidak harus langsung tahu harus mulai dari mana.
              </h1>
              <p className="text-sm sm:text-base text-[#17365D]/85 leading-relaxed">
                SELA.AI hadir sebagai ruang jeda yang tenang. Di sini, kamu boleh berhenti sejenak, mengurai apa yang terasa mengganjal, dan menyiapkan kata-kata sebelum berbicara dengan orang lain.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full inline-flex items-center justify-center rounded-full bg-[#2457A7] py-3.5 px-6 text-sm font-semibold text-white hover:bg-[#1C4477] transition-all shadow-md"
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
                <span className="text-xs font-semibold uppercase tracking-wider text-[#2457A7] px-3 py-1 rounded-full bg-[#EBF3FF]">
                  Langkah 2 dari 4
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-[#17365D] mt-3">
                  Tiga Batasan Penting SELA.AI
                </h2>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm text-[#17365D]/85">
                <div className="p-4 rounded-2xl bg-white border border-[#CCE1FF] flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#2457A7] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#17365D]">Bukan Pengganti Psikolog/Dokter</strong>
                    SELA.AI tidak membuat diagnosis medis atau meresepkan terapi. Kami adalah alat bantu refleksi mandiri.
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#CCE1FF] flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-[#2457A7] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#17365D]">AI Mitra Latihan, Bukan Manusia</strong>
                    AI dapat keliru dan tidak menggantikan kehangatan percakapan nyata dengan manusia tepercaya.
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#CCE1FF] flex items-start gap-3">
                  <Lock className="w-5 h-5 text-[#1F7A65] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#17365D]">Bantuan Keselamatan Bebas Akses</strong>
                    Informasi bantuan, nomor darurat, dan kontak rujukan tidak akan pernah dikunci di balik biaya.
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-3 rounded-full border border-[#CCE1FF] text-xs font-semibold text-[#17365D]/80 hover:bg-white"
                >
                  <ArrowLeft className="w-4 h-4 mr-1 inline" /> Kembali
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 inline-flex items-center justify-center rounded-full bg-[#2457A7] py-3.5 px-4 text-sm font-semibold text-white hover:bg-[#1C4477] transition-all shadow-md"
                >
                  Saya Paham, Lanjut
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Pilihan Tujuan Utama (Opsional) */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="text-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#2457A7] px-3 py-1 rounded-full bg-[#EBF3FF]">
                  Langkah 3 dari 4
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-[#17365D] mt-3">
                  Apa yang paling ingin kamu lakukan hari ini?
                </h2>
                <p className="text-xs text-[#17365D]/70 mt-1">
                  Pilihan ini opsional dan boleh kamu lewati.
                </p>
              </div>

              <div className="space-y-3">
                {goals.map((g) => {
                  const Icon = g.icon;
                  const isSelected = selectedGoal === g.id;
                  return (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setSelectedGoal(isSelected ? null : g.id)}
                      className={`w-full p-4 rounded-2xl border text-left flex items-center gap-3.5 transition-all ${
                        isSelected
                          ? "bg-[#EBF3FF] border-[#2457A7] shadow-sm font-medium"
                          : "bg-white border-[#CCE1FF] hover:border-[#2457A7]/50"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          isSelected ? "bg-[#2457A7] text-white" : "bg-[#F7FAFF] text-[#2457A7]"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-sm text-[#17365D] leading-snug">{g.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-3 rounded-full border border-[#CCE1FF] text-xs font-semibold text-[#17365D]/80 hover:bg-white"
                >
                  <ArrowLeft className="w-4 h-4 mr-1 inline" /> Kembali
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="flex-1 inline-flex items-center justify-center rounded-full bg-[#2457A7] py-3.5 px-4 text-sm font-semibold text-white hover:bg-[#1C4477] transition-all shadow-md"
                >
                  {selectedGoal ? "Lanjut dengan Pilihan Ini" : "Lewati & Lanjut"}
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Nama Panggilan & Izin AI */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="text-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#2457A7] px-3 py-1 rounded-full bg-[#EBF3FF]">
                  Langkah 4 dari 4
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-[#17365D] mt-3">
                  Terakhir, Mau Dipanggil Apa?
                </h2>
                <p className="text-xs text-[#17365D]/70 mt-1">
                  Boleh nama samaran agar kamu merasa lebih nyaman.
                </p>
              </div>

              <div>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="Contoh: Alex atau Kawan"
                  className="w-full rounded-2xl bg-white border border-[#CCE1FF] px-4 py-3.5 text-base text-[#17365D] placeholder:text-[#17365D]/40 focus:outline-none focus:ring-2 focus:ring-[#2457A7] shadow-inner text-center font-semibold"
                />
              </div>

              {/* Explicit AI Consent Checkbox (PRD Section 4.1 point 11 & 5.2) */}
              <div className="p-4 rounded-2xl bg-[#EBF3FF] border border-[#CCE1FF]/80 text-xs text-[#17365D]/85">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={aiConsent}
                    onChange={(e) => setAiConsent(e.target.checked)}
                    className="mt-0.5 rounded text-[#2457A7] focus:ring-[#2457A7]"
                  />
                  <span>
                    Saya mengizinkan pengiriman teks cerita dan latihan ke <strong>Google Gemini API</strong> saat saya menggunakan fitur bantuan AI SELA.AI.
                  </span>
                </label>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-5 py-3 rounded-full border border-[#CCE1FF] text-xs font-semibold text-[#17365D]/80 hover:bg-white"
                >
                  <ArrowLeft className="w-4 h-4 mr-1 inline" /> Kembali
                </button>
                <button
                  type="button"
                  onClick={handleFinish}
                  disabled={isSubmitting}
                  className="flex-1 inline-flex items-center justify-center rounded-full bg-[#2457A7] py-3.5 px-4 text-sm font-semibold text-white hover:bg-[#1C4477] transition-all shadow-md disabled:opacity-50"
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
