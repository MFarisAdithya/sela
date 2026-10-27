"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, AlertCircle, ShieldCheck, Heart, Sparkles } from "lucide-react";
import { SelaLogo } from "@/components/ui/SelaLogo";
import { useAuth } from "@/context/AuthContext";

function MasukForm() {
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/app";

  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <div className="bg-[#FAFDFE] py-8 px-6 sm:px-9 rounded-3xl border border-[#BFD8F5] shadow-[0_18px_42px_rgba(30,86,160,0.09)]">
      {errorMsg && (
        <div className="mb-6 p-4 rounded-2xl bg-[#FFEBEB] border border-[#F5A9A9] text-xs sm:text-sm text-[#B42332] flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
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

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#1E56A0]">
              Kata Sandi
            </label>
            <Link
              href="/lupa-password"
              className="text-xs font-medium text-[#1E56A0] hover:underline"
            >
              Lupa kata sandi?
            </Link>
          </div>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-2xl bg-white border border-[#BFD8F5] px-4 py-3 text-sm text-[#102542] placeholder:text-[#35527A]/45 focus:outline-none focus:ring-2 focus:ring-[#1E56A0]"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="letterpress-primary w-full inline-flex items-center justify-center rounded-full py-3.5 px-4 text-sm font-semibold disabled:opacity-50"
        >
          {isSubmitting ? "Memproses..." : "Masuk ke SELA.AI"}
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </form>

      {/* Demo Hint */}
      <div className="mt-6 pt-5 border-t border-[#DCEAFB] text-center">
        <p className="text-xs text-[#35527A] mb-2">
          Akun demo default untuk pengujian:
        </p>
        <div className="p-2.5 rounded-xl bg-[#EBF3FF] border border-[#CCE1FF] text-[11px] font-mono-num font-semibold text-[#1E56A0]">
          alex@sela.ai / Password123!
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-[#35527A]">
        Belum punya akun?{" "}
        <Link href="/daftar" className="font-semibold text-[#1E56A0] hover:underline">
          Daftar gratis di sini
        </Link>
      </div>
    </div>
  );
}

export default function MasukPage() {
  return (
    <div className="min-h-screen bg-[#E8F1FC] flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8 text-[#102542]">
      <div className="max-w-5xl mx-auto w-full">
        {/* Top Brand Link */}
        <div className="mb-6 flex items-center justify-center lg:justify-start">
          <Link href="/" className="inline-block" aria-label="SELA.AI Beranda">
            <SelaLogo
              layout="horizontal"
              size="md"
              showTagline={false}
              showAiSuffix={true}
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Panel: Aura Menemani (Welcome Companion Panel) */}
          <div className="lg:col-span-6 rounded-3xl bg-gradient-to-br from-[#FAFDFE] via-[#F2F8FF] to-[#DCECFB] border border-[#BFD8F5] p-6 sm:p-8 shadow-[0_14px_34px_rgba(30,86,160,0.07)] flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#BFD8F5] text-xs font-semibold text-[#1E56A0] mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#D9822B]" />
              <span>Aura Siap Menemanimu</span>
            </div>

            <h2 className="font-serif-display text-2xl sm:text-3xl font-medium text-[#102542] leading-snug">
              Selamat datang kembali di ruang jedamu.
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#35527A] leading-relaxed max-w-md">
              Duduk santai sejenak bersama Aura. Lanjutkan menyusun cerita atau berlatih obrolan kapan pun kamu merasa siap.
            </p>

            {/* Aura Laptop Illustration */}
            <div className="my-4 w-48 sm:w-64 lg:w-72 aspect-[1024/935] mx-auto flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/aura/aura-auth-companion.png"
                alt="Aura duduk santai di samping laptop menyambut pengguna"
                className="w-full h-full object-contain drop-shadow-[0_14px_28px_rgba(30,86,160,0.16)]"
              />
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-[#BFD8F5]/70 text-left">
              <div className="flex items-center gap-2 text-xs text-[#35527A] bg-white/80 px-3 py-2 rounded-xl border border-[#DCEAFB]">
                <Heart className="w-3.5 h-3.5 text-[#E15B8C] shrink-0" />
                <span>Bebas menghakimi &amp; tenang</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#35527A] bg-white/80 px-3 py-2 rounded-xl border border-[#DCEAFB]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0F6E56] shrink-0" />
                <span>Privasi cerita terjaga</span>
              </div>
            </div>
          </div>

          {/* Right Panel: Form Login */}
          <div className="lg:col-span-6">
            <div className="mb-5 text-center lg:text-left">
              <h1 className="font-serif-display text-2xl sm:text-3xl font-medium tracking-tight text-[#102542]">
                Masuk ke Akunmu
              </h1>
              <p className="mt-1.5 text-sm text-[#35527A]">
                Lanjutkan persiapan komunikasimu di ruang yang aman.
              </p>
            </div>

            <Suspense fallback={<div className="p-8 text-center text-sm text-[#35527A]">Memuat formulir masuk...</div>}>
              <MasukForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
