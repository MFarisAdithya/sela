"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Shield, HeartHandshake, Sparkles, MessageSquareHeart, FileText, MessageCircle, Users } from "lucide-react";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { copy } from "@/lib/copy";

export default function CaraKerjaPage() {
  const t = copy.howItWorks;

  return (
    <div className="min-h-screen bg-[#E3EEFF] text-[#17365D]">
      <PublicHeader />

      <main className="py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7FAFF] border border-[#CCE1FF] text-xs font-semibold text-[#2457A7] uppercase tracking-wider mb-4">
              <span>Alur Navigasi Inti SELA.AI</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#17365D]">
              {t.title}
            </h1>
            <p className="mt-4 text-lg text-[#17365D]/80 leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          {/* 4 Steps Detailed Breakdown */}
          <div className="space-y-12">
            {t.steps.map((item, index) => (
              <div
                key={item.id}
                id={item.id}
                className="p-8 sm:p-10 rounded-3xl bg-[#F7FAFF] border border-[#CCE1FF] shadow-[6px_6px_16px_rgba(164,188,224,0.35),-6px_-6px_16px_rgba(255,255,255,0.95)] scroll-mt-28"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#CCE1FF]/70">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2457A7] px-3 py-1 rounded-full bg-[#EBF3FF] w-fit">
                    {item.step}
                  </span>
                  <span className="text-xs text-[#17365D]/60 font-medium">
                    Tahap {index + 1} dari 4
                  </span>
                </div>

                <div className="mt-6">
                  <h2 className="text-2xl font-bold text-[#17365D] tracking-tight">
                    {item.title}
                  </h2>
                  <p className="mt-4 text-base text-[#17365D]/85 leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="mt-6 pt-6 border-t border-[#CCE1FF]/50">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[#2457A7] mb-3">
                      Prinsip Keamanan &amp; Kontrol:
                    </h3>
                    <ul className="space-y-2.5">
                      {item.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-center gap-2.5 text-sm text-[#17365D]/80">
                          <CheckCircle2 className="w-4 h-4 text-[#1F7A65] shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA Box */}
          <div className="mt-16 p-8 rounded-3xl bg-[#17365D] text-white text-center shadow-lg">
            <h2 className="text-2xl font-bold">Siap Menyiapkan Percakapanmu?</h2>
            <p className="mt-2 text-sm text-white/80 max-w-lg mx-auto">
              Mulai dari langkah pertama tanpa tekanan. Kamu bisa melewati pertanyaan kapan saja.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                href="/onboarding"
                className="inline-flex items-center justify-center rounded-full bg-[#2457A7] px-8 py-3 text-sm font-semibold text-white hover:bg-[#3374D4] transition-colors shadow-md"
              >
                Mulai Gratis Sekarang
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/harga"
                className="inline-flex items-center justify-center rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
              >
                Lihat Paket &amp; Harga
              </Link>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
