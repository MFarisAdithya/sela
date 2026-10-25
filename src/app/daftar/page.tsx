"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, AlertCircle, Shield } from "lucide-react";
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
    <div className="min-h-screen bg-[#E3EEFF] flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-[#17365D]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-block mb-4" aria-label="SELA.AI Beranda">
          <SelaLogo layout="horizontal" size="lg" showTagline={false} showAiSuffix={true} />
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#17365D]">
          Buat Akun Baru
        </h1>
        <p className="mt-2 text-sm text-[#17365D]/75">
          Mulai langkah pertamamu menyiapkan percakapan dengan tenang.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg px-4">
        <div className="bg-[#F7FAFF] py-8 px-6 sm:px-10 rounded-3xl border border-[#CCE1FF] shadow-[6px_6px_16px_rgba(164,188,224,0.35),-6px_-6px_16px_rgba(255,255,255,0.95)]">
          {errorMsg && (
            <div className="mb-6 p-4 rounded-2xl bg-[#FFEBEB] border border-[#F5A9A9] text-xs sm:text-sm text-[#B42332] flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#2457A7] mb-1.5">
                Nama Panggilan
              </label>
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Boleh nama samaran (contoh: Alex)"
                className="w-full rounded-2xl bg-white border border-[#CCE1FF] px-4 py-3 text-sm text-[#17365D] placeholder:text-[#17365D]/40 focus:outline-none focus:ring-2 focus:ring-[#2457A7] shadow-inner"
              />
              <span className="text-[11px] text-[#17365D]/60 mt-1 block">
                Bukan harus nama legal. Digunakan untuk sapaan di aplikasi.
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#2457A7] mb-1.5">
                Alamat Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full rounded-2xl bg-white border border-[#CCE1FF] px-4 py-3 text-sm text-[#17365D] placeholder:text-[#17365D]/40 focus:outline-none focus:ring-2 focus:ring-[#2457A7] shadow-inner"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2457A7] mb-1.5">
                  Kata Sandi
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 karakter"
                  className="w-full rounded-2xl bg-white border border-[#CCE1FF] px-4 py-3 text-sm text-[#17365D] placeholder:text-[#17365D]/40 focus:outline-none focus:ring-2 focus:ring-[#2457A7] shadow-inner"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2457A7] mb-1.5">
                  Konfirmasi Sandi
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ulangi kata sandi"
                  className="w-full rounded-2xl bg-white border border-[#CCE1FF] px-4 py-3 text-sm text-[#17365D] placeholder:text-[#17365D]/40 focus:outline-none focus:ring-2 focus:ring-[#2457A7] shadow-inner"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#2457A7] mb-1.5">
                Kelompok Usia
              </label>
              <select
                value={ageBand}
                onChange={(e) => setAgeBand(e.target.value as AgeBand)}
                className="w-full rounded-2xl bg-white border border-[#CCE1FF] px-4 py-3 text-sm text-[#17365D] focus:outline-none focus:ring-2 focus:ring-[#2457A7]"
              >
                <option value="15-18 tahun">15 – 18 tahun (Remaja)</option>
                <option value="19-24 tahun">19 – 24 tahun (Dewasa Muda)</option>
                <option value="Di atas 24 tahun">Di atas 24 tahun</option>
              </select>
            </div>

            {/* Separate Consents per PRD 2.3 & 5.2 */}
            <div className="pt-3 border-t border-[#CCE1FF]/70 space-y-3 text-xs text-[#17365D]/85">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-0.5 rounded text-[#2457A7] focus:ring-[#2457A7]"
                />
                <span>
                  Saya menyetujui{" "}
                  <Link href="/syarat" target="_blank" className="font-semibold text-[#2457A7] underline">
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
                  className="mt-0.5 rounded text-[#2457A7] focus:ring-[#2457A7]"
                />
                <span>
                  Saya telah membaca dan memahami{" "}
                  <Link href="/privasi" target="_blank" className="font-semibold text-[#2457A7] underline">
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
                  className="mt-0.5 rounded text-[#2457A7] focus:ring-[#2457A7]"
                />
                <span>
                  Saya bersedia menerima panduan refleksi berkala lewat email (opsional).
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 w-full inline-flex items-center justify-center rounded-full bg-[#2457A7] py-3.5 px-4 text-sm font-semibold text-white hover:bg-[#1C4477] transition-all shadow-md disabled:opacity-50"
            >
              {isSubmitting ? "Mendaftarkan..." : "Daftar Akun SELA.AI"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-[#17365D]/80">
            Sudah punya akun?{" "}
            <Link href="/masuk" className="font-semibold text-[#2457A7] hover:underline">
              Masuk di sini
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
