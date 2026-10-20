import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";
import { AppProvider } from "@/context/AppContext";

export const metadata: Metadata = {
  title: "SELA — Ruang untuk dirimu.",
  description:
    "SELA adalah ruang digital yang mendampingi remaja dalam mengenali diri, memahami emosi, melatih keterampilan hidup, dan menemukan dukungan yang tepat.",
  keywords: [
    "SELA",
    "Ruang untuk dirimu",
    "Refleksi Diri",
    "Resiliensi Remaja",
    "Life Skills",
    "Safe Story AI",
    "Pendampingan Awal Nonklinis",
    "Genre 2026",
  ],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#E3EEFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased bg-background text-text-main selection:bg-brand-200 selection:text-brand-900">
        <AppProvider>
          <AppShell>{children}</AppShell>
        </AppProvider>
      </body>
    </html>
  );
}
