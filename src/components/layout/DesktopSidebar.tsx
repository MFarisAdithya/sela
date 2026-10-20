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
  PhoneCall,
  TrendingUp,
  ShieldCheck,
  LifeBuoy,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { SelaLogo } from "@/components/ui/SelaLogo";

const navItems = [
  { label: "Beranda", href: "/dashboard", icon: LayoutDashboard },
  { label: "Cerita ke SELA", href: "/safe-story", icon: MessageSquareHeart },
  { label: "Tumpahkan ke Kertas", href: "/journal", icon: PenLine },
  { label: "Sudut Baca & Latihan", href: "/learning", icon: GraduationCap },
  { label: "Cari Bantuan Nyata", href: "/support", icon: Users },
  { label: "Cari pendamping", href: "/referrals", icon: PhoneCall },
  { label: "Rencana bertumbuh", href: "/growth-plan", icon: TrendingUp },
  { label: "Pengaturan", href: "/settings", icon: ShieldCheck },
];

export const DesktopSidebar: React.FC = () => {
  const pathname = usePathname();

  // Hidden on landing splash and onboarding
  if (pathname === "/" || pathname === "/onboarding") {
    return null;
  }

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 h-screen sticky top-0 bg-surface border-r border-border-subtle/80 px-4 py-6 justify-between select-none">
      <div className="space-y-6">
        {/* Brand logo header */}
        <div className="px-2 py-1">
          <Link href="/dashboard" className="block focus:outline-none group">
            <SelaLogo layout="horizontal" size="md" showTagline={true} />
          </Link>
        </div>

        {/* Navigation list */}
        <nav className="space-y-1.5" aria-label="Navigasi Utama">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
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

      {/* Bottom Emergency & Help Box */}
      <div className="space-y-3 pt-4 border-t border-border-subtle/80 px-2">
        <div className="p-3 rounded-xl bg-surface-inset shadow-neu-inset border border-border-subtle/60 text-xs text-text-muted space-y-1.5">
          <div className="flex items-center gap-1.5 font-semibold text-brand-900 text-[11px]">
            <LifeBuoy className="w-3.5 h-3.5 text-brand-600" />
            <span>Bantuan darurat</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            Jika kamu dalam situasi tidak aman, segera cari tempat aman atau hubungi orang dewasa terpercaya.
          </p>
          <Link
            href="/referrals"
            className="block text-[11px] text-brand-700 hover:text-brand-900 font-semibold underline underline-offset-2 pt-0.5"
          >
            Lihat kontak bantuan →
          </Link>
        </div>
      </div>
    </aside>
  );
};
