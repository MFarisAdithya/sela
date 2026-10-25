"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { HeaderBar } from "./HeaderBar";
import { DesktopSidebar } from "./DesktopSidebar";
import { MobileBottomNav } from "./MobileBottomNav";

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const pathname = usePathname();

  // Public pages that manage their own full-width layout, navbar, and footer
  const isPublicPage =
    pathname === "/" ||
    pathname.startsWith("/cara-kerja") ||
    pathname.startsWith("/fitur") ||
    pathname.startsWith("/harga") ||
    pathname.startsWith("/tentang") ||
    pathname.startsWith("/privasi") ||
    pathname.startsWith("/syarat") ||
    pathname.startsWith("/masuk") ||
    pathname.startsWith("/daftar") ||
    pathname.startsWith("/lupa-password") ||
    pathname.startsWith("/verifikasi-email") ||
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/pembayaran") ||
    pathname === "/onboarding";

  if (isPublicPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background text-text-main">
      {/* Desktop Left Sidebar */}
      <DesktopSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <HeaderBar />

        {/* Dynamic Page Content */}
        <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 pb-24 lg:pb-8">
          {children}
        </main>

        {/* Mobile Bottom Navigation */}
        <MobileBottomNav />
      </div>
    </div>
  );
};
