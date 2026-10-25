"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldAlert, FileText, ArrowRight } from "lucide-react";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { copy } from "@/lib/copy";

export default function SyaratPage() {
  const t = copy.termsOfService;

  return (
    <div className="min-h-screen bg-[#E3EEFF] text-[#17365D]">
      <PublicHeader />

      <main className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7FAFF] border border-[#CCE1FF] text-xs font-semibold text-[#2457A7] uppercase tracking-wider mb-4">
              <FileText className="w-3.5 h-3.5" />
              <span>Ketentuan Layanan</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#17365D]">
              {t.title}
            </h1>
            <p className="mt-4 text-lg text-[#17365D]/80 leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          {/* Terms Points */}
          <div className="space-y-8 mb-16">
            {t.points.map((pt, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-[#F7FAFF] border border-[#CCE1FF] shadow-sm"
              >
                <h2 className="text-xl font-bold text-[#17365D] mb-3">
                  {pt.title}
                </h2>
                <p className="text-base text-[#17365D]/85 leading-relaxed">
                  {pt.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Nav */}
          <div className="p-8 rounded-3xl bg-white/90 border border-[#CCE1FF] text-center shadow-sm">
            <h2 className="text-xl font-bold text-[#17365D] mb-2">Persetujuan Penggunaan</h2>
            <p className="text-sm text-[#17365D]/80 max-w-lg mx-auto mb-6">
              Dengan mengakses atau menggunakan SELA.AI, kamu menyetujui ketentuan layanan dan batas nonklinis di atas.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/onboarding"
                className="inline-flex items-center rounded-full bg-[#2457A7] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#1C4477] transition-colors"
              >
                Saya Mengerti &amp; Mulai
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center rounded-full bg-[#EBF3FF] px-6 py-2.5 text-sm font-semibold text-[#17365D] hover:bg-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-1.5" />
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
