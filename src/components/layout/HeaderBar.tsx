"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, Sparkles } from "lucide-react";
import { SelaMark } from "@/components/ui/SelaLogo";
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
              <span className="font-bold text-base tracking-tight text-[#102542] leading-none lowercase">
                sela<span className="text-[#1E56A0]">.ai</span>
              </span>
              <span className="text-[10px] text-[#5B789E] hidden sm:inline-block leading-tight mt-0.5">
                Ruang Persiapan Obrolan
              </span>
            </div>
          </Link>
        </div>

        {/* Right: Plan Pill & Quick Settings */}
        <div className="flex items-center gap-3">
          <Link
            href="/app/paket"
            className={cn(
              "hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-colors",
              user?.plan === "premium"
                ? "bg-[#102542] text-[#FAFDFE] border border-[#1E56A0]"
                : "bg-[#FAFDFE] border border-[#BFD8F5] text-[#35527A] hover:text-[#102542]"
            )}
          >
            <Sparkles className={cn("w-3.5 h-3.5", user?.plan === "premium" ? "text-[#DCEAFB]" : "text-[#1E56A0]")} />
            <span>{user?.plan === "premium" ? "SELA Supporter" : "Paket Gratis"}</span>
          </Link>

          <Link
            href="/app/pengaturan"
            className="p-1.5 rounded-xl text-[#35527A] hover:text-[#102542] hover:bg-[#DCEAFB] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1E56A0]"
            title="Pengaturan Akun & Privasi"
            aria-label="Pengaturan Akun"
          >
            <Shield className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
};
