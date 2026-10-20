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
  PhoneCall,
  TrendingUp,
  ShieldCheck,
  X,
} from "lucide-react";
import { NeuCard } from "@/components/ui/NeuCard";

const mainMobileTabs = [
  { label: "Beranda", href: "/dashboard", icon: LayoutDashboard },
  { label: "Cerita", href: "/safe-story", icon: MessageSquareHeart },
  { label: "Catatan", href: "/journal", icon: PenLine },
  { label: "Belajar", href: "/learning", icon: GraduationCap },
];

const secondaryMobileTabs = [
  { label: "Peta dukungan", href: "/support", icon: Users, desc: "Orang terdekat yang bisa dihubungi" },
  { label: "Cari pendamping", href: "/referrals", icon: PhoneCall, desc: "Pilihan guru BK, konselor, psikolog" },
  { label: "Rencana bertumbuh", href: "/growth-plan", icon: TrendingUp, desc: "Target dan latihan mandiri" },
  { label: "Pengaturan", href: "/settings", icon: ShieldCheck, desc: "Kontrol data dan mode AI" },
];

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Hidden on splash and onboarding
  if (pathname === "/" || pathname === "/onboarding") {
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
                  Menu Lainnya
                </span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1 rounded-lg text-text-muted hover:text-brand-900"
                  aria-label="Tutup menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {secondaryMobileTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = pathname.startsWith(tab.href);
                  return (
                    <Link
                      key={tab.href}
                      href={tab.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 p-2.5 rounded-xl transition-all duration-150 text-left",
                        isActive
                          ? "bg-brand-100 text-brand-900 font-semibold shadow-neu-inset"
                          : "hover:bg-brand-50 text-text-main"
                      )}
                    >
                      <div
                        className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                          isActive ? "bg-brand-600 text-white" : "bg-surface-inset text-brand-700"
                        )}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium leading-none">{tab.label}</span>
                        <span className="text-[11px] text-text-muted mt-1 leading-none">{tab.desc}</span>
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
        aria-label="Navigasi Bawah Seluler"
        className="fixed bottom-0 inset-x-0 z-30 lg:hidden bg-surface/95 backdrop-blur-md border-t border-border-subtle/80 px-2 py-1.5 shadow-[0_-4px_16px_rgba(180,196,218,0.25)]"
      >
        <div className="max-w-md mx-auto flex items-center justify-around">
          {mainMobileTabs.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 px-1 rounded-xl transition-all duration-150",
                  isActive
                    ? "text-brand-700 font-semibold"
                    : "text-text-muted hover:text-brand-900"
                )}
              >
                <div
                  className={cn(
                    "p-1.5 rounded-xl transition-all",
                    isActive && "bg-brand-100 shadow-neu-inset text-brand-700"
                  )}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] mt-0.5 leading-tight">{item.label}</span>
              </Link>
            );
          })}

          {/* More button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cn(
              "flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 px-1 rounded-xl transition-all duration-150",
              isSecondaryActive || isMenuOpen
                ? "text-brand-700 font-semibold"
                : "text-text-muted hover:text-brand-900"
            )}
            aria-label="Menu tambahan"
            aria-expanded={isMenuOpen}
          >
            <div
              className={cn(
                "p-1.5 rounded-xl transition-all",
                (isSecondaryActive || isMenuOpen) && "bg-brand-100 shadow-neu-inset text-brand-700"
              )}
            >
              <MoreHorizontal className="w-4 h-4" />
            </div>
            <span className="text-[10px] mt-0.5 leading-tight">Lainnya</span>
          </button>
        </div>
      </nav>
    </>
  );
};
