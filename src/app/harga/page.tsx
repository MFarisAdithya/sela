"use client";

import React from "react";
import Link from "next/link";
import { Check, ArrowRight, ShieldCheck, HelpCircle, Building2, Info } from "lucide-react";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { copy } from "@/lib/copy";

export default function HargaPage() {
  const t = copy.pricing;
  const free = copy.landing.freePlan;
  const premium = copy.landing.premiumPlan;

  const comparisonRows = [
    { feature: "Akses Dashboard & Refleksi Harian", free: "Tersedia", premium: "Tersedia" },
    { feature: "Guided Story AI", free: "10 respons / bulan", premium: "100 respons / bulan" },
    { feature: "Kartu Cerita Aktif Tersimpan", free: "1 kartu aktif", premium: "Hingga 20 kartu aktif" },
    { feature: "Practice Talk (Simulasi Bicara)", free: "2 sesi / bulan", premium: "10 sesi / bulan (Semua Skenario)" },
    { feature: "Support Pathway & Checklist Bicara", free: "Gratis Tanpa Batas", premium: "Gratis Tanpa Batas" },
    { feature: "Modul Edukasi & Life Skills", free: "Modul Inti", premium: "Semua Modul Lanjutan" },
    { feature: "Ekspor Ringkasan Kartu Cerita", free: "—", premium: "Tersedia (Teks Ringkas)" },
    { feature: "Model Perpanjangan", free: "Selamanya", premium: "Manual (Tanpa Auto-Charge)" },
  ];

  return (
    <div className="min-h-screen bg-[#E3EEFF] text-[#17365D]">
      <PublicHeader />

      <main className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7FAFF] border border-[#CCE1FF] text-xs font-semibold text-[#2457A7] uppercase tracking-wider mb-4">
              <span>Transparansi Biaya</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#17365D]">
              {t.title}
            </h1>
            <p className="mt-4 text-lg text-[#17365D]/80 leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          {/* Pricing Notice */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#EBF3FF] border border-[#CCE1FF] text-xs sm:text-sm text-[#17365D]/85 flex items-start gap-3 max-w-3xl mx-auto mb-12">
            <Info className="w-5 h-5 text-[#2457A7] shrink-0 mt-0.5" />
            <p>{t.notice}</p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            {/* Free Plan */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#F7FAFF] border border-[#CCE1FF] shadow-[6px_6px_16px_rgba(164,188,224,0.35),-6px_-6px_16px_rgba(255,255,255,0.95)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-[#17365D]">{free.name}</h2>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#EBF3FF] text-[#2457A7]">
                    Esensial
                  </span>
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold text-[#17365D]">{free.price}</span>
                  <span className="text-xs text-[#17365D]/70">{free.period}</span>
                </div>
                <p className="mt-4 text-sm text-[#17365D]/80 leading-relaxed">{free.desc}</p>

                <ul className="mt-8 space-y-3.5 border-t border-[#CCE1FF]/70 pt-6">
                  {free.features.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-[#17365D]/85">
                      <Check className="w-4 h-4 text-[#1F7A65] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 pt-6 border-t border-[#CCE1FF]/70">
                <Link
                  href="/onboarding"
                  className="w-full inline-flex items-center justify-center rounded-full bg-white border border-[#2457A7] py-3.5 text-sm font-semibold text-[#2457A7] hover:bg-[#EBF3FF] transition-colors"
                >
                  Gunakan Paket Free
                </Link>
              </div>
            </div>

            {/* Premium Plan */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#17365D] text-white border border-[#2457A7] shadow-[8px_8px_20px_rgba(23,54,93,0.25)] flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="text-xs font-semibold px-3.5 py-1 rounded-full bg-[#2457A7] text-[#CCE1FF]">
                  Rekomendasi Uji
                </span>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">{premium.name}</h2>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold text-white">{premium.price}</span>
                  <span className="text-xs text-white/70">/ 30 hari</span>
                </div>
                <p className="mt-4 text-sm text-white/80 leading-relaxed">{premium.desc}</p>

                <ul className="mt-8 space-y-3.5 border-t border-white/15 pt-6">
                  {premium.features.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-white/90">
                      <Check className="w-4 h-4 text-[#6FB1FF] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 pt-6 border-t border-white/15">
                <Link
                  href="/onboarding"
                  className="w-full inline-flex items-center justify-center rounded-full bg-[#2457A7] py-3.5 text-sm font-semibold text-white hover:bg-[#3374D4] transition-colors shadow-md"
                >
                  Pilih Premium
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>

          {/* Feature Comparison Table */}
          <div className="max-w-4xl mx-auto rounded-3xl bg-white/90 border border-[#CCE1FF] p-6 sm:p-8 shadow-sm mb-16">
            <h2 className="text-xl font-bold text-[#17365D] mb-6">Tabel Perbandingan Fitur</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[#CCE1FF] text-xs font-bold uppercase tracking-wider text-[#2457A7]">
                    <th className="py-3 px-4">Fitur Layanan</th>
                    <th className="py-3 px-4">Paket Free</th>
                    <th className="py-3 px-4">Paket Premium (Rp19.000)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#CCE1FF]/50 text-[#17365D]/85">
                  {comparisonRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#F7FAFF]/80 transition-colors">
                      <td className="py-3.5 px-4 font-medium">{row.feature}</td>
                      <td className="py-3.5 px-4 text-[#17365D]/75">{row.free}</td>
                      <td className="py-3.5 px-4 font-semibold text-[#2457A7]">{row.premium}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Institutional / School Partner Section (B2B) */}
          <div className="max-w-4xl mx-auto rounded-3xl bg-[#F7FAFF] border border-[#CCE1FF] p-8 sm:p-10 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2457A7]">
                <Building2 className="w-4 h-4" />
                <span>Untuk Sekolah, Kampus &amp; Organisasi</span>
              </div>
              <h2 className="text-xl font-bold text-[#17365D]">Kemitraan &amp; Demo Institusi</h2>
              <p className="text-sm text-[#17365D]/80 max-w-lg leading-relaxed">
                Ingin menghadirkan SELA.AI untuk mendukung guru BK atau komunitas konselor sebaya di instansimu? Kami menyediakan program pilot dengan privasi terisolasi.
              </p>
            </div>

            <Link
              href="mailto:kemitraan@sela.ai?subject=Permintaan%20Demo%20Institusi%20SELA.AI"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#17365D] text-sm font-semibold text-white hover:bg-[#2457A7] transition-colors"
            >
              Ajukan Demo Institusi
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
