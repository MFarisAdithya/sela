"use client";

import React from "react";

export const SelaHeroIllustration: React.FC = () => {
  return (
    <div className="relative w-full max-w-[480px] lg:max-w-[540px] aspect-square mx-auto flex items-center justify-center select-none">
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .sela-orbit-slow {
            animation: sela-orbit 28s linear infinite;
          }
          .sela-breathe-subtle {
            animation: sela-breathe-subtle 8s ease-in-out infinite;
          }
          .sela-wave-pulse {
            animation: sela-wave-pulse 6s ease-in-out infinite;
          }
        }
        @keyframes sela-orbit {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes sela-breathe-subtle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.035); }
        }
        @keyframes sela-wave-pulse {
          0%, 100% { opacity: 0.35; transform: scale(0.98); }
          50% { opacity: 0.65; transform: scale(1.02); }
        }
      `}</style>

      {/* Ambient soft glow backdrop */}
      <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#CCE1FF]/50 via-[#E3EEFF]/40 to-[#F7FAFF]/80 blur-2xl -z-10" />

      {/* Main SVG Vector Composition */}
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_20px_40px_rgba(23,54,93,0.08)]"
        aria-hidden="true"
      >
        <defs>
          {/* Gradients tailored to SELA navy & royal blues */}
          <linearGradient id="hero-blue-grad" x1="100" y1="400" x2="400" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#17365D" />
            <stop offset="45%" stopColor="#2457A7" />
            <stop offset="85%" stopColor="#4B8FEA" />
            <stop offset="100%" stopColor="#6FB1FF" />
          </linearGradient>

          <linearGradient id="hero-leaf-grad" x1="220" y1="360" x2="380" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2457A7" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#6FB1FF" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#CCE1FF" stopOpacity="0.4" />
          </linearGradient>

          <linearGradient id="hero-soft-wave" x1="50" y1="250" x2="450" y2="250" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2457A7" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#4B8FEA" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#2457A7" stopOpacity="0.08" />
          </linearGradient>

          <linearGradient id="hero-ripple" x1="120" y1="120" x2="380" y2="380" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F7FAFF" />
            <stop offset="100%" stopColor="#D9E9FF" />
          </linearGradient>

          <filter id="soft-shadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="3" dy="8" stdDeviation="12" floodColor="#17365D" floodOpacity="0.1" />
          </filter>
        </defs>

        {/* Outer Mindful Breathing Ring */}
        <circle
          cx="250"
          cy="250"
          r="210"
          stroke="#CCE1FF"
          strokeWidth="1.5"
          strokeDasharray="4 8"
          className="sela-orbit-slow origin-center opacity-70"
        />

        {/* Mid Ripple Ring */}
        <circle
          cx="250"
          cy="250"
          r="175"
          stroke="#A8CBFA"
          strokeWidth="1.2"
          className="sela-wave-pulse origin-center"
        />

        {/* Outer Neumorphic Platter */}
        <circle
          cx="250"
          cy="250"
          r="140"
          fill="url(#hero-ripple)"
          stroke="#EBF3FF"
          strokeWidth="3"
          filter="url(#soft-shadow)"
          className="sela-breathe-subtle origin-center"
        />

        {/* Organic Flowing Wave 1 (Base Calm) */}
        <path
          d="M140 270 C 180 320, 280 330, 340 260 C 370 220, 350 170, 310 160 C 260 150, 190 200, 140 270 Z"
          fill="url(#hero-soft-wave)"
        />

        {/* Brand Petal Curve (Left / Primary Ascending Flow) */}
        <path
          d="M175 325 C 130 250, 145 170, 235 125 C 205 175, 215 240, 275 275 C 310 295, 335 300, 350 290 C 315 335, 240 355, 175 325 Z"
          fill="url(#hero-blue-grad)"
          className="transition-transform duration-700 hover:scale-[1.02] origin-center"
        />

        {/* Complementary Inner Leaf Arc (Nurturing / Safe Space) */}
        <path
          d="M235 125 C 275 155, 330 195, 345 250 C 365 290, 350 330, 315 350 C 375 315, 390 235, 355 180 C 325 135, 275 110, 235 125 Z"
          fill="url(#hero-leaf-grad)"
        />

        {/* Central Calming Focal Bud / Drop */}
        <circle
          cx="335"
          cy="150"
          r="22"
          fill="#4B8FEA"
          stroke="#F7FAFF"
          strokeWidth="3.5"
          className="sela-breathe-subtle origin-center shadow-sm"
        />
        <circle cx="330" cy="145" r="7" fill="#FFFFFF" opacity="0.85" />

        {/* Orbiting Gentle Anchors (Mindful Focus Markers) */}
        <g className="sela-orbit-slow origin-center">
          <circle cx="250" cy="40" r="5" fill="#2457A7" />
          <circle cx="460" cy="250" r="4" fill="#6FB1FF" />
          <circle cx="250" cy="460" r="5" fill="#4B8FEA" />
          <circle cx="40" cy="250" r="4" fill="#17365D" />
        </g>
      </svg>

      {/* Floating Insight Pill 1: Calm Breath Indicator */}
      <div className="hidden sm:flex absolute -bottom-2 -left-3 items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#F7FAFF]/95 backdrop-blur-md border border-[#CCE1FF]/70 shadow-[6px_6px_14px_rgba(23,54,93,0.08),-4px_-4px_10px_rgba(255,255,255,0.9)] text-[#17365D]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#1F7A65] animate-pulse" />
        <span className="text-xs font-medium tracking-tight">Ruang aman tanpa penilaian</span>
      </div>

      {/* Floating Insight Pill 2: Privacy Guarantee */}
      <div className="hidden sm:flex absolute -top-1 -right-3 items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#F7FAFF]/95 backdrop-blur-md border border-[#CCE1FF]/70 shadow-[6px_6px_14px_rgba(23,54,93,0.08),-4px_-4px_10px_rgba(255,255,255,0.9)] text-[#17365D]">
        <span className="text-[11px] font-semibold text-[#2457A7] uppercase tracking-wider">Refleksi Mandiri</span>
      </div>
    </div>
  );
};
