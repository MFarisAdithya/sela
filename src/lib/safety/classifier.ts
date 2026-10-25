export type SafetyRiskLevel = "rendah" | "sedang" | "tinggi";

export interface SafetyCheckResult {
  riskLevel: SafetyRiskLevel;
  isCrisis: boolean;
  isClinicalDiagnosisRequest?: boolean;
  matchedKeywords: string[];
  suggestedAction?: "emergency_protocol" | "encourage_referral" | "refuse_clinical_diagnosis" | "standard_reflection";
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

const CLINICAL_DIAGNOSIS_KEYWORDS = [
  "apakah aku depresi",
  "apakah saya depresi",
  "apakah aku bipolar",
  "apakah saya bipolar",
  "diagnosa aku",
  "diagnosis aku",
  "diagnosa saya",
  "diagnosis saya",
  "apakah aku skizofrenia",
  "apakah saya skizofrenia",
  "apakah aku kena ocd",
  "apakah ini ocd",
  "apakah aku adhd",
  "apakah saya adhd",
  "apakah aku autis",
  "apakah aku mengalami gangguan jiwa",
  "apakah aku gila",
  "tes kejiwaan",
];

export function evaluateSafety(text: string): SafetyCheckResult {
  const normalized = text.toLowerCase();

  // 1. Check High Risk / Crisis (Priority 1)
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

  // 2. Check Clinical Diagnosis Request (Priority 2 - Non-Clinical Refusal Guardrail)
  const matchedClinical = CLINICAL_DIAGNOSIS_KEYWORDS.filter((kw) => normalized.includes(kw));
  if (matchedClinical.length > 0) {
    return {
      riskLevel: "rendah",
      isCrisis: false,
      isClinicalDiagnosisRequest: true,
      matchedKeywords: matchedClinical,
      suggestedAction: "refuse_clinical_diagnosis",
      safetyMessage:
        "SELA.AI adalah platform navigasi nonklinis dan tidak berwenang memberikan diagnosis medis atau kejiwaan apa pun. Apa yang kamu rasakan adalah pengalaman nyata yang penting untuk diperiksa secara langsung oleh ahlinya. Kami sarankan kamu merangkum apa yang kamu alami ke dalam Kartu Cerita SELA.AI agar kamu lebih siap saat berkonsultasi langsung dengan psikolog klinis atau dokter spesialis kedokteran jiwa (psikiater) di Puskesmas atau faskes terdekat.",
    };
  }

  // 3. Check Medium Risk
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
