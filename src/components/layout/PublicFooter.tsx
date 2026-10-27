"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, HeartHandshake, PhoneCall } from "lucide-react";
import { SelaLogo } from "@/components/ui/SelaLogo";
import { copy } from "@/lib/copy";

export const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-[#DCEAFB] text-[#102542] pt-14 pb-10 border-t-2 border-[#9AC0EB]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-[#9AC0EB]">
          {/* Brand Info & SDG 3 */}
          <div className="md:col-span-5 flex flex-col items-start">
            <Link href="/" className="flex items-center gap-2.5 mb-3" aria-label="SELA.AI Beranda">
              <SelaLogo
                layout="horizontal"
                size="md"
                showTagline={true}
                showAiSuffix={true}
                taglineText="Ruang Persiapan Obrolan & Kartu Cerita"
              />
            </Link>
            <p className="text-sm leading-relaxed text-[#2B4566] max-w-sm">
              {copy.brand.mission}
            </p>

            {/* SDG 3 Impact Badge */}
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FAFDFE] border border-[#C6DCF5] text-xs font-medium text-[#102542] shadow-sm">
              <HeartHandshake className="w-3.5 h-3.5 text-[#1E56A0]" />
              <span>{copy.brand.sdgBadge}</span>
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs text-[#516B8C]">
              <ShieldCheck className="w-4 h-4 text-[#1A6B5A]" />
              <span>Privasi data di perangkatmu sendiri, divalidasi nonklinis</span>
            </div>
          </div>

          {/* Navigasi Utama */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-semibold text-[#102542] mb-3">
              Halaman utama
            </h4>
            <ul className="space-y-2 text-sm text-[#2B4566]">
              <li>
                <Link href="/cara-kerja" className="hover:text-[#1E56A0] hover:underline transition-colors">
                  Cara kerja (4 langkah)
                </Link>
              </li>
              <li>
                <Link href="/fitur" className="hover:text-[#1E56A0] hover:underline transition-colors">
                  Fitur dan batasan layanan
                </Link>
              </li>
              <li>
                <Link href="/harga" className="hover:text-[#1E56A0] hover:underline transition-colors">
                  Pilihan paket (Gratis dan Supporter)
                </Link>
              </li>
              <li>
                <Link href="/tentang" className="hover:text-[#1E56A0] hover:underline transition-colors">
                  Tentang kami dan SDG 3
                </Link>
              </li>
              <li>
                <Link href="/privasi" className="hover:text-[#1E56A0] hover:underline transition-colors">
                  Kebijakan privasi
                </Link>
              </li>
              <li>
                <Link href="/syarat" className="hover:text-[#1E56A0] hover:underline transition-colors">
                  Ketentuan layanan
                </Link>
              </li>
            </ul>
          </div>

          {/* Layanan Krisis Resmi (Bebas Pulsa) */}
          <div className="md:col-span-4">
            <h4 className="text-sm font-semibold text-[#102542] mb-3">
              Bantuan darurat nasional (24 jam)
            </h4>
            <div className="space-y-2.5 text-sm">
              <div className="p-3.5 rounded-xl bg-[#FAFDFE] border border-[#C6DCF5] shadow-sm">
                <div className="font-semibold text-[#102542] text-xs flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <PhoneCall className="w-3.5 h-3.5 text-[#1A6B5A]" />
                    <span>SEJIWA (Kemenkes RI)</span>
                  </span>
                  <span className="font-mono-num font-bold text-[#1E56A0]">119 ext 8</span>
                </div>
                <div className="text-xs text-[#516B8C] mt-1">
                  Bebas pulsa, atau kunjungi healing119.id
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAFDFE] border border-[#C6DCF5] shadow-sm">
                <div className="font-semibold text-[#102542] text-xs flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <PhoneCall className="w-3.5 h-3.5 text-[#1A6B5A]" />
                    <span>SAPA 129 (KemenPPPA)</span>
                  </span>
                  <span className="font-mono-num font-bold text-[#1E56A0]">129</span>
                </div>
                <div className="text-xs text-[#516B8C] mt-1">
                  Perlindungan anak dan perempuan, WhatsApp <span className="font-mono-num font-medium text-[#102542]">08111-129-129</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#516B8C]">
          <p>© 2026 SELA.AI. Ruang persiapan obrolan untuk remaja Indonesia.</p>
          <p className="text-center sm:text-right max-w-md">
            SELA.AI adalah alat bantu persiapan komunikasi nonklinis, bukan pengganti psikolog atau layanan medis darurat.
          </p>
        </div>
      </div>
    </footer>
  );
};
