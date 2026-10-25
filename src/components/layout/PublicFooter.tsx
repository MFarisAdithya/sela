"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, HeartHandshake, PhoneCall } from "lucide-react";
import { SelaLogo } from "@/components/ui/SelaLogo";
import { copy } from "@/lib/copy";

export const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-[#17365D] text-white/90 pt-16 pb-12 border-t border-[#1C4477]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          {/* Brand Info & SDG 3 */}
          <div className="md:col-span-5 flex flex-col items-start">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group" aria-label="SELA.AI Beranda">
              <SelaLogo
                layout="horizontal"
                size="md"
                variant="white"
                showTagline={true}
                showAiSuffix={true}
                taglineText={copy.brand.tagline}
              />
            </Link>
            <p className="text-sm leading-relaxed text-white/75 max-w-sm">
              {copy.brand.mission}
            </p>

            {/* SDG 3 Impact Badge */}
            <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-[#CCE1FF]">
              <HeartHandshake className="w-3.5 h-3.5 text-[#6FB1FF]" />
              <span>{copy.brand.sdgBadge}</span>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-white/60">
              <ShieldCheck className="w-4 h-4 text-[#6FB1FF]" />
              <span>Privasi data lokal • Divalidasi nonklinis</span>
            </div>
          </div>

          {/* Navigasi Utama */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#6FB1FF] mb-4">
              Jelajahi SELA.AI
            </h4>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li>
                <Link href="/cara-kerja" className="hover:text-white transition-colors">
                  Cara Kerja (4 Langkah)
                </Link>
              </li>
              <li>
                <Link href="/fitur" className="hover:text-white transition-colors">
                  Fitur &amp; Batasan AI
                </Link>
              </li>
              <li>
                <Link href="/harga" className="hover:text-white transition-colors">
                  Paket &amp; Harga (Free vs Premium)
                </Link>
              </li>
              <li>
                <Link href="/tentang" className="hover:text-white transition-colors">
                  Tentang Kami &amp; SDG 3
                </Link>
              </li>
              <li>
                <Link href="/privasi" className="hover:text-white transition-colors">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link href="/syarat" className="hover:text-white transition-colors">
                  Ketentuan Layanan
                </Link>
              </li>
            </ul>
          </div>

          {/* Layanan Krisis Resmi (Bebas Pulsa) */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#6FB1FF] mb-4">
              Bantuan Krisis Langsung
            </h4>
            <div className="space-y-3 text-sm text-white/80">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <div className="font-semibold text-white text-xs flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5 text-[#6FB1FF]" />
                  <span>SEJIWA (Kemenkes RI)</span>
                </div>
                <div className="text-xs text-white/70 mt-1">
                  Hotline Kesehatan Jiwa Nasional: Hubungi <strong>119 ext 8</strong> (Bebas pulsa, 24 Jam).
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <div className="font-semibold text-white text-xs flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5 text-[#6FB1FF]" />
                  <span>SAPA 129 (KemenPPPA)</span>
                </div>
                <div className="text-xs text-white/70 mt-1">
                  Sahabat Perempuan &amp; Anak: Telepon <strong>129</strong> atau WhatsApp{" "}
                  <strong>08111-129-129</strong>.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© 2026 SELA.AI. {copy.brand.tagline}</p>
          <p className="text-center sm:text-right max-w-md">
            SELA.AI bukan layanan medis atau konseling psikiatris. Tidak menyediakan diagnosis klinis atau resep obat.
          </p>
        </div>
      </div>
    </footer>
  );
};
