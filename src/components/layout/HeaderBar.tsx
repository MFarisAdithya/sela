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
    <header className="sticky top-0 z-30 w-full bg-background/80 backdrop-blur-md border-b border-border-subtle/80 px-4 lg:px-8 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <Link href="/app" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-surface shadow-neu-raised-sm group-hover:shadow-neu-raised transition-all flex items-center justify-center border border-white/80">
              <SelaMark size={22} />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-brand-900 leading-none lowercase">
                sela<span className="text-[#2457A7]">.ai</span>
              </span>
              <span className="text-[10px] text-text-muted hidden sm:inline-block leading-tight mt-0.5">
                Help-Seeking Navigator
              </span>
            </div>
          </Link>
        </div>

        {/* Right: Plan Pill & Quick Settings */}
        <div className="flex items-center gap-3">
          <Link
            href="/app/paket"
            className={cn(
              "hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all shadow-neu-raised-sm",
              user?.plan === "premium"
                ? "bg-[#17365D] text-white border border-[#2457A7]"
                : "bg-surface border border-border-subtle/80 text-text-muted hover:text-brand-900"
            )}
          >
            <Sparkles className={cn("w-3.5 h-3.5", user?.plan === "premium" ? "text-[#CCE1FF]" : "text-brand-600")} />
            <span>{user?.plan === "premium" ? "Supporter ⭐" : "Paket Free"}</span>
          </Link>

          <Link
            href="/app/pengaturan"
            className="p-1.5 rounded-xl text-text-muted hover:text-brand-900 hover:bg-brand-100/60 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
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
