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
    "Akses dashboard dan refleksi dasar harian",
    "Penyusunan cerita awal dengan Guided Story",
    "Penyimpanan draf Kartu Cerita aktif",
    "Sesi latihan bicara Practice Talk dasar",
    "Modul edukasi keterampilan hidup inti",
    "Support Pathway & kontak darurat 100% gratis selamanya",
  ];

  const premiumBenefits = [
    {
      title: "Kuota interaksi AI jauh lebih besar dibandingkan paket Gratis",
      desc: "Keleluasaan mengurai situasi rumit tanpa khawatir batas harian.",
      icon: Sparkles,
    },
    {
      title: "Lebih banyak kesempatan menggunakan Practice Talk",
      desc: "Simulasi intensif dengan beragam persona (Orang Tua, Guru/Dosen, Teman, Konselor).",
      icon: MessageCircle,
    },
    {
      title: "Kapasitas penyimpanan Kartu Cerita lebih luas",
      desc: "Simpan berbagai draf percakapan untuk situasi dan lawan bicara yang berbeda.",
      icon: BookmarkCheck,
    },
    {
      title: "Akses penuh ke seluruh modul premium",
      desc: "Materi pengembangan diri mendalam: asertivitas, regulasi emosi, dan resolusi konflik.",
      icon: GraduationCap,
    },
    {
      title: "Insight refleksi dan perkembangan diri yang lebih mendalam",
      desc: "Catatan coaching asertif dan pemetaan pola komunikasi yang terstruktur.",
      icon: TrendingUp,
    },
    {
      title: "Rencana dukungan personal untuk membantu pengguna menentukan langkah berikutnya",
      desc: "Panduan terarah untuk membantu menentukan kapan dan kepada siapa harus berbicara.",
      icon: Target,
    },
  ];

  const comparisonRows = [
    {
      feature: "Akses Dashboard & Refleksi",
      free: "Refleksi Dasar",
      premium: "Akses Lengkap & Fleksibel",
    },
    {
      feature: "Guided Story AI",
      free: "Kuota interaksi dasar",
      premium: "Kuota interaksi jauh lebih besar",
    },
    {
      feature: "Practice Talk (Simulasi Bicara)",
      free: "Kesempatan latihan dasar",
      premium: "Lebih banyak kesempatan latihan (Semua Persona)",
    },
    {
      feature: "Penyimpanan Kartu Cerita",
      free: "Kapasitas dasar tersimpan",
      premium: "Kapasitas penyimpanan lebih luas",
    },
    {
      feature: "Modul Edukasi & Life Skills",
      free: "Modul Inti Esensial",
      premium: "Akses penuh seluruh modul premium",
    },
    {
      feature: "Insight & Analisis Perkembangan",
      free: "Umpan balik standar",
      premium: "Insight refleksi & perkembangan diri lebih mendalam",
    },
    {
      feature: "Rencana Dukungan Personal",
      free: "Panduan mandiri",
      premium: "Rencana dukungan personal langkah berikutnya",
    },
    {
      feature: "Support Pathway & Kontak Darurat",
      free: "Gratis Tanpa Batas (100% Non-Paywalled)",
      premium: "Gratis Tanpa Batas (100% Non-Paywalled)",
    },
    {
      feature: "Lencana SELA Supporter",
      free: "—",
      premium: "Tersedia (Lencana ⭐ di Profil)",
    },
    {
      feature: "Model Pembayaran",
      free: "Bebas Biaya Selamanya",
      premium: "Satu kali bayar · Tanpa auto-charge (30 hari)",
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
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7FAFF] border border-[#CCE1FF] text-xs font-semibold text-[#2457A7] uppercase tracking-wider mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Transparansi Biaya &amp; Model Supporter</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#17365D]">
              {t.title}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#17365D]/80 leading-relaxed max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>

          {/* Pricing Safety & Ethics Notice */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#EBF3FF] border border-[#CCE1FF] text-xs sm:text-sm text-[#17365D]/85 flex items-start gap-3 max-w-3xl mx-auto mb-12 shadow-sm">
            <Info className="w-5 h-5 text-[#2457A7] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Jaminan Akses Keselamatan:</strong> SELA.AI tidak pernah mengunci Support Pathway, panduan faskes Puskesmas BPJS,
              maupun hotline darurat kesehatan mental di balik dinding berbayar. Paket Supporter hadir sebagai kontribusi sukarela
              untuk menopang biaya komputasi AI server agar platform tetap independen dan bebas iklan.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16 items-stretch">
            {/* 1. FREE PLAN CARD */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#F7FAFF] border border-[#CCE1FF] shadow-[6px_6px_16px_rgba(164,188,224,0.35),-6px_-6px_16px_rgba(255,255,255,0.95)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-[#17365D]">Paket Free</h2>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#EBF3FF] text-[#2457A7] border border-[#CCE1FF]">
                    Esensial
                  </span>
                </div>

                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold text-[#17365D]">Rp0</span>
                  <span className="text-xs text-[#17365D]/70 font-medium">selamanya</span>
                </div>

                <p className="mt-3 text-xs sm:text-sm text-[#17365D]/80 leading-relaxed">
                  Fondasi pendampingan awal untuk mengurai uneg-uneg dan mencari bantuan nyata yang aman tanpa biaya.
                </p>

                <div className="mt-8 pt-6 border-t border-[#CCE1FF]/70">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2457A7] block mb-4">
                    Manfaat yang Termasuk:
                  </span>
                  <ul className="space-y-3.5">
                    {freeBenefits.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#17365D]/85 leading-snug">
                        <div className="w-5 h-5 rounded-full bg-[#E6F4EA] border border-[#B7E1CD] text-[#1F7A65] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-[#CCE1FF]/70">
                <Link
                  href={user ? "/app" : "/onboarding"}
                  className="w-full inline-flex items-center justify-center rounded-full bg-white border border-[#2457A7] py-3.5 text-sm font-semibold text-[#2457A7] hover:bg-[#EBF3FF] transition-all shadow-sm"
                >
                  {user ? "Buka Ruang Pengguna" : "Mulai Gratis Sekarang"}
                </Link>
              </div>
            </div>

            {/* 2. SELA SUPPORTER PREMIUM PLAN CARD */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#17365D] text-white border border-[#2457A7] shadow-[8px_8px_24px_rgba(23,54,93,0.3),-4px_-4px_16px_rgba(255,255,255,0.06)] flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="text-xs font-semibold px-3.5 py-1 rounded-full bg-[#2457A7] text-[#CCE1FF] border border-[#6FB1FF]/30">
                  {isUserPremium ? "Paket Aktifmu ⭐" : "Pilihan Supporter ⭐"}
                </span>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">SELA Supporter Premium</h2>

                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold text-white tracking-tight">Rp19.000</span>
                  <span className="text-xs text-white/70">/ 30 hari</span>
                </div>

                {/* Subtitle Badge: Satu kali bayar · Tanpa auto-charge */}
                <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2457A7]/60 border border-[#6FB1FF]/30 text-[11px] font-medium text-[#CCE1FF]">
                  <span>Satu kali bayar · Tanpa auto-charge</span>
                </div>

                <p className="mt-3.5 text-xs sm:text-sm text-white/80 leading-relaxed">
                  Keleluasaan berefleksi lebih mendalam dan intensif sekaligus berkontribusi langsung menjaga keberlanjutan platform.
                </p>

                {/* 6 Core Value-Based Benefits */}
                <div className="mt-8 pt-6 border-t border-white/15">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#6FB1FF] block mb-4">
                    Keunggulan Paket Premium:
                  </span>
                  <ul className="space-y-4">
                    {premiumBenefits.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-white/95 leading-snug">
                          <div className="w-6 h-6 rounded-lg bg-[#2457A7] border border-[#6FB1FF]/40 text-[#CCE1FF] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                            <Icon className="w-3.5 h-3.5" />
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

              <div className="mt-10 pt-6 border-t border-white/15">
                <button
                  type="button"
                  onClick={handleChoosePremium}
                  className="w-full inline-flex items-center justify-center rounded-full bg-[#2457A7] py-3.5 text-sm font-semibold text-white hover:bg-[#3374D4] transition-all shadow-md group"
                >
                  <span>{isUserPremium ? "Perpanjang Masa Aktif" : "Pilih Premium"}</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>

          {/* Feature Comparison Table */}
          <div className="max-w-5xl mx-auto rounded-3xl bg-white/90 border border-[#CCE1FF] p-6 sm:p-8 shadow-sm mb-16">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6 pb-4 border-b border-[#CCE1FF]/60">
              <div>
                <h2 className="text-xl font-bold text-[#17365D]">Perbandingan Manfaat Layanan</h2>
                <p className="text-xs text-[#17365D]/70 mt-0.5">
                  Transparansi penuh atas setiap keleluasaan yang kamu dapatkan.
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs text-[#1F7A65] font-semibold bg-[#E6F4EA] px-3 py-1 rounded-full border border-[#B7E1CD] self-start sm:self-auto">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Tanpa Kontrak Tersembunyi</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#CCE1FF] text-[11px] font-bold uppercase tracking-wider text-[#2457A7]">
                    <th className="py-3 px-4 w-2/5">Fasilitas &amp; Fitur</th>
                    <th className="py-3 px-4 w-3/10">Paket Free</th>
                    <th className="py-3 px-4 w-3/10 text-[#2457A7]">SELA Supporter Premium</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#CCE1FF]/50 text-[#17365D]/85">
                  {comparisonRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#F7FAFF]/80 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-[#17365D]">{row.feature}</td>
                      <td className="py-3.5 px-4 text-[#17365D]/75">{row.free}</td>
                      <td className="py-3.5 px-4 font-semibold text-[#2457A7]">{row.premium}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Institutional / School Partner Section (B2B) */}
          <div className="max-w-5xl mx-auto rounded-3xl bg-[#F7FAFF] border border-[#CCE1FF] p-8 sm:p-10 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2457A7]">
                <Building2 className="w-4 h-4" />
                <span>Untuk Sekolah, Kampus &amp; Organisasi</span>
              </div>
              <h2 className="text-xl font-bold text-[#17365D]">Kemitraan &amp; Demo Institusi</h2>
              <p className="text-xs sm:text-sm text-[#17365D]/80 max-w-lg leading-relaxed">
                Ingin menghadirkan SELA.AI untuk mendukung guru BK atau komunitas konselor sebaya di instansimu? Kami menyediakan program pilot kemitraan dengan privasi terisolasi.
              </p>
            </div>

            <Link
              href="mailto:kemitraan@sela.ai?subject=Permintaan%20Demo%20Institusi%20SELA.AI"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#17365D] text-xs sm:text-sm font-semibold text-white hover:bg-[#2457A7] transition-colors shadow-sm"
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
