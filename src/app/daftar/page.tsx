"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, AlertCircle, Sparkles, Eye, EyeOff } from "lucide-react";
import { SelaLogo } from "@/components/ui/SelaLogo";
import { useAuth } from "@/context/AuthContext";
import { AgeBand } from "@/types/auth";

export default function DaftarPage() {
  const { register } = useAuth();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [ageBand, setAgeBand] = useState<AgeBand>("15-18 tahun");
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [privacyAcknowledged, setPrivacyAcknowledged] = useState(true);
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const finalName = displayName.trim() || (email.trim() ? email.trim().split("@")[0] : "Kawan Sela");
    const finalEmail = email.trim() || `${finalName.toLowerCase().replace(/\s+/g, ".")}@sela.ai`;
    const finalPassword = password || "demo123";

    setIsSubmitting(true);
    const res = await register({
      displayName: finalName,
      email: finalEmail,
      password: finalPassword,
      ageBand,
      termsAccepted: true,
      privacyAcknowledged: true,
      marketingOptIn,
    });

    if (res.success) {
      window.location.href = "/app";
    } else {
      setIsSubmitting(false);
      setErrorMsg(res.error || "Pendaftaran tidak dapat diproses.");
    }
  };

  return (
    <div className="min-h-screen bg-[#E8F1FC] flex flex-col justify-center py-10 sm:py-16 px-4 sm:px-6 lg:px-8 text-[#102542]">
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <Link href="/" className="inline-block" aria-label="SELA.AI Beranda">
          <SelaLogo
            layout="horizontal"
            size="lg"
            showTagline={false}
            showAiSuffix={true}
          />
        </Link>
      </div>

      {/* Main 2-Column Responsive Card: Side Welcome Panel with Aura + Form */}
      <div className="mx-auto w-full max-w-4xl bg-[#FAFDFE] rounded-3xl border border-[#BFD8F5] shadow-[0_20px_50px_rgba(46,99,214,0.12)] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Side: Aura Menemani Welcome Panel */}
        <div className="lg:col-span-5 bg-gradient-to-b from-[#E8F1FC]/80 via-[#F4F8FF] to-[#FAFDFE] p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#BFD8F5]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAFDFE] border border-[#BFD8F5] text-xs font-semibold text-[#1E56A0] mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#D9822B]" />
              <span>Aura Menemani</span>
            </div>

            <h2 className="font-serif-display text-2xl sm:text-3xl font-medium tracking-tight text-[#102542] leading-tight">
              Mulai langkahmu bersama Aura
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#35527A] leading-relaxed">
              Nggak perlu terburu-buru. Di SELA.AI, kamu bisa mengurai apa pun yang terasa berat dengan tenang.
            </p>
          </div>

          {/* Central Aura Laptop Illustration */}
          <div className="my-6 flex flex-col items-center justify-center relative">
            <div className="absolute w-56 h-56 rounded-full bg-gradient-to-tr from-[#6BA8FF]/25 via-[#D6E9FF]/40 to-transparent blur-xl -z-10" />
            <img
              src="/images/aura/aura-laptop-welcome.png"
              alt="Aura duduk santai di samping laptop menyambutmu"
              className="w-56 sm:w-64 h-auto object-contain drop-shadow-[0_12px_24px_rgba(30,86,160,0.15)] animate-in fade-in"
            />
            <div className="mt-3 px-3.5 py-1.5 rounded-full bg-[#FAFDFE] border border-[#BFD8F5] text-[11px] font-semibold text-[#1E56A0] shadow-sm">
              &ldquo;Langkah kecil hari ini sudah sangat berarti.&rdquo;
            </div>
          </div>

          {/* Reassurance pills */}
          <div className="space-y-2 text-xs text-[#35527A] border-t border-[#BFD8F5]/70 pt-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1A6B5A]" />
              <span>Boleh nama panggilan / samaran</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1E56A0]" />
              <span>Jalur bantuan krisis selalu terbuka bebas biaya</span>
            </div>
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
          <div className="mb-6">
            <span className="font-mono-num text-[11px] font-semibold text-[#1E56A0] px-2.5 py-0.5 rounded-full bg-[#DCEAFB] border border-[#BFD8F5]">
              Pendaftaran Akun
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#102542] mt-2">
              Buat Akun Baru
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-[#35527A]">
              Mulai langkah pertamamu menyiapkan percakapan dengan tenang.
            </p>
          </div>

          {errorMsg && (
            <div className="mb-5 p-3.5 rounded-2xl bg-[#FFEBEB] border border-[#F5A9A9] text-xs sm:text-sm text-[#B42332] flex items-start gap-2.5">
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
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Boleh nama samaran (contoh: Alex)"
                className="w-full rounded-2xl bg-[#FAFDFE] border border-[#BFD8F5] px-4 py-3 text-sm text-[#102542] placeholder:text-[#516B8C]/60 focus:outline-none focus:ring-2 focus:ring-[#1E56A0] focus:border-transparent transition-all shadow-sm"
              />
              <span className="text-[11px] text-[#516B8C] mt-1 block">
                Bukan harus nama legal. Digunakan untuk sapaan hangat di aplikasi.
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E56A0] mb-1.5">
                Alamat Email
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com (bebas diisi apa saja)"
                className="w-full rounded-2xl bg-[#FAFDFE] border border-[#BFD8F5] px-4 py-3 text-sm text-[#102542] placeholder:text-[#516B8C]/60 focus:outline-none focus:ring-2 focus:ring-[#1E56A0] focus:border-transparent transition-all shadow-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E56A0] mb-1.5">
                  Kata Sandi
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Bebas isi sandi"
                    className="w-full rounded-2xl bg-[#FAFDFE] border border-[#BFD8F5] px-4 py-3 pr-11 text-sm text-[#102542] placeholder:text-[#516B8C]/60 focus:outline-none focus:ring-2 focus:ring-[#1E56A0] focus:border-transparent transition-all shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#516B8C] hover:text-[#1E56A0] transition-colors p-1"
                    aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E56A0] mb-1.5">
                  Konfirmasi Sandi
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Ulangi kata sandi"
                    className="w-full rounded-2xl bg-[#FAFDFE] border border-[#BFD8F5] px-4 py-3 pr-11 text-sm text-[#102542] placeholder:text-[#516B8C]/60 focus:outline-none focus:ring-2 focus:ring-[#1E56A0] focus:border-transparent transition-all shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#516B8C] hover:text-[#1E56A0] transition-colors p-1"
                    aria-label={showConfirmPassword ? "Sembunyikan konfirmasi sandi" : "Tampilkan konfirmasi sandi"}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E56A0] mb-1.5">
                Kelompok Usia
              </label>
              <select
                value={ageBand}
                onChange={(e) => setAgeBand(e.target.value as AgeBand)}
                className="w-full rounded-2xl bg-[#FAFDFE] border border-[#BFD8F5] px-4 py-3 text-sm text-[#102542] focus:outline-none focus:ring-2 focus:ring-[#1E56A0] focus:border-transparent transition-all shadow-sm"
              >
                <option value="15-18 tahun">15 – 18 tahun (Remaja)</option>
                <option value="19-24 tahun">19 – 24 tahun (Dewasa Muda)</option>
                <option value="Di atas 24 tahun">Di atas 24 tahun</option>
              </select>
            </div>

            {/* Separate Consents */}
            <div className="pt-3 border-t border-[#BFD8F5]/70 space-y-2.5 text-xs text-[#35527A]">
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
              className="letterpress-primary mt-2 w-full inline-flex items-center justify-center rounded-full py-3.5 px-5 text-sm font-semibold transition-all shadow-md disabled:opacity-50"
            >
              {isSubmitting ? "Mendaftarkan..." : "Daftar & Langsung Masuk"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </form>

          <div className="mt-6 text-center text-xs sm:text-sm text-[#35527A]">
            Sudah punya akun atau ingin langsung masuk?{" "}
            <Link href="/masuk" className="font-semibold text-[#1E56A0] hover:text-[#102542] hover:underline">
              Masuk di sini
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
