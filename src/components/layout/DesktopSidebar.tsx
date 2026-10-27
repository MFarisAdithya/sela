"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MessageSquareHeart,
  GraduationCap,
  Users,
  TrendingUp,
  ShieldCheck,
  Compass,
  MessageCircle,
  Sparkles,
  CreditCard,
  PhoneCall,
} from "lucide-react";
import { SelaLogo } from "@/components/ui/SelaLogo";
import { AuraAvatar } from "@/components/ui/AuraMascot";

const coreNavItems = [
  { code: "00", label: "Ringkasan Ruang", href: "/app", icon: LayoutDashboard },
  { code: "01", label: "Guided Story", href: "/safe-story", icon: MessageSquareHeart },
  { code: "02", label: "Kartu Cerita & Jurnal", href: "/journal", icon: Compass },
  { code: "03", label: "Practice Talk", href: "/dashboard", icon: MessageCircle },
  { code: "04", label: "Support Pathway", href: "/support", icon: Users },
];

const secondaryNavItems = [
  { label: "Ruang Belajar", href: "/learning", icon: GraduationCap },
  { label: "Rencana Langkah", href: "/growth-plan", icon: TrendingUp },
];

const accountNavItems = [
  { label: "Paket & Langganan", href: "/app/paket", icon: Sparkles },
  { label: "Riwayat Transaksi", href: "/app/pembayaran", icon: CreditCard },
  { label: "Pengaturan Akun", href: "/app/pengaturan", icon: ShieldCheck },
];

export const DesktopSidebar: React.FC = () => {
  const pathname = usePathname();

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
    <aside className="hidden lg:flex flex-col w-64 shrink-0 h-screen sticky top-0 bg-[#F4F9FF] border-r border-[#C6DCF5] px-4 py-5 justify-between select-none overflow-y-auto">
      <div className="space-y-6">
        {/* Brand logo header */}
        <div className="px-2 pb-3 border-b border-[#C6DCF5]">
          <Link href="/app" className="block rounded-lg">
            <SelaLogo
              layout="horizontal"
              size="md"
              showTagline={false}
              showAiSuffix={true}
            />
          </Link>
        </div>

        {/* 1. Core Navigator Navigation */}
        <div>
          <span className="px-2.5 text-xs font-semibold text-[#516B8C] block mb-2">
            Alur persiapan bicara
          </span>
          <nav className="space-y-1" aria-label="Alur utama">
            {coreNavItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/app"
                  ? pathname === "/app"
                  : pathname === item.href || pathname.startsWith(item.href + "/");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors",
                    isActive
                      ? "bg-[#FAFDFE] text-[#102542] font-semibold border border-[#9AC0EB] shadow-sm"
                      : "text-[#2B4566] hover:text-[#102542] hover:bg-[#E8F1FC]/70 border border-transparent"
                  )}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon
                      className={cn(
                        "w-4 h-4 shrink-0",
                        isActive ? "text-[#1E56A0]" : "text-[#516B8C]"
                      )}
                    />
                    <span>{item.label}</span>
                  </span>
                  <span
                    className={cn(
                      "font-mono-num text-[11px]",
                      isActive ? "text-[#1E56A0] font-semibold" : "text-[#6E87A6]"
                    )}
                  >
                    {item.code}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* 2. Secondary Tools Navigation */}
        <div>
          <span className="px-2.5 text-xs font-semibold text-[#516B8C] block mb-2">
            Materi dan target
          </span>
          <nav className="space-y-1" aria-label="Materi dan target">
            {secondaryNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors",
                    isActive
                      ? "bg-[#FAFDFE] text-[#102542] font-semibold border border-[#9AC0EB] shadow-sm"
                      : "text-[#2B4566] hover:text-[#102542] hover:bg-[#E8F1FC]/70 border border-transparent"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-4 h-4 shrink-0",
                      isActive ? "text-[#1E56A0]" : "text-[#516B8C]"
                    )}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* 3. Account & Billing */}
        <div>
          <span className="px-2.5 text-xs font-semibold text-[#516B8C] block mb-2">
            Akun dan paket
          </span>
          <nav className="space-y-1" aria-label="Akun dan paket">
            {accountNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors",
                    isActive
                      ? "bg-[#FAFDFE] text-[#102542] font-semibold border border-[#9AC0EB] shadow-sm"
                      : "text-[#2B4566] hover:text-[#102542] hover:bg-[#E8F1FC]/70 border border-transparent"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-4 h-4 shrink-0",
                      isActive ? "text-[#1E56A0]" : "text-[#516B8C]"
                    )}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Aura Companion & Safety hotline footer card */}
      <div className="pt-4 border-t border-[#C6DCF5] space-y-2.5">
        <Link
          href="/safe-story"
          className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/95 border border-[#B8D7FA] shadow-sm hover:border-[#2E63D6] transition-all group"
          title="Bantuan Aura"
        >
          <AuraAvatar size="sm" />
          <div className="min-w-0 flex-1">
            <span className="block text-xs font-extrabold text-[#102542] group-hover:text-[#1E56A0] truncate">
              Aura · Temanmu
            </span>
            <span className="block text-[10px] text-[#516B8C] truncate">
              Ikon Bantuan &amp; Ruang Refleksi
            </span>
          </div>
        </Link>

        <div className="p-3 rounded-xl bg-[#FAFDFE] border border-[#9AC0EB] shadow-sm">
          <div className="flex items-center justify-between text-xs font-semibold text-[#102542]">
            <span className="flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-[#1A6B5A] shrink-0" />
              <span>SEJIWA Kemenkes</span>
            </span>
            <span className="font-mono-num text-[#1E56A0]">119 ext 8</span>
          </div>
          <p className="text-[11px] text-[#516B8C] mt-1 leading-tight">
            Bebas pulsa 24 jam, atau SAPA 129
          </p>
        </div>
      </div>
    </aside>
  );
};
