"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Check,
  ArrowRight,
  ShieldCheck,
  Building2,
  Info,
  Sparkles,
  MessageCircle,
  BookmarkCheck,
  GraduationCap,
  TrendingUp,
  Target,
  HeartHandshake,
} from "lucide-react";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { copy } from "@/lib/copy";
import { useAuth } from "@/context/AuthContext";
import { CheckoutModal } from "@/components/payment/CheckoutModal";

export default function HargaPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const t = copy.pricing;
  const isUserPremium = user?.plan === "premium";

  const freeBenefits = [
    "10 respons Guided Story per bulan",
    "2 sesi latihan Practice Talk per bulan",
    "Simpan 1 Kartu Cerita aktif",
    "Modul belajar kelola emosi dasar",
    "Support Pathway & kontak darurat gratis",
  ];

  const premiumBenefits = [
    {
      title: "100 respons Guided Story per bulan",
      desc: "Kapasitas 10× lipat dari paket Gratis. AI bukan pengganti psikolog.",
      icon: Sparkles,
    },
    {
      title: "10 sesi Practice Talk per bulan",
      desc: "Latihan dengan 4 peran: Orang Tua, Guru/Dosen, Teman, Konselor.",
      icon: MessageCircle,
    },
    {
      title: "Simpan sampai 20 Kartu Cerita",
      desc: "Simpan banyak draf pegangan untuk bermacam situasi obrolan.",
      icon: BookmarkCheck,
    },
    {
      title: "Akses semua modul belajar lanjutan",
      desc: "Pelajari cara tegas, kelola emosi, dan hadapi konflik.",
      icon: GraduationCap,
    },
    {
      title: "Rangkuman pola bicara & refleksi",
      desc: "Lihat ringkasan 4 kuadran agar kamu makin siap bicara.",
      icon: TrendingUp,
    },
    {
      title: "Daftar langkah sebelum mulai obrolan",
      desc: "Checklist praktis menentukan kapan dan ke siapa kamu bicara.",
      icon: Target,
    },
  ];

  const comparisonRows = [
    {
      feature: "Respons Guided Story AI",
      free: "10 respons / bulan",
      premium: "100 respons / bulan",
    },
    {
      feature: "Sesi Practice Talk",
      free: "2 sesi / bulan (2 peran)",
      premium: "10 sesi / bulan (4 peran)",
    },
    {
      feature: "Penyimpanan Kartu Cerita",
      free: "1 kartu aktif",
      premium: "Sampai 20 kartu",
    },
    {
      feature: "Modul Belajar & Life Skills",
      free: "Materi dasar",
      premium: "Semua materi lanjutan",
    },
    {
      feature: "Rangkuman Pola Bicara",
      free: "Ringkasan dasar",
      premium: "Rangkuman pola lengkap",
    },
    {
      feature: "Checklist Persiapan Bicara",
      free: "Panduan mandiri",
      premium: "Daftar langkah praktis",
    },
    {
      feature: "Support Pathway & Hotline Krisis",
      free: "Gratis tanpa batas",
      premium: "Gratis tanpa batas",
    },
    {
      feature: "Lencana Supporter",
      free: "—",
      premium: "Lencana ⭐ di profil",
    },
    {
      feature: "Biaya & Tagihan",
      free: "Rp0",
      premium: "Rp19.000 / 30 hari (tanpa auto-debit)",
    },
  ];

  const handleChoosePremium = () => {
    if (user) {
      setIsCheckoutOpen(true);
    } else {
      router.push("/masuk?redirect=/harga");
    }
  };

  return (
    <div className="min-h-screen bg-[#E3EEFF] text-[#17365D]">
      <PublicHeader />

      <main className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7FAFF] border border-[#CCE1FF] text-xs font-semibold text-[#2457A7] uppercase tracking-wider mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pilihan Paket Ringkas</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#17365D]">
              {t.title}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#17365D]/80 leading-relaxed max-w-xl mx-auto">
              {t.subtitle}
            </p>
          </div>

          {/* Pricing Safety & Ethics Notice */}
          <div className="p-4 rounded-2xl bg-[#EBF3FF] border border-[#CCE1FF] text-xs sm:text-sm text-[#17365D]/85 flex items-start gap-3 max-w-2xl mx-auto mb-10 shadow-sm">
            <Info className="w-5 h-5 text-[#2457A7] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Jaminan Keselamatan:</strong> Hotline darurat SEJIWA 119 ext 8, SAPA 129, dan Support Pathway selalu gratis tanpa paywall. Biaya paket cuma untuk sewa operasional server AI.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto mb-14 items-stretch">
            {/* 1. FREE PLAN CARD */}
            <div className="p-7 sm:p-8 rounded-3xl bg-[#F7FAFF] border border-[#CCE1FF] shadow-[6px_6px_16px_rgba(164,188,224,0.35),-6px_-6px_16px_rgba(255,255,255,0.95)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-[#17365D]">Paket Gratis</h2>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#EBF3FF] text-[#2457A7] border border-[#CCE1FF]">
                    Dasar
                  </span>
                </div>

                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-[#17365D]">Rp0</span>
                  <span className="text-xs text-[#17365D]/70 font-medium">selamanya</span>
                </div>

                <p className="mt-2 text-xs sm:text-sm text-[#17365D]/80 leading-relaxed">
                  Mulai rapikan uneg-uneg tanpa keluar biaya sepeser pun.
                </p>

                <div className="mt-6 pt-5 border-t border-[#CCE1FF]/70">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2457A7] block mb-3">
                    Manfaat yang Termasuk:
                  </span>
                  <ul className="space-y-3">
                    {freeBenefits.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#17365D]/85 leading-snug">
                        <div className="w-4 h-4 rounded-full bg-[#E6F4EA] border border-[#B7E1CD] text-[#1F7A65] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-[#CCE1FF]/70">
                <Link
                  href={user ? "/app" : "/onboarding"}
                  className="w-full inline-flex items-center justify-center rounded-full bg-white border border-[#2457A7] py-3 text-sm font-semibold text-[#2457A7] hover:bg-[#EBF3FF] transition-all shadow-sm"
                >
                  {user ? "Buka Ruang Pengguna" : "Mulai Gratis Sekarang"}
                </Link>
              </div>
            </div>

            {/* 2. SELA SUPPORTER PLAN CARD */}
            <div className="p-7 sm:p-8 rounded-3xl bg-[#17365D] text-white border border-[#2457A7] shadow-[8px_8px_24px_rgba(23,54,93,0.3),-4px_-4px_16px_rgba(255,255,255,0.06)] flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#2457A7] text-[#CCE1FF] border border-[#6FB1FF]/30">
                  {isUserPremium ? "Paket Aktifmu ⭐" : "Pilihan Supporter ⭐"}
                </span>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white">SELA Supporter</h2>

                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-white tracking-tight">Rp19.000</span>
                  <span className="text-xs text-white/70">/ 30 hari</span>
                </div>

                {/* Subtitle Badge */}
                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#2457A7]/60 border border-[#6FB1FF]/30 text-[11px] font-medium text-[#CCE1FF]">
                  <span>Sekali bayar · Tanpa tagihan otomatis</span>
                </div>

                <p className="mt-2 text-xs sm:text-sm text-white/80 leading-relaxed">
                  Latihan lebih banyak sekaligus bantu jaga server SELA tetap aktif.
                </p>

                {/* 6 Core Value-Based Benefits */}
                <div className="mt-6 pt-5 border-t border-white/15">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#6FB1FF] block mb-3">
                    Keunggulan Paket Supporter:
                  </span>
                  <ul className="space-y-3">
                    {premiumBenefits.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/95 leading-snug">
                          <div className="w-5 h-5 rounded-lg bg-[#2457A7] border border-[#6FB1FF]/40 text-[#CCE1FF] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                            <Icon className="w-3 h-3" />
                          </div>
                          <div>
                            <span className="font-semibold text-white">{item.title}</span>
                            <span className="block text-[11px] text-white/70 mt-0.5 leading-normal">
                              {item.desc}
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-white/15">
                <button
                  type="button"
                  onClick={handleChoosePremium}
                  className="w-full inline-flex items-center justify-center rounded-full bg-[#2457A7] py-3 text-sm font-semibold text-white hover:bg-[#3374D4] transition-all shadow-md group"
                >
                  <span>{isUserPremium ? "Perpanjang Masa Aktif" : "Pilih Supporter"}</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>

          {/* Feature Comparison Table */}
          <div className="max-w-4xl mx-auto rounded-3xl bg-white/90 border border-[#CCE1FF] p-6 sm:p-7 shadow-sm mb-14">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5 pb-3 border-b border-[#CCE1FF]/60">
              <div>
                <h2 className="text-lg font-bold text-[#17365D]">Perbandingan Fasilitas</h2>
                <p className="text-xs text-[#17365D]/70 mt-0.5">
                  Rincian fasilitas yang kamu dapatkan di tiap paket.
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs text-[#1F7A65] font-semibold bg-[#E6F4EA] px-3 py-1 rounded-full border border-[#B7E1CD] self-start sm:self-auto">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Tanpa Tagihan Otomatis</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#CCE1FF] text-[11px] font-bold uppercase tracking-wider text-[#2457A7]">
                    <th className="py-2.5 px-3 w-2/5">Fasilitas</th>
                    <th className="py-2.5 px-3 w-3/10">Paket Gratis</th>
                    <th className="py-2.5 px-3 w-3/10 text-[#2457A7]">SELA Supporter</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#CCE1FF]/50 text-[#17365D]/85">
                  {comparisonRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#F7FAFF]/80 transition-colors">
                      <td className="py-3 px-3 font-medium text-[#17365D]">{row.feature}</td>
                      <td className="py-3 px-3 text-[#17365D]/75">{row.free}</td>
                      <td className="py-3 px-3 font-semibold text-[#2457A7]">{row.premium}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Institutional / School Partner Section (B2B) */}
          <div className="max-w-4xl mx-auto rounded-3xl bg-[#F7FAFF] border border-[#CCE1FF] p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2457A7]">
                <Building2 className="w-4 h-4" />
                <span>Untuk Sekolah, Kampus &amp; Organisasi</span>
              </div>
              <h2 className="text-lg font-bold text-[#17365D]">Kemitraan &amp; Demo Institusi</h2>
              <p className="text-xs sm:text-sm text-[#17365D]/80 max-w-lg leading-relaxed">
                Hadirkan SELA.AI untuk mendukung guru BK dan konselor sebaya di kampus atau sekolahmu.
              </p>
            </div>

            <Link
              href="mailto:kemitraan@sela.ai?subject=Permintaan%20Demo%20Institusi%20SELA.AI"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#17365D] text-xs font-semibold text-white hover:bg-[#2457A7] transition-colors shadow-sm"
            >
              <span>Ajukan Demo Institusi</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <PublicFooter />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSuccess={() => {
          router.push("/app/paket");
        }}
      />
    </div>
  );
}
