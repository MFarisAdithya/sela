"use client";

import React from "react";
import { Heart, Sparkles } from "lucide-react";

export const SelaHeroIllustration: React.FC = () => {
  return (
    <div className="relative w-full max-w-[460px] lg:max-w-[520px] aspect-square mx-auto flex items-center justify-center select-none">
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .sela-orbit-slow {
            animation: sela-orbit 28s linear infinite;
          }
          .sela-breathe-subtle {
            animation: sela-breathe-subtle 6s ease-in-out infinite;
          }
          .sela-float-gentle {
            animation: sela-float-gentle 4.5s ease-in-out infinite;
          }
          .sela-wave-pulse {
            animation: sela-wave-pulse 5.5s ease-in-out infinite;
          }
        }
        @keyframes sela-orbit {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes sela-breathe-subtle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
        @keyframes sela-float-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes sela-wave-pulse {
          0%, 100% { opacity: 0.45; transform: scale(0.98); }
          50% { opacity: 0.85; transform: scale(1.03); }
        }
      `}</style>

      {/* Ambient soft glow backdrop using Aura's official palette (#D6E9FF, #6BA8FF, #F4F8FF) */}
      <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#6BA8FF]/35 via-[#D6E9FF]/60 to-[#F4F8FF]/90 blur-2xl -z-10" />

      {/* Animated Orbiting Rings SVG Backdrop */}
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      >
        {/* Outer Mindful Breathing Ring */}
        <circle
          cx="250"
          cy="250"
          r="225"
          stroke="#6BA8FF"
          strokeWidth="1.5"
          strokeDasharray="5 9"
          className="sela-orbit-slow origin-center opacity-75"
        />

        {/* Mid Ripple Ring */}
        <circle
          cx="250"
          cy="250"
          r="192"
          stroke="#9AC0EB"
          strokeWidth="1.5"
          className="sela-wave-pulse origin-center"
        />

        {/* Orbiting Gentle Star & Light Anchors */}
        <g className="sela-orbit-slow origin-center">
          <circle cx="250" cy="25" r="5.5" fill="#2E63D6" />
          <circle cx="475" cy="250" r="5" fill="#6BA8FF" />
          <circle cx="250" cy="475" r="5.5" fill="#2E63D6" />
          <circle cx="25" cy="250" r="4.5" fill="#FFD8BB" />
        </g>
      </svg>

      {/* Central Floating Aura Mascot Frame */}
      <div className="relative w-[74%] h-[74%] rounded-full p-2.5 bg-gradient-to-b from-[#FAFDFE] to-[#D6E9FF] border-4 border-[#FAFDFE] shadow-[0_20px_50px_rgba(46,99,214,0.16)] flex items-center justify-center overflow-hidden sela-float-gentle">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/aura/aura-hero-character.png"
          alt="Aura — Si Cahaya Kecil dari SELA.AI"
          className="w-full h-full object-cover rounded-full scale-[1.03]"
        />
      </div>

      {/* Top Right Greeting Badge: "Hai! Aku Aura" */}
      <div className="flex absolute top-2 right-0 sm:-right-2 items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#FAFDFE]/95 backdrop-blur-md border border-[#9AC0EB] shadow-[0_10px_24px_rgba(16,37,66,0.1)] text-[#102542] sela-breathe-subtle">
        <Sparkles className="w-4 h-4 text-[#D9822B] shrink-0" />
        <div className="text-left leading-tight">
          <span className="block text-xs font-extrabold text-[#2E63D6]">Hai! Aku Aura</span>
          <span className="block text-[10px] font-medium text-[#35527A]">Temanmu di SELA.AI</span>
        </div>
      </div>

      {/* Bottom Left Floating Pill: Ramah & Menenangkan */}
      <div className="hidden sm:flex absolute bottom-3 -left-2 items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#FAFDFE]/95 backdrop-blur-md border border-[#9AC0EB] shadow-[0_10px_24px_rgba(16,37,66,0.1)] text-[#102542] sela-breathe-subtle">
        <span className="w-6 h-6 rounded-full bg-[#FFE9F1] text-[#E15B8C] flex items-center justify-center">
          <Heart className="w-3.5 h-3.5 fill-current" />
        </span>
        <span className="text-xs font-semibold tracking-tight">Ramah &amp; menenangkan</span>
      </div>

      {/* Bottom Right Floating Pill: Ruang Aman */}
      <div className="hidden sm:flex absolute bottom-10 -right-4 items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#FAFDFE]/95 backdrop-blur-md border border-[#9AC0EB] shadow-[0_10px_24px_rgba(16,37,66,0.1)] text-[#102542]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#0F6E56] animate-pulse" />
        <span className="text-[11px] font-semibold text-[#102542]">Memberikan rasa aman</span>
      </div>
    </div>
  );
};
