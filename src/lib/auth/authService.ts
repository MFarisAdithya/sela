import { UserProfile, UserConsent, AuthSession } from "@/types/auth";

const SESSION_COOKIE_NAME = "sela_session_token";
const CURRENT_POLICY_VERSION = "2026.1";

const globalForAuth = globalThis as unknown as {
  selaDemoUsersMap?: Map<string, { passwordHash: string; profile: UserProfile }>;
};

// Seed a default demo user for easy testing
const defaultDemoUser: UserProfile = {
  id: "usr_alex_demo_01",
  email: "alex@sela.ai",
  displayName: "Alex",
  ageBand: "15-18 tahun",
  emailVerified: true,
  onboardingCompleted: true,
  plan: "free",
  consent: {
    termsAccepted: true,
    termsVersion: CURRENT_POLICY_VERSION,
    termsAcceptedAt: new Date().toISOString(),
    privacyNoticeAcknowledged: true,
    privacyVersion: CURRENT_POLICY_VERSION,
    privacyAcknowledgedAt: new Date().toISOString(),
    aiProcessingConsent: true,
    aiProcessingConsentAt: new Date().toISOString(),
    guardianConsentStatus: "tidak_diperlukan",
    marketingOptIn: false,
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

if (!globalForAuth.selaDemoUsersMap) {
  globalForAuth.selaDemoUsersMap = new Map<string, { passwordHash: string; profile: UserProfile }>();
  globalForAuth.selaDemoUsersMap.set("alex@sela.ai", {
    passwordHash: "Password123!", // Sandbox demo password
    profile: defaultDemoUser,
  });
}

const demoUsersMap = globalForAuth.selaDemoUsersMap;

/**
 * Simple safe hash mock for sandbox demo
 */
function hashPassword(password: string): string {
  // In production with real DB, use bcrypt / argon2 / Supabase Auth
  return Buffer.from(password).toString("base64");
}

/**
 * Creates an encoded session token
 */
export function encodeSessionToken(userId: string, email: string): string {
  const payload = {
    uid: userId,
    em: email,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
  };
  return Buffer.from(JSON.stringify(payload)).toString("base64url");
}

/**
 * Decodes and verifies session token
 */
export function decodeSessionToken(token: string): { uid: string; em: string } | null {
  try {
    const raw = Buffer.from(token, "base64url").toString("utf-8");
    const parsed = JSON.parse(raw);
    if (parsed.exp && parsed.exp > Date.now() && parsed.uid && parsed.em) {
      return { uid: parsed.uid, em: parsed.em };
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Registers a new user
 */
export async function registerUser(params: {
  displayName: string;
  email: string;
  password: string;
  ageBand?: UserProfile["ageBand"];
  termsAccepted: boolean;
  privacyAcknowledged: boolean;
  marketingOptIn?: boolean;
}): Promise<{ success: boolean; session?: AuthSession; error?: string }> {
  const normalizedEmail = params.email.trim().toLowerCase();

  if (!params.termsAccepted || !params.privacyAcknowledged) {
    return {
      success: false,
      error: "Ketentuan penggunaan dan pemberitahuan privasi wajib disetujui.",
    };
  }

  if (demoUsersMap.has(normalizedEmail)) {
    return {
      success: false,
      error: "Pendaftaran tidak dapat diproses. Silakan periksa kembali email Anda.",
    };
  }

  const userId = "usr_" + Math.random().toString(36).substring(2, 10);
  const now = new Date().toISOString();

  const newProfile: UserProfile = {
    id: userId,
    email: normalizedEmail,
    displayName: params.displayName.trim() || "Kawan",
    ageBand: params.ageBand || "15-18 tahun",
    emailVerified: false,
    onboardingCompleted: false,
    plan: "free",
    consent: {
      termsAccepted: true,
      termsVersion: CURRENT_POLICY_VERSION,
      termsAcceptedAt: now,
      privacyNoticeAcknowledged: true,
      privacyVersion: CURRENT_POLICY_VERSION,
      privacyAcknowledgedAt: now,
      aiProcessingConsent: false, // Asked before AI transmission
      guardianConsentStatus: params.ageBand === "15-18 tahun" ? "belum_tersedia" : "tidak_diperlukan",
      marketingOptIn: !!params.marketingOptIn,
    },
    createdAt: now,
    updatedAt: now,
  };

  demoUsersMap.set(normalizedEmail, {
    passwordHash: hashPassword(params.password),
    profile: newProfile,
  });

  const token = encodeSessionToken(userId, normalizedEmail);

  return {
    success: true,
    session: {
      user: newProfile,
      token,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
    },
  };
}

/**
 * Logs in an existing user
 */
export async function loginUser(params: {
  email: string;
  password: string;
}): Promise<{ success: boolean; session?: AuthSession; error?: string }> {
  const normalizedEmail = params.email.trim().toLowerCase();
  const record = demoUsersMap.get(normalizedEmail);

  if (!record) {
    return {
      success: false,
      error: "Email atau kata sandi tidak sesuai.",
    };
  }

  const isValid =
    record.passwordHash === params.password ||
    record.passwordHash === hashPassword(params.password);

  if (!isValid) {
    return {
      success: false,
      error: "Email atau kata sandi tidak sesuai.",
    };
  }

  const token = encodeSessionToken(record.profile.id, normalizedEmail);

  return {
    success: true,
    session: {
      user: record.profile,
      token,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
    },
  };
}

/**
 * Gets user profile by email or user ID
 */
export function getUserProfileByEmail(email: string): UserProfile | null {
  const normalized = email.trim().toLowerCase();
  const record = demoUsersMap.get(normalized);
  return record ? record.profile : null;
}

export function getUserProfileById(userId: string): UserProfile | null {
  for (const [, val] of demoUsersMap) {
    if (val.profile.id === userId) return val.profile;
  }
  return null;
}

/**
 * Updates user profile
 */
export function updateUserProfile(
  userId: string,
  updates: Partial<UserProfile>
): UserProfile | null {
  for (const [, val] of demoUsersMap) {
    if (val.profile.id === userId) {
      val.profile = {
        ...val.profile,
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      return val.profile;
    }
  }
  return null;
}

/**
 * Deletes user account
 */
export function deleteUserAccount(userId: string): boolean {
  for (const [em, val] of demoUsersMap) {
    if (val.profile.id === userId) {
      demoUsersMap.delete(em);
      return true;
    }
  }
  return false;
}
