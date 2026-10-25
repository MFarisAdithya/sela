"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MessageSquareHeart,
  PenLine,
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
import { useAuth } from "@/context/AuthContext";

const coreNavItems = [
  { label: "Dashboard", href: "/app", icon: LayoutDashboard },
  { label: "Guided Story", href: "/safe-story", icon: MessageSquareHeart },
  { label: "Kartu Cerita", href: "/journal", icon: Compass },
  { label: "Practice Talk", href: "/dashboard", icon: MessageCircle },
  { label: "Support Pathway", href: "/support", icon: Users },
];

const secondaryNavItems = [
  { label: "Jurnal Reflektif", href: "/journal", icon: PenLine },
  { label: "Ruang Belajar", href: "/learning", icon: GraduationCap },
  { label: "Rencana Langkah", href: "/growth-plan", icon: TrendingUp },
];

const accountNavItems = [
  { label: "Paket & Kuota", href: "/app/paket", icon: Sparkles },
  { label: "Riwayat Transaksi", href: "/app/pembayaran", icon: CreditCard },
  { label: "Pengaturan Akun", href: "/app/pengaturan", icon: ShieldCheck },
];

export const DesktopSidebar: React.FC = () => {
  const pathname = usePathname();
  const { user } = useAuth();

  // Hidden on landing, public pages, and onboarding
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
    <aside className="hidden lg:flex flex-col w-64 shrink-0 h-screen sticky top-0 bg-surface border-r border-border-subtle/80 px-4 py-6 justify-between select-none overflow-y-auto">
      <div className="space-y-6">
        {/* Brand logo header */}
        <div className="px-2 py-1">
          <Link href="/app" className="block focus:outline-none group">
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
          <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-text-muted/70 block mb-1.5">
            Alur Inti
          </span>
          <nav className="space-y-1" aria-label="Alur Inti">
            {coreNavItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/app"
                  ? pathname === "/app" || pathname === "/dashboard"
                  : pathname === item.href || pathname.startsWith(item.href + "/");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150",
                    isActive
                      ? "bg-brand-100 text-brand-900 shadow-neu-inset font-semibold border border-brand-200/80"
                      : "text-text-muted hover:text-brand-900 hover:bg-surface-card hover:shadow-neu-raised-sm border border-transparent"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-4 h-4 shrink-0 transition-colors",
                      isActive ? "text-brand-700" : "text-text-muted"
                    )}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* 2. Secondary Tools Navigation */}
        <div>
          <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-text-muted/70 block mb-1.5">
            Refleksi &amp; Belajar
          </span>
          <nav className="space-y-1" aria-label="Refleksi dan Belajar">
            {secondaryNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150",
                    isActive
                      ? "bg-brand-100 text-brand-900 shadow-neu-inset font-semibold border border-brand-200/80"
                      : "text-text-muted hover:text-brand-900 hover:bg-surface-card hover:shadow-neu-raised-sm border border-transparent"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-4 h-4 shrink-0 transition-colors",
                      isActive ? "text-brand-700" : "text-text-muted"
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
          <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-text-muted/70 block mb-1.5">
            Akun &amp; Paket
          </span>
          <nav className="space-y-1" aria-label="Akun dan Paket">
            {accountNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150",
                    isActive
                      ? "bg-brand-100 text-brand-900 shadow-neu-inset font-semibold border border-brand-200/80"
                      : "text-text-muted hover:text-brand-900 hover:bg-surface-card hover:shadow-neu-raised-sm border border-transparent"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-4 h-4 shrink-0 transition-colors",
                      isActive ? "text-brand-700" : "text-text-muted"
                    )}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Safety hotline footer pill */}
      <div className="pt-4 border-t border-border-subtle/80">
        <div className="p-3 rounded-2xl bg-brand-50 border border-brand-200/60 shadow-neu-inset-sm">
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-800">
            <PhoneCall className="w-3.5 h-3.5 text-brand-600 shrink-0" />
            <span>Krisis: 119 ext 8</span>
          </div>
          <p className="text-[10px] text-text-muted mt-1 leading-tight">
            SEJIWA Kemenkes RI (24 jam, bebas pulsa)
          </p>
        </div>
      </div>
    </aside>
  );
};
