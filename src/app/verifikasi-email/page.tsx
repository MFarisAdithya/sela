"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, CheckCircle2, ArrowRight, RefreshCw } from "lucide-react";
import { SelaLogo } from "@/components/ui/SelaLogo";
import { useAuth } from "@/context/AuthContext";

export default function VerifikasiEmailPage() {
  const { user } = useAuth();
  const [isResent, setIsResent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleResend = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsResent(true);
      setTimeout(() => setIsResent(false), 5000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#E3EEFF] flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-[#17365D]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-block mb-4" aria-label="SELA.AI Beranda">
          <SelaLogo layout="horizontal" size="lg" showTagline={false} showAiSuffix={true} />
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#17365D]">
          Verifikasi Email Kamu
        </h1>
        <p className="mt-2 text-sm text-[#17365D]/75">
          Tautan konfirmasi telah dikirimkan ke alamat emailmu.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-[#F7FAFF] py-8 px-6 sm:px-10 rounded-3xl border border-[#CCE1FF] shadow-[6px_6px_16px_rgba(164,188,224,0.35),-6px_-6px_16px_rgba(255,255,255,0.95)] text-center space-y-6">
          <div className="w-14 h-14 rounded-full bg-[#EBF3FF] text-[#2457A7] flex items-center justify-center mx-auto shadow-inner">
            <Mail className="w-7 h-7" />
          </div>

          <div>
            <p className="text-sm text-[#17365D]/85 leading-relaxed">
              Kami telah mengirimkan email verifikasi ke:
            </p>
            <p className="mt-1 font-semibold text-base text-[#2457A7]">
              {user?.email || "email.kamu@example.com"}
            </p>
            <p className="mt-3 text-xs text-[#17365D]/65">
              Klik tautan di email tersebut untuk mengonfirmasi kepemilikan akun. Kamu juga dapat langsung melanjutkan pengenalan SELA.AI sekarang.
            </p>
          </div>

          {isResent && (
            <div className="p-3 rounded-2xl bg-[#E6F4EA] border border-[#B7E1CD] text-xs text-[#1F7A65] flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Email verifikasi telah dikirim ulang!</span>
            </div>
          )}

          <div className="space-y-3 pt-2">
            <Link
              href="/onboarding"
              className="w-full inline-flex items-center justify-center rounded-full bg-[#2457A7] py-3.5 px-4 text-sm font-semibold text-white hover:bg-[#1C4477] transition-all shadow-md"
            >
              Lanjut ke Pengenalan (Onboarding)
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>

            <button
              type="button"
              onClick={handleResend}
              disabled={isSending}
              className="w-full inline-flex items-center justify-center rounded-full bg-white border border-[#CCE1FF] py-3 px-4 text-xs font-semibold text-[#17365D]/80 hover:bg-[#EBF3FF] transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${isSending ? "animate-spin" : ""}`} />
              {isSending ? "Mengirim ulang..." : "Kirim Ulang Email Verifikasi"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
