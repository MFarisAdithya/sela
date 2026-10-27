"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldAlert,
  Lock,
  Sparkles,
  MessageSquareHeart,
  FileText,
  MessageCircle,
  Users,
  BookOpen,
  TrendingUp,
  Check,
} from "lucide-react";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { copy } from "@/lib/copy";

export default function FiturPage() {
  const t = copy.features;

  return (
    <div className="min-h-screen bg-[#E3EEFF] text-[#17365D]">
      <PublicHeader />

      <main className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7FAFF] border border-[#CCE1FF] text-xs font-semibold text-[#2457A7] uppercase tracking-wider mb-4">
              <span>Arsitektur Layanan SELA.AI</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#17365D]">
              {t.title}
            </h1>
            <p className="mt-4 text-lg text-[#17365D]/80 leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          {/* Fitur Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {t.list.map((item, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-[#F7FAFF] border border-[#CCE1FF] shadow-[6px_6px_16px_rgba(164,188,224,0.3),-6px_-6px_16px_rgba(255,255,255,0.95)] flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#2457A7] bg-[#EBF3FF] px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                  <h2 className="text-xl font-bold text-[#17365D] mt-4 mb-2">
                    {item.title}
                  </h2>
                  <p className="text-sm text-[#17365D]/80 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#CCE1FF]/60">
                  <Link
                    href="/onboarding"
                    className="inline-flex items-center text-xs font-semibold text-[#2457A7] hover:text-[#17365D] transition-colors"
                  >
                    Eksplorasi fitur
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Batasan Layanan & Prinsip Nonklinis */}
          <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-white/90 border border-[#CCE1FF] shadow-md">
            <div className="flex items-center gap-3 text-lg font-bold text-[#17365D] mb-4">
              <ShieldAlert className="w-5 h-5 text-[#2457A7]" />
              <h2>Batasan Layanan &amp; Tanggung Jawab Penggunaan</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[#17365D]/80 leading-relaxed">
              <div className="space-y-3">
                <p>
                  <strong>Bukan Alat Diagnosis:</strong> SELA.AI tidak memberikan label kejiwaan, diagnosis depresi/gangguan psikologis, atau asesmen klinis formal.
                </p>
                <p>
                  <strong>Bukan Pengganti Manusia:</strong> Layanan ini bertindak murni sebagai ruang persiapan dan simulasi komunikasi agar kamu lebih siap berbicara dengan orang sungguhan.
                </p>
              </div>
              <div className="space-y-3">
                <p>
                  <strong>Tanpa Penjualan Data:</strong> Isi percakapan dan kartu ceritamu tidak pernah diperjualbelikan untuk iklan ataupun dijadikan training publik.
                </p>
                <p>
                  <strong>Bantuan Keselamatan Bebas Paywall:</strong> Akses ke direktori bantuan dan protokol keselamatan tidak akan pernah dikunci di balik paket berbayar.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <Link
              href="/onboarding"
              className="inline-flex items-center justify-center rounded-full bg-[#2457A7] px-8 py-3.5 text-base font-semibold text-white hover:bg-[#1C4477] transition-all shadow-md hover:scale-[1.02]"
            >
              Coba SELA.AI Sekarang
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
