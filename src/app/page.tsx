"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, ShieldCheck, PhoneCall, Sparkles, MessageSquare, FileText } from "lucide-react";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { copy } from "@/lib/copy";

interface DemoScenario {
  id: string;
  tabLabel: string;
  cardCode: string;
  target: string;
  rawThought: string;
  situation: string;
  feeling: string;
  need: string;
  openingLine: string;
}

const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: "jurusan",
    tabLabel: "Soal jurusan kuliah",
    cardCode: "KARTU #01",
    target: "Orang Tua",
    rawThought:
      "Aku tertekan banget di jurusan ini, rasanya salah pilih tapi takut Ayah dan Ibu kecewa kalau aku jujur.",
    situation: "Nilai dan fokus menurun karena materi kuliah terasa sangat berat dua semester ini.",
    feeling: "Cemas, takut mengecewakan, dan lelah memendam sendiri.",
    need: "Didengarkan dulu tanpa langsung dimarahi atau dibanding-bandingkan.",
    openingLine:
      "Yah, Bu, boleh minta waktu ngobrol sebentar malam ini? Ada hal soal kuliah yang lagi bikin aku kewalahan dan aku butuh saran Ayah Ibu.",
  },
  {
    id: "dosen",
    tabLabel: "Tugas dosen menumpuk",
    cardCode: "KARTU #02",
    target: "Dosen Pembimbing",
    rawThought:
      "Minggu ini aku tumbang dan gak sanggup kejar deadline revisi, tapi takut dianggap malas kalau minta perpanjangan waktu.",
    situation: "Kondisi fisik dan mental drop minggu ini sehingga draf bab 3 belum selesai tepat waktu.",
    feeling: "Gugup, merasa bersalah, dan takut menghambat bimbingan.",
    need: "Kepastian tenggat waktu pengganti dan arahan bagian mana yang harus diprioritaskan.",
    openingLine:
      "Selamat pagi Bapak/Ibu, mohon maaf mengganggu. Minggu ini kondisi kesehatan saya menurun sehingga progres revisi melambat. Apakah saya boleh mengajukan tenggat pengganti hari Jumat ini?",
  },
  {
    id: "sahabat",
    tabLabel: "Salah paham teman",
    cardCode: "KARTU #03",
    target: "Sahabat Dekat",
    rawThought:
      "Sahabatku tiba-tiba dingin gara-gara grup tugas kemarin, aku pengen lurusin tapi gengsi dan takut makin runyam.",
    situation: "Komunikasi merenggang sejak pembagian tugas kelompok minggu lalu.",
    feeling: "Tidak tenang, sedih karena berjarak, dan takut kehilangan teman dekat.",
    need: "Meluruskan maksud sebenarnya secara empat mata dengan kepala dingin.",
    openingLine:
      "Eh, nanti habis kelas ada waktu kosong sebentar gak? Aku ngerasa kemarin ada yang kurang pas waktu bahas tugas, aku pengen lurusin biar kita enak lagi.",
  },
];

