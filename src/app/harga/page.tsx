"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Check,
  ShieldCheck,
  Building2,
  Info,
  Sparkles,
  MessageCircle,
  BookmarkCheck,
  GraduationCap,
  TrendingUp,
  Target,
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
    "Support Pathway dan kontak darurat gratis",
  ];

  const premiumBenefits = [
    {
      title: "100 respons Guided Story per bulan",
      desc: "Kapasitas 10 kali lipat dari paket Gratis. Latihan ini bukan pengganti psikolog.",
      icon: Sparkles,
    },
    {
      title: "10 sesi Practice Talk per bulan",
      desc: "Latihan dengan 4 peran: Orang Tua, Guru atau Dosen, Teman, Konselor.",
      icon: MessageCircle,
    },
    {
      title: "Simpan sampai 20 Kartu Cerita",
      desc: "Simpan banyak draf pegangan untuk bermacam situasi obrolan.",
      icon: BookmarkCheck,
    },
    {
      title: "Akses semua modul belajar lanjutan",
      desc: "Pelajari cara bicara tegas, kelola emosi, dan hadapi konflik.",
      icon: GraduationCap,
    },
    {
      title: "Rangkuman pola bicara dan refleksi",
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
      feature: "Respons Guided Story",
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
      free: "Tidak termasuk",
      premium: "Lencana aktif di profil",
    },
    {
      feature: "Biaya dan Masa Aktif",
      free: "Rp0",
      premium: "Rp19.000 / 30 hari (tanpa tagihan otomatis)",
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
    <div className="min-h-screen bg-[#E8F1FC] text-[#102542]">
      <PublicHeader />

      <main className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h1 className="font-display-serif text-3xl sm:text-4xl font-medium text-[#102542]">
              {t.title}
            </h1>
            <p className="mt-2.5 text-sm sm:text-base text-[#2B4566] leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          {/* Pricing Safety & Ethics Notice */}
          <div className="cotton-sheet p-4 rounded-xl border border-[#9AC0EB] text-xs sm:text-sm text-[#2B4566] flex items-start gap-3 max-w-3xl mx-auto mb-10">
            <Info className="w-5 h-5 text-[#1E56A0] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-[#102542]">Jaminan keselamatan:</strong> Hotline darurat SEJIWA 119 ext 8, SAPA 129, dan Support Pathway selalu gratis tanpa paywall. Biaya paket cuma untuk operasional layanan dan pemeliharaan server.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-14 items-stretch">
            {/* 1. PAKET GRATIS — Cotton Index Sheet */}
            <div className="cotton-sheet p-6 sm:p-8 border border-[#9AC0EB] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#C6DCF5]">
                  <div>
                    <span className="font-mono-num text-xs font-semibold text-[#516B8C] block mb-0.5">
                      EDISI #01
                    </span>
                    <h2 className="text-xl font-bold text-[#102542]">Paket Gratis</h2>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-md bg-[#E8F1FC] text-[#1E56A0] border border-[#C6DCF5]">
                    Akses dasar
                  </span>
                </div>

                <div className="mt-5 flex items-baseline gap-2">
                  <span className="font-mono-num text-4xl font-bold text-[#102542]">Rp0</span>
                  <span className="text-xs text-[#516B8C]">tanpa batas waktu</span>
                </div>

                <p className="mt-2 text-xs sm:text-sm text-[#2B4566] leading-relaxed">
                  Mulai rapikan uneg-uneg tanpa keluar biaya sepeser pun.
                </p>

                <div className="mt-6 pt-5 border-t border-[#C6DCF5]">
                  <span className="text-xs font-semibold text-[#102542] block mb-3">
                    Fasilitas yang termasuk:
                  </span>
                  <ul className="space-y-3">
                    {freeBenefits.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2B4566] leading-snug"
                      >
                        <div className="w-4 h-4 rounded bg-[#E3F3EE] border border-[#B2DFD2] text-[#1A6B5A] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-[#C6DCF5]">
                <Link
                  href={user ? "/app" : "/onboarding"}
                  className="letterpress-cotton w-full inline-flex items-center justify-center py-3 text-sm"
                >
                  {user ? "Buka ruang pengguna" : "Mulai gratis sekarang"}
                </Link>
              </div>
            </div>

            {/* 2. SELA SUPPORTER — Calm Sky-Tinted Cotton Sheet */}
            <div className="cotton-sheet p-6 sm:p-8 bg-[#F4F9FF] border-2 border-[#1E56A0] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#9AC0EB]">
                  <div>
                    <span className="font-mono-num text-xs font-semibold text-[#1E56A0] block mb-0.5">
                      EDISI #02
                    </span>
                    <h2 className="text-xl font-bold text-[#102542]">SELA Supporter</h2>
                  </div>
                  <span className="settled-stamp">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isUserPremium ? "Paket aktifmu" : "Pilihan Supporter"}</span>
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap items-baseline justify-between gap-2">
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono-num text-4xl font-bold text-[#1E56A0]">
                      Rp19.000
                    </span>
                    <span className="text-xs text-[#2B4566]">/ 30 hari</span>
                  </div>
                  <span className="text-xs font-medium px-2.5 py-1 rounded bg-[#DCEAFB] text-[#102542] border border-[#9AC0EB]">
                    Sekali bayar, tanpa tagihan otomatis
                  </span>
                </div>

                <p className="mt-2.5 text-xs sm:text-sm text-[#2B4566] leading-relaxed">
                  Latihan lebih banyak sekaligus bantu jaga server SELA tetap aktif.
                </p>

                <div className="mt-6 pt-5 border-t border-[#9AC0EB]">
                  <span className="text-xs font-semibold text-[#102542] block mb-3">
                    Keunggulan paket Supporter:
                  </span>
                  <ul className="space-y-3">
                    {premiumBenefits.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-[#102542] leading-snug"
                        >
                          <div className="w-5 h-5 rounded-md bg-[#DCEAFB] border border-[#9AC0EB] text-[#1E56A0] flex items-center justify-center shrink-0 mt-0.5">
                            <Icon className="w-3 h-3" />
                          </div>
                          <div>
                            <span className="font-semibold text-[#102542]">{item.title}</span>
                            <span className="block text-xs text-[#2B4566] mt-0.5">
                              {item.desc}
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-[#9AC0EB]">
                <button
                  type="button"
                  onClick={handleChoosePremium}
                  className="letterpress-primary w-full inline-flex items-center justify-center py-3 text-sm"
                >
                  <span>{isUserPremium ? "Perpanjang masa aktif" : "Pilih paket Supporter"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Feature Comparison Table — Almanac Ruled Sheet */}
          <div className="cotton-sheet border-t-2 border-t-[#102542] border border-[#9AC0EB] p-6 sm:p-7 mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5 pb-3 border-b border-[#C6DCF5]">
              <div>
                <h2 className="font-display-serif text-xl font-medium text-[#102542]">
                  Perbandingan fasilitas lengkap
                </h2>
                <p className="text-xs text-[#516B8C] mt-0.5">
                  Rincian kuota dan fitur yang kamu dapatkan di setiap paket.
                </p>
              </div>
              <div className="settled-stamp self-start sm:self-auto">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Tanpa perpanjangan otomatis</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b-2 border-[#102542] text-xs font-semibold text-[#102542]">
                    <th className="py-2.5 px-3 w-2/5">Fasilitas</th>
                    <th className="py-2.5 px-3 w-3/10">Paket Gratis</th>
                    <th className="py-2.5 px-3 w-3/10 text-[#1E56A0]">SELA Supporter</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C6DCF5] text-[#2B4566]">
                  {comparisonRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#F4F9FF] transition-colors">
                      <td className="py-3 px-3 font-medium text-[#102542]">{row.feature}</td>
                      <td className="py-3 px-3 font-mono-num text-xs sm:text-sm text-[#516B8C]">
                        {row.free}
                      </td>
                      <td className="py-3 px-3 font-mono-num text-xs sm:text-sm font-semibold text-[#1E56A0]">
                        {row.premium}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Institutional / School Partner Section (B2B) */}
          <div className="cotton-sheet border border-[#9AC0EB] p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E56A0]">
                <Building2 className="w-4 h-4" />
                <span>Untuk sekolah, kampus, dan organisasi</span>
              </div>
              <h2 className="font-display-serif text-lg sm:text-xl font-medium text-[#102542]">
                Kemitraan dan demo institusi
              </h2>
              <p className="text-xs sm:text-sm text-[#2B4566] max-w-lg leading-relaxed">
                Hadirkan SELA.AI untuk mendukung guru BK dan konselor sebaya di kampus atau sekolahmu.
              </p>
            </div>

            <Link
              href="mailto:kemitraan@sela.ai?subject=Permintaan%20Demo%20Institusi%20SELA.AI"
              className="letterpress-cotton shrink-0 inline-flex items-center justify-center px-5 py-2.5 text-xs sm:text-sm"
            >
              Ajukan demo institusi
            </Link>
          </div>
        </div>
      </main>

      <PublicFooter />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
}
