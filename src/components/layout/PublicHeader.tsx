"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { SelaLogo } from "@/components/ui/SelaLogo";
import { cn } from "@/lib/utils";

interface PublicHeaderProps {
  className?: string;
}

export const PublicHeader: React.FC<PublicHeaderProps> = ({ className }) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Cara kerja", href: "/cara-kerja" },
    { label: "Fitur", href: "/fitur" },
    { label: "Harga", href: "/harga" },
    { label: "Tentang", href: "/tentang" },
    { label: "Privasi", href: "/privasi" },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-[#E8F1FC]/90 backdrop-blur-md border-b border-[#C6DCF5]",
        className
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg p-1 shrink min-w-0"
          aria-label="SELA.AI Beranda"
        >
          <SelaLogo
            layout="horizontal"
            size="md"
            showTagline={false}
            showAiSuffix={true}
          />
        </Link>

        {/* Desktop Navigation (lg+) */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-xl bg-[#DCEAFB]/80 border border-[#C6DCF5] text-sm font-medium text-[#2B4566]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3.5 py-1.5 rounded-lg transition-colors",
                  isActive
                    ? "bg-[#FAFDFE] text-[#102542] font-semibold shadow-sm border border-[#C6DCF5]"
                    : "hover:text-[#102542] hover:bg-[#FAFDFE]/50"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions (lg+) */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <Link
            href="/masuk"
            className="text-sm font-semibold text-[#2B4566] hover:text-[#102542] transition-colors px-3 py-2 rounded-lg"
          >
            Masuk
          </Link>
          <Link
            href="/onboarding"
            className="letterpress-primary inline-flex items-center justify-center px-5 py-2.5 text-sm"
          >
            Mulai gratis
          </Link>
        </div>

        {/* Mobile & Tablet Toggle (<lg) */}
        <div className="flex lg:hidden items-center gap-2 shrink-0">
          <Link
            href="/onboarding"
            className="letterpress-primary inline-flex items-center justify-center px-4 py-2 text-xs"
          >
            Mulai
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#102542] hover:bg-[#FAFDFE]/70"
            aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu navigasi"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#C6DCF5] bg-[#FAFDFE] px-6 py-5 shadow-lg space-y-4">
          <nav className="flex flex-col space-y-2 text-base font-medium text-[#102542]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "py-2 px-3 rounded-lg transition-colors",
                  pathname === link.href
                    ? "bg-[#E8F1FC] text-[#1E56A0] font-semibold"
                    : "hover:bg-[#E8F1FC]/50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-[#C6DCF5] flex flex-col gap-2.5">
            <Link
              href="/masuk"
              onClick={() => setMobileMenuOpen(false)}
              className="letterpress-cotton w-full inline-flex items-center justify-center py-2.5 text-sm"
            >
              Masuk akun
            </Link>
            <Link
              href="/onboarding"
              onClick={() => setMobileMenuOpen(false)}
              className="letterpress-primary w-full inline-flex items-center justify-center py-2.5 text-sm"
            >
              Mulai gratis sekarang
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
