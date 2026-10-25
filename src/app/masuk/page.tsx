"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, AlertCircle } from "lucide-react";
import { SelaLogo } from "@/components/ui/SelaLogo";
import { useAuth } from "@/context/AuthContext";

function MasukForm() {
  const router = useRouter();
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
    <div className="bg-[#F7FAFF] py-8 px-6 sm:px-10 rounded-3xl border border-[#CCE1FF] shadow-[6px_6px_16px_rgba(164,188,224,0.35),-6px_-6px_16px_rgba(255,255,255,0.95)]">
      {errorMsg && (
        <div className="mb-6 p-4 rounded-2xl bg-[#FFEBEB] border border-[#F5A9A9] text-xs sm:text-sm text-[#B42332] flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
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

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#2457A7]">
              Kata Sandi
            </label>
            <Link
              href="/lupa-password"
              className="text-xs text-[#2457A7] hover:underline"
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
            className="w-full rounded-2xl bg-white border border-[#CCE1FF] px-4 py-3 text-sm text-[#17365D] placeholder:text-[#17365D]/40 focus:outline-none focus:ring-2 focus:ring-[#2457A7] shadow-inner"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center rounded-full bg-[#2457A7] py-3.5 px-4 text-sm font-semibold text-white hover:bg-[#1C4477] transition-all shadow-md disabled:opacity-50"
        >
          {isSubmitting ? "Memproses..." : "Masuk ke SELA.AI"}
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </form>

      {/* Demo Hint */}
      <div className="mt-6 pt-5 border-t border-[#CCE1FF]/70 text-center">
        <p className="text-xs text-[#17365D]/60 mb-2">
          Akun demo default untuk pengujian:
        </p>
        <div className="p-2.5 rounded-xl bg-[#EBF3FF] text-[11px] font-mono text-[#2457A7]">
          alex@sela.ai / Password123!
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-[#17365D]/80">
        Belum punya akun?{" "}
        <Link href="/daftar" className="font-semibold text-[#2457A7] hover:underline">
          Daftar gratis di sini
        </Link>
      </div>
    </div>
  );
}

export default function MasukPage() {
  return (
    <div className="min-h-screen bg-[#E3EEFF] flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-[#17365D]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-block mb-4" aria-label="SELA.AI Beranda">
          <SelaLogo
            layout="horizontal"
            size="lg"
            showTagline={false}
            showAiSuffix={true}
          />
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#17365D]">
          Masuk ke Akunmu
        </h1>
        <p className="mt-2 text-sm text-[#17365D]/75">
          Lanjutkan persiapan komunikasimu di ruang yang aman.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <Suspense fallback={<div className="p-8 text-center text-sm text-text-muted">Memuat formulir masuk...</div>}>
          <MasukForm />
        </Suspense>
      </div>
    </div>
  );
}
