"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, Sparkles } from "lucide-react";
import { SelaMark } from "@/components/ui/SelaLogo";
import { AuraAvatar } from "@/components/ui/AuraMascot";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

export const HeaderBar: React.FC = () => {
  const pathname = usePathname();
  const { user } = useAuth();

  const isPublicOrOnboarding =
    pathname === "/" ||
    pathname === "/onboarding" ||
    pathname.startsWith("/cara-kerja") ||
    pathname.startsWith("/fitur") ||
    pathname.startsWith("/harga") ||
    pathname.startsWith("/tentang") ||
    pathname.startsWith("/privasi") ||
    pathname.startsWith("/syarat") ||
    pathname.startsWith("/masuk") ||
    pathname.startsWith("/daftar") ||
    pathname.startsWith("/lupa-password") ||
    pathname.startsWith("/verifikasi-email");

  if (isPublicOrOnboarding) {
    return null;
  }

  return (
    <header className="sticky top-0 z-30 w-full bg-[#E8F1FC]/90 backdrop-blur-md border-b border-[#BFD8F5] px-4 lg:px-8 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <Link href="/app" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-[#FAFDFE] border border-[#BFD8F5] flex items-center justify-center shadow-sm">
              <SelaMark size={22} />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-[#102542] leading-none">
                SELA<span className="text-[#2563EB]">.AI</span>
              </span>
            </div>
          </Link>
        </div>

        {/* Right: Aura Companion Pill, Plan Pill & Quick Settings */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/safe-story"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 border border-[#BFD8F5] text-xs font-bold text-[#1E56A0] hover:border-[#2E63D6] transition-all shadow-sm"
            title="Bicara dengan Aura"
          >
            <AuraAvatar size="xs" />
            <span className="hidden xs:inline">Aura Aktif</span>
          </Link>

          {/* Upgrade Button */}
          <Link
            href="/app/paket"
            className={cn(
              "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm active:scale-95",
              user?.plan === "premium"
                ? "bg-[#102542] text-[#FAFDFE] border border-[#1E56A0] hover:bg-[#1E56A0]"
                : "bg-[#2457A7] text-white hover:bg-[#1C4477] shadow-[0_2px_8px_rgba(36,87,167,0.25)]"
            )}
            title="Upgrade Paket SELA.AI"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#DCEAFB]" />
            <span>Upgrade</span>
          </Link>

          <Link
            href="/app/pengaturan"
            className="flex items-center gap-1.5 p-1 pl-1.5 pr-2.5 rounded-full bg-white border border-[#BFD8F5] text-xs font-semibold text-[#102542] hover:border-[#2E63D6] transition-colors shadow-sm"
            title="Akun Saya"
            aria-label="Akun Saya"
          >
            <AuraAvatar size="xs" />
            <span className="hidden sm:inline">Akun Saya</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
