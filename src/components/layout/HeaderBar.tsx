"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Shield, Sparkles } from "lucide-react";
import { SelaMark } from "@/components/ui/SelaLogo";
import { useApp } from "@/context/AppContext";

export const HeaderBar: React.FC = () => {
  const pathname = usePathname();
  const { isAiConfigured } = useApp();

  // Do not show header on landing splash or onboarding
  if (pathname === "/" || pathname === "/onboarding") {
    return null;
  }

  return (
    <header className="sticky top-0 z-30 w-full bg-background/80 backdrop-blur-md border-b border-border-subtle/80 px-4 lg:px-8 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Brand Identity & Non-clinical Disclaimer */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-surface shadow-neu-raised-sm group-hover:shadow-neu-raised transition-all flex items-center justify-center border border-white/80">
              <SelaMark size={22} />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-brand-900 leading-none lowercase">
                sela
              </span>
              <span className="text-[10px] text-text-muted hidden sm:inline-block leading-tight mt-0.5">
                Ruang untuk dirimu.
              </span>
            </div>
          </Link>
        </div>

        {/* Right: Quick Settings */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/settings"
            className="p-1.5 rounded-xl text-text-muted hover:text-brand-900 hover:bg-brand-100/60 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
            title="Pengaturan Privasi & Mode AI"
            aria-label="Pengaturan Privasi"
          >
            <Shield className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
};
