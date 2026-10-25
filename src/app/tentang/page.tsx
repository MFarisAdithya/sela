"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, HeartHandshake, Target, ShieldCheck, Users, Sparkles } from "lucide-react";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { copy } from "@/lib/copy";

export default function TentangPage() {
  const t = copy.about;

  return (
    <div className="min-h-screen bg-[#E3EEFF] text-[#17365D]">
      <PublicHeader />

      <main className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7FAFF] border border-[#CCE1FF] text-xs font-semibold text-[#2457A7] uppercase tracking-wider mb-4">
              <span>Misi &amp; Komitmen Dampak</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#17365D]">
              {t.title}
            </h1>
            <p className="mt-4 text-lg text-[#17365D]/80 leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          {/* Mission Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#F7FAFF] border border-[#CCE1FF] shadow-[6px_6px_16px_rgba(164,188,224,0.35),-6px_-6px_16px_rgba(255,255,255,0.95)] mb-10">
            <div className="flex items-center gap-3 text-xl font-bold text-[#17365D] mb-4">
              <Target className="w-6 h-6 text-[#2457A7]" />
              <h2>{t.missionTitle}</h2>
            </div>
            <p className="text-base sm:text-lg text-[#17365D]/85 leading-relaxed">
              {t.missionBody}
            </p>
          </div>

          {/* SDG 3 Commitment */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white/90 border border-[#CCE1FF] shadow-md mb-10">
            <div className="flex items-center gap-3 text-xl font-bold text-[#17365D] mb-4">
              <HeartHandshake className="w-6 h-6 text-[#1F7A65]" />
              <h2>{t.sdgTitle}</h2>
            </div>
            <p className="text-base text-[#17365D]/85 leading-relaxed">
              {t.sdgBody}
            </p>
            <div className="mt-6 p-4 rounded-2xl bg-[#EBF3FF] border border-[#CCE1FF]/70 text-sm text-[#17365D]/80">
              <strong>Fokus Spesifik:</strong> Membantu remaja di Indonesia mengatasi hambatan psikologis awal saat ingin meminta pertolongan, mengurangi stigma kesehatan mental, dan menghubungkan pengguna ke kanal profesional maupun sebaya terlatih.
            </div>
          </div>

          {/* 3 Core Principles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            <div className="p-6 rounded-3xl bg-[#F7FAFF] border border-[#CCE1FF]">
              <h3 className="font-bold text-[#17365D] mb-2 text-base">Tanpa Paksaan</h3>
              <p className="text-xs text-[#17365D]/80 leading-relaxed">
                Pengguna berhak melewati pertanyaan apa pun tanpa rasa bersalah atau intimidasi.
              </p>
            </div>
            <div className="p-6 rounded-3xl bg-[#F7FAFF] border border-[#CCE1FF]">
              <h3 className="font-bold text-[#17365D] mb-2 text-base">Bukan Pengganti Manusia</h3>
              <p className="text-xs text-[#17365D]/80 leading-relaxed">
                AI bukan dokter atau psikolog. AI bertindak sebagai teman latihan menyusun kata-kata.
              </p>
            </div>
            <div className="p-6 rounded-3xl bg-[#F7FAFF] border border-[#CCE1FF]">
              <h3 className="font-bold text-[#17365D] mb-2 text-base">Kejujuran Data</h3>
              <p className="text-xs text-[#17365D]/80 leading-relaxed">
                Tidak ada kontak fiktif atau janji kerahasiaan absolut yang menyesatkan.
              </p>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="text-center">
            <Link
              href="/onboarding"
              className="inline-flex items-center justify-center rounded-full bg-[#2457A7] px-8 py-3.5 text-base font-semibold text-white hover:bg-[#1C4477] transition-all shadow-md hover:scale-[1.02]"
            >
              Mulai Eksplorasi Gratis
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
