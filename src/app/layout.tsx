import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Newsreader, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";
import { AppProvider } from "@/context/AppContext";
import { AuthProvider } from "@/context/AuthContext";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SELA.AI — Ruang Persiapan Obrolan & Kartu Cerita Remaja",
  description:
    "SELA.AI membantu remaja merapikan pikiran yang kusut menjadi Kartu Cerita, berlatih memulai percakapan, dan menemukan jalur bantuan nyata yang aman.",
  keywords: [
    "SELA.AI",
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
  themeColor: "#E8F1FC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${jakarta.variable} ${newsreader.variable} ${plexMono.variable}`}
    >
      <body className="antialiased selection:bg-[#D6E7FA] selection:text-[#102542]">
        <AuthProvider>
          <AppProvider>
            <AppShell>{children}</AppShell>
          </AppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
