"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { SelaLogo } from "@/components/ui/SelaLogo";
import { cn } from "@/lib/utils";

interface PublicHeaderProps {
  className?: string;
}

export const PublicHeader: React.FC<PublicHeaderProps> = ({ className }) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Cara Kerja", href: "/cara-kerja" },
    { label: "Fitur", href: "/fitur" },
    { label: "Harga", href: "/harga" },
    { label: "Tentang", href: "/tentang" },
    { label: "Privasi", href: "/privasi" },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-[#E3EEFF]/90 backdrop-blur-md border-b border-[#CCE1FF]/70 transition-all",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2457A7] rounded-xl p-1 shrink min-w-0"
          aria-label="SELA.AI Beranda"
        >
          <SelaLogo
            layout="horizontal"
            size="md"
            showTagline={true}
            showAiSuffix={true}
            taglineText="From Unspoken Problems to Prepared Conversations"
          />
        </Link>

        {/* Desktop Navigation (lg+) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#17365D]/80">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "hover:text-[#2457A7] transition-colors py-1 px-1.5 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2457A7]",
                  isActive && "text-[#2457A7] font-semibold border-b-2 border-[#2457A7]"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions (lg+) */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <Link
            href="/onboarding"
            className="text-sm font-semibold text-[#2457A7] hover:text-[#17365D] transition-colors px-3 py-2"
          >
            Masuk
          </Link>
          <Link
            href="/onboarding"
            className="inline-flex items-center justify-center rounded-full bg-[#2457A7] px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#1C4477] hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#6FB1FF] shadow-[5px_5px_12px_rgba(23,54,93,0.12),-5px_-5px_12px_rgba(255,255,255,0.9)]"
          >
            Mulai Gratis
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>

        {/* Mobile & Tablet Toggle (<lg) */}
        <div className="flex lg:hidden items-center gap-2 shrink-0">
          <Link
            href="/onboarding"
            className="inline-flex items-center justify-center rounded-full bg-[#2457A7] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#1C4477]"
          >
            Mulai
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-[#17365D] hover:bg-white/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2457A7]"
            aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu navigasi"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#CCE1FF] bg-[#EBF3FF] px-6 py-5 shadow-lg space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3 text-base font-medium text-[#17365D]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "py-1.5 transition-colors",
                  pathname === link.href ? "text-[#2457A7] font-semibold" : "hover:text-[#2457A7]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-[#CCE1FF]/70 flex flex-col gap-2.5">
            <Link
              href="/onboarding"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center rounded-full bg-[#2457A7] py-3 text-sm font-semibold text-white shadow-md hover:bg-[#1C4477]"
            >
              Mulai Gratis Sekarang
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
