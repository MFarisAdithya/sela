"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MessageSquareHeart,
  PenLine,
  GraduationCap,
  MoreHorizontal,
  Users,
  TrendingUp,
  ShieldCheck,
  Compass,
  MessageCircle,
  Sparkles,
  CreditCard,
  X,
} from "lucide-react";
import { NeuCard } from "@/components/ui/NeuCard";

const mainMobileTabs = [
  { label: "Dashboard", href: "/app", icon: LayoutDashboard },
  { label: "Guided Story", href: "/app/guided-story", icon: MessageSquareHeart },
  { label: "Kartu Cerita", href: "/app/kartu-cerita", icon: Compass },
  { label: "Practice Talk", href: "/app/practice-talk", icon: MessageCircle },
];

const secondaryMobileTabs = [
  { label: "Support Pathway", href: "/app/support-pathway", icon: Users, desc: "Pilihan bantuan nyata tanpa biaya" },
  { label: "Jurnal Reflektif", href: "/app/jurnal", icon: PenLine, desc: "Catatan pribadi tersimpan lokal" },
  { label: "Ruang Belajar", href: "/app/ruang-belajar", icon: GraduationCap, desc: "Modul keterampilan hidup & emosi" },
  { label: "Rencana Langkah", href: "/app/rencana-langkah", icon: TrendingUp, desc: "Target kecil sukarela mandiri" },
  { label: "Paket & Kuota", href: "/app/paket", icon: Sparkles, desc: "Status langganan dan kuota AI" },
  { label: "Pengaturan Akun", href: "/app/pengaturan", icon: ShieldCheck, desc: "Profil, privasi, dan hapus akun" },
];

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const isSecondaryActive = secondaryMobileTabs.some((tab) => pathname.startsWith(tab.href));

  return (
    <>
      {/* Drawer for secondary menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-brand-950/40 backdrop-blur-sm lg:hidden animate-in fade-in duration-150"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="fixed bottom-16 inset-x-0 p-4 max-w-lg mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <NeuCard variant="raised-lg" className="bg-surface p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-border-subtle/80 pb-2">
                <span className="text-xs font-bold text-brand-900 uppercase tracking-wider">
                  Menu Tambahan &amp; Akun
                </span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1 rounded-lg text-text-muted hover:text-brand-900 focus:outline-none"
                  aria-label="Tutup menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-1.5 max-h-[50vh] overflow-y-auto">
                {secondaryMobileTabs.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={cn(
                        "flex items-start gap-3 p-2.5 rounded-xl text-left transition-all",
                        isActive
                          ? "bg-brand-100 text-brand-900 font-semibold border border-brand-200"
                          : "text-text-muted hover:text-brand-900 hover:bg-brand-50"
                      )}
                    >
                      <Icon
                        className={cn(
                          "w-4 h-4 mt-0.5 shrink-0",
                          isActive ? "text-brand-700" : "text-text-muted"
                        )}
                      />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-brand-900 leading-tight">
                          {item.label}
                        </span>
                        <span className="text-[10px] text-text-muted leading-tight mt-0.5">
                          {item.desc}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </NeuCard>
          </div>
        </div>
      )}

      {/* Main Bottom Bar */}
      <nav
        className="fixed bottom-0 inset-x-0 z-30 lg:hidden bg-surface/95 backdrop-blur-md border-t border-border-subtle/80 px-2 py-1.5 select-none shadow-neu-raised"
        aria-label="Navigasi Bawah Mobile"
      >
        <div className="flex items-center justify-around max-w-lg mx-auto">
          {mainMobileTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive =
              tab.href === "/app"
                ? pathname === "/app" || pathname === "/dashboard"
                : pathname === tab.href || pathname.startsWith(tab.href + "/");

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all relative min-w-[56px]",
                  isActive
                    ? "text-brand-700 font-bold"
                    : "text-text-muted hover:text-brand-900"
                )}
              >
                <div
                  className={cn(
                    "p-1.5 rounded-xl transition-all",
                    isActive
                      ? "bg-brand-100 shadow-neu-inset text-brand-700"
                      : "hover:bg-brand-50"
                  )}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] tracking-tight mt-0.5 whitespace-nowrap">
                  {tab.label}
                </span>
                {isActive && (
                  <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-brand-600" />
                )}
              </Link>
            );
          })}

          {/* More button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cn(
              "flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all min-w-[56px] focus:outline-none",
              isMenuOpen || isSecondaryActive
                ? "text-brand-700 font-bold"
                : "text-text-muted hover:text-brand-900"
            )}
            aria-label="Menu tambahan"
            aria-expanded={isMenuOpen}
          >
            <div
              className={cn(
                "p-1.5 rounded-xl transition-all",
                isMenuOpen || isSecondaryActive
                  ? "bg-brand-100 shadow-neu-inset text-brand-700"
                  : "hover:bg-brand-50"
              )}
            >
              <MoreHorizontal className="w-4 h-4" />
            </div>
            <span className="text-[10px] tracking-tight mt-0.5 whitespace-nowrap">
              Lainnya
            </span>
          </button>
        </div>
      </nav>
    </>
  );
};
