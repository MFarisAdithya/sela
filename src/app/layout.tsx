import type { Metadata, Viewport } from "next";
import { Source_Sans_3, Lora } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";
import { AppProvider } from "@/context/AppContext";

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-source-sans",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

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
    <html lang="id" className={`${sourceSans3.variable} ${lora.variable}`}>
      <body className="font-sans antialiased bg-background text-text-main selection:bg-brand-200 selection:text-brand-900">
        <AppProvider>
          <AppShell>{children}</AppShell>
        </AppProvider>
      </body>
    </html>
  );
}
