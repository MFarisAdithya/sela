export type AgeBand = "15-18 tahun" | "19-24 tahun" | "Di atas 24 tahun";

export interface UserConsent {
  termsAccepted: boolean;
  termsVersion: string;
  termsAcceptedAt?: string;
  privacyNoticeAcknowledged: boolean;
  privacyVersion: string;
  privacyAcknowledgedAt?: string;
  aiProcessingConsent: boolean;
  aiProcessingConsentAt?: string;
  guardianConsentStatus: "tidak_diperlukan" | "belum_tersedia" | "disetujui";
  marketingOptIn: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  ageBand?: AgeBand;
  emailVerified: boolean;
  onboardingCompleted: boolean;
  plan: "free" | "premium";
  premiumUntil?: string;
  consent: UserConsent;
  createdAt: string;
  updatedAt: string;
}

export interface AuthSession {
  user: UserProfile;
  token: string;
  expiresAt: string;
}
