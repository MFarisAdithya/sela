"use client";

import React from "react";
import { TemanRasaCharacter } from "@/data/temanRasa";
import { cn } from "@/lib/utils";

interface TemanRasaAvatarProps {
  character: TemanRasaCharacter;
  size?: "sm" | "md" | "lg";
  className?: string;
  isSelected?: boolean;
}

export const TemanRasaAvatar: React.FC<TemanRasaAvatarProps> = ({
  character,
  size = "md",
  className,
  isSelected = false,
}) => {
  // If final PNG asset is plugged into data, render image directly
  if (character.imageSrc) {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl flex items-center justify-center p-1.5 transition-transform duration-300",
          size === "sm" ? "w-12 h-12" : size === "md" ? "w-20 h-20 sm:w-24 sm:h-24" : "w-28 h-28 sm:w-32 sm:h-32",
          isSelected && "scale-105",
          className
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={character.imageSrc}
          alt={`Teman Rasa: ${character.name}`}
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  // Bespoke handcrafted SVG placeholders per character
  return (
    <div
      className={cn(
        "relative rounded-2xl flex items-center justify-center p-1 select-none transition-transform duration-300",
        size === "sm" ? "w-12 h-12" : size === "md" ? "w-20 h-20 sm:w-24 sm:h-24" : "w-28 h-28 sm:w-32 sm:h-32",
        isSelected ? "scale-105" : "group-hover:scale-105",
        className
      )}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
        aria-hidden="true"
      >
        <defs>
          {/* Radial backdrops */}
          <radialGradient id={`glow-${character.id}`} cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="100%" stopColor={character.theme.baseColor} stopOpacity="0.15" />
          </radialGradient>
        </defs>

        {/* Ambient Halo */}
        <circle cx="50" cy="50" r="44" fill={`url(#glow-${character.id})`} />

        {/* 1. CERAH — Senang dan Lega (Mint Leaf Sprout, Cheerful smiling curved eyes, rosy cheeks) */}
        {character.id === "cerah" && (
          <g>
            {/* Organic soft body */}
            <path
              d="M50 18C32 18 20 34 20 54C20 72 33 82 50 82C67 82 80 72 80 54C80 34 68 18 50 18Z"
              fill="#A7F3D0"
            />
            <path
              d="M50 22C35 22 24 36 24 54C24 69 35 78 50 78C65 78 76 69 76 54C76 36 65 22 50 22Z"
              fill="#D1FAE5"
            />
            {/* Sprout Leaf Antenna */}
            <path
              d="M50 20C48 10 56 6 62 8C64 15 57 19 50 20Z"
              fill="#10B981"
            />
            <path
              d="M50 20C52 11 44 8 39 10C37 16 43 20 50 20Z"
              fill="#34D399"
            />
            {/* Happy smiling eyes (curved lines) */}
            <path
              d="M34 50C36 45 42 45 44 50"
              stroke="#065F46"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <path
              d="M56 50C58 45 64 45 66 50"
              stroke="#065F46"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            {/* Rosy blush cheeks */}
            <ellipse cx="32" cy="56" rx="4.5" ry="3" fill="#F472B6" opacity="0.6" />
            <ellipse cx="68" cy="56" rx="4.5" ry="3" fill="#F472B6" opacity="0.6" />
            {/* Warm open smile */}
            <path
              d="M43 57C43 62 57 62 57 57"
              stroke="#065F46"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* 2. PIJAR — Semangat dan Antusias (Warm Coral Spirit with Blue Sparks) */}
        {character.id === "pijar" && (
          <g>
            {/* Dynamic flame/spark body */}
            <path
              d="M50 14C53 24 65 26 70 36C76 47 76 66 68 76C60 84 40 84 32 76C24 66 24 47 30 36C35 26 47 24 50 14Z"
              fill="#FED7AA"
            />
            <path
              d="M50 19C52 27 62 29 66 38C71 47 71 63 64 72C57 79 43 79 36 72C29 63 29 47 34 38C38 29 48 27 50 19Z"
              fill="#FFEDD5"
            />
            {/* Bright energetic open eyes with spark */}
            <ellipse cx="39" cy="48" rx="4" ry="5" fill="#9A3412" />
            <ellipse cx="61" cy="48" rx="4" ry="5" fill="#9A3412" />
            <circle cx="41" cy="46" r="1.8" fill="#FFFFFF" />
            <circle cx="63" cy="46" r="1.8" fill="#FFFFFF" />
            {/* Cheerful wide smile */}
            <path
              d="M42 58C45 65 55 65 58 58"
              stroke="#9A3412"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            {/* Warm glowing cheeks */}
            <ellipse cx="32" cy="54" rx="4" ry="2.5" fill="#FB923C" opacity="0.6" />
            <ellipse cx="68" cy="54" rx="4" ry="2.5" fill="#FB923C" opacity="0.6" />
            {/* Little blue spark anchor above */}
            <circle cx="74" cy="24" r="3" fill="#2E63D6" />
            <circle cx="26" cy="28" r="2.2" fill="#6BA8FF" />
          </g>
        )}

        {/* 3. TANYA — Penasaran (Lavender Creature, curious head tilt, star sparkle) */}
        {character.id === "tanya" && (
          <g transform="rotate(4 50 50)">
            {/* Soft oval body with curious posture */}
            <ellipse cx="50" cy="52" rx="28" ry="30" fill="#DDD6FE" />
            <ellipse cx="50" cy="52" rx="24" ry="26" fill="#EDE9FE" />
            {/* Big inquisitive round eyes */}
            <circle cx="39" cy="47" r="5.5" fill="#5B21B6" />
            <circle cx="61" cy="47" r="5.5" fill="#5B21B6" />
            {/* Sparkle glint inside eyes */}
            <circle cx="41" cy="45" r="2" fill="#FFFFFF" />
            <circle cx="63" cy="45" r="2" fill="#FFFFFF" />
            {/* Soft curious 'o' mouth */}
            <circle cx="50" cy="60" r="3" fill="#7C3AED" />
            {/* Lavender curiosity spark above head */}
            <path
              d="M50 10L52 16L58 18L52 20L50 26L48 20L42 18L48 16L50 10Z"
              fill="#8B5CF6"
            />
            {/* Soft blush */}
            <ellipse cx="31" cy="54" rx="3.5" ry="2.2" fill="#C084FC" opacity="0.5" />
            <ellipse cx="69" cy="54" rx="3.5" ry="2.2" fill="#C084FC" opacity="0.5" />
          </g>
        )}

        {/* 4. TEDUH — Tenang (Aqua & Sky Blue, serene closed eyes, smooth peaceful curve) */}
        {character.id === "teduh" && (
          <g>
            {/* Soft droplet form */}
            <path
              d="M50 16C36 28 22 42 22 58C22 74 34 82 50 82C66 82 78 74 78 58C78 42 64 28 50 16Z"
              fill="#BAE6FD"
            />
            <path
              d="M50 22C38 32 26 44 26 58C26 71 36 78 50 78C64 78 74 71 74 58C74 44 62 32 50 22Z"
              fill="#E0F2FE"
            />
            {/* Peaceful closed curved eyes (serene resting) */}
            <path
              d="M34 52C37 56 43 56 46 52"
              stroke="#0369A1"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            <path
              d="M54 52C57 56 63 56 66 52"
              stroke="#0369A1"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            {/* Gentle gentle smile */}
            <path
              d="M45 61C48 64 52 64 55 61"
              stroke="#0369A1"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Water drop halo ripple */}
            <ellipse cx="50" cy="80" rx="18" ry="3" stroke="#38BDF8" strokeWidth="1.5" opacity="0.6" />
          </g>
        )}

        {/* 5. KABUT — Kewalahan (Fluffy violet cloud, tired but gentle and friendly) */}
        {character.id === "kabut" && (
          <g>
            {/* Soft cloud lobes */}
            <path
              d="M32 68C22 68 18 56 26 48C24 38 36 32 44 36C48 26 62 26 68 36C78 34 84 46 80 56C86 64 78 74 68 72C60 76 38 76 32 68Z"
              fill="#C7D2FE"
            />
            <path
              d="M34 65C25 65 22 55 29 48C27 40 37 35 44 38C48 29 60 29 65 38C74 36 79 47 76 55C81 62 74 70 66 69C59 72 40 72 34 65Z"
              fill="#EEF2FF"
            />
            {/* Tired but kind droopy eyes */}
            <path
              d="M36 49C40 48 44 51 44 54"
              stroke="#3730A3"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            <path
              d="M56 54C56 51 60 48 64 49"
              stroke="#3730A3"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            {/* Little soft reassuring smile */}
            <path
              d="M46 62C48 64 52 64 54 62"
              stroke="#4338CA"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            {/* Soft soothing mist sparkles */}
            <circle cx="22" cy="38" r="2" fill="#818CF8" opacity="0.6" />
            <circle cx="78" cy="34" r="2.5" fill="#818CF8" opacity="0.6" />
          </g>
        )}

        {/* 6. RIAK — Cemas dan Gelisah (Lavender-blue swirl with searching gentle eyes) */}
        {character.id === "riak" && (
          <g>
            {/* Swirling organic oval body */}
            <ellipse cx="50" cy="52" rx="28" ry="28" fill="#C7D2FE" />
            <ellipse cx="50" cy="52" rx="24" ry="24" fill="#E0E7FF" />
            {/* Rippling concentric curves */}
            <path
              d="M26 52C26 64 36 74 50 74C64 74 74 64 74 52"
              stroke="#818CF8"
              strokeWidth="1.8"
              strokeDasharray="4 4"
            />
            {/* Soft uncertain searching eyes */}
            <circle cx="40" cy="49" r="4.2" fill="#312E81" />
            <circle cx="60" cy="49" r="4.2" fill="#312E81" />
            <circle cx="42" cy="47" r="1.5" fill="#FFFFFF" />
            <circle cx="62" cy="47" r="1.5" fill="#FFFFFF" />
            {/* Wavy gentle mouth */}
            <path
              d="M44 60C47 62 50 58 53 60C55 61 56 61 57 60"
              stroke="#312E81"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            {/* Small floating reassurance bubbles */}
            <circle cx="74" cy="32" r="3" fill="#A5B4FC" opacity="0.7" />
            <circle cx="28" cy="36" r="2" fill="#A5B4FC" opacity="0.6" />
          </g>
        )}

        {/* 7. BARA — Kesal dan Frustrasi (Warm coral ember with cute pout, non-aggressive) */}
        {character.id === "bara" && (
          <g>
            {/* Rounded cozy ember shape */}
            <path
              d="M50 18C36 18 24 30 24 50C24 70 36 80 50 80C64 80 76 70 76 50C76 30 64 18 50 18Z"
              fill="#FECACA"
            />
            <path
              d="M50 22C38 22 28 33 28 50C28 67 38 76 50 76C62 76 72 67 72 50C72 33 62 22 50 22Z"
              fill="#FEE2E2"
            />
            {/* Mild frustrated eyebrows (determined/pouting, not evil) */}
            <path d="M34 42L44 45" stroke="#991B1B" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M66 42L56 45" stroke="#991B1B" strokeWidth="2.5" strokeLinecap="round" />
            {/* Pouting cute eyes */}
            <circle cx="39" cy="49" r="4" fill="#991B1B" />
            <circle cx="61" cy="49" r="4" fill="#991B1B" />
            <circle cx="41" cy="48" r="1.4" fill="#FFFFFF" />
            <circle cx="63" cy="48" r="1.4" fill="#FFFFFF" />
            {/* Cute puffed cheeks */}
            <circle cx="31" cy="56" r="4" fill="#F87171" opacity="0.6" />
            <circle cx="69" cy="56" r="4" fill="#F87171" opacity="0.6" />
            {/* Adorable pout mouth (straight/slight wavy line) */}
            <path
              d="M45 61C48 59 52 59 55 61"
              stroke="#991B1B"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            {/* Little ember warmth flecks */}
            <circle cx="50" cy="12" r="2.5" fill="#EF4444" />
          </g>
        )}

        {/* 8. RINDU — Kesepian dan Butuh Teman (Lilac/slate spirit holding tiny star) */}
        {character.id === "rindu" && (
          <g>
            {/* Soft pear-shaped body */}
            <path
              d="M50 18C40 18 32 26 30 38C26 50 24 64 30 74C36 82 64 82 70 74C76 64 74 50 70 38C68 26 60 18 50 18Z"
              fill="#E2E8F0"
            />
            <path
              d="M50 22C42 22 35 28 34 39C30 50 29 62 34 71C39 78 61 78 66 71C71 62 70 50 66 39C65 28 58 22 50 22Z"
              fill="#F1F5F9"
            />
            {/* Gentle, thoughtful, slightly wistful eyes */}
            <ellipse cx="40" cy="46" rx="3.8" ry="4.5" fill="#334155" />
            <ellipse cx="60" cy="46" rx="3.8" ry="4.5" fill="#334155" />
            <circle cx="42" cy="44" r="1.6" fill="#FFFFFF" />
            <circle cx="62" cy="44" r="1.6" fill="#FFFFFF" />
            {/* Gentle shy mouth */}
            <path
              d="M47 56C49 57 51 57 53 56"
              stroke="#334155"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            {/* Little star held close to heart */}
            <path
              d="M50 64L51.5 68L55.5 69L51.5 70L50 74L48.5 70L44.5 69L48.5 68L50 64Z"
              fill="#F59E0B"
            />
            {/* Soft lilac cheeks */}
            <ellipse cx="32" cy="51" rx="3" ry="2" fill="#CBD5E1" opacity="0.8" />
            <ellipse cx="68" cy="51" rx="3" ry="2" fill="#CBD5E1" opacity="0.8" />
          </g>
        )}
      </svg>
    </div>
  );
};
