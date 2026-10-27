"use client";

import React from "react";

export const SelaHeroIllustration: React.FC = () => {
  return (
    <div className="relative w-full max-w-[460px] lg:max-w-[540px] aspect-square mx-auto flex items-center justify-center select-none">
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .sela-orbit-slow {
            animation: sela-orbit 32s linear infinite;
          }
          .sela-float-gentle {
            animation: sela-float-gentle 4.5s ease-in-out infinite;
          }
          .sela-wave-pulse {
            animation: sela-wave-pulse 5.5s ease-in-out infinite;
          }
          .sela-twinkle-1 {
            animation: sela-twinkle 3.2s ease-in-out infinite;
          }
          .sela-twinkle-2 {
            animation: sela-twinkle 4.1s ease-in-out infinite 1.2s;
          }
        }
        @keyframes sela-orbit {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes sela-float-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes sela-wave-pulse {
          0%, 100% { opacity: 0.45; transform: scale(0.97); }
          50% { opacity: 0.85; transform: scale(1.03); }
        }
        @keyframes sela-twinkle {
          0%, 100% { opacity: 0.35; transform: scale(0.85); }
          50% { opacity: 1; transform: scale(1.15); }
        }
      `}</style>

      {/* Ambient soft glow backdrop behind Aura */}
      <div className="absolute inset-6 rounded-full bg-gradient-to-tr from-[#6BA8FF]/35 via-[#FAFDFE]/90 to-[#D6E9FF]/75 blur-2xl -z-10" />

      {/* Soft circular halo pad so Aura stands out crisply against the sky background */}
      <div className="absolute w-[72%] h-[72%] rounded-full bg-gradient-to-b from-[#FAFDFE]/85 to-[#DCECFB]/65 border border-[#FAFDFE]/90 shadow-[0_20px_50px_rgba(46,99,214,0.12)] sela-wave-pulse -z-10" />

      {/* Animated Orbiting Rings & Star Sparkles SVG Backdrop */}
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
          r="224"
          stroke="#6BA8FF"
          strokeWidth="1.5"
          strokeDasharray="5 9"
          className="sela-orbit-slow origin-center opacity-70"
        />

        {/* Orbiting Light Anchors */}
        <g className="sela-orbit-slow origin-center">
          <circle cx="250" cy="26" r="5" fill="#2E63D6" />
          <circle cx="474" cy="250" r="4.5" fill="#6BA8FF" />
          <circle cx="250" cy="474" r="5" fill="#2E63D6" />
          <circle cx="26" cy="250" r="4.5" fill="#F5B95F" />
        </g>

        {/* Subtle Twinkling 4-Point Stars around Aura */}
        <path
          d="M78 106L82 118L94 122L82 126L78 138L74 126L62 122L74 118L78 106Z"
          fill="#FFD166"
          className="sela-twinkle-1 origin-center"
        />
        <path
          d="M428 118L431 127L440 130L431 133L428 142L425 133L416 130L425 127L428 118Z"
          fill="#6BA8FF"
          className="sela-twinkle-2 origin-center"
        />
        <path
          d="M92 382L95 390L103 393L95 396L92 404L89 396L81 393L89 390L92 382Z"
          fill="#6BA8FF"
          className="sela-twinkle-2 origin-center"
        />
      </svg>

      {/* Central Full-Winged Aura Mascot (Transparent PNG with open blue leaf wings & sparkles) */}
      <div className="relative z-10 w-[92%] h-[92%] flex items-center justify-center sela-float-gentle">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/aura/aura-hero-welcome.png"
          alt="Aura menyambut sambil melambaikan tangan dengan sayap daun biru terbuka"
          className="w-full h-full object-contain drop-shadow-[0_18px_36px_rgba(30,86,160,0.18)]"
        />
      </div>
    </div>
  );
};
