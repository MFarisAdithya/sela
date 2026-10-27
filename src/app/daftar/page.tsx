"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, AlertCircle, ShieldCheck, Heart, Sparkles } from "lucide-react";
import { SelaLogo } from "@/components/ui/SelaLogo";
import { useAuth } from "@/context/AuthContext";
import { AgeBand } from "@/types/auth";

export default function DaftarPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [ageBand, setAgeBand] = useState<AgeBand>("15-18 tahun");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAcknowledged, setPrivacyAcknowledged] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!displayName.trim() || displayName.trim().length < 2) {
      setErrorMsg("Nama panggilan minimal 2 karakter.");
      return;
    }
    if (!email.trim()) {
      setErrorMsg("Alamat email wajib diisi.");
      return;
    }
    if (password.length < 8) {
      setErrorMsg("Kata sandi minimal 8 karakter.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg("Konfirmasi kata sandi tidak cocok.");
      return;
    }
    if (!termsAccepted) {
      setErrorMsg("Kamu perlu menyetujui Ketentuan Layanan.");
      return;
    }
    if (!privacyAcknowledged) {
      setErrorMsg("Kamu perlu membaca dan menyetujui Pemberitahuan Privasi.");
      return;
    }

    setIsSubmitting(true);
    const res = await register({
      displayName: displayName.trim(),
      email: email.trim(),
      password,
      ageBand,
      termsAccepted,
      privacyAcknowledged,
      marketingOptIn,
    });
    setIsSubmitting(false);

    if (res.success) {
      router.push("/verifikasi-email");
    } else {
      setErrorMsg(res.error || "Pendaftaran tidak dapat diproses.");
    }
  };

  return (
    <div className="min-h-screen bg-[#E8F1FC] flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8 text-[#102542]">
      <div className="max-w-5xl mx-auto w-full">
        {/* Top Brand Link */}
        <div className="mb-6 flex items-center justify-center lg:justify-start">
          <Link href="/" className="inline-block" aria-label="SELA.AI Beranda">
            <SelaLogo layout="horizontal" size="md" showTagline={false} showAiSuffix={true} />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Panel: Aura Menemani (Welcome Companion Panel) */}
          <div className="lg:col-span-5 lg:sticky lg:top-8 rounded-3xl bg-gradient-to-br from-[#FAFDFE] via-[#F2F8FF] to-[#DCECFB] border border-[#BFD8F5] p-6 sm:p-8 shadow-[0_14px_34px_rgba(30,86,160,0.07)] flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#BFD8F5] text-xs font-semibold text-[#1E56A0] mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#D9822B]" />
              <span>Kenalan dengan Aura</span>
            </div>

            <h2 className="font-serif-display text-2xl sm:text-3xl font-medium text-[#102542] leading-snug">
              Teman yang siap mendengarkan ceritamu.
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#35527A] leading-relaxed">
              Tidak perlu langsung tahu harus bicara apa. Bersama Aura, kita urai pelan-pelan sampai kamu merasa siap.
            </p>

            {/* Aura Laptop Illustration */}
            <div className="my-4 w-48 sm:w-60 lg:w-64 aspect-[1024/935] mx-auto flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/aura/aura-auth-companion.png"
                alt="Aura duduk santai di samping laptop menyambut pengguna baru"
                className="w-full h-full object-contain drop-shadow-[0_14px_28px_rgba(30,86,160,0.16)]"
              />
            </div>

            <div className="w-full space-y-2 pt-2 border-t border-[#BFD8F5]/70 text-left">
              <div className="flex items-center gap-2 text-xs text-[#35527A] bg-white/80 px-3 py-2 rounded-xl border border-[#DCEAFB]">
                <Heart className="w-3.5 h-3.5 text-[#E15B8C] shrink-0" />
                <span>Boleh pakai nama panggilan atau samaran</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#35527A] bg-white/80 px-3 py-2 rounded-xl border border-[#DCEAFB]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0F6E56] shrink-0" />
                <span>Gratis &amp; akses bantuan darurat tanpa syarat</span>
              </div>
            </div>
          </div>

          {/* Right Panel: Form Daftar */}
          <div className="lg:col-span-7">
            <div className="mb-5 text-center lg:text-left">
              <h1 className="font-serif-display text-2xl sm:text-3xl font-medium tracking-tight text-[#102542]">
                Buat Akun Baru
              </h1>
              <p className="mt-1.5 text-sm text-[#35527A]">
                Mulai langkah pertamamu menyiapkan percakapan dengan tenang.
              </p>
            </div>

            <div className="bg-[#FAFDFE] py-8 px-6 sm:px-9 rounded-3xl border border-[#BFD8F5] shadow-[0_18px_42px_rgba(30,86,160,0.09)]">
              {errorMsg && (
                <div className="mb-6 p-4 rounded-2xl bg-[#FFEBEB] border border-[#F5A9A9] text-xs sm:text-sm text-[#B42332] flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E56A0] mb-1.5">
                    Nama Panggilan
                  </label>
                  <input
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Boleh nama samaran (contoh: Alex)"
                    className="w-full rounded-2xl bg-white border border-[#BFD8F5] px-4 py-3 text-sm text-[#102542] placeholder:text-[#35527A]/45 focus:outline-none focus:ring-2 focus:ring-[#1E56A0]"
                  />
                  <span className="text-[11px] text-[#35527A] mt-1 block">
                    Bukan harus nama legal. Digunakan untuk sapaan di aplikasi.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E56A0] mb-1.5">
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full rounded-2xl bg-white border border-[#BFD8F5] px-4 py-3 text-sm text-[#102542] placeholder:text-[#35527A]/45 focus:outline-none focus:ring-2 focus:ring-[#1E56A0]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E56A0] mb-1.5">
                      Kata Sandi
                    </label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min. 8 karakter"
                      className="w-full rounded-2xl bg-white border border-[#BFD8F5] px-4 py-3 text-sm text-[#102542] placeholder:text-[#35527A]/45 focus:outline-none focus:ring-2 focus:ring-[#1E56A0]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E56A0] mb-1.5">
                      Konfirmasi Sandi
                    </label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Ulangi kata sandi"
                      className="w-full rounded-2xl bg-white border border-[#BFD8F5] px-4 py-3 text-sm text-[#102542] placeholder:text-[#35527A]/45 focus:outline-none focus:ring-2 focus:ring-[#1E56A0]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E56A0] mb-1.5">
                    Kelompok Usia
                  </label>
                  <select
                    value={ageBand}
                    onChange={(e) => setAgeBand(e.target.value as AgeBand)}
                    className="w-full rounded-2xl bg-white border border-[#BFD8F5] px-4 py-3 text-sm text-[#102542] focus:outline-none focus:ring-2 focus:ring-[#1E56A0]"
                  >
                    <option value="15-18 tahun">15 – 18 tahun (Remaja)</option>
                    <option value="19-24 tahun">19 – 24 tahun (Dewasa Muda)</option>
                    <option value="Di atas 24 tahun">Di atas 24 tahun</option>
                  </select>
                </div>

                {/* Separate Consents */}
                <div className="pt-3 border-t border-[#DCEAFB] space-y-3 text-xs text-[#35527A]">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-0.5 rounded text-[#1E56A0] focus:ring-[#1E56A0]"
                    />
                    <span>
                      Saya menyetujui{" "}
                      <Link href="/syarat" target="_blank" className="font-semibold text-[#1E56A0] underline">
                        Ketentuan Layanan SELA.AI
                      </Link>{" "}
                      dan memahami batas nonklinis layanan ini. <strong className="text-[#B42332]">*</strong>
                    </span>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacyAcknowledged}
                      onChange={(e) => setPrivacyAcknowledged(e.target.checked)}
                      className="mt-0.5 rounded text-[#1E56A0] focus:ring-[#1E56A0]"
                    />
                    <span>
                      Saya telah membaca dan memahami{" "}
                      <Link href="/privasi" target="_blank" className="font-semibold text-[#1E56A0] underline">
                        Pemberitahuan Privasi
                      </Link>
                      . <strong className="text-[#B42332]">*</strong>
                    </span>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={marketingOptIn}
                      onChange={(e) => setMarketingOptIn(e.target.checked)}
                      className="mt-0.5 rounded text-[#1E56A0] focus:ring-[#1E56A0]"
                    />
                    <span>
                      Saya bersedia menerima panduan refleksi berkala lewat email (opsional).
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="letterpress-primary mt-4 w-full inline-flex items-center justify-center rounded-full py-3.5 px-4 text-sm font-semibold disabled:opacity-50"
                >
                  {isSubmitting ? "Mendaftarkan..." : "Daftar Akun SELA.AI"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-[#35527A]">
                Sudah punya akun?{" "}
                <Link href="/masuk" className="font-semibold text-[#1E56A0] hover:underline">
                  Masuk di sini
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
