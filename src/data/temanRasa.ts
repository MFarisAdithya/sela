export interface TemanRasaCharacter {
  id: string;
  name: string;
  emotion: string;
  description: string;
  theme: {
    baseColor: string;
    accentColor: string;
    bgGradient: string;
    badgeBg: string;
    badgeText: string;
    borderColor: string;
  };
  imageSrc?: string | null;
  auraReflection: string;
}

export const TEMAN_RASA_CHARACTERS: TemanRasaCharacter[] = [
  {
    id: "cerah",
    name: "Cerah",
    emotion: "Senang dan Lega",
    description: "Ruang lega dan ceria saat beban terasa terangkat atau ada hal baik yang terjadi.",
    theme: {
      baseColor: "#10B981", // Mint emerald
      accentColor: "#059669",
      bgGradient: "from-[#ECFDF5] via-[#F0FDF4] to-[#E6FFFA]",
      badgeBg: "bg-[#D1FAE5]",
      badgeText: "text-[#065F46]",
      borderColor: "#A7F3D0",
    },
    imageSrc: null, // Will point to /images/teman-rasa/cerah.png when final PNG is available
    auraReflection:
      "Senang rasanya ketika ada hal yang membuatmu merasa lebih baik. Apa yang ingin kamu simpan dari hari ini?",
  },
  {
    id: "pijar",
    name: "Pijar",
    emotion: "Semangat dan Antusias",
    description: "Percikan energi positif dan dorongan hangat untuk mencoba atau menyambut sesuatu.",
    theme: {
      baseColor: "#F97316", // Coral flame
      accentColor: "#EA580C",
      bgGradient: "from-[#FFF7ED] via-[#FFEDD5] to-[#FFE4E6]",
      badgeBg: "bg-[#FFEDD5]",
      badgeText: "text-[#9A3412]",
      borderColor: "#FED7AA",
    },
    imageSrc: null,
    auraReflection:
      "Energi dan semangatmu boleh dirayakan. Apa yang paling ingin kamu lakukan sekarang?",
  },
  {
    id: "tanya",
    name: "Tanya",
    emotion: "Penasaran",
    description: "Dorongan ingin tahu, mengeksplorasi, atau mencoba memahami hal yang belum jelas.",
    theme: {
      baseColor: "#8B5CF6", // Lavender violet
      accentColor: "#7C3AED",
      bgGradient: "from-[#F5F3FF] via-[#EDE9FE] to-[#F3E8FF]",
      badgeBg: "bg-[#EDE9FE]",
      badgeText: "text-[#5B21B6]",
      borderColor: "#DDD6FE",
    },
    imageSrc: null,
    auraReflection:
      "Rasa ingin tahu bisa menjadi awal untuk memahami sesuatu yang baru.",
  },
  {
    id: "teduh",
    name: "Teduh",
    emotion: "Tenang",
    description: "Perasaan hening, rileks, dan damai tanpa ada rasa terburu-buru yang menekan.",
    theme: {
      baseColor: "#0EA5E9", // Aqua sky
      accentColor: "#0284C7",
      bgGradient: "from-[#F0F9FF] via-[#E0F2FE] to-[#E6FFFA]",
      badgeBg: "bg-[#E0F2FE]",
      badgeText: "text-[#0369A1]",
      borderColor: "#BAE6FD",
    },
    imageSrc: null,
    auraReflection:
      "Nikmati ruang tenang ini. Apa yang membantumu merasa nyaman hari ini?",
  },
  {
    id: "kabut",
    name: "Kabut",
    emotion: "Kewalahan",
    description: "Saat pikiran terasa penuh, lelah, atau terlalu banyak hal yang terjadi bersamaan.",
    theme: {
      baseColor: "#6366F1", // Indigo mist
      accentColor: "#4F46E5",
      bgGradient: "from-[#EEF2FF] via-[#E0E7FF] to-[#EDE9FE]",
      badgeBg: "bg-[#E0E7FF]",
      badgeText: "text-[#3730A3]",
      borderColor: "#C7D2FE",
    },
    imageSrc: null,
    auraReflection:
      "Kamu nggak harus menyelesaikan semuanya sekaligus. Kita bisa mulai dari satu hal kecil.",
  },
  {
    id: "riak",
    name: "Riak",
    emotion: "Cemas dan Gelisah",
    description: "Getaran rasa tidak pasti, khawatir, atau pikiran yang terus berputar mencari pegangan.",
    theme: {
      baseColor: "#818CF8", // Soft periwinkle
      accentColor: "#6366F1",
      bgGradient: "from-[#F8FAFC] via-[#EEF2FF] to-[#E0E7FF]",
      badgeBg: "bg-[#E0E7FF]",
      badgeText: "text-[#312E81]",
      borderColor: "#C7D2FE",
    },
    imageSrc: null,
    auraReflection:
      "Kamu boleh mengambil waktu untuk memahami apa yang sedang memenuhi pikiranmu.",
  },
  {
    id: "bara",
    name: "Bara",
    emotion: "Kesal dan Frustrasi",
    description: "Rasa geram atau jengkel saat kenyataan terasa tidak adil dan tidak sesuai harapan.",
    theme: {
      baseColor: "#EF4444", // Warm coral red
      accentColor: "#DC2626",
      bgGradient: "from-[#FEF2F2] via-[#FEE2E2] to-[#FFF1F2]",
      badgeBg: "bg-[#FEE2E2]",
      badgeText: "text-[#991B1B]",
      borderColor: "#FECACA",
    },
    imageSrc: null,
    auraReflection:
      "Rasa kesal juga boleh hadir. Kita bisa coba memahami apa yang terasa tidak sesuai harapanmu.",
  },
  {
    id: "rindu",
    name: "Rindu",
    emotion: "Kesepian dan Butuh Teman",
    description: "Rasa hampa yang mendambakan kehangatan, ditemani, atau seseorang yang mau mendengar.",
    theme: {
      baseColor: "#64748B", // Lilac slate
      accentColor: "#475569",
      bgGradient: "from-[#F8FAFC] via-[#F1F5F9] to-[#EEF2FF]",
      badgeBg: "bg-[#F1F5F9]",
      badgeText: "text-[#334155]",
      borderColor: "#E2E8F0",
    },
    imageSrc: null,
    auraReflection:
      "Keinginan untuk ditemani itu wajar. Kamu ingin didengarkan atau mencari seseorang untuk diajak bicara?",
  },
];

/**
 * Returns dynamic empathetic reflection from Aura based on selected emotions.
 */
export function getAuraReflectionMessage(selectedIds: string[]): string {
  if (!selectedIds || selectedIds.length === 0) {
    return "Aura siap menyimak. Luangkan waktu sejenak untuk merasakan apa yang sedang hadir hari ini.";
  }

  if (selectedIds.length === 1) {
    const char = TEMAN_RASA_CHARACTERS.find((c) => c.id === selectedIds[0]);
    return char?.auraReflection || "Setiap perasaan berhak untuk dirasakan dan dipahami.";
  }

  // Multi-select blended messages
  const names = selectedIds
    .map((id) => TEMAN_RASA_CHARACTERS.find((c) => c.id === id)?.name)
    .filter(Boolean);

  if (names.length === 2) {
    return `Nggak apa-apa kalau perasaanmu campur aduk antara ${names[0]} dan ${names[1]}. Dua rasa berbeda boleh hadir bersamaan—kita coba pahami satu per satu, ya.`;
  }

  return `Nggak apa-apa kalau perasaanmu campur aduk hari ini (${names.join(", ")}). Setiap rasa punya ceritanya sendiri. Kita urai pelan-pelan tanpa tergesa-gesa.`;
}
