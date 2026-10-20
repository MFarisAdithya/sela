"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Shield, Sparkles, AlertCircle } from "lucide-react";

interface HeaderBarProps {
  isAiActive?: boolean;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({ isAiActive = false }) => {
  const pathname = usePathname();

  // Do not show header on landing splash or onboarding
  if (pathname === "/" || pathname === "/onboarding") {
    return null;
  }

  return (
    <header className="sticky top-0 z-30 w-full bg-background/80 backdrop-blur-md border-b border-border-subtle/80 px-4 lg:px-8 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Brand Identity & Non-clinical Disclaimer */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center text-white shadow-neu-raised-sm group-hover:shadow-neu-raised transition-all">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight text-brand-900 leading-none">
                FATHERCARE AI
              </span>
              <span className="text-[10px] text-text-muted hidden sm:inline-block leading-tight mt-0.5">
                Pendampingan Awal Remaja Nonklinis
              </span>
            </div>
          </Link>
        </div>

        {/* Right: AI Mode Badge & Quick Settings */}
        <div className="flex items-center gap-2.5">
          {isAiActive ? (
            <Badge variant="active" dot size="sm" title="Terhubung ke OpenAI Model">
              AI Aktif
            </Badge>
          ) : (
            <Badge variant="demo" dot size="sm" title="Berjalan dalam mode simulasi lokal">
              Mode Demo
            </Badge>
          )}

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
