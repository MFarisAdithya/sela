"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  CreditCard,
  HeartHandshake,
  Info,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { UserEntitlements } from "@/types/payment";
import { CheckoutModal } from "@/components/payment/CheckoutModal";

export default function PaketDanKuotaPage() {
  const { user } = useAuth();

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
            Paket &amp; Langganan
          </h1>
          <p className="mt-1 text-sm text-[#17365D]/75">
            Pantau status langganan dan opsi kontribusi untuk mendukung SELA.AI.
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
          <div className="flex items-start sm:items-center gap-4 sm:gap-5">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border p-1.5 shrink-0 shadow-sm flex items-center justify-center ${
              isPremium
                ? "bg-white/10 backdrop-blur-sm border-white/20"
                : "bg-white border-[#CCE1FF]"
            }`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/aura/aura-supporter.png"
                alt="Aura mengenakan pin bintang kecil berwarna biru dengan pose apresiatif"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="space-y-1.5">
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
                {isPremium ? (
                  <span className="text-xs bg-[#E6F4EA] text-[#1F7A65] font-semibold px-2.5 py-0.5 rounded-full border border-[#B7E1CD]">
                    Pin Bintang Biru Aktif ⭐
                  </span>
                ) : (
                  <span className="text-xs bg-[#EBF3FF] text-[#2457A7] font-semibold px-2.5 py-0.5 rounded-full border border-[#CCE1FF]">
                    Aura Menemani
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
                  ? "Terima kasih telah berkontribusi menjaga SELA.AI tetap mandiri dan aman. Pin bintang birumu aktif sebagai apresiasi identitas Supporter."
                  : "Kamu menggunakan akses dasar SELA.AI dengan penuh penghargaan. Seluruh alat bantu esensial, keselamatan, dan kontak darurat dapat digunakan gratis tanpa rasa dibedakan."}
              </p>
            </div>
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

      {/* Aura Supporter Identity Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#FAFDFE] via-[#F4F8FF] to-[#E8F1FC] border border-[#BFD8F5] shadow-sm flex flex-col sm:flex-row items-center gap-5">
        <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-2xl bg-white border border-[#BFD8F5] p-2 flex items-center justify-center shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/aura/aura-supporter.png"
            alt="Aura mengenakan pin bintang kecil berwarna biru dengan pose apresiatif"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex-1 space-y-1 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="font-mono-num text-[11px] font-semibold text-[#1E56A0] px-2.5 py-0.5 rounded-full bg-[#DCEAFB] border border-[#BFD8F5]">
              Aura Supporter
            </span>
            <span className="text-xs font-semibold text-[#102542]">
              Pin Bintang Biru &amp; Identitas Apresiatif
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#102542]">
            Memberi Identitas Premium Tanpa Mengurangi Penghargaan Pengguna Bebas
          </h3>
          <p className="text-xs text-[#35527A] leading-relaxed">
            Aura mengenakan pin bintang kecil berwarna biru dengan pose apresiatif. Makna dari identitas ini adalah merayakan kebaikan hati para supporter yang menopang biaya operasional server dan infrastruktur enkripsi, tanpa pernah membuat pengguna paket Bebas merasa dikesampingkan atau kehilangan rasa aman.
          </p>
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
            Meskipun dalam status paket bebas (free), kamu selalu dapat mengakses <strong>Support Pathway</strong>,
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
          Biaya Rp19.000/30 hari digunakan langsung untuk menutupi biaya operasional server dan infrastruktur
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
