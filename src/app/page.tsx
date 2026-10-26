"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowDown,
  Sparkles,
  ShieldCheck,
  Lock,
  PhoneCall,
  Check,
  HeartHandshake,
  MessageSquareHeart,
  FileText,
  MessageCircle,
  Users,
} from "lucide-react";
import { copy } from "@/lib/copy";
import { SelaHeroIllustration } from "@/components/landing/SelaHeroIllustration";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";

const lora = { fontFamily: "var(--font-lora), Lora, Georgia, serif" };

export default function LandingPage() {
  const t = copy.landing;

  return (
    <div className="min-h-screen bg-[#E3EEFF] text-[#17365D] selection:bg-[#CCE1FF] selection:text-[#17365D]">
      {/* 1. Global Public Navbar */}
      <PublicHeader />

      <main>
        {/* =========================================================
            2. HERO SECTION: 2-Kolom Desktop, Vertikal Mobile
        ========================================================== */}
        <section className="relative overflow-hidden pt-8 sm:pt-14 lg:pt-20 pb-16 sm:pb-24 lg:pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Kolom Kiri: Editorial Copy & CTA */}
              <div className="lg:col-span-7 flex flex-col items-start text-left">
                {/* Eyebrow Label */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7FAFF]/95 border border-[#CCE1FF] text-xs font-semibold text-[#2457A7] uppercase tracking-wider mb-6 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#2457A7]" />
                  <span>{t.eyebrow}</span>
                </div>

                {/* Primary Editorial Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#17365D] leading-[1.12]">
                  {t.headlinePart1}
                  <span className="italic font-normal text-[#2457A7]" style={lora}>
                    {t.headlineAccent}
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
                    href="#alur-empat-langkah"
                    className="inline-flex items-center gap-1.5 text-base font-semibold text-[#2457A7] hover:text-[#17365D] transition-colors py-3.5 px-4 rounded-full hover:bg-white/40"
                  >
                    {t.secondaryCta}
                    <ArrowDown className="w-4 h-4" />
                  </a>
                </div>

                {/* Subtle Trust Indicators */}
                <div className="mt-10 sm:mt-12 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#17365D]/75 font-medium">
                  {t.trustNotes.map((note, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2457A7]" />
                      <span>{note}</span>
                    </div>
                  ))}
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
            3. ALUR EMPAT LANGKAH: The Core Experience
        ========================================================== */}
        <section id="alur-empat-langkah" className="py-20 sm:py-28 bg-[#F7FAFF] border-y border-[#D0E1F9]/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#2457A7] mb-3">
                Alur Navigasi Inti SELA.AI
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#17365D]">
                {t.fourStepsTitle}
              </h2>
              <p className="mt-4 text-base sm:text-lg text-[#17365D]/80 leading-relaxed">
                {t.fourStepsSubtitle}
              </p>
            </div>

            {/* 4 Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {t.fourSteps.map((step) => (
                <div
                  key={step.number}
                  className="flex flex-col justify-between p-7 rounded-3xl bg-white/90 border border-[#CCE1FF]/70 shadow-[6px_6px_16px_rgba(164,188,224,0.3),-6px_-6px_16px_rgba(255,255,255,0.95)] hover:border-[#2457A7]/50 transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-3xl font-bold font-mono text-[#2457A7]/30 group-hover:text-[#2457A7] transition-colors">
                        {step.number}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-[#2457A7]" />
                    </div>

                    <h3 className="text-lg font-semibold text-[#17365D] tracking-tight mb-1">
                      {step.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#2457A7] mb-3 uppercase tracking-wider">
                      {step.subtitle}
                    </p>
                    <p className="text-sm text-[#17365D]/80 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#CCE1FF]/50">
                    <Link
                      href={step.href}
                      className="inline-flex items-center text-xs font-semibold text-[#2457A7] group-hover:text-[#17365D] transition-colors"
                    >
                      Pelajari alur ini
                      <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/cara-kerja"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#2457A7] hover:text-[#17365D] underline underline-offset-4"
              >
                Lihat rincian lengkap cara kerja SELA.AI →
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================
            4. DETAIL PAKET & HARGA: Free vs Premium
        ========================================================== */}
        <section className="py-20 sm:py-28 bg-[#E3EEFF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#2457A7] mb-3">
                Paket &amp; Transparansi
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#17365D]">
                {t.pricingTeaserTitle}
              </h2>
              <p className="mt-4 text-base text-[#17365D]/80">
                {t.pricingTeaserDesc}
              </p>
            </div>

            {/* Pricing Cards Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Free Plan */}
              <div className="rounded-3xl bg-[#F7FAFF] p-8 border border-[#CCE1FF] shadow-[6px_6px_16px_rgba(164,188,224,0.35),-6px_-6px_16px_rgba(255,255,255,0.9)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-[#17365D]">{t.freePlan.name}</h3>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#EBF3FF] text-[#2457A7]">
                      Dasar
                    </span>
                  </div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-[#17365D]">{t.freePlan.price}</span>
                    <span className="text-xs text-[#17365D]/70">{t.freePlan.period}</span>
                  </div>
                  <p className="mt-3 text-sm text-[#17365D]/80 leading-relaxed">{t.freePlan.desc}</p>

                  <ul className="mt-6 space-y-3 border-t border-[#CCE1FF]/70 pt-6">
                    {t.freePlan.features.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-[#17365D]/85">
                        <Check className="w-4 h-4 text-[#1F7A65] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-[#CCE1FF]/70">
                  <Link
                    href={t.freePlan.href}
                    className="w-full inline-flex items-center justify-center rounded-full bg-white border border-[#2457A7] py-3 text-sm font-semibold text-[#2457A7] hover:bg-[#EBF3FF] transition-colors"
                  >
                    {t.freePlan.cta}
                  </Link>
                </div>
              </div>

              {/* Premium Plan */}
              <div className="rounded-3xl bg-[#17365D] text-white p-8 border border-[#2457A7] shadow-[8px_8px_20px_rgba(23,54,93,0.25)] flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#2457A7] text-[#CCE1FF] border border-[#6FB1FF]/30">
                    Pilihan Supporter ⭐
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">{t.premiumPlan.name}</h3>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-white">{t.premiumPlan.price}</span>
                    <span className="text-xs text-white/70">{t.premiumPlan.period}</span>
                  </div>
                  <p className="mt-3 text-sm text-white/80 leading-relaxed">{t.premiumPlan.desc}</p>

                  <ul className="mt-6 space-y-3 border-t border-white/15 pt-6">
                    {t.premiumPlan.features.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-white/90">
                        <Check className="w-4 h-4 text-[#6FB1FF] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-white/15">
                  <Link
                    href={t.premiumPlan.href}
                    className="w-full inline-flex items-center justify-center rounded-full bg-[#2457A7] py-3 text-sm font-semibold text-white hover:bg-[#3374D4] transition-colors shadow-md"
                  >
                    {t.premiumPlan.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center text-xs text-[#17365D]/70 max-w-lg mx-auto">
              Sekali bayar tanpa tagihan otomatis. Bantuan krisis dan Support Pathway selalu gratis.
            </div>
          </div>
        </section>

        {/* =========================================================
            5. PRIVASI, BATAS AI, & KONTAK DARURAT RESMI
        ========================================================== */}
        <section className="py-16 sm:py-24 bg-[#EBF3FF] border-t border-[#D0E1F9]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E3EEFF] border border-[#CCE1FF] text-xs font-semibold text-[#2457A7] uppercase tracking-wider mb-3">
                <Lock className="w-3.5 h-3.5" />
                <span>Keamanan &amp; Etika</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#17365D]">
                {t.safetyDisclaimer.title}
              </h2>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#17365D]/85">
                {t.safetyDisclaimer.body}
              </p>
            </div>

            {/* Emergency Hotline Box */}
            <div className="rounded-3xl bg-[#F7FAFF] p-6 sm:p-7 border border-[#CCE1FF] shadow-[inset_3px_3px_8px_rgba(23,54,93,0.06),inset_-3px_-3px_8px_rgba(255,255,255,0.85)]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-[#CCE1FF]/70">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#2457A7]">
                    <PhoneCall className="w-4 h-4" />
                    <span>Butuh bicara dengan manusia tepercaya sekarang juga?</span>
                  </div>
                  <p className="text-xs text-[#17365D]/80">
                    Layanan bantuan darurat resmi nasional, bebas pulsa 24 jam:
                  </p>
                </div>

                <Link
                  href="/support"
                  className="shrink-0 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#2457A7] text-xs font-semibold text-white hover:bg-[#1C4477] transition-colors"
                >
                  Buka Support Pathway
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {t.safetyDisclaimer.emergencyContacts.map((contact, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/80 border border-[#CCE1FF]/80">
                    <div className="text-xs font-bold text-[#17365D]">{contact.name}</div>
                    <div className="text-base font-extrabold text-[#2457A7] mt-1">{contact.number}</div>
                    <div className="text-[11px] text-[#17365D]/70 mt-0.5">{contact.note}</div>
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
