export type SafetyRiskLevel = "rendah" | "sedang" | "tinggi";

export interface SafetyCheckResult {
  riskLevel: SafetyRiskLevel;
  isCrisis: boolean;
  matchedKeywords: string[];
  suggestedAction?: "emergency_protocol" | "encourage_referral" | "standard_reflection";
  safetyMessage?: string;
}

const HIGH_RISK_KEYWORDS = [
  "bunuh diri",
  "mengakhiri hidup",
  "ingin mati",
  "mau mati",
  "self harm",
  "menyakiti diri",
  "potong urat",
  "sayat",
  "overdosis",
  "gantung diri",
  "lompat dari",
  "dianiaya parah",
  "pelecehan seksual",
];

const MEDIUM_RISK_KEYWORDS = [
  "dipukul",
  "diancam",
  "diusir dari rumah",
  "tidak aman di rumah",
  "putus asa berat",
  "tidak ada gunanya hidup",
  "takut pulang",
  "dibully parah",
  "perundungan fisik",
];

export function evaluateSafety(text: string): SafetyCheckResult {
  const normalized = text.toLowerCase();

  // Check High Risk
  const matchedHigh = HIGH_RISK_KEYWORDS.filter((kw) => normalized.includes(kw));
  if (matchedHigh.length > 0) {
    return {
      riskLevel: "tinggi",
      isCrisis: true,
      matchedKeywords: matchedHigh,
      suggestedAction: "emergency_protocol",
      safetyMessage:
        "Jika kamu atau seseorang di dekatmu sedang berada dalam bahaya mendesak atau membutuhkan bantuan segera, prioritaskan pergi ke tempat aman dan hubungi Hotline Kesehatan Jiwa Kemenkes 119 ekstensi 8 (Bebas pulsa, 24 jam) atau nomor darurat 112.",
    };
  }

  // Check Medium Risk
  const matchedMed = MEDIUM_RISK_KEYWORDS.filter((kw) => normalized.includes(kw));
  if (matchedMed.length > 0) {
    return {
      riskLevel: "sedang",
      isCrisis: false,
      matchedKeywords: matchedMed,
      suggestedAction: "encourage_referral",
      safetyMessage:
        "Situasi ini membutuhkan perlindungan dan perhatian khusus dari orang dewasa terpercaya atau pendamping resmi (Guru BK atau Layanan SAPA 129).",
    };
  }

  return {
    riskLevel: "rendah",
    isCrisis: false,
    matchedKeywords: [],
    suggestedAction: "standard_reflection",
  };
}
