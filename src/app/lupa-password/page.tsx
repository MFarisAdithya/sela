"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, CheckCircle2, ArrowRight } from "lucide-react";
import { SelaLogo } from "@/components/ui/SelaLogo";

export default function LupaPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    try {
      await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
    } catch {
      // safe fallback
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#E3EEFF] flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-[#17365D]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-block mb-4" aria-label="SELA.AI Beranda">
          <SelaLogo layout="horizontal" size="lg" showTagline={false} showAiSuffix={true} />
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#17365D]">
          Pulihkan Kata Sandi
        </h1>
        <p className="mt-2 text-sm text-[#17365D]/75">
          Kami akan mengirimkan instruksi pengaturan ulang kata sandi ke emailmu.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-[#F7FAFF] py-8 px-6 sm:px-10 rounded-3xl border border-[#CCE1FF] shadow-[6px_6px_16px_rgba(164,188,224,0.35),-6px_-6px_16px_rgba(255,255,255,0.95)]">
          {isSubmitted ? (
            <div className="space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-[#EBF3FF] text-[#2457A7] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6 text-[#1F7A65]" />
              </div>
              <h2 className="text-lg font-bold text-[#17365D]">Instruksi Terkirim</h2>
              <p className="text-sm text-[#17365D]/80 leading-relaxed">
                Jika alamat email <strong>{email}</strong> terdaftar di sistem SELA.AI, tautan pemulihan kata sandi telah dikirimkan. Silakan periksa kotak masuk atau folder spam.
              </p>
              <div className="pt-4 border-t border-[#CCE1FF]/70">
                <Link
                  href="/masuk"
                  className="inline-flex items-center text-sm font-semibold text-[#2457A7] hover:underline"
                >
                  <ArrowLeft className="w-4 h-4 mr-1.5" />
                  Kembali ke Halaman Masuk
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2457A7] mb-1.5">
                  Alamat Email Terdaftar
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center rounded-full bg-[#2457A7] py-3.5 px-4 text-sm font-semibold text-white hover:bg-[#1C4477] transition-all shadow-md disabled:opacity-50"
              >
                {isSubmitting ? "Mengirim..." : "Kirim Tautan Pemulihan"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>

              <div className="text-center pt-2">
                <Link
                  href="/masuk"
                  className="inline-flex items-center text-xs font-semibold text-[#17365D]/70 hover:text-[#2457A7]"
                >
                  <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                  Batal dan kembali ke halaman masuk
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
