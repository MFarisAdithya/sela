"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, AlertCircle, Sparkles, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { SelaLogo } from "@/components/ui/SelaLogo";
import { useAuth } from "@/context/AuthContext";

function MasukForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/app";

  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email.trim() || !password) {
      setErrorMsg("Email dan kata sandi wajib diisi.");
      return;
    }

    setIsSubmitting(true);
    const res = await login(email, password);

    if (res.success) {
      window.location.href = redirectPath;
    } else {
      setIsSubmitting(false);
      setErrorMsg(res.error || "Email atau kata sandi tidak sesuai.");
    }
  };

  return (
    <div>
      {errorMsg && (
        <div className="mb-5 p-3.5 rounded-2xl bg-[#FFEBEB] border border-[#F5A9A9] text-xs sm:text-sm text-[#B42332] flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
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
            className="w-full rounded-2xl bg-[#FAFDFE] border border-[#BFD8F5] px-4 py-3 text-sm text-[#102542] placeholder:text-[#516B8C]/60 focus:outline-none focus:ring-2 focus:ring-[#1E56A0] focus:border-transparent transition-all shadow-sm"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E56A0]">
              Kata Sandi
            </label>
            <Link
              href="/lupa-password"
              className="text-xs font-medium text-[#1E56A0] hover:text-[#102542] hover:underline"
            >
              Lupa kata sandi?
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
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

        <button
          type="submit"
          disabled={isSubmitting}
          className="letterpress-primary w-full inline-flex items-center justify-center rounded-full py-3.5 px-5 text-sm font-semibold transition-all shadow-md disabled:opacity-50"
        >
          {isSubmitting ? "Memproses..." : "Masuk ke SELA.AI"}
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </form>

      {/* Demo Hint */}
      <div className="mt-6 pt-5 border-t border-[#BFD8F5]/70 text-center">
        <p className="text-xs text-[#516B8C] mb-2 font-medium">
          Akun demo default untuk pengujian:
        </p>
        <div className="p-2.5 rounded-xl bg-[#E8F1FC] border border-[#BFD8F5] text-[11px] font-mono text-[#1E56A0]">
          alex@sela.ai / Password123!
        </div>
      </div>

      <div className="mt-6 text-center text-xs sm:text-sm text-[#35527A]">
        Belum punya akun?{" "}
        <Link href="/daftar" className="font-semibold text-[#1E56A0] hover:text-[#102542] hover:underline">
          Daftar gratis di sini
        </Link>
      </div>
    </div>
  );
}

export default function MasukPage() {
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
              Hai, selamat datang kembali!
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#35527A] leading-relaxed">
              Aura sudah siap menemanimu mengurai apa yang terasa mengganjal dan menyiapkan kata-kata dengan tenang.
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
              &ldquo;Ceritakan apa adanya, aku ada di sini.&rdquo;
            </div>
          </div>

          {/* Reassurance pills */}
          <div className="space-y-2 text-xs text-[#35527A] border-t border-[#BFD8F5]/70 pt-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1A6B5A]" />
              <span>Ruang nonklinis yang aman &amp; tidak menghakimi</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1E56A0]" />
              <span>Catatan tersimpan aman di perangkatmu</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
          <div className="mb-6">
            <span className="font-mono-num text-[11px] font-semibold text-[#1E56A0] px-2.5 py-0.5 rounded-full bg-[#DCEAFB] border border-[#BFD8F5]">
              Ruang Masuk
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#102542] mt-2">
              Masuk ke Akunmu
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-[#35527A]">
              Lanjutkan persiapan komunikasimu di ruang yang aman bersama Aura.
            </p>
          </div>

          <Suspense fallback={<div className="p-8 text-center text-sm text-[#516B8C]">Memuat formulir masuk...</div>}>
            <MasukForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
