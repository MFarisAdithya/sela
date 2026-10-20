export type SafetyLevel = "rendah" | "sedang" | "tinggi";

export interface SafetyCheckResult {
  level: SafetyLevel;
  triggeredKeywords: string[];
  protocolReason?: string;
  recommendedHotline?: string;
}

const HIGH_RISK_KEYWORDS = [
  "bunuh diri",
  "menyakiti diri",
  "self harm",
  "mengakhiri hidup",
  "ingin mati",
  "sayat tangan",
  "minum racun",
  "lompat dari gedung",
  "gantung diri",
];

const MEDIUM_RISK_KEYWORDS = [
  "dipukul terus",
  "dilecehkan",
  "diancam dibunuh",
  "tidak aman di rumah",
  "disiksa",
  "kekerasan fisik",
  "putus asa sekali",
];

export function classifySafetyRisk(text: string): SafetyCheckResult {
  const normalized = text.toLowerCase();

  // Check Level 3: Tinggi (Direct Crisis / Self-Harm)
  const highTriggers = HIGH_RISK_KEYWORDS.filter((kw) => normalized.includes(kw));
  if (highTriggers.length > 0) {
    return {
      level: "tinggi",
      triggeredKeywords: highTriggers,
      protocolReason: "Terdeteksi indikasi krisis darurat atau keinginan menyakiti diri.",
      recommendedHotline: "Hotline Kemenkes Sejiwa 119 Ext 8 / Sahabat Perempuan & Anak 129",
    };
  }

  // Check Level 2: Sedang (Abuse / Violence / Severe Intimidation)
  const medTriggers = MEDIUM_RISK_KEYWORDS.filter((kw) => normalized.includes(kw));
  if (medTriggers.length > 0) {
    return {
      level: "sedang",
      triggeredKeywords: medTriggers,
      protocolReason: "Terdeteksi indikasi situasi kekerasan atau ancaman keselamatan fisik.",
      recommendedHotline: "UPTD PPA / Layanan SAPA KemenPPPA 129",
    };
  }

  // Level 1: Rendah (Normal reflective/educational support)
  return {
    level: "rendah",
    triggeredKeywords: [],
  };
}
