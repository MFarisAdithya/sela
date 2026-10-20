"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MessageSquareHeart,
  PenLine,
  GraduationCap,
  ArrowRight,
  ArrowDown,
  ShieldCheck,
  Menu,
  X,
  PhoneCall,
  Sparkles,
  Lock,
  HeartHandshake,
  ExternalLink,
} from "lucide-react";
import { copy, crisisLine } from "@/lib/copy";
import { SelaLogo, SelaMark } from "@/components/ui/SelaLogo";
import { SelaHeroIllustration } from "@/components/landing/SelaHeroIllustration";

const lora = { fontFamily: "var(--font-lora), Lora, Georgia, serif" };

export default function LandingPage() {
  const t = copy.landing;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#E3EEFF] text-[#17365D] selection:bg-[#CCE1FF] selection:text-[#17365D]">
      {/* =========================================================
          1. NAVBAR
      ========================================================== */}
      <header className="sticky top-0 z-50 w-full bg-[#E3EEFF]/90 backdrop-blur-md border-b border-[#CCE1FF]/70 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo Brand */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2457A7] rounded-xl p-1"
            aria-label="SELA Beranda"
          >
            <SelaLogo layout="horizontal" size="md" showTagline={true} />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#17365D]/80">
            <a
              href="#fitur"
              className="hover:text-[#2457A7] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2457A7] rounded-md px-1"
            >
              Fitur
            </a>
            <a
              href="#cara-kerja"
              className="hover:text-[#2457A7] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2457A7] rounded-md px-1"
            >
              Cara kerja
            </a>
            <a
              href="#privasi"
              className="hover:text-[#2457A7] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2457A7] rounded-md px-1"
            >
              Privasi &amp; Batas
            </a>
            <Link
              href="/support"
              className="hover:text-[#2457A7] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2457A7] rounded-md px-1"
            >
              Bantuan Nyata
            </Link>
          </nav>

          {/* Desktop Action CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/onboarding"
              className="inline-flex items-center justify-center rounded-full bg-[#2457A7] px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#1C4477] hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#6FB1FF] shadow-[5px_5px_12px_rgba(23,54,93,0.12),-5px_-5px_12px_rgba(255,255,255,0.9)]"
            >
              {t.cta}
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/onboarding"
              className="inline-flex items-center justify-center rounded-full bg-[#2457A7] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#1C4477]"
            >
              Masuk
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#17365D] hover:bg-white/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2457A7]"
              aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu navigasi"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-[#CCE1FF] bg-[#EBF3FF] px-6 py-5 shadow-lg space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-3 text-base font-medium text-[#17365D]">
              <a
                href="#fitur"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-[#2457A7] transition-colors"
              >
                Fitur
              </a>
              <a
                href="#cara-kerja"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-[#2457A7] transition-colors"
              >
                Cara kerja
              </a>
              <a
                href="#privasi"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-[#2457A7] transition-colors"
              >
                Privasi &amp; Batas AI
              </a>
              <Link
                href="/support"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-[#2457A7] hover:text-[#17365D] transition-colors flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4" /> Cari Bantuan Nyata
              </Link>
            </nav>
            <div className="pt-2 border-t border-[#CCE1FF]/70">
              <Link
                href="/onboarding"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center rounded-full bg-[#2457A7] py-3 text-sm font-semibold text-white shadow-md hover:bg-[#1C4477]"
              >
                {t.cta}
              </Link>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* =========================================================
            2. HERO SECTION (2 Kolom Desktop, Vertikal Mobile)
        ========================================================== */}
        <section className="relative overflow-hidden pt-8 sm:pt-14 lg:pt-20 pb-16 sm:pb-24 lg:pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Kolom Kiri: Editorial Copy & CTA */}
              <div className="lg:col-span-7 flex flex-col items-start text-left">
                {/* Eyebrow Label */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7FAFF]/90 border border-[#CCE1FF] text-xs font-semibold text-[#2457A7] uppercase tracking-wider mb-6 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#2457A7]" />
                  <span>{t.eyebrow}</span>
                </div>

                {/* Primary Editorial Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#17365D] leading-[1.12]">
                  Ruang untuk{" "}
                  <span className="italic font-normal text-[#2457A7]" style={lora}>
                    dirimu.
                  </span>
                </h1>

                {/* Warm Short Paragraph */}
                <p className="mt-6 text-lg sm:text-xl leading-relaxed text-[#17365D]/85 max-w-2xl">
                  {t.description}
                </p>

                {/* CTA Buttons */}
                <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
                  <Link
                    href="/onboarding"
                    className="inline-flex items-center justify-center rounded-full bg-[#2457A7] px-8 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:bg-[#1C4477] hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#6FB1FF] shadow-[7px_7px_16px_rgba(23,54,93,0.14),-7px_-7px_16px_rgba(255,255,255,0.95)]"
                  >
                    {t.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>

                  <a
                    href="#cara-kerja"
                    className="inline-flex items-center gap-1.5 text-base font-semibold text-[#2457A7] hover:text-[#17365D] transition-colors py-3.5 px-4 rounded-full hover:bg-white/40"
                  >
                    {t.secondaryCta}
                    <ArrowDown className="w-4 h-4" />
                  </a>
                </div>

                {/* Subtle Trust Indicators */}
                <div className="mt-10 sm:mt-12 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#17365D]/70 font-medium">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1F7A65]" />
                    <span>Tanpa registrasi publik</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2457A7]" />
                    <span>Catatan tersimpan di peramban</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4B8FEA]" />
                    <span>Dukungan nonklinis aman</span>
                  </div>
                </div>
              </div>

              {/* Kolom Kanan: Ilustrasi Vektor Abstrak Orisinal SELA */}
              <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
                <SelaHeroIllustration />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            3. BAGIAN FITUR (Bercerita, Menulis, Belajar)
        ========================================================== */}
        <section id="fitur" className="py-20 sm:py-28 bg-[#F7FAFF] border-y border-[#D0E1F9]/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Editorial Section Header */}
            <div className="max-w-2xl mb-14 sm:mb-18">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#2457A7] mb-3">
                {t.featuresEyebrow}
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#17365D]">
                {t.featuresTitle}
              </h2>
            </div>

            {/* Editorial 3-Item Grid with Deliberate Whitespace */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {/* Item 1: Bercerita */}
              <div className="flex flex-col justify-between pt-6 border-t-2 border-[#2457A7]/20 hover:border-[#2457A7] transition-all group">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#E3EEFF] flex items-center justify-center text-[#2457A7] shadow-[4px_4px_10px_rgba(164,188,224,0.35),-4px_-4px_10px_rgba(255,255,255,0.9)]">
                      <MessageSquareHeart className="w-6 h-6 stroke-[1.75]" />
                    </div>
                    <span className="text-xs font-semibold tracking-wider uppercase text-[#2457A7] bg-[#EBF3FF] px-3 py-1 rounded-full">
                      Bercerita
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-[#17365D] tracking-tight mb-3">
                    Cerita ke SELA
                  </h3>
                  <p className="text-base text-[#17365D]/80 leading-relaxed">
                    Obrolan hangat dan empatik didampingi Safe Story AI nonklinis. Tempat mengurai
                    benang kusut tanpa takut dihakimi, dilengkapi latihan pernapasan saat dada terasa
                    sesak.
                  </p>
                </div>

                <div className="mt-8 pt-4">
                  <Link
                    href="/onboarding"
                    className="inline-flex items-center text-sm font-semibold text-[#2457A7] group-hover:text-[#17365D] transition-colors"
                  >
                    Mulai bercerita
                    <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* Item 2: Menulis */}
              <div className="flex flex-col justify-between pt-6 border-t-2 border-[#2457A7]/20 hover:border-[#2457A7] transition-all group">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#E3EEFF] flex items-center justify-center text-[#2457A7] shadow-[4px_4px_10px_rgba(164,188,224,0.35),-4px_-4px_10px_rgba(255,255,255,0.9)]">
                      <PenLine className="w-6 h-6 stroke-[1.75]" />
                    </div>
                    <span className="text-xs font-semibold tracking-wider uppercase text-[#2457A7] bg-[#EBF3FF] px-3 py-1 rounded-full">
                      Menulis
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-[#17365D] tracking-tight mb-3">
                    Tumpahkan ke Kertas
                  </h3>
                  <p className="text-base text-[#17365D]/80 leading-relaxed">
                    Ruang menulis hening berpandukan pertanyaan reflektif harian bergaya Lora.
                    Catatanmu tersimpan di perambanmu sendiri dan tidak pernah dikirim ke server mana pun.
                  </p>
                </div>

                <div className="mt-8 pt-4">
                  <Link
                    href="/onboarding"
                    className="inline-flex items-center text-sm font-semibold text-[#2457A7] group-hover:text-[#17365D] transition-colors"
                  >
                    Tulis refleksimu
                    <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* Item 3: Belajar */}
              <div className="flex flex-col justify-between pt-6 border-t-2 border-[#2457A7]/20 hover:border-[#2457A7] transition-all group">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#E3EEFF] flex items-center justify-center text-[#2457A7] shadow-[4px_4px_10px_rgba(164,188,224,0.35),-4px_-4px_10px_rgba(255,255,255,0.9)]">
                      <GraduationCap className="w-6 h-6 stroke-[1.75]" />
                    </div>
                    <span className="text-xs font-semibold tracking-wider uppercase text-[#2457A7] bg-[#EBF3FF] px-3 py-1 rounded-full">
                      Belajar
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-[#17365D] tracking-tight mb-3">
                    Sudut Baca &amp; Latihan
                  </h3>
                  <p className="text-base text-[#17365D]/80 leading-relaxed">
                    Modul psikoedukasi dan keterampilan hidup praktis: dari mengenali emosi, teknik
                    grounding 4-7-8, hingga langkah-langkah kecil merawat diri sehari-hari.
                  </p>
                </div>

                <div className="mt-8 pt-4">
                  <Link
                    href="/onboarding"
                    className="inline-flex items-center text-sm font-semibold text-[#2457A7] group-hover:text-[#17365D] transition-colors"
                  >
                    Eksplorasi materi
                    <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            4. CARA KERJA (3 Langkah Sederhana & Jujur)
        ========================================================== */}
        <section id="cara-kerja" className="py-20 sm:py-28 bg-[#E3EEFF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#2457A7] mb-3">
                {t.howItWorksEyebrow}
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#17365D]">
                {t.howItWorksTitle}
              </h2>
              <p className="mt-4 text-base text-[#17365D]/80">
                Tiga langkah sederhana untuk berhenti sejenak tanpa tuntutan atau diagnosis.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
              {t.steps.map((item, idx) => (
                <div
                  key={item.step}
                  className="relative flex flex-col p-8 rounded-3xl bg-[#F7FAFF]/90 border border-[#CCE1FF]/70 shadow-[6px_6px_16px_rgba(164,188,224,0.35),-6px_-6px_16px_rgba(255,255,255,0.9)]"
                >
                  <div className="text-4xl font-bold text-[#2457A7]/30 mb-4 font-mono">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-[#17365D] mb-3">{item.title}</h3>
                  <p className="text-sm sm:text-base leading-relaxed text-[#17365D]/80">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Catatan Realistis */}
            <div className="mt-12 text-center">
              <p className="text-xs sm:text-sm text-[#17365D]/70 max-w-xl mx-auto">
                SELA tidak menjanjikan perubahan instan ataupun kesembuhan medis. SELA hadir sebagai
                ruang jeda yang aman dan terstruktur saat hari terasa berat.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================
            5. PRIVASI DAN BATAS AI (Transparan & Bertanggung Jawab)
        ========================================================== */}
        <section id="privasi" className="py-20 sm:py-28 bg-[#EBF3FF] border-t border-[#D0E1F9]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E3EEFF] border border-[#CCE1FF] text-xs font-semibold text-[#2457A7] uppercase tracking-wider mb-4">
                <Lock className="w-3.5 h-3.5" />
                <span>Transparansi &amp; Etika</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#17365D]">
                {t.privacyTitle}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#17365D]/85">{t.privacySummary}</p>
            </div>

            {/* 3 Kartu Rincian Batas & Privasi */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.privacyPoints.map((point) => (
                <div
                  key={point.title}
                  className="rounded-2xl bg-[#F7FAFF] p-6 border border-[#CCE1FF]/60 shadow-[4px_4px_12px_rgba(23,54,93,0.06),-4px_-4px_12px_rgba(255,255,255,0.9)]"
                >
                  <h3 className="text-base font-semibold text-[#17365D] mb-2">{point.title}</h3>
                  <p className="text-sm leading-relaxed text-[#17365D]/80">{point.desc}</p>
                </div>
              ))}
            </div>

            {/* Kotak Kontak Darurat & Hotline Terverifikasi */}
            <div className="mt-10 rounded-2xl bg-[#F7FAFF] p-6 sm:p-8 border border-[#CCE1FF] shadow-[inset_3px_3px_8px_rgba(23,54,93,0.08),inset_-3px_-3px_8px_rgba(255,255,255,0.85)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#2457A7]">
                  <PhoneCall className="w-4 h-4" />
                  <span>Butuh bicara dengan manusia sekarang juga?</span>
                </div>
                <p className="text-xs sm:text-sm text-[#17365D]/80">
                  Layanan konseling resmi bebas pulsa Kemenkes: <strong>119 ext 8 (SEJIWA)</strong> atau
                  telepon <strong>SAPA 129</strong> (WhatsApp: 08111-129-129).
                </p>
              </div>

              <Link
                href="/support"
                className="shrink-0 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#2457A7] text-xs font-semibold text-white hover:bg-[#1C4477] transition-colors"
              >
                Lihat Bantuan Nyata
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================
          6. FOOTER
      ========================================================== */}
      <footer className="bg-[#17365D] text-white/90 pt-16 pb-12 border-t border-[#1C4477]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10">
            {/* Kolom 1: Brand Info */}
            <div className="md:col-span-5 flex flex-col items-start">
              <Link href="/" className="flex items-center gap-2.5 mb-4 group">
                <SelaLogo layout="horizontal" size="md" variant="white" showTagline={true} />
              </Link>
              <p className="text-sm leading-relaxed text-white/70 max-w-sm">
                Ruang digital pendampingan awal nonklinis bagi remaja untuk mengenali diri,
                melatih ketahanan emosional, dan menemukan bantuan yang tepat.
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs text-white/60">
                <ShieldCheck className="w-4 h-4 text-[#6FB1FF]" />
                <span>Privasi lokal • Didukung AI nonklinis</span>
              </div>
            </div>

            {/* Kolom 2: Navigasi Internal */}
            <div className="md:col-span-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#6FB1FF] mb-4">
                Navigasi
              </h4>
              <ul className="space-y-2.5 text-sm text-white/80">
                <li>
                  <Link href="/onboarding" className="hover:text-white transition-colors">
                    Masuk ke SELA
                  </Link>
                </li>
                <li>
                  <a href="#fitur" className="hover:text-white transition-colors">
                    Fitur &amp; Ruang
                  </a>
                </li>
                <li>
                  <a href="#cara-kerja" className="hover:text-white transition-colors">
                    Cara Kerja
                  </a>
                </li>
                <li>
                  <a href="#privasi" className="hover:text-white transition-colors">
                    Privasi &amp; Batas AI
                  </a>
                </li>
                <li>
                  <Link href="/support" className="hover:text-white transition-colors">
                    Peta Bantuan Nyata
                  </Link>
                </li>
              </ul>
            </div>

            {/* Kolom 3: Layanan Krisis Resmi */}
            <div className="md:col-span-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#6FB1FF] mb-4">
                Layanan Bantuan Nyata
              </h4>
              <div className="space-y-3 text-sm text-white/80">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="font-semibold text-white text-xs">SEJIWA (Kemenkes RI)</div>
                  <div className="text-xs text-white/70 mt-0.5">
                    Layanan hotline kesehatan jiwa: Hubungi <strong>119 ext 8</strong>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="font-semibold text-white text-xs">SAPA 129 (KemenPPPA)</div>
                  <div className="text-xs text-white/70 mt-0.5">
                    Sahabat Perempuan dan Anak: Telepon <strong>129</strong> atau WhatsApp{" "}
                    <strong>08111-129-129</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Disclaimer */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
            <p>© 2026 SELA. Ruang untuk dirimu.</p>
            <p className="text-center sm:text-right max-w-md">
              Bukan pengganti diagnosis medis atau terapi psikologis profesional.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
