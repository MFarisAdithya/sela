"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  CreditCard,
  ArrowRight,
  TrendingUp,
  MessageCircle,
  Compass,
  HeartHandshake,
  Clock,
  Info,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useApp } from "@/context/AppContext";
import { UserEntitlements } from "@/types/payment";
import { CheckoutModal } from "@/components/payment/CheckoutModal";

export default function PaketDanKuotaPage() {
  const { user } = useAuth();
  const { storyCards } = useApp();

  const [entitlements, setEntitlements] = useState<UserEntitlements | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const fetchEntitlements = async () => {
    try {
      const res = await fetch("/api/payment/entitlements");
      if (res.ok) {
        const data = await res.json();
        if (data.entitlements) {
          setEntitlements(data.entitlements);
        }
      }
    } catch (err) {
      console.error("Failed to load entitlements:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEntitlements();
  }, [user]);

  const isPremium = entitlements?.isPremiumActive ?? (user?.plan === "premium");
  const aiUsed = entitlements?.monthlyAiUsed ?? 3;
  const aiLimit = entitlements?.monthlyAiLimit ?? (isPremium ? 100 : 10);
  const practiceUsed = entitlements?.monthlyPracticeTalkUsed ?? 1;
  const practiceLimit = entitlements?.monthlyPracticeTalkLimit ?? (isPremium ? 10 : 2);
  const cardLimit = entitlements?.maxActiveStoryCards ?? (isPremium ? 20 : 1);
  const activeCardCount = storyCards.length;

  const formatDate = (isoStr?: string) => {
    if (!isoStr) return "—";
    try {
      return new Date(isoStr).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return isoStr;
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-2 text-[#17365D]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#CCE1FF]/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF3FF] border border-[#CCE1FF] text-xs font-semibold text-[#2457A7] uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Manajemen Langganan</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#17365D]">
            Paket &amp; Penggunaan Kuota
          </h1>
          <p className="mt-1 text-sm text-[#17365D]/75">
            Pantau status langganan, kuota refleksi bulanan, dan opsi kontribusi untuk mendukung SELA.AI.
          </p>
        </div>

        <Link
          href="/app/pembayaran"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#CCE1FF] bg-white text-xs font-semibold text-[#2457A7] hover:bg-[#EBF3FF] transition-colors shadow-sm self-start sm:self-auto"
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>Riwayat Transaksi →</span>
        </Link>
      </div>

      {/* PLAN STATUS HERO CARD */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border transition-all ${
          isPremium
            ? "bg-gradient-to-br from-[#17365D] to-[#2457A7] text-white border-[#2457A7] shadow-[8px_8px_24px_rgba(23,54,93,0.3)]"
            : "bg-[#F7FAFF] text-[#17365D] border-[#CCE1FF] shadow-[6px_6px_16px_rgba(164,188,224,0.35),-6px_-6px_16px_rgba(255,255,255,0.95)]"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span
                className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                  isPremium
                    ? "bg-[#6FB1FF]/20 text-[#CCE1FF] border border-[#6FB1FF]/40"
                    : "bg-[#EBF3FF] text-[#2457A7] border border-[#CCE1FF]"
                }`}
              >
                {isPremium ? "SELA Supporter Aktif" : "Paket Bebas (Free)"}
              </span>
              {isPremium && (
                <span className="text-xs bg-[#E6F4EA] text-[#1F7A65] font-semibold px-2.5 py-0.5 rounded-full border border-[#B7E1CD]">
                  Lencana Aktif ⭐
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-black">
              {isPremium ? "Paket SELA Supporter Premium" : "Paket Akses Bebas (Free)"}
            </h2>

            <p
              className={`text-xs sm:text-sm max-w-xl leading-relaxed ${
                isPremium ? "text-white/85" : "text-[#17365D]/80"
              }`}
            >
              {isPremium
                ? "Terima kasih telah berkontribusi menjaga SELA.AI tetap mandiri dan aman. Paket ini aktif selama periode 30 hari tanpa perpanjangan otomatis."
                : "Kamu menggunakan akses dasar SELA.AI. Seluruh alat bantu esensial, keselamatan, dan kontak darurat dapat digunakan gratis tanpa paywall."}
            </p>
          </div>

          <div className="shrink-0 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => setIsCheckoutOpen(true)}
              className={`px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-md inline-flex items-center justify-center gap-2 ${
                isPremium
                  ? "bg-white text-[#17365D] hover:bg-[#F7FAFF]"
                  : "bg-[#2457A7] text-white hover:bg-[#1f4a8f]"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{isPremium ? "Perpanjang Masa Aktif" : "Tingkatkan ke Supporter (Rp19.000)"}</span>
            </button>

            {isPremium && (
              <span className="text-[11px] text-center text-white/70">
                Berlaku hingga: {formatDate(entitlements?.premiumUntil || user?.premiumUntil)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* QUOTA MONITORING GRID */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#17365D]">Penggunaan Kuota Periode Ini</h2>
          <span className="text-xs text-[#17365D]/60 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Reset otomatis awal bulan depan</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 1. Respons AI */}
          <div className="p-5 rounded-3xl bg-[#F7FAFF] border border-[#CCE1FF] shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#2457A7] uppercase tracking-wider">
                Guided Story AI
              </span>
              <Sparkles className="w-4 h-4 text-[#2457A7]" />
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-[#17365D]">{aiUsed}</span>
              <span className="text-xs text-[#17365D]/60 font-medium">/ {aiLimit} respons</span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-[#EBF3FF] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#2457A7] h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (aiUsed / aiLimit) * 100)}%` }}
              />
            </div>

            <p className="text-[11px] text-[#17365D]/70 leading-relaxed">
              Digunakan saat mengurai cerita terpandu dengan pendamping AI.
            </p>
          </div>

          {/* 2. Sesi Practice Talk */}
          <div className="p-5 rounded-3xl bg-[#F7FAFF] border border-[#CCE1FF] shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#2457A7] uppercase tracking-wider">
                Practice Talk
              </span>
              <MessageCircle className="w-4 h-4 text-[#2457A7]" />
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-[#17365D]">{practiceUsed}</span>
              <span className="text-xs text-[#17365D]/60 font-medium">/ {practiceLimit} sesi</span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-[#EBF3FF] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#1F7A65] h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (practiceUsed / practiceLimit) * 100)}%` }}
              />
            </div>

            <p className="text-[11px] text-[#17365D]/70 leading-relaxed">
              Simulasi percakapan turn-by-turn dengan lawan bicara pilihan.
            </p>
          </div>

          {/* 3. Kartu Cerita Aktif */}
          <div className="p-5 rounded-3xl bg-[#F7FAFF] border border-[#CCE1FF] shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#2457A7] uppercase tracking-wider">
                Kartu Cerita Aktif
              </span>
              <Compass className="w-4 h-4 text-[#2457A7]" />
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-[#17365D]">{activeCardCount}</span>
              <span className="text-xs text-[#17365D]/60 font-medium">/ {cardLimit} kartu</span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-[#EBF3FF] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#2457A7] h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (activeCardCount / cardLimit) * 100)}%` }}
              />
            </div>

            <p className="text-[11px] text-[#17365D]/70 leading-relaxed">
              Ringkasan 4 kuadran yang tersimpan untuk persiapan bicara.
            </p>
          </div>
        </div>
      </div>

      {/* NON-PAYWALLED SAFETY COMMITMENT */}
      <div className="p-6 rounded-3xl bg-[#E6F4EA]/80 border border-[#B7E1CD] text-[#17365D] flex items-start gap-4">
        <HeartHandshake className="w-6 h-6 text-[#1F7A65] shrink-0 mt-1" />
        <div className="space-y-1.5">
          <h3 className="font-bold text-sm text-[#1F7A65]">
            Jaminan Etika SELA.AI: Bantuan Darurat &amp; Keselamatan Tidak Pernah Dikunci
          </h3>
          <p className="text-xs text-[#17365D]/85 leading-relaxed">
            Meskipun kuota AI bulananmu habis, kamu tetap dapat mengakses <strong>Support Pathway</strong>,
            hotline krisis resmi Kemenkes (SEJIWA 119 ext 8, SAPA 129), dan membaca seluruh Kartu Cerita yang telah dibuat.
            SELA.AI tidak pernah mengunci pertolongan darurat di balik pintu berbayar.
          </p>
          <div className="pt-1">
            <Link
              href="/support"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#1F7A65] hover:underline"
            >
              Buka Layanan Support Pathway Sekarang →
            </Link>
          </div>
        </div>
      </div>

      {/* PRICING TRANSPARENCY NOTICE */}
      <div className="p-6 rounded-3xl bg-white border border-[#CCE1FF] space-y-3">
        <div className="flex items-center gap-2 text-sm font-bold text-[#17365D]">
          <Info className="w-4 h-4 text-[#2457A7]" />
          <span>Transparansi Biaya &amp; Model Supporter</span>
        </div>
        <p className="text-xs text-[#17365D]/80 leading-relaxed">
          Biaya Rp19.000/30 hari digunakan langsung untuk menutupi biaya komputasi model AI server dan infrastruktur
          privasi terenkripsi. SELA.AI tidak menampilkan iklan, tidak menjual data pribadi pengguna kepada pihak ketiga,
          dan tidak menerapkan sistem penagihan otomatis (*no auto-charge*).
        </p>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => {
          setIsCheckoutOpen(false);
          fetchEntitlements();
        }}
        onSuccess={() => {
          fetchEntitlements();
        }}
      />
    </div>
  );
}