export default function LandingPage() {
  const t = copy.landing;
  const [activeScenarioId, setActiveScenarioId] = useState<string>("jurusan");

  const activeScenario =
    DEMO_SCENARIOS.find((s) => s.id === activeScenarioId) || DEMO_SCENARIOS[0];

  return (
    <div className="min-h-screen bg-[#E8F1FC] text-[#102542]">
      {/* 1. Global Public Navbar */}
      <PublicHeader />

      <main>
        {/* =========================================================
            2. HERO SECTION: Calm Sky Workbench (1280x800 Fold Compliant)
        ========================================================== */}
        <section className="relative pt-6 sm:pt-10 lg:pt-12 pb-14 sm:pb-20 border-b border-[#C6DCF5]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Left Column: Restrained Editorial Voice */}
              <div className="lg:col-span-5 flex flex-col items-start text-left">
                <h1 className="font-display-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-medium text-[#102542] leading-[1.12]">
                  Bercerita tidak harus langsung sempurna.
                </h1>

                <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#2B4566]">
                  {t.description}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link
                    href="/onboarding"
                    className="letterpress-primary inline-flex items-center justify-center px-6 py-3 text-sm sm:text-base"
                  >
                    {t.cta}
                  </Link>

                  <Link
                    href="/safe-story"
                    className="letterpress-cotton inline-flex items-center justify-center px-5 py-3 text-sm sm:text-base"
                  >
                    Coba buat Kartu Cerita
                  </Link>
                </div>

                {/* Calm Ruled Trust Ledger */}
                <div className="mt-8 pt-5 border-t border-[#C6DCF5] w-full grid grid-cols-3 gap-3 text-xs text-[#2B4566]">
                  <div>
                    <span className="font-mono-num font-semibold text-[#102542] block">Nonklinis</span>
                    <span className="text-[#516B8C]">Bukan alat diagnosis</span>
                  </div>
                  <div className="border-l border-[#C6DCF5] pl-3">
                    <span className="font-mono-num font-semibold text-[#102542] block">Privasi lokal</span>
                    <span className="text-[#516B8C]">Kendali di tanganmu</span>
                  </div>
                  <div className="border-l border-[#C6DCF5] pl-3">
                    <span className="font-mono-num font-semibold text-[#1A6B5A] block">119 &amp; 129</span>
                    <span className="text-[#516B8C]">Krisis selalu gratis</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Signature Interactive Cotton Story Card Desk */}
              <div className="lg:col-span-7 min-w-0">
                <div className="p-3 sm:p-5 rounded-2xl bg-[#DCEAFB]/80 border border-[#9AC0EB] sky-dot-pad shadow-inner">
                  {/* Scenario Groove Switcher */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-medium text-[#2B4566] px-1">
                      Klik contoh situasi untuk melihat draf Kartu Cerita:
                    </span>
                    <div
                      className="sky-groove inline-flex flex-wrap gap-1"
                      role="tablist"
                      aria-label="Pilih contoh situasi"
                    >
                      {DEMO_SCENARIOS.map((item) => {
                        const isSelected = item.id === activeScenarioId;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            role="tab"
                            aria-selected={isSelected}
                            onClick={() => setActiveScenarioId(item.id)}
                            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                              isSelected
                                ? "bg-[#FAFDFE] text-[#102542] shadow-sm border border-[#9AC0EB]"
                                : "text-[#2B4566] hover:text-[#102542]"
                            }`}
                          >
                            {item.tabLabel}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* The Cotton Index Card */}
                  <div className="cotton-sheet overflow-hidden border border-[#9AC0EB]">
                    {/* Card Top Index Tab Bar */}
                    <div className="px-4 sm:px-5 py-3 bg-[#F4F9FF] border-b border-[#C6DCF5] flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono-num text-xs font-semibold px-2 py-0.5 rounded bg-[#DCEAFB] text-[#1E56A0] border border-[#9AC0EB]">
                          {activeScenario.cardCode}
                        </span>
                        <span className="text-xs font-semibold text-[#102542]">
                          Tujuan bicara: {activeScenario.target}
                        </span>
                      </div>
                      <span className="settled-stamp">
                        <Check className="w-3.5 h-3.5" />
                        <span>Siap dibicarakan</span>
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 sm:p-5 space-y-4">
                      {/* Raw Unspoken Worry */}
                      <div className="p-3 rounded-lg bg-[#E8F1FC]/75 border border-[#C6DCF5]">
                        <div className="text-[11px] font-medium text-[#516B8C] mb-1">
                          Uneg-uneg awal di kepala:
                        </div>
                        <p className="text-xs sm:text-sm text-[#2B4566] italic">
                          &ldquo;{activeScenario.rawThought}&rdquo;
                        </p>
                      </div>

                      {/* 3 Structured Quadrants */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                        <div className="p-3 rounded-lg bg-[#F4F9FF] border border-[#C6DCF5]">
                          <div className="font-mono-num text-[11px] font-semibold text-[#1E56A0] mb-1">
                            01. Situasi
                          </div>
                          <p className="text-xs text-[#102542] leading-snug">
                            {activeScenario.situation}
                          </p>
                        </div>

                        <div className="p-3 rounded-lg bg-[#F4F9FF] border border-[#C6DCF5]">
                          <div className="font-mono-num text-[11px] font-semibold text-[#1E56A0] mb-1">
                            02. Perasaan
                          </div>
                          <p className="text-xs text-[#102542] leading-snug">
                            {activeScenario.feeling}
                          </p>
                        </div>

                        <div className="p-3 rounded-lg bg-[#F4F9FF] border border-[#C6DCF5]">
                          <div className="font-mono-num text-[11px] font-semibold text-[#1E56A0] mb-1">
                            03. Kebutuhan
                          </div>
                          <p className="text-xs text-[#102542] leading-snug">
                            {activeScenario.need}
                          </p>
                        </div>
                      </div>

                      {/* Ready-to-use Opening Line */}
                      <div className="p-3.5 rounded-xl bg-[#DCEAFB]/65 border border-[#9AC0EB] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="font-mono-num text-[11px] font-semibold text-[#1E56A0]">
                            04. Kalimat pembuka siap pakai:
                          </div>
                          <p className="text-xs sm:text-sm font-medium text-[#102542] leading-snug">
                            &ldquo;{activeScenario.openingLine}&rdquo;
                          </p>
                        </div>

                        <Link
                          href="/dashboard"
                          className="letterpress-cotton shrink-0 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-[#1E56A0]" />
                          <span>Latih kalimat ini</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            3. EMPAT LANGKAH: Ruled Cotton Index Sheet
        ========================================================== */}
        <section id="alur-empat-langkah" className="py-16 sm:py-20 bg-[#F4F9FF] border-b border-[#C6DCF5]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <h2 className="font-display-serif text-2xl sm:text-3xl font-medium text-[#102542]">
                  {t.fourStepsTitle}
                </h2>
                <p className="mt-1.5 text-sm sm:text-base text-[#2B4566]">
                  {t.fourStepsSubtitle}
                </p>
              </div>
              <Link
                href="/cara-kerja"
                className="text-sm font-semibold text-[#1E56A0] hover:text-[#102542] underline underline-offset-4"
              >
                Baca panduan lengkap 4 langkah
              </Link>
            </div>

            {/* Architectural Ruled Sheet instead of generic scattered SaaS cards */}
            <div className="cotton-sheet border-t-2 border-t-[#102542] border border-[#9AC0EB] overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#C6DCF5]">
                {t.fourSteps.map((step) => (
                  <div
                    key={step.number}
                    className="p-6 flex flex-col justify-between hover:bg-[#F4F9FF]/80 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#C6DCF5]">
                        <span className="font-mono-num text-2xl font-semibold text-[#1E56A0]">
                          {step.number}
                        </span>
                        <span className="text-xs font-medium text-[#516B8C] bg-[#E8F1FC] px-2.5 py-0.5 rounded border border-[#C6DCF5]">
                          {step.subtitle}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-[#102542] mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-[#2B4566] leading-relaxed">
                        {step.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-3 border-t border-[#E8F1FC]">
                      <Link
                        href={step.href}
                        className="text-xs font-semibold text-[#1E56A0] hover:text-[#102542] underline underline-offset-4"
                      >
                        Pelajari tahap ini
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            4. PILIHAN PAKET: Serene Sky & Cotton Ledger
        ========================================================== */}
        <section className="py-16 sm:py-20 bg-[#E8F1FC] border-b border-[#C6DCF5]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-12">
              <h2 className="font-display-serif text-2xl sm:text-3xl font-medium text-[#102542]">
                {t.pricingTeaserTitle}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#2B4566]">
                {t.pricingTeaserDesc}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              {/* Paket Gratis — Pure Cotton Sheet */}
              <div className="cotton-sheet p-7 sm:p-8 border border-[#9AC0EB] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-[#C6DCF5]">
                    <div>
                      <h3 className="text-lg font-bold text-[#102542]">{t.freePlan.name}</h3>
                      <p className="text-xs text-[#516B8C] mt-0.5">{t.freePlan.desc}</p>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#E8F1FC] text-[#1E56A0] border border-[#C6DCF5]">
                      Dasar
                    </span>
                  </div>

                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="font-mono-num text-4xl font-bold text-[#102542]">
                      {t.freePlan.price}
                    </span>
                    <span className="text-xs text-[#516B8C]">{t.freePlan.period}</span>
                  </div>

                  <ul className="mt-6 space-y-3 border-t border-[#C6DCF5] pt-5">
                    {t.freePlan.features.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-[#2B4566]">
                        <Check className="w-4 h-4 text-[#1A6B5A] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-5 border-t border-[#C6DCF5]">
                  <Link
                    href={t.freePlan.href}
                    className="letterpress-cotton w-full inline-flex items-center justify-center py-3 text-sm"
                  >
                    {t.freePlan.cta}
                  </Link>
                </div>
              </div>

              {/* SELA Supporter — Calm Sky-Tinted Cotton Sheet (No jarring dark card!) */}
              <div className="cotton-sheet p-7 sm:p-8 bg-[#F4F9FF] border-2 border-[#1E56A0] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-[#9AC0EB]">
                    <div>
                      <h3 className="text-lg font-bold text-[#102542]">{t.premiumPlan.name}</h3>
                      <p className="text-xs text-[#1E56A0] font-medium mt-0.5">
                        Sekali bayar, tanpa tagihan otomatis
                      </p>
                    </div>
                    <span className="settled-stamp">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Pilihan Supporter</span>
                    </span>
                  </div>

                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="font-mono-num text-4xl font-bold text-[#1E56A0]">
                      {t.premiumPlan.price}
                    </span>
                    <span className="text-xs text-[#2B4566]">{t.premiumPlan.period}</span>
                  </div>

                  <ul className="mt-6 space-y-3 border-t border-[#9AC0EB] pt-5">
                    {t.premiumPlan.features.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-[#102542] font-medium">
                        <Check className="w-4 h-4 text-[#1E56A0] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-5 border-t border-[#9AC0EB]">
                  <Link
                    href={t.premiumPlan.href}
                    className="letterpress-primary w-full inline-flex items-center justify-center py-3 text-sm"
                  >
                    Lihat rincian paket Supporter
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            5. BATAS LAYANAN & KONTAK DARURAT RESMI
        ========================================================== */}
        <section className="py-16 sm:py-20 bg-[#F4F9FF]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="cotton-sheet p-6 sm:p-8 border border-[#9AC0EB]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-[#C6DCF5]">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#1A6B5A] mb-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Jaminan etika dan keselamatan</span>
                  </div>
                  <h2 className="font-display-serif text-xl sm:text-2xl font-medium text-[#102542]">
                    {t.safetyDisclaimer.title}
                  </h2>
                </div>

                <Link
                  href="/support"
                  className="letterpress-cotton shrink-0 inline-flex items-center justify-center px-4 py-2.5 text-xs"
                >
                  Buka Support Pathway
                </Link>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[#2B4566]">
                {t.safetyDisclaimer.body}
              </p>

              <div className="mt-6 pt-5 border-t border-[#C6DCF5]">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#102542] mb-3">
                  <PhoneCall className="w-3.5 h-3.5 text-[#1E56A0]" />
                  <span>Layanan bantuan darurat resmi nasional (bebas pulsa 24 jam):</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {t.safetyDisclaimer.emergencyContacts.map((contact, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#E8F1FC]/70 border border-[#C6DCF5] flex flex-col justify-between"
                    >
                      <div className="text-xs font-semibold text-[#102542]">{contact.name}</div>
                      <div className="font-mono-num text-base font-bold text-[#1E56A0] mt-1">
                        {contact.number}
                      </div>
                      <div className="text-xs text-[#516B8C] mt-0.5">{contact.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 6. Global Public Footer */}
      <PublicFooter />
    </div>
  );
}
