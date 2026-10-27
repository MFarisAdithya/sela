"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  CreditCard,
  Check,
  HeartHandshake,
  Info,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { UserEntitlements } from "@/types/payment";
import { CheckoutModal } from "@/components/payment/CheckoutModal";
import { copy } from "@/lib/copy";

export default function PaketDanKuotaPage() {
  const { user } = useAuth();

  const [entitlements, setEntitlements] = useState<UserEntitlements | null>(null);
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
    }
  };

  useEffect(() => {
    fetchEntitlements();
  }, [user]);

  const isPremium = entitlements?.isPremiumActive ?? (user?.plan === "premium");
  const t = copy.landing;

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
    <div className="space-y-8 max-w-4xl mx-auto py-2 text-[#102542]">
      {/* 1. Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-[#BFD8F5]">
        <div>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-medium tracking-tight text-[#102542]">
            {t.pricingTeaserTitle}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#35527A]">
            {t.pricingTeaserDesc}
          </p>
        </div>

        <Link
          href="/app/pembayaran"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#BFD8F5] bg-white text-xs font-semibold text-[#1E56A0] hover:bg-[#F4F8FF] transition-colors shadow-sm self-start sm:self-auto"
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>Riwayat Pembayaran →</span>
        </Link>
      </div>

      {/* 2. Dua Kartu Paket: Paket Gratis vs SELA Supporter */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Kartu 1: Paket Gratis */}
        <div className="cotton-sheet rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-[#BFD8F5] shadow-sm relative">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#102542]">{t.freePlan.name}</h2>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#DCEAFB] text-[#1E56A0]">
                {isPremium ? "Dasar" : "Paket Saat Ini"}
              </span>
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-mono-num text-4xl font-bold text-[#102542]">
                {t.freePlan.price}
              </span>
              <span className="text-xs text-[#5B789E]">{t.freePlan.period}</span>
            </div>

            <p className="mt-2 text-xs sm:text-sm text-[#35527A] leading-relaxed">
              {t.freePlan.desc}
            </p>

            <ul className="mt-6 space-y-3 border-t border-[#BFD8F5]/80 pt-6">
              {t.freePlan.features.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#102542]">
                  <Check className="w-4 h-4 text-[#0F6E56] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-[#BFD8F5]/80">
            <button
              type="button"
              disabled={!isPremium}
              className={`w-full py-3 rounded-full text-xs sm:text-sm font-semibold transition-all text-center ${
                !isPremium
                  ? "bg-[#DCEAFB] text-[#1E56A0] cursor-default font-bold"
                  : "border border-[#BFD8F5] text-[#35527A] hover:bg-[#F4F8FF]"
              }`}
            >
              {!isPremium ? "✓ Paket Aktif Saat Ini" : "Bebas Digunakan"}
            </button>
          </div>
        </div>

        {/* Kartu 2: SELA Supporter */}
        <div className="rounded-3xl bg-[#102542] text-[#FAFDFE] p-6 sm:p-8 border border-[#1E56A0] shadow-[0_14px_32px_rgba(16,37,66,0.18)] flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-[#FAFDFE]">{t.premiumPlan.name}</h2>
                {isPremium && (
                  <span className="text-xs bg-[#E6F4EA] text-[#1F7A65] font-semibold px-2 py-0.5 rounded-full">
                    Aktif ⭐
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#1E56A0] text-[#DCEAFB] border border-[#BFD8F5]/30">
                Pilihan Supporter
              </span>
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-mono-num text-4xl font-bold text-[#FAFDFE]">
                {t.premiumPlan.price}
              </span>
              <span className="text-xs text-[#DCEAFB]/80">{t.premiumPlan.period}</span>
            </div>

            <p className="mt-2 text-xs sm:text-sm text-[#DCEAFB]/90 leading-relaxed">
              {t.premiumPlan.desc}
            </p>

            <ul className="mt-6 space-y-3 border-t border-white/15 pt-6">
              {t.premiumPlan.features.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#FAFDFE]/95">
                  <Check className="w-4 h-4 text-[#8AB6EB] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-white/15 space-y-2">
            <button
              type="button"
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#2457A7] py-3 text-xs sm:text-sm font-semibold text-[#FAFDFE] hover:bg-[#2A6BC2] transition-all shadow-md active:scale-[0.99]"
            >
              <Sparkles className="w-4 h-4 text-[#DCEAFB]" />
              <span>{isPremium ? "Perpanjang Masa Aktif" : "Pilih Supporter (Rp19.000)"}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            {isPremium && (
              <p className="text-[11px] text-center text-[#DCEAFB]/70">
                Masa aktif berlaku hingga: {formatDate(entitlements?.premiumUntil || user?.premiumUntil)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 3. Catatan Reassurance & Transparansi */}
      <div className="text-center text-xs text-[#5B789E] max-w-lg mx-auto">
        Sekali bayar tanpa tagihan otomatis. Bantuan krisis dan Support Pathway selalu gratis.
      </div>

      {/* 4. Jaminan Etika & Privasi Tanpa Paywall */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#E6F4EA]/80 border border-[#B7E1CD] text-[#102542] flex items-start gap-3.5">
        <HeartHandshake className="w-5 h-5 text-[#1F7A65] shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs sm:text-sm">
          <h3 className="font-bold text-[#1F7A65]">
            Jaminan Etika SELA.AI: Bantuan Darurat &amp; Keselamatan Tidak Pernah Dikunci
          </h3>
          <p className="text-[#102542]/80 leading-relaxed text-xs">
            Seluruh pengguna (gratis maupun supporter) dapat selalu mengakses <strong>Support Pathway</strong> dan nomor krisis resmi (SEJIWA 119 ext 8, SAPA 129). SELA.AI tidak pernah mengunci pertolongan darurat di balik pintu berbayar.
          </p>
        </div>
      </div>

      {/* 5. Transparansi Biaya */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#BFD8F5] text-xs sm:text-sm text-[#102542] flex items-start gap-3.5">
        <Info className="w-5 h-5 text-[#1E56A0] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h3 className="font-bold text-[#1E56A0]">
            Transparansi Biaya &amp; Model Supporter
          </h3>
          <p className="text-[#35527A] leading-relaxed text-xs">
            Kontribusi Rp19.000/30 hari digunakan langsung untuk menutupi biaya operasional server dan infrastruktur privasi terenkripsi. SELA.AI tidak menampilkan iklan, tidak menjual data pribadi, dan tidak ada sistem tagihan otomatis (*no auto-charge*).
          </p>
        </div>
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
