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
  title: "SELA.AI — From Unspoken Problems to Prepared Conversations",
  description:
    "SELA.AI adalah platform AI-Powered Help-Seeking Navigator yang mendampingi remaja dalam menguraikan cerita pribadi, berlatih memulai percakapan, dan menemukan jalur dukungan nyata tanpa rasa takut dihakimi.",
  keywords: [
    "SELA.AI",
    "Help-Seeking Navigator",
    "From Unspoken Problems to Prepared Conversations",
    "Guided Story",
    "Kartu Cerita Pribadi",
    "Practice Talk",
    "Support Pathway",
    "Resiliensi Remaja",
    "SDG 3",
    "Komunikasi Asertif",
    "Pendampingan Awal Nonklinis",
  ],
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
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
