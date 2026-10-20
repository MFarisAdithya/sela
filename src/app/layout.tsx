import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "FATHERCARE AI — Pendampingan Awal Remaja",
  description:
    "Ruang refleksi, latihan life skills, dan informasi pendampingan awal nonklinis untuk remaja.",
  keywords: [
    "FATHERCARE AI",
    "Genre Lampung",
    "Resiliensi Remaja",
    "Life Skills",
    "Safe Story AI",
    "Pendampingan Awal Nonklinis",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#F2F6FC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased bg-background text-text-main selection:bg-brand-200 selection:text-brand-900">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
