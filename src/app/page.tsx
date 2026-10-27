"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowDown,
  Lock,
  PhoneCall,
  Check,
} from "lucide-react";
import { copy } from "@/lib/copy";
import { SelaHeroIllustration } from "@/components/landing/SelaHeroIllustration";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";

const STEP_AURA_IMAGES: Record<string, string> = {
  "01": "/images/aura/aura-mendengarkan.png",
  "02": "/images/aura/aura-merangkum-kartu.png",
  "03": "/images/aura/aura-berlatih-bicara.png",
  "04": "/images/aura/aura-menunjukkan-jalan.png",
};

export default function LandingPage() {
  const t = copy.landing;

  return (
    <div className="min-h-screen bg-[#E8F1FC] text-[#102542] selection:bg-[#D6E7FA] selection:text-[#102542]">
      {/* 1. Global Public Navbar */}
      <PublicHeader />

      <main>
        {/* =========================================================
            2. HERO SECTION: 2-Kolom Desktop dengan Ilustrasi Bergerak, Minim Teks
        ========================================================== */}
        <section className="relative overflow-hidden pt-8 sm:pt-14 lg:pt-20 pb-16 sm:pb-24 lg:pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Kolom Kiri: Copy Singkat & CTA */}
              <div className="lg:col-span-7 flex flex-col items-start text-left">
                {/* Eyebrow Label */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAFDFE] border border-[#BFD8F5] text-xs font-semibold text-[#1E56A0] mb-6 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#1E56A0] animate-pulse" />
                  <span>{t.eyebrow}</span>
                </div>

                {/* Primary Editorial Headline */}
                <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#102542] leading-[1.12]">
                  {t.headlinePart1}
                  <br className="hidden sm:block" />
                  <span className="italic font-normal text-[#1E56A0]">
                    {t.headlineAccent}
                  </span>
                </h1>

                {/* Warm Short Paragraph */}
                <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#35527A] max-w-xl">
                  {t.description}
                </p>

                {/* CTA Buttons */}
                <div className="mt-8 sm:mt-9 flex flex-wrap items-center gap-4">
                  <Link
                    href="/onboarding"
                    className="letterpress-primary inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm sm:text-base font-semibold"
                  >
                    {t.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>

                  <a
                    href="#alur-empat-langkah"
                    className="inline-flex items-center gap-1.5 text-sm sm:text-base font-semibold text-[#1E56A0] hover:text-[#102542] transition-colors py-3.5 px-4 rounded-full hover:bg-[#FAFDFE]/60"
                  >
                    {t.secondaryCta}
                    <ArrowDown className="w-4 h-4" />
                  </a>
                </div>

                {/* Subtle Trust Indicators */}
                <div className="mt-9 sm:mt-11 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#35527A] font-medium">
                  {t.trustNotes.map((note, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1E56A0]" />
                      <span>{note}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kolom Kanan: Ilustrasi Vektor Bergerak Orisinal SELA */}
              <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
                <SelaHeroIllustration />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            3. ALUR EMPAT LANGKAH: The Core Experience
        ========================================================== */}
        <section id="alur-empat-langkah" className="py-20 sm:py-24 bg-[#DCEAFB]/65 border-y border-[#BFD8F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
              <p className="font-mono-num text-xs font-semibold text-[#1E56A0] mb-2">
                Alur Navigasi Inti SELA.AI
              </p>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-medium tracking-tight text-[#102542]">
                {t.fourStepsTitle}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#35527A] leading-relaxed">
                {t.fourStepsSubtitle}
              </p>
            </div>

            {/* 4 Cards Grid with Aura Product Illustrations */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.fourSteps.map((step) => (
                <div
                  key={step.number}
                  className="cotton-sheet flex flex-col justify-between p-5 sm:p-6 rounded-3xl hover:border-[#6BA8FF] transition-colors group"
                >
                  <div>
                    <div className="w-full h-36 rounded-2xl overflow-hidden bg-[#EAF3FF] border border-[#BFD8F5] mb-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={STEP_AURA_IMAGES[step.number] || "/images/aura/aura-chat-assistant.png"}
                        alt={step.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <h3 className="text-lg font-bold text-[#102542] tracking-tight mb-1">
                      {step.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#2E63D6] mb-2">
                      {step.subtitle}
                    </p>
                    <p className="text-sm text-[#35527A] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-[#BFD8F5]/70">
                    <Link
                      href={step.href}
                      className="inline-flex items-center text-xs font-semibold text-[#2E63D6] group-hover:text-[#102542] transition-colors"
                    >
                      Pelajari alur ini
                      <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/cara-kerja"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2E63D6] hover:text-[#102542] underline underline-offset-4"
              >
                Lihat rincian lengkap cara kerja SELA.AI
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================
            4. DETAIL PAKET & HARGA: Free vs Supporter
        ========================================================== */}
        <section className="py-20 sm:py-24 bg-[#E8F1FC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="font-mono-num text-xs font-semibold text-[#1E56A0] mb-2">
                Paket &amp; Transparansi
              </p>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-medium tracking-tight text-[#102542]">
                {t.pricingTeaserTitle}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#35527A]">
                {t.pricingTeaserDesc}
              </p>
            </div>

            {/* Pricing Cards Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Free Plan */}
              <div className="cotton-sheet rounded-3xl p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-[#102542]">{t.freePlan.name}</h3>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#DCEAFB] text-[#1E56A0]">
                      Dasar
                    </span>
                  </div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="font-mono-num text-4xl font-bold text-[#102542]">{t.freePlan.price}</span>
                    <span className="text-xs text-[#5B789E]">{t.freePlan.period}</span>
                  </div>
                  <p className="mt-2.5 text-sm text-[#35527A] leading-relaxed">{t.freePlan.desc}</p>

                  <ul className="mt-6 space-y-3 border-t border-[#BFD8F5]/80 pt-6">
                    {t.freePlan.features.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-[#102542]">
                        <Check className="w-4 h-4 text-[#0F6E56] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-[#BFD8F5]/80">
                  <Link
                    href={t.freePlan.href}
                    className="letterpress-cotton w-full inline-flex items-center justify-center rounded-full py-3 text-sm font-semibold"
                  >
                    {t.freePlan.cta}
                  </Link>
                </div>
              </div>

              {/* Supporter Plan */}
              <div className="rounded-3xl bg-[#102542] text-[#FAFDFE] p-8 border border-[#1E56A0] shadow-[0_14px_32px_rgba(16,37,66,0.16)] flex flex-col justify-between relative overflow-hidden">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-xl font-bold text-[#FAFDFE]">{t.premiumPlan.name}</h3>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#1E56A0] text-[#DCEAFB] border border-[#BFD8F5]/30">
                    Pilihan Supporter
                  </span>
                </div>

                <div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="font-mono-num text-4xl font-bold text-[#FAFDFE]">{t.premiumPlan.price}</span>
                    <span className="text-xs text-[#DCEAFB]/80">{t.premiumPlan.period}</span>
                  </div>
                  <p className="mt-2.5 text-sm text-[#DCEAFB]/90 leading-relaxed">{t.premiumPlan.desc}</p>

                  <ul className="mt-6 space-y-3 border-t border-white/15 pt-6">
                    {t.premiumPlan.features.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-[#FAFDFE]/95">
                        <Check className="w-4 h-4 text-[#8AB6EB] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-white/15">
                  <Link
                    href={t.premiumPlan.href}
                    className="w-full inline-flex items-center justify-center rounded-full bg-[#1E56A0] py-3 text-sm font-semibold text-[#FAFDFE] hover:bg-[#2A6BC2] transition-colors shadow-sm"
                  >
                    {t.premiumPlan.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center text-xs text-[#5B789E] max-w-lg mx-auto">
              Sekali bayar tanpa tagihan otomatis. Bantuan krisis dan Support Pathway selalu gratis.
            </div>
          </div>
        </section>

        {/* =========================================================
            5. PRIVASI, BATAS AI, & KONTAK DARURAT RESMI
        ========================================================== */}
        <section className="py-16 sm:py-20 bg-[#DCEAFB]/65 border-t border-[#BFD8F5]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-9">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAFDFE] border border-[#BFD8F5] text-xs font-semibold text-[#1E56A0] mb-3">
                <Lock className="w-3.5 h-3.5" />
                <span>Keamanan &amp; Etika</span>
              </div>
              <h2 className="font-serif-display text-2xl sm:text-3xl font-medium tracking-tight text-[#102542]">
                {t.safetyDisclaimer.title}
              </h2>
              <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-[#35527A]">
                {t.safetyDisclaimer.body}
              </p>
            </div>

            {/* Emergency Hotline Box */}
            <div className="cotton-sheet rounded-3xl p-6 sm:p-7">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-[#BFD8F5]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#1E56A0]">
                    <PhoneCall className="w-4 h-4" />
                    <span>Butuh bicara dengan manusia tepercaya sekarang juga?</span>
                  </div>
                  <p className="text-xs text-[#35527A]">
                    Layanan bantuan darurat resmi nasional, bebas pulsa 24 jam:
                  </p>
                </div>

                <Link
                  href="/support"
                  className="letterpress-primary shrink-0 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold"
                >
                  Buka Support Pathway
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                {t.safetyDisclaimer.emergencyContacts.map((contact, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#F2F7FD] border border-[#BFD8F5]">
                    <div className="text-xs font-bold text-[#102542]">{contact.name}</div>
                    <div className="font-mono-num text-base font-bold text-[#1E56A0] mt-1">{contact.number}</div>
                    <div className="text-[11px] text-[#35527A] mt-0.5">{contact.note}</div>
                  </div>
                ))}
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
