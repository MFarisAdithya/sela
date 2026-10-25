import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  async redirects() {
    return [
      { source: "/app/guided-story", destination: "/safe-story", permanent: false },
      { source: "/app/kartu-cerita", destination: "/journal", permanent: false },
      { source: "/app/practice-talk", destination: "/dashboard", permanent: false },
      { source: "/app/support-pathway", destination: "/support", permanent: false },
      { source: "/app/jurnal", destination: "/journal", permanent: false },
      { source: "/app/ruang-belajar", destination: "/learning", permanent: false },
      { source: "/app/rencana-langkah", destination: "/growth-plan", permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, max-age=0",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
